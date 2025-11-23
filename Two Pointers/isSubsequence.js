// Is Subsequence - Two Pointers
const isSubsequence = (s, t) => {
  let i = 0;
  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }
  return i === s.length;
};

// Test Cases
console.log(isSubsequence("abc", "aebdc")); // false
console.log(isSubsequence("axc", "ahbgdc")); // false