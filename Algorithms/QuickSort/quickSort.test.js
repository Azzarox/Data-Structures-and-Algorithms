const { expect } = require('chai');
const { describe } = require('mocha');
const { quicksort } = require('./quickSort');


describe('Testing quicksort()', () => {
    it('should return empty array if used on empty array', () => {
        const arr = [];
        quicksort(arr);
        expect(arr).to.deep.equal([]);
    });

    it('should sort array with 1 element', () => {
        const arr = [4];
        quicksort(arr);
        expect(arr).to.deep.equal([4]);
    });

    it('should correctly sort the array', () => {
        const arr = [4, 8, 1, 3, 9];
        quicksort(arr);
        expect(arr).to.deep.equal([1, 3, 4, 8, 9]);
    });

    it('should correctly sort array with 20 numbers', () => {
        const arr = [
            15, 9, 17, 10, 14, 8, 19, 6, 7, 1, 20, 3, 12, 16, 4, 5, 11, 2, 18,
            13,
        ];
        const result = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
        ];
        quicksort(arr);
        expect(arr).to.deep.equal(result);
    });
});
