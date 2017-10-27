const logger = require('../logger');
const blojsSendAll = require('../requests/blojs-send-all');
const chain = require('../chain');

module.exports = (node) => {
  node.on('blojs:getAll', () => {
    logger.info('EVENT blojs:getAll');

    blojsSendAll(node, chain.get());
  });
};
