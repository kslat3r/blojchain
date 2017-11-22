const dbConfig = require('../../config/db.json');
const dbName = process.env.DB_NAME || dbConfig.name;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(`${__dirname}/../../data/${dbName}.json`);
const db = low(adapter);

db.defaults({
  [dbConfig.collection]: []
})
.write();

module.exports = db;
