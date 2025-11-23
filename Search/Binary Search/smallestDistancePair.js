// Find K-th Smallest Pair Distance
const smallestDistancePair = (nums, k) => {
  nums.sort((a, b) => a - b);
  let left = 0, right = nums[nums.length - 1] - nums[0];
  
  const countPairs = (maxDist) => {
    let count = 0, j = 0;
    for (let i = 0; i < nums.length; i++) {
      while (j < nums.length && nums[j] - nums[i] <= maxDist) j++;
      count += j - i - 1;
    }
    return count;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    countPairs(mid) >= k ? right = mid : left = mid + 1;
  }
  return left;
};

// Test Cases
console.log(smallestDistancePair([1,3,1], 1)); // 0
console.log(smallestDistancePair([1,1,1], 2)); // 0