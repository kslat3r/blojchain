const hasher = require('../hasher');

module.exports = (bloj) => {
  const hash = hasher(`${bloj.index}${bloj.nonce}${bloj.data}${bloj.prevHash}`);

  if (bloj.hash === hash) {
    return true;
  }

  return false;
};
