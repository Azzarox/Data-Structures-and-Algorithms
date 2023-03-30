const { expect } = require('chai');
const { describe } = require('mocha');
const { twoCrystalBalls } = require('./TwoCrystalBalls');

describe('Two Crystal Balls Test Case', () => {
    it('returns -1 if all elements are false', function () {
        const arr = [false, false, false, false];
        const result = twoCrystalBalls(arr);
        expect(result).to.equal(-1);
    });

    it('returns the last index if there is only one true element and it is at the end', function () {
        const arr = [false, false, false, false, true];
        const result = twoCrystalBalls(arr);
        expect(result).to.equal(4);
    });
});
