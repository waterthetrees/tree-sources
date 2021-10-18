const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const { inspect, promisify } = require("util");
const { error } = require("./logger");
const identitySource = require("./identity-source");
const exportPath = "./tmp/";
// eslint-disable-next-line consistent-return

async function iterateSources() {
  const list = {};
  const countries = fs.readdirSync("sources");
  console.log("countries", countries);

  fs.readdirSync("sources").forEach((sourceName) => {
    const country = require(`./sources/${sourceName}`);
    const countryLength = country.length;
    console.log(
      "\n\n",
      sourceName,
      "country:",
      country,
      "countryLength:",
      countryLength
    );
    country.forEach((source, index) => {
      if (!list.hasOwnProperty(source.country)) {
        fs.writeFileSync(
          `${exportPath}${source.country}.js`,
          "module.exports = [ \n"
        );
        list[source.country] = { country: [], lastIndex: countryLength - 1 };
      }
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
      fs.appendFileSync(
        `${exportPath}${source.country}.js`,
        `  ${JSON.stringify(obj)},\n`,
        (err) => console.error(err)
      );
      list[source.country].country.push(obj);
      return obj;
    });

    if (list[country[0].country].country.length === countryLength) {
      fs.appendFileSync(`${exportPath}${country[0].country}.js`, `];`, (err) =>
        console.log(err)
      );
    }

    return list;
  });
}

function dealWithCrossWalk(crosswalk) {
  let tmpCrosswalk = crosswalk;
  if (!crosswalk) return crosswalk;
  Object.entries(crosswalk).forEach(
    ([key, val]) => (tmpCrosswalk = { ...tmpCrosswalk, [key]: val.toString() })
  );
  return tmpCrosswalk;
}

async function start() {
  try {
    const done = await iterateSources();
    await promisify(setTimeout)(3000);
    if (done) process.exit(1);
  } catch (e) {
    error(`CATCH ${e}`);
  }
}

process.on("exit", (code) => console.log(`Exiting with code ${code}\n`));
start();
