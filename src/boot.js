const instance = require('./lib/instance');
const logger = require('./lib/logger');
const chain = require('./lib/chain');
const blojsRequests = require('./lib/requests/blojs');
const getAgreedChain = require('./helpers/get-agreed-chain');

instance.createServer();
instance.createNode({
  onFirstPeerConnect: async () => {
    logger.debug('PEER connection to first peer made');

    const currentChain = chain.get();
    const peerChains = await blojsRequests.get();

    logger.debug('CHAIN current chain', currentChain.length ? currentChain : 'empty');
    logger.debug('CHAIN peer chains', peerChains);

    peerChains.push(currentChain);

    const agreedChain = getAgreedChain(peerChains);

    chain.populate(agreedChain);
  },
});
