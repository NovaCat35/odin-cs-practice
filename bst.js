function Node(value) {
	return {
		value,
		left: null,
		right: null,
	};
}

function Tree(array) {
	// Sort the array to maintain the BST property
	array.sort((a, b) => a - b);
	const root = buildTree(array);
	prettyPrint(root); // visualize the binary search tree
	return root;
}

function buildTree(array) {
	if (!array || array.length === 0) {
		return null;
	}

	const middle = Math.floor(array.length / 2);

	const root = Node(array[middle]);
	root.left = buildTree(array.slice(0, middle));
	root.right = buildTree(array.slice(middle + 1));

	return root;
}

// visualize the binary search tree (CODE COPIED FROM ODIN)
const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
