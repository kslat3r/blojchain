const sortChainByHeight = require('./sort-chain-by-height');

module.exports = mappedChain => sortChainByHeight(Object.keys(mappedChain).map(height => mappedChain[height]));
