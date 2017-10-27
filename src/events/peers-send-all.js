const logger = require('../logger');

module.exports = (node) => {
  node.on('peers:sendAll', (json) => {
    logger.info('EVENT peers:sendAll');

    let data;

    try {
      data = JSON.parse(json);
    } catch (e) {
      logger.error('EVENT peers:sendAll', 'Peers received are not valid JSON', json);

      return;
    }

    node.addPeers(data);
  });
};
