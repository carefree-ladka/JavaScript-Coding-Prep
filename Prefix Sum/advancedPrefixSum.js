// Advanced Prefix Sum Problems

// Maximum Points You Can Obtain from Cards
const maxScore = (cardPoints, k) => {
  const n = cardPoints.length;
  let totalSum = 0;
  
  // Calculate total sum
  for (const point of cardPoints) {
    totalSum += point;
  }
  
  if (k >= n) return totalSum;
  
  // Find minimum sum of subarray of length (n - k)
  let windowSum = 0;
  for (let i = 0; i < n - k; i++) {
    windowSum += cardPoints[i];
  }
  
  let minSum = windowSum;
  
  for (let i = n - k; i < n; i++) {
    windowSum = windowSum - cardPoints[i - (n - k)] + cardPoints[i];
    minSum = Math.min(minSum, windowSum);
  }
  
  return totalSum - minSum;
};

// Subarray Product Less Than K
const numSubarrayProductLessThanK = (nums, k) => {
  if (k <= 1) return 0;
  
  let left = 0, product = 1, count = 0;
  
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];
    
    while (product >= k) {
      product /= nums[left++];
    }
    
    count += right - left + 1;
  }
  
  return count;
};

// Maximum Average Subarray I
const findMaxAverage = (nums, k) => {
  let sum = 0;
  
  // Calculate sum of first k elements
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  
  let maxSum = sum;
  
  // Sliding window
  for (let i = k; i < nums.length; i++) {
    sum = sum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, sum);
  }
  
  return maxSum / k;
};

// Grumpy Bookstore Owner
const maxSatisfied = (customers, grumpy, minutes) => {
  let satisfied = 0;
  
  // Calculate base satisfaction (when not grumpy)
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) {
      satisfied += customers[i];
    }
  }
  
  // Find maximum additional customers we can satisfy
  let additionalSatisfied = 0;
  
  // Calculate for first window
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) {
      additionalSatisfied += customers[i];
    }
  }
  
  let maxAdditional = additionalSatisfied;
  
  // Sliding window
  for (let i = minutes; i < customers.length; i++) {
    if (grumpy[i] === 1) {
      additionalSatisfied += customers[i];
    }
    if (grumpy[i - minutes] === 1) {
      additionalSatisfied -= customers[i - minutes];
    }
    maxAdditional = Math.max(maxAdditional, additionalSatisfied);
  }
  
  return satisfied + maxAdditional;
};

// Longest Subarray of 1's After Deleting One Element
const longestSubarray = (nums) => {
  let left = 0, zeroCount = 0, maxLen = 0;
  
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroCount++;
    
    while (zeroCount > 1) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left);
  }
  
  return maxLen;
};

// Max Consecutive Ones III
const longestOnes = (nums, k) => {
  let left = 0, zeroCount = 0, maxLen = 0;
  
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroCount++;
    
    while (zeroCount > k) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
};

// Sliding Window Maximum
const maxSlidingWindow = (nums, k) => {
  const deque = [];
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

// Subarrays with K Different Integers
const subarraysWithKDistinct = (nums, k) => {
  const atMostK = (k) => {
    const count = new Map();
    let left = 0, result = 0;
    
    for (let right = 0; right < nums.length; right++) {
      count.set(nums[right], (count.get(nums[right]) || 0) + 1);
      
      while (count.size > k) {
        count.set(nums[left], count.get(nums[left]) - 1);
        if (count.get(nums[left]) === 0) {
          count.delete(nums[left]);
        }
        left++;
      }
      
      result += right - left + 1;
    }
    
    return result;
  };
  
  return atMostK(k) - atMostK(k - 1);
};

// Replace the Substring for Balanced String
const balancedString = (s) => {
  const n = s.length;
  const target = n / 4;
  const count = { Q: 0, W: 0, E: 0, R: 0 };
  
  for (const char of s) {
    count[char]++;
  }
  
  // Check if already balanced
  if (Math.max(...Object.values(count)) <= target) return 0;
  
  let left = 0, minLen = n;
  
  for (let right = 0; right < n; right++) {
    count[s[right]]--;
    
    while (Math.max(...Object.values(count)) <= target) {
      minLen = Math.min(minLen, right - left + 1);
      count[s[left]]++;
      left++;
    }
  }
  
  return minLen;
};

// Frequency of the Most Frequent Element
const maxFrequency = (nums, k) => {
  nums.sort((a, b) => a - b);
  
  let left = 0, sum = 0, maxFreq = 1;
  
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    
    while (nums[right] * (right - left + 1) - sum > k) {
      sum -= nums[left];
      left++;
    }
    
    maxFreq = Math.max(maxFreq, right - left + 1);
  }
  
  return maxFreq;
};

// Test Cases
console.log(maxScore([1, 2, 3, 4, 5, 6, 1], 3)); // 12
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100)); // 8
console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75
console.log(maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3)); // 16
console.log(longestSubarray([1, 1, 0, 1])); // 3
console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); // 7
console.log(balancedString("QWER")); // 0
console.log(maxFrequency([1, 2, 4], 5)); // 3