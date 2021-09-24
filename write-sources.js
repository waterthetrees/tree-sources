
const fs = require('fs');


const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const { inspect, promisify } = require('util');
const { error, debug } = require('./logger');
const sources = require('./sources');
const { insertCity, updateCity, insertSources } = require('./models/models_area.js');
const featureFlags = {
  saveToDb: false
}
const identitySources = require('./identity-source');
const identityCrosswalk = require('./identity-crosswalk');
const identitySource = require('./identity-source');

// eslint-disable-next-line consistent-return
async function iterateSources(goodSource) {
  const functionNAme = 'iterateSources';
  return await sources.map(source => {
      const obj =  { 
       ...identitySource,
       country: source.country,
       city: source.short || null, 
       long: source.long || source.short || null,
       short: source.short || null, 
       primary: source.primary || source.id || null,
       id: source.id,
       id_city_name: source.id || null, 
       info: source.info || null, 
       download:  source.download || null, 
       format: source.format || null, 
       filename: source.filename || null,
       crosswalk: null,
       gdal_options: source.gdal_options || null
     };
     const temp = {}
     test = (source.crosswalk) 
      ? Object.entries(source.crosswalk).map(([key,value]) => {
       obj.crosswalk = {...obj.crosswalk, [key]: value.toString()}
       return obj.crosswalk
      })
      : source.crosswalk;
     return obj
    });
}


async function start() {
  try {
    const newSource = await iterateSources();
    console.dir(newSource, {depth: null, colors: true, maxArrayLength: null});
    fs.writeFile('2pac.js', await newSource.toString(), (err) => {
     if (err) throw err;
     console.log('file saved!');
    });
    await promisify(setTimeout)(3000);
    // if (await done) process.exit(1);
  } catch (e) {
    error(`CATCH ${e}`);
  }
}



start();
process.on('exit', (code) => console.log(`Exiting with code ${code}\n`));
