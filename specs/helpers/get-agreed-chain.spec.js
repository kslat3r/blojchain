const expect = require('chai').expect;
const getAgreedChain = require('../../src/helpers/get-agreed-chain');

describe('get-agreed-chain', function() {
  it('is a function', () => {
    expect(typeof getAgreedChain).to.equal('function');
  });
});
