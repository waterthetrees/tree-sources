/* eslint-disable camelcase */
const { inspect } = require('util');
const treeDB = require('../db/treedb.js');
const {
  info, error,
} = require('../../logger.js');

async function queryTreeDB(queryString, functionCallerName) {
  try {
    const results = await treeDB.query(queryString);
    return results;
  } catch (err) {
    error(`Error executing query to treeDB: ${err}, ${functionCallerName}`);
    return err;
  }
}

// todo snake to camel case
async function getCityDataDynamic(city, columnListString, datePlantedRange) {
  const query = `SELECT ${columnListString}
  FROM treedata WHERE city = '${city}'
  AND ((modified < (CURRENT_DATE - INTERVAL '1 years'))
  OR (date_planted < (CURRENT_DATE - INTERVAL '${datePlantedRange}')))
  order by date_planted desc
  limit 100;`;
  info(`query to treeDB: ${query}`);
  const result = await queryTreeDB(query);
  info('result.rows', inspect(result.rows));
  return result;
}

// todo snake to camel case
async function getCityDataDynamicRange(city, columnListString, dateStart, dateEnd) {
  const query = `SELECT ${columnListString}
  FROM treedata WHERE city = '${city}'
  AND (modified >= '${dateStart}'
  AND modified <  '${dateEnd}')
  order by date_planted desc
  limit 100;`;
  info(`query to treeDB: ${query}`);
  const result = await queryTreeDB(query);
  info('result.rows', inspect(result.rows));
  return result;
}

function getCityData(city) {
  const query = `SELECT common, scientific, lng,lat,
  who, to_char(date_planted, 'YYYY-mm-dd') as "datePlanted",
  health, dbh, height, neighborhood, notes,
  id_reference as "idReference", id_tree as "idTree"
  FROM treedata WHERE city = '${city}'
  AND ((modified < (CURRENT_DATE - INTERVAL '3 months'))
  OR (date_planted < (CURRENT_DATE - INTERVAL '2 years')))
  order by date_planted desc;`;
  return queryTreeDB(query);
}

module.exports = {
  getCityData, getCityDataDynamic, getCityDataDynamicRange,
};

// OR (created > (CURRENT_DATE - INTERVAL '3 months'))

// SELECT id_tree as "typeId",
//   id_reference as "idReference", who,
//   common, scientific, lng,lat,
//   to_char(date_planted, 'YYYY-mm-dd') as "datePlanted",
//   health
//   FROM treedata WHERE city = 'Alameda'
//   AND ((modified > (CURRENT_DATE - INTERVAL '3 months'))
//   OR (date_planted > (CURRENT_DATE - INTERVAL '2 years')))
//   order by date_planted desc;
