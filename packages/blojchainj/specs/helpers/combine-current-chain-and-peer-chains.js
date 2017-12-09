const expect = require('chai').expect;
const combineCurrentChainAndPeerChains = require('../../src/helpers/combine-current-chain-and-peer-chains');

describe('combineCurrentChainAndPeerChains', function() {
  it('is a function', () => {
    expect(typeof combineCurrentChainAndPeerChains).to.equal('function');
  });
});
