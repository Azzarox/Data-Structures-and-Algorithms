const { expect } = require('chai');
const { tree } = require('../../utils/tree');
const { describe } = require('mocha');
const { DFSInorder } = require('./Inorder');


describe('Testing Inorder Depth First Search', () => {
    it('Should give the correct DFS Inorder array', () => {
        expect(DFSInorder(tree)).to.deep.equal([5, 23, 4, 7, 18, 3, 21]);
    });
});
