const TaskQueue = require('./lib/TaskQueue');
const uniqid = require('uniqid');
const hash = require('./helpers/hash');
const mine = require('./helpers/mine');
const logger = require('./logger');
const verifyRequests = require('./requests/verify');
const node = require('./node');
const chain = require('./chain');
const netConfig = require('../config/net');
const onMinerPush = require('./events/on-miner-push');
const onMined = require('./events/on-mined');
const onMinerRemove = require('./events/on-miner-remove');

class Miner extends TaskQueue {
  constructor() {
    super({
      name: 'miner',
    });

    this.candidates = [];
    this.removed = [];
  }

  process(bloj, done) {
    // add bloj details from last bloj

    const lastBloj = chain.selectLast();

    bloj.id = bloj.id || hash(uniqid());
    bloj.index = lastBloj.index + 1;
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
      if (this.removed.indexOf(mined.index) !== -1) {
        // bloj was removed from processing pool by another miner

        this.removed.splice(this.removed.indexOf(mined.index), 1);
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

      // send event

      onMined(mined);

      // remove from candidates

      this.removeCandidate(mined);
    }

    setTimeout(() => {
      done();
    }, Math.floor(Math.random() * 50) + 1); // random entropy
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

    this.candidates.push(bloj);

    onMinerPush(bloj);
  }

  remove(bloj) {
    super.remove(bloj.id);

    this.removeCandidate(bloj);
    this.removed.push(bloj.id);

    onMinerRemove(bloj);
  }

  getCandidates() {
    return this.candidates;
  }

  removeCandidate(bloj) {
    this.candidates.splice(this.candidates.findIndex(c => c.id === bloj.id), 1);
  }
}

module.exports = new Miner().start();
