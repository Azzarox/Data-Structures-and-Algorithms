const bfsTraverse = (tree) => {
    const root = tree.root;

    const queue = [root];
    const result = [];

    while (queue.length) {
        const current = queue.shift();
        if (!current) {
            continue;
        }

        result.push(current.value);

        queue.push(current.left);
        queue.push(current.right);
    }

    return result.join(' ');
};

module.exports = { bfsTraverse };