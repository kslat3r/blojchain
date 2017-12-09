const logger = require('./logger');
const Swim = require('swim');
const SwimError = require('swim/lib/error');
const uniqid = require('uniqid');
const seeds = require('../config/seeds.json');

class Node {
  constructor(opts) {
    this.opts = opts;
    this.id = uniqid();

    this.start();
  }

  start() {
    logger.info(`NODE creating instance ${this.id}`);

    this.connection = new Swim({
      local: {
        host: `${this.opts.host}:${this.opts.port}`,
        meta: {
          id: this.id,
          serverHost: this.opts.serverHost,
          serverPort: this.opts.serverPort,
        },
      },
      interval: 1000,
      joinTimeout: 10000,
    });

    this.connection.bootstrap(!process.env.SEED ? seeds : []);

    this.connection.on(Swim.EventType.Error, (err) => {
      this.onError(err);
    });

    this.connection.on(Swim.EventType.Ready, () => {
      if (this.opts.onReady) {
        this.opts.onReady(this.getPeers());
      }
    });
  }

  stop() {
    this.connection.leave();
  }

  onError(err) {
    logger.error(`NODE error`, err);

    if (err instanceof SwimError.JoinFailedError) {
      this.stop();
      this.start();
    }
  }

  getPeers() {
    return this.connection.members();
  }
}

module.exports = Node;
