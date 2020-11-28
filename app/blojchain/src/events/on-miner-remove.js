const socket = require('../socket');
const netConfig = require('../../config/net');

module.exports = (bloj) => {
  socket.emit(`${netConfig.nodeHost}:${netConfig.nodePort}:miner:remove`, bloj);
};
