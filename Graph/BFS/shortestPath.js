// Shortest Path in Unweighted Graph using BFS
const shortestPath = (graph, start, end) => {
  const queue = [[start, [start]]];
  const visited = new Set([start]);
  
  while (queue.length) {
    const [node, path] = queue.shift();
    
    if (node === end) return path;
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return [];
};

// Shortest Distance
const shortestDistance = (graph, start, end) => {
  const queue = [[start, 0]];
  const visited = new Set([start]);
  
  while (queue.length) {
    const [node, dist] = queue.shift();
    
    if (node === end) return dist;
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
};

// Test Cases
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3],
  3: [1, 2, 4],
  4: [3]
};
console.log(shortestPath(graph, 0, 4)); // [0, 1, 3, 4]
console.log(shortestDistance(graph, 0, 4)); // 3