// Find Peak Element
const findPeakElement = (nums) => {
  let left = 0, right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    nums[mid] < nums[mid + 1] ? left = mid + 1 : right = mid;
  }
  return left;
};

// Test Cases
console.log(findPeakElement([1,2,3,1])); // 2
console.log(findPeakElement([1,2,1,3,5,6,4])); // 1 or 5