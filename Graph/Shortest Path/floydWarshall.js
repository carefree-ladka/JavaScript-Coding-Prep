// Floyd-Warshall Algorithm (All pairs shortest path)
const floydWarshall = (graph) => {
  const n = graph.length;
  const dist = graph.map(row => [...row]);
  
  // Initialize
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) dist[i][j] = 0;
      else if (dist[i][j] === 0) dist[i][j] = Infinity;
    }
  }
  
  // Floyd-Warshall
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  
  return dist;
};

// Find the City With the Smallest Number of Neighbors
const findTheCity = (n, edges, distanceThreshold) => {
  const graph = Array(n).fill().map(() => Array(n).fill(Infinity));
  
  for (let i = 0; i < n; i++) graph[i][i] = 0;
  
  for (const [from, to, weight] of edges) {
    graph[from][to] = weight;
    graph[to][from] = weight;
  }
  
  const dist = floydWarshall(graph);
  
  let minCount = n, result = 0;
  
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] <= distanceThreshold) count++;
    }
    
    if (count <= minCount) {
      minCount = count;
      result = i;
    }
  }
  
  return result;
};

// Test Cases
const graph = [
  [0, 3, 8, Infinity, -4],
  [Infinity, 0, Infinity, 1, 7],
  [Infinity, 4, 0, Infinity, Infinity],
  [2, Infinity, -5, 0, Infinity],
  [Infinity, Infinity, Infinity, 6, 0]
];

console.log(floydWarshall(graph));

const edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]];
console.log(findTheCity(4, edges, 4)); // 3