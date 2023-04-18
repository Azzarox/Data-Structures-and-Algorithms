// Graph where adjList represents 0,1,2,3 and the adjList[i] is the adjacent vertices
// const adjList = [
//     [1, 3],
//     [0, 2],
//     [1, 3],
//     [0, 2],
// ];

// const graph = {
//     a: ['b', 'd'],
//     b: ['a', 'c'],
//     c: ['b', 'd', 'e'],
//     d: ['a', 'c', 'e'],
//     e: ['c', 'd', 'f'],
//     f: ['e'],
// };

function bfs(graph, start) {
    const q = [start];
    const visited = new Set();
    visited.add(start);

    while (q.length) {
        const curr = q.shift();
        console.log(curr);

        const adjacentVertices = graph[curr];
        for (let i = 0; i < adjacentVertices.length; i++) {
            const edge = adjacentVertices[i];
            if (!visited.has(edge)) {
                q.push(edge);
                visited.add(edge);
            }
        }
    }
}

// NOTE: Using set is more effective
// since it removes duplicates and .has() cost of operation compared to .indexOf() is better.

// bfs(adjList, 2);
// bfs(graph, 'a');

module.exports = {
    bfs,
};
