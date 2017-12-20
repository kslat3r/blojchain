const Server = require('./server/index');
const netConfig = require('../config/net');

module.exports = new Server({
  host: netConfig.serverHost,
  port: netConfig.serverPort,
});
