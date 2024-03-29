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

	let root = buildTree(array);

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

   function calculateHeight(node) {
      // Base case: If the node is null, return -1 to represent that the node doesn't exist
      if (node === null) {
          return -1;
      }

      // Recursive calls to find the height of the left and right subtrees
      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);

      // Return the maximum height among left and right subtrees, plus 1 (to account for the current node)
      return Math.max(leftHeight, rightHeight) + 1;
  }

  // Calculates the height of the tree
	function height(node, root) {
		// Traverse to find node position
		while (node !== root.value) {
			if (node > root.value) {
				root = root.right;
			} else {
				root = root.left;
			}
		}

    // Call the helper function to calculate the height from the found node
    const nodeHeight = calculateHeight(root);
    return nodeHeight;
	}

   function depth(node, root) {
      let depth = 0;
      // Traverse to find node position, calculate depth along the way
		while (node !== root.value) {
			if (node > root.value) {
				root = root.right;
			} else {
				root = root.left;
			}
         depth ++;
		}
      return depth;
   }

   // A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
   function isBalanced(root) {
      // Recursive calls to find the height of the left and right subtrees
      const leftHeight = calculateHeight(root.left);
      const rightHeight = calculateHeight(root.right);

      const diff = Math.abs(leftHeight - rightHeight);
      return diff < 2 ? 'balanced' : 'unbalanced'
   }

   function rebalance(root) {
      // Gather all values into an array using in-order traversal
      const values = inOrder(root);

      // Build a new balanced tree from the array
      root = buildTree(values);
      console.log(root)
      return root;
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
		height,
      depth,
      isBalanced,
      rebalance,
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
// console.log("inOrder");
// console.log(tree.inOrder(tree.root));
// console.log("preOrder");
// console.log(tree.preOrder(tree.root));
// console.log("postOrder");
// console.log(tree.postOrder(tree.root));

console.log("HEIGHT");
console.log(tree.height(6345, tree.root));

console.log("DEPTH");
console.log(tree.depth(6345, tree.root));

console.log("Tree Balance Check");
console.log(tree.isBalanced(tree.root));

console.log("Rebalance tree");
console.log(tree.isBalanced(tree.root));

// -----

let tree2 = Tree([1]);
prettyPrint(tree2.root); // visualize the binary search tree

console.log("INSERT (unbalancing the tree)");
tree2.insert(2, tree2.root);
tree2.insert(3, tree2.root);
tree2.insert(4, tree2.root);
tree2.insert(5, tree2.root);
prettyPrint(tree2.root);

console.log("Rebalance tree");
let newTree = tree2.rebalance(tree2.root);
prettyPrint(newTree);
