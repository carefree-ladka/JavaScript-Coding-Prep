// Exponential Search - Find range then binary search
const exponentialSearch = (arr, target) => {
  const n = arr.length;
  if (arr[0] === target) return 0;
  
  // Find range for binary search
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2;
  }
  
  // Binary search in found range
  return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, n - 1));
};

const binarySearch = (arr, target, left, right) => {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return -1;
};

// Exponential Search for Unbounded Array
const exponentialSearchUnbounded = (arr, target) => {
  let bound = 1;
  
  // Find upper bound
  while (arr[bound] < target) {
    bound *= 2;
  }
  
  // Binary search in range [bound/2, bound]
  return binarySearch(arr, target, Math.floor(bound / 2), bound);
};

// Test Cases
console.log(exponentialSearch([2, 3, 4, 10, 40], 10)); // 3
console.log(exponentialSearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)); // 6