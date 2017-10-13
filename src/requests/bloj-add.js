const logger = require('../logger');

module.exports = (peer, bloj) => {
  logger.info('REQUEST: bloj:add', bloj);

  peer.emit('bloj:add', JSON.stringify(bloj));
};
