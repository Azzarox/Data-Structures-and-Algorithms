class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height =
            1 +
            Math.max(
                this.left ? this.left.height : 0,
                this.right ? this.right.height : 0
            );
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Using the recursion, it will update the current on each call
    // This is good because while coming off of the recursion (popping from the stack)
    // Will update the parent height
    _updateHeight(current) {
        current.height =
            1 +
            Math.max(
                current.left ? current.left.height : 0,
                current.right ? current.right.height : 0
            );
    }

    // This is using recursion and postOrder for the insertIter method
    // The trick is that when the node is inserted will update the parent
    // but WON'T update the parent of the parent
    // Thus why we use height updating starting from bottom
    // (we input this.root but this.root in POST ORDER will be the last updated)
    _updateHeightIter(parentNode) {
        if (parentNode === null) {
            return 0;
        }
        const leftHeight = this._updateHeightIter(parentNode.left);
        const rightHeight = this._updateHeightIter(parentNode.right);
        parentNode.height = Math.max(leftHeight, rightHeight) + 1;
        return parentNode.height;
    }

    _isLeaf(current) {
        return current.left === null && current.right === null;
    }

    insertWhole(value, current = this.root) {
        const node = new Node(value);
        if (!this.root) {
            this.root = node;
            return;
        }

        if (current.value < value) {
            if (!current.right) {
                current.right = node;
            } else {
                this.insertWhole(value, current.right);
            }
        } else if (current.value >= value) {
            if (!current.left) {
                current.left = node;
            } else {
                this.insertWhole(value, current.left);
            }
        }

        this._updateHeight(current);
    }

    insert(value) {
        const node = new Node(value);
        if (!this.root) {
            this.root = node;
            return;
        }

        return this._insertNode(this.root, node);
    }

    _insertNode(current, node) {
        if (current.value < node.value) {
            if (!current.right) {
                current.right = node;
            } else {
                this._insertNode(current.right, node);
            }
        } else if (current.value >= node.value) {
            if (!current.left) {
                current.left = node;
            } else {
                this._insertNode(current.left, node);
            }
        }

        this._updateHeight(current);
    }

    insertIter(value) {
        const node = new Node(value);
        let current = this.root;

        if (!current) {
            this.root = node;
            return;
        }
        while (current) {
            if (current.value < value) {
                if (!current.right) {
                    current.right = node;
                    break;
                }

                current = current.right;
            } else if (current.value >= value) {
                if (!current.left) {
                    current.left = node;
                    break;
                }

                current = current.left;
            } else {
                return;
            }
        }
        this._updateHeightIter(this.root); // Using postOrder to update from bottom to top
    }

    find(value, current = this.root) {
        if (!current) {
            return null;
        }

        if (current.value === value) {
            return current;
        }
        if (current.value < value) {
            return this.find(value, current.right);
        }

        // if (current.value >= value) {
        if (current.value > value) {
            return this.find(value, current.left);
        }
    }

    remove(value) {
        this.root = this._removeNode(this.root, value);
    }

    _removeNode(current, value) {
        // NOTE: 1. If no current => return null
        if (current === null) {
            return null;
        }

        // NOTE: 2. Traverse right or left tree -> IMO the most important step!
        // IMPORTANT: Must "return current" otherwise it won't change correctly
        // Due to the fact that the recursive calls return values won't be assigned and returned
        if (current.value < value) {
            current.right = this._removeNode(current.right, value);
            // NOTE: Need to update here as well for when there is leaf node or 1 of children is null
            this._updateHeight(current);
            return current;
        } else if (current.value > value) {
            current.left = this._removeNode(current.left, value);
            // NOTE: Need to update here as well for when there is leaf node or 1 of children is null
            this._updateHeight(current);
            return current;
        }

        // NOTE: 3. Find the value to remove
        if (current.value === value) {
            // NOTE: 3.1 If it is leaf node return null

            if (this._isLeaf(current)) {
                return null; // the null will be assigned to the previous recursive call
            } else if (current.left === null || current.right === null) {
                // NOTE: 3.2 Either of the two children is null
                const tmp = current.left ? current.left : current.right;
                // current.left = tmp; // NOTE: Could be redundant and not needed ?
                return tmp;
            }

            // NOTE: 3.3 Optimizing for reducing either left or right side depending which has greater height
            if (current.left.height > current.right.height) {
                // NOTE: 3.3.1 Find Largest Element in the Left Subtree
                const largestValue = this._largestInLeftSubtree(current.left);

                // NOTE: 3.3.2 Set the value of the current node (which is the one to be removed),
                // NOTE: to be the largestValue
                current.value = largestValue;
                // NOTE: 3.3.3 Remove the left node (now there are duplicate values), since we found the largest in left
                current.left = this._removeNode(current.left, largestValue);
            } else if (current.right.height >= current.left.height) {
                // 3.3.2 Find Smallest Element in the Right Subtree
                const smallestValue = this._smallestinRightSubtree(
                    current.right
                );

                current.value = smallestValue;
                current.right = this._removeNode(current.right, smallestValue);
            }

            // NOTE: 4. Updates the height
            this._updateHeight(current);
            // NOTE: 5. Returning current so it will be assigned at Step 2. from recursive calls return values
            return current;
        }
    }

    _largestInLeftSubtree(node) {
        // 1. Starts from current.left (which is left subtree) and goes to each right child
        // 2. Returns when there is no more node.right meaning it has found the largest element

        if (node.right) {
            return this._largestInLeftSubtree(node.right);
        }
        return node.value;

        // //
        // while(node){
        //     node = node.right
        // }
        // return node.value
    }

    _smallestinRightSubtree(node) {
        // 1. Starts from current.right (which is right subtree) and goes to each left child
        // 2. Returns when there is no more node.left meaning it has found the smalles element

        if (node.left) {
            return this._smallestinRightSubtree(node.left);
        }
        return node.value;
    }
}

module.exports = {
    Node,
    BinarySearchTree,
};
