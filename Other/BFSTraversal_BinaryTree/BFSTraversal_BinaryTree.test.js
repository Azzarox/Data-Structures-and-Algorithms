const { expect } = require('chai');
const { BinaryTree } = require('../../DataStructures/BinaryTree/BinaryTree');
const { bfsTraverse } = require('./BFSTraversal_BinaryTree');

describe('Testing Breadth First Search on Binary Tree', () => {
    let treeBT;

    beforeEach(() => {
        treeBT = new BinaryTree();
        
        treeBT.insert(7);
        treeBT.insert(23);
        treeBT.insert(3);
        treeBT.insert(5);
        treeBT.insert(4);
        treeBT.insert(18);
        treeBT.insert(21);
    });

    it('Should give correct output for Breadth First Search', () => {
        const result = bfsTraverse(treeBT);
        expect(result).to.equal('7 23 3 5 4 18 21');
    });

    it('Should return empty array if no elements in the tree', () => {
        treeBT = new BinaryTree();

        const result = bfsTraverse(treeBT);
        expect(result).to.equal('');
    });
});
