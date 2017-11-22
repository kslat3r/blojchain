const instance = require('../instance');
const Requests = require('./');

class Blojs extends Requests {
  async get () {
    const peers = instance.getNode().getPeers();

    console.log(peers);

    return await super.get('/blojs');
  }
}

module.exports = new Blojs();
