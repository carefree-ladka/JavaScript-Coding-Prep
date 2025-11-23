// Sliding Window Maximum using Monotonic Deque
const maxSlidingWindow = (nums, k) => {
  const deque = []; // Store indices, monotonic decreasing
  const result = [];
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }
    
    // Remove smaller elements from back
    while (deque.length && nums[i] >= nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    
    deque.push(i);
    
    // Add to result when window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
};

// Sliding Window Minimum
const minSlidingWindow = (nums, k) => {
  const deque = []; // Monotonic increasing
  const result = [];
  
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }
    
    while (deque.length && nums[i] <= nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    
    deque.push(i);
    
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
};

// Constrained Subsequence Sum
const constrainedSubsetSum = (nums, k) => {
  const deque = []; // Monotonic decreasing for max
  const dp = [...nums];
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length && deque[0] < i - k) {
      deque.shift();
    }
    
    // Update dp[i] with maximum from valid range
    if (deque.length) {
      dp[i] = Math.max(dp[i], nums[i] + dp[deque[0]]);
    }
    
    // Maintain monotonic decreasing deque
    while (deque.length && dp[i] >= dp[deque[deque.length - 1]]) {
      deque.pop();
    }
    
    if (dp[i] > 0) deque.push(i);
  }
  
  return Math.max(...dp);
};

// Shortest Subarray with Sum at Least K
const shortestSubarray = (nums, k) => {
  const n = nums.length;
  const prefixSum = new Array(n + 1).fill(0);
  
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + nums[i];
  }
  
  const deque = []; // Monotonic increasing for prefix sums
  let minLen = Infinity;
  
  for (let i = 0; i <= n; i++) {
    // Check if current sum - deque front >= k
    while (deque.length && prefixSum[i] - prefixSum[deque[0]] >= k) {
      minLen = Math.min(minLen, i - deque.shift());
    }
    
    // Maintain monotonic increasing deque
    while (deque.length && prefixSum[i] <= prefixSum[deque[deque.length - 1]]) {
      deque.pop();
    }
    
    deque.push(i);
  }
  
  return minLen === Infinity ? -1 : minLen;
};

// Test Cases
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]
console.log(minSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [-1,-3,-3,-3,3,3]
console.log(constrainedSubsetSum([10,2,-10,5,20], 2)); // 37
console.log(shortestSubarray([1], 1)); // 1