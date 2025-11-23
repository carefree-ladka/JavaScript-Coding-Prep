// Contains Duplicate II
const containsNearbyDuplicate = (nums, k) => {
  const map = {};
  
  for (let i = 0; i < nums.length; i++) {
    if (map.hasOwnProperty(nums[i]) && i - map[nums[i]] <= k) {
      return true;
    }
    map[nums[i]] = i;
  }
  return false;
};

// Test Cases
console.log(containsNearbyDuplicate([1,2,3,1], 3)); // true
console.log(containsNearbyDuplicate([1,0,1,1], 1)); // true