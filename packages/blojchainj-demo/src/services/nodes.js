const api = require('./api');

export function* get(seed) {
  return yield api.get(`http://${seed.meta.serverHost}:${seed.meta.serverPort}/peers`);
}