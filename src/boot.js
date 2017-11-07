const Peer = require('./lib/peer');
const Server = require('./server');

new Peer({
  host: process.env.PEER_HOST || '127.0.0.1',
  port: process.env.PEER_PORT || 53645
});

new Server({
  host: process.env.SERVER_HOST || '127.0.0.1',
  port: process.env.SERVER_PORT || 3000,
});
