import { db } from '../db/index.js';
import { exec } from 'child_process';
import { dbConfig } from '../db/db-config.js';
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
    // FIXME use the async version of exec, but that means a new dependecy
    const command = `ogr2ogr -f "PostgreSQL" PG:"host=${dbConfig.host} user=${dbConfig.user} password=${dbConfig.password} dbname=${dbConfig.database}" ${source.destinations.normalized.path} -nln tree_staging -geomfield geom -append`
    exec(command, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log(`Running the stored proc for ${source.id}`);
        const result = await db.proc('public.merge_treedata', [source.id]);
        console.log(result);
        console.log(`stdout: ${stdout}`);
    });
    /*
    */

  const context = {
    source,
    nullGeometry: 0,
    invalidGeometry: 0,
  };

  return context;
};


export const mergeSources = async (list) => {
  if (process.argv.length > 2) {
    list = list.filter(m => m.id == process.argv[2]);
  }

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
