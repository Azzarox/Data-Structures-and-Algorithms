class ArrayList {
    constructor(capacity) {
        this.capacity = capacity;
        this.length = 0;
        this.data = new Array(capacity);
    }

    get isFull() {
        return this.length === this.capacity;
    }

    #resize() {
        this.capacity = this.capacity * 2;
        const arr = new Array(this.capacity);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = this.data[i];
        }

        this.data = arr;
    }

    push(value) {
        if (this.isFull) this.#resize();

        this.data[this.length] = value;
        this.length++;
    }

    unshift(value) {
        if (this.isFull) this.#resize();

        // shift to the right
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[0] = value;
        this.length++;
    }

    pop() {
        if (this.length === 0) {
            throw new Error('Cannot pop from empty array');
        }

        const removed = this.data[this.length - 1];
        this.length--;
        return removed;
    }

    shift() {
        if (this.length === 0) {
            throw new Error('Cannot shift from empty array');
        }

        const removed = this.data[0];

        // shift to the left
        for (let i = 0; i < 0; i++) {
            this.data[i] = this.data[i + 1];
        }

        this.length--;
        return removed;
    }

    insert(idx, value) {
        if (idx < 0 || idx >= this.length) {
            throw new Error('Index out of bounds');
        }

        if (this.isFull) {
            this.#resize();
        }

        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[idx] = value;
        this.length++;
    }

    remove(item) {
        if (this.length === 0)
            throw new Error('Cannot remove from empty array');

        let idx = -1;

        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) {
                idx = i;
                break;
            }
        }

        const removed = this.data[idx];

        if (idx === -1) return undefined;

        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1];
        }

        this.length--;
        return removed;
    }

        get items() {
        return this.data.filter((x) => x);
    }

}

module.exports = {ArrayList}