const logger = require('../logger');
const blojsSendAll = require('../requests/blojs-send-all');
const chain = require('../chain');

module.exports = (peer) => {
  peer.on('blojs:getAll', () => {
    logger.info('EVENT: blojs:getAll');

    blojsSendAll(peer, chain.get());
  });
};
