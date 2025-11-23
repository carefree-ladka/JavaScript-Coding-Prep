// Basic DP Problems

// Climbing Stairs
const climbStairs = (n) => {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
};

// Min Cost Climbing Stairs
const minCostClimbingStairs = (cost) => {
  const n = cost.length;
  let prev2 = 0, prev1 = 0;
  
  for (let i = 2; i <= n; i++) {
    const current = Math.min(prev1 + cost[i-1], prev2 + cost[i-2]);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
};

// House Robber
const rob = (nums) => {
  let prev2 = 0, prev1 = 0;
  
  for (const num of nums) {
    const current = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
};

// House Robber II (Circular)
const rob2 = (nums) => {
  if (nums.length === 1) return nums[0];
  
  const robRange = (start, end) => {
    let prev2 = 0, prev1 = 0;
    for (let i = start; i <= end; i++) {
      const current = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = current;
    }
    return prev1;
  };
  
  return Math.max(robRange(0, nums.length - 2), robRange(1, nums.length - 1));
};

// Decode Ways
const numDecodings = (s) => {
  if (s[0] === '0') return 0;
  
  let prev2 = 1, prev1 = 1;
  
  for (let i = 1; i < s.length; i++) {
    let current = 0;
    
    if (s[i] !== '0') current += prev1;
    
    const twoDigit = parseInt(s.slice(i-1, i+1));
    if (twoDigit >= 10 && twoDigit <= 26) current += prev2;
    
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
};

// Maximum Product Subarray
const maxProduct = (nums) => {
  let maxProd = nums[0], minProd = nums[0], result = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) [maxProd, minProd] = [minProd, maxProd];
    
    maxProd = Math.max(nums[i], maxProd * nums[i]);
    minProd = Math.min(nums[i], minProd * nums[i]);
    
    result = Math.max(result, maxProd);
  }
  
  return result;
};

// Test Cases
console.log(climbStairs(3)); // 3
console.log(minCostClimbingStairs([10,15,20])); // 15
console.log(rob([2,7,9,3,1])); // 12
console.log(rob2([2,3,2])); // 3
console.log(numDecodings("226")); // 3
console.log(maxProduct([2,3,-2,4])); // 6