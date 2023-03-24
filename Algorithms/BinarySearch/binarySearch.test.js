const { expect } = require('chai');
const { describe } = require('mocha');
const { binarySearch, binarySearchRecursive } = require('./binarySearch');

describe('Binary Search Iterative Test Case', () => {
    it('should return true if the element is found', () => {
        let arr = [1, 3, 6, 8, 10, 12, 14, 15, 16, 17, 90, 108, 230, 5560];

        const result = binarySearch(arr, 6);
        expect(result).to.be.true;
    });

    it('should return false if the element is not found', () => {
        let arr = [1, 3, 6, 8, 10, 12, 14, 15, 16, 17, 90, 108, 230, 5560];

        const result = binarySearch(arr, 200);
        expect(result).to.be.false;
    });

    it('should return false if empty array', () => {
        let arr = [];
        expect(binarySearch(arr, 10)).to.be.false;
    });
});

describe('Binary Search Recursive Test Case', () => {
    it('should return true if the element is found', () => {
        let arr = [1, 3, 6, 8, 10, 12, 14, 15, 16, 17, 90, 108, 230, 5560];

        const resultRecursive = binarySearchRecursive(arr, 6, 0, arr.length);
        expect(resultRecursive).to.be.true;
    });

    it('should return false if the element is not found', () => {
        let arr = [1, 3, 6, 8, 10, 12, 14, 15, 16, 17, 90, 108, 230, 5560];

        const resultRecursive = binarySearchRecursive(arr, 200, 0, arr.length);
        expect(resultRecursive).to.be.false;
    });

    it('should return false if empty array', () => {
        let arr = [];
        expect(binarySearchRecursive(arr, 10, 0, arr.length)).to.be.false;
    });
});
