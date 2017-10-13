const logger = require('../logger');

module.exports = (peer) => {
  logger.info('REQUEST: blojs:getAll');

  peer.emit('blojs:getAll');
};
