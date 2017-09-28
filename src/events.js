const logger = require('./logger');
const miner = require('./miner');
const chain = require('./chain');
const verifier = require('./verifier');

module.exports = (peer) => {
  // mine event

  peer.handle.mine = (payload, done) => {
    logger.info(`Block received to be mined: ${JSON.stringify(payload)}`);

    let mined;

    try {
      mined = miner(payload);
    } catch (e) {
      logger.info(`Failed to mine block ${mined.index}: ${JSON.stringify(e)}`);

      return done(e);
    }

    logger.info(`Block ${mined.index} was mined`);

    return done(null, mined);
  };

  // block added event

  peer.handle.blockAdded = (payload, done) => {
    logger.info(`Block received to be added: ${JSON.stringify(payload)}`);

    if (verifier(payload)) {
      return done();
    }

    return done(new Error(`Could not verify block ${payload.index}`));
  };
};
