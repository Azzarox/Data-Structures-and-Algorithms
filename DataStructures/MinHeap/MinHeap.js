class MinHeap {
    constructor(arr) {
        if (arr) {
            return this.buildHeap(arr);
        }

        this.data = [];
        this.length = 0;
    }

    insert(value) {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete() {
        // also called pop or poll;
        // it removes the 1st element at 0 index and swaps it with the last, then heapifies down

        if (this.length === 0) {
            return -1;
        }

        const output = this.data[0];
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return output;
        }

        this.data[0] = this.data[this.length];
        this.data[this.length] = null;
        // Setting this as null or undefined and then using the ?? Infinity in the heapifyDown() method
        // Ensures that the values are correctly compared
        // This means if I have [30,20,null] it will correctly delete the head since it will compare
        // 20 with positive infinity which will give 20

        this.heapifyDown(0);
        return output;
    }

    heapifyDown(idx) {
        const leftChildIdx = this.getLeftChildIdx(idx);
        const rightChildIdx = this.getRightChildIdx(idx);

        if (idx >= this.length || leftChildIdx >= this.length) {
            return;
        }

        const leftValue = this.data[leftChildIdx];
        const rightValue = this.data[rightChildIdx] ?? Infinity;

        const value = this.data[idx];

        if (leftValue > rightValue && value > rightValue) {
            this.swap(this.data, idx, rightChildIdx);
            this.heapifyDown(rightChildIdx);
        } else if (rightValue > leftValue && value > leftValue) {
            this.swap(this.data, idx, leftChildIdx);
            this.heapifyDown(leftChildIdx);
        }
    }

    heapifyUp(idx) {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.getParentIdx(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        if (parentValue > value) {
            this.swap(this.data, idx, parentIdx);
            this.heapifyUp(parentIdx);
        }
    }

    getParentIdx(idx) {
        return Math.floor((idx - 1) / 2);
    }

    getLeftChildIdx(idx) {
        return idx * 2 + 1;
    }
    getRightChildIdx(idx) {
        return idx * 2 + 2;
    }

    swap(arr, idx1, idx2) {
        const temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    buildHeap(arr) {
        this.data = arr;
        this.length = arr.length;

        let lastNonLeafNode = Math.floor(this.length / 2) - 1;
        // iValue is
        for (let i = lastNonLeafNode; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
}

module.exports = {
    MinHeap,
};
