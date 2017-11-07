const logger = require('./logger');
const Gossipmonger = require('gossipmonger');
const uniqid = require('uniqid');
const seeds = require('../config/seeds.json');

class Peer {
  constructor(opts) {
    this.id = uniqid();
    this.opts = opts;
    this.peers = [];

    this.connection = new Gossipmonger({
      id: this.id,
      transport: {
        host: this.opts.host,
        port: this.opts.port,
      },
    }, {
      seeds,
    });

    logger.info(`PEER creating instance ${this.id}`);

    this.onError();
    this.onNewPeer();
    this.onPeerDead();
    this.start();
  }

  onError() {
    this.connection.on('error', () => {
      // logger.error('PEER', error);
    });
  }

  onNewPeer() {
    ['new peer', 'peer live'].forEach((event) => {
      this.connection.on(event, (newPeer) => {
        const existingPeer = this.peers.find((peer) => {
          return peer.id === newPeer.id;
        });

        if (!existingPeer && newPeer.id !== this.id) {
          logger.info(`PEER new peer connected (${event}) ${newPeer.id}`);

          this.peers.push(newPeer);
        }
      });
    });
  }

  onPeerDead() {
    this.connection.on('peer dead', (deadPeer) => {
      logger.info(`PEER peer disconnected ${deadPeer.id}`);

      this.peers = this.peers.filter((peer) => {
        return peer.id !== deadPeer.id;
      });
    });
  }

  start() {
    this.connection.transport.listen(() => {
      logger.info(`PEER listening on ${this.opts.host}:${this.opts.port}`);
    });

    this.connection.gossip();
  }
}

module.exports = Peer;
