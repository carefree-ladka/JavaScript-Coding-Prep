// Binary Search - Classic Pattern

const binarySearch = (nums, target) => {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    nums[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return -1;
};

// Test Cases
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // 4
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2)); // -1