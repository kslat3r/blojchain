const logger = require('../logger');
const chain = require('../chain');
const blojsRequests = require('../requests/blojs');

module.exports = async (peers) => {
  const currentHash = chain.getHash();
  const peerHashes = await blojsRequests.getHashesFromPeers(peers);

  logger.debug('CHAIN current hash', currentHash);
  logger.debug('CHAIN peer hashes', peerHashes);
};
