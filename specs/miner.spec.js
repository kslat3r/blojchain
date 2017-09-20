const expect = require('chai').expect;
const miner = require('../src/miner');

describe('miner', function() {
  it('should mine the correct nonce/hash', () => {
    const mined = miner({
      index: 1,
      data: 'foo',
    });

    expect(mined).to.deep.equal({
      index: 1,
      data: 'foo',
      nonce: 487,
      hash: '00093c9e5a82442f736e26876b26189c47bff578910684852934fd1cbdc7cb6c',
    })
  });
});
