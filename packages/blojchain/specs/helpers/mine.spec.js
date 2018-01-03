const expect = require('chai').expect;
const mine = require('../../src/helpers/mine');

describe('mine', () => {
  it('should mine the correct nonce/hash', () => {
    const mined = mine({
      height: 1,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      timestamp: 10000,
    });

    expect(mined).to.deep.equal({
      height: 1,
      nonce: 19197,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '00003b720beba79a980027249214f6a7ecde5732e91c0bdce5881ecf8226ed1f',
      timestamp: 10000,
    });
  });
});
