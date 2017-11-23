const Request = require('./');

class Blojs extends Request {
  async getFromPeer (peer) {
    try {
      return await super.get(`http://${peer.transport.serverHost}:${peer.transport.serverPort}/blojs`);
    } catch (e) {
      return [];
    }
  }
}

module.exports = new Blojs();
