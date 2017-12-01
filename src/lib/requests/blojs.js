const Requests = require('./');
const logger = require('../logger');

class Blojs extends Requests {
  async getFromPeer(peer) {
    try {
      return await super.get(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs`);
    } catch (e) {
      logger.error('REQUESTS blojs:getFromPeer', e);
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

  async postToPeer(peer, bloj) {
    try {
      return await super.post(`http://${peer.meta.serverHost}:${peer.meta.serverPort}/blojs`, bloj);
    } catch (e) {
      logger.error('REQUESTS blojs:postToPeer', e);
    }
  }

  async postToPeers(peers, bloj) {
    return await Promise.all(peers.map(async (peer) => await this.postToPeer(peer, bloj)));
  }
}

module.exports = new Blojs();
