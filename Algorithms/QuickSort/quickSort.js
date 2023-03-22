const partition = (arr, lo, hi) => {
    let pivotValue = arr[hi];
    let pivotIdx = lo - 1;

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivotValue) {
            pivotIdx++;
            const temp = arr[i];
            arr[i] = arr[pivotIdx];
            arr[pivotIdx] = temp;
        }
    }

    pivotIdx++;
    arr[hi] = arr[pivotIdx];
    arr[pivotIdx] = pivotValue;

    return pivotIdx;
};

const sort = (arr, lo, hi) => {
    if (lo >= hi) return;

    let pivotIdx = partition(arr, lo, hi);
    sort(arr, lo, pivotIdx - 1);
    sort(arr, pivotIdx + 1, hi);
};

function quicksort(arr) {
    sort(arr, 0, arr.length - 1);
}

module.exports = { quicksort };

