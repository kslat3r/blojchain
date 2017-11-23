const expect = require('chai').expect;
const blojVerifier = require('../../../src/lib/verifier/bloj');

describe('verifier', () => {
  it('should verify a block is correct', () => {
    const verified = blojVerifier({
      index: 1,
      nonce: 4786,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '000cc5e9884848c326f3fae612251c58a39217a724c23437a46ea45a1de05dfa',
    });

    expect(verified).to.be.true;
  });
});
