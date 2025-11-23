// Palindrome DP Problems

// Longest Palindromic Substring
const longestPalindrome = (s) => {
  let start = 0, maxLen = 1;
  
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const len = right - left + 1;
      if (len > maxLen) {
        start = left;
        maxLen = len;
      }
      left--;
      right++;
    }
  };
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);     // Odd length
    expandAroundCenter(i, i + 1); // Even length
  }
  
  return s.substring(start, start + maxLen);
};

// Palindromic Substrings
const countSubstrings = (s) => {
  let count = 0;
  
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  };
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);
    expandAroundCenter(i, i + 1);
  }
  
  return count;
};

// Longest Palindromic Subsequence
const longestPalindromeSubseq = (s) => {
  const n = s.length;
  const dp = Array(n).fill().map(() => Array(n).fill(0));
  
  // Single characters are palindromes of length 1
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  
  // Fill for substrings of length 2 to n
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[0][n - 1];
};

// Palindrome Partitioning II
const minCut = (s) => {
  const n = s.length;
  const isPalindrome = Array(n).fill().map(() => Array(n).fill(false));
  
  // Build palindrome table
  for (let i = 0; i < n; i++) {
    isPalindrome[i][i] = true;
  }
  
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        isPalindrome[i][j] = len === 2 || isPalindrome[i + 1][j - 1];
      }
    }
  }
  
  const dp = new Array(n).fill(Infinity);
  
  for (let i = 0; i < n; i++) {
    if (isPalindrome[0][i]) {
      dp[i] = 0;
    } else {
      for (let j = 0; j < i; j++) {
        if (isPalindrome[j + 1][i]) {
          dp[i] = Math.min(dp[i], dp[j] + 1);
        }
      }
    }
  }
  
  return dp[n - 1];
};

// Test Cases
console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(countSubstrings("abc")); // 3
console.log(longestPalindromeSubseq("bbbab")); // 4
console.log(minCut("aab")); // 1