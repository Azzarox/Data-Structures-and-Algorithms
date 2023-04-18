const { graph } = require('./graph');

function bfs(graph, source, needle) {
    const prev = {};
    const seen = {};

    const q = [source];

    seen[source] = true;
    prev[source] = null;

    while (q.length) {
        const curr = q.shift();

        if (curr === needle) {
            break;
        }

        const adjacentVerticesArr = graph[curr];

        for (let i = 0; i < adjacentVerticesArr.length; i++) {
            const edge = adjacentVerticesArr[i];
            const neighbor = edge.to;

            if (seen[neighbor]) {
                continue;
            }

            seen[neighbor] = true;
            prev[neighbor] = curr;
            q.push(neighbor);
        }
    }

    let curr = needle;
    const path = [];

    if (!prev[needle]) {
        return null;
    }

    while (prev[curr] !== null) {
        path.push(curr);
        curr = prev[curr];
    }

    path.push(source);

    return path.reverse();
}

// console.log(bfs(graph, 'A', 'E')); // ['A', 'C', 'E']
module.exports = { bfs };
