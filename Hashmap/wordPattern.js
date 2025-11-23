// Word Pattern
const wordPattern = (pattern, s) => {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;
  
  const charToWord = {}, wordToChar = {};
  
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i], word = words[i];
    
    if (charToWord[char] && charToWord[char] !== word) return false;
    if (wordToChar[word] && wordToChar[word] !== char) return false;
    
    charToWord[char] = word;
    wordToChar[word] = char;
  }
  return true;
};

// Test Cases
console.log(wordPattern("abba", "dog cat cat dog")); // true
console.log(wordPattern("abba", "dog cat cat fish")); // false