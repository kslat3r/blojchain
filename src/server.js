require('dotenv').config();

const net = require('net');
const logger = require('./logger');

module.exports = (host, port) => {
  net.createServer((socket) => {
    logger.info(`Server connection from: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => {
      console.log(data);

      socket.write(data);
    });
  }).listen(port, host);

  logger.info(`Server bound to ${host}:${port}`);
};
