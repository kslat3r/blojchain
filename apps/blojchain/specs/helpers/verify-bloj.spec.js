const expect = require('chai').expect;
const verifyBloj = require('../../src/helpers/verify-bloj');

describe('verifyBloj', () => {
  it('should verify a blojs is correct', () => {
    const verified = verifyBloj({
      height: 1,
      nonce: 19197,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '00003b720beba79a980027249214f6a7ecde5732e91c0bdce5881ecf8226ed1f',
      timestamp: 10000,
    });

    expect(verified).to.be.true;
  });
});
