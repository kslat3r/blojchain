const mapChainToHeight = require('./map-chain-to-height');
const chainConfig = require('../../config/chain.json');
const verifyChain = require('./verify-chain');
const logger = require('../logger');
const unmapChainFromHeight = require('./unmap-chain-from-height');

module.exports = (_currentChain, _peerChains) => {
  const currentChain = mapChainToHeight(_currentChain);

  _peerChains.forEach((_peerChain) => {
    const peerChain = mapChainToHeight(_peerChain);

    Object.keys(peerChain).forEach((height) => {
      const peerBloj = peerChain[height];

      if (peerBloj.hash !== chainConfig.genesis.hash) {
        const previousBloj = currentChain[height - 1];

        if (previousBloj) {
          if (verifyChain([previousBloj, peerBloj])) {
            currentChain[height] = peerBloj;
          } else {
            logger.error('COMBINE cannot add to chain - could not verify with previous bloj', peerBloj)
          }
        } else {
          logger.error('COMBINE cannot add to chain - no previous bloj found', peerBloj);
        }
      }
    });
  });

  return unmapChainFromHeight(currentChain);
};
