// Linear Search - Sequential search through array
const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
};

// Linear Search All Occurrences
const linearSearchAll = (arr, target) => {
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) indices.push(i);
  }
  return indices;
};

// Test Cases
console.log(linearSearch([2, 3, 4, 10, 40], 10)); // 3
console.log(linearSearch([2, 3, 4, 10, 40], 5)); // -1
console.log(linearSearchAll([1, 2, 3, 2, 4, 2], 2)); // [1, 3, 5]