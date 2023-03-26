const { describe } = require('mocha');
const { expect } = require('chai');
const { RingBuffer } = require('./RingBuffer');

describe('Testing Ring Buffer', () => {
    let buffer;
    let capacity = 8;

    beforeEach(() => {
        buffer = new RingBuffer(capacity);
    });

    it('Testing initial state of ring buffer', () => {
        expect(buffer.capacity).to.equal(capacity);
        expect(buffer.length).to.equal(0);
        expect(buffer.head).to.equal(0);
        expect(buffer.tail).to.equal(0);
        expect(buffer.items).to.be.instanceOf(Array);
    });

    describe('Testing isFull() method', () => {
        it('should return true when buffer is full', () => {
            buffer.length = capacity;
            expect(buffer.isFull).to.be.true;
        });

        it('should return false when buffer is NOT full', () => {
            buffer.length = 5;
            expect(buffer.isFull).to.be.false;
        });
    });

    describe('Testing isEmpty() method', () => {
        it('should return true when buffer is empty', () => {
            buffer.length = 0;
            expect(buffer.isEmpty).to.be.true;
        });

        it('should return false when buffer is NOT empty', () => {
            buffer.length = 4;
            expect(buffer.isEmpty).to.be.false;
        });
    });

    describe('Testing push() method', () => {
        it('should change tail and length correctly when pushing value', () => {
            buffer.push(10);
            expect(buffer.length).to.equal(1);
            expect(buffer.tail).to.equal(1);
        });

        it('should push() value correctly', () => {
            buffer.push(10);
            buffer.push(30);
            buffer.push(40);
            expect(buffer.length).to.equal(3);
            expect(buffer.items[0]).to.equal(10);
            expect(buffer.items[1]).to.equal(30);
            expect(buffer.items[2]).to.equal(40);
        });

        it('should throw error if trying to push when buffer is full', () => {
            buffer.push(10);
            buffer.push(30);
            buffer.push(40);
            buffer.push(40);
            buffer.push(40);
            buffer.push(40);
            buffer.push(40);
            buffer.push(40);
            expect(() => buffer.push(50)).to.throw('Ring Buffer overflow');
        });
    });

    describe('Testing pop() method', () => {
        it('should change head and length correctly when popping value', () => {
            buffer.push(10);
            buffer.push(20);
            buffer.push(30);
            expect(buffer.length).to.equal(3);
            buffer.pop();
            expect(buffer.length).to.equal(2);
            expect(buffer.head).to.equal(1);
        });

        it('should return the popped value successfully', () => {
            buffer.push(10);
            buffer.push(20);
            buffer.push(30);
            expect(buffer.pop()).to.equal(10);
        });

        it('should set undefined to the popped value at the index', () => {
            buffer.push(10);
            buffer.push(20);
            buffer.push(30);
            buffer.pop();
            expect(buffer.data[0]).to.be.undefined;
        });

        it('should return undefined if trying to pop from empty list', () => {
            let result = buffer.pop();
            expect(result).to.be.undefined;
        });
    });

    describe('Testing get() method', () => {
        it('should throw error if idx is less than 0', () => {
            buffer.push(10);
            buffer.push(20);
            buffer.push(30);
            expect(() => buffer.get(-1)).to.throw('Index out of bounds');
            expect(() => buffer.get(-1, true)).to.throw('Index out of bounds');
        });

        it('should throw error if index is bigger or equal to the capacity', () => {
            buffer.push(30);
            buffer.push(20);
            buffer.push(10);
            expect(() => buffer.get(10, true)).to.throw('Index out of bounds');
            expect(() => buffer.get(buffer.capacity, true)).to.throw(
                'Index out of bounds'
            );
        });

        it('should throw error if idx is bigger or equal to the length', () => {
            buffer.push(30);
            buffer.push(20);
            buffer.push(10);
            expect(() => buffer.get(10)).to.throw('Index out of bounds');
            expect(() => buffer.get(buffer.length)).to.throw(
                'Index out of bounds'
            );
        });

        it('should return undefined if idx is between 0 and this.capacity', () => {
            // capacity is 8;
            buffer.push(30);
            buffer.push(20);
            buffer.push(10);
            expect(buffer.get(3, true)).to.be.undefined;
            expect(buffer.get(4, true)).to.be.undefined;
            expect(buffer.get(5, true)).to.be.undefined;
        });

        it('should return the value if idx is between 0 and this.length', () => {
            buffer.push(30);
            buffer.push(20);
            buffer.push(10);
            expect(buffer.get(0)).to.equal(30);
            expect(buffer.get(1)).to.equal(20);
            expect(buffer.get(2)).to.equal(10);
        });
    });

    describe('Testing the whole functionality', () => {
        it('Should pop and push values correctly', () => {
            buffer.push(10);
            buffer.push(20);
            buffer.push(30);
            buffer.push(40);
            buffer.push(50);
            expect(buffer.pop()).to.equal(10);
            expect(buffer.pop()).to.equal(20);
            expect(buffer.pop()).to.equal(30);

            expect(buffer.head).to.equal(3);
            expect(buffer.tail).to.equal(5);

            expect(buffer.data[0]).to.be.undefined;
            expect(buffer.data[1]).to.be.undefined;
            expect(buffer.data[2]).to.be.undefined;

            buffer.push(60);
            buffer.push(70);

            expect(buffer.tail).to.equal(7);

            buffer.push(80); // buffer tail becomes 8 % 8 = 0

            expect(buffer.tail).to.equal(0);

            expect(buffer.data[5]).to.equal(60);
            expect(buffer.data[6]).to.equal(70);
            expect(buffer.data[7]).to.equal(80);

            buffer.push(90);
            buffer.push(100);
            buffer.push(110);

            expect(buffer.tail).to.equal(3);

            expect(buffer.data[0]).to.equal(90);
            expect(buffer.data[1]).to.equal(100);
            expect(buffer.data[2]).to.equal(110);
        });
    });
});
