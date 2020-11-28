const Database = require('./lib/Database');
const onBlojCreate = require('./events/on-bloj-create');
const chainConfig = require('../config/chain.json');

const chain = new Database(Object.assign({}, chainConfig.database, {
  name: process.env.DB_NAME ? process.env.DB_NAME : chainConfig.database.name,
  onCreate: onBlojCreate,
}));

if (!chain.selectAll().length) {
  chain.create(chainConfig.genesis);
}

module.exports = chain;
