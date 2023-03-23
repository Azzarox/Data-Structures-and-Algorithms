class Node {
    constructor(value) {
        this.value = value;
        this.next = undefined;
    }
}

class Queue {
    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(value) {
        const node = new Node(value);
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque() {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const head = this.head;
        this.head = this.head.next;

        if (this.length === 0) {
            this.tail = undefined;
            return;
        }

        return head.value;
    }

    peek() {
        return this.head?.value;
    }
}

module.exports = { Queue };
