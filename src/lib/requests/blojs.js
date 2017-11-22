const instance = require('../instance');
const Requests = require('./');

class Blojs extends Requests {
  async get () {
    const peers = instance.getNode().getPeers();
    const urls = peers.map(peer => `${peer.transport.serverHost}:${peer.transport.serverPort}`);

    const results = await Promise.all(urls.map(async (url) => {
      try {
        return await super.get(`http://${url}/blojs`);
      } catch (e) {
        return null;
      }
    }));

    return results.filter(result => !!result);
  }
}

module.exports = new Blojs();
