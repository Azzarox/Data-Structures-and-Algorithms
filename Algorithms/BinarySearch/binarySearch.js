function binarySearch(arr, x) {
    let lo = 0;
    let hi = arr.length;

    while (lo < hi) {
        let midIndex = Math.floor(lo + (hi - lo) / 2);
        let midValue = arr[midIndex];

        if (x === midValue) {
            return true;
        } else if (x < midValue) {
            hi = midIndex;
        } else {
            lo = midIndex + 1;
        }
    }

    return false;
}

function binarySearchRecursive(arr, x, lo, hi) {
    if (lo >= hi) {
        return false;
    }

    let midIndex = Math.floor(lo + (hi - lo) / 2);
    let midValue = arr[midIndex];

    if (x === midValue) {
        return true;
    } else if (x < midValue) {
        return binarySearch(arr, x, lo, midIndex);
    } else {
        return binarySearch(arr, x, midIndex + 1, hi);
    }
}

module.exports = { binarySearch, binarySearchRecursive };
