class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
    }
}

class Stack {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    push(value) {
        const node = new Node(value);
        this.length++;

        if (!this.head) {
            this.head = node;
            return;
        }

        node.prev = this.head;
        this.head = node;
    }

    pop() {
        this.length = Math.max(0, this.length - 1); // To don't go into negative length
        if (this.length === 0) {
            this.head = undefined;
            return this.head?.value;
        }
        const head = this.head;
        this.head = head.prev;

        return head.value;
    }

    peek() {
        return this.head?.value;
    }
}

module.exports = { Stack };
