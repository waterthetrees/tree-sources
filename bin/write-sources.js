import fs from "fs";
import path from "path";
import * as utils from "../src/core/utils.js";
import logger from "../logger.js";
import identitySource from "../identity-source.js";
import makeDir from "make-dir";

const __dirname = path.dirname(import.meta.url.split(":")[1]);
const __root = path.join(__dirname, "..");

const exportPath = path.join(__root, "tmp");

function dealWithCrossWalk(crosswalk) {
  let tmpCrosswalk = crosswalk;
  if (!crosswalk) return crosswalk;
  Object.entries(crosswalk).forEach(
    ([key, val]) => (tmpCrosswalk = { ...tmpCrosswalk, [key]: val.toString() })
  );
  return tmpCrosswalk;
}

const handleSource = async (sourceName) => {
  await makeDir(exportPath);

  const country = (await import(path.join(__root, `/sources/${sourceName}`)))
    .default;
  const countryLength = country.length;

  logger.info(`${sourceName}; Length: ${countryLength}`);

  const resultPath = path.join(exportPath, sourceName);

  await utils.asyncWriteFile(resultPath, "export default [\n");

  country.forEach((source) => {
    const obj = {
      ...identitySource,
      iso_alpha_2: source.iso_alpha_2,
      iso_alpha_3: source.iso_alpha_3,
      numeric_country_code: source.numeric_country_code,
      country: source.country,
      city: source.short || null,
      long: source.long || source.short || null,
      short: source.short || null,
      main: source.main || source.id || null,
      id: source.id,
      id_city_name: source.id || null,
      info: source.info || null,
      brokenDownload: source.brokenDownload || false,
      download: source.download || null,
      format: source.format || null,
      filename: source.filename || null,
      crosswalk: null,
      gdalOptions: source.gdalOptions || null,
    };

    obj.crosswalk = dealWithCrossWalk(source.crosswalk);

    fs.appendFileSync(resultPath, `  ${JSON.stringify(obj)},\n`, (err) =>
      logger.error(err)
    );
  });

  fs.appendFileSync(resultPath, `];`, (err) => logger.error(err));
};

const handleSources = async () => {
  const sources = await utils.asyncReadDir(path.join(__root, "sources"));
  await Promise.all(sources.map(handleSource));
};

async function start() {
  try {
    await handleSources();
  } catch (err) {
    logger.error(`CATCH ${err}`);
  }
}

process.on("exit", (code) => logger.info(`Exiting with code ${code}\n`));
start();
