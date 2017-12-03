const sortChainByIndex = require('./sort-chain-by-index');

module.exports = mappedChain => sortChainByIndex(Object.keys(mappedChain).map(index => mappedChain[index]));
