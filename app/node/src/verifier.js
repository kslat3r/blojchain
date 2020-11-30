const TaskQueue = require('./lib/TaskQueue');
const logger = require('./logger');
const verifyBloj = require('./helpers/verify-bloj');
const netConfig = require('../config/net');
const miner = require('./miner');
const chain = require('./chain');
const confirmRequests = require('./requests/confirm');
const node = require('./node');
const onVerifierRemove = require('./events/on-verifier-remove');
const onVerifierPush = require('./events/on-verifier-push');

class Verifier extends TaskQueue {
  constructor() {
    super({
      name: 'verifier',
    });

    this.queue = [];
  }

  process(bloj, done) {
    logger.debug('EVENT verifier');

    if (verifyBloj(bloj)) {
      bloj.confirmations.push(`${netConfig.nodeHost}:${netConfig.nodePort}`);

      miner.remove(bloj);
      chain.create(bloj);

      confirmRequests.byPeers(node.getPeers(), bloj);

      logger.info('VERIFIER', 'Verified bloj');
      logger.debug(bloj);
    } else {
      logger.error('VERIFIER', 'Could not verify bloj', bloj);
    }

    this.remove(bloj);

    done();
  }

  push(bloj) {
    super.push(bloj.id, (done) => {
      this.process(bloj, done);
    });

    this.queue.push(bloj);

    onVerifierPush(bloj);
  }

  remove(bloj) {
    this.queue.splice(this.queue.findIndex(item => item.id === bloj.id), 1);

    onVerifierRemove(bloj);
  }

  getQueue() {
    return this.queue;
  }
}

module.exports = new Verifier().start();
