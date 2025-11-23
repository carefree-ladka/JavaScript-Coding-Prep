// Find the Index of the First Occurrence in a String
const strStr = (haystack, needle) => {
  return haystack.indexOf(needle);
};

// KMP approach
const strStrKMP = (haystack, needle) => {
  if (!needle) return 0;
  
  const lps = new Array(needle.length).fill(0);
  let len = 0, i = 1;
  
  while (i < needle.length) {
    if (needle[i] === needle[len]) {
      lps[i++] = ++len;
    } else if (len) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  
  i = 0;
  let j = 0;
  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    }
    if (j === needle.length) return i - j;
    else if (i < haystack.length && haystack[i] !== needle[j]) {
      j ? j = lps[j - 1] : i++;
    }
  }
  return -1;
};

// Test Cases
console.log(strStr("sadbutsad", "sad")); // 0
console.log(strStr("leetcode", "leeto")); // -1