const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(`${__dirname}/../data/chain.json`);
const db = low(adapter);

db.defaults({ blocks: [] })
  .write();

module.exports = db;
