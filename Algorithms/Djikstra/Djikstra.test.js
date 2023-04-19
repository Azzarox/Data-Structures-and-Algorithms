const { expect } = require('chai');
const { describe } = require('mocha');
const { dijkstra } = require('./Djikstra');

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

describe('Testing Dijkstra Shortest Path', () => {
    let source;
    let sink;

    it('Should return the correct path from 0 to 6', () => {
        source = 0;
        sink = 6;
        expect(dijkstra(graph, source, sink)).to.deep.equal([0, 1, 4, 5, 6]);
    });

    it('Should return null if the sink is bigger than graph.length', () => {
        source = 0;
        sink = 7;

        expect(dijkstra(graph, source, sink)).to.be.null;
    });

    it('Should return empty array if there is no path', () => {
        graph.push([]);
        // It changes the graph, so if there are more tests below this, it will have [] as last element.

        source = 0;
        sink = 7;

        expect(dijkstra(graph, source, sink)).to.deep.equal([]);
    });
});
