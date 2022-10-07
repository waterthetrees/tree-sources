const pgp = require('pg-promise');
const dbConfig = require('./db-config');
const pgPromiseConfig = require('./pg-promise-config');

const pgPromise = pgp(pgPromiseConfig);
const db = pgPromise(dbConfig);

module.exports = {
  pgPromise,
  db,
};