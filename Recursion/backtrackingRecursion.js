// Backtracking Recursion Problems

// Generate All Subsets
const subsets = (nums) => {
  const result = [];
  
  const backtrack = (start, current) => {
    result.push([...current]);
    
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  };
  
  backtrack(0, []);
  return result;
};

// Generate All Permutations
const permute = (nums) => {
  const result = [];
  
  const backtrack = (current) => {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    for (const num of nums) {
      if (!current.includes(num)) {
        current.push(num);
        backtrack(current);
        current.pop();
      }
    }
  };
  
  backtrack([]);
  return result;
};

// Combination Sum
const combinationSum = (candidates, target) => {
  const result = [];
  
  const backtrack = (start, current, sum) => {
    if (sum === target) {
      result.push([...current]);
      return;
    }
    
    if (sum > target) return;
    
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, sum + candidates[i]);
      current.pop();
    }
  };
  
  backtrack(0, [], 0);
  return result;
};

// Letter Combinations of Phone Number
const letterCombinations = (digits) => {
  if (!digits) return [];
  
  const mapping = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  
  const result = [];
  
  const backtrack = (index, current) => {
    if (index === digits.length) {
      result.push(current);
      return;
    }
    
    const letters = mapping[digits[index]];
    for (const letter of letters) {
      backtrack(index + 1, current + letter);
    }
  };
  
  backtrack(0, '');
  return result;
};

// N-Queens
const solveNQueens = (n) => {
  const result = [];
  const board = Array(n).fill().map(() => Array(n).fill('.'));
  
  const isValid = (row, col) => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    
    // Check diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    
    // Check anti-diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    
    return true;
  };
  
  const backtrack = (row) => {
    if (row === n) {
      result.push(board.map(row => row.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  };
  
  backtrack(0);
  return result;
};

// Sudoku Solver
const solveSudoku = (board) => {
  const isValid = (row, col, num) => {
    // Check row
    for (let j = 0; j < 9; j++) {
      if (board[row][j] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }
    
    return true;
  };
  
  const solve = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (let num = '1'; num <= '9'; num++) {
            if (isValid(i, j, num)) {
              board[i][j] = num;
              
              if (solve()) return true;
              
              board[i][j] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  
  solve();
  return board;
};

// Word Search
const exist = (board, word) => {
  const m = board.length, n = board[0].length;
  
  const backtrack = (i, j, index) => {
    if (index === word.length) return true;
    
    if (i < 0 || i >= m || j < 0 || j >= n || 
        board[i][j] !== word[index]) return false;
    
    const temp = board[i][j];
    board[i][j] = '#'; // Mark as visited
    
    const found = backtrack(i + 1, j, index + 1) ||
                  backtrack(i - 1, j, index + 1) ||
                  backtrack(i, j + 1, index + 1) ||
                  backtrack(i, j - 1, index + 1);
    
    board[i][j] = temp; // Backtrack
    return found;
  };
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (backtrack(i, j, 0)) return true;
    }
  }
  
  return false;
};

// Generate Parentheses
const generateParenthesis = (n) => {
  const result = [];
  
  const backtrack = (current, open, close) => {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  };
  
  backtrack('', 0, 0);
  return result;
};

// Test Cases
console.log(subsets([1, 2, 3])); // [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
console.log(permute([1, 2, 3])); // [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3], [7]]
console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(solveNQueens(4)); // Two solutions for 4x4 board
console.log(generateParenthesis(3)); // ["((()))", "(()())", "(())()", "()(())", "()()()"]

const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist(board, "ABCCED")); // true