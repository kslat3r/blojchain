const logger = require('../logger');

module.exports = (node, bloj) => {
  logger.info('REQUEST bloj:add', bloj);

  node.emit('bloj:add', JSON.stringify(bloj));
};
