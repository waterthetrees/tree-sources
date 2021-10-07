/* eslint-disable camelcase */
const { inspect } = require('util');
const { info, error, debug } = require('./../logger');
const { db, pgPromise } = require('../db');

// async function queryTreeDB(queryString, values, functionCallerName) {
//   try {
//     const results = await treeDB.query(queryString, [values]);
//     return results;
//   } catch (err) {
//     error(`Error executing query to treeDB: ${err}, ${functionCallerName}`);
//     return err;
//   }
// }

// function updateCity(city) {
//   const query = `UPDATE cities
//     SET city = ${city.city},
//     country = ${city.country}
//     id_city_name = ${city.id_city_name}
//     short = ${city.short}
//     info = ${city.info}
//     download = ${city.download}
//     WHERE id_city = '${id_city}';`;
//     return queryTreeDB(query);
// }

// function getCityExistence(city) {
//   const query = `select city from cities where id_city_name = '${city.id_city_name}';`;
//   return queryTreeDB(query);
// }

async function insertCity(city) {
  // const query = `INSERT INTO cities(city, country, id_city_name, short, info, download)
  //   VALUES (?, ?, ?,?, ?, ?);`;
  // info(`${query},query`);
  // return queryTreeDB(query, city, 'insertCity');
  // console.log('city', city);
  // We can use every supported variable syntax at the same time, if needed:
  return await db.oneOrNone('INSERT INTO cities(city, country, id_city_name, short, info, download) VALUES(${city.city},${city.country},${city.id_city_name}, ${city.short},${city.info},${city.download},)');
// our set of columns, to be created only once (statically), and then reused,
// to let it cache up its formatting templates for high performance:


}

async function insertSources(newObj) {
  console.dir(newObj, {'maxArrayLength': null});
  // const query = `INSERT INTO cities(city, country, id_city_name, short, info, download)
  //   VALUES (?, ?, ?,?, ?, ?);`;
  // info(`${query},query`);
  // return queryTreeDB(query, city, 'insertCity');
  // console.log('city', city);
  // We can use every supported variable syntax at the same time, if needed:
  // return await db.oneOrNone('INSERT INTO cities(city, country, id_city_name, short, info, download) VALUES(${city.city},${city.country},${city.id_city_name}, ${city.short},${city.info},${city.download},)');
// our set of columns, to be created only once (statically), and then reused,
// to let it cache up its formatting templates for high performance:
const keys = Object.keys(newObj[0]);
const cs = new pgPromise.helpers.ColumnSet(keys, {table: 'cities'});
// data input values:
// const values = sources;
    
// generating a multi-row insert query:
const query = pgPromise.helpers.insert(newObj, cs);
//=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')
    
// executing the query:
await db.none(query);

}

// async function getInsertUserId(name) {
//   return pgPromise.task('getInsertUserId', async t => {
//       const userId = await t.oneOrNone('SELECT id FROM Users WHERE name = $1', name, u => u && u.id);
//       return userId || await t.one('INSERT INTO Users(name) VALUES($1) RETURNING id', name, u => u.id);
//   });
// }



module.exports = {
  // updateCity,
  // getCityExistence,
  insertCity,
  insertSources,
};
