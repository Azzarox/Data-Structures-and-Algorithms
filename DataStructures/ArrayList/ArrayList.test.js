const { expect } = require('chai');
const { describe } = require('mocha');
const { ArrayList } = require('./ArrayList');

describe('Testing ArrayList implementation', () => {
    let arr;
    let capacity = 4;

    beforeEach(() => {
        arr = new ArrayList(capacity);
    });

    it('Testing initial state', () => {
        expect(arr.capacity).to.equal(capacity);
        expect(arr.length).to.equal(0);
        expect(arr.items).to.be.instanceOf(Array);
    });

    describe('Testing isFull method', () => {
        it('should return true when array is full', () => {
            arr.length = capacity;
            expect(arr.isFull).to.be.true;
        });

        it('should return false when array is NOT full', () => {
            arr.length = 5;
            expect(arr.isFull).to.be.false;
        });
    });

    describe('Testing push() method', () => {
        it('should increase length when pushing value', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            expect(arr.length).to.equal(3);
        });

        it('should correctly push value when array is not full', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            expect(arr.length).to.equal(3);
            expect(arr.items).to.deep.equal([10, 20, 30]);
        });

        it('should correctly resize and push value at the end', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            arr.push(40);
            expect(arr.length).to.equal(4);
            expect(arr.items).to.deep.equal([10, 20, 30, 40]);

            arr.push(50);

            expect(arr.items).to.deep.equal([10, 20, 30, 40, 50]);
            expect(arr.length).to.equal(5);

            expect(arr.capacity).to.equal(8);
        });
    });

    describe('Testing pop() method', () => {
        it('should decrease length when popping value', () => {
            arr.push(10);
            arr.push(20);
            expect(arr.length).to.equal(2);
            arr.pop();
            expect(arr.length).to.equal(1);
        });

        it('should return the popped value', () => {
            arr.push(10);
            arr.push(20);
            let result = arr.pop();
            expect(result).to.equal(20);
        });

        it('should throw error if popping from empty list', () => {
            expect(() => arr.pop()).to.throw('Cannot pop from empty array');
        });
    });

    describe('Testing unshift() method', () => {
        it('should increase the length correctly', () => {
            arr.push(20);
            expect(arr.length).to.equal(1);
            arr.unshift(10);
            expect(arr.length).to.equal(2);
        });

        it('should add value correctly when array is not full', () => {
            arr.push(20);
            arr.push(30);
            arr.push(40);
            expect(arr.items).to.deep.equal([20, 30, 40]);
            arr.unshift(10);
            expect(arr.items).to.deep.equal([10, 20, 30, 40]);
        });

        it('should correctly resize and add value at the beginning', () => {
            arr.push(20);
            arr.push(30);
            arr.push(40);
            arr.push(50);
            expect(arr.items).to.deep.equal([20, 30, 40, 50]);
            expect(arr.length).to.equal(4);
            expect(arr.capacity).to.equal(4);

            arr.unshift(10);

            expect(arr.items).to.deep.equal([10, 20, 30, 40, 50]);
            expect(arr.length).to.equal(5);
            expect(arr.capacity).to.equal(8);
        });
    });

    describe('Testing shift() method', () => {
        it('should decrease length when shifting value', () => {
            arr.push(10);
            expect(arr.length).to.equal(1);
            arr.shift();
            expect(arr.length).to.equal(0);
        });

        it('should return shifted value correctly', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            let result = arr.shift();
            expect(result).to.equal(10);
        });

        it('should throw error if shifting from empty list', () => {
            expect(() => arr.shift()).to.throw('Cannot shift from empty array');
        });
    });

    describe('Testing insert() method', () => {
        it('should increase length when inserting', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            expect(arr.length).to.equal(3);
            arr.insert(1, 40);
            expect(arr.length).to.equal(4);
        });

        it('should throw error if index is less than 0', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);

            expect(() => arr.insert(-1, 20)).to.throw('Index out of bounds');
        });

        it('should throw error if index is bigger or equal to the length', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);

            expect(() => arr.insert(10, 20)).to.throw('Index out of bounds');
            expect(() => arr.insert(arr.length, 20)).to.throw(
                'Index out of bounds'
            );
        });

        it('should correctly insert value at valid index and when array is not full', () => {
            arr.push(10);
            arr.push(30);
            arr.push(40);
            expect(arr.items).to.deep.equal([10, 30, 40]);
            arr.insert(1, 20);
            expect(arr.items).to.deep.equal([10, 20, 30, 40]);
        });

        it('should correctly resize and insert value', () => {
            arr.push(10);
            arr.push(30);
            arr.push(40);
            arr.push(50);
            expect(arr.length).to.equal(4);
            expect(arr.capacity).to.equal(4);
            expect(arr.items).to.deep.equal([10, 30, 40, 50]);

            arr.insert(1, 20);
            expect(arr.length).to.equal(5);
            expect(arr.capacity).to.equal(8);
            expect(arr.items).to.deep.equal([10, 20, 30, 40, 50]);
        });
    });

    describe('Testing remove() method', () => {
        it('should return undefined if the value is not found', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            let result = arr.remove(40);
            expect(result).to.be.undefined;
        });

        it('should decrease the length successfully', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            expect(arr.length).to.equal(3);
            arr.remove(30);
            expect(arr.length).to.equal(2);
        });

        it('should return the removed element successfully', () => {
            arr.push(10);
            arr.push(20);
            arr.push(30);
            arr.push(40);
            expect(arr.length).to.equal(4);
            let result = arr.remove(30);
            expect(arr.length).to.equal(3);
            expect(arr.items).to.deep.equal([10, 20, 40]);
            expect(result).to.equal(30);
        });

        it('should throw error if trying to remove from empty array', () => {
            expect(() => arr.remove()).to.throw(
                'Cannot remove from empty array'
            );
        });
    });
});
