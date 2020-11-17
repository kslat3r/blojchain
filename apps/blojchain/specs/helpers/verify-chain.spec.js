const expect = require('chai').expect;
const verifyChain = require('../../src/helpers/verify-chain');
const validChain = require('../stubs/valid-chain.json');
const invalidChain = require('../stubs/invalid-chain.json')

describe('verifyChain', function() {
  it('is a function', () => {
    expect(typeof verifyChain).to.equal('function');
  });

  it('should return true if the chain is valid', () => {
    expect(verifyChain(validChain)).to.equal(true);
  });

  it('should return false if the chain is invalid', () => {
    expect(verifyChain(invalidChain)).to.equal(false);
  });

  it('should return true if the chain is valid for a subsection', () => {
    expect(verifyChain(validChain, 2, 4)).to.equal(true);
  });

  it('should return false if the chain is invalid for a subsection', () => {
    expect(verifyChain(invalidChain, 2, 4)).to.equal(false);
  });
});
