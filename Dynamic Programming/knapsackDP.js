// Knapsack DP Problems

// Partition Equal Subset Sum (0/1 Knapsack variant)
const canPartition = (nums) => {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  
  return dp[target];
};

// Coin Change II (Unbounded Knapsack)
const change = (amount, coins) => {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  
  return dp[amount];
};

// Target Sum (0/1 Knapsack with +/-)
const findTargetSumWays = (nums, target) => {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > sum || (sum + target) % 2 !== 0) return 0;
  
  const subsetSum = (sum + target) / 2;
  const dp = new Array(subsetSum + 1).fill(0);
  dp[0] = 1;
  
  for (const num of nums) {
    for (let j = subsetSum; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }
  
  return dp[subsetSum];
};

// Word Break
const wordBreak = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
};

// Combination Sum IV (Unbounded Knapsack - order matters)
const combinationSum4 = (nums, target) => {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  
  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (i >= num) {
        dp[i] += dp[i - num];
      }
    }
  }
  
  return dp[target];
};

// Perfect Squares
const numSquares = (n) => {
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  
  return dp[n];
};

// Minimum Coin Change
const coinChange = (coins, amount) => {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// Test Cases
console.log(canPartition([1,5,11,5])); // true
console.log(change(5, [1,2,5])); // 4
console.log(findTargetSumWays([1,1,1,1,1], 3)); // 5
console.log(wordBreak("leetcode", ["leet","code"])); // true
console.log(combinationSum4([1,2,3], 4)); // 7
console.log(numSquares(12)); // 3
console.log(coinChange([1,3,4], 6)); // 2