const { expect } = require('chai');
const { describe } = require('mocha');
const { BinarySearchTree, Node } = require('./BinarySearchTree');

describe('Testing Binary Search Tree', () => {
    let bst;
    beforeEach(() => {
        bst = new BinarySearchTree();
    });
    describe('Testing Initial State', () => {
        it('should return null for root', () => {
            expect(bst.root).to.be.null;
        });

        it('should return correct values when root assigned as Node', () => {
            bst.root = new Node(10);
            expect(bst.root.value).to.equal(10);
            expect(bst.root.left).to.be.null;
            expect(bst.root.right).to.be.null;
            expect(bst.root.height).to.equal(1);
        });
    });

    describe('Testing insert() method', () => {
        it('should insert as root when there is no root element', () => {
            expect(bst.root).to.be.null;
            bst.insert(10);
            expect(bst.root.value).to.equal(10);
        });

        it('should insert at the left side when there is no current.left and current.value is >= than value to add', () => {
            // IMP: There is no test for: when the current.value and value to add is equal
            bst.insert(20);
            bst.insert(10);
            expect(bst.root.value).to.equal(20);
            expect(bst.root.left.value).to.equal(10);
        });

        it('should insert at the right side when there is no current.right and the current.value is < than value to add', () => {
            bst.insert(10);
            bst.insert(20);
            expect(bst.root.value).to.equal(10);
            expect(bst.root.right.value).to.equal(20);
        });

        it('should insert children correctly', () => {
            bst.insert(30);
            bst.insert(20);
            bst.insert(40);
            bst.insert(22);
            bst.insert(33);

            expect(bst.root.value).to.equal(30);
            expect(bst.root.left.value).to.equal(20);
            expect(bst.root.right.value).to.equal(40);
            expect(bst.root.left.right.value).to.equal(22);
            expect(bst.root.right.left.value).to.equal(33);
        });

        it('should increment tree height correctly', () => {
            bst.insert(30);
            expect(bst.root.height).to.equal(1);

            bst.insert(20);
            bst.insert(40);
            expect(bst.root.height).to.equal(2);

            bst.insert(22);
            bst.insert(33);
            expect(bst.root.height).to.equal(3);

            expect(bst.root.left.height).to.equal(2);
            expect(bst.root.right.height).to.equal(2);

            expect(bst.root.left.right.height).to.equal(1);
            expect(bst.root.right.left.height).to.equal(1);
        });
    });

    describe('Testing insertWhole() method', () => {
        it('should insert as root when there is no root element', () => {
            expect(bst.root).to.be.null;
            bst.insertWhole(10);
            expect(bst.root.value).to.equal(10);
        });

        it('should insert at the left side when there is no current.left and current.value is >= than value to add', () => {
            // IMP: There is no test for: when the current.value and value to add is equal
            bst.insertWhole(20);
            bst.insertWhole(10);
            expect(bst.root.value).to.equal(20);
            expect(bst.root.left.value).to.equal(10);
        });

        it('should insert at the right side when there is no current.right and the current.value is < than value to add', () => {
            bst.insertWhole(10);
            bst.insertWhole(20);
            expect(bst.root.value).to.equal(10);
            expect(bst.root.right.value).to.equal(20);
        });

        it('should insert children correctly', () => {
            bst.insertWhole(30);
            bst.insertWhole(20);
            bst.insertWhole(40);
            bst.insertWhole(22);
            bst.insertWhole(33);

            expect(bst.root.value).to.equal(30);
            expect(bst.root.left.value).to.equal(20);
            expect(bst.root.right.value).to.equal(40);
            expect(bst.root.left.right.value).to.equal(22);
            expect(bst.root.right.left.value).to.equal(33);
        });

        it('should increment tree height correctly', () => {
            bst.insertWhole(30);
            expect(bst.root.height).to.equal(1);

            bst.insertWhole(20);
            bst.insertWhole(40);
            expect(bst.root.height).to.equal(2);

            bst.insertWhole(22);
            bst.insertWhole(33);
            expect(bst.root.height).to.equal(3);

            expect(bst.root.left.height).to.equal(2);
            expect(bst.root.right.height).to.equal(2);

            expect(bst.root.left.right.height).to.equal(1);
            expect(bst.root.right.left.height).to.equal(1);
        });
    });

    describe('Testing insertIter() method', () => {
        it('should insert as root when there is no root element', () => {
            expect(bst.root).to.be.null;
            bst.insertIter(10);
            expect(bst.root.value).to.equal(10);
        });

        it('should insert at the left side when there is no current.left and current.value is >= than value to add', () => {
            // IMP: There is no test for: when the current.value and value to add is equal
            bst.insertIter(20);
            bst.insertIter(10);
            expect(bst.root.value).to.equal(20);
            expect(bst.root.left.value).to.equal(10);
        });

        it('should insert at the right side when there is no current.right and the current.value is < than value to add', () => {
            bst.insertIter(10);
            bst.insertIter(20);
            expect(bst.root.value).to.equal(10);
            expect(bst.root.right.value).to.equal(20);
        });

        it('should insert children correctly', () => {
            bst.insertIter(30);
            bst.insertIter(20);
            bst.insertIter(40);
            bst.insertIter(22);
            bst.insertIter(33);

            expect(bst.root.value).to.equal(30);
            expect(bst.root.left.value).to.equal(20);
            expect(bst.root.right.value).to.equal(40);
            expect(bst.root.left.right.value).to.equal(22);
            expect(bst.root.right.left.value).to.equal(33);
        });

        it('should increment tree height correctly', () => {
            bst.insertIter(30);
            expect(bst.root.height).to.equal(1);

            bst.insertIter(20);
            bst.insertIter(40);
            expect(bst.root.height).to.equal(2);

            bst.insertIter(22);
            bst.insertIter(33);
            expect(bst.root.height).to.equal(3);

            expect(bst.root.left.height).to.equal(2);
            expect(bst.root.right.height).to.equal(2);

            expect(bst.root.left.right.height).to.equal(1);
            expect(bst.root.right.left.height).to.equal(1);
        });
    });

    describe('Testing find() method', () => {
        it('should return null if the tree is empty', () => {
            expect(bst.find(10)).to.equal(null);
        });

        it('should return null if value is not found', () => {
            bst.insert(30);
            bst.insert(20);
            bst.insert(40);
            expect(bst.find(10)).to.be.null;
        });

        it('should return the found node', () => {
            bst.insert(30);
            bst.insert(20);
            bst.insert(40);
            const result = bst.find(20);
            expect(result).to.equal(bst.root.left);
        });
    });

    describe('Testing remove() method', () => {
        it('should return null if empty tree', () => {
            bst.remove(10);
            expect(bst.root).to.be.null;
        });

        it("shouldn't change the tree if the value is not found", () => {
            bst.insert(20);
            bst.insert(30);
            bst.insert(40);

            bst.remove(10);

            expect(bst.root.value).to.equal(20);
            expect(bst.root.right.value).to.equal(30);
            expect(bst.root.right.right.value).to.equal(40);
        });

        it('should modify the tree correctly and update the height if the element is leaf', () => {
            bst.insert(20);
            bst.insert(30);

            expect(bst.root.value).to.equal(20);
            expect(bst.root.right.value).to.equal(30);

            expect(bst.root.height).to.equal(2)

            bst.remove(30);

            expect(bst.root.height).to.equal(1)

            expect(bst.root.right).to.be.null;
        });

        it('should modify the tree correctly if one of the children is null', () => {
            bst.insert(30);
            bst.insert(20);
            bst.insert(40);
            bst.insert(41);
            bst.insert(42);

            expect(bst.root.right.value).to.equal(40);
            expect(bst.root.right.right.value).to.equal(41);
            expect(bst.root.right.right.right.value).to.equal(42);

            expect(bst.root.height).to.equal(4);
            bst.remove(40);

            expect(bst.root.right.value).to.equal(41);
            expect(bst.root.right.right.value).to.equal(42);
            expect(bst.root.right.right.right).to.be.null;

            // not updating height when removing
            expect(bst.root.height).to.equal(3);
        });

        it('should reduce the right subtree when the right subtree has bigger height than left subtree ', () => {
            // NOTE: Smallest In Right Subtree

            bst.insert(30);
            bst.insert(20);
            bst.insert(40);

            bst.insert(33);
            bst.insert(34);
            bst.insert(35);

            bst.insert(45);
            bst.insert(44);
            bst.insert(43);
            bst.insert(42);
            bst.insert(41);

            expect(bst.root.height).to.equal(7);
            // Wanting to remove 40
            // So it will get the smallest in the right subtree

            bst.remove(40);

            expect(bst.root.height).to.equal(6);

            expect(bst.find(42).left).to.be.null;
            expect(bst.root.right.value).to.equal(41);
        });

        it('should reduce the left subtree when the left subtree has bigger height than right subtree ', () => {
            // NOTE: Largest In Left Subtree
            bst.insert(30);
            bst.insert(20);
            bst.insert(40);

            bst.insert(33);
            bst.insert(34);
            bst.insert(35);
            bst.insert(36);
            bst.insert(37);

            bst.insert(45);
            bst.insert(44);
            bst.insert(43);

            // Wanting to remove 40
            // So it will get the smallest in the right subtree

            expect(bst.root.height).to.equal(7)

            bst.remove(40);

            expect(bst.root.height).to.equal(6)

            expect(bst.find(36).right).to.be.null;
            expect(bst.root.right.value).to.equal(37);
        });
    });

    describe('Testing _updateHeight() method', () => {
        it('should correctly update height', () => {
            // IMP: It needs to be updated on each parent
            bst.root = new Node(30);
            expect(bst.root.height).to.equal(1);

            bst.root.left = new Node(20);
            bst.root.right = new Node(40);
            bst._updateHeight(bst.root);

            expect(bst.root.height).to.equal(2);

            bst.root.left.right = new Node(22);
            bst.root.right.left = new Node(32);

            bst._updateHeight(bst.root.left);
            expect(bst.root.left.height).to.equal(2);
            bst._updateHeight(bst.root.right);
            expect(bst.root.right.height).to.equal(2);

            bst._updateHeight(bst.root);
            expect(bst.root.height).to.equal(3);
        });
    });

    describe('Testing _updateHeightIter() method', () => {
        it('should correctly update height', () => {
            // IMP: The height can be updated after all children are attached
            bst.root = new Node(30);
            bst.root.left = new Node(20);
            bst.root.right = new Node(40);
            bst.root.left.right = new Node(22);
            bst.root.right.left = new Node(33);

            bst._updateHeightIter(bst.root);

            expect(bst.root.height).to.equal(3);
            expect(bst.root.left.height).to.equal(2);
            expect(bst.root.right.height).to.equal(2);
        });
    });

    describe('Testing _isLeaf() method', () => {
        it('should correctly return true or false', () => {
            bst.insert(20);
            bst.insert(30);
            bst.insert(10);
            expect(bst._isLeaf(bst.root)).to.be.false;
            expect(bst._isLeaf(bst.root.left)).to.be.true;
            expect(bst._isLeaf(bst.root.right)).to.be.true;
        });
    });
});
