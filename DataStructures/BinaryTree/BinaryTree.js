class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const node = new Node(value);

        if (!this.root) {
            this.root = node;
            return;
        }

        let current = this.root;

        while (current) {
            if (!current.left) {
                current.left = node;
                return;
            }

            if (!current.right) {
                current.right = node;
                return;
            }
            current = current.left;
        }
    }
    find(value, current = this.root) {
        if (!current) {
            return null;
        }

        if (current.value == value) {
            return current;
        }

        let leftResult = this.find(value, current.left);

        if (leftResult) return leftResult;

        let rightResult = this.find(value, current.right);

        if (rightResult) return rightResult;

        return null;
    }

    findIter(value) {
        if (!this.root) {
            return null;
        }

        let queue = [this.root];

        while (queue.length) {
            let current = queue.shift();

            if (!current) {
                continue;
            }

            if (current.value === value) {
                return current;
            }

            queue.push(current.left);
            queue.push(current.right);
        }
    }

    traverse(suffix, func, current = this.root) {
        if (!current) {
            return;
        }

        switch (suffix) {
            case 'pre':
                func(current);
                this.traverse('pre', func, current.left);
                this.traverse('pre', func, current.right);
                break;
            case 'in':
                this.traverse('in', func, current.left);
                func(current);
                this.traverse('in', func, current.right);
                break;
            case 'post':
                this.traverse('post', func, current.left);
                this.traverse('post', func, current.right);
                func(current);
                break;
        }
    }

    invert(current = this.root) {
        if (!current) {
            return null;
        }

        let temp = current.left;
        current.left = current.right;
        current.right = temp;

        this.invert(current.left);
        this.invert(current.right);

        return current;
    }
}

module.exports = {
    BinaryTree,
    Node,
};
