import fs from "fs";
import path from "path";
import { once } from "events";
import makeDir from "make-dir";
import pLimit from "p-limit";
import * as utils from "../core/utils.js";

const RECSEP = RegExp(String.fromCharCode(30), "g");

const transform = (source, line) => {
  if (!line || !line.length) {
    return null;
  }

  const data = JSON.parse(line.replace(RECSEP, "").trim());
  return `${JSON.stringify(data)}\n`;
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

  for await (const line of utils.asyncReadLines(reader)) {
    try {
      const transformed = transform(source, line);

      if (!transformed) {
        continue;
      }

      if (!writer.write(transformed)) {
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

  return source.destinations.normalized.path;
};

export const normalizeSources = async (list) => {
  const limit = pLimit(10);
  const promises = list.map((source) => limit(() => normalizeSource(source)));
  const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
  console.log("Finished normalizations");
  results.forEach((l) => {
    if (l && l.forEach) {
      l.forEach(console.log);
    } else {
      console.log(l);
    }
  });
};
