// Happy Number
const isHappy = (n) => {
  const seen = new Set();
  
  const getNext = (num) => {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  };
  
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
  }
  
  return n === 1;
};

// Test Cases
console.log(isHappy(19)); // true
console.log(isHappy(2)); // false