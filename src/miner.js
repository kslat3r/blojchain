const config = require('../config/miner.json');
const hasher = require('./hasher');

const pattern = '0'.repeat(config.difficulty);

const mine = (block) => {
  if (!block.nonce) {
    block.nonce = 0;
  }

  const hash = hasher(`${block.index}${block.nonce}${block.data}`);

  if (hash.substr(0, config.difficulty) === pattern) {
    block.hash = hash;

    return block;
  }

  block.nonce++;

  return mine(block);
};

module.exports = mine;
