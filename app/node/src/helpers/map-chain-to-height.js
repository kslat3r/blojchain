const sortChainByHeight = require('./sort-chain-by-height');

module.exports = (chain) => {
  const mapped = {};

  sortChainByHeight(chain)
    .forEach((bloj) => {
      mapped[bloj.height] = bloj;
    });

  return mapped;
};
