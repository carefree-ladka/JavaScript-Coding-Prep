// Level Order Traversal (Multi-source BFS)
const levelOrder = (graph, sources) => {
  const queue = sources.map(s => [s, 0]);
  const visited = new Set(sources);
  const levels = [];
  
  while (queue.length) {
    const [node, level] = queue.shift();
    
    if (!levels[level]) levels[level] = [];
    levels[level].push(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, level + 1]);
      }
    }
  }
  return levels;
};

// 01 Matrix - Distance to nearest 0
const updateMatrix = (mat) => {
  const m = mat.length, n = mat[0].length;
  const queue = [];
  const dist = Array(m).fill().map(() => Array(n).fill(Infinity));
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }
  
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  
  while (queue.length) {
    const [x, y] = queue.shift();
    
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        if (dist[nx][ny] > dist[x][y] + 1) {
          dist[nx][ny] = dist[x][y] + 1;
          queue.push([nx, ny]);
        }
      }
    }
  }
  return dist;
};

// Test Cases
console.log(updateMatrix([[0,0,0],[0,1,0],[0,0,0]])); // [[0,0,0],[0,1,0],[0,0,0]]
console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]])); // [[0,0,0],[0,1,0],[1,2,1]]