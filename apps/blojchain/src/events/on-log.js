const socket = require('../socket');
const netConfig = require('../../config/net');

module.exports = (data) => {
  socket.emit(`${netConfig.nodeHost}:${netConfig.nodePort}:log`, Object.assign({}, data, {
    timestamp: new Date().getTime(),
  }));
};
