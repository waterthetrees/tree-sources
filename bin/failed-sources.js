import fs from "fs";
import { all } from "../src/core/sources.js";

const main = () => {
  all.forEach((source) => {
    if (!fs.existsSync(source.destinations.raw.path)) {
      console.log(
        source.country,
        source.idName,
        "is broken?",
        !!source.broken
      );
    }
  });
};

main();
