const hasher = require('./hasher');

module.exports = (block) => {
  const hash = hasher(`${block.index}${block.nonce}${block.data}${block.prevHash}`);

  if (block.hash === hash) {
    return true;
  }

  return false;
};
