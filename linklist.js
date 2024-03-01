function createNode(value) {
	return { 
      value, 
      next: null 
   };
}

function linkedList() {
	let list = {};

	const append = (node) => {
		// If list contains no head, we add node directly to head
		if (!list.head) {
			list.head = node;
		} else {
			let currNode = list.head;
			while (currNode.next != null) {
				currNode = currNode.next;
			}
			currNode.next = node;
		}
	};

	const prepend = (node) => {
		// If list contains no head, we add node directly to head
		node.next = list.head;
		list.head = node;
	};

	const size = () => {
		let listSize = 0;
		let currNode = list.head;
		while (currNode != null) {
			listSize++;
			currNode = currNode.next;
		}
		return listSize;
	};

	const head = () => list.head.value;
	const tail = () => {
		let currNode = list.head;
		while (currNode.next != null) {
			currNode = currNode.next;
		}
		return currNode.value;
	};

	const atIndex = (index) => {
		let currNode = list.head;
		currIndex = 0;
		while (currIndex !== index && currNode != null) {
			currNode = currNode.next;
			currIndex++;
		}
		return currNode.value;
	};

	const pop = () => {
		let currNode = list.head;
		// Assuming list has at least two nodes
		if (list.head && list.head.next.next) {
			// Traverse the list until the second-to-last node
			while (currNode.next.next) {
				currNode = currNode.next;
			}
			currNode.next = null;
		}
	};

	const contains = (value) => {
		let currNode = list.head;
		while (currNode) {
			if (currNode.value == value) {
				return true;
			}
			currNode = currNode.next;
		}
		return false;
	};

	const find = (value) => {
		let currNode = list.head;
		let index = 0;
		while (currNode) {
			if (currNode.value == value) {
				return index;
			}
			index++;
			currNode = currNode.next;
		}
		return null;
	};

	const toString = () => {
		let currNode = list.head;
		let string = "";
		while (currNode) {
			string += `( ${currNode.value} ) -> `;
			currNode = currNode.next;
		}
		// We reached the tail node pointing to null
		string += "null";
		return string;
	};

	const insertAt = (value, index) => {
		const node = createNode(value);
		let currNode = list.head;
		let currIndex = 0;

      if(list.head && currNode.next == null) {
         node.next = currNode;
         list.head = node;
      }
      // check the index one step ahead
		while (index !== currIndex+1) {
			currNode = currNode.next;
			currIndex++;
		}
		node.next = currNode.next;
		currNode.next = node;
	};

	const removeAt = (index) => {
		let currNode = list.head;
		let currIndex = 0;
		while (index !== currIndex + 1) {
			currNode = currNode.next;
			currIndex++;
		}
		currNode.next = currNode.next.next;
	};

	return { append, prepend, size, head, tail, atIndex, pop, contains, find, toString, insertAt, removeAt };
}


// --- Running functionality ---
//APPENDING
const list = linkedList();
const node1 = createNode(1);
const node3 = createNode(3);
const node5 = createNode(5);
const node7 = createNode(7);
const node9 = createNode(9);
list.append(node1);
list.append(node3);
list.append(node5);
list.append(node7);
list.append(node9);
console.log(list.toString());
// PREPEND
const node2 = createNode(2);
list.prepend(node2);
console.log(list.toString());
// SIZE
console.log(list.size());
// HEAD
console.log(`HEAD: ${list.head()}`);
// TAIL
console.log(`TAIL: ${list.tail()}`);
// at(index)
console.log(`AT INDEX ${3}:  ${list.atIndex(3)}`);
// POP
list.pop();
console.log(list.toString());
//contains(value)
console.log(list.contains(5));
console.log(list.contains(10));
// find(value)
console.log(list.find(5));
console.log(list.find(10));
// insertAt(value, index)
list.insertAt(40, 3);
console.log(list.toString());
// removeAt(index)
list.removeAt(3);
console.log(list.toString());