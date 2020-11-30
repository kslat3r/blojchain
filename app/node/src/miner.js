const TaskQueue = require('./lib/TaskQueue');
const mine = require('./helpers/mine');
const logger = require('./logger');
const verifyRequests = require('./requests/verify');
const node = require('./node');
const chain = require('./chain');
const netConfig = require('../config/net');
const onMinerPush = require('./events/on-miner-push');
const onMinerRemove = require('./events/on-miner-remove');

class Miner extends TaskQueue {
  constructor() {
    super({
      name: 'miner',
    });

    this.queue = [];
    this.removed = [];
  }

  process(bloj, done) {
    // add bloj details from last bloj

    const lastBloj = chain.selectLast();

    bloj.height = lastBloj.height + 1;
    bloj.prevHash = lastBloj.hash;
    bloj.timestamp = new Date().getTime();
    bloj.confirmations = [];

    // let's go

    let mined;

    try {
      mined = mine(bloj, 50);
    } catch (e) {
      logger.error('MINER error', e);

      return done();
    }

    // mining wasn't successful this round

    if (!mined.hash) {
      if (this.removed.indexOf(mined.id) !== -1) {
        // bloj was removed from processing pool by another miner

        this.removed.splice(this.removed.indexOf(mined.id), 1);
      } else {
        // bloj is still to be mined

        this.unshift(bloj);
      }
    }

    // mining was successful

    if (mined.hash) {
      // we have confirmed this once!

      mined.confirmations.push(`${netConfig.nodeHost}:${netConfig.nodePort}`);

      // add to chain

      chain.create(mined);

      // tell peers

      verifyRequests.byPeers(node.getPeers(), mined);

      logger.info('MINER', 'Mined bloj');
      logger.debug(mined);

      // remove from queue

      this.remove(mined);
    }

    done();
  }

  unshift(bloj) {
    super.unshift(bloj.id, (done) => {
      this.process(bloj, done);
    });
  }

  push(bloj) {
    super.push(bloj.id, (done) => {
      this.process(bloj, done);
    });

    this.queue.push(bloj);

    onMinerPush(bloj);
  }

  remove(bloj) {
    this.queue.splice(this.queue.findIndex(item => item.id === bloj.id), 1);
    this.removed.push(bloj.id);

    onMinerRemove(bloj);
  }

  getQueue() {
    return this.queue;
  }
}

module.exports = new Miner().start();
