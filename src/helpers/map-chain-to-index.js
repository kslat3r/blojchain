const sortChainByIndex = require('./sort-chain-by-index');

module.exports = (chain) => {
  const mapped = {};

  sortChainByIndex(chain)
    .forEach((bloj) => {
      mapped[bloj.index] = bloj;
    });

  return mapped;
};
