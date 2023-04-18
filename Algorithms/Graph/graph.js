const graph = {
    A: [
        { to: 'B', weight: 3 },
        { to: 'C', weight: 2 },
    ],
    B: [
        { to: 'A', weight: 3 },
        { to: 'C', weight: 1 },
        { to: 'D', weight: 5 },
    ],
    C: [
        { to: 'A', weight: 2 },
        { to: 'B', weight: 1 },
        { to: 'D', weight: 4 },
        { to: 'E', weight: 6 },
    ],
    D: [
        { to: 'B', weight: 5 },
        { to: 'C', weight: 4 },
        { to: 'E', weight: 7 },
    ],
    E: [
        { to: 'C', weight: 6 },
        { to: 'D', weight: 7 },
    ],
};

module.exports = { graph };
