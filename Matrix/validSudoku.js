// Valid Sudoku
const isValidSudoku = (board) => {
  const rows = Array(9).fill().map(() => new Set());
  const cols = Array(9).fill().map(() => new Set());
  const boxes = Array(9).fill().map(() => new Set());
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = board[i][j];
      if (val === '.') continue;
      
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      
      if (rows[i].has(val) || cols[j].has(val) || boxes[boxIndex].has(val)) {
        return false;
      }
      
      rows[i].add(val);
      cols[j].add(val);
      boxes[boxIndex].add(val);
    }
  }
  return true;
};

// Test Cases
const board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];
console.log(isValidSudoku(board)); // true