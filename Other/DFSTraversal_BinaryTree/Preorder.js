const traverse = (current, path) => {
    if (!current) {
        return path;
    }

    path.push(current.value);
    traverse(current.left, path);
    traverse(current.right, path);

    return path;
};

const DFSPreorder = (tree) => {
    return traverse(tree, []);
};

module.exports = { DFSPreorder };
