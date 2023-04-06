const { tree } = require("../../utils/tree");

const traverse = (current, path) => {
    if (!current) {
        return path;
    }

    traverse(current.left, path);
    traverse(current.right, path);
    path.push(current.value);

    return path;
};

const DFSPostorder = (tree) => {
    return traverse(tree, []);
};


console.log(DFSPostorder(tree))