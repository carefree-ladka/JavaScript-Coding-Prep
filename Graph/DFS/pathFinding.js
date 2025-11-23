// Path Finding using DFS
const hasPath = (graph, start, end, visited = new Set()) => {
  if (start === end) return true;
  if (visited.has(start)) return false;
  
  visited.add(start);
  
  for (const neighbor of graph[start] || []) {
    if (hasPath(graph, neighbor, end, visited)) return true;
  }
  return false;
};

const findAllPaths = (graph, start, end, path = [], visited = new Set()) => {
  if (start === end) return [path.concat(end)];
  if (visited.has(start)) return [];
  
  visited.add(start);
  const paths = [];
  
  for (const neighbor of graph[start] || []) {
    const newPaths = findAllPaths(graph, neighbor, end, path.concat(start), visited);
    paths.push(...newPaths);
  }
  
  visited.delete(start);
  return paths;
};

// Number of Islands
const numIslands = (grid) => {
  if (!grid.length) return 0;
  
  const m = grid.length, n = grid[0].length;
  let count = 0;
  
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return;
    
    grid[i][j] = '0';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
};

// Test Cases
const graph = {
  'A': ['B', 'C'],
  'B': ['D'],
  'C': ['D'],
  'D': []
};
console.log(hasPath(graph, 'A', 'D')); // true
console.log(findAllPaths(graph, 'A', 'D')); // [['A', 'B', 'D'], ['A', 'C', 'D']]

const grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
console.log(numIslands(grid)); // 1