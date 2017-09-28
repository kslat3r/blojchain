const db = require('./db');
const dbConfig = require('../config/db')

module.exports = {
  get: () => {
    return db.get(dbConfig.collection)
      .value();
  },

  populate: (blocks) => {
    db.set(dbConfig.collection, blocks)
      .write();
  },

  add: (block) => {
    db.get(dbConfig.collection)
      .push(block)
      .write();
  },

  remove: (block) => {
    db.get(dbConfig.collection)
      .remove({ index: block.index })
      .write();
  },

  reset: () => {
    db.set(dbConfig.collection, [])
      .write();
  },
};
