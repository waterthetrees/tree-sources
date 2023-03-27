import { spawn } from "child_process";
import { dbConfig } from "../db/db-config.js";
import { db } from "../db/index.js";
import pLimit from "p-limit";
import * as utils from "../core/utils.js";


export const mergeSource = async (source) => {
  console.log(`Starting merge for ${source.idName}`);
  if (
    !source.destinations ||
    !source.destinations.geojson ||
    !source.destinations.normalized
  ) {
    throw new Error(`No destinations for source: "${source}"`);
  }

  const normalizedExists = await utils.asyncFileExists(
    source.destinations.normalized.path
  );
  if (!normalizedExists) {
    console.log(
      `The normalized file "${source.destinations.normalized.path}" does not exists. Skipping...`
    );
    return `NO FILE for ${source.idName}`; // Early Return
  }

  console.log(`Running for ${source.destinations.normalized.path}`);
  /*
    * For debugging purposes, you can check the contents of the geojson file with ogr2ogr
    * using the following command:
    * ogrinfo data/normalized/[sourceId].geojsons
    *  -dialect SQLite
    *  -sql 'select idReference as id_reference, idName as id_source_name, * from "[sourceId]"'
    */
  const postgresConfig = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:5432/${dbConfig.database}`;
  const command = "ogr2ogr";
  const commandArgs = [
    "-f", "PostgreSQL", `PG:${postgresConfig}`,
    "-dialect", "SQLite",
    "-sql",
    `select idReference as id_reference, idName as id_source_name, * from ${source.idName}`,
    "-nln", "treedata_staging",
    "-geomfield", "geom",
    source.destinations.normalized.path,
    "-append", "-update", "--config", "PG_USE_COPY", "YES", "-preserve_fid"
  ];

  return new Promise((resolve, _) => {
    const child = spawn(
      command,
      commandArgs,
      {
        stdio: ["ignore", process.stdout, process.stderr],
      }
    );
    child.on("exit", resolve);
  });

};


const truncateStaging = async () => {
  return await db.none('TRUNCATE TABLE treedata_staging');
}


export const mergeSources = async (list) => {
  console.log("Start truncate the treedata_staging database...");
  try {
    await truncateStaging();
  } catch(error) {
		console.error(
      '\nError truncating the treedata_staging database...',
      inspect(error, true, 2, true));
		throw error;
  }
  console.log("Done truncating the treedata_staging database...");

  console.log("Start uploading to the database...");
  const limit = pLimit(5);
  const promises = list.map((source) =>
    limit(() => mergeSource(source))
  );
  const results = await Promise.allSettled(promises);
  console.log("Finished uploading to the database...");
  results.forEach((l) => {
    if (l && l.forEach) {
      l.forEach(console.log);
    } else {
      console.log(l);
    }
  });
};
