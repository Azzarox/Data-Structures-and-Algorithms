const { expect } = require('chai');
const { DFSPreorder } = require('./Preorder');
const { tree } = require('../../utils/tree');
const { describe } = require('mocha');

describe('Testing Preorder Depth First Search', () => {
    it('Should give the correct DFS Preorder array', () => {
        expect(DFSPreorder(tree)).to.deep.equal([7, 23, 5, 4, 3, 18, 21]);
    });
});
