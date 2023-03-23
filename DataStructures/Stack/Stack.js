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
        this.length = Math.max(0, this.length - 1);

        if (this.length === 0) {
            const head = this.head;
            this.head = undefined; // Sets it for the next pop it will be undefined;
            return head?.value;
        }

        const head = this.head;
        this.head = head.prev;

        return head?.value;
    }

    peek() {
        return this.head?.value;
    }
}

// const st = new Stack();

// st.push(10);
// st.push(20);
// st.push(30);

// // console.log(st.head.value); // 30 because head is the most recently added

// console.log(st.pop());
// console.log(st.pop());

// console.log(st.pop()); // should return 10 but it returns undefined

// console.log(st.pop()); // should be undefined

module.exports = { Stack };
