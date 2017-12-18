const Requests = require('./');
const logger = require('../logger');

class Blojs extends Requests {
  async getFromPeer(peer) {
    try {
      return await super.get(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs`);
    } catch (e) {
      logger.error('REQUESTS blojs:getFromPeer', e);

      return e.error;
    }
  }

  async getFromPeers(peers) {
    return await Promise.all(peers.map(async (peer) => await this.getFromPeer(peer)));
  }

  async getHashFromPeer(peer) {
    try {
      return await super.get(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs/hash`);
    } catch (e) {
      logger.error('REQUESTS blojs:getHashFromPeer', e);

      return e.error;
    }
  }

  async getHashesFromPeers(peers) {
    return await Promise.all(peers.map(async (peer) => {
      return {
        peer: peer,
        hash: await this.getHashFromPeer(peer),
      };
    }));
  }

  async mineByPeer(peer, bloj) {
    try {
      return await super.post(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs/mine`, bloj);
    } catch (e) {
      logger.error('REQUESTS blojs:mineByPeer', e);

      return e.error;
    }
  }

  async mineByPeers(peers, bloj) {
    return await Promise.all(peers.map(async (peer) => await this.mineByPeer(peer, bloj)));
  }

  async verifyByPeer(peer, bloj) {
    try {
      return await super.post(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs/verify`, bloj);
    } catch (e) {
      logger.error('REQUESTS blojs:verifyByPeer', e);

      return e.error;
    }
  }

  async verifyByPeers(peers, bloj) {
    return await Promise.all(peers.map(async (peer) => await this.verifyByPeer(peer, bloj)));
  }
}

module.exports = new Blojs();
