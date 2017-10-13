const logger = require('../logger');

module.exports = (peer, bloj) => {
  logger.info('REQUEST: bloj:mine', bloj);

  peer.emit('bloj:mine', JSON.stringify(bloj));
};
