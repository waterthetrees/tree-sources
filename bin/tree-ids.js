import readline from "readline";
import fs from "fs";
import * as config from "../src/config.js";
import * as ids from "../src/core/ids.js";

const main = async () => {
  const stream = fs.createReadStream(config.CONCATENATED_FILEPATH);
  const reader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of reader) {
    const data = JSON.parse(line);
    const id = ids.IDForTree(data);
    console.log(id);
  }
};

main();
