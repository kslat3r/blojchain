const dbConfig = require('../config/db.json');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(`${__dirname}/../data/${dbConfig.name}.json`);
const db = low(adapter);

db.defaults({
  [dbConfig.collection]: []
})
.write();

module.exports = db;
