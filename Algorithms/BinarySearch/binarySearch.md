# BinarySearch Solution Notes and Explanation

## Given:

`arr` and `x`: Where `arr` is the array and `x` is the value we are looking for.
The array should be sorted!

## Step 1:

First need to set lower and upper boundaries of the array.
The Lower boundary is the 0 and the upper boundary is the length of the array.
Here we use the upper boundary as it is exclusive. If it was inclusive we would've used it as length - 1.
&nbsp;

## Step 2:

After that we calculate the index at the middle:

-   Lower boundary (lo)
-   Upper boundary (hi)

Formula for `midIndex = (lo + (hi - lo)) / 2` => and we Floor the result of that with `Math.Floor()`

`midIndex = Math.floor((lo + (hi - lo)) / 2);`
&nbsp;

## Step 3:

We set the value at the middle with `midValue = arr[midIndex]`
&nbsp;

## Step 4:

After that we run a while loop while the lower boundary is less than the higher boundary
`while (lo < hi)`.

_Step 2_ and _Step 3_ should be repeated inside the loop.

Inside the while loop we check for:

-   if the searched value "x" is equal to the **value** at the middle point. If it is then we end the program and return either true (for found) or the index at which is found.
-   if the searched value "x" is less than the **value** at the middle point. If it is then we reassign the `hi` to be the `midIndex`
-   else if the searched value "x" is bigger than the **value** at the middle point. If it is then we reassign the `lo` to be the `midIndex + 1`. Here we use the `+ 1` because the "lo" is **inclusive**. We didn't use `midIndex - 1` for the "hi" because the approach taken is that the upper boundary is exclusive.
    &nbsp;

## Step 5:

After that if neither of the conditions is met than we return false or -1 as index.
&nbsp;

## Code Solution:

```typescript
export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    while (lo < hi) {
        let midIndex = Math.floor(lo + (hi - lo) / 2);
        let midValue = haystack[midIndex];

        if (needle == midValue) {
            return true;
        } else if (needle < midValue) {
            hi = midIndex;
        } else {
            lo = midIndex + 1;
        }
    }
    return false;
}
```
