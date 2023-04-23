# Trees

## Types of Trees

The most used types of trees are General tree and Binary tree

There is a variant of Binary Tree which is Binary Search Tree which characterizes with that everything at the left side is less than or equal to the parent (root) and everything on the right side is bigger than the parent (root).

## Types of Searches

There are _2_ types of searches and it is **Depth First Search** (DFS) and **Breadth First Search** (BFS).

Where DFS is usually done with _recursion_ because it uses the call stack (Stack data structure) while BFS uses _Queue_.

DFS Preserves the shape of the tree, so if we want to compare 2 trees _structurally_ and by _value_ its better to use DFS.

## Types of Traversal Ordering in DFS

There are 3 types of traversal, depending when we visit the node. Visiting the node means that we do something with the node value. For example printing it.

### Pre Order Traversal

Pre-Order is when we first visit the node than we traverse the left side then the right side.
Usually in pre-order the **root at the beginning.**

Code:

```javascript
function traverse(currNode, path) {
    if (!currNode) {
        return path;
    }

    path.push(currNode.value); // Visit Node

    traverse(currNode.left, path); //  Traverse left
    traverse(currNode.right, path); // Traverse right

    return path;
}

function pre_order_bt_traversal(root) {
    return traverse(root, []);
}

console.log(pre_order_bt_traversal(tree));
// 7 23 5 4 3 18 21
```

### In Order Traversal

In-Order is when we traverse left, then visit the node, then traverse right.
Usually in in-order the **root is at the middle**.

In Order traversal in **Binary Search Tree** actually sorts the tree in ascending order. This is because nodes in the BST have a rule for *less than* or *bigger than* the parent node and traversing in-order goes first to the left side, which has the values that are parent value and the to the right, where the nodes are bigger than the parent value.

Code:

```javascript
const { tree } = require('../Tree');

function traverse(currNode, path) {
    if (!currNode) {
        return path;
    }

    traverse(currNode.left, path); // Traverse left
    path.push(currNode.value); // Visit Node
    traverse(currNode.right, path); // Traverse right

    return path;
}

function in_order_bt_traversal(root) {
    return traverse(root, []);
}

console.log(in_order_bt_traversal(tree));

// 5, 23, 4, 7, 18, 3, 21
```

### Post Order Traversal

Post-Order is when we first traverse the left and right side, then visit the node.
Usually in post-order **the root at the end.**

Code:

```javascript
const { tree } = require('../Tree');

function traverse(currNode, path) {
    if (!currNode) {
        return path;
    }

    traverse(currNode.left, path); // Traverse Left
    traverse(currNode.right, path); // Traverse Right
    path.push(currNode.value); // Visit Node

    return path;
}

function post_order_bt_traversal(root) {
    return traverse(root, []);
}

console.log(post_order_bt_traversal(tree));

// 5, 4, 23, 18, 21, 3,  7
```

## Types of Traversal Ordering in BFS

The BFS traversal is done by visiting each node from left to right starting from the root. This is done using a queue, because we first take the root out (pop it from the queue) which is equivalent ot visiting the node, then we push the left and right (children) of the popped node.

Code:

```javascript
const { tree } = require('../Tree');

function BFTraversal(head) {
    const queue = [head];
    const resultArr = [];
    while (queue.length) {
        const curr = queue.shift();

        resultArr.push(curr.value);
        if (curr.left) {
            queue.push(curr.left);
        }
        if (curr.right) {
            queue.push(curr.right);
        }
    }
    console.log(resultArr);
}

BFTraversal(tree);
```

## Comparing Trees

As said above if we want to compare 2 trees we need to use Depth First Search since it preserves the shape of the traversaling. This means that we will able to both check for the structure equivalence and value equivalence.

Steps:

1. First we set the base case if both nodes of tree A and tree B are null then the trees are correct. Here a single Node is a Tree as well.

```javascript
if (a == null && b == null) {
    return true;
}
```

2. We set the base case that either A or B is null then the nodes are not equal.

```javascript
if (a == null || b == null) {
    return false;
}
```

3. We set the third base case where we simply check for the node's values, if they are not equal then the trees are not equal as well.

```javascript
if (a.value != b.value) {
    return false;
}
```

4. Finally we use recursion and a simple trick of logical adding using the && symbol.

```javascript
return compare(a.left, b.left) && compare(a.right, b.right);
```

Code:

```javascript
const { tree, tree2, tree3different } = require('../utils/tree');

function compare(a, b) {
    if (a == null && b == null) {
        return true;
    }

    if (a == null || b == null) {
        return false;
    }

    if (a.value != b.value) {
        return false;
    }

    return compare(a.left, b.left) && compare(a.right, b.right);
}

console.log(compare(tree, tree3different)); // false
console.log(compare(tree, tree2)); // true
```
