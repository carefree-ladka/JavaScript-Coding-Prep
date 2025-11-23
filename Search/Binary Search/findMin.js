// Find Minimum in Rotated Sorted Array
const findMin = (nums) => {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    nums[mid] > nums[right] ? left = mid + 1 : right = mid;
  }
  return nums[left];
};

// Test Cases
console.log(findMin([3,4,5,1,2])); // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0
console.log(findMin([11,13,15,17])); // 11