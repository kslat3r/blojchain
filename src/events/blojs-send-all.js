const logger = require('../logger');
const chain = require('../chain');

module.exports = (node) => {
  node.on('blojs:sendAll', (json) => {
    logger.info('EVENT blojs:sendAll');

    let data;

    try {
      data = JSON.parse(json);
    } catch (e) {
      logger.error('EVENT blojs:sendAll', 'Blojs received are not valid JSON', json);

      return;
    }

    chain.populate(data);
  });
};
