# Generalized Version of 2 Crystal Balls

## Problem

Given two crystal balls that will break if dropped from high enough
distance, determine the exact spot in which it will break in the most
optimized way.

## Explanation and Notes

### My thoughts: - Not sure about n \* logn.

Generally speaking we have an array of 0 and 1 which is false and true;
`[false,false,false,true, true]`. If we were to use binary search and take the half, we may happen to come across of **true** value. This would mean that whatever is beyond that index is true and our 1 crystal ball is already broken. To check with the other ball we need to go linearly to find the first "true" value since we already know that from the 0 index toward wherever the midPoint true was there are the true values. Effectively this makes the complexity of O(n \* logn). Which is combining the complexity of both Linear and Binary search and it is not the optimal solution.

### The explanation:

We don't use the halving, because:
If you jump to your middle element and your ball breaks, this means we have only 1 left. Therefore, we need to start from the last known good position which is the 0 index (the beginning) and walk to half of N. Which is still Linear Time and we want ot improve this time.
That is why we want to jump by different ammount. If we jump by **square root of N** means that **we will at most walk square root of N**. We pick square root of N because it is the most efficient pick which is less than N.

For example if we pick **square root of N**, when _N = 100_; this means that the amount that we will jump will be _10_. So it will check first the 10th floor, then the 20th and so on. While if we choose **cube root of N**, which is roughly _4_ for _N = 100_; this means that the jump amount will by 4. So first floor will be 4 and then 8 and so on which **is less efficient** than _square root of N_.

## Steps

### Step 1

We first take the square root of the length and we use it as a jumping amount;
We set the `i` to be the jump amount and run a for loop over the length of the array. We increment the loop with the jump amount each time:
`ex. If the step is 100 then i is each time incremented by 100.`
The loop is broken when the value at the `i` index in the array is "true";

### Step 2

When the first loop breaks out this means our ball is broken and we need to run linear search from the last known good point which is for example if the random index is 500 then 500 - 100 = 400. We set the `i` to be 400 with `i -= jumpAmount`.
Then we run the second for loop which is essentially the linear search.
We can take two approaches here:

#### First approach

Start from 400 (j = i) and loop until j is less than or equal to j + jumpAmount and j is inside the array boundaries.
`for (let j = i; j <= j + jumpAmount && j < arr.length; j++){}`

#### Second approach

Start from 0 and run the loop while `j` is less than or equal to the jump amount and `i` is inside the boundaries of the array. We increment both `i` and `j`.
`for (let j = 0; j <= jumpAmount && i < arr.length; j++, i++)`

### Step 3

If it is not returned before that we return -1. For example if we are inside a building of 5 stories and neither of the 5 stories will break the ball. Then we return -1.

### Code Solution

```typescript
export default function two_crystal_balls(breaks: boolean[]): number {
    let jumpAmount = Math.floor(Math.sqrt(breaks.length));
    let i = jumpAmount;

    for (; i < breaks.length; i += jumpAmount) {
        if (breaks[i]) break;
    }

    i -= jumpAmount;

    // Approach 2
    // for (let j = 0; j <= jumpAmount && i < breaks.length; j++, i++) {
    //     if (breaks[i]) return i;
    // }

    // Approach 1
    for (let j = i; j <= j + jumpAmount && j < breaks.length; j++) {
        if (breaks[j]) return j;
    }

    return -1;
}
```
