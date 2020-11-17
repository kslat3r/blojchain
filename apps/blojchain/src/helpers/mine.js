const minerConfig = require('../../config/miner.json');
const hash = require('./hash');

const pattern = '0'.repeat(minerConfig.difficulty);

module.exports = (bloj, maxRounds) => {
  let rounds = 0;

  if (!bloj.height) {
    throw new Error('Bloj is missing height');
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

  bloj.nonce = bloj.nonce !== undefined ? bloj.nonce : 0;

  while (!bloj.hash && (maxRounds === undefined || rounds < maxRounds )) {
    const hashed = hash(`${bloj.height}${bloj.nonce}${JSON.stringify(bloj.data)}${bloj.prevHash}${bloj.timestamp}`);

    if (hashed.substr(0, minerConfig.difficulty) === pattern) {
      bloj.hash = hashed;

      break;
    }

    bloj.nonce++;
    rounds++;
  }

  return bloj;
};
