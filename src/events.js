const logger = require('./logger');
const miner = require('./miner');
const chain = require('./chain');
const verifier = require('./verifier');

module.exports = {
  bind: (peer) => {
    // mine event

    peer.handle.mineBlock = (block, done) => {
      logger.debug(`Bloj received to be mined: ${JSON.stringify(block)}`);

      let mined;

      try {
        mined = miner(block);
      } catch (e) {
        logger.debug(`Failed to mine bloj ${block.index}: ${JSON.stringify(e)}`);

        return done(e);
      }

      chain.add(mined);

      logger.debug(`Bloj ${mined.index} was mined`);

      return done(null, mined);
    };

    // block added event

    peer.handle.blockAdded = (block, done) => {
      logger.debug(`Bloj received to be added: ${JSON.stringify(block)}`);

      if (verifier(block)) {
        chain.add(block);

        logger.debug(`Bloj added to chain: ${block.index}`);

        return done();
      }

      logger.debug(`Bloj could not be verified: ${block.index}`);

      return done(new Error(`Could not verify bloj ${block.index}`));
    };

    // get blocks

    peer.handle.getBlocks = (payload, done) => {
      logger.debug('Request to get all blojs');

      return done(null, chain.get())
    };
  },
};
