const {
    BinarySearchTree,
} = require('../../DataStructures/BinarySearchTree/BinarySearchTree');
const { BinaryTree } = require('../../DataStructures/BinaryTree/BinaryTree');

function compare(nodeA, nodeB) {
    if (nodeA == null && nodeB == null) {
        return true;
    }

    if (nodeA == null || nodeB == null) {
        return false;
    }

    if (nodeA.value != nodeB.value) {
        return false;
    }

    return compare(nodeA.left, nodeB.left) && compare(nodeA.right, nodeB.right);
}

function compareTrees(a, b) {
    a = a.root;
    b = b.root;

    return compare(a, b);
}

module.exports = { compareTrees };
