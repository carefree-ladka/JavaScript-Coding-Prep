// Basic Recursion Problems

// Factorial
const factorial = (n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

// Fibonacci
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Fibonacci with Memoization
const fibMemo = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
};

// Power
const power = (base, exp) => {
  if (exp === 0) return 1;
  if (exp === 1) return base;
  
  const half = power(base, Math.floor(exp / 2));
  return exp % 2 === 0 ? half * half : half * half * base;
};

// Sum of Digits
const sumOfDigits = (n) => {
  if (n === 0) return 0;
  return (n % 10) + sumOfDigits(Math.floor(n / 10));
};

// Reverse Number
const reverseNumber = (n, result = 0) => {
  if (n === 0) return result;
  return reverseNumber(Math.floor(n / 10), result * 10 + (n % 10));
};

// Check Palindrome
const isPalindrome = (str, left = 0, right = str.length - 1) => {
  if (left >= right) return true;
  if (str[left] !== str[right]) return false;
  return isPalindrome(str, left + 1, right - 1);
};

// GCD (Greatest Common Divisor)
const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

// Binary Search (Recursive)
const binarySearch = (arr, target, left = 0, right = arr.length - 1) => {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] > target) return binarySearch(arr, target, left, mid - 1);
  return binarySearch(arr, target, mid + 1, right);
};

// Count Zeros
const countZeros = (n) => {
  if (n === 0) return 1;
  if (n < 10) return 0;
  
  const lastDigit = n % 10;
  const count = lastDigit === 0 ? 1 : 0;
  return count + countZeros(Math.floor(n / 10));
};

// Test Cases
console.log(factorial(5)); // 120
console.log(fibonacci(10)); // 55
console.log(fibMemo(10)); // 55
console.log(power(2, 10)); // 1024
console.log(sumOfDigits(1234)); // 10
console.log(reverseNumber(1234)); // 4321
console.log(isPalindrome("racecar")); // true
console.log(gcd(48, 18)); // 6
console.log(binarySearch([1,2,3,4,5], 3)); // 2
console.log(countZeros(10203)); // 2