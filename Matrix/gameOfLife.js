// Game of Life - In-place using state encoding
const gameOfLife = (board) => {
  const m = board.length,
    n = board[0].length;

  const countLiveNeighbors = (i, j) => {
    let count = 0;
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        const ni = i + di,
          nj = j + dj;
        if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
          count += board[ni][nj] & 1; // Get original state
        }
      }
    }
    return count;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const live = countLiveNeighbors(i, j);
      if (board[i][j] === 1 && (live === 2 || live === 3)) {
        board[i][j] = 3; // 01 -> 11 (live -> live)
      } else if (board[i][j] === 0 && live === 3) {
        board[i][j] = 2; // 00 -> 10 (dead -> live)
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      board[i][j] >>= 1; // Get next state
    }
  }
};

// Test Cases
let board = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];
gameOfLife(board);
console.log(board); // [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
