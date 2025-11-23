// Subsequence DP Problems

// Longest Increasing Subsequence
const lengthOfLIS = (nums) => {
  const dp = [];
  
  for (const num of nums) {
    let left = 0, right = dp.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (dp[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    dp[left] = num;
  }
  
  return dp.length;
};

// Longest Common Subsequence
const longestCommonSubsequence = (text1, text2) => {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
};

// Distinct Subsequences
const numDistinct = (s, t) => {
  const m = s.length, n = t.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Empty string t can be formed in 1 way
  for (let i = 0; i <= m; i++) {
    dp[i][0] = 1;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i - 1][j];
      
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] += dp[i - 1][j - 1];
      }
    }
  }
  
  return dp[m][n];
};

// Edit Distance
const minDistance = (word1, word2) => {
  const m = word1.length, n = word2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Replace
        );
      }
    }
  }
  
  return dp[m][n];
};

// Interleaving String
const isInterleave = (s1, s2, s3) => {
  const m = s1.length, n = s2.length;
  
  if (m + n !== s3.length) return false;
  
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
  dp[0][0] = true;
  
  // Fill first row
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }
  
  // Fill first column
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                 (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  
  return dp[m][n];
};

// Longest Increasing Path in Matrix
const longestIncreasingPath = (matrix) => {
  const m = matrix.length, n = matrix[0].length;
  const memo = Array(m).fill().map(() => Array(n).fill(0));
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  
  const dfs = (i, j) => {
    if (memo[i][j] !== 0) return memo[i][j];
    
    let maxPath = 1;
    
    for (const [di, dj] of dirs) {
      const ni = i + di, nj = j + dj;
      
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && 
          matrix[ni][nj] > matrix[i][j]) {
        maxPath = Math.max(maxPath, 1 + dfs(ni, nj));
      }
    }
    
    memo[i][j] = maxPath;
    return maxPath;
  };
  
  let result = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result = Math.max(result, dfs(i, j));
    }
  }
  
  return result;
};

// Test Cases
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4
console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(numDistinct("rabbbit", "rabbit")); // 3
console.log(minDistance("horse", "ros")); // 3
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); // true

const matrix = [[9,9,4],[6,6,8],[2,1,1]];
console.log(longestIncreasingPath(matrix)); // 4