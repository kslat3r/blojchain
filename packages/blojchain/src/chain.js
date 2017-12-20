const Database = require('./lib/Database');
const onCreate = require('./events/on-create');
const chainConfig = require('../config/chain.json');

const chain = new Database(Object.assign({}, chainConfig.database, {
  name: process.env.DB_NAME,
  onCreate,
}));

if (!chain.selectAll().length) {
  chain.create(chainConfig.genesis);
}

module.exports = chain;
