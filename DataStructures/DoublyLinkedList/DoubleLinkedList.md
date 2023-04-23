# Doubly Linked List

## Definition

Doubly Linked List is a list where each node has previous and next pointers.
Has head and tail

## Note: For the following methods and structure there is PDF file with diagrams

## Structure

### Step 1: create `class Node` which has properties:

-   value => the value of the element
-   prev => pointer to the previous element
-   next => pointer to the next element

```typescript
class Node<T> {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
```

### Step 2: Create `class DoublyLinkedList` which has properties:

-   head => the head of the Doubly Linked List (DLL)
-   tail => the tail of the DLL
-   length => the size of the DLL.

### Step 3: Initialize the head and tail to be null and the length to be 0;

```typescript
class DoublyLinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    ...
}
```

### Step 4: Create prepend(value) method which adds to the head;

0. Create the newNode `const newNode = new Node(value);`
1. Check if there is head, if there is no head; Set the head and tail to be the newNode.
2. After that set currentHead (this.head) .prev pointer to the newNode
3. Set newNode .next pointer to currentHead (this.head)
4. Set this.head to be the newNode.
5. Increase this.length

```typescript
prepend(item: T): void {
    const newNode = new Node(item);

    if (!this.head) {
        this.head = this.tail = newNode;
    } else {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
    }

    this.length++;
}
```

### Step 5: Create append(value) method which adds to the tail;

0. Create the newNode `const newNode = new Node(value);`
1. Check if there is tail, if there is no tail; Set the head and tail to be the newNode.
2. After that set currentTail (this.tail) .next pointer to the newNode
3. Set newNode .prev pointer to currentTail (this.tail)
4. Set this.tail to be the newNode.
5. Increase this.length

```typescript
append(item: T): void {
    const newNode = new Node(item);

    if (!this.tail) {
        this.tail = this.head = newNode;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    this.length++;
}
```

## Step 6: Create insertAt(idx, value) method

0. Check if the idx is not less than 0 and not bigger than this.length. Otherwise = Index out of bounds.
1. Check if the `idx` is 0, then add to the head with `this.prepend(value)`
2. Check if the `idx` is equal to `this.length`. This means to add to the tail with `this.append(value)`
3. Create newNode;
4. Traverse to the node at the `idx`.

```typescript
let currentNode = this.head;
for (let i = 0; i < idx; i++) {
    currentNode = currentNode!.next;
}
```

This can be optimized. For example:

If the idx is less than or equal to the half of the this.length, then we can start from this.head and traverse by .next pointers.

If the idx is bigger than or equal to the half of the this.length, then we can start from this.tail and traverse by .prev pointers. If we use for loops, for traversing backwards we need to start from this.length - 1.

Example:

```typescript
if (idx <= this.length / 2) {
    currentNode = this.head;
    for (let i = 0; i < idx; i++) {
        currentNode = currentNode!.next;
    }
} else {
    currentNode = this.tail; // it is positioned at [this.length]
    for (let i = this.length - 1; i > idx; i--) {
        currentNode = currentNode!.prev;
    }
}

// or using while loops

if (idx <= this.length / 2) {
    let count = 0;
    currentNode = this.head;
    while (count !== idx) {
        currentNode = currentNode!.next;
        count++;
    }
} else {
    let count = this.length - 1;
    currentNode = this.tail;
    while (count !== idx) {
        currentNode = currentNode!.prev;
        count--;
    }
}
```

5. Set the currentNode.prev.next to be the newNode;
6. Set the currentNode.prev to be the newNode;
7. Set the newNode.prev to be the currentNode.prev;
8. Set the newNode.next to be the currentNode.

```typescript
currentNode!.prev.next = newNode;
currentNode!.prev = newNode;

newNode.prev = currentNode!.prev;
newNode.next = currentNode;
```

9. Increase this.length;
   &nbsp;

Full method code:

```typescript
insertAt(item: T, idx: number): void {

    if (idx === 0) {
        this.prepend(item);
        return;
    }

    if (idx === this.length) {
        this.append(item);
        return;
    }

    const newNode = new Node(item);

    let currentNode = this.head;
    for (let i = 0; i < idx; i++) {
        currentNode = currentNode!.next;
    }

    if (!currentNode!.prev) throw new Error("Index out of bounds");

    currentNode!.prev.next = newNode;
    currentNode!.prev = newNode;

    newNode.prev = currentNode!.prev;
    newNode.next = currentNode;

    this.length++;
}
```

## Step 7: Create remove(value) method.

0. Check if there are elements in the list.
1. Traverse the list until the searched value is found.
2. When the value is found:

-   Check if the **currentNode** is not head, if it is then set the head to be **currentNode.next**;
-   Check if the **currentNode** is not tail, if it is then set the tail to be **currentNode.prev**;
-   Check if there is **currentNode.prev**, if there is then set the **currentNode.prev.next** to be **currentNode.next**;
-   Check if there is **currentNode.next**, if there is then set the **currentNode.next.prev** to be **currentNode.prev**;

3. Set currentNode.prev = currentNode.next = null;
4. Reduce the length;

&nbsp;
Full method code:

```typescript
remove(item: T): T | undefined {

    if (!this.length) {
        throw new Error("Cannot remove from empty list!");
    }

    let currentNode = this.head;

    while (currentNode) {
        if (currentNode.value === item) {

            if (currentNode == this.head) {
                this.head = currentNode.next;
            }

            if (currentNode == this.tail) {
                this.tail = currentNode.prev;
            }

            if (currentNode.prev) {
                currentNode.prev.next = currentNode.next;
            }

            if (currentNode.next) {
                currentNode.next.prev = currentNode.prev;
            }

            currentNode.next = null;
            currentNode.prev = null;

            this.length--;

            return currentNode.value;
        }

        currentNode = currentNode.next;
    }

    return undefined;
}
```

## Step 8: Create removeAt(idx, value) method.

This method is the same like `remove`. The only difference is that it needs **traversing** to `idx`;
Also, there is a check if there is at all `currentNode` at the given `idx`;

Full method code
&nbsp;

```typescript
removeAt(idx: number): T | undefined {
    if (idx < 0 || idx > this.length){
        throw new Error("Index out of bounds")
    }
    // Traverse to the idx
    let currentNode = this.head;
    for (let i = 0; i < idx; i++) {
        currentNode = currentNode!.next;
    }

    // Check if there is such node at this index;
    if (!currentNode){
        return undefined;
    }

    if (currentNode.prev) {
        currentNode.prev.next = currentNode.next;
    }

    if (currentNode.next) {
        currentNode.next.prev = currentNode.prev;
    }

    if (currentNode == this.head) {
        this.head = currentNode.next;
    }

    if (currentNode == this.tail) {
        this.tail = currentNode.prev;
    }
    currentNode.prev = currentNode.next = null;
    this.length--;

    return currentNode.value;
}
```

## Bonus: traverse() method:

```typescript
traverse(idx: number): Node<T> | null {

    if (idx < 0 || idx >= this.length) return null;

    let currentNode: Node<T> | null = null;

    if (idx <= this.length / 2) {
        currentNode = this.head;
        for (let i = 0; i < idx; i++) {
            currentNode = currentNode!.next;
        }

    } else {
        currentNode = this.tail;
        for (let i = this.length - 1; i > idx; i--) {
            currentNode = currentNode!.prev;
        }
    }

    return currentNode;
}
```
