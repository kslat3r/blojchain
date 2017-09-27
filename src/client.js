const net = require('net');
const logger = require('./logger');
const nodes = require('./nodes');

module.exports = (host, port) => {
  return new Promise((resolve) => {
    const client = new net.Socket();

    client.connect(port, host, () => {
      logger.info(`Client connected to: ${host}:${port}`);

      nodes.add(host, port, client);

      return resolve();
    });

    client.on('data', (data) => {
      console.log(data);
    });
  });
};
