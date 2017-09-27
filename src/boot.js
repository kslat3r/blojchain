const knownNodes = require('../config/known-nodes.json');
const server = require('./server');
const client = require('./client');
const network = require('./network');

const port = process.env.PORT || 53645;
const host = process.env.HOST || 'localhost';
const randomNode = knownNodes[Math.floor(Math.random() * knownNodes.length)];

server(host, port);

client(randomNode.host, randomNode.port)
  .then(() => {
    network.getaddr();
  });
