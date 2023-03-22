import { spawn } from "child_process";
import * as config from "../config.js";
import path from "path";
import makeDir from "make-dir";
import fs from "fs";
import pLimit from "p-limit";
import * as utils from "../core/utils.js";


export const createTile = async (source) => {
  console.log(`Starting for ${source.idName}`);
  await makeDir(path.dirname(source.destinations.normalized.path));

  const normalizedExists = await utils.asyncFileExists(
    source.destinations.normalized.path
  );
  if (!normalizedExists) {
    console.log(
      `The expected normalized geojson '${source.destinations.normalizedExists.path}' does not exist. Skipping...`
    );
    return `NO FILE for ${source.idName}`; // Early Return
  }

  /*
  const mbtilesExists = await utils.asyncFileExists(
    source.destinations.mbtiles.path
  );
  if (mbtilesExists) {
    console.log(
      `The mbtiles file '${source.destinations.mbtiles.path}' already exists. Skipping...`
    );
    return `File already exists for ${source.idName}`; // Early Return
  }
  */

  console.log(`Starting outer for ${source.idName}`);
  // first, create the outer layer
  const childOuterZoom = new Promise((resolve, _) => {
    const c = spawn(
      "tippecanoe", [
        "--force",
        "--cluster-maxzoom=7",
        "--maximum-zoom=7",
        "-r1",
        "-b0",
        "--cluster-distance=255",
        "-l",
        "data",
        "-o",
        source.destinations.mbtiles.pathOuterZoom,
        source.destinations.normalized.path
      ]
    );
    c.stdout.on('data', (d) => console.log(`stdout: ${d.toString()}`));
    c.stderr.on('data', (d) => console.log(`stdout: ${d.toString()}`));
    c.on("exit", resolve);
  });

  console.log(`Starting middle for ${source.idName}`);
    // then the medium ones, still clustered
  const childMiddleZoom = new Promise((resolve, _) => {
    const c = spawn(
      "tippecanoe", [
        "--force",
        "--cluster-maxzoom=11",
        "--minimum-zoom=8",
        "--maximum-zoom=11",
        "-r1",
        "-b0",
        "--cluster-distance=25",
        "-l",
        "data",
        "-o",
        source.destinations.mbtiles.pathMiddleZoom,
        source.destinations.normalized.path
      ]
    );
    c.on("exit", resolve);
  });

  console.log(`Starting inner for ${source.idName}`);
  // lastly, max zoom when we are close, so use no clustering
  const childInnerZoom = new Promise((resolve, _) => {
    const c = spawn(
      "tippecanoe", [
        "--force",
        "--minimum-zoom=12",
        "--no-tile-size-limit",
        "--drop-densest-as-needed",
        "--extend-zooms-if-still-dropping",
        "-zg",
        "-b0",
        "-l",
        "data",
        "-o",
        source.destinations.mbtiles.pathInnerZoom,
        source.destinations.normalized.path
      ]
    );
    c.on("exit", resolve);
  });

  const tileResults = await Promise.allSettled([childMiddleZoom, childInnerZoom, childOuterZoom]);
  //const tileResults = await Promise.allSettled([childMiddleZoom, childInnerZoom]);
  //const tileResults2 = await Promise.allSettled([childOuterZoom]);
  for ( const result of tileResults ) {
    if (result.status === 'rejected') {
      throw new Error(`Problem running ${source.idName}: ${result}`);
    } else {
        console.error(result);
    }
  }

  console.log(`Finished for ${source.idName}`);

  console.log(`Starting combine for ${source.idName}`);
  const child = new Promise((resolve, _) => {
    const c = spawn(
      "tile-join", [
        "--force",
        "-o",
        source.destinations.mbtiles.path,
        source.destinations.mbtiles.pathOuterZoom,
        source.destinations.mbtiles.pathMiddleZoom,
        source.destinations.mbtiles.pathInnerZoom,
      ]
    );
    c.on("exit", resolve);
  });

  const resultCombined = await Promise.allSettled([child]);
  if (resultCombined.status == 'rejected') {
    throw new Error(`Problem running ${source.idName}: ${resultCombined}`);
  }

  /*
  const deleteResults = await Promise.allSettled([
    fs.unlink(source.destinations.mbtiles.pathOuterZoom),
    fs.unlink(source.destinations.mbtiles.pathMiddleZoom),
    fs.unlink(source.destinations.mbtiles.pathInnerZoom),
  ]);

  if (deleteResults.status == 'rejected') {
    throw new Error(`Problem running ${source.idName}: ${deleteResults}`);
  }
  */
}

export const createCombinedTile = async (sources) => {
  console.log('Combining the tiles');
  const inner = new Promise((resolve, _) => {
    const child = spawn(
      "tile-join", [
        "--force",
        "-o",
        path.join(config.DATA_DIRECTORY, "trees.inner.mbtiles"),
        `${config.MBTILES_FILEPATH}/*.no-zoom.mbtiles`,
        //...sources.map(s => s.destinations.mbtiles.pathInnerZoom)
      ],
      {
        stdio: ["ignore", process.stdout, process.stderr],
      }
    );
    child.on("exit", resolve);
  });

  const middle = new Promise((resolve, _) => {
    const child = spawn(
      "tile-join", [
        "--force",
        "-o",
        path.join(config.DATA_DIRECTORY, "trees.middle.mbtiles"),
        `${config.MBTILES_FILEPATH}/*.middle.mbtiles`,
        //...sources.map(s => s.destinations.mbtiles.pathMiddleZoom)
      ],
      {
        stdio: ["ignore", process.stdout, process.stderr],
      }
    );
    child.on("exit", resolve);
  });

  const outer = new Promise((resolve, _) => {
    const child = spawn(
      "tile-join", [
        "--force",
        "-o",
        path.join(config.DATA_DIRECTORY, "trees.outer.mbtiles"),
        `${config.MBTILES_FILEPATH}/*.outer.mbtiles`,
        //...sources.map(s => s.destinations.mbtiles.pathOuterZoom)
      ],
      {
        stdio: ["ignore", process.stdout, process.stderr],
      }
    );
    child.on("exit", resolve);
  });

  const all = new Promise((resolve, _) => {
    const child = spawn(
      "tile-join", [
        "--force",
        "-o",
        path.join(config.DATA_DIRECTORY, "trees.mbtiles"),
        `${config.MBTILES_FILEPATH}/*.mbtiles`,
        //...sources.map(s => s.destinations.mbtiles.path)
      ],
      {
        stdio: ["ignore", process.stdout, process.stderr],
      }
    );
    child.on("exit", resolve);
  });

  console.log('Finished combining the tiles');

  return Promise.all([inner, middle, outer, all]);
}


export const combineOuterZooms = async (sources) => {
  /*
   * Combine the outer zooms by converting them all back to geojson,
   * then combine them all in one call. The idea here is that we can cluster
   * if necessary, which happens when two cities are close together
   */
}

export const createTilesLegacy = async () => {
  return new Promise((resolve, _) => {
    const child = spawn(
      "tippecanoe",
      [
        "-zg",
        "--drop-densest-as-needed",
        "--extend-zooms-if-still-dropping",
        "-l",
        "data",
        "-o",
        config.TILES_FILEPATH,
        config.CONCATENATED_FILEPATH,
      ],
      {
        stdio: ["ignore", process.stdout, process.stderr],
      }
    );
    child.on("exit", resolve);
  });
};


export const createTiles = async (list) => {
  const limit = pLimit(5);
  const promises = list.map((source) =>
    limit(() => createTile(source))
  );
  const results = await Promise.allSettled(promises);
  console.log("Finished creating individual tile files...");
  results.forEach((l) => {
    if (l && l.forEach) {
      l.forEach(console.log);
    } else {
      console.log(l);
    }
  });
  /*

  console.log("Starting to combine individual tile files...");
  const resultCombined = await createCombinedTile(
    list.filter(m => ["new_haven", "cambridge", "cary", "bakersfield", "las_vegas", "allentown", "colorado_springs", "marysville"].indexOf(m.idName) == -1)
  );
  if (resultCombined.status == 'rejected') {
    throw new Error(`Could not combine all tiles: ${resultCombined}`);
  }
  console.log("Finished combining individual tile files...");
  */
};
