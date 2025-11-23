// Basic Prefix Sum Problems

// Range Sum Query - Immutable
class NumArray {
  constructor(nums) {
    this.prefixSum = [0];
    for (let i = 0; i < nums.length; i++) {
      this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
    }
  }
  
  sumRange(left, right) {
    return this.prefixSum[right + 1] - this.prefixSum[left];
  }
}

// Subarray Sum Equals K
const subarraySum = (nums, k) => {
  const prefixSumCount = new Map([[0, 1]]);
  let prefixSum = 0, count = 0;
  
  for (const num of nums) {
    prefixSum += num;
    count += prefixSumCount.get(prefixSum - k) || 0;
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }
  
  return count;
};

// Maximum Subarray (Kadane's Algorithm)
const maxSubArray = (nums) => {
  let maxSum = nums[0], currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
};

// Minimum Size Subarray Sum
const minSubArrayLen = (target, nums) => {
  let left = 0, sum = 0, minLen = Infinity;
  
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left++];
    }
  }
  
  return minLen === Infinity ? 0 : minLen;
};

// Find Pivot Index
const pivotIndex = (nums) => {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  let leftSum = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (leftSum === totalSum - leftSum - nums[i]) {
      return i;
    }
    leftSum += nums[i];
  }
  
  return -1;
};

// Product of Array Except Self
const productExceptSelf = (nums) => {
  const result = new Array(nums.length);
  
  // Left products
  result[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  
  // Right products
  let rightProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }
  
  return result;
};

// Running Sum of 1d Array
const runningSum = (nums) => {
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }
  return nums;
};

// Range Sum Query 2D - Immutable
class NumMatrix {
  constructor(matrix) {
    const m = matrix.length, n = matrix[0].length;
    this.prefixSum = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.prefixSum[i][j] = matrix[i - 1][j - 1] + 
                               this.prefixSum[i - 1][j] + 
                               this.prefixSum[i][j - 1] - 
                               this.prefixSum[i - 1][j - 1];
      }
    }
  }
  
  sumRegion(row1, col1, row2, col2) {
    return this.prefixSum[row2 + 1][col2 + 1] - 
           this.prefixSum[row1][col2 + 1] - 
           this.prefixSum[row2 + 1][col1] + 
           this.prefixSum[row1][col1];
  }
}

// Contiguous Array (0s and 1s equal count)
const findMaxLength = (nums) => {
  const map = new Map([[0, -1]]);
  let maxLen = 0, count = 0;
  
  for (let i = 0; i < nums.length; i++) {
    count += nums[i] === 1 ? 1 : -1;
    
    if (map.has(count)) {
      maxLen = Math.max(maxLen, i - map.get(count));
    } else {
      map.set(count, i);
    }
  }
  
  return maxLen;
};

// Test Cases
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // 1
console.log(numArray.sumRange(2, 5)); // -1

console.log(subarraySum([1, 1, 1], 2)); // 2
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2
console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // 3
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log(runningSum([1, 2, 3, 4])); // [1, 3, 6, 10]

const numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
console.log(numMatrix.sumRegion(2, 1, 4, 3)); // 8

console.log(findMaxLength([0, 1])); // 2