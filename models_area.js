/* eslint-disable camelcase */
/* eslint-disable no-template-curly-in-string */
const pgp = require('pg-promise')({
  capSQL: true, // capitalize all generated SQL
});

const { inspect } = require('util');
const {
  info, error,
} = require('../../logger.js');
const { configTreeDB } = require('../db/config_treedb.js');

const treeDB = pgp(configTreeDB);

function makeStringCondition(stringCondition) {
  return pgp.as.format(stringCondition, newData);
}

function updateModel(newData, keys, stringCondition, tableName) {
  const condition = pgp.as.format(stringCondition, newData);
  return pgp.helpers.update(newData, keys, tableName) + condition;
}

function insertModel(newData, keys, stringCondition, tableName) {
  const condition = pgp.as.format(stringCondition, newData);
  return pgp.helpers.update(newData, keys, tableName) + condition;
}

async function addCityModel(newTreeLiked) {
  const functionName = 'addCityModel';
  try {
    const newData = {
    city:'',
    lng:'',
    lat:'',
    email:'',
    who:'',
    created:'',
    count:'',
    country:'',
    city_count_trees:'',
    };
    const queryString = 'INSERT INTO treelikes(${this:name}) VALUES(${this:csv}) RETURNING id_liked AS "idLiked", id_tree AS "idTree", common, email, created AS "dateVisit"';
    return await treeDB.query(queryString, newTreeLiked);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}


module.exports = {
  addCityModel,
};
