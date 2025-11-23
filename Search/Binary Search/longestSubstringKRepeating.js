// Longest Substring with At Least K Repeating Characters
const longestSubstring = (s, k) => {
  const helper = (start, end) => {
    if (end - start < k) return 0;
    
    const count = {};
    for (let i = start; i < end; i++) {
      count[s[i]] = (count[s[i]] || 0) + 1;
    }
    
    for (let i = start; i < end; i++) {
      if (count[s[i]] < k) {
        let j = i;
        while (j < end && count[s[j]] < k) j++;
        return Math.max(helper(start, i), helper(j, end));
      }
    }
    return end - start;
  };
  
  return helper(0, s.length);
};

// Binary search approach
const longestSubstringBS = (s, k) => {
  let maxLen = 0;
  
  for (let uniqueChars = 1; uniqueChars <= 26; uniqueChars++) {
    const count = {};
    let left = 0, unique = 0, atLeastK = 0;
    
    for (let right = 0; right < s.length; right++) {
      if (!count[s[right]]) {
        count[s[right]] = 0;
        unique++;
      }
      count[s[right]]++;
      
      if (count[s[right]] === k) atLeastK++;
      
      while (unique > uniqueChars) {
        if (count[s[left]] === k) atLeastK--;
        count[s[left]]--;
        if (count[s[left]] === 0) unique--;
        left++;
      }
      
      if (unique === uniqueChars && atLeastK === uniqueChars) {
        maxLen = Math.max(maxLen, right - left + 1);
      }
    }
  }
  return maxLen;
};

// Test Cases
console.log(longestSubstring("aaabb", 3)); // 3
console.log(longestSubstring("ababbc", 2)); // 5