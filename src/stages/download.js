import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import makeDir from "make-dir";
import pLimit from "p-limit";

export const downloadSource = async (source) => {
  if (!source.destinations || !source.destinations.raw) {
    throw new Error(`No destinations for source: "${source}"`);
  }

  return new Promise((resolve, reject) => {
    if (!source.download) {
      console.error(
        `No download specified for source with id '${source.id}'...`
      );
      reject(new Error("No download link"));
    }

    // If the results already exist, we need not attempt to download them again
    if (fs.existsSync(source.destinations.raw.path)) {
      console.log(
        `File already exists (id: '${source.id}'; destination: '${source.destinations.raw.path}')`
      );
      return resolve(source.destinations.raw.path);
    }

    makeDir.sync(path.dirname(source.destinations.raw.path));

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
          `Good response! (status: ${response.statusCode}; id: '${source.id}'; destination: '${source.destinations.raw.path}')`
        );

        const stream = fs.createWriteStream(source.destinations.raw.path);

        response.pipe(stream);

        stream.on("error", reject);

        stream.on("finish", () => {
          console.log(
            `Finished writing '${source.destinations.raw.path}' (id: '${source.id}')`
          );
          stream.close(() => resolve(source.destinations.raw.path));
        });
      })
      .on("error", (err) => {
        console.error(
          `Failed downloading source for ${source.id}. (url: '${source.download}'; destination: '${source.destinations.raw.path}')`
        );
        return reject(err);
      });
  });
};

export const downloadSources = async (list) => {
  const limit = pLimit(10);
  const promises = list.map((source) =>
    limit(() => downloadSource(source).catch(console.error))
  );
  const results = await Promise.allSettled(promises);
  console.log("Finished downloading...");
  results.forEach((l) => {
    if (l && l.forEach) {
      l.forEach(console.log);
    } else {
      console.log(l);
    }
  });
};
