// Advanced DP Problems

// Burst Balloons
const maxCoins = (nums) => {
  const arr = [1, ...nums, 1];
  const n = arr.length;
  const dp = Array(n).fill().map(() => Array(n).fill(0));
  
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + arr[i] * arr[k] * arr[j]
        );
      }
    }
  }
  
  return dp[0][n - 1];
};

// Regular Expression Matching
const isMatch = (s, p) => {
  const m = s.length, n = p.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
  
  dp[0][0] = true;
  
  // Handle patterns like a*, a*b*, a*b*c*
  for (let j = 2; j <= n; j += 2) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 2];
    }
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2]; // Zero occurrences
        
        if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j]; // One or more occurrences
        }
      } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  
  return dp[m][n];
};

// Wildcard Matching
const isMatchWildcard = (s, p) => {
  const m = s.length, n = p.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
  
  dp[0][0] = true;
  
  // Handle patterns like *, **, ***
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 1];
    }
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  
  return dp[m][n];
};

// Scramble String
const isScramble = (s1, s2) => {
  if (s1.length !== s2.length) return false;
  if (s1 === s2) return true;
  
  const memo = new Map();
  
  const helper = (s1, s2) => {
    const key = s1 + '|' + s2;
    if (memo.has(key)) return memo.get(key);
    
    if (s1 === s2) {
      memo.set(key, true);
      return true;
    }
    
    // Check if characters match
    const count = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
      count[s1.charCodeAt(i) - 97]++;
      count[s2.charCodeAt(i) - 97]--;
    }
    
    for (const c of count) {
      if (c !== 0) {
        memo.set(key, false);
        return false;
      }
    }
    
    for (let i = 1; i < s1.length; i++) {
      // No swap
      if (helper(s1.slice(0, i), s2.slice(0, i)) && 
          helper(s1.slice(i), s2.slice(i))) {
        memo.set(key, true);
        return true;
      }
      
      // Swap
      if (helper(s1.slice(0, i), s2.slice(s2.length - i)) && 
          helper(s1.slice(i), s2.slice(0, s2.length - i))) {
        memo.set(key, true);
        return true;
      }
    }
    
    memo.set(key, false);
    return false;
  };
  
  return helper(s1, s2);
};

// Russian Doll Envelopes
const maxEnvelopes = (envelopes) => {
  envelopes.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
  
  const heights = envelopes.map(env => env[1]);
  const dp = [];
  
  for (const height of heights) {
    let left = 0, right = dp.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (dp[mid] < height) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    dp[left] = height;
  }
  
  return dp.length;
};

// Minimum Insertion Steps to Make String Palindrome
const minInsertions = (s) => {
  const n = s.length;
  const dp = Array(n).fill().map(() => Array(n).fill(0));
  
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[0][n - 1];
};

// Test Cases
console.log(maxCoins([3,1,5,8])); // 167
console.log(isMatch("aa", "a*")); // true
console.log(isMatchWildcard("adceb", "*a*b")); // true
console.log(isScramble("great", "rgeat")); // true
console.log(maxEnvelopes([[5,4],[6,4],[6,7],[2,3]])); // 3
console.log(minInsertions("zzazz")); // 0