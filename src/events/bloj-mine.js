const logger = require('../logger');
const miner = require('../miner');
const chain = require('../chain');
const minerConfig = require('../../config/miner.json');

module.exports = (peer) => {
  peer.on('bloj:mine', (json) => {
    logger.info('EVENT bloj:mine');

    let bloj;

    try {
      bloj = JSON.parse(json);
    } catch (e) {
      logger.info('EVENT: bloj:mine', 'Bloj received is not valid JSON', json);

      return;
    }

    logger.info('EVENT: bloj:mine', 'Bloj received to be mined', bloj);

    if (bloj.prevHash !== minerConfig.genesisHash) {
      const lastBloj = chain.getLast();

      if (bloj.index !== (lastBloj.index + 1)) {
        logger.error('EVENT:bloj:mine', 'Bloj received does not increment last index by 1', bloj);

        return;
      }

      if (lastBloj.hash !== bloj.prevHash) {
        logger.error('EVENT:bloj:mine', 'Bloj received does not match last bloj hash', bloj);

        return;
      }
    }

    let mined;

    try {
      mined = miner(bloj);
    } catch (e) {
      logger.error('EVENT: bloj:mine', `Failed to mine bloj`, bloj, e);

      return;
    }

    chain.add(mined);

    logger.info('EVENT: bloj:mine', `Bloj was mined`, bloj);
  });
};
