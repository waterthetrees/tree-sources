const fs = require("fs");
const http = require("http");
const https = require("https");
const makeDir = require("make-dir");
const path = require("path");
const sources = require("../core/sources");

const downloadSource = (
  resultsDirectory,
  { download, filename, id, exension }
) => {
  return new Promise((resolve, reject) => {
    if (!download) {
      console.error(`No download specified for source with id '${id}'...`);
      reject(new Error("No download link"));
    }

    const resultsPath = path.join(
      resultsDirectory,
      filename || `${id}.${exension}`
    );

    const dir = path.dirname(resultsPath);
    makeDir.sync(dir);

    const proto = !download.charAt(4).localeCompare("s") ? https : http;

    proto
      .get(download, (response) => {
        if (response.status < 200 || response.status >= 300) {
          return reject(
            new Error(`Bad response from '${download}' (id: '${id}')`)
          );
        }

        const stream = fs.createWriteStream(resultsPath);

        response.pipe(stream);

        stream.on("error", reject);

        stream.on("finish", () => {
          stream.close(() => resolve(resultsPath));
        });
      })
      .on("error", (err) => {
        console.error(
          `Failed downloading source for ${id}. (url: '${download}'; destination: '${resultsPath}')`
        );
        return reject(err);
      });
  });
};

const downloadSources = async (resultsDirectory, list) => {
  const promises = list.map((source) =>
    downloadSource(resultsDirectory, source)
  );
  const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
  console.log("Finished downloading...");
  results.forEach(console.log);
};

downloadSources(path.join(__dirname, "../../data"), sources);
