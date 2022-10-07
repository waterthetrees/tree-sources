import fs from "fs";
import util from "util";
import path from "path";
import * as config from "../config.js";
import * as stream from "stream";

export const match = (s, regex, patternNo) => {
  if (!s) {
    return;
  }
  const m = String(s).match(regex);
  if (m && patternNo !== undefined) {
    return m[patternNo];
  }
  return m;
};

// what format the file is ultimately in
export const formatForSource = (source) => {
  const url = source.download;
  let { format } = source;
  if (!format) {
    format = match(url, /\.([a-z]+)$/i, 1);
  }
  if (format === "zip") {
    format = "shp";
  }
  if (!format) {
    if (match(url, /(shp$|format=shp|\.shp|\.zip)/)) {
      format = "shp";
    } else if (match(url, /(csv$|format=csv|\.csv)/)) {
      format = "csv";
    } else if (
      match(url, /(json$|format=json|geojson$|format=geojson|\.geojson|\.json)/)
    ) {
      format = "geojson";
    }
  }

  if (format === "json") {
    format = "geojson";
  }
  if (!format && source.keepExtension) {
    // eslint-disable-next-line prefer-destructuring
    format = url.match(/\.([^.]+)$/)[1];
  }
  return format;
};

// what file extension the file should be saved to disk
export const extensionForSource = (source) => {
  if (source.zip) {
    return "zip";
  }
  const format = formatForSource(source);
  return format === "shp" ? "zip" : format;
};

export const asyncFileExists = util.promisify(fs.exists);
export const asyncReadDir = util.promisify(fs.readdir);
export const asyncReadFile = util.promisify(fs.readFile);
export const asyncCopyFile = util.promisify(fs.copyFile);
export const asyncStreamFinished = util.promisify(stream.finished);
export const asyncWriteFile = util.promisify(fs.writeFile);
export const asyncAppendFile = util.promisify(fs.appendFile);

// https://2ality.com/2018/04/async-iter-nodejs.html
export async function* asyncReadLines(chunksAsync) {
  let previous = "";
  for await (const chunk of chunksAsync) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1);
      yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}
