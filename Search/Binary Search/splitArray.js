// Split Array Largest Sum
const splitArray = (nums, k) => {
  let left = Math.max(...nums),
    right = nums.reduce((a, b) => a + b);

  const canSplit = (maxSum) => {
    let subarrays = 1,
      currentSum = 0;

    for (const num of nums) {
      if (currentSum + num > maxSum) {
        subarrays++;
        currentSum = num;
      } else {
        currentSum += num;
      }
    }
    return subarrays <= k;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    canSplit(mid) ? (right = mid) : (left = mid + 1);
  }
  return left;
};

// Test Cases
console.log(splitArray([7, 2, 5, 10, 8], 2)); // 18
console.log(splitArray([1, 2, 3, 4, 5], 2)); // 9
