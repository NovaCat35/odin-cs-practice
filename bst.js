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

	function insert(value, root) {
		// Always insert value as a leaf node
		if (root === null) {
			return Node(value);
		} else {
			if (value === root.value) {
				return root;
			} else if (value > root.value) {
				root.right = insert(value, root.right);
			} else {
				root.left = insert(value, root.left);
			}
			return root;
		}
	}

	function deleteItem(value, root) {
		// Base case
		if (root === null) {
			return root;
		}

		// Traverse tree until value found
		if (value < root.value) {
			root.left = deleteItem(value, root.left);
			return root;
		} else if (value > root.value) {
			root.right = deleteItem(value, root.right);
			return root;
		}

		// VALUE FOUND!
		// If node has only one child or no child
		if (root.left === null) {
			return root.right; // return the child's right so new parent can point to it
		} else if (root.right === null) {
			return root.left; // return child's left so new parent can point to it
		}

		// VALUE FOUND!
		// If node has two children, find the successor (next smallest value)
		let successor = root.right;
		while (successor.left !== null) {
			successor = successor.left;
		}

		// Copy the successor's value to this node
		root.value = successor.value;

		// Delete the successor node
		root.right = deleteItem(successor.value, root.right);

		return root;
	}

	function find(value, root) {
		if (root === null || root.value === value) {
			return root;
		}

		if (root.value < value) {
			return find(value, root.right);
		} else {
			return find(value, root.left);
		}
	}

	function levelOrder(root, result = [], queue = []) {
		if (root === null) {
			return [];
		}

		result.push(root.value);

		// Traverse to left and right children -> add to queue
		if (root.left !== null) queue.push(root.left);
		if (root.right !== null) queue.push(root.right);

		while (queue.length) {
			const level = queue[0];
			queue.shift();
			levelOrder(level, result, queue);
		}
		return result;
	}

	function inOrder(root, result = []) {
		if (root === null) {
			return;
		}

		// Traverse left subtree
		inOrder(root.left, result);
		// Visit root
		result.push(root.value);
		// Traverse right subtree
		inOrder(root.right, result);

		return result;
	}

	function preOrder(root, result = []) {
		if (root === null) {
			return;
		}

		result.push(root.value);
		preOrder(root.left, result);
		preOrder(root.right, result);

		return result;
	}

	function postOrder(root, result = []) {
		if (root === null) {
			return;
		}

		postOrder(root.left, result);
		postOrder(root.right, result);
		result.push(root.value);

		return result;
	}

	return {
		root,
		insert,
		deleteItem,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
	};
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

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root); // visualize the binary search tree

// console.log("INSERT");
// tree.insert(5, tree.root);
// prettyPrint(tree.root);

// console.log("DELETE");
// tree.deleteItem(5, tree.root);
// prettyPrint(tree.root);

// tree.deleteItem(67, tree.root);
// prettyPrint(tree.root);

// console.log("FIND");
// const foundNode = tree.find(4, tree.root);
// console.log(foundNode);

// console.log("levelOrder");
// console.log(tree.levelOrder(tree.root));
console.log("inOrder");
console.log(tree.inOrder(tree.root));
console.log("preOrder");
console.log(tree.preOrder(tree.root));
console.log("postOrder");
console.log(tree.postOrder(tree.root));
