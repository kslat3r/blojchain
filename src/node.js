const logger = require('./logger');
const net = require('net');
const knownPeers = require('../config/known-peers.json');
const events = require('./events');
const peersGetAll = require('./requests/peers-get-all');

const Node = function (opts) {
  logger.info('NODE creating instance');

  this.opts = opts;
  this.connections = [];
  this.peers = [];

  this.createServer();
  this.connectToPeers(knownPeers);

  events(this);
  peersGetAll(this);
};

Node.prototype.createServer = function () {
  this.server = net.createServer((socket) => {
    logger.info(`NODE connection from ${socket.remoteAddress}:${socket.remotePort}`);
  });

  this.server.listen(this.opts.port, this.opts.host);
};

Node.prototype.connectToPeers = function (peers) {
  peers.forEach((peer) => {
    const connection = new net.Socket();

    connection.connect(peer.port, peer.host);

    this.connections.push(connection);
    this.peers.push(peer);
  });
};

Node.prototype.handshakeWithPeers = function () {

};

Node.prototype.getPeers = function () {
  return this.peers;
};

Node.prototype.addPeers = function (peers) {
  const filteredPeers = peers.filter((peer) => {
    return !this.peers.find(existingPeer => existingPeer.host === peer.host && existingPeer.port === peer.port);
  });

  this.connectToPeers(filteredPeers);
};

Node.prototype.emit = function (event, data) {
  this.connections.forEach((connection) => {
    connection.write(`${event}:${JSON.stringify(data)}`);
  });
};

Node.prototype.on = function (event, cb) {
  this.connections.forEach((connection) => {
    connection.on(event, cb);
  });
};

module.exports = Node;
