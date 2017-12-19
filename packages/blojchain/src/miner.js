const TaskQueue = require('./lib/TaskQueue');
const mine = require('./helpers/mine');
const logger = require('./logger');
const blojsRequests = require('./requests/blojs');
const node = require('./node');

class Miner extends TaskQueue {
  constructor() {
    super({
      name: 'miner',
    });

    this.removed = [];
  }

  process(bloj, done) {
    let mined;

    try {
      // mine!

      mined = mine(bloj, 50);
    } catch (e) {
      logger.error('MINER error', e);

      return done();
    }

    if (!mined.hash) {
      // mining wasn't successful this round

      if (this.removed.indexOf(mined.index) !== -1) {
        // bloj was removed from processing pool by another miner

        this.removed.splice(this.removed.indexOf(mined.index), 1);
      } else {
        // bloj is still to be mined

        this.unshift(bloj);
      }
    }

    if (mined.hash) {
      // mining was successful

      blojsRequests.verifyByPeers(node.getPeers(), mined);

      logger.info('MINER Bloj was mined', mined);
    }

    setTimeout(() => {
      done();
    }, Math.floor(Math.random() * 50) + 1); // random entropy
  }

  unshift(bloj) {
    super.unshift(`${bloj.index || 0}-${bloj.nonce || 0}`, (done) => {
      this.process(bloj, done);
    });
  }

  push(bloj) {
    super.push(`${bloj.index || 0}-${bloj.nonce || 0}`, (done) => {
      this.process(bloj, done);
    });
  }

  remove(bloj) {
    if (!bloj.index) {
      throw new Error('Bloj to remove from mining queue must have an index');
    }

    super.remove(bloj.index);

    this.removed.push(bloj.index);
  }
}

module.exports = new Miner().start();
