const logger = require('../logger');

module.exports = (node, blojs) => {
  logger.info('REQUEST blojs:sendAll', blojs);

  node.emit('blojs:sendAll', JSON.stringify(blojs));
};
