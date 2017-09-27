const logger = require('./logger');

let connectedNodes = [];

module.exports = {
  add: (host, port, client) => {
    const found = connectedNodes.find(node => node.host === host && node.port === port);

    if (!found) {
      logger.info(`Node added: ${host}:${port}`)

      connectedNodes.push({
        host,
        port,
        client,
      });
    }
  },

  remove: (host, port) => {
    logger.info(`Node removed: ${host}:${port}`)

    connectedNodes = connectedNodes.filter(node => node.host !== host || node.port !== port);
  },

  reset: () => {
    logger.info(`Nodes reset`)

    connectedNodes = [];
  },

  getAll: () => {
    return connectedNodes;
  }
}
