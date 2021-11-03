import fs from "fs";
import { promisify } from "util";
import * as utils from "./src/core/utils.js";
import logger from "./logger.js";
import identitySource from "./identity-source.js";
import makeDir from "make-dir";

const exportPath = "./tmp/";

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

  const country = (await import(`./sources/${sourceName}`)).default;
  const countryLength = country.length;

  logger.info(`${sourceName}; Length: ${countryLength}`);

  const resultPath = `${exportPath}${sourceName}`;

  await utils.asyncWriteFile(resultPath, "export default [\n");

  country.forEach((source) => {
    const obj = {
      ...identitySource,
      country: source.country,
      city: source.short || null,
      long: source.long || source.short || null,
      short: source.short || null,
      primary: source.primary || source.id || null,
      id: source.id,
      id_city_name: source.id || null,
      info: source.info || null,
      download: source.download || null,
      format: source.format || null,
      filename: source.filename || null,
      crosswalk: null,
      gdal_options: source.gdal_options || null,
    };

    obj.crosswalk = dealWithCrossWalk(source.crosswalk);

    fs.appendFileSync(resultPath, `  ${JSON.stringify(obj)},\n`, (err) =>
      logger.error(err)
    );
  });

  fs.appendFileSync(resultPath, `];`, (err) => logger.error(err));
};

const handleSources = async () => {
  const sources = await utils.asyncReadDir("./sources");
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
