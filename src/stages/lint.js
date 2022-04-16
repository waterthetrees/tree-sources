import fs from "fs";
import readline from "readline";
import pLimit from "p-limit";
import Fuse from "fuse.js";
import * as utils from "../core/utils.js";
import { extensionForSource } from '../core/utils.js';

// Some files from the Netherlands seem to use ; to separate fields even in.csv files.
const SeparatorPattern = /\s*[,;]\s*/;
const PropertyPattern = /\.(\w+)/;
const NumberedFieldPattern = /field_\d/;
const JSONPattern = /^\s*{/;

function tab(count = 1, text = "") {
  const indent = new Array(count * 4 + 1).join(" ");
  let result = Array.isArray(text)
    ? text.join("\n")
    : text;

  return result.replace(/^/gm, indent);
}

class LintResult {
  constructor(source, type = "success", data) {
    Object.assign(this, { source, type, data });
  }

  toString() {
    return `${this.type}: ${this.source.id}`;
  }
}

class MissingFieldsResult extends LintResult {
  constructor(source, data) {
    super(source, "missingFields", data);
  }

  toString() {
    const { source, data: { missing } } = this;
    const fields = missing.map(([key, target, maybe]) =>
      `${key}: ${target}${ maybe?.length ? " => Maybe: " + maybe.join(", ") : ""}`);

    return `${source.id}\n${
      tab(1, source.destinations.raw.path)
    }\n${
      tab(1, fields)
    }`;
  }
}

async function getColumnNames(path) {
  const lineIterator = readline.createInterface({
    input: fs.createReadStream(path, { encoding: "utf8" })
  });
  let columnRow = "";

  for await (const line of lineIterator) {
    columnRow = line;
    break;
  }

  if (columnRow.charCodeAt(0) === 0xFEFF) {
    // Strip the BOM character from the beginning of the file.
    columnRow = columnRow.slice(1);
  }

  return [columnRow.split(SeparatorPattern), columnRow];
}

export const lintSource = async (source) => {
  if (
    !source.destinations ||
    !source.destinations.geojson ||
    !source.destinations.raw
  ) {
    return new LintResult(source, "missingDestination");
  }

  const rawPath = source.destinations.raw.path;
  const rawExists = await utils.asyncFileExists(rawPath);

  if (!rawExists) {
    return new LintResult(source, "missingDownload");
  }

  const [columnNames, headerRow] = await getColumnNames(rawPath);

  if (JSONPattern.test(headerRow)) {
    return new LintResult(source, "foundBadData");
  }

  const missing = [];
  const fuse = new Fuse(columnNames, {
    includeScore: true,
    // Scores less than this are closer matches.  Allowing matches much higher
    // than this returns more random suggestions.
    threshold: 0.25
  });

  for (const [normalizedKey, sourceKey] of Object.entries(source.crosswalk)) {
    let targetKey = sourceKey;

    if (NumberedFieldPattern.test(sourceKey)) {
      // Ignore names like field_1, which are used in files without column names.
      continue;
    } else if (typeof sourceKey === "function") {
      const body = sourceKey.toString();
      const match = body.match(PropertyPattern);

      if (match) {
        targetKey = match[1];
      } else {
        targetKey = body;
      }
    }

    // Use a fuzzy search to look for the target key in the column names.
    const matches = fuse.search(targetKey);
    const [bestMatch] = matches;

    if (bestMatch?.score !== 0) {
      // If we don't find a perfect match, add the possible ones.
      missing.push([normalizedKey, targetKey, matches.map(({ item }) => item)]);
    }
  }

  if (missing.length) {
    return new MissingFieldsResult(source, { missing });
  } else {
    return new LintResult(source);
  }
};

export const lintSources = async (list) => {
  const limit = pLimit(10);
  const promises = list
    .filter((source) => extensionForSource(source) === "csv")
    .map((source) =>
      limit(() => lintSource(source))
    );
  const results = (await Promise.allSettled(promises)).map(({ value }) => value);
  const resultsByType = results.reduce((output, result) => {
    output[result.type] = (output[result.type] || []).concat(result);

    return output;
  }, {});
  const { success, missingFields, ...otherResults } = resultsByType;

  Object.entries(otherResults).forEach(([type, results]) => {
    console.log(`\n\n${type}: ${results.length} sources`);
    results.forEach(({ source, data }) => {
      console.log(tab(1, `${source.id}${data ? ": " + data : ""}`));
    });
  });

  console.log(`\n\nMissing fields: ${missingFields.length} sources\n`);
  console.log(tab(1, missingFields.join("\n\n")));
  console.log(`\n\nNo issues: ${success.length} sources`);
};
