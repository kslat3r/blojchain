const expect = require('chai').expect;
const mine = require('../../src/helpers/mine');

describe('mine', () => {
  it('should mine the correct nonce/hash', () => {
    const mined = mine({
      index: 1,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      timestamp: 10000,
    });

    expect(mined).to.deep.equal({
      index: 1,
      nonce: 58408,
      data: 'foo',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '0000636f8c8a434295799ffb4d960d11fb3c1a4996f5745ff8d9dc562eb3e093',
      timestamp: 10000,
    });
  });
});
