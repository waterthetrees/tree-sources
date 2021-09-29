import fs from "fs";
import http from "http";
import https from "https";
import makeDir from "make-dir";
import { spawn } from "child_process";
import path from "path";
import util from "util";
import pLimit from "p-limit";
import sources from "../core/sources.js";
import * as utils from "../core/utils.js";
import { once } from "events";
import * as stream from "stream";

// Helpers ---------------------------------------------------------------------
const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const copyFile = util.promisify(fs.copyFile);
const finished = util.promisify(stream.finished);

// Constants -------------------------------------------------------------------
const __dirname = path.dirname(import.meta.url.split(":")[1]);

const DEFAULT_CRS = "EPSG:4326";

const POSSIBLE_LONGITUDE_FIELDS = [
  "Longitude",
  "Lon",
  "Lng",
  "LONG",
  "X",
  "X_LONG",
  "long",
  "X_Koordina",
  "X-Koordinate",
  "coord long",
  "X_COORD",
  "COORDENADA X",
];

const POSSIBLE_LONGITUDE_FIELDS_STRING = POSSIBLE_LONGITUDE_FIELDS.join(",");

const POSSIBLE_LATITUDE_FIELDS = [
  "Latitude",
  "Lat",
  "LAT",
  "Y",
  "Y_LAT",
  "lat",
  "Y_Koordina",
  "Y-Koordinate",
  "coord lat",
  "Y_COORD",
  "COORDENADA Y",
];

const POSSIBLE_LATITUDE_FIELDS_STRING = POSSIBLE_LATITUDE_FIELDS.join(",");

const POSSIBLE_GEOMETRY_FIELDS = [
  "the_geom",
  "SHAPE",
  "wkb_geometry",
  "geo_shape",
  "GEOMETRIE",
  "geom",
];

const POSSIBLE_GEOMETRY_FIELDS_STRING = POSSIBLE_GEOMETRY_FIELDS.join(",");

const downloadSource = (resultsDirectory, source) => {
  return new Promise((resolve, reject) => {
    if (!source.download) {
      console.error(
        `No download specified for source with id '${source.id}'...`
      );
      reject(new Error("No download link"));
    }

    const [resultsPath, _] = utils.sourceToDownloadPath(
      resultsDirectory,
      source
    );

    // If the results already exist, we need not attempt to download them again
    if (fs.existsSync(resultsPath)) {
      return resolve(resultsPath);
    }

    const dir = path.dirname(resultsPath);
    makeDir.sync(dir);

    const proto = !source.download.charAt(4).localeCompare("s") ? https : http;

    proto
      .get(source.download, (response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return reject(
            new Error(
              `Bad response from '${source.download}' (status: ${response.statusCode}; id: '${source.id}')`
            )
          );
        }

        console.log(
          `Good response! (status: ${response.statusCode}; id: '${source.id}')`
        );

        const stream = fs.createWriteStream(resultsPath);

        response.pipe(stream);

        stream.on("error", reject);

        stream.on("finish", () => {
          console.log(`Finished writing '${resultsPath}' (id: '${source.id}')`);
          stream.close(() => resolve(resultsPath));
        });
      })
      .on("error", (err) => {
        console.error(
          `Failed downloading source for ${source.id}. (url: '${source.download}'; destination: '${resultsPath}')`
        );
        return reject(err);
      });
  });
};

const downloadSources = async (resultsDirectory, list) => {
  const limit = pLimit(10);
  const promises = list.map((source) =>
    limit(() => downloadSource(resultsDirectory, source))
  );
  const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
  console.log("Finished downloading...");
  results.forEach(console.log);
};

const processDownload = async (resultsDirectory, source) => {
  const [filepath, extension] = utils.sourceToDownloadPath(
    resultsDirectory,
    source
  );

  const filepathExists = await exists(filepath);
  if (!filepathExists) {
    console.log(
      `The expected download ${filepath} does not exist. Skipping...`
    );
    return `NO FILE for ${source.id}`; // Early Return
  }

  const processedPath = utils.sourceToProcessedPath(resultsDirectory, source);

  const processedExists = await exists(processedPath);
  if (processedExists) {
    console.log(
      `The processed file '${processedPath}' already exists... Skipping...`
    );
    return processedPath; // Early Return
  }

  // We just copy over GeoJSON files
  if (extension === "geojson") {
    await copyFile(filepath, processedPath);
    return processedPath; // Early Return
  }

  if (extension == "zip" || extension === "vrt") {
    return processedPath; // Early Return
  }

  console.log(`Processing '${filepath}'...`);

  const processed = spawn(
    "ogr2ogr",
    [
      "-s_srs",
      source.srs || DEFAULT_CRS,
      "-t_srs",
      DEFAULT_CRS,
      "-gt",
      "65536",
      "-oo",
      `GEOM_POSSIBLE_NAMES="${
        source.geometryField || POSSIBLE_GEOMETRY_FIELDS_STRING
      }"`,
      "-oo",
      `X_POSSIBLE_NAMES="${
        source.longitudeField || POSSIBLE_LONGITUDE_FIELDS_STRING
      }"`,
      "-oo",
      `Y_POSSIBLE_NAMES="${
        source.latitudeField || POSSIBLE_LATITUDE_FIELDS_STRING
      }"`,
      "-f",
      "GeoJSONSeq",
      processedPath,
      source.gdal_options || source.gdalOptions,
      filepath,
    ].filter((x) => !!x),
    {
      stdio: ["ignore", "pipe", process.stderr],
    }
  );

  const writable = fs.createWriteStream(processedPath, { encoding: "utf8" });
  for await (const chunk of processed.stdout) {
    if (!writable.write(chunk)) {
      await once(writable, "drain");
    }
  }
  writable.end();
  await finished(writable);

  return processedPath;
};

const processDownloads = async (resultsDirectory, list) => {
  const limit = pLimit(10);
  const promises = list.map((source) =>
    limit(() => processDownload(resultsDirectory, source))
  );
  const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
  console.log("Finished processing...");
  results.forEach(console.log);
};

const createTiles = async (resultsDirectory) => {
  const files = await readdir(path.join(resultsDirectory, "processed"));
  const tippecanoe = spawn(
    "tippecanoe",
    [
      "-o",
      path.join(resultsDirectory, "trees.mbtiles"),
      "-zg",
      "--drop-densest-as-needed",
      ...files.map((f) => path.join(resultsDirectory, "processed", f)),
    ].filter((x) => !!x),
    {
      stdio: ["ignore", "pipe", process.stderr],
    }
  );

  for await (const chunk of tippecanoe.stdout) {
    console.log(chunk);
  }
};

const main = async () => {
  const dataPath = path.join(__dirname, "../../data");

  // downloadSources(dataPath, sources);
  await processDownloads(dataPath, sources);
  await createTiles(dataPath);
};

main();
