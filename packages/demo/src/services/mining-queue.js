const api = require('./api');

export function* get(node) {
  return yield api.get(`http://${node.meta.serverHost}:${node.meta.serverPort}/queues/miner`);
}