const socket = require('../socket');
const netConfig = require('../../config/net');

module.exports = (obj) => {
  socket.emit(`${netConfig.nodeHost}:${netConfig.nodePort}:create`, obj);
};
