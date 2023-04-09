const { expect } = require('chai');

const {
    BinarySearchTree,
} = require('../../DataStructures/BinarySearchTree/BinarySearchTree');
const { BinaryTree } = require('../../DataStructures/BinaryTree/BinaryTree');

const { compareTrees } = require('./BTComparison');

describe('Testing comparison between trees in structure and value', () => {
    let bt;
    let bst;

    beforeEach(() => {
        bt = new BinaryTree();
        bst = new BinarySearchTree();
    });

    it('should return true if both trees are identical', () => {
        bt.insert(10);
        bt.insert(9);
        bt.insert(11);

        bst.insert(10);
        bst.insert(9);
        bst.insert(11);

        expect(compareTrees(bt, bst)).to.be.true;
    });

    it('should return false if trees are not the same', () => {
        bt.insert(10);
        bt.insert(15);
        bt.insert(20);

        bst.insert(10);
        bst.insert(15);
        bst.insert(20);

        expect(compareTrees(bt, bst)).to.be.false;
    });
});
