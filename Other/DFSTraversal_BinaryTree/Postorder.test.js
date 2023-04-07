const { expect } = require('chai');
const { tree } = require('../../utils/tree');
const { describe } = require('mocha');
const { DFSPostorder } = require('./Postorder');

describe('Testing Postorder Depth First Search', () => {
    it('Should give the correct DFS Postorder array', () => {
        expect(DFSPostorder(tree)).to.deep.equal([5, 4, 23, 18, 21, 3, 7]);
    });
});
