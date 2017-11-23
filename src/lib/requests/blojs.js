const Requests = require('./');

class Blojs extends Requests {
  async getFromPeer (peer) {
    try {
      return await super.get(`http://${peer.transport.serverHost}:${peer.transport.serverPort}/blojs`);
    } catch (e) {
      return [];
    }
  }
}

module.exports = new Blojs();
