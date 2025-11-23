// Cycle Detection in Undirected Graph
const hasCycleUndirected = (graph) => {
  const visited = new Set();

  const dfs = (node, parent) => {
    visited.add(node);

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // Back edge found
      }
    }
    return false;
  };

  for (const node in graph) {
    if (!visited.has(node)) {
      if (dfs(node, -1)) return true;
    }
  }
  return false;
};

// Using Union Find
const hasCycleUndirectedUF = (edges, n) => {
  const parent = Array.from({ length: n }, (_, i) => i);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return false; // Cycle detected

    parent[rootX] = rootY;
    return true;
  };

  for (const [u, v] of edges) {
    if (!union(u, v)) return true;
  }
  return false;
};

// Surrounded Regions
const solve = (board) => {
  if (!board.length) return;

  const m = board.length,
    n = board[0].length;

  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== "O") return;

    board[i][j] = "T"; // Temporary mark
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
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

  // Convert remaining 'O' to 'X' and 'T' back to 'O'
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "O") board[i][j] = "X";
      else if (board[i][j] === "T") board[i][j] = "O";
    }
  }
};

// Test Cases
const graph = {
  0: [1, 2],
  1: [0, 2],
  2: [0, 1, 3],
  3: [2],
};
console.log(hasCycleUndirected(graph)); // true

const edges = [
  [0, 1],
  [1, 2],
  [2, 0],
];
console.log(hasCycleUndirectedUF(edges, 3)); // true
