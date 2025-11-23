// Dijkstra's Algorithm
const dijkstra = (graph, start) => {
  const distances = {};
  const previous = {};
  const pq = [[0, start]];
  
  // Initialize distances
  for (const node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
  }
  
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [currentDist, current] = pq.shift();
    
    if (currentDist > distances[current]) continue;
    
    for (const [neighbor, weight] of graph[current] || []) {
      const newDist = distances[current] + weight;
      
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = current;
        pq.push([newDist, neighbor]);
      }
    }
  }
  
  return { distances, previous };
};

// Get shortest path
const getShortestPath = (previous, start, end) => {
  const path = [];
  let current = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path[0] === start ? path : [];
};

// Network Delay Time
const networkDelayTime = (times, n, k) => {
  const graph = {};
  
  for (const [u, v, w] of times) {
    if (!graph[u]) graph[u] = [];
    graph[u].push([v, w]);
  }
  
  const { distances } = dijkstra(graph, k);
  
  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (distances[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, distances[i]);
  }
  
  return maxTime;
};

// Test Cases
const graph = {
  'A': [['B', 4], ['C', 2]],
  'B': [['C', 1], ['D', 5]],
  'C': [['D', 8], ['E', 10]],
  'D': [['E', 2]],
  'E': []
};

const result = dijkstra(graph, 'A');
console.log(result.distances); // {A: 0, B: 4, C: 2, D: 9, E: 11}
console.log(getShortestPath(result.previous, 'A', 'E')); // ['A', 'C', 'B', 'D', 'E']