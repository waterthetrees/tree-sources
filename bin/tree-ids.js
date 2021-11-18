import readline from "readline";
import fs from "fs";
import geohash from "ngeohash";
import * as config from "../src/config.js";

const main = async () => {
  const stream = fs.createReadStream(config.CONCATENATED_FILEPATH);
  const reader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of reader) {
    const data = JSON.parse(line);
    const hashed = geohash.encode_int(
      data.geometry.coordinates[1],
      data.geometry.coordinates[0],
      52
    );
    console.log(data.properties.sourceID, data.properties.common, hashed);
  }
};

main();
