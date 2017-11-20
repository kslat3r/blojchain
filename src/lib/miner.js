const config = require('../../config/miner.json');
const hasher = require('./hasher');

const pattern = '0'.repeat(config.difficulty);

module.exports = (bloj) => {
  if (!bloj.index) {
    throw new Error('Bloj is missing index');
  }

  if (!bloj.data) {
    throw new Error('Bloj is missing data');
  }

  if (!bloj.prevHash) {
    throw new Error('Bloj is missing prevHash');
  }

  if (!bloj.nonce) {
    bloj.nonce = 0;
  }

  while (!bloj.hash) {
    const hash = hasher(`${bloj.index}${bloj.nonce}${bloj.data}${bloj.prevHash}`);

    if (hash.substr(0, config.difficulty) === pattern) {
      bloj.hash = hash;

      break;
    }

    bloj.nonce++;
  }

  return bloj;
};
