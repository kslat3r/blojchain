const p2p = require('p2p');
const knownPeers = require('../config/known-peers');

module.exports = (host, port) => {
  return p2p.peer({
    host,
    port,
    wellKnownPeers: knownPeers,
  });
};
