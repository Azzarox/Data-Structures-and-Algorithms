function walk(vertices, graph, currentVertex, visited) {
    visited.add(currentVertex);
    console.log(vertices[currentVertex]);

    const adjacencies = graph[currentVertex]; // rows
    for (let i = 0; i < adjacencies.length; i++) {
        // cols
        if (adjacencies[i] === 1 && !visited.has(i)) {
            walk(vertices, graph, i, visited);
        }
    }
}

function dfs(vertices, graph, start) {
    const visited = new Set(); // Holds the indeces of the vertices
    walk(vertices, graph, start, visited);
}

// NOTE: Can use !! operator since 0 is false and 1 is true
// if (!!adjMatrix[currentVertex][adjacentVertexIdx] && !visited.has(adjacentVertexIdx)) {
//     dfsHelper(vertices, adjMatrix, adjacentVertexIdx, visited);
// }

// NOTE: Can use == 1 to compare with the !! (which if it is 1 it will be true)
// if (!!adjMatrix[currentVertex][adjacentVertexIdx] == 1  && !visited.has(adjacentVertexIdx)) {
//     dfsHelper(vertices, adjMatrix, adjacentVertexIdx, visited);
// }

module.exports = { dfs };
