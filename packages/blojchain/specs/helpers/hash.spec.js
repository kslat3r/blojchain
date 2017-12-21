const expect = require('chai').expect;
const hash = require('../../src/helpers/hash');

describe('hash', () => {
  it('should create the correct hash', () => {
    const hashed = hash('foobar');

    expect(hashed).to.equal('c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2');
  });
});
