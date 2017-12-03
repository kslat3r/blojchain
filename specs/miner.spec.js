const expect = require('chai').expect;
const miner = require('../src/miner');

describe('miner', () => {
  it('should mine the correct nonce/hash', () => {
    const mined = miner({
      index: 1,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    });

    expect(mined).to.deep.equal({
      index: 1,
      nonce: 58140,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '00002670f07a29a95d6847d24f3958924161d79b94776e5aa81240bce6fbd211',
    });
  });
});
