/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const pgp = require('pg-promise');

/**
 * source:
 * https://github.com/vitaly-t/pg-promise/issues/78#issuecomment-171951303
 */
function camelizeColumns(data) {
  const tmp = data[0];
  for (const prop in tmp) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

const pgPromiseConfig = {
  capSQL: true,
  receive: (data) => camelizeColumns(data),
};

module.exports = pgPromiseConfig;
