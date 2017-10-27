const logger = require('../logger');

module.exports = (node, peers) => {
  logger.info('REQUEST peers:sendAll', peers);

  node.emit('peers:sendAll', JSON.stringify(peers));
};
