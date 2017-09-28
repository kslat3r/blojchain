const logger = require('./logger');
const miner = require('./miner');
const chain = require('./chain');
const verifier = require('./verifier');

module.exports = (peer) => {
  // mine event

  peer.handle.mine = (block, done) => {
    logger.debug(`Block received to be mined: ${JSON.stringify(block)}`);

    let mined;

    try {
      mined = miner(block);
    } catch (e) {
      logger.debug(`Failed to mine block ${block.index}: ${JSON.stringify(e)}`);

      return done(e);
    }

    chain.add(mined);

    logger.debug(`Block ${mined.index} was mined`);

    return done(null, mined);
  };

  // block added event

  peer.handle.blockAdded = (block, done) => {
    logger.debug(`Block received to be added: ${JSON.stringify(block)}`);

    if (verifier(block)) {
      chain.add(block);

      logger.debug(`Block added to chain: ${block.index}`);

      return done();
    }

    logger.debug(`Block could not be verified: ${block.index}`);

    return done(new Error(`Could not verify block ${block.index}`));
  };
};
