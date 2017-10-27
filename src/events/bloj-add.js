const logger = require('../logger');
const chain = require('../chain');
const verifier = require('../verifier');

module.exports = (node) => {
  node.on('bloj:add', (json) => {
    logger.info('EVENT bloj:add');

    let bloj;

    try {
      bloj = JSON.parse(json);
    } catch (e) {
      logger.error('EVENT bloj:add', 'Bloj received is not valid JSON', json);

      return;
    }

    logger.info('EVENT bloj:add', 'Bloj received to be added', bloj);

    if (verifier(bloj)) {
      chain.add(bloj);

      logger.info('EVENT bloj:add', 'Bloj added to chain', bloj);

      return;
    }

    logger.info('EVENT bloj:add', 'Bloj could not be verified', bloj);
  });
};
