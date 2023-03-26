class RingBuffer {
    constructor(capacity) {
        this.capacity = capacity;
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.data = new Array(this.capacity);
    }

    get isEmpty() {
        return this.length === 0;
    }

    get isFull() {
        return this.length === this.capacity;
    }

    push(value) {
        if (this.isFull) {
            throw new Error('Ring Buffer overflow');
        }

        this.data[this.tail] = value;
        this.length++;

        this.tail = (this.tail + 1) % this.capacity;
    }

    pop() {
        if (this.isEmpty) {
            return undefined;
        }

        const removed = this.data[this.head];
        this.data[this.head] = undefined;
        
        this.length--;
        this.head = (this.head + 1) % this.capacity;
        return removed;
    }

    // If empty is true it checks for idx between 0 and capacity;
    // if empty is false it checks for idx between 0 and length;
    get(idx, empty = false) {
        if (idx < 0) {
            throw new Error('Index out of bounds');
        }

        if (empty) {
            if (idx >= this.capacity) {
                throw new Error('Index out of bounds');
            }

            return this.data[idx];
        }

        if (idx >= this.length) {
            throw new Error('Index out of bounds');
        }

        return this.items[idx];
    }

    // This outputs for the outside world without showing undefined and empty spaces
    get items() {
        return this.data.filter((x) => x);
    }
}

module.exports = { RingBuffer };
