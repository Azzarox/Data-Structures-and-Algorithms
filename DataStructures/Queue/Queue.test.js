const { expect } = require('chai');
const { describe } = require('mocha');
const { Queue } = require('./Queue');

describe('Queue Test Case', () => {
    let q;
    beforeEach(() => {
        q = new Queue();
    });

    it('should have length of 0 and no head and tail', () => {
        expect(q.head).to.be.undefined;
        expect(q.tail).to.be.undefined;
        expect(q.length).to.equal(0);
    });

    it('should enqueue values correctly', () => {
        q.enqueue(10);
        q.enqueue(20);
        expect(q.length).to.equal(2);
        expect(q.peek()).to.equal(10);
    });

    it('should dequeue values', () => {
        q.enqueue(10);
        q.enqueue(20);
        expect(q.deque()).to.equal(10);
        expect(q.deque()).to.equal(20);
        expect(q.deque()).to.be.undefined;
    });

    it('should return undefined for empty queue', () => {
        expect(q.deque()).to.be.undefined;
        expect(q.peek()).to.be.undefined;
    });

    it('should enqueue and dequeue values correctly', () => {
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        expect(q.length).to.equal(3);
        expect(q.peek()).to.equal(10);
        expect(q.deque()).to.equal(10);
        expect(q.deque()).to.equal(20);
        expect(q.length).to.equal(1);
        expect(q.peek()).to.equal(30);
        expect(q.deque()).to.equal(30);
        expect(q.length).to.equal(0);
        expect(q.deque()).to.be.undefined;
        expect(q.peek()).to.be.undefined;
    });

    it('should correctly update head and tail', () => {
        q.enqueue(10);
        q.enqueue(20);
        expect(q.head.value).to.equal(10);
        expect(q.tail.value).to.equal(20);
        q.deque();
        expect(q.head.value).to.equal(20);
        expect(q.tail.value).to.equal(20);
        q.deque();
        expect(q.head).to.be.undefined;
        expect(q.tail).to.be.undefined;
    });
});
