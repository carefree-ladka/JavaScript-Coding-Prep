// Array Recursion Problems

// Sum of Array
const arraySum = (arr, index = 0) => {
  if (index >= arr.length) return 0;
  return arr[index] + arraySum(arr, index + 1);
};

// Find Maximum in Array
const findMax = (arr, index = 0) => {
  if (index === arr.length - 1) return arr[index];
  return Math.max(arr[index], findMax(arr, index + 1));
};

// Linear Search
const linearSearch = (arr, target, index = 0) => {
  if (index >= arr.length) return -1;
  if (arr[index] === target) return index;
  return linearSearch(arr, target, index + 1);
};

// Check if Array is Sorted
const isSorted = (arr, index = 0) => {
  if (index >= arr.length - 1) return true;
  if (arr[index] > arr[index + 1]) return false;
  return isSorted(arr, index + 1);
};

// Reverse Array
const reverseArray = (arr, start = 0, end = arr.length - 1) => {
  if (start >= end) return arr;
  [arr[start], arr[end]] = [arr[end], arr[start]];
  return reverseArray(arr, start + 1, end - 1);
};

// Remove Duplicates from Sorted Array
const removeDuplicates = (arr, index = 0, result = []) => {
  if (index >= arr.length) return result;
  
  if (result.length === 0 || arr[index] !== result[result.length - 1]) {
    result.push(arr[index]);
  }
  
  return removeDuplicates(arr, index + 1, result);
};

// Merge Two Sorted Arrays
const mergeSorted = (arr1, arr2, i = 0, j = 0, result = []) => {
  if (i >= arr1.length && j >= arr2.length) return result;
  
  if (i >= arr1.length) {
    result.push(arr2[j]);
    return mergeSorted(arr1, arr2, i, j + 1, result);
  }
  
  if (j >= arr2.length) {
    result.push(arr1[i]);
    return mergeSorted(arr1, arr2, i + 1, j, result);
  }
  
  if (arr1[i] <= arr2[j]) {
    result.push(arr1[i]);
    return mergeSorted(arr1, arr2, i + 1, j, result);
  } else {
    result.push(arr2[j]);
    return mergeSorted(arr1, arr2, i, j + 1, result);
  }
};

// Quick Sort
const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
};

// Merge Sort
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
};

const merge = (left, right) => {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
};

// Find All Indices of Target
const findAllIndices = (arr, target, index = 0, result = []) => {
  if (index >= arr.length) return result;
  
  if (arr[index] === target) {
    result.push(index);
  }
  
  return findAllIndices(arr, target, index + 1, result);
};

// Test Cases
console.log(arraySum([1, 2, 3, 4, 5])); // 15
console.log(findMax([3, 1, 4, 1, 5, 9])); // 9
console.log(linearSearch([1, 3, 5, 7, 9], 5)); // 2
console.log(isSorted([1, 2, 3, 4, 5])); // true
console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
console.log(removeDuplicates([1, 1, 2, 2, 3, 3])); // [1, 2, 3]
console.log(mergeSorted([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
console.log(quickSort([3, 1, 4, 1, 5, 9, 2, 6])); // [1, 1, 2, 3, 4, 5, 6, 9]
console.log(mergeSort([3, 1, 4, 1, 5, 9, 2, 6])); // [1, 1, 2, 3, 4, 5, 6, 9]
console.log(findAllIndices([1, 2, 1, 3, 1], 1)); // [0, 2, 4]