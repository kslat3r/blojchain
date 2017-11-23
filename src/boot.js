const instance = require('./lib/instance');
const logger = require('./lib/logger');
const chain = require('./lib/chain');
const blojsRequest = require('./lib/request/blojs');
const mergeChains = require('./helpers/merge-chains');

instance.createServer();
instance.createNode({
  onPeerConnect: async (peer) => {
    // const currentChain = chain.get();
    // const peerChain = await blojsRequests.getFromPeer(peer);

    // logger.debug('CHAIN current chain', currentChain.length ? currentChain : 'empty');
    // logger.debug('CHAIN peer chain', peerChain);

    // const mergedChain = mergeChains(currentChain, peerChain);

    // chain.populate(mergedChain);
  },
});
