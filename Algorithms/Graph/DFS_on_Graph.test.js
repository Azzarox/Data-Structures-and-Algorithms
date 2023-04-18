const { expect } = require('chai');
const { describe } = require('mocha');
const { dfs } = require('./DFS_AdjList');
const { dfs: dfsMatrix } = require('./DFS_AdjMatrix');

describe('Testing Breadth First Search on Graph', () => {
    let visitedOrder;
    // NOTE: Hijacking the console.log
    // This means that we set console.log to equal another function which pushes to an array
    // Which is good for testing the function (since it doesn't have return value);

    
    beforeEach(() => {
        console.log = (value) => visitedOrder.push(value);
        visitedOrder = [];
    });

    describe('DFS on Adjacency List', () => {
        describe('Testing when represented as hash map', () => {
            it('should return expected order for simple graph', () => {
                const graph = {
                    A: ['B', 'C'],
                    B: ['A', 'D', 'E'],
                    C: ['A', 'F'],
                    D: ['B'],
                    E: ['B', 'F'],
                    F: ['C', 'E'],
                };

                const start = 'A';

                dfs(graph, start);

                expect(visitedOrder).to.deep.equal([
                    'A',
                    'B',
                    'D',
                    'E',
                    'F',
                    'C',
                ]);
            });

            it('should handle disconnected graph', () => {
                const graph = {
                    A: ['B', 'C'],
                    B: ['A', 'D'],
                    C: ['A'],
                    D: ['B'],
                    E: [],
                };
                const start = 'A';

                dfs(graph, start);

                expect(visitedOrder).to.deep.equal(['A', 'B', 'D', 'C']);
            });

            it('should handle graphs with loops', () => {
                const graph = {
                    A: ['B', 'C'],
                    B: ['A', 'D', 'E'],
                    C: ['A', 'F'],
                    D: ['B'],
                    E: ['B', 'F'],
                    F: ['C', 'E'],
                };
                graph.E.push('E'); // create loop
                const start = 'A';

                dfs(graph, start);

                expect(visitedOrder).to.deep.equal([
                    'A',
                    'B',
                    'D',
                    'E',
                    'F',
                    'C',
                ]);
            });
        });

        describe('Testing when represented as 2D array', () => {
            it('should return expected order for simple graph', function () {
                const graph = [[1, 2], [0, 2, 3], [0, 1], [1]];
                const start = 0;

                dfs(graph, start);

                expect(visitedOrder).to.deep.equal([0, 1, 2, 3]);
            });

            it('should handle disconnected graph', function () {
                const graph = [[1, 2], [0, 2], [0, 1], [4], [], [6], [5]];
                const start = 0;

                dfs(graph, start);

                expect(visitedOrder).to.deep.equal([0, 1, 2]);
            });

            it('should handle graph with loops', function () {
                const graph = [[1, 2], [0, 2, 3], [0, 1], [1], [4], [6], [5]];
                graph[0].push(0); // create loop
                graph[1].push(1); // create loop
                const start = 0;

                dfs(graph, start);

                expect(visitedOrder).to.deep.equal([0, 1, 2, 3]);
            });
        });
    });

    describe('DFS on Adjacency Matrix', () => {
        it('should return expected order for simple graph', () => {
            const vertices = ['a', 'b', 'c', 'd', 'e', 'f'];
            const adjMatrix = [
                [0, 1, 1, 0, 0, 0],
                [1, 0, 0, 1, 1, 0],
                [1, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1],
                [0, 0, 1, 0, 1, 0],
            ];

            const start = 0;

            dfsMatrix(vertices, adjMatrix, start);

            expect(visitedOrder).to.deep.equal(['a', 'b', 'd', 'e', 'f', 'c']);
        });

        it('should handle disconnected graph', function () {
            const vertices = ['a', 'b', 'c', 'd', 'e', 'f'];
            const matrix = [
                [0, 1, 0, 1, 0, 0],
                [1, 0, 1, 0, 0, 0],
                [0, 1, 0, 1, 1, 0],
                [1, 0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 1],
                [0, 0, 0, 0, 1, 0],
            ];
            const start = 0;

            dfsMatrix(vertices, matrix, start);

            expect(visitedOrder).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f']);
        });

        it('should handle graph with loops', function () {
            const vertices = ['a', 'b', 'c', 'd', 'e', 'f'];
            const matrix = [
                [1, 1, 0, 1, 0, 0],
                [1, 1, 1, 0, 0, 0],
                [0, 1, 1, 1, 1, 0],
                [1, 0, 1, 1, 0, 0],
                [0, 0, 1, 0, 1, 1],
                [0, 0, 0, 0, 1, 1],
            ];
            const start = 0;

            dfsMatrix(vertices, matrix, start);

            expect(visitedOrder).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f']);
        });
    });
});
