// 0/1 BFS - Shortest path in graph with weights 0 and 1
const bfs01 = (graph, start, end) => {
  const deque = [[start, 0]];
  const dist = { [start]: 0 };

  while (deque.length) {
    const [node, d] = deque.shift();

    if (node === end) return d;
    if (d > dist[node]) continue;

    for (const [neighbor, weight] of graph[node] || []) {
      const newDist = d + weight;

      if (dist[neighbor] === undefined || newDist < dist[neighbor]) {
        dist[neighbor] = newDist;

        if (weight === 0) {
          deque.unshift([neighbor, newDist]); // Add to front
        } else {
          deque.push([neighbor, newDist]); // Add to back
        }
      }
    }
  }

  return dist[end] ?? -1;
};

// Minimum Cost to Make at Least One Valid Path in a Grid
const minCost = (grid) => {
  const m = grid.length,
    n = grid[0].length;
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]; // right, left, down, up

  const deque = [[0, 0, 0]]; // [row, col, cost]
  const visited = new Set();

  while (deque.length) {
    const [x, y, cost] = deque.shift();

    if (x === m - 1 && y === n - 1) return cost;

    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (let dir = 0; dir < 4; dir++) {
      const [dx, dy] = dirs[dir];
      const nx = x + dx,
        ny = y + dy;

      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        const newCost = cost + (grid[x][y] === dir + 1 ? 0 : 1);
        const newKey = `${nx},${ny}`;

        if (!visited.has(newKey)) {
          if (grid[x][y] === dir + 1) {
            deque.unshift([nx, ny, newCost]); // Free move
          } else {
            deque.push([nx, ny, newCost]); // Costly move
          }
        }
      }
    }
  }

  return -1;
};

// Shortest Path in Binary Matrix
const shortestPathBinaryMatrix = (grid) => {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;

  const deque = [[0, 0, 1]]; // [row, col, distance]
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

  while (deque.length) {
    const [x, y, dist] = deque.shift();

    if (x === n - 1 && y === n - 1) return dist;

    for (const [dx, dy] of dirs) {
      const nx = x + dx,
        ny = y + dy;
      const key = `${nx},${ny}`;

      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < n &&
        grid[nx][ny] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key);
        deque.push([nx, ny, dist + 1]);
      }
    }
  }

  return -1;
};

// Minimum Knight Moves
const minKnightMoves = (x, y) => {
  x = Math.abs(x);
  y = Math.abs(y);

  const deque = [[0, 0, 0]];
  const visited = new Set(["0,0"]);

  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  while (deque.length) {
    const [cx, cy, steps] = deque.shift();

    if (cx === x && cy === y) return steps;

    for (const [dx, dy] of moves) {
      const nx = cx + dx,
        ny = cy + dy;
      const key = `${nx},${ny}`;

      // Optimization: stay in first quadrant with some buffer
      if (nx >= -1 && ny >= -1 && !visited.has(key)) {
        visited.add(key);
        deque.push([nx, ny, steps + 1]);
      }
    }
  }

  return -1;
};

// Sliding Puzzle
const slidingPuzzle = (board) => {
  const target = "123450";
  const start = board.flat().join("");

  if (start === target) return 0;

  const deque = [[start, 0]];
  const visited = new Set([start]);

  // Adjacent positions for each index in 1D representation
  const neighbors = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4],
    4: [1, 3, 5],
    5: [2, 4],
  };

  while (deque.length) {
    const [state, moves] = deque.shift();

    const zeroIdx = state.indexOf("0");

    for (const nextIdx of neighbors[zeroIdx]) {
      const chars = state.split("");
      [chars[zeroIdx], chars[nextIdx]] = [chars[nextIdx], chars[zeroIdx]];
      const newState = chars.join("");

      if (newState === target) return moves + 1;

      if (!visited.has(newState)) {
        visited.add(newState);
        deque.push([newState, moves + 1]);
      }
    }
  }

  return -1;
};

// Test Cases
const graph = {
  A: [
    ["B", 0],
    ["C", 1],
  ],
  B: [["D", 1]],
  C: [["D", 0]],
  D: [],
};
console.log(bfs01(graph, "A", "D")); // 1

console.log(
  minCost([
    [1, 1, 1, 1],
    [2, 2, 2, 2],
    [1, 1, 1, 1],
    [2, 2, 2, 2],
  ])
); // 3
console.log(
  shortestPathBinaryMatrix([
    [0, 1],
    [1, 0],
  ])
); // 2
console.log(minKnightMoves(2, 1)); // 1
console.log(
  slidingPuzzle([
    [1, 2, 3],
    [4, 0, 5],
  ])
); // 1
