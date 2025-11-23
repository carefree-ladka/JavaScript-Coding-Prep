// Guess Number Higher or Lower
const guessNumber = (n) => {
  let left = 1, right = n;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const result = guess(mid);
    
    if (result === 0) return mid;
    result === -1 ? right = mid - 1 : left = mid + 1;
  }
  return -1;
};

// Mock guess function for testing
let pick = 6;
const guess = (num) => {
  if (num === pick) return 0;
  return num > pick ? -1 : 1;
};

// Test Cases
console.log(guessNumber(10)); // 6