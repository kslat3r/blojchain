const chain = require('../chain');
const blojsRequests = require('../requests/blojs');

module.exports = async (peers) => {
  const currentHash = chain.getHash();
  const peerHashes = await blojsRequests.getHashesFromPeers(peers);

  const mismatchedPeers = peerHashes.filter(peerHash => peerHash.hash !== currentHash)
    .map((peerHash) => {
      return peerHash.peer;
    });

  if (mismatchedPeers.length) {
    // const currentChain = chain.get();
    // const peerChains = await blojsRequests.getFromPeers(mismatchedPeers);
    // const combinedChain = combineCurrentChainAndPeerChains(currentChain, peerChains);
  }
};
