// A* Algorithm for Grid Pathfinding
const aStarGrid = (grid, start, end) => {
  const [m, n] = [grid.length, grid[0].length];
  const [startR, startC] = start;
  const [endR, endC] = end;

  const heuristic = (r, c) => Math.abs(r - endR) + Math.abs(c - endC); // Manhattan distance

  const openSet = [[heuristic(startR, startC), 0, startR, startC]]; // [f, g, r, c]
  const gScore = Array(m)
    .fill()
    .map(() => Array(n).fill(Infinity));
  const visited = new Set();
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  gScore[startR][startC] = 0;

  while (openSet.length) {
    openSet.sort((a, b) => a[0] - b[0]);
    const [f, g, r, c] = openSet.shift();
    const key = `${r},${c}`;

    if (r === endR && c === endC) return g;
    if (visited.has(key)) continue;

    visited.add(key);

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;

      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        const tentativeG = g + 1;

        if (tentativeG < gScore[nr][nc]) {
          gScore[nr][nc] = tentativeG;
          const h = heuristic(nr, nc);
          openSet.push([tentativeG + h, tentativeG, nr, nc]);
        }
      }
    }
  }

  return -1;
};

// Jump Game IV (BFS with optimization)
const minJumps = (arr) => {
  const n = arr.length;
  if (n <= 1) return 0;

  const graph = new Map();

  // Build graph of same values
  for (let i = 0; i < n; i++) {
    if (!graph.has(arr[i])) graph.set(arr[i], []);
    graph.get(arr[i]).push(i);
  }

  const queue = [[0, 0]]; // [index, steps]
  const visited = new Set([0]);

  while (queue.length) {
    const [idx, steps] = queue.shift();

    if (idx === n - 1) return steps;

    // Adjacent moves
    for (const next of [idx - 1, idx + 1]) {
      if (next >= 0 && next < n && !visited.has(next)) {
        visited.add(next);
        queue.push([next, steps + 1]);
      }
    }

    // Same value jumps
    if (graph.has(arr[idx])) {
      for (const next of graph.get(arr[idx])) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push([next, steps + 1]);
        }
      }
      graph.delete(arr[idx]); // Optimization: remove to avoid revisiting
    }
  }

  return -1;
};

// Shortest Path to Get Food
const getFood = (grid) => {
  const [m, n] = [grid.length, grid[0].length];
  let start = null;

  // Find starting position
  for (let i = 0; i < m && !start; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "*") {
        start = [i, j];
        break;
      }
    }
  }

  const queue = [[...start, 0]];
  const visited = new Set([`${start[0]},${start[1]}`]);
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length) {
    const [r, c, dist] = queue.shift();

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      const key = `${nr},${nc}`;

      if (
        nr >= 0 &&
        nr < m &&
        nc >= 0 &&
        nc < n &&
        grid[nr][nc] !== "X" &&
        !visited.has(key)
      ) {
        if (grid[nr][nc] === "#") return dist + 1;

        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1;
};

// Cut Off Trees for Golf Event
const cutOffTree = (forest) => {
  const [m, n] = [forest.length, forest[0].length];
  const trees = [];

  // Collect all trees
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (forest[i][j] > 1) {
        trees.push([forest[i][j], i, j]);
      }
    }
  }

  trees.sort((a, b) => a[0] - b[0]); // Sort by height

  const bfs = (start, end) => {
    const [sr, sc] = start;
    const [er, ec] = end;

    if (sr === er && sc === ec) return 0;

    const queue = [[sr, sc, 0]];
    const visited = new Set([`${sr},${sc}`]);
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (queue.length) {
      const [r, c, dist] = queue.shift();

      for (const [dr, dc] of dirs) {
        const nr = r + dr,
          nc = c + dc;
        const key = `${nr},${nc}`;

        if (
          nr >= 0 &&
          nr < m &&
          nc >= 0 &&
          nc < n &&
          forest[nr][nc] !== 0 &&
          !visited.has(key)
        ) {
          if (nr === er && nc === ec) return dist + 1;

          visited.add(key);
          queue.push([nr, nc, dist + 1]);
        }
      }
    }

    return -1;
  };

  let totalSteps = 0;
  let current = [0, 0];

  for (const [height, r, c] of trees) {
    const steps = bfs(current, [r, c]);
    if (steps === -1) return -1;

    totalSteps += steps;
    current = [r, c];
    forest[r][c] = 1; // Cut the tree
  }

  return totalSteps;
};

// Escape the Spreading Fire
const maximumMinutes = (grid) => {
  const [m, n] = [grid.length, grid[0].length];

  const bfs = (delay) => {
    const fireQueue = [];
    const personQueue = [[0, 0, delay]];
    const fireTime = Array(m)
      .fill()
      .map(() => Array(n).fill(Infinity));
    const visited = new Set();

    // Initialize fire positions
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1) {
          fireQueue.push([i, j, 0]);
          fireTime[i][j] = 0;
        }
      }
    }

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    // Spread fire
    while (fireQueue.length) {
      const [r, c, time] = fireQueue.shift();

      for (const [dr, dc] of dirs) {
        const nr = r + dr,
          nc = c + dc;

        if (
          nr >= 0 &&
          nr < m &&
          nc >= 0 &&
          nc < n &&
          grid[nr][nc] === 0 &&
          time + 1 < fireTime[nr][nc]
        ) {
          fireTime[nr][nc] = time + 1;
          fireQueue.push([nr, nc, time + 1]);
        }
      }
    }

    // Person movement
    while (personQueue.length) {
      const [r, c, time] = personQueue.shift();
      const key = `${r},${c}`;

      if (r === m - 1 && c === n - 1) {
        return (
          time < fireTime[r][c] ||
          (time === fireTime[r][c] && fireTime[r][c] === Infinity)
        );
      }

      if (visited.has(key) || time >= fireTime[r][c]) continue;
      visited.add(key);

      for (const [dr, dc] of dirs) {
        const nr = r + dr,
          nc = c + dc;

        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 0) {
          personQueue.push([nr, nc, time + 1]);
        }
      }
    }

    return false;
  };

  let left = 0,
    right = m * n;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (bfs(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result >= m * n ? 1000000000 : result;
};

// Test Cases
const grid1 = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 0, 0],
];
console.log(aStarGrid(grid1, [0, 0], [2, 2])); // 4

console.log(minJumps([100, -23, -23, 404, 100, 23, 23, 23, 3, 404])); // 3

const foodGrid = [
  ["X", "X", "X", "X", "X", "X"],
  ["X", "*", "O", "O", "O", "X"],
  ["X", "O", "O", "#", "O", "X"],
  ["X", "X", "X", "X", "X", "X"],
];
console.log(getFood(foodGrid)); // 3
