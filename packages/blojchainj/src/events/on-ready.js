const logger = require('../logger');
const chain = require('../chain');
const blojsRequests = require('../requests/blojs');
const combineCurrentChainAndPeerChains = require('../helpers/combine-current-chain-and-peer-chains');

module.exports = async (peers) => {
  logger.info('EVENT onReady');

  const currentHash = chain.getHash();
  const peerHashes = await blojsRequests.getHashesFromPeers(peers);

  const mismatchedPeers = peerHashes.filter(peerHash => peerHash.hash !== currentHash)
    .map((peerHash) => {
      return peerHash.peer;
    });

  if (mismatchedPeers.length) {
    logger.info('EVENT onReady mismatched peers', mismatchedPeers);

    const currentChain = chain.get();
    const peerChains = await blojsRequests.getFromPeers(mismatchedPeers);

    logger.info('EVENT onReady mismatched peer chains', peerChains);

    const combinedChain = combineCurrentChainAndPeerChains(currentChain, peerChains);

    logger.info('EVENT onReady setting combined chain', combinedChain);

    chain.populate(combinedChain);
  }
};
