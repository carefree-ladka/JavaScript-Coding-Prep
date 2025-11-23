// Ternary Search - Divide array into three parts
const ternarySearch = (arr, target, left = 0, right = arr.length - 1) => {
  if (left > right) return -1;
  
  const mid1 = left + Math.floor((right - left) / 3);
  const mid2 = right - Math.floor((right - left) / 3);
  
  if (arr[mid1] === target) return mid1;
  if (arr[mid2] === target) return mid2;
  
  if (target < arr[mid1]) {
    return ternarySearch(arr, target, left, mid1 - 1);
  } else if (target > arr[mid2]) {
    return ternarySearch(arr, target, mid2 + 1, right);
  } else {
    return ternarySearch(arr, target, mid1 + 1, mid2 - 1);
  }
};

// Ternary Search Iterative
const ternarySearchIterative = (arr, target) => {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    
    if (target < arr[mid1]) {
      right = mid1 - 1;
    } else if (target > arr[mid2]) {
      left = mid2 + 1;
    } else {
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }
  
  return -1;
};

// Test Cases
console.log(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 5)); // 4
console.log(ternarySearchIterative([1, 2, 3, 4, 5, 6, 7, 8, 9], 7)); // 6