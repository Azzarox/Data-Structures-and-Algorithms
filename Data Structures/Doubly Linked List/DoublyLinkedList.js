class Node {
    constructor(value) {
        this.value = value;
        this.next = this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    get length() {
        return this.size;
    }

    prepend(value) {
        const node = new Node(value);
        this.size++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    append(value) {
        const node = new Node(value);
        this.size++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    insertAt(idx, value) {
        if (idx < 0 || idx > this.size) {
            throw new Error('Index out of bounds');
        }

        if (idx === 0) {
            this.prepend(value);
            return;
        } else if (idx === this.size) {
            this.append(value);
            return;
        }

        const node = new Node(value);
        const currentNode = this.traverse(idx);

        currentNode.prev.next = node;
        currentNode.prev = node;

        node.prev = currentNode.prev;
        node.next = currentNode;

        this.size++;
    }

    removeAt(idx) {
        let currentNode = this.traverse(idx);

        // It should never be executed since if the idx >= this.size it will throw an error
        if (!currentNode) return undefined;

        if (currentNode == this.head) {
            this.head = currentNode.next;
        }

        if (currentNode == this.tail) {
            this.tail = currentNode.prev;
        }

        if (currentNode.prev) {
            currentNode.prev.next = currentNode.next;
        }

        if (currentNode.next) {
            currentNode.next.prev = currentNode.prev;
        }

        currentNode.next = currentNode.prev = null;
        this.size--;

        return currentNode.value;
    }

    remove(value) {
        if (!this.size) {
            throw new Error('Cannot remove from empty list');
        }
        let currentNode = this.head;
        // NOTE: Can use get(value) method to reduce repetetive code
        // NOTE: get() should return the whole node not only the value.

        while (currentNode) {
            if (currentNode.value === value) {
                if (!currentNode) return undefined;
                if (currentNode == this.head) this.head = currentNode.next;
                if (currentNode == this.tail) this.tail = currentNode.prev;
                if (currentNode.prev) currentNode.prev.next = currentNode.next;
                if (currentNode.next) currentNode.next.prev = currentNode.prev;

                currentNode.prev = currentNode.next = null;
                this.size--;

                return currentNode.value;
            }

            currentNode = currentNode.next;
        }
        return undefined;
    }

    get(value) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return undefined;
    }

    traverse(idx) {
        if (idx < 0 || idx >= this.size) {
            throw new Error('Index out of bounds');
        }

        let currentNode;
        if (idx < this.size / 2) {
            currentNode = this.head;
            for (let i = 0; i < idx; i++) {
                currentNode = currentNode.next;
            }
        } else {
            currentNode = this.tail;
            for (let i = this.size - 1; i > idx; i--) {
                currentNode = currentNode.prev;
            }
        }
        return currentNode ? currentNode : undefined;
    }
}

module.exports = {
    DoublyLinkedList,
};

const list = new DoublyLinkedList();
list.prepend(10);
list.append(20);
list.append(30);
