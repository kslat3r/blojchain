const logger = require('../logger');
const chain = require('../chain');
const hash = require('../helpers/hash');
const blojsRequests = require('../requests/blojs');
const combineCurrentChainAndPeerChains = require('../helpers/combine-current-chain-and-peer-chains');

module.exports = async (peers) => {
  logger.info('EVENT onReady');

  const currentHash = hash(JSON.stringify(chain.selectAll()));
  const peerHashes = await blojsRequests.getHashesFromPeers(peers);

  const mismatchedPeers = peerHashes.filter(peerHash => peerHash.hash !== currentHash)
    .map((peerHash) => {
      return peerHash.peer;
    });

  if (mismatchedPeers.length) {
    logger.info('EVENT onReady mismatched peers', mismatchedPeers);

    const currentChain = chain.selectAll();
    const peerChains = await blojsRequests.getFromPeers(mismatchedPeers);

    logger.info('EVENT onReady mismatched peer chains', peerChains);

    const combinedChain = combineCurrentChainAndPeerChains(currentChain, peerChains);

    logger.info('EVENT onReady setting combined chain', combinedChain);

    chain.overwrite(combinedChain);
  }
};
