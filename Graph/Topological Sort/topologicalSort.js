// Topological Sort - DFS and Kahn's Algorithm
const topologicalSortDFS = (graph) => {
  const visited = new Set();
  const stack = [];
  
  const dfs = (node) => {
    visited.add(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    stack.push(node);
  };
  
  for (const node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }
  
  return stack.reverse();
};

// Kahn's Algorithm (BFS approach)
const topologicalSortKahn = (graph, vertices) => {
  const inDegree = new Array(vertices).fill(0);
  const adjList = Array(vertices).fill().map(() => []);
  
  // Build adjacency list and calculate in-degrees
  for (const node in graph) {
    for (const neighbor of graph[node] || []) {
      adjList[node].push(neighbor);
      inDegree[neighbor]++;
    }
  }
  
  const queue = [];
  for (let i = 0; i < vertices; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const result = [];
  
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    
    for (const neighbor of adjList[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  return result.length === vertices ? result : []; // Empty if cycle exists
};

// Course Schedule
const canFinish = (numCourses, prerequisites) => {
  const graph = Array(numCourses).fill().map(() => []);
  const inDegree = new Array(numCourses).fill(0);
  
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  let completed = 0;
  
  while (queue.length) {
    const course = queue.shift();
    completed++;
    
    for (const nextCourse of graph[course]) {
      inDegree[nextCourse]--;
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }
  
  return completed === numCourses;
};

// Test Cases
const graph = {
  5: [2, 0],
  4: [0, 1],
  2: [3],
  3: [1],
  1: [],
  0: []
};

console.log(topologicalSortDFS(graph)); // [5, 4, 2, 3, 1, 0]
console.log(topologicalSortKahn(graph, 6)); // [4, 5, 0, 2, 3, 1]
console.log(canFinish(2, [[1,0]])); // true