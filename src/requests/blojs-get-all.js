const logger = require('../logger');

module.exports = (node) => {
  logger.info('REQUEST blojs:getAll');

  node.emit('blojs:getAll');
};