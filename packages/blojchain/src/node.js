const Node = require('./lib/Node');
const onReady = require('./events/on-ready');

const serverHost = process.env.SERVER_HOST || '127.0.0.1';
const serverPort = process.env.SERVER_PORT || 3000;
const nodeHost = process.env.NODE_HOST || '127.0.0.1';
const nodePort = process.env.NODE_PORT || 55356;

module.exports = new Node({
  host: nodeHost,
  port: nodePort,
  serverHost,
  serverPort,
  onReady,
});
