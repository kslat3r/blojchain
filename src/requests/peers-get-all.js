const logger = require('../logger');

module.exports = (node) => {
  logger.info('REQUEST peers:getAll');

  node.emit('peers:getAll');
};
