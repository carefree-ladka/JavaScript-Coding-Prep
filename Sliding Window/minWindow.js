// Minimum Window Substring - Sliding Window
const minWindow = (s, t) => {
  const need = {};
  for (const char of t) need[char] = (need[char] || 0) + 1;
  
  let left = 0, right = 0, valid = 0;
  let start = 0, len = Infinity;
  const window = {};
  
  while (right < s.length) {
    const c = s[right];
    right++;
    
    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) valid++;
    }
    
    while (valid === Object.keys(need).length) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      
      const d = s[left];
      left++;
      
      if (need[d]) {
        if (window[d] === need[d]) valid--;
        window[d]--;
      }
    }
  }
  return len === Infinity ? "" : s.substr(start, len);
};

// Test Cases
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a")); // "a"