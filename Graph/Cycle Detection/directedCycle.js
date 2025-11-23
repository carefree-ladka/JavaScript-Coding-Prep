// Cycle Detection in Directed Graph
const hasCycleDirected = (graph) => {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const colors = {};
  
  // Initialize all nodes as WHITE
  for (const node in graph) {
    colors[node] = WHITE;
  }
  
  const dfs = (node) => {
    colors[node] = GRAY; // Mark as visiting
    
    for (const neighbor of graph[node] || []) {
      if (colors[neighbor] === GRAY) return true; // Back edge (cycle)
      if (colors[neighbor] === WHITE && dfs(neighbor)) return true;
    }
    
    colors[node] = BLACK; // Mark as visited
    return false;
  };
  
  for (const node in graph) {
    if (colors[node] === WHITE) {
      if (dfs(node)) return true;
    }
  }
  return false;
};

// Using DFS with recursion stack
const hasCycleDirectedStack = (graph) => {
  const visited = new Set();
  const recStack = new Set();
  
  const dfs = (node) => {
    visited.add(node);
    recStack.add(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true; // Cycle detected
      }
    }
    
    recStack.delete(node);
    return false;
  };
  
  for (const node in graph) {
    if (!visited.has(node)) {
      if (dfs(node)) return true;
    }
  }
  return false;
};

// Course Schedule (Cycle Detection)
const canFinishCourses = (numCourses, prerequisites) => {
  const graph = Array(numCourses).fill().map(() => []);
  
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }
  
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const colors = new Array(numCourses).fill(WHITE);
  
  const dfs = (node) => {
    colors[node] = GRAY;
    
    for (const neighbor of graph[node]) {
      if (colors[neighbor] === GRAY) return false; // Cycle
      if (colors[neighbor] === WHITE && !dfs(neighbor)) return false;
    }
    
    colors[node] = BLACK;
    return true;
  };
  
  for (let i = 0; i < numCourses; i++) {
    if (colors[i] === WHITE) {
      if (!dfs(i)) return false;
    }
  }
  return true;
};

// Find Eventual Safe States
const eventualSafeNodes = (graph) => {
  const n = graph.length;
  const colors = new Array(n).fill(0); // 0: white, 1: gray, 2: black
  
  const dfs = (node) => {
    if (colors[node] !== 0) return colors[node] === 2;
    
    colors[node] = 1;
    for (const neighbor of graph[node]) {
      if (!dfs(neighbor)) {
        return false;
      }
    }
    colors[node] = 2;
    return true;
  };
  
  const result = [];
  for (let i = 0; i < n; i++) {
    if (dfs(i)) result.push(i);
  }
  return result;
};

// Test Cases
const directedGraph = {
  0: [1],
  1: [2],
  2: [0], // Creates cycle: 0 -> 1 -> 2 -> 0
  3: [4],
  4: []
};
console.log(hasCycleDirected(directedGraph)); // true
console.log(hasCycleDirectedStack(directedGraph)); // true

console.log(canFinishCourses(2, [[1,0],[0,1]])); // false (cycle)
console.log(eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])); // [2,4,5,6]