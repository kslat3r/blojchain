const hash = require('../helpers/hash');

module.exports = (bloj) => {
  const hashed = hash(`${bloj.index}${bloj.nonce}${bloj.data}${bloj.prevHash}${bloj.timestamp}`);

  if (bloj.hash === hashed) {
    return true;
  }

  return false;
};
