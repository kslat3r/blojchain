const nodes = require('./nodes');

module.exports = {
  getaddr: () => {
    const allNodes = nodes.getAll();

    allNodes.forEach((node) => {
      node.client.write('getaddr');
    });
  },
}
