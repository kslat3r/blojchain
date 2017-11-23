const expect = require('chai').expect;
const chainVerifier = require('../../src/lib/verifier/chain');

describe('chainVerifier', function() {
  it('is a function', () => {
    expect(typeof chainVerifier).to.equal('function');
  });
});
