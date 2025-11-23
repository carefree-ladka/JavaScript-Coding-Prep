// Grid DFS - Basic Template
const gridDFS = (grid, r, c, visited = new Set()) => {
  const [m, n] = [grid.length, grid[0].length];
  const key = `${r},${c}`;

  if (
    r < 0 ||
    r >= m ||
    c < 0 ||
    c >= n ||
    grid[r][c] === 1 ||
    visited.has(key)
  ) {
    return false;
  }

  visited.add(key);
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (const [dr, dc] of dirs) {
    gridDFS(grid, r + dr, c + dc, visited);
  }

  return true;
};

// Number of Islands
const numIslands = (grid) => {
  if (!grid.length) return 0;

  const [m, n] = [grid.length, grid[0].length];
  let count = 0;

  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === "0") return;

    grid[r][c] = "0"; // Mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
};

// Max Area of Island
const maxAreaOfIsland = (grid) => {
  const [m, n] = [grid.length, grid[0].length];
  let maxArea = 0;

  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;

    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        maxArea = Math.max(maxArea, dfs(i, j));
      }
    }
  }

  return maxArea;
};

// Surrounded Regions
const solve = (board) => {
  if (!board.length) return;

  const [m, n] = [board.length, board[0].length];

  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== "O") return;

    board[r][c] = "T"; // Temporary mark
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  // Mark border-connected 'O's
  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }

  // Convert 'O' to 'X' and 'T' back to 'O'
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "O") board[i][j] = "X";
      else if (board[i][j] === "T") board[i][j] = "O";
    }
  }
};

// Pacific Atlantic Water Flow
const pacificAtlantic = (heights) => {
  const [m, n] = [heights.length, heights[0].length];
  const pacific = Array(m)
    .fill()
    .map(() => Array(n).fill(false));
  const atlantic = Array(m)
    .fill()
    .map(() => Array(n).fill(false));

  const dfs = (r, c, ocean, prevHeight) => {
    if (
      r < 0 ||
      r >= m ||
      c < 0 ||
      c >= n ||
      ocean[r][c] ||
      heights[r][c] < prevHeight
    )
      return;

    ocean[r][c] = true;
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (const [dr, dc] of dirs) {
      dfs(r + dr, c + dc, ocean, heights[r][c]);
    }
  };

  // Start from borders
  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacific, 0);
    dfs(i, n - 1, atlantic, 0);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j, pacific, 0);
    dfs(m - 1, j, atlantic, 0);
  }

  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
};

// Word Search
const exist = (board, word) => {
  const [m, n] = [board.length, board[0].length];

  const dfs = (r, c, index) => {
    if (index === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[index])
      return false;

    const temp = board[r][c];
    board[r][c] = "#"; // Mark as visited

    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);

    board[r][c] = temp; // Backtrack
    return found;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
};

// Flood Fill
const floodFill = (image, sr, sc, color) => {
  const originalColor = image[sr][sc];
  if (originalColor === color) return image;

  const dfs = (r, c) => {
    if (
      r < 0 ||
      r >= image.length ||
      c < 0 ||
      c >= image[0].length ||
      image[r][c] !== originalColor
    )
      return;

    image[r][c] = color;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };

  dfs(sr, sc);
  return image;
};

// Test Cases
const grid1 = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
];
console.log(numIslands(grid1)); // 1

const grid2 = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];
console.log(maxAreaOfIsland(grid2)); // 6

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
); // true
