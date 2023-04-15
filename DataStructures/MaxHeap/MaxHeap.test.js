const { expect } = require('chai');
const { MaxHeap } = require('./MaxHeap');

describe('Testing MaxHeap', () => {
    let heap;
    beforeEach(() => {
        heap = new MaxHeap();
    });

    describe('Testing Initial State', () => {
        it('should have empty array and length of 0', () => {
            expect(heap.data).to.deep.equal([]);
            expect(heap.length).to.equal(0);
        });
    });

    describe('Testing Main Methods', () => {
        describe('Testing insert() method', () => {
            it('should successfully insert and keep the heap property', () => {
                heap.insert(8);
                heap.insert(14);
                heap.insert(3);
                heap.insert(22);
                heap.insert(2);
                heap.insert(7);

                // TODO:
                expect(heap.data).to.deep.equal([22, 14, 7, 8, 2, 3]);
                expect(heap.length).equal(6);
            });
        });

        describe('Testing delete() method', () => {
            it('should successfully delete the head and keep the heap property', () => {
                heap.insert(8);
                heap.insert(14);
                heap.insert(3);
                heap.insert(22);
                heap.insert(2);
                heap.insert(7);

                expect(heap.data).to.deep.equal([22, 14, 7, 8, 2, 3]);
                expect(heap.length).equal(6);

                expect(heap.delete()).to.equal(22);
                expect(heap.data).to.deep.equal([14, 8, 7, 3, 2, null]);
                expect(heap.length).to.equal(5);

                expect(heap.delete()).to.equal(14);
                expect(heap.data).to.deep.equal([8, 3, 7, 2, null, null]);
                expect(heap.length).to.equal(4);

                expect(heap.delete()).to.equal(8);
                expect(heap.data).to.deep.equal([7, 3, 2, null, null, null]);
                expect(heap.length).to.equal(3);

                expect(heap.delete()).to.equal(7);
                expect(heap.data).to.deep.equal([3, 2, null, null, null, null]);
                expect(heap.length).to.equal(2);

                expect(heap.delete()).to.equal(3);
                expect(heap.data).to.deep.equal([
                    2,
                    null,
                    null,
                    null,
                    null,
                    null,
                ]);
                expect(heap.length).to.equal(1);
            });

            it('should successfully remove if there is only 1 element in the heap', () => {
                heap.insert(10);
                expect(heap.delete()).to.equal(10);
                expect(heap.length).to.equal(0);
                expect(heap.data).to.deep.equal([]);
            });
        });

        describe('Testing build() method', () => {
            it('should create heap from a random array', () => {
                const arr = [24, 95, 49, 63, 99, 54, 61, 75, 79, 48];

                // Using internal method
                heap._buildHeap(arr);
                expect(heap.data).to.deep.equal([
                    99, 95, 61, 79, 48, 54, 49, 75, 63, 24,
                ]);

                // Using from constructor
                const heap2 = new MaxHeap(arr);
                expect(heap2.data).to.deep.equal(
                    [99, 95, 61, 79, 48, 54, 49, 75, 63, 24],
                );
            });
        });
    });
});
