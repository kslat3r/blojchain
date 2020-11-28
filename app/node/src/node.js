const Node = require('./lib/Node');
const onReady = require('./events/on-ready');
const netConfig = require('../config/net');

module.exports = new Node({
  host: netConfig.nodeHost,
  port: netConfig.nodePort,
  serverHost: netConfig.serverHost,
  serverPort: netConfig.serverPort,
  socketHost: netConfig.socketHost,
  socketPort: netConfig.socketPort,
  onReady,
});
