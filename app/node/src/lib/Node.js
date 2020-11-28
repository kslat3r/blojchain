const logger = require('../logger');
const Swim = require('swim');
const SwimError = require('swim/lib/error');
const uniqid = require('uniqid');
const seeds = require('../../config/seeds.json');

class Node {
  constructor(opts) {
    this.opts = opts;

    this.id = uniqid();
    this.seeds = process.env.SEED ? [process.env.SEED] : seeds;

    logger.debug(`NODE creating instance ${this.id}`);

    this.connect();
  }

  connect() {
    this.connection = new Swim({
      local: {
        host: `${this.opts.host}:${this.opts.port}`,
        meta: {
          id: this.id,
          serverHost: this.opts.serverHost,
          serverPort: this.opts.serverPort,
          socketHost: this.opts.socketHost,
          socketPort: this.opts.socketPort,
        },
      },
      interval: 1000,
      joinTimeout: 10000,
    });

    this.connection.bootstrap(this.seeds);

    this.connection.on(Swim.EventType.Error, (err) => {
      this.onError(err);
    });

    this.connection.on(Swim.EventType.Ready, () => {
      logger.info(`NODE listening on ${this.opts.host}:${this.opts.port}`)

      if (this.opts.onReady) {
        this.opts.onReady(this.getPeers());
      }
    });
  }

  reconnect() {
    logger.debug(`NODE recreating instance ${this.id}`);

    this.connect();
  }

  disconnect() {
    this.connection.leave();
  }

  onError(err) {
    logger.error(`NODE error`, err);

    if (err instanceof SwimError.JoinFailedError) {
      this.disconnect();
      this.reconnect();
    }
  }

  getPeers(opts = { includeSelf: false }) {
    return this.connection.members(opts.includeSelf);
  }
}

module.exports = Node;
