const Requests = require('./');
const logger = require('../logger');

class BlojsRequests extends Requests {
  async fromPeer(peer) {
    try {
      return await super.get(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs`);
    } catch (e) {
      logger.error('REQUESTS blojs:getFromPeer', e);

      return e.error;
    }
  }

  async fromPeers(peers) {
    return await Promise.all(peers.map(async (peer) => await this.fromPeer(peer)));
  }

  async hashFromPeer(peer) {
    try {
      return await super.get(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs/hash`);
    } catch (e) {
      logger.error('REQUESTS blojs:getHashFromPeer', e);

      return e.error;
    }
  }

  async hashesFromPeers(peers) {
    return await Promise.all(peers.map(async (peer) => {
      return {
        peer: peer,
        hash: await this.hashFromPeer(peer),
      };
    }));
  }
}

module.exports = new BlojsRequests();
