const expect = require('chai').expect;
const chainVerifier = require('../../../src/lib/verifiers/chain');
const validChain = require('../../stubs/valid-chain.json');
const invalidChain = require('../../stubs/invalid-chain.json')

describe('chainVerifier', function() {
  it('is a function', () => {
    expect(typeof chainVerifier).to.equal('function');
  });

  it('should return true if the chain is valid', () => {
    expect(chainVerifier(validChain)).to.equal(true);
  });

  it('should return false if the chain is invalid', () => {
    expect(chainVerifier(invalidChain)).to.equal(false);
  });

  it('should return true if the chain is valid for a subsection', () => {
    expect(chainVerifier(validChain, 3, 7)).to.equal(true);
  });

  it('should return false if the chain is invalid for a subsection', () => {
    expect(chainVerifier(invalidChain, 3, 7)).to.equal(false);
  });
});
