// Length of Last Word
const lengthOfLastWord = (s) => {
  let length = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== ' ') length++;
    else if (length > 0) break;
  }
  return length;
};

// Test Cases
console.log(lengthOfLastWord("Hello World")); // 5
console.log(lengthOfLastWord("   fly me   to   the moon  ")); // 4