// Grid Dijkstra - Weighted shortest path in grid
const gridDijkstra = (grid, start, end) => {
  const [m, n] = [grid.length, grid[0].length];
  const [startR, startC] = start;
  const [endR, endC] = end;

  const dist = Array(m)
    .fill()
    .map(() => Array(n).fill(Infinity));
  const pq = [[0, startR, startC]]; // [distance, row, col]
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  dist[startR][startC] = 0;

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = pq.shift();

    if (r === endR && c === endC) return d;
    if (d > dist[r][c]) continue;

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;

      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const newDist = dist[r][c] + grid[nr][nc];

        if (newDist < dist[nr][nc]) {
          dist[nr][nc] = newDist;
          pq.push([newDist, nr, nc]);
        }
      }
    }
  }

  return -1;
};

// Path with Minimum Effort
const minimumEffortPath = (heights) => {
  const [m, n] = [heights.length, heights[0].length];
  const dist = Array(m)
    .fill()
    .map(() => Array(n).fill(Infinity));
  const pq = [[0, 0, 0]]; // [effort, row, col]
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  dist[0][0] = 0;

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [effort, r, c] = pq.shift();

    if (r === m - 1 && c === n - 1) return effort;
    if (effort > dist[r][c]) continue;

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;

      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const newEffort = Math.max(
          effort,
          Math.abs(heights[nr][nc] - heights[r][c])
        );

        if (newEffort < dist[nr][nc]) {
          dist[nr][nc] = newEffort;
          pq.push([newEffort, nr, nc]);
        }
      }
    }
  }

  return 0;
};

// Swim in Rising Water
const swimInWater = (grid) => {
  const n = grid.length;
  const pq = [[grid[0][0], 0, 0]]; // [time, row, col]
  const visited = new Set(["0,0"]);
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [time, r, c] = pq.shift();

    if (r === n - 1 && c === n - 1) return time;

    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      const key = `${nr},${nc}`;

      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited.has(key)) {
        visited.add(key);
        pq.push([Math.max(time, grid[nr][nc]), nr, nc]);
      }
    }
  }

  return -1;
};

// Cheapest Flights Within K Stops (Grid-like state space)
const findCheapestPrice = (n, flights, src, dst, k) => {
  const graph = Array(n)
    .fill()
    .map(() => []);

  for (const [from, to, price] of flights) {
    graph[from].push([to, price]);
  }

  const pq = [[0, src, k + 1]]; // [cost, city, stops_left]
  const visited = new Map();

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, city, stops] = pq.shift();

    if (city === dst) return cost;

    const key = `${city},${stops}`;
    if (visited.has(key) && visited.get(key) <= cost) continue;
    visited.set(key, cost);

    if (stops > 0) {
      for (const [nextCity, price] of graph[city]) {
        pq.push([cost + price, nextCity, stops - 1]);
      }
    }
  }

  return -1;
};

// Network Delay Time
const networkDelayTime = (times, n, k) => {
  const graph = Array(n + 1)
    .fill()
    .map(() => []);

  for (const [u, v, w] of times) {
    graph[u].push([v, w]);
  }

  const dist = new Array(n + 1).fill(Infinity);
  const pq = [[0, k]]; // [time, node]

  dist[k] = 0;

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [time, node] = pq.shift();

    if (time > dist[node]) continue;

    for (const [neighbor, weight] of graph[node]) {
      const newTime = time + weight;

      if (newTime < dist[neighbor]) {
        dist[neighbor] = newTime;
        pq.push([newTime, neighbor]);
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }

  return maxTime;
};

// The Maze (Grid Dijkstra with rolling ball)
const hasPath = (maze, start, destination) => {
  const [m, n] = [maze.length, maze[0].length];
  const visited = new Set();
  const queue = [start];
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length) {
    const [r, c] = queue.shift();
    const key = `${r},${c}`;

    if (r === destination[0] && c === destination[1]) return true;
    if (visited.has(key)) continue;

    visited.add(key);

    for (const [dr, dc] of dirs) {
      let nr = r,
        nc = c;

      // Roll until hitting wall
      while (nr >= 0 && nr < m && nc >= 0 && nc < n && maze[nr][nc] === 0) {
        nr += dr;
        nc += dc;
      }

      // Step back to last valid position
      nr -= dr;
      nc -= dc;

      queue.push([nr, nc]);
    }
  }

  return false;
};

// Test Cases
const weightedGrid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
console.log(gridDijkstra(weightedGrid, [0, 0], [2, 2])); // 7

const heights = [
  [1, 2, 2],
  [3, 8, 2],
  [5, 3, 5],
];
console.log(minimumEffortPath(heights)); // 2

console.log(
  swimInWater([
    [0, 2],
    [1, 3],
  ])
); // 3

const flights = [
  [0, 1, 100],
  [1, 2, 100],
  [0, 2, 500],
];
console.log(findCheapestPrice(3, flights, 0, 2, 1)); // 200
