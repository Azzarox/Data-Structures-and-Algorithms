# Dijkstra Shortest Path

The algorithm finds the shortest path in weighted graph without negative values.
The algorithm works by exploring the shortest path to given Vertex at the time and updates it.

## What we need

-   seen
-   prev
-   distances

The distances array will keep the cost to each vertex from the start. This includes the path taken.
For example from A to C there is no direct path so it will calculate the cost from A to B + B to C.

After that we set the distance of the source to be 0.

```javascript
distances[source] = 0;
```

Then we run while loop until there is unvisited vertex AND has distance less than infinity.

```javascript
function hasUnvisited(seen, distances) {
    return seen.some(
        (isVisited, index) => !isVisited && distances[index] < Infinity
    );
}
```

Then we get the vertexIndex with the lowest distance and unvisited.
We set it as currentIndex

```javascript
function getLowestUnvisited(seen, distances) {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue;

        if (lowestDistance > distances[i]) {
            lowestDistance = distances[i];
            idx = i;
        }
    }
    return idx;
}
```

When this steps are done. We set that the currIndex is seen

```javascript
seen[currIndex] = true;
```

Then we take the currIndex's edges and loop over them. And here is where the distances array is updated.
Essentially the algorithm is that it creates distance which is equal to the currentIndex's distance from the start + the distance to the next edge.
If this distance is less than already existing distance to the edge. We update the distances array of the edge.to. Also we add to the prev array.

```javascript
const adjcanciesArr = graph[currIndex];
for (let i = 0; i < adjcanciesArr.length; i++) {
    const edge = adjcanciesArr[i];

    if (seen[edge.to]) {
        continue;
    }

    const distance = distances[currIndex] + edge.weight;
    if (distance < distances[edge.to]) {
        distances[edge.to] = distance;
        prev[edge.to] = currIndex;
    }
}
```

After this is done we build the path.
```javascript
let currIndex = end;
    const path = [];

    if (prev[currIndex] == -1) {
        return [];
    }

    while (prev[currIndex] !== -1) {
        path.push(currIndex);
        currIndex = prev[currIndex];
    }

    return [start].concat(path.reverse());
```

Full Code:
```javascript
function hasUnvisited(seen, distances) {
    return seen.some(
        (isVisited, index) => !isVisited && distances[index] < Infinity
    );
}

function getLowestUnvisited(seen, distances) {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue;

        if (lowestDistance > distances[i]) {
            lowestDistance = distances[i];
            idx = i;
        }
    }
    return idx;
}

function dijkstra(graph, start, end) {
    // prev
    const prev = new Array(graph.length).fill(-1);
    const seen = new Array(graph.length).fill(false);
    const distances = new Array(graph.length).fill(Infinity);
    distances[start] = 0;

    while (hasUnvisited(seen, distances)) {
        const currIndex = getLowestUnvisited(seen, distances);
        seen[currIndex] = true;

        const adjcanciesArr = graph[currIndex];
        for (let i = 0; i < adjcanciesArr.length; i++) {
            const edge = adjcanciesArr[i];

            if (seen[edge.to]) {
                continue;
            }

            const distance = distances[currIndex] + edge.weight;
            if (distance < distances[edge.to]) {
                distances[edge.to] = distance;
                prev[edge.to] = currIndex;
            }
        }
    }

    let currIndex = end;
    const path = [];

    if (prev[currIndex] == -1) {
        return [];
    }

    while (prev[currIndex] !== -1) {
        path.push(currIndex);
        currIndex = prev[currIndex];
    }

    return [start].concat(path.reverse());
}


const graph = [
    [
        { to: 1, weight: 3 },
        { to: 2, weight: 1 },
    ],
    [
        { to: 0, weight: 3 },
        { to: 2, weight: 4 },
        { to: 4, weight: 1 },
    ],
    [
        { to: 1, weight: 4 },
        { to: 3, weight: 7 },
        { to: 0, weight: 1 },
    ],
    [
        { to: 2, weight: 7 },
        { to: 4, weight: 5 },
        { to: 6, weight: 1 },
    ],
    [
        { to: 1, weight: 1 },
        { to: 3, weight: 5 },
        { to: 5, weight: 2 },
    ],
    [
        { to: 6, weight: 1 },
        { to: 4, weight: 2 },
        { to: 2, weight: 18 },
    ],
    [
        { to: 3, weight: 1 },
        { to: 5, weight: 1 },
    ],
];

console.log(dijkstra(graph, 0, 6));

```

# For better understanding debug and watch the `distances` array.