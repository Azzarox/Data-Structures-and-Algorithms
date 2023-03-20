const { expect } = require('chai');
const { describe } = require('mocha');
const { bubbleSort, bubbleSortRecursive } = require('./bubbleSort');

describe('Bubble Sort Iterative Test Case', () => {
    it('should sort array correctly', () => {
        let arr = [12, 3, 45, 80, 33, 77];
        bubbleSort(arr);
        expect(arr).to.deep.equal([3, 12, 33, 45, 77, 80]);
    });
    
    it('should not modify a sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        bubbleSort(arr);
        expect(arr).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should handle an empty array', () => {
        const arr = [];
        bubbleSort(arr);
        expect(arr).to.deep.equal([]);
    });
});

describe('Bubble Sort Recursive Test Case', () => {
    it('should sort array correctly', () => {
        let arr = [12, 3, 45, 80, 33, 77];
        bubbleSortRecursive(arr, arr.length);
        expect(arr).to.deep.equal([3, 12, 33, 45, 77, 80]);
    });

    it('should not modify a sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        bubbleSortRecursive(arr, arr.length);
        expect(arr).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should handle an empty array', () => {
        const arr = [];
        bubbleSortRecursive(arr, arr.length);
        expect(arr).to.deep.equal([]);
    });
});
