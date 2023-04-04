const { expect } = require('chai');
const { describe } = require('mocha');
const { BinaryTree, Node } = require('./BinaryTree');

describe('Binary Tree Test Case', () => {
    let bt;
    beforeEach(() => {
        bt = new BinaryTree();
    });

    describe('Testing Initial State', () => {
        it('should have root as null', () => {
            expect(bt.root).to.be.null;
        });

        it('should have only root', () => {
            bt.root = new Node(10);
            expect(bt.root.value).to.equal(10);
            expect(bt.root.left).to.be.null;
            expect(bt.root.right).to.be.null;
        });
    });

    describe('Testing insert() method', () => {
        it('should insert element as root if the tree is empty', () => {
            expect(bt.root).to.be.null;
            bt.insert(10);
            expect(bt.root.value).to.equal(10);
        });

        it('should add at the first free place, going left to right', () => {
            expect(bt.root).to.be.null;
            bt.insert(10);
            bt.insert(11);
            expect(bt.root.value).to.equal(10);
            expect(bt.root.left.value).to.equal(11);
        });

        it('should add the new element as a left child if there is free left position', () => {
            expect(bt.root).to.be.null;
            bt.insert(10);
            bt.insert(11);
            expect(bt.root.value).to.equal(10);
            expect(bt.root.left.value).to.equal(11);
        });

        it('should add the new element as a right child if there is NO free left position', () => {
            expect(bt.root).to.be.null;
            bt.insert(10);
            bt.insert(11);
            bt.insert(12);
            expect(bt.root.value).to.equal(10);
            expect(bt.root.left.value).to.equal(11);
            expect(bt.root.right.value).to.equal(12);
        });
    });

    describe('Testing find() method', () => {
        it('should return null if the element is not found', () => {
            expect(bt.find(10)).to.be.null;
        });

        it('should return the element if it is found', () => {
            bt.insert(10);
            bt.insert(15);
            bt.insert(20);
            bt.insert(25);
            bt.insert(30);
            let result = bt.find(15);
            expect(result.value).to.equal(15);
            expect(result.left.value).to.equal(25);
            expect(result.right.value).to.equal(30);
        });
    });

    describe('Testing traverse() method', () => {
        let str;
        let callback;

        beforeEach(() => {
            str = '';
            callback = (x) => {
                str += x.value + ' ';
            };
        });

        it('should traverse in PRE order', () => {
            bt.insert(10);
            bt.insert(20);
            bt.insert(30);

            bt.traverse('pre', callback);
            expect(str.trim()).to.equal('10 20 30');
        });

        it('should traverse in IN order', () => {
            bt.insert(10);
            bt.insert(20);
            bt.insert(30);

            bt.traverse('in', callback);
            expect(str.trim()).to.equal('20 10 30');
        });

        it('should traverse in POST order', () => {
            bt.insert(10);
            bt.insert(20);
            bt.insert(30);

            bt.traverse('post', callback);
            expect(str.trim()).to.equal('20 30 10');
        });
    });

    describe('Testing invert() method', () => {
        it('should return null if there is no element', () => {
            expect(bt.invert()).to.be.null;
        });

        it('should invert tree correctly', () => {
            // Inverts tree when making left child to be right and vice-versa
            bt.insert(10);
            bt.insert(20);
            bt.insert(30);
            expect(bt.root.value).to.equal(10);
            expect(bt.root.left.value).to.equal(20);
            expect(bt.root.right.value).to.equal(30);
            bt.invert();
            expect(bt.root.value).to.equal(10);
            expect(bt.root.left.value).to.equal(30);
            expect(bt.root.right.value).to.equal(20);
        });
    });
});
