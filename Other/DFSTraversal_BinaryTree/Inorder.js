const traverse = (current, path) => {
    if (!current) return path;

    traverse(current.left, path);
    path.push(current.value);
    traverse(current.right, path);

    return path;
};

const DFSInorder = (tree) => {
    return traverse(tree, []);
};

module.exports = {DFSInorder}
