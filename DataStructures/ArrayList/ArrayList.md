# ArrayList

## Steps

## Shifting to the Right

1. Since the array is indexed from 0, this means that the last actual index is this.length - 1
   Example: If [10,20,30] the length is 3 but the last index is 2
2. To shift items to the left we:

```javascript
for (let i = this.length; i > 0; i--) {
    this.items[i] = this.items[i - 1];
}
```

With this we move each item to the right, because we set i to be the this.length (which is undefined) and is 1 element above the last index:

For example this would look like this: `[10, 20, 30, undefined, ...]`. Like this we move 30 to be instead of undefined, then 20 instead of 30, then 10... At the last step this looks like this => [10, 10, 20, 30, ...]. After that we set `this.items[0] = value`;

This is example of adding to the beginning.

## Shifting to the left

Shifting to the left is simple since we start from 0 and loop until this.length;

```javascript
for (let i = 0; i < this.length; i++) {
    this.items[i] = this.items[i + 1];
}
```

## required properties

1. capacity -> max capacity of an Array
2. items/data -> Array to hold the elements
3. length of the array -> total items in the array
4. isFull -> method to check if there is need for resizing

## Required methods

1. resize()
2. push(value) -> add at the end
3. pop() -> remove last added element (from the end)
4. unshift(value) -> add at the beginning
5. shift() -> remove last added element (from the beginning)
6. insert(idx, value) -> insert at index
7. remove(value) -> remove item

## resize() method

The resize method needs to create new array with double the capacity and then copy over each element from the current this.items to the new array with the doubled capacity. Then set this.items to be the new array (with the doubled capacity).

Code:

```javascript
resize() {
        this.capacity = this.capacity * 2;
        const arr = new Array(this.capacity);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = this.data[i];
        }
        this.data = arr;
    }

```

## push(value) method

The push() method is simple, it just adds item at the end of the element, increases the length. Also it has to check before everything if there is need for resizing.

Code:

```javascript
 push(value) {
        if (this.isFull) {
            this.#resize();
        }

        this.data[this.length] = value;
        this.length++;
    }
```

## pop() method

The pop() method is simple, it just removes the last item, decreases the length and returns the removed item

Code:

```javascript
pop() {
        if (this.length === 0) {
            throw new Error('Cannot pop from empty array');
        }

        const removed = this.data[this.length - 1];
        this.length--;
        return removed;
    }
```

## unshift() method

The unshift() method need to check for resizing, after that it shifts all elements to the right and adds item at the beginning (at 0 index). Then increases the length.

Code:

```javascript
unshift(value) {
        if (this.isFull) {
            this.#resize();
        }

        //Shift to the right
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[0] = value;
        this.length++;
    }

```

## shift() method

The shift() method, removes the first element then shifts elements to the left, decrases length and returns the removed element.

Code:

```javascript
    shift() {
        if (this.length === 0) {
            throw new Error('Cannot shift from empty array');
        }

        const removed = this.data[0];

        // Shift to the left
        for (let i = 0; i > this.length; i++) {
            this.data[i] = this.data[i + 1];
        }

        this.length--;

        return removed;
    }
```

## insert() method

Same as the "adding" methods, it need to shift the elements to the left, but shifts element until the idx and not 0.
Then increases length.

Code:

```javascript
  insert(idx, value) {
        if (idx < 0 || idx >= this.length) {
            throw new Error('Index out of bounds');
        }

        if (this.isFull) {
            this.#resize();
        }

        //Shift to the right
        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[idx] = value;
        this.length++;
    }
```

## remove() method

Same as the "removing" elements, it need to shift element to the right, but starts from the idx and not from 0

Code:

```javascript
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

        // Shift to the Left
        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1];
        }

        this.length--;
        return removed;
    }
```
