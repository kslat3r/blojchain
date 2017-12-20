const mapChainToIndex = require('./map-chain-to-index');
const chainConfig = require('../../config/chain.json');
const verifyChain = require('./verify-chain');
const logger = require('../logger');
const unmapChainFromIndex = require('./unmap-chain-from-index');

module.exports = (_currentChain, _peerChains) => {
  const currentChain = mapChainToIndex(_currentChain);

  _peerChains.forEach((_peerChain) => {
    const peerChain = mapChainToIndex(_peerChain);

    Object.keys(peerChain).forEach((index) => {
      const peerBloj = peerChain[index];

      if (peerBloj.hash !== chainConfig.genesis.hash) {
        const previousBloj = currentChain[index - 1];

        if (previousBloj) {
          if (verifyChain([previousBloj, peerBloj])) {
            currentChain[index] = peerBloj;
          } else {
            logger.error('COMBINE cannot add to chain - could not verify with previous bloj', peerBloj)
          }
        } else {
          logger.error('COMBINE cannot add to chain - no previous bloj found', peerBloj);
        }
      }
    });
  });

  return unmapChainFromIndex(currentChain);
};
