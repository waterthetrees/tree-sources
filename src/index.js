import * as download from "./stages/download.js";
import * as convert from "./stages/convert.js";
import * as normalize from "./stages/normalize.js";
import sources from "./core/sources.js";

// Constants -------------------------------------------------------------------
const main = async () => {
  await download.downloadSources(sources);
  await convert.convertDownloadsToGeoJSON(sources);
  await normalize.normalizeSources(sources);
};

main();
