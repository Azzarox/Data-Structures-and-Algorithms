function hasUnvisited(seen, distances) {
    return seen.some((isVisited, i) => !isVisited && distances[i] < Infinity);
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

function dijkstra(graph, source, sink) {
    if (sink >= graph.length) return null;

    const prev = new Array(graph.length).fill(-1);
    const seen = new Array(graph.length).fill(false);
    const distances = new Array(graph.length).fill(Infinity);

    distances[source] = 0;

    while (hasUnvisited(seen, distances)) {
        const curr = getLowestUnvisited(seen, distances);
        seen[curr] = true;

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (seen[edge.to]) continue;

            const dist = distances[curr] + edge.weight;
            if (dist < distances[edge.to]) {
                distances[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    let curr = sink;
    const path = [];

    if (prev[curr] === -1) {
        return [];
    }
    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }

    return [source].concat(path.reverse());
}

module.exports = { dijkstra };
