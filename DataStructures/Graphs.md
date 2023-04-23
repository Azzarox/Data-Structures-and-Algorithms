# Graphs

Graphs can be directed and undirected.
Directed graphs have a direction from node to node (usually one way)
Undirected graphs have a two-way connection between nodes.

Directed:
A -> B; you can go from A to B , but not from B to A

Undirected:
A - B; you can go from A to B and B to A

Graphs can also be weighted. Weighted graph is the cost of the edge/connection.

## Representation of Graphs

Graphs can be represented in 3 ways (there are more but these are the most popular)

### Adjacency Matrix

Using a 2D array where the rows are the vertices and the columns are the edges.
The edges are represented with 0 for not connection and 1 for connection.

If we have cyclic graph with vertices A,B,C
```
  A B C
A 0 1 1
B 1 0 1
C 1 1 0
```

### Adjacency List

Using a hash map with the vertices as a key and a edges list as a value

```
{
    A: [B,C]
    B: [A,C]
    C: [A,B]
}
```

### Edges List
List of only the edges
```
[
    [A,B]
    [A,C]
    [B,C]
]
```

## Graph Traversals
In both traversals we need to keep track of visited nodes.

### BFS
BFS is a good choice when you want to find the shortest path between two vertices in an unweighted or weighted (non-negative) values.

### DFS
DFS is a good choice when you want to exhaustively explore all paths in a graph, or when you want to find a path that satisfies a certain condition (e.g., finding a path that visits all vertices). DFS is also useful in detecting cycles in a graph.

In general, BFS is better suited for finding the shortest path in unweighted graphs, while DFS is better suited for exhaustive pathfinding and cycle detection