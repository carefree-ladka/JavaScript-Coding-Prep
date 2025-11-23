// Prim's Algorithm for Minimum Spanning Tree
const prim = (graph, start = 0) => {
  const visited = new Set();
  const mst = [];
  let totalWeight = 0;
  
  // Priority queue: [weight, from, to]
  const pq = [[0, start, start]];
  
  while (pq.length && visited.size < Object.keys(graph).length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [weight, from, to] = pq.shift();
    
    if (visited.has(to)) continue;
    
    visited.add(to);
    if (from !== to) {
      mst.push([from, to, weight]);
      totalWeight += weight;
    }
    
    // Add all edges from current node
    for (const [neighbor, edgeWeight] of graph[to] || []) {
      if (!visited.has(neighbor)) {
        pq.push([edgeWeight, to, neighbor]);
      }
    }
  }
  
  return { mst, totalWeight };
};

// Prim's with adjacency matrix
const primMatrix = (matrix) => {
  const n = matrix.length;
  const visited = new Array(n).fill(false);
  const key = new Array(n).fill(Infinity);
  const parent = new Array(n).fill(-1);
  
  key[0] = 0;
  let totalWeight = 0;
  
  for (let count = 0; count < n; count++) {
    // Find minimum key vertex
    let minKey = Infinity, u = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }
    
    visited[u] = true;
    totalWeight += key[u];
    
    // Update key values of adjacent vertices
    for (let v = 0; v < n; v++) {
      if (matrix[u][v] && !visited[v] && matrix[u][v] < key[v]) {
        parent[v] = u;
        key[v] = matrix[u][v];
      }
    }
  }
  
  const mst = [];
  for (let i = 1; i < n; i++) {
    mst.push([parent[i], i, matrix[i][parent[i]]]);
  }
  
  return { mst, totalWeight };
};

// Optimize Water Distribution in a Village
const minCostToSupplyWater = (n, wells, pipes) => {
  // Add virtual node 0 connected to all wells
  const edges = [];
  
  // Wells as edges from virtual node 0
  for (let i = 0; i < wells.length; i++) {
    edges.push([0, i + 1, wells[i]]);
  }
  
  // Pipes as regular edges
  for (const [house1, house2, cost] of pipes) {
    edges.push([house1, house2, cost]);
  }
  
  // Use Kruskal's algorithm
  edges.sort((a, b) => a[2] - b[2]);
  
  const parent = Array(n + 1).fill().map((_, i) => i);
  
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };
  
  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootX] = rootY;
      return true;
    }
    return false;
  };
  
  let totalCost = 0;
  let edgesUsed = 0;
  
  for (const [u, v, cost] of edges) {
    if (union(u, v)) {
      totalCost += cost;
      edgesUsed++;
      if (edgesUsed === n) break;
    }
  }
  
  return totalCost;
};

// Test Cases
const graph = {
  0: [[1, 2], [3, 6]],
  1: [[0, 2], [2, 3], [3, 8], [4, 5]],
  2: [[1, 3], [4, 7]],
  3: [[0, 6], [1, 8]],
  4: [[1, 5], [2, 7]]
};

console.log(prim(graph, 0));
// { mst: [[0, 1, 2], [1, 2, 3], [1, 4, 5], [0, 3, 6]], totalWeight: 16 }

const matrix = [
  [0, 2, 0, 6, 0],
  [2, 0, 3, 8, 5],
  [0, 3, 0, 0, 7],
  [6, 8, 0, 0, 9],
  [0, 5, 7, 9, 0]
];

console.log(primMatrix(matrix));
// { mst: [[0, 1, 2], [1, 2, 3], [1, 4, 5], [0, 3, 6]], totalWeight: 16 }