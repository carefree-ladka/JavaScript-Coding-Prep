// Find Minimum in Rotated Sorted Array II (with duplicates)
const findMin = (nums) => {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      right--;
    }
  }
  return nums[left];
};

// Test Cases
console.log(findMin([1,3,5])); // 1
console.log(findMin([2,2,2,0,1])); // 0