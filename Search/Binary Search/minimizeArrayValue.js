// Minimize Maximum of Array
const minimizeArrayValue = (nums) => {
  let left = 0, right = Math.max(...nums);
  
  const canAchieve = (maxVal) => {
    let excess = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
      excess += nums[i] - maxVal;
      if (excess > 0 && i === 0) return false;
      if (excess < 0) excess = 0;
    }
    return true;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    canAchieve(mid) ? right = mid : left = mid + 1;
  }
  return left;
};

// Test Cases
console.log(minimizeArrayValue([3,7,1,6])); // 5
console.log(minimizeArrayValue([10,1])); // 10