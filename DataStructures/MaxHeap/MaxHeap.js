class MaxHeap {
    constructor(arr) {
        if (arr) {
            return this._buildHeap(arr);
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
        if (this.length === 0) {
            return -1;
        }

        const outValue = this.data[0];
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return outValue;
        }

        this.data[0] = this.data[this.length];
        this.data[this.length] = null;
        this.heapifyDown(0);
        return outValue;
    }

    getLeftChildIdx(idx) {
        return 2 * idx + 1;
    }

    getRightChildIdx(idx) {
        return 2 * idx + 2;
    }

    getParentIdx(idx) {
        return Math.floor((idx - 1) / 2);
    }

    heapifyUp(idx) {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.getParentIdx(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        if (parentValue < value) {
            this.data[idx] = parentValue;
            this.data[parentIdx] = value;

            this.heapifyUp(parentIdx);
        }
    }

    heapifyDown(idx) {
        const leftChildIdx = this.getLeftChildIdx(idx);
        const rightChildIdx = this.getRightChildIdx(idx);

        if (idx >= this.length || leftChildIdx >= this.length) {
            return;
        }

        const leftValue = this.data[leftChildIdx];
        const rightValue = this.data[rightChildIdx] ?? -Infinity;
        const value = this.data[idx];

        if (leftValue < rightValue && value < rightValue) {
            // If rightValue is bigger than leftValue and rightValue is bigger than value;
            // We swap the value with the rightValue;
            this.data[idx] = rightValue;
            this.data[rightChildIdx] = value;

            this.heapifyDown(rightChildIdx);
        } else if (rightValue < leftValue && value < leftValue) {
            this.data[idx] = leftValue;
            this.data[leftChildIdx] = value;

            this.heapifyDown(leftChildIdx);
        }
    }

    _buildHeap(arr) {
        this.data = arr;
        this.length = arr.length;

        for (let i = Math.floor(this.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
}

module.exports = { MaxHeap };
