// String Recursion Problems

// Reverse String
const reverseString = (str) => {
  if (str.length <= 1) return str;
  return str[str.length - 1] + reverseString(str.slice(0, -1));
};

// Check if String is Palindrome
const isPalindromeStr = (str, left = 0, right = str.length - 1) => {
  if (left >= right) return true;
  if (str[left] !== str[right]) return false;
  return isPalindromeStr(str, left + 1, right - 1);
};

// Count Vowels
const countVowels = (str, index = 0) => {
  if (index >= str.length) return 0;
  
  const vowels = 'aeiouAEIOU';
  const count = vowels.includes(str[index]) ? 1 : 0;
  return count + countVowels(str, index + 1);
};

// Remove Character
const removeChar = (str, char, index = 0) => {
  if (index >= str.length) return '';
  
  if (str[index] === char) {
    return removeChar(str, char, index + 1);
  }
  
  return str[index] + removeChar(str, char, index + 1);
};

// Replace Character
const replaceChar = (str, oldChar, newChar, index = 0) => {
  if (index >= str.length) return '';
  
  const currentChar = str[index] === oldChar ? newChar : str[index];
  return currentChar + replaceChar(str, oldChar, newChar, index + 1);
};

// Generate All Subsequences
const generateSubsequences = (str, index = 0, current = '') => {
  if (index >= str.length) {
    return [current];
  }
  
  // Include current character
  const include = generateSubsequences(str, index + 1, current + str[index]);
  // Exclude current character
  const exclude = generateSubsequences(str, index + 1, current);
  
  return [...include, ...exclude];
};

// Generate All Permutations
const generatePermutations = (str) => {
  if (str.length <= 1) return [str];
  
  const result = [];
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    const perms = generatePermutations(remaining);
    
    for (const perm of perms) {
      result.push(char + perm);
    }
  }
  
  return result;
};

// Check if String Contains Only Digits
const isAllDigits = (str, index = 0) => {
  if (index >= str.length) return true;
  if (str[index] < '0' || str[index] > '9') return false;
  return isAllDigits(str, index + 1);
};

// Convert String to Integer (Recursive)
const stringToInt = (str, index = 0, result = 0) => {
  if (index >= str.length) return result;
  
  const digit = str.charCodeAt(index) - 48; // ASCII '0' = 48
  return stringToInt(str, index + 1, result * 10 + digit);
};

// Longest Common Subsequence Length
const lcsLength = (str1, str2, i = 0, j = 0, memo = {}) => {
  const key = `${i},${j}`;
  if (key in memo) return memo[key];
  
  if (i >= str1.length || j >= str2.length) return 0;
  
  if (str1[i] === str2[j]) {
    memo[key] = 1 + lcsLength(str1, str2, i + 1, j + 1, memo);
  } else {
    memo[key] = Math.max(
      lcsLength(str1, str2, i + 1, j, memo),
      lcsLength(str1, str2, i, j + 1, memo)
    );
  }
  
  return memo[key];
};

// Edit Distance (Recursive)
const editDistance = (str1, str2, i = 0, j = 0, memo = {}) => {
  const key = `${i},${j}`;
  if (key in memo) return memo[key];
  
  if (i >= str1.length) return str2.length - j;
  if (j >= str2.length) return str1.length - i;
  
  if (str1[i] === str2[j]) {
    memo[key] = editDistance(str1, str2, i + 1, j + 1, memo);
  } else {
    memo[key] = 1 + Math.min(
      editDistance(str1, str2, i + 1, j, memo),     // Delete
      editDistance(str1, str2, i, j + 1, memo),     // Insert
      editDistance(str1, str2, i + 1, j + 1, memo) // Replace
    );
  }
  
  return memo[key];
};

// Test Cases
console.log(reverseString("hello")); // "olleh"
console.log(isPalindromeStr("racecar")); // true
console.log(countVowels("hello world")); // 3
console.log(removeChar("hello", "l")); // "heo"
console.log(replaceChar("hello", "l", "x")); // "hexxo"
console.log(generateSubsequences("abc")); // ["abc", "ab", "ac", "a", "bc", "b", "c", ""]
console.log(generatePermutations("abc")); // ["abc", "acb", "bac", "bca", "cab", "cba"]
console.log(isAllDigits("12345")); // true
console.log(stringToInt("123")); // 123
console.log(lcsLength("abcde", "ace")); // 3
console.log(editDistance("horse", "ros")); // 3