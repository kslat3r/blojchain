const expect = require('chai').expect;
const hasher = require('../../src/lib/hasher');

describe('hasher', () => {
  it('should create the correct hash', () => {
    const hashed = hasher('foobar');

    expect(hashed).to.equal('c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2');
  });
});
