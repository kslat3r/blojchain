const logger = require('../logger');

module.exports = (peer, blojs) => {
  logger.info('REQUEST: blojs:sendAll', blojs);

  peer.emit('blojs:sendAll', JSON.stringify(blojs));
};
