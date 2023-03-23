const { expect } = require('chai');
const { describe } = require('mocha');
const { Stack } = require('./Stack');

describe('Stack Test Case', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    it('should test the initial state of the stack', () => {
        expect(stack.length).to.equal(0);
        expect(stack.head).to.be.null;
    });

    it('should have a length of 1 after one push', () => {
        stack.push(10);
        expect(stack.length).to.equal(1);
    });

    it('should have a length of 2 after two pushes', () => {
        stack.push(10);
        stack.push(20);
        expect(stack.length).to.equal(2);
    });

    it('should return the most recent value pushed to the stack when peeked', () => {
        stack.push(10);
        stack.push(20);
        expect(stack.peek()).to.equal(20);
    });

    it('should decrease the length of the stack when pop is called', () => {
        stack.push(10);
        stack.push(20);
        stack.pop();
        expect(stack.length).to.equal(1);
    });

    it('should return the most recent value pushed to the stack when pop is called', () => {
        stack.push(10);
        stack.push(20);
        expect(stack.pop()).to.equal(20);
        expect(stack.length).to.equal(1);
    });

    it('should return undefined if pop is called on an empty stack', () => {
        expect(stack.pop()).to.be.undefined;
    });

    it('should return undefined if peek is called on an empty stack', () => {
        expect(stack.peek()).to.be.undefined;
    });
});
