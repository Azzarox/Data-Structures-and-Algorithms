# Binary Search Tree

Binary Search Tree (BST) is abstract data structure which is Node-based and has the functionality of better searching and sorting of elements.

The tree rules are that each paren should have only 2 children and the left child should be less than the parent while the right child must be bigger than the parent.

## Binary Search Tree Basic Methods

-   insert()
-   find()
-   remove()

### insert() method

The insert() method finds the best spot to insert an element depending on the given rules.

1. If there is no root, the element will become the root
2. If the currently traversed element's value (current.value) is bigger than the value. We need to check if there is a right child, if there is no right child then we add the value as a right child of the current (which is the parent). However, if there is a right child already, then we need to traverse the three starting from the right child(current.right)

```javascript
if (current.value < node.value) {
    if (!current.right) {
        current.right = node;
    } else {
        this._insertNode(current.right, node);
    }
} else if (...) {
    ...
}
```

3. If the currently traversed element's value (current.value) is less than the value. We need to check if there is a left child, if there is no left child then we add the value as a left child of the current (which is the parent). However, if there is already a left child, then we need to traverse the three starting from the left child (current.left)

```javascript
if (...) {
    ...
} else if (current.value >= node.value) {
    if (!current.left) {
        current.left = node;
    } else {
        this._insertNode(current.left, node);
    }
}
```

The insert method is done recursively until the element is attached as child.

### find() method

The find() method returns the node if the value exists in the tree, else it returns null. It could be changed to return true or false and it will become contains() method.

1. Check if there is a currently traversed node (which starts to be root). If ther is no current -> return null;

```javascript
if (!current) {
    return null;
}
```

2. If the currently traversed value is equal to the value we are looking for -> return the node (current).

```javascript
if (current.value === value) {
    return current;
}
```

3. If the currently traversed value is less than the value -> traverse on the right side of the current -> current.right

```javascript
if (current.value < value) {
    return this.find(value, current.right);
}
```

4. If the currently traversed value is bigger than the value -> traverse on the left side of the current -> current.left

```javascript
if (current.value >= value) {
    return this.find(value, current.left);
}
```

Code:

```javascript

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

    if (current.value >= value) {
        return this.find(value, current.left);
    }
}

```

### remove() method
The remove() method removes the element, however to remove the element it has to reorder the tree. To reorder the tree there are 3 "base cases"
1. The element to remove is leaf node.
2. The element to remove has only one child.
3. The element to remove has both of its children.

If it is only a leaf node we return null. This means that recursively calling when it is popped from the stack it will assign null as a child for the parent of the removed node.

If it has only one child it returns only the not null child. Then due to the recursive call it will pop from the stack and go to the parent of the removed element and assign the right or left child (of the parent) to the right or left child of the removed element.

For example: If we have 20 as root, 30 as right child and 33 as right child of 30. We remove 30. This means that it pops from the callstack and goes to 20 and sets the right child of 20 to be 33. Thus, effectively removing 30 and reordering the tree.

The third steps is the most tricky one since we have 2 options for modifying the tree.
We can go to the left or right subtree of the removed element. 
If we choose to go to the left subtree we need to find the largest element of the left subtree.
If we choose to go to the right subtree we need to find the smallest element fo the right subtree.

After we choose the way we wanna modify the tree we need to set the to be removed node's value to the smallest or largest respectively. Then we need to call the removeNode method with the smalles or largest value and the current node.

Code: 
```javascript
    remove(value) {
        this.root = this._removeNode(this.root, value);
    }

    // current, value => because has Node in its name
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
            this._updateHeight(current)
            return current;
        } else if (current.value > value) {
            current.left = this._removeNode(current.left, value);
            // NOTE: Need to update here as well for when there is leaf node or 1 of children is null
            this._updateHeight(current) 
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
```

## More methods:

-   contains()
-   traverse()
