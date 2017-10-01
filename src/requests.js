const chain = require('./chain');

let peer;

module.exports = {
  bind: (_peer) => {
    peer = _peer;
  },

  mineBlock: (block) => {
    peer.remote().run('handle/mineBlock', block, (err, result) => {

    });
  },

  blockAdded: (block) => {
    peer.remote().run('handle/blockAdded', block, (err, result) => {

    });
  },

  getBlocks: () => {
    peer.remote().run('handle/getBlocks', (err, result) => {
      if (err) {
        throw err;
      }

      chain.populate(result);
    });
  },
};
