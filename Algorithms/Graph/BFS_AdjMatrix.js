// const vertices = ['a', 'b', 'c', 'd', 'e', 'f'];
// const adjMatrix = [
//     [0, 1, 0, 1, 0, 0],
//     [1, 0, 1, 0, 0, 0],
//     [0, 1, 0, 1, 1, 0],
//     [1, 0, 1, 0, 1, 1],
//     [0, 0, 1, 1, 0, 1],
//     [0, 0, 0, 1, 1, 0],
// ];

function bfs(vertices, matrix, start) {
    if (typeof start === 'string') {
        start = vertices.indexOf(start); // it is O[V] complexity
    }

    const q = [start];
    const visited = new Set();
    visited.add(start);

    while (q.length) {
        const curr = q.shift();
        console.log(vertices[curr]);

        const adjacentVertices = matrix[curr]; // THe row with vertices

        // Iterating over the columns of the rows
        for (let i = 0; i < adjacentVertices.length; i++) { 
            if (adjacentVertices[i] === 1 && !visited.has(i)) {
                q.push(i);
                visited.add(i);
            }
        }
    }
}

// bfs(vertices, adjMatrix, 0);

module.exports = { bfs };
