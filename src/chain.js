const db = require('./db');
const dbConfig = require('../config/db')

module.exports = {
  get: () => {
    return db.get(dbConfig.name)
  },

  populate: (blocks) => {
    db.set(dbConfig.name, blocks)
      .write();
  },

  add: (block) => {
    db.get(dbConfig.name)
      .push(block)
      .write();
  },

  remove: (block) => {
    db.get(dbConfig.name)
      .remove({ index: block.index })
      .write();
  },

  reset: () => {
    db.set(dbConfig.name, [])
      .write();
  },
};
