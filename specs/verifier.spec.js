const expect = require('chai').expect;
const verifier = require('../src/verifier');

describe('verifier', function() {
  it('should verify a block is correct', () => {
    const verified = verifier({
      index: 1,
      data: 'foo',
      nonce: 487,
      hash: '00093c9e5a82442f736e26876b26189c47bff578910684852934fd1cbdc7cb6c',
    });

    expect(verified).to.be.true;
  });
});
