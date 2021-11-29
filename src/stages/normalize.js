import fs from "fs";
import path from "path";
import { once } from "events";
import makeDir from "make-dir";
import pLimit from "p-limit";
import * as ids from "../core/ids.js";
import * as utils from "../core/utils.js";

const RECSEP = RegExp(String.fromCharCode(30), "g");

const transform = (context, source, line) => {
  if (!line || !line.length) {
    return null;
  }

  const sanitized = line.replace(RECSEP, "").trim();
  const data = JSON.parse(sanitized);

  if (source.coordsFunc) {
    data.geometry = {
      type: "Point",
      coordinates: source.coordsFunc(data.properties),
    };
  }

  if (!data.geometry) {
    console.error(
      `Found feature with a null geometry. (source.id: '${source.id}'; feature: '${line}'')`
    );
    context.nullGeometry += 1;
    return null; // Early Return
  }

  // We want all points to only have two coordinates
  if (data.geometry.type === "Point") {
    data.geometry.coordinates = data.geometry.coordinates.slice(0, 2);
  }

  if (!data.geometry.coordinates || data.geometry.coordinates.length !== 2) {
    `Found feature with a invalid geometry. (source.id: '${source.id}'; feature: '${line}'')`;
    context.invalidGeometry += 1;
    return null;
  }

  if (
    data.geometry.coordinates[0] === 0 &&
    data.geometry.coordinates[1] === 0
  ) {
    `Found feature with a invalid geometry. (source.id: '${source.id}'; feature: '${line}'')`;
    context.invalidGeometry += 1;
    return null;
  }

  if (
    data.geometry.coordinates[0] < -180 ||
    data.geometry.coordinates[0] > 180 ||
    data.geometry.coordinates[1] < -80 ||
    data.geometry.coordinates[1] > 80
  ) {
    `Found feature with a invalid geometry. (source.id: '${source.id}'; feature: '${line}'')`;
    context.invalidGeometry += 1;
    return null;
  }

  // Get the new properties
  const crosswalk = source.crosswalk || {};
  const mappedProperties = Object.keys(crosswalk).reduce((memo, key) => {
    const value = crosswalk[key];

    if (!value) {
      console.error(
        `Found crosswalk value that cannot be interpreted. (source.id: '${source.id}'; key: '${key}')`
      );
      return memo; // Early Return
    }

    const v =
      typeof value === "function"
        ? value(data.properties)
        : data.properties[value];
    if (v) {
      return { ...memo, [key]: v }; // Early Return
    }
    return memo;
  }, {});

  // Set the new properties
  const id = ids.IDForTree(data);
  data.id = id;
  data.properties = { ...mappedProperties, sourceID: source.id, count: 0, id };
  return data;
};

export const normalizeSource = async (source) => {
  if (
    !source.destinations ||
    !source.destinations.geojson ||
    !source.destinations.normalized
  ) {
    throw new Error(`No destinations for source: "${source}"`);
  }

  await makeDir(path.dirname(source.destinations.normalized.path));

  const geojsonExists = await utils.asyncFileExists(
    source.destinations.geojson.path
  );
  if (!geojsonExists) {
    console.log(
      `The expected geojson '${source.destinations.geojson.path}' does not exist. Skipping...`
    );
    return `NO FILE for ${source.id}`; // Early Return
  }

  const normalizedExists = await utils.asyncFileExists(
    source.destinations.normalized.path
  );
  if (normalizedExists) {
    console.log(
      `The normalized file '${source.destinations.normalized.path}' already exists. Skipping...`
    );
    return `NO FILE for ${source.id}`; // Early Return
  }

  const reader = fs.createReadStream(source.destinations.geojson.path, {
    encoding: "utf-8",
  });
  const writer = fs.createWriteStream(source.destinations.normalized.path, {
    encoding: "utf-8",
  });

  const context = {
    source,
    nullGeometry: 0,
    invalidGeometry: 0,
  };

  const groups = {};
  for await (const line of utils.asyncReadLines(reader)) {
    const transformed = transform(context, source, line);
    if (!transformed) {
      continue; // Early Continuation
    }

    if (!groups[transformed.id]) {
      groups[transformed.id] = { ...transformed };
    }
    groups[transformed.id].properties.count += 1;
  }

  for (const _id in groups) {
    try {
      const content = `${JSON.stringify(groups[_id])}\n`;

      if (!writer.write(content)) {
        await once(writer, "drain");
      }
    } catch (err) {
      console.error(err);
      console.error(
        `Failed normalizing '${source.destinations.geojson.path}'...`
      );
      throw err; // Reraise
    }
  }
  writer.end();
  await utils.asyncStreamFinished(writer);

  return context;
};

export const normalizeSources = async (list) => {
  const limit = pLimit(10);
  const promises = list.map((source) => limit(() => normalizeSource(source)));
  const results = await Promise.allSettled(promises);
  console.log("Finished normalizations");
  results.forEach((l) => {
    if (l && l.forEach) {
      l.forEach(console.log);
    } else {
      console.log(l);
    }
  });
};
