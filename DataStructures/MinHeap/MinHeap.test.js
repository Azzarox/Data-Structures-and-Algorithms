const { expect } = require('chai');
const { MinHeap } = require('./MinHeap');

describe('Testing MinHeap', () => {
    let heap;
    beforeEach(() => {
        heap = new MinHeap();
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

                expect(heap.data).to.deep.equal([2, 3, 7, 22, 14, 8]);
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

                expect(heap.data).to.deep.equal([2, 3, 7, 22, 14, 8]);
                expect(heap.length).equal(6);

                expect(heap.delete()).to.equal(2);
                expect(heap.data).to.deep.equal([3, 8, 7, 22, 14, null]);
                expect(heap.length).to.equal(5);

                expect(heap.delete()).to.equal(3);
                expect(heap.data).to.deep.equal([7, 8, 14, 22, null, null]);
                expect(heap.length).to.equal(4);

                expect(heap.delete()).to.equal(7);
                expect(heap.data).to.deep.equal([8, 22, 14, null, null, null]);
                expect(heap.length).to.equal(3);

                expect(heap.delete()).to.equal(8);
                expect(heap.data).to.deep.equal([
                    14,
                    22,
                    null,
                    null,
                    null,
                    null,
                ]);
                expect(heap.length).to.equal(2);

                expect(heap.delete()).to.equal(14);
                expect(heap.data).to.deep.equal([
                    22,
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
                heap.buildHeap(arr);
                expect(heap.data).to.deep.equal([
                    24, 48, 49, 63, 95, 54, 61, 75, 79, 99,
                ]);

                // Using from constructor
                const heap2 = new MinHeap(arr);
                expect(heap2.data).to.deep.equal([
                    24, 48, 49, 63, 95, 54, 61, 75, 79, 99,
                ]);

            });
        });
    });

    describe('Testing Private Methods', () => {
        describe('Testing swap() method', () => {
            it('should correctly swap two values in an array', () => {
                heap.insert(10);
                heap.insert(20);
                heap.insert(30);
                expect(heap.data).to.deep.equal([10, 20, 30]);

                heap.swap(heap.data, 0, 2);
                expect(heap.data).to.deep.equal([30, 20, 10]);
            });
        });

        describe('Testing get...Idx() methods', () => {
            let heap;
            beforeEach(() => {
                heap = new MinHeap();
                heap.insert(15);
                heap.insert(1);
                heap.insert(33);
                heap.insert(12);
                heap.insert(4);
                heap.insert(8);
            });

            it('should correctly return parent index', () => {
                expect(heap.data).to.deep.equal([1, 4, 8, 15, 12, 33]);
                expect(heap.getParentIdx(4)).to.equal(1);
                expect(heap.getParentIdx(3)).to.equal(1);
                expect(heap.getParentIdx(5)).to.equal(2);

                expect(heap.getParentIdx(1)).to.equal(0);
                expect(heap.getParentIdx(2)).to.equal(0);
            });

            it('should correctly return left child index', () => {
                expect(heap.data).to.deep.equal([1, 4, 8, 15, 12, 33]);
                expect(heap.getLeftChildIdx(0)).to.equal(1);
                expect(heap.getLeftChildIdx(1)).to.equal(3);
                expect(heap.getLeftChildIdx(2)).to.equal(5);
            });

            it('should correctly return right child index', () => {
                expect(heap.data).to.deep.equal([1, 4, 8, 15, 12, 33]);
                expect(heap.getRightChildIdx(0)).to.equal(2);
                expect(heap.getRightChildIdx(1)).to.equal(4);
            });
        });
    });
});
