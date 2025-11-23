// Subarray Prefix Sum Problems

// Maximum Sum Circular Subarray
const maxSubarraySumCircular = (nums) => {
  const kadane = (arr) => {
    let maxSum = arr[0], currentSum = arr[0];
    for (let i = 1; i < arr.length; i++) {
      currentSum = Math.max(arr[i], currentSum + arr[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
  };
  
  const kadaneMin = (arr) => {
    let minSum = arr[0], currentSum = arr[0];
    for (let i = 1; i < arr.length; i++) {
      currentSum = Math.min(arr[i], currentSum + arr[i]);
      minSum = Math.min(minSum, currentSum);
    }
    return minSum;
  };
  
  const maxKadane = kadane(nums);
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  const minKadane = kadaneMin(nums);
  
  // If all elements are negative
  if (totalSum === minKadane) return maxKadane;
  
  return Math.max(maxKadane, totalSum - minKadane);
};

// Subarray Sums Divisible by K
const subarraysDivByK = (nums, k) => {
  const remainderCount = new Map([[0, 1]]);
  let prefixSum = 0, count = 0;
  
  for (const num of nums) {
    prefixSum += num;
    let remainder = prefixSum % k;
    
    // Handle negative remainders
    if (remainder < 0) remainder += k;
    
    count += remainderCount.get(remainder) || 0;
    remainderCount.set(remainder, (remainderCount.get(remainder) || 0) + 1);
  }
  
  return count;
};

// Continuous Subarray Sum
const checkSubarraySum = (nums, k) => {
  const remainderMap = new Map([[0, -1]]);
  let prefixSum = 0;
  
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const remainder = prefixSum % k;
    
    if (remainderMap.has(remainder)) {
      if (i - remainderMap.get(remainder) > 1) return true;
    } else {
      remainderMap.set(remainder, i);
    }
  }
  
  return false;
};

// Binary Subarrays With Sum
const numSubarraysWithSum = (nums, goal) => {
  const prefixSumCount = new Map([[0, 1]]);
  let prefixSum = 0, count = 0;
  
  for (const num of nums) {
    prefixSum += num;
    count += prefixSumCount.get(prefixSum - goal) || 0;
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }
  
  return count;
};

// Subarray Sum Equals K (with indices)
const subarrayIndices = (nums, k) => {
  const prefixSumMap = new Map([[0, [-1]]]);
  let prefixSum = 0;
  const result = [];
  
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    
    if (prefixSumMap.has(prefixSum - k)) {
      for (const startIdx of prefixSumMap.get(prefixSum - k)) {
        result.push([startIdx + 1, i]);
      }
    }
    
    if (!prefixSumMap.has(prefixSum)) {
      prefixSumMap.set(prefixSum, []);
    }
    prefixSumMap.get(prefixSum).push(i);
  }
  
  return result;
};

// Maximum Length of Repeated Subarray
const findLength = (nums1, nums2) => {
  const m = nums1.length, n = nums2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  let maxLen = 0;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        maxLen = Math.max(maxLen, dp[i][j]);
      }
    }
  }
  
  return maxLen;
};

// Longest Subarray with Sum K
const longestSubarraySum = (nums, k) => {
  const prefixSumMap = new Map([[0, -1]]);
  let prefixSum = 0, maxLen = 0;
  
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    
    if (prefixSumMap.has(prefixSum - k)) {
      maxLen = Math.max(maxLen, i - prefixSumMap.get(prefixSum - k));
    }
    
    if (!prefixSumMap.has(prefixSum)) {
      prefixSumMap.set(prefixSum, i);
    }
  }
  
  return maxLen;
};

// Count Number of Nice Subarrays
const numberOfSubarrays = (nums, k) => {
  // Convert to binary: odd = 1, even = 0
  const binary = nums.map(num => num % 2);
  return numSubarraysWithSum(binary, k);
};

// Shortest Subarray with Sum at Least K
const shortestSubarray = (nums, k) => {
  const n = nums.length;
  const prefixSum = new Array(n + 1).fill(0);
  
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + nums[i];
  }
  
  const deque = [];
  let minLen = Infinity;
  
  for (let i = 0; i <= n; i++) {
    while (deque.length && prefixSum[i] - prefixSum[deque[0]] >= k) {
      minLen = Math.min(minLen, i - deque.shift());
    }
    
    while (deque.length && prefixSum[i] <= prefixSum[deque[deque.length - 1]]) {
      deque.pop();
    }
    
    deque.push(i);
  }
  
  return minLen === Infinity ? -1 : minLen;
};

// Test Cases
console.log(maxSubarraySumCircular([1, -2, 3, -2])); // 3
console.log(maxSubarraySumCircular([5, -3, 5])); // 10
console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5)); // 7
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6)); // true
console.log(numSubarraysWithSum([1, 0, 1, 0, 1], 2)); // 4
console.log(subarrayIndices([1, 1, 1], 2)); // [[0, 1], [1, 2]]
console.log(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7])); // 3
console.log(longestSubarraySum([1, -1, 5, -2, 3], 3)); // 4
console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3)); // 2
console.log(shortestSubarray([1], 1)); // 1