function fib(n) {
	if (n <= 1) {
		return n;
	}
	return fib(n - 1) + fib(n - 2);
}

// -------------------------------------------
// ITERATIVE APPROACH
function fibs(nth) {
	let array = [0, 1];
	for (let i = 2; i < nth; i++) {
		array.push(array[i - 1] + array[i - 2]);
	}
	return array;
}
// let eighthFib = fibs(8);
// console.log(eighthFib);

// -------------------------------------------
// RECURSIVE APPROACH
function fibsRecursion(nth) {
	if (nth <= 1) {
		return [0];
	} else if (nth === 2) {
		return [0, 1];
	}
	let array = fibsRecursion(nth - 1);
	array.push(array[array.length - 1] + array[array.length - 2]);
	return array;
}
// const eighthFib = fibsRecursion(8);
// console.log(eighthFib); // Output: [0, 1, 1, 2, 3, 5, 8, 13]
