const minerConfig = require('../../config/miner.json');
const hash = require('./hash');

const pattern = '0'.repeat(minerConfig.difficulty);

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

  if (!bloj.timestamp) {
    throw new Error('Bloj is missing timestamp');
  }

  bloj.nonce = 0;

  while (!bloj.hash) {
    const hashed = hash(`${bloj.index}${bloj.nonce}${bloj.data}${bloj.prevHash}${bloj.timestamp}`);

    if (hashed.substr(0, minerConfig.difficulty) === pattern) {
      bloj.hash = hashed;

      break;
    }

    bloj.nonce++;
  }

  return bloj;
};
