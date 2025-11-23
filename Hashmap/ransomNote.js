// Ransom Note
const canConstruct = (ransomNote, magazine) => {
  const count = {};
  for (const char of magazine) count[char] = (count[char] || 0) + 1;
  
  for (const char of ransomNote) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
};

// Test Cases
console.log(canConstruct("a", "b")); // false
console.log(canConstruct("aa", "aab")); // true