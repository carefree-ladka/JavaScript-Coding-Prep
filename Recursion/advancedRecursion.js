// Advanced Recursion Problems

// Maze Path Finding
const findMazePaths = (maze, startRow = 0, startCol = 0, endRow = null, endCol = null) => {
  const m = maze.length, n = maze[0].length;
  if (endRow === null) endRow = m - 1;
  if (endCol === null) endCol = n - 1;
  
  const paths = [];
  const visited = Array(m).fill().map(() => Array(n).fill(false));
  
  const isValid = (row, col) => {
    return row >= 0 && row < m && col >= 0 && col < n && 
           maze[row][col] === 0 && !visited[row][col];
  };
  
  const findPaths = (row, col, path) => {
    if (row === endRow && col === endCol) {
      paths.push([...path, [row, col]]);
      return;
    }
    
    visited[row][col] = true;
    
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (isValid(newRow, newCol)) {
        findPaths(newRow, newCol, [...path, [row, col]]);
      }
    }
    
    visited[row][col] = false; // Backtrack
  };
  
  if (maze[startRow][startCol] === 0) {
    findPaths(startRow, startCol, []);
  }
  
  return paths;
};

// Expression Evaluation with Operators
const evaluateExpression = (nums, target, index = 0, current = 0, prev = 0, expression = '') => {
  if (index === nums.length) {
    return current === target ? [expression] : [];
  }
  
  const results = [];
  const numStr = nums[index].toString();
  
  if (index === 0) {
    // First number, no operator needed
    results.push(...evaluateExpression(nums, target, index + 1, nums[index], nums[index], numStr));
  } else {
    // Addition
    results.push(...evaluateExpression(nums, target, index + 1, current + nums[index], nums[index], expression + '+' + numStr));
    
    // Subtraction
    results.push(...evaluateExpression(nums, target, index + 1, current - nums[index], -nums[index], expression + '-' + numStr));
    
    // Multiplication
    results.push(...evaluateExpression(nums, target, index + 1, current - prev + prev * nums[index], prev * nums[index], expression + '*' + numStr));
  }
  
  return results;
};

// Rat in Maze with Multiple Solutions
const ratInMaze = (maze) => {
  const n = maze.length;
  const solutions = [];
  const path = Array(n).fill().map(() => Array(n).fill(0));
  
  const isSafe = (x, y) => {
    return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1;
  };
  
  const solveMaze = (x, y) => {
    if (x === n - 1 && y === n - 1 && maze[x][y] === 1) {
      path[x][y] = 1;
      solutions.push(path.map(row => [...row]));
      path[x][y] = 0;
      return;
    }
    
    if (isSafe(x, y)) {
      path[x][y] = 1;
      
      // Move right
      solveMaze(x, y + 1);
      // Move down
      solveMaze(x + 1, y);
      // Move left
      solveMaze(x, y - 1);
      // Move up
      solveMaze(x - 1, y);
      
      path[x][y] = 0; // Backtrack
    }
  };
  
  solveMaze(0, 0);
  return solutions;
};

// Knight's Tour Problem
const knightsTour = (n, startX = 0, startY = 0) => {
  const board = Array(n).fill().map(() => Array(n).fill(-1));
  const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];
  
  const isValid = (x, y) => {
    return x >= 0 && x < n && y >= 0 && y < n && board[x][y] === -1;
  };
  
  const solve = (x, y, moveCount) => {
    board[x][y] = moveCount;
    
    if (moveCount === n * n - 1) {
      return true; // Found solution
    }
    
    for (const [dx, dy] of moves) {
      const nextX = x + dx;
      const nextY = y + dy;
      
      if (isValid(nextX, nextY)) {
        if (solve(nextX, nextY, moveCount + 1)) {
          return true;
        }
      }
    }
    
    board[x][y] = -1; // Backtrack
    return false;
  };
  
  if (solve(startX, startY, 0)) {
    return board;
  }
  
  return null; // No solution found
};

// Generate All Valid IP Addresses
const restoreIpAddresses = (s) => {
  const result = [];
  
  const isValid = (segment) => {
    if (segment.length > 3 || segment.length === 0) return false;
    if (segment[0] === '0' && segment.length > 1) return false;
    return parseInt(segment) <= 255;
  };
  
  const backtrack = (start, parts) => {
    if (parts.length === 4) {
      if (start === s.length) {
        result.push(parts.join('.'));
      }
      return;
    }
    
    for (let len = 1; len <= 3 && start + len <= s.length; len++) {
      const segment = s.substring(start, start + len);
      if (isValid(segment)) {
        backtrack(start + len, [...parts, segment]);
      }
    }
  };
  
  backtrack(0, []);
  return result;
};

// Word Break II (All Possible Sentences)
const wordBreakII = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const memo = new Map();
  
  const backtrack = (start) => {
    if (memo.has(start)) return memo.get(start);
    
    if (start === s.length) return [''];
    
    const result = [];
    
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.substring(start, end);
      
      if (wordSet.has(word)) {
        const suffixes = backtrack(end);
        
        for (const suffix of suffixes) {
          result.push(word + (suffix === '' ? '' : ' ' + suffix));
        }
      }
    }
    
    memo.set(start, result);
    return result;
  };
  
  return backtrack(0);
};

// Palindrome Partitioning
const partition = (s) => {
  const result = [];
  
  const isPalindrome = (str, left, right) => {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };
  
  const backtrack = (start, current) => {
    if (start === s.length) {
      result.push([...current]);
      return;
    }
    
    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        current.push(s.substring(start, end + 1));
        backtrack(end + 1, current);
        current.pop();
      }
    }
  };
  
  backtrack(0, []);
  return result;
};

// Test Cases
const maze = [
  [0, 1, 0, 0],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 0, 1, 0]
];
console.log("Maze paths:", findMazePaths(maze).length);

console.log(evaluateExpression([1, 2, 3], 6)); // ["1+2+3", "1*2*3"]

const ratMaze = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 1, 0, 0],
  [1, 1, 1, 1]
];
console.log("Rat in maze solutions:", ratInMaze(ratMaze).length);

console.log("Knight's tour 5x5:", knightsTour(5) !== null);

console.log(restoreIpAddresses("25525511135")); // ["255.255.11.135", "255.255.111.35"]

console.log(wordBreakII("catsanddog", ["cat","cats","and","sand","dog"])); 
// ["cats and dog", "cat sand dog"]

console.log(partition("aab")); // [["a","a","b"], ["aa","b"]]