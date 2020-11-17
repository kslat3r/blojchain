const api = require('./api');

export function* get() {
  return yield api.get(`http://${process.env.REACT_APP_SEED_HOST}:${process.env.REACT_APP_SEED_PORT}/peers`);
}