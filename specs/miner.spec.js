const expect = require('chai').expect;
const miner = require('../src/miner');

describe('miner', function() {
  it('should mine the correct nonce/hash', () => {
    const mined = miner({
      index: 1,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    });

    expect(mined).to.deep.equal({
      index: 1,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      nonce: 4786,
      hash: '000cc5e9884848c326f3fae612251c58a39217a724c23437a46ea45a1de05dfa',
    });
  });
});
