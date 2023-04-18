const { expect } = require('chai');
const { describe } = require('mocha');
const { bfs } = require('./BFS_Path');
const { dfs } = require('./DFS_Path');
const { graph } = require('./graph');

// Testing BFS and DFS with Path Tracked on an Adjacency List
// Where it is object with vertices as key and list of {to:, weight:,} for values

describe('Testing Graph as Object', () => {
    describe('Testing DFS with Path', () => {
        it('should return the correct path from vertex A to vertex E', () => {
            expect(dfs(graph, 'A', 'E')).to.deep.equal([
                'A',
                'B',
                'C',
                'D',
                'E',
            ]);
        });

        it('should return the correct path from vertex B to vertex D', () => {
            expect(dfs(graph, 'B', 'D')).to.deep.equal(['B', 'A', 'C', 'D']);
        });
    });

    describe('Testing BFS with Path', () => {
        it('should return the correct path from vertex A to vertex E', () => {
            expect(bfs(graph, 'A', 'E')).to.deep.equal(['A', 'C', 'E']);
        });

        it('should return the correct path from vertex B to vertex D', () => {
            expect(bfs(graph, 'B', 'D')).to.deep.equal(['B', 'D']);
        });
    });
});
