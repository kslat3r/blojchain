const logger = require('../logger');

module.exports = (node, bloj) => {
  logger.info('REQUEST bloj:mine', bloj);

  node.emit('bloj:mine', JSON.stringify(bloj));
};
