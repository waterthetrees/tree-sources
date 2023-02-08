import fs from "fs";
import path from "path";
import { inspect } from "util";
import { once } from "events";
import makeDir from "make-dir";
import pLimit from "p-limit";
import { createIdForTree } from '@waterthetrees/tree-id';

import * as utils from "../core/utils.js";
import * as constants from "../constants.js";

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
    context.nullGeometry += 1;
    return null; // Early Return
  }
  // We want all points to only have two coordinates
  if (data.geometry.type === "Point") {
    data.geometry.coordinates = data.geometry.coordinates.slice(0, 2);
  }

  if (!data.geometry.coordinates || data.geometry.coordinates.length !== 2) {
    `Found feature with a invalid geometry. (source.idName: '${source.idName}'; feature: '${line}'')`;
    context.invalidGeometry += 1;
    return null;
  }

  if (
    data.geometry.coordinates[0] === 0 &&
    data.geometry.coordinates[1] === 0
  ) {
    `Found feature with a invalid geometry. (source.idName: '${source.idName}'; feature: '${line}'')`;
    context.invalidGeometry += 1;
    return null;
  }

  if (
    data.geometry.coordinates[0] < constants.MIN_LON ||
    data.geometry.coordinates[0] > constants.MAX_LON ||
    data.geometry.coordinates[1] < constants.MIN_LAT ||
    data.geometry.coordinates[1] > constants.MAX_LAT
  ) {
    `Found feature with a invalid geometry. (source.idName: '${source.idName}'; feature: '${line}'')`;
    context.invalidGeometry += 1;
    return null;
  }

  // Get the new properties
  const crosswalk = source.crosswalk || {};
  const mappedProperties = Object.keys(crosswalk).reduce((memo, key) => {
    const value = crosswalk[key];

    if (!value) {
      console.error(
        `Found crosswalk value that cannot be interpreted. (source.idName: '${source.idName}'; key: '${key}')`
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
  const dataForId = {
    ...mappedProperties, 
    idName: source.idName,
    city: source.city,
    state: source.state,
    lat: data.geometry.coordinates[1], 
    lng: data.geometry.coordinates[0]
  };
  // This is the tree's unique id
  const id = createIdForTree(dataForId);
  data.id = id;
  data.properties = { ...mappedProperties,
    id, 
    idName: source.idName,
    city: source.city,
    isoAlpha2: source.isoAlpha2,
    isoAlpha3: source.isoAlpha3,
    numericCountryCode: source.numericCountryCode,
    country: source.country,
    email: source.email,
    download: source.download,
    info: source.info,
    lat: data.geometry.coordinates[1], 
    lng: data.geometry.coordinates[0],
    count: 0, 
  };
  return data;
};

export const normalizeSource = async (source) => {
  console.log('source.idName', source.idName);
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
    return `NO FILE for ${source.idName}`; // Early Return
  }

  const normalizedExists = await utils.asyncFileExists(
    source.destinations.normalized.path
  );
  if (normalizedExists) {
    console.log(
      `The normalized file '${source.destinations.normalized.path}' already exists. Skipping...`
    );
    return `NO FILE for ${source.idName}`; // Early Return
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

  if (context.nullGeometry || context.invalidGeometry) {
    console.log('context', context.source.idName, context.source.id, context.nullGeometry, context.invalidGeometry);
  }

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
