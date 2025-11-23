// Grid BFS - Basic Template
const gridBFS = (grid, start, end) => {
  const [m, n] = [grid.length, grid[0].length];
  const [startR, startC] = start;
  const [endR, endC] = end;

  const queue = [[startR, startC, 0]];
  const visited = new Set([`${startR},${startC}`]);
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length) {
    const [r, c, dist] = queue.shift();

    if (r === endR && c === endC) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      const key = `${nr},${nc}`;

      if (
        nr >= 0 &&
        nr < m &&
        nc >= 0 &&
        nc < n &&
        grid[nr][nc] !== 1 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1;
};

// Shortest Path in Binary Matrix
const shortestPathBinaryMatrix = (grid) => {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;

  const queue = [[0, 0, 1]];
  const visited = new Set(["0,0"]);
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  while (queue.length) {
    const [r, c, dist] = queue.shift();

    if (r === n - 1 && c === n - 1) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      const key = `${nr},${nc}`;

      if (
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < n &&
        grid[nr][nc] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1;
};

// Rotting Oranges - Multi-source BFS
const orangesRotting = (grid) => {
  const [m, n] = [grid.length, grid[0].length];
  const queue = [];
  let fresh = 0;

  // Find all rotten oranges and count fresh ones
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j, 0]);
      else if (grid[i][j] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let minutes = 0;

  while (queue.length) {
    const [r, c, time] = queue.shift();
    minutes = time;

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;

      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc, time + 1]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
};

// Walls and Gates - Multi-source BFS
const wallsAndGates = (rooms) => {
  const [m, n] = [rooms.length, rooms[0].length];
  const queue = [];
  const INF = 2147483647;

  // Find all gates
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === 0) queue.push([i, j]);
    }
  }

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length) {
    const [r, c] = queue.shift();

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;

      if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] === INF) {
        rooms[nr][nc] = rooms[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
};

// As Far from Land as Possible
const maxDistance = (grid) => {
  const n = grid.length;
  const queue = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) queue.push([i, j]);
    }
  }

  if (queue.length === 0 || queue.length === n * n) return -1;

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let maxDist = -1;

  while (queue.length) {
    const [r, c] = queue.shift();

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;

      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = grid[r][c] + 1;
        maxDist = Math.max(maxDist, grid[nr][nc] - 1);
        queue.push([nr, nc]);
      }
    }
  }

  return maxDist;
};

// Test Cases
const grid1 = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 0, 0],
];
console.log(gridBFS(grid1, [0, 0], [2, 2])); // 4

console.log(
  shortestPathBinaryMatrix([
    [0, 1],
    [1, 0],
  ])
); // 2

const oranges = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];
console.log(orangesRotting(oranges)); // 4

console.log(
  maxDistance([
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ])
); // 2
