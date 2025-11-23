// HashMap + Prefix Sum Problems

// Two Sum
const twoSum = (nums, target) => {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
};

// Four Sum II
const fourSumCount = (nums1, nums2, nums3, nums4) => {
  const map = new Map();
  
  // Store all possible sums of nums1 and nums2
  for (const a of nums1) {
    for (const b of nums2) {
      const sum = a + b;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }
  
  let count = 0;
  
  // Check if complement exists in map
  for (const c of nums3) {
    for (const d of nums4) {
      const complement = -(c + d);
      count += map.get(complement) || 0;
    }
  }
  
  return count;
};

// Longest Substring Without Repeating Characters
const lengthOfLongestSubstring = (s) => {
  const charMap = new Map();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (charMap.has(s[right])) {
      left = Math.max(left, charMap.get(s[right]) + 1);
    }
    
    charMap.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
};

// Longest Substring with At Most K Distinct Characters
const lengthOfLongestSubstringKDistinct = (s, k) => {
  if (k === 0) return 0;
  
  const charCount = new Map();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
    
    while (charCount.size > k) {
      charCount.set(s[left], charCount.get(s[left]) - 1);
      if (charCount.get(s[left]) === 0) {
        charCount.delete(s[left]);
      }
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
};

// Fruit Into Baskets (At Most 2 Types)
const totalFruit = (fruits) => {
  return lengthOfLongestSubstringKDistinct(fruits, 2);
};

// Longest Substring with At Most Two Distinct Characters
const lengthOfLongestSubstringTwoDistinct = (s) => {
  return lengthOfLongestSubstringKDistinct(s, 2);
};

// Minimum Window Substring
const minWindow = (s, t) => {
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }
  
  const window = new Map();
  let left = 0, right = 0, valid = 0;
  let start = 0, len = Infinity;
  
  while (right < s.length) {
    const c = s[right];
    right++;
    
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }
    
    while (valid === need.size) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      
      const d = s[left];
      left++;
      
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }
  
  return len === Infinity ? "" : s.substr(start, len);
};

// Find All Anagrams in a String
const findAnagrams = (s, p) => {
  const need = new Map();
  for (const char of p) {
    need.set(char, (need.get(char) || 0) + 1);
  }
  
  const window = new Map();
  let left = 0, right = 0, valid = 0;
  const result = [];
  
  while (right < s.length) {
    const c = s[right];
    right++;
    
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }
    
    while (right - left >= p.length) {
      if (valid === need.size) {
        result.push(left);
      }
      
      const d = s[left];
      left++;
      
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }
  
  return result;
};

// Permutation in String
const checkInclusion = (s1, s2) => {
  const need = new Map();
  for (const char of s1) {
    need.set(char, (need.get(char) || 0) + 1);
  }
  
  const window = new Map();
  let left = 0, right = 0, valid = 0;
  
  while (right < s2.length) {
    const c = s2[right];
    right++;
    
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }
    
    while (right - left >= s1.length) {
      if (valid === need.size) {
        return true;
      }
      
      const d = s2[left];
      left++;
      
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }
  
  return false;
};

// Longest Repeating Character Replacement
const characterReplacement = (s, k) => {
  const charCount = new Map();
  let left = 0, maxCount = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
    maxCount = Math.max(maxCount, charCount.get(s[right]));
    
    if (right - left + 1 - maxCount > k) {
      charCount.set(s[left], charCount.get(s[left]) - 1);
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
};

// Test Cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2])); // 2
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstringKDistinct("eceba", 2)); // 3
console.log(totalFruit([1, 2, 1])); // 3
console.log(lengthOfLongestSubstringTwoDistinct("eceba")); // 3
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(findAnagrams("abab", "ab")); // [0, 2]
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(characterReplacement("ABAB", 2)); // 4