const api = require('./api');

export function* get(node) {
  return yield api.get(`http://${node.meta.serverHost}:${node.meta.serverPort}/blojs`);
}

export function* create(args) {
  const [
    bloj,
    node,
  ] = args;

  return yield api.post(`http://${node.meta.serverHost}:${node.meta.serverPort}/blojs`, bloj);
}