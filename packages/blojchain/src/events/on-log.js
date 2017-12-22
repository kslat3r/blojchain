const socket = require('../socket');
const netConfig = require('../../config/net');

module.exports = (data) => {
  socket.emit(`log`, {
    host: netConfig.nodeHost,
    port: netConfig.port,
    data,
  });
};
