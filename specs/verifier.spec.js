const expect = require('chai').expect;
const verifier = require('../src/verifier');

describe('verifier', function() {
  it('should verify a block is correct', () => {
    const verified = verifier({
      index: 1,
      nonce: 4786,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '000cc5e9884848c326f3fae612251c58a39217a724c23437a46ea45a1de05dfa',
    });

    expect(verified).to.be.true;
  });
});
