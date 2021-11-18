import fs from "fs";
import sources from "../src/core/sources.js";

const main = () => {
  sources.forEach((source) => {
    if (!fs.existsSync(source.destinations.raw.path)) {
      console.log(
        source.country,
        source.id,
        "is broken?",
        !!source.brokenDownload
      );
    }
  });
};

main();
