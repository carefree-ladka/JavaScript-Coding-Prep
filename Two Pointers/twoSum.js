// Two Sum - Two Pointers Pattern
// Given sorted array, find two numbers that add up to target

const twoSum = (nums, target) => {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    sum < target ? left++ : right--;
  }
  return [-1, -1];
};

// Test Cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([2, 3, 4], 6)); // [0, 2]