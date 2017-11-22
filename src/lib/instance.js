const Server = require('./server');
const Node = require('./node');

const serverHost = process.env.SERVER_HOST || '0.0.0.0';
const serverPort = process.env.SERVER_PORT || 3000;
const nodeHost = process.env.NODE_HOST || '0.0.0.0';
const nodePort = process.env.NODE_PORT || 53645;

let server;
let node;

module.exports = {
  createServer: (opts = {}) => {
    server = new Server(Object.assign({}, {
      host: serverHost,
      port: serverPort
    }, opts));

    return server;
  },

  getServer: () => {
    return server;
  },

  createNode: (opts = {}) => {
    node = new Node(Object.assign({}, {
      host: nodeHost,
      port: nodePort,
      serverHost,
      serverPort,
    }, opts));

    return node;
  },

  getNode: () => {
    return node;
  },
};
