function merge(firstHalf, secondHalf) {
   const result = [];
   while (firstHalf.length && secondHalf.length) {
     if (firstHalf[0] < secondHalf[0]) {
       result.push(firstHalf.shift());
     } else {
       result.push(secondHalf.shift());
     }
   }
   return [...result, ...firstHalf, ...secondHalf];
 }
 
 function mergeSort(array) {
   if (array.length <= 1) {
     return array;
   }
   const half = Math.floor(array.length / 2);
   const firstHalf = array.slice(0, half);
   const secondHalf = array.slice(half);
   return merge(mergeSort(firstHalf), mergeSort(secondHalf));
 }


// -----------------------------------------------------------
// MergeSort: RECURSION
// Old solution: pointerLeft at left 1st element array& pointerRight at right array
// compare to see which smallest element put in array with the two pointers
// Once we find all the order to one array, pop out of while loop
// Now we just take all the elements on the remaining array and put in output array

function merge1(leftArray, rightArray) {
	let leftLength = leftArray.length;
	let rightLength = rightArray.length;
	let leftP = 0;
	let rightP = 0;
	let output = [];

	while (leftP < leftLength && rightP < rightLength) {
		if (leftArray[leftP] < rightArray[rightP]) {
			output.push(leftArray[leftP]);
			leftP += 1;
		} else {
			output.push(rightArray[rightP]);
			rightP += 1;
		}
	}
	for (; leftP < leftLength; leftP++) {
		output.push(leftArray[leftP]);
	}
	for (; rightP < rightLength; rightP++) {
		output.push(rightArray[rightP]);
	}
	return output;
}

function mergeSort1(nums) {
	if (nums.length <= 1) {
		return nums;
	}

	let middle = Math.floor(nums.length / 2);
	let left = mergeSort(nums.slice(0, middle));
	let right = mergeSort(nums.slice(middle, nums.length));
	return merge(left, right);
}

let sorted1 = mergeSort1([1, 3, 5, 2, 0, 4]);
console.log(sorted1);

//---------------------------------------
// Cleaner Solution 

function merge(leftArray, rightArray) {
   let output = []

	while (leftArray.length > 0 && rightArray.length > 0) {
		if (leftArray[0] < rightArray[0]) {
			output.push(leftArray.shift())
		} else {
			output.push(rightArray.shift())
		}
	}
   return output.concat(leftArray, rightArray);
}

function mergeSort(nums) {
   if(nums.length <= 1) {
      return nums
   }

   let middle = Math.floor(nums.length / 2);
   let left = mergeSort(nums.slice(0, middle));
   let right = mergeSort(nums.slice(middle, nums.length));
   return merge(left, right);
	
}

let sorted = mergeSort([1,3,5,2,0,4])
console.log(sorted)