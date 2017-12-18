const db = require('./db');
const dbConfig = require('../config/db.json')
const chainConfig = require('../config/chain.json');
const hasher = require('./hasher');

const chain = {
  get: () => {
    return db.get(dbConfig.collection)
      .value();
  },

  getIndex: (index) => {
    const blojs = db.get(dbConfig.collection)
    .value();

    return blojs[index] ? blojs[index] : null;
  },

  getLast: () => {
    const blojs = db.get(dbConfig.collection)
      .value();

    return blojs[blojs.length - 1] ? blojs[blojs.length - 1] : null;
  },

  getHash: () => {
    const blojs = db.get(dbConfig.collection)
      .value();

    return hasher(JSON.stringify(blojs));
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

if (chain.get().length === 0) {
  chain.add(chainConfig.genesisBloj);
}

module.exports = chain;
