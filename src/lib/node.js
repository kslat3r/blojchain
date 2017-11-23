const logger = require('./logger');
const Gossipmonger = require('gossipmonger');
const uniqid = require('uniqid');
const seeds = require('../../config/seeds.json');

class Node {
  constructor(opts) {
    this.opts = opts;

    this.id = uniqid();
    this.peers = [];
    this.connection = new Gossipmonger({
      id: this.id,
      transport: {
        host: this.opts.host,
        port: this.opts.port,
        serverHost: this.opts.serverHost,
        serverPort: this.opts.serverPort,
      },
    }, {
      seeds,
    });

    logger.info(`NODE creating instance ${this.id}`);

    this.onError();
    this.onNewPeer();
    this.onPeerDead();
    this.start();
  }

  onError() {
    this.connection.on('error', () => {
      // logger.error('NODE', error);
    });
  }

  onNewPeer() {
    ['new peer', 'peer live'].forEach((event) => {
      this.connection.on(event, (newPeer) => {
        const existingPeer = this.peers.find((peer) => {
          return peer.id === newPeer.id;
        });

        if (!existingPeer && newPeer.id !== this.id) {
          logger.info(`NODE new peer connected (${event}) ${newPeer.id}`);

          this.peers.push(newPeer);

          if (this.opts.onPeerConnect) {
            this.opts.onPeerConnect(newPeer);
          }
        }
      });
    });
  }

  onPeerDead() {
    this.connection.on('peer dead', (deadPeer) => {
      logger.info(`NODE peer disconnected ${deadPeer.id}`);

      this.peers = this.peers.filter((peer) => {
        return peer.id !== deadPeer.id;
      });
    });
  }

  getPeers() {
    return this.peers;
  }

  start() {
    this.connection.transport.listen(() => {
      logger.info(`NODE listening on ${this.opts.host}:${this.opts.port}`);
    });

    this.connection.gossip();
  }
}

module.exports = Node;
