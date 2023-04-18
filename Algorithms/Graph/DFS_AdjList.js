function walk(graph, currentVertex, visited) {
    visited.add(currentVertex);
    console.log(currentVertex);

    const adjacencies = graph[currentVertex];
    for (let i = 0; i < adjacencies.length; i++) {
        const edge = adjacencies[i];
        if (!visited.has(edge)) {
            walk(graph, edge, visited);
        }
    }
}

function dfs(graph, start) {
    const visited = new Set();
    walk(graph, start, visited);
}
module.exports = { dfs };
