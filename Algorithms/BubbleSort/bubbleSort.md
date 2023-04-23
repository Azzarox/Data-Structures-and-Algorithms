# Bubble Sort

## Sorting

The definition of sorting is that any _i-th position_ in an array should be less than or equal to the _i + 1 position_ and this is true for the entire array. There could be places where this is true but only for the place for example: `[1,2,3,7,4,6]`. The first 3 values are sorted but then after 7 it is not sorted. So we can't say that the array is sorted.

## How does Bubble Sort work?

Bubble Sort is pretty simple and it works like this.
It takes each element and compares it with the next element. If the first element is less than the next element than it swaps their position.

For example in the array `[4,8,23,6,15]` it will start from 4 and compare it to 8, in this case 4 is not bigger than 8 so there is no need for sorting.
The next elements for comparison is 8 with 23. Again 8 is not bigger than 23 so there is no need for sorting.
Goes to the next and now the numbers for comparison are 23 and 6. This time 23 is bigger than 6 so it needs to swap.

The important thing is that after the first iteration, the largest item in the array will be at the last index of the array. So for each next iteration there is no need to include the last element of the array. This means that the iteratoin should be `N - 1 - i` times.

For example the original array is: `[1, 3, 7, 4, 2]`

1st iteration = `[1, 3, 4, 2, 7]`. The array is still not sorted but the largest value is at the end. This means that the next iteration may not include the last item.

2nd iteration = `[1, 3, 4, 2| 7]`.

3rd iteration = `[1, 3, 2 |4, 7]`.

4th iteration = `[1, 2 |3, 4, 7]`.
...

## Time Complexity
The time complexity can be found very easily. If we turn the iteration from bottom to top and instead of subtracting each time by `N - 1 - i` we start adding. This means that we start from `1 + 2 + 3...N` which can be found by **Gauss formula for summing numbers in a range.**

The formula is `(n(n + 1))/2`. So if we do this with our N it comes to `((n-1)(n-1))/2` which after the calculation is done is `(n^2 + n)/2` but then you drop the constants and you drop the insignificant values `(n^2 > n)` so at the end the time complexity becomes *n^2*.

## Code Solution
```typescript
export default function bubble_sort(arr: number[]): void {

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - 1 - i; j++) {
            
            if (arr[j] > arr[j + 1]) {
                // Swap 
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

```