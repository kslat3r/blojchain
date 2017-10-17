const knownPeers = require('../config/known-peers');
const io = require('socket.io-client');

const Client = function () {
  const randomPeer = knownPeers[Math.floor(Math.random() * knownPeers.length)];

  this.socket = io.connect(`http://${randomPeer.host}:${randomPeer.port}`, {
    reconnect: true,
  });
};

Client.prototype.on = function () {

};

Client.prototype.emit = function () {

};

module.exports = Client;
