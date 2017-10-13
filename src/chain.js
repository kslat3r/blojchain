const db = require('./db');
const dbConfig = require('../config/db')

module.exports = {
  get: () => {
    return db.get(dbConfig.collection)
      .value();
  },

  getLast: () => {
    const blojs = db.get(dbConfig.collection)
      .value();

    return blojs[blojs.length - 1] ? blojs[blojs.length - 1] : null;
  },

  populate: (blojs) => {
    db.set(dbConfig.collection, blojs)
      .write();
  },

  add: (bloj) => {
    db.get(dbConfig.collection)
      .push(bloj)
      .write();
  },

  remove: (bloj) => {
    db.get(dbConfig.collection)
      .remove({ index: bloj.index })
      .write();
  },

  reset: () => {
    db.set(dbConfig.collection, [])
      .write();
  },
};
