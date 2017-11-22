const Server = require('./server');
const Node = require('./node');

const serverHost = process.env.SERVER_HOST || '127.0.0.1';
const serverPort = process.env.SERVER_PORT || 3000;
const nodeHost = process.env.NODE_HOST || '127.0.0.1';
const nodePort = process.env.PEER_PORT || 53645;

let server;
let node;

module.exports = {
  createServer: () => {
    server = new Server({
      host: serverHost,
      port: serverPort
    });

    return server;
  },

  getServer: () => {
    return server;
  },

  createNode: () => {
    node = new Node({
      host: nodeHost,
      port: nodePort,
      serverHost,
      serverPort,
    });

    return node;
  },

  getNode: () => {
    return node;
  },
};
