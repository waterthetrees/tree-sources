import fs from "fs";
import http from "http";
import https from "https";
import makeDir from "make-dir";
import path from "path";
import pLimit from "p-limit";
import sources from "../core/sources.js";
import * as utils from "../core/utils.js";

const __dirname = path.dirname(import.meta.url.split(":")[1]);

const downloadSource = (resultsDirectory, source) => {
  return new Promise((resolve, reject) => {
    if (!source.download) {
      console.error(
        `No download specified for source with id '${source.id}'...`
      );
      reject(new Error("No download link"));
    }

    const resultsPath = utils.sourceToDownloadPath(resultsDirectory, source);

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

downloadSources(path.join(__dirname, "../../data"), sources);
