const blojVerifier = require('./bloj');
const mine = require('../helpers/mine');

module.exports = (chain, start = 0, end = 0) => {
  end = end || chain.length;

  chain = chain
    .sort((a, b) => a.index - b.index)
    .slice(start, end);

  for (let i = 1; i < chain.length; i++) {
    if (!blojVerifier(chain[i])) {
      return false;
    }
  }

  return true;
};
