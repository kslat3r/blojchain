const Requests = require('./');
const logger = require('../logger');

class ConfirmRequests extends Requests {
  async byPeer(peer, bloj) {
    try {
      return await super.post(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/confirm`, bloj);
    } catch (e) {
      logger.error('REQUESTS confirm:byPeer', e);

      return e.error;
    }
  }

  async byPeers(peers, bloj) {
    return await Promise.all(peers.map(async (peer) => await this.byPeer(peer, bloj)));
  }
}

module.exports = new ConfirmRequests();
