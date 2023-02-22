import { db } from '../db/index.js';
import { exec } from 'child_process';
import { dbConfig } from '../db/db-config.js';
import pLimit from "p-limit";
import * as utils from "../core/utils.js";

export const mergeSource = async (source) => {
  console.log('source.id', source.id);
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
      `The normalized file '${source.destinations.normalized.path}' does not exists. Skipping...`
    );
    return `NO FILE for ${source.id}`; // Early Return
  }

    console.log(`Running for ${source.destinations.normalized.path}`);
    // FIXME use the async version of exec, but that means a new dependecrunMergey
    const postgresConfig = `host=${dbConfig.host} user=${dbConfig.user}`
        + ` password=${dbConfig.password} dbname=${dbConfig.database}`;
    const command = `ogr2ogr -f "PostgreSQL" PG:"${postgresConfig}"`
        + ` ${source.destinations.normalized.path} -nln tree_sources_staging`
        + ' -geomfield geom -append -update --config PG_USE_COPY YES';
    exec(command, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

  const context = {
    source,
    nullGeometry: 0,
    invalidGeometry: 0,
  };

  return context;
};


export const mergeSources = async (list) => {
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
