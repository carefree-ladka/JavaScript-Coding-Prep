// Mathematical Recursion Problems

// Tower of Hanoi
const towerOfHanoi = (n, source = 'A', destination = 'C', auxiliary = 'B') => {
  if (n === 1) {
    console.log(`Move disk 1 from ${source} to ${destination}`);
    return 1;
  }
  
  let moves = 0;
  moves += towerOfHanoi(n - 1, source, auxiliary, destination);
  console.log(`Move disk ${n} from ${source} to ${destination}`);
  moves += 1;
  moves += towerOfHanoi(n - 1, auxiliary, destination, source);
  
  return moves;
};

// Generate Pascal's Triangle
const generatePascalTriangle = (numRows) => {
  if (numRows === 0) return [];
  if (numRows === 1) return [[1]];
  
  const triangle = generatePascalTriangle(numRows - 1);
  const lastRow = triangle[triangle.length - 1];
  const newRow = [1];
  
  for (let i = 1; i < lastRow.length; i++) {
    newRow.push(lastRow[i - 1] + lastRow[i]);
  }
  newRow.push(1);
  
  triangle.push(newRow);
  return triangle;
};

// Catalan Numbers
const catalan = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 1) return 1;
  
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += catalan(i, memo) * catalan(n - 1 - i, memo);
  }
  
  memo[n] = result;
  return result;
};

// Count Ways to Climb Stairs (with steps array)
const climbStairsWays = (n, steps = [1, 2], memo = {}) => {
  if (n in memo) return memo[n];
  if (n === 0) return 1;
  if (n < 0) return 0;
  
  let ways = 0;
  for (const step of steps) {
    ways += climbStairsWays(n - step, steps, memo);
  }
  
  memo[n] = ways;
  return ways;
};

// Count Paths in Grid
const countPaths = (m, n, i = 0, j = 0, memo = {}) => {
  const key = `${i},${j}`;
  if (key in memo) return memo[key];
  
  if (i === m - 1 && j === n - 1) return 1;
  if (i >= m || j >= n) return 0;
  
  memo[key] = countPaths(m, n, i + 1, j, memo) + countPaths(m, n, i, j + 1, memo);
  return memo[key];
};

// Josephus Problem
const josephus = (n, k) => {
  if (n === 1) return 0;
  return (josephus(n - 1, k) + k) % n;
};

// Count Binary Strings without Consecutive 1s
const countBinaryStrings = (n, lastDigit = 0, memo = {}) => {
  const key = `${n},${lastDigit}`;
  if (key in memo) return memo[key];
  
  if (n === 0) return 1;
  
  let count = countBinaryStrings(n - 1, 0, memo); // Can always append 0
  
  if (lastDigit === 0) {
    count += countBinaryStrings(n - 1, 1, memo); // Can append 1 only if last was 0
  }
  
  memo[key] = count;
  return count;
};

// Coin Change Ways
const coinChangeWays = (amount, coins, index = 0, memo = {}) => {
  const key = `${amount},${index}`;
  if (key in memo) return memo[key];
  
  if (amount === 0) return 1;
  if (amount < 0 || index >= coins.length) return 0;
  
  // Include current coin
  const include = coinChangeWays(amount - coins[index], coins, index, memo);
  // Exclude current coin
  const exclude = coinChangeWays(amount, coins, index + 1, memo);
  
  memo[key] = include + exclude;
  return memo[key];
};

// Generate All Binary Numbers of Length n
const generateBinaryNumbers = (n, current = '', result = []) => {
  if (current.length === n) {
    result.push(current);
    return result;
  }
  
  generateBinaryNumbers(n, current + '0', result);
  generateBinaryNumbers(n, current + '1', result);
  
  return result;
};

// Count Derangements
const countDerangements = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n === 0) return 1;
  if (n === 1) return 0;
  
  memo[n] = (n - 1) * (countDerangements(n - 1, memo) + countDerangements(n - 2, memo));
  return memo[n];
};

// Generate All Balanced Parentheses
const generateBalancedParentheses = (n) => {
  const result = [];
  
  const generate = (current, open, close) => {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    
    if (open < n) {
      generate(current + '(', open + 1, close);
    }
    
    if (close < open) {
      generate(current + ')', open, close + 1);
    }
  };
  
  generate('', 0, 0);
  return result;
};

// Ackermann Function
const ackermann = (m, n, memo = {}) => {
  const key = `${m},${n}`;
  if (key in memo) return memo[key];
  
  if (m === 0) return n + 1;
  if (n === 0) return ackermann(m - 1, 1, memo);
  
  memo[key] = ackermann(m - 1, ackermann(m, n - 1, memo), memo);
  return memo[key];
};

// Test Cases
console.log("Tower of Hanoi for 3 disks:");
console.log(`Total moves: ${towerOfHanoi(3)}`);

console.log(generatePascalTriangle(5)); 
// [[1], [1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]

console.log(catalan(4)); // 14
console.log(climbStairsWays(4)); // 5 (ways to climb 4 stairs with steps 1,2)
console.log(countPaths(3, 3)); // 6
console.log(josephus(5, 2)); // 2 (0-indexed position of survivor)
console.log(countBinaryStrings(3)); // 5
console.log(coinChangeWays(4, [1, 2, 3])); // 4
console.log(generateBinaryNumbers(3)); // ["000", "001", "010", "011", "100", "101", "110", "111"]
console.log(countDerangements(4)); // 9
console.log(generateBalancedParentheses(2)); // ["(())", "()()"]
console.log(ackermann(3, 2)); // 29