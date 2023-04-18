const { graph } = require('./graph');

function walk(graph, curr, needle, seen, path) {
    // Base cases
    if (seen.has(curr)) {
        return false;
    }

    if (curr === needle) {
        // Because if it is found it is not added to the path
        path.push(curr);
        return true;
    }

    seen.add(curr);

    // pre
    path.push(curr);

    // recurse
    let list = graph[curr];
    for (let i = 0; i < list.length; i++) {
        const edge = list[i];
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    // post
    path.pop();

    return false;
}

function dfs(graph, source, needle) {
    const seen = new Set();
    const path = [];
    walk(graph, source, needle, seen, path);

    if (path.length === 0) return null;

    return path;
}

// console.log(dfs(graph, 'A', 'E')); // ['A','B','C','D','E']

module.exports = { dfs };
