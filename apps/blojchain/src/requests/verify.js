const Requests = require('./');
const logger = require('../logger');

class VerifyRequests extends Requests {
  async byPeer(peer, bloj) {
    try {
      return await super.post(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/verify`, bloj);
    } catch (e) {
      logger.error('REQUESTS verify:byPeer', e);

      return e.error;
    }
  }

  async byPeers(peers, bloj) {
    return await Promise.all(peers.map(async (peer) => await this.byPeer(peer, bloj)));
  }
}

module.exports = new VerifyRequests();
