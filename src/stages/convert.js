import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { once } from "events";
import pLimit from "p-limit";
import extractZip from "extract-zip";
import recurseDirs from "recursive-readdir";
import * as utils from "../core/utils.js";
import * as config from "../config.js";
import makeDir from "make-dir";

export const convertDownloadToGeoJSON = async (source) => {
  if (
    !source.destinations ||
    !source.destinations.geojson ||
    !source.destinations.raw
  ) {
    throw new Error(`No destinations for source: "${source}"`);
  }

  const rawExists = await utils.asyncFileExists(source.destinations.raw.path);
  if (!rawExists) {
    console.log(
      `The expected download '${source.destinations.raw.path}' does not exist. Skipping...`
    );
    return `NO FILE for ${source.id}`; // Early Return
  }

  const geoJSONExists = await utils.asyncFileExists(
    source.destinations.geojson.path
  );
  if (geoJSONExists) {
    console.log(
      `The GeoJSON file '${source.destinations.geojson.path}' already exists... Skipping...`
    );
    return source.destinations.geojson.path; // Early Return
  }

  await makeDir(path.dirname(source.destinations.geojson.path));

  let convertPath = source.destinations.raw.path;

  // We just copy over GeoJSON files
  if (source.destinations.raw.extension === "geojson") {
    const writer = fs.createWriteStream(source.destinations.geojson.path);
    const data = JSON.parse(
      await utils.asyncReadFile(source.destinations.raw.path)
    );

    for (const index in data.features) {
      if (!writer.write(`${JSON.stringify(data.features[index])}\n`)) {
        await once(writer, "drain");
      }
    }
    writer.end();
    await utils.asyncStreamFinished(writer);

    return source.destinations.geojson.path; // Early Return
  }

  if (source.destinations.raw.extension == "zip") {
    const extractTo = path.join(config.RAW_DIRECTORY, `${source.id}-unzipped`);

    await extractZip(source.destinations.raw.path, {
      dir: extractTo,
    });

    const searchExtension = [source.format, "shp"].find(
      (ext) => ext && ext !== "zip"
    );

    convertPath = (await recurseDirs(extractTo)).find((f) =>
      f.match(`${searchExtension}$`)
    );

    if (!convertPath) {
      return source.destinations.geojson.path;
    }
  }

  console.log(`Processing '${source.id}' (path: '${convertPath}')...`);

  const subshell = spawn(
    "ogr2ogr",
    [
      "-s_srs",
      source.srs || config.DEFAULT_CRS,
      "-t_srs",
      config.DEFAULT_CRS,
      "-gt",
      "65536",
      "-oo",
      `GEOM_POSSIBLE_NAMES=${
        source.geometryField || config.POSSIBLE_GEOMETRY_FIELDS_STRING
      }`,
      "-oo",
      `X_POSSIBLE_NAMES=${
        source.longitudeField || config.POSSIBLE_LONGITUDE_FIELDS_STRING
      }`,
      "-oo",
      `Y_POSSIBLE_NAMES=${
        source.latitudeField || config.POSSIBLE_LATITUDE_FIELDS_STRING
      }`,
      "-f",
      "GeoJSONSeq",
      "/vsistdout/",
      source.gdal_options || source.gdalOptions,
      convertPath,
    ].filter((x) => !!x),
    {
      stdio: ["ignore", "pipe", process.stderr],
    }
  );

  const writable = fs.createWriteStream(source.destinations.geojson.path, {
    encoding: "utf8",
  });
  for await (const chunk of subshell.stdout) {
    if (!writable.write(chunk)) {
      await once(writable, "drain");
    }
  }
  writable.end();
  await utils.asyncStreamFinished(writable);

  return source.destinations.geojson.path;
};

export const convertDownloadsToGeoJSON = async (list) => {
  const limit = pLimit(10);
  const promises = list.map((source) =>
    limit(() => convertDownloadToGeoJSON(source))
  );
  const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
  console.log("Finished processing...");
  results.forEach((l) => {
    if (l && l.forEach) {
      l.forEach(console.log);
    } else {
      console.log(l);
    }
  });
};
