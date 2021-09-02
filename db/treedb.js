// const env = process.argv[2] || "dev";
// const Pool = require('pg-pool');
// const { inspect } = require('util');
const { Pool } = require('pg');
const { configTreeDB } = require('./config_treedb.js');
// console.log('configTreeDB', configTreeDB)
// Example from here:
// https://github.com/brianc/node-postgres/tree/master/packages/pg-pool

const pool = new Pool(configTreeDB);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// //you can supply a custom client constructor
// //if you want to use the native postgres client
// var NativeClient = require('pg').native.Client
// var nativePool = new Pool({ Client: NativeClient })

// //you can even pool pg-native clients directly
// var PgNativeClient = require('pg-native')
// var pgNativePool = new Pool({ Client: PgNativeClient })
