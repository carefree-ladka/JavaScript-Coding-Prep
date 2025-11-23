// Path DP Problems

// Unique Paths
const uniquePaths = (m, n) => {
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};

// Unique Paths II (with obstacles)
const uniquePathsWithObstacles = (obstacleGrid) => {
  const m = obstacleGrid.length,
    n = obstacleGrid[0].length;

  if (obstacleGrid[0][0] === 1) return 0;

  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0));
  dp[0][0] = 1;

  // Fill first row
  for (let j = 1; j < n; j++) {
    dp[0][j] = obstacleGrid[0][j] === 1 ? 0 : dp[0][j - 1];
  }

  // Fill first column
  for (let i = 1; i < m; i++) {
    dp[i][0] = obstacleGrid[i][0] === 1 ? 0 : dp[i - 1][0];
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
};

// Minimum Path Sum
const minPathSum = (grid) => {
  const m = grid.length,
    n = grid[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      else if (i === 0) grid[i][j] += grid[i][j - 1];
      else if (j === 0) grid[i][j] += grid[i - 1][j];
      else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }

  return grid[m - 1][n - 1];
};

// Triangle
const minimumTotal = (triangle) => {
  const n = triangle.length;
  const dp = [...triangle[n - 1]];

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
    }
  }

  return dp[0];
};

// Maximal Square
const maximalSquare = (matrix) => {
  const m = matrix.length,
    n = matrix[0].length;
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));
  let maxSide = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  return maxSide * maxSide;
};

// Dungeon Game
const calculateMinimumHP = (dungeon) => {
  const m = dungeon.length,
    n = dungeon[0].length;
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(Infinity));

  dp[m][n - 1] = dp[m - 1][n] = 1;

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
      dp[i][j] = Math.max(1, need);
    }
  }

  return dp[0][0];
};

// Cherry Pickup
const cherryPickup = (grid) => {
  const n = grid.length;
  const memo = new Map();

  const dp = (r1, c1, r2) => {
    const c2 = r1 + c1 - r2;
    const key = `${r1},${c1},${r2}`;

    if (
      r1 >= n ||
      c1 >= n ||
      r2 >= n ||
      c2 >= n ||
      grid[r1][c1] === -1 ||
      grid[r2][c2] === -1
    ) {
      return -Infinity;
    }

    if (r1 === n - 1 && c1 === n - 1) return grid[r1][c1];

    if (memo.has(key)) return memo.get(key);

    let cherries = grid[r1][c1];
    if (r1 !== r2 || c1 !== c2) cherries += grid[r2][c2];

    const result =
      cherries +
      Math.max(
        dp(r1 + 1, c1, r2 + 1),
        dp(r1 + 1, c1, r2),
        dp(r1, c1 + 1, r2 + 1),
        dp(r1, c1 + 1, r2)
      );

    memo.set(key, result);
    return result;
  };

  return Math.max(0, dp(0, 0, 0));
};

// Test Cases
console.log(uniquePaths(3, 7)); // 28
console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
); // 2
console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
); // 7
console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); // 11
console.log(
  maximalSquare([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ])
); // 4
