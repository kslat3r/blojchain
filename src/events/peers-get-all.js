const logger = require('../logger');
const peersSendAll = require('../requests/peers-send-all');

module.exports = (node) => {
  node.on('peers:getAll', () => {
    logger.info('EVENT peers:getAll');

    peersSendAll(node, node.getPeers());
  });
};
