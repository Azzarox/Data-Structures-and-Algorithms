# Heaps

Heaps also known as Binary Heap or Nearly Completed Tree are tree-like data structure which is filled from left to right. There are two types of heaps:

-   Min Heap (where the minimum value is at the top)
-   Max Heap (where the maximum value is at the top)

## Heap Rules

The heap rules are depending on that if it is min or max heap.

## Heap Structure

The heap is implemented easier using ArrayList where the element at index 0 is the root (minimum/maximum) and with the following formulae the children index are calculated

-   Left Child Idx => idx \* 2 + 1;
-   Right Child Idx => idx \* 2 + 2;
-   Paren Idx => Math.floor((idx - 1) / 2);

The indeces are needed for keeping the heap rules in order. There are 2 essential methods which are:

-   heapifyUp(idx);
-   heapifyDown(idx);

This methods are used to swap the elements depending on the rules (if max or min heap) to keep the Heap in order with the rules.

`heapifyUp` is used when inserting, because you add the element at the end of the array, so then it needs to go up (a.k.a bubbleUp) to be in the correct spot according to the rules.

`heapifyDown` is used when deleting, because with deleting, it pops the element at index 0 and swaps it with the last added element. This means that it needs to heapifyDown from the 0 element to find the best spot according to the heap's rules.

## Methods

Usually there are 2 methods:

-   insert(value)
-   delete() // also could be called pop() or poll();

## Private Methods

-   getParentIdx(idx) : number
-   getLeftChildIdx(idx) : number
-   getRightChildIdx(idx) : number
-   heapifyUp(idx) : void
-   heapifyDown(idx) : void

The first three methods are just mathematical formulas for finding the index, because as said above we don't use Node-based data structure but an ArrayList for imlpementing Heap.

### heapifyUp()

`heapifyUp` is the easier method because its more simple. It can be done recursively or iteratively but for the sake of better understanding it will be done in recursive manner.

First we write the base case which is if the index is 0 then we return. This is a base case because we cannot go up from index 0.

After that we get the parentIdx with the methods, the parentValue and the currentValue.

Then we do the check. For MinHeap if the parentValue is bigger than the currentValue we swap them and heapifyUp again from the parentIdx. For MaxHeap we do the same but if the parentValue is less than the currentValue.

Code:

```javascript
heapifyUp(idx) {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.getParentIdx(idx);
        const parentValue = this.data[parentIdx];
        const value = this.data[idx];

        // MinHeap
        if (parentValue > value) {
            // Swap;
            this.data[idx] = parentValue;
            this.data[parentIdx] = value;

            this.heapifyUp(parentIdx);
        }

        // MaxHeap
        if (parentValue < value) {
            // Swap;
            this.data[idx] = parentValue;
            this.data[parentIdx] = value;

            this.heapifyUp(parentIdx);
        }
    }
```

### heapifyDown()

`heapifyDown()` is a little bit more complicated because we need to choose the smallest from the children or the biggest from the children depending if it Min or Max heap. After that it need to be compared to the currentValue.

If it is Min Heap we choose the smallest from the left and right and then compare it to the currentValue. If the currentValue is bigger than the smallest, then we swap them and heapifyDown again from the smallest index.

If it is Max Heap we choose the biggest from the left and right and then compare it to the currentValue. If the currentValue is less than the biggest, then we swap them and heapifyDown again from the biggest index.

First we need to set base cases. There are two base cases but can be combined into one. The base case is either the currentIdx is bigger or equal to the length or the leftChilIdx is bigger or equal to the length of the array. This means we can't heapifyDown if we are at this.length because it is out of the bounds of the array.

After that we get the leftValue, rightValue and currentValue.

In `MinHeap` we check if the `leftValue` is bigger than the `rightValue` and if the `currentValue` is bigger than the rightValue. This whole thing means that the `rightValue` is the _smallest_ and if the `currentValue` is bigger than it, it needs to be swapped with the `currentValue`. When it is swapped then it heapifiesDown again but with the rightIndex (which now swapped is the this.data[idx] or currentValue)

However, if `rightValue` is bigger than `leftValue` and `currentValue` is bigger than `leftValue`. Then we swap `leftValue` with `currentValue` and heapifyDown from the leftChildIdx.

Code:

```Javascript
heapifyDown(idx) {
    const leftChildIdx = this.getLeftChildIdx(idx);
    const rightChildIdx = this.getRightChildIdx(idx);

    if (idx >= this.length || leftChildIdx >= this.length) {
        return;
    }

    const leftValue = this.data[leftChildIdx];
    const rightValue = this.data[rightChildIdx];
    const value = this.data[idx];

    if (leftValue > rightValue && value > rightValue) {

        //Swap;
        this.data[idx] = this.data[rightChildIdx];
        this.data[rightChildIdx] = value;

        this.heapifyDown(rightChildIdx);
    } else if (rightValue > leftValue && value > leftValue) {

        //Swap;
        this.data[idx] = this.data[leftChildIdx];
        this.data[leftChildIdx] = value;

        this.heapifyDown(leftChildIdx);
    }
}
```

The only change for MaxHeap is in the equality signs.

```Javascript
if (leftValue < rightValue && value < rightValue) {

    //Swap;
    this.data[idx] = this.data[rightChildIdx];
    this.data[rightChildIdx] = value;

    this.heapifyDown(rightChildIdx);
} else if (rightValue < leftValue && value < leftValue) {

    //Swap;
    this.data[idx] = this.data[leftChildIdx];
    this.data[leftChildIdx] = value;

    this.heapifyDown(leftChildIdx);
}

```

Now having the private methods created we can implement the delete() and insert() methods.

## insert(value)

`insert` is very simple 3 line method. We add the value at the last position of the index then use the heapifyUp private method from the last index of the array (this.length) and the increase the length:

```javascript
insert(value) {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
}
```

## delete()

`delete` is a little bit more complicated because it uses the length of the array.
First we need to set our base cases. The first base case is if there are no elements in the array. We should return error, null, -1, undefined or whatever.

The next base case is if there is exactly one element. If that is the case we should remove the element and return it, decrease the size and set the array to be empty array.

Lastly, we first decrease the length then we swap the first element (at 0 idx) with the last and then we heapifyDown from the 0 index.

With deleting there could be a duplicate because we don't implicitly remove the last element. For example we want ot delete 3 from the array `[3,2,5,6]` but this will swap 6 with 3 and duplicate 6. Meaning `[6,2,5,6]`

Code:

```javascript
delete() {
    // Base case 1
    if (this.length === 0) {
        return -1;
    }


    const outValue = this.data[0];
    this.length--; // First reduce the length;

    // Base case 2 
    if (this.length === 0) {
        this.data = [];
        return outValue;
    }

    this.data[0] = this.data[this.length];
    this.heapifyDown(0);
    return outValue;
    }
```
