const { expect } = require('chai');
const { describe } = require('mocha');
const { DoublyLinkedList } = require('./DoublyLinkedList');

describe('Testing Doubly Linked List', () => {
    let list;

    beforeEach(() => {
        list = new DoublyLinkedList();
    });

    describe('Testing initial state', () => {
        it('should return 0 for the size', () => {
            expect(list.size).to.equal(0);
        });

        it('should return null for the head and tail', () => {
            expect(list.head).to.be.null;
            expect(list.tail).to.be.null;
        });
    });

    describe('Testing prepend method', () => {
        it('head and tail values should be the same', () => {
            list.prepend(10);
            expect(list.head.value).to.equal(list.tail.value);
            expect(list.size).to.equal(1);
        });

        it('should add head successfully', () => {
            list.prepend(10);
            list.prepend(20);
            list.prepend(30);
            expect(list.head.value).to.equal(30);
            expect(list.head.next.value).to.equal(20);
            expect(list.head.next.next.value).to.equal(10);
            expect(list.head.next.prev.value).to.equal(30);
            expect(list.size).to.equal(3);
        });
    });

    describe('Testing append method', () => {
        it('head and tail values should be the same', () => {
            list.append(10);
            expect(list.head.value).to.equal(list.tail.value);
            expect(list.size).to.equal(1);
        });

        it('should add tail successfully', () => {
            list.append(10);
            list.append(20);
            list.append(30);
            expect(list.tail.value).to.equal(30);
            expect(list.tail.prev.value).to.equal(20);
            expect(list.tail.prev.next.value).to.equal(30);
            expect(list.tail.prev.prev.value).to.equal(10);
            expect(list.size).to.equal(3);
        });
    });

    describe('Testing insertAt method', () => {
        it('should throw error when the index is bigger than the size', () => {
            list.prepend(10);
            list.append(20);
            expect(() => list.insertAt(10, 10)).to.throw('Index out of bounds');
        });
        it('should throw error when the index is less than 0', () => {
            list.prepend(10);
            list.append(20);
            expect(() => list.insertAt(-10, 10)).to.throw(
                'Index out of bounds'
            );
        });

        it('should add head if the index is 0', () => {
            list.prepend(10);
            list.append(20);
            list.insertAt(0, 30);
            expect(list.head.value).to.equal(30);
        });

        it('should add tail if the index is equal to the size', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.insertAt(list.size, 15);
            expect(list.tail.value).to.equal(15);
        });

        it('should insert at valid index successfully', () => {
            list.prepend(10);
            // 15
            list.append(20);
            list.append(30);
            list.append(40);
            list.insertAt(1, 15);

            expect(list.head.next.value).to.equal(15);
            expect(list.head.next.next.value).to.equal(20);
            expect(list.head.next.next.prev.value).to.equal(15);
        });

        it('should increase size after insert', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.append(40);
            list.insertAt(1, 15);
            expect(list.size).to.equal(5);
        });
    });

    describe('Testing removeAt method', () => {
        it('should throw error when the index is bigger than the size', () => {
            list.prepend(10);
            list.append(20);
            expect(() => list.removeAt(10)).to.throw('Index out of bounds');
        });

        it('should throw error when the index is less than 0', () => {
            list.prepend(10);
            list.append(20);
            expect(() => list.removeAt(-10)).to.throw('Index out of bounds');
        });

        it('should throw error when the index is equal to the size', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            expect(() => list.removeAt(3)).to.throw('Index out of bounds')
        });

        it('should remove head if index is 0', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            expect(list.head.value).to.equal(10);
            list.removeAt(0);
            expect(list.head.value).to.equal(20);
            expect(list.head.next.value).to.equal(30);
        });

        it('should remove tail if index is equal to the size - 1', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            expect(list.tail.value).to.equal(30);
            // since the for loop starts from 0 (for traversing to the index)
            // if we say removeAt(list.size) it will go over the last index
            // to be able to use removeAt(list.size) the loop should start from 1;
            list.removeAt(list.size - 1);
            expect(list.tail.value).to.equal(20);
            expect(list.tail.prev.value).to.equal(10);
        });

        it('should remove value at valid idx successfully', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.append(40);

            expect(list.head.next.value).to.equal(20);
            expect(list.head.next.prev.value).to.equal(10);
            list.removeAt(1);
            expect(list.head.next.value).to.equal(30);
            expect(list.head.next.prev.value).to.equal(10);
        });

        it('should return the removed value and decrease the size', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.append(40);
            expect(list.removeAt(1)).to.equal(20);
            expect(list.size).to.equal(3);
        });
    });

    describe('Testing remove method', () => {
        it('should throw error when the list is empty', () => {
            expect(() => list.remove(10)).to.throw(
                'Cannot remove from empty list'
            );
        });

        it('should return undefined if there is no node with the searched for value', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            expect(list.remove(3)).is.undefined;
        });

        it('should remove head if value is head', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            expect(list.head.value).to.equal(10);
            list.remove(10);
            expect(list.head.value).to.equal(20);
            expect(list.head.next.value).to.equal(30);
        });

        it('should remove tail if value is tail', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            expect(list.tail.value).to.equal(30);
            list.remove(30);
            expect(list.tail.value).to.equal(20);
            expect(list.tail.prev.value).to.equal(10);
        });

        it('should remove value successfully', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.append(40);

            expect(list.head.next.value).to.equal(20);
            expect(list.head.next.prev.value).to.equal(10);
            list.remove(20);
            expect(list.head.next.value).to.equal(30);
            expect(list.head.next.prev.value).to.equal(10);
        });

        it('should return the removed value and decrease the size', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.append(40);
            expect(list.remove(20)).to.equal(20);
            expect(list.size).to.equal(3);
        });
    });

    describe('Testing get method', () => {
        it('should return the value', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.append(40);
            expect(list.get(20)).to.equal(20);
        });
        it(' should return undefined if there is no such value', () => {
            list.prepend(10);
            list.append(20);
            list.append(30);
            list.append(40);
            expect(list.get(50)).is.undefined;
        });
    });

    describe('Testing traverse method', () => {
        it('should throw error if index is less than 0', () => {
            list.append(20);
            list.append(30);
            list.append(40);
            expect(() => list.traverse(-10)).to.throw('Index out of bounds');
        });

        it('should throw error if index is bigger than the this.size', () => {
            list.append(20);
            list.append(30);
            list.append(40);
            expect(() => list.traverse(5)).to.throw('Index out of bounds');
        });

        it('should throw error if index is equal to this.size', () => {
            list.append(20);
            list.append(30);
            list.append(40);
            expect(() => list.traverse(3)).to.throw('Index out of bounds');
        });


        it('should return the node correctly', () => {
            list.prepend(20);
            list.append(30);
            list.append(40);
            let result = list.traverse(2);
            expect(result).to.equal(list.tail); // Comparing as instances of Node
            expect(result.value).to.equal(40);
        });
    });
});
