// Grid Topological Sort - For dependency problems in grid
const alienOrder = (words) => {
  const graph = new Map();
  const inDegree = new Map();
  
  // Initialize graph
  for (const word of words) {
    for (const char of word) {
      if (!graph.has(char)) {
        graph.set(char, new Set());
        inDegree.set(char, 0);
      }
    }
  }
  
  // Build graph from word pairs
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    
    // Check if word1 is prefix of word2 but longer (invalid)
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return "";
    }
    
    // Find first different character
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        if (!graph.get(word1[j]).has(word2[j])) {
          graph.get(word1[j]).add(word2[j]);
          inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
        }
        break;
      }
    }
  }
  
  // Kahn's algorithm
  const queue = [];
  for (const [char, degree] of inDegree) {
    if (degree === 0) queue.push(char);
  }
  
  let result = "";
  
  while (queue.length) {
    const char = queue.shift();
    result += char;
    
    for (const neighbor of graph.get(char)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  return result.length === inDegree.size ? result : "";
};

// Course Schedule in Grid (2D dependencies)
const canFinishCourses2D = (grid) => {
  const [m, n] = [grid.length, grid[0].length];
  const inDegree = Array(m).fill().map(() => Array(n).fill(0));
  const queue = [];
  
  // Calculate in-degrees based on grid values
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) continue;
      
      for (const [dr, dc] of dirs) {
        const nr = i + dr, nc = j + dc;
        
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && 
            grid[nr][nc] > grid[i][j]) {
          inDegree[nr][nc]++;
        }
      }
    }
  }
  
  // Find all nodes with 0 in-degree
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] !== 0 && inDegree[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }
  
  let processed = 0;
  const result = [];
  
  while (queue.length) {
    const [r, c] = queue.shift();
    result.push([r, c]);
    processed++;
    
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && 
          grid[nr][nc] > grid[r][c]) {
        inDegree[nr][nc]--;
        if (inDegree[nr][nc] === 0) {
          queue.push([nr, nc]);
        }
      }
    }
  }
  
  // Count total non-zero cells
  let totalCells = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] !== 0) totalCells++;
    }
  }
  
  return processed === totalCells;
};

// Minimum Height Trees (Grid variant)
const findMinHeightTrees = (n, edges) => {
  if (n === 1) return [0];
  
  const graph = Array(n).fill().map(() => []);
  const degree = new Array(n).fill(0);
  
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
    degree[u]++;
    degree[v]++;
  }
  
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) queue.push(i);
  }
  
  let remaining = n;
  
  while (remaining > 2) {
    const size = queue.length;
    remaining -= size;
    const nextQueue = [];
    
    for (let i = 0; i < size; i++) {
      const node = queue[i];
      
      for (const neighbor of graph[node]) {
        degree[neighbor]--;
        if (degree[neighbor] === 1) {
          nextQueue.push(neighbor);
        }
      }
    }
    
    queue = nextQueue;
  }
  
  return queue;
};

// Parallel Courses (Topological sort with levels)
const minimumSemesters = (n, relations) => {
  const graph = Array(n + 1).fill().map(() => []);
  const inDegree = new Array(n + 1).fill(0);
  
  for (const [prev, next] of relations) {
    graph[prev].push(next);
    inDegree[next]++;
  }
  
  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  let semesters = 0;
  let completed = 0;
  
  while (queue.length) {
    const size = queue.length;
    semesters++;
    
    for (let i = 0; i < size; i++) {
      const course = queue.shift();
      completed++;
      
      for (const nextCourse of graph[course]) {
        inDegree[nextCourse]--;
        if (inDegree[nextCourse] === 0) {
          queue.push(nextCourse);
        }
      }
    }
  }
  
  return completed === n ? semesters : -1;
};

// Build Order (Project dependencies)
const findOrder = (numCourses, prerequisites) => {
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
  
  const result = [];
  
  while (queue.length) {
    const course = queue.shift();
    result.push(course);
    
    for (const nextCourse of graph[course]) {
      inDegree[nextCourse]--;
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }
  
  return result.length === numCourses ? result : [];
};

// Sequence Reconstruction
const sequenceReconstruction = (nums, sequences) => {
  const graph = new Map();
  const inDegree = new Map();
  
  // Initialize
  for (const num of nums) {
    graph.set(num, []);
    inDegree.set(num, 0);
  }
  
  // Build graph
  for (const seq of sequences) {
    for (let i = 0; i < seq.length - 1; i++) {
      const u = seq[i], v = seq[i + 1];
      
      if (!nums.includes(u) || !nums.includes(v)) return false;
      
      graph.get(u).push(v);
      inDegree.set(v, inDegree.get(v) + 1);
    }
  }
  
  // Topological sort
  const queue = [];
  for (const [num, degree] of inDegree) {
    if (degree === 0) queue.push(num);
  }
  
  const result = [];
  
  while (queue.length) {
    if (queue.length > 1) return false; // Must be unique
    
    const num = queue.shift();
    result.push(num);
    
    for (const neighbor of graph.get(num)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  return result.length === nums.length && 
         result.every((num, i) => num === nums[i]);
};

// Test Cases
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])); // "wertf"

const grid2D = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(canFinishCourses2D(grid2D)); // true

console.log(findMinHeightTrees(4, [[1,0],[1,2],[1,3]])); // [1]

console.log(minimumSemesters(3, [[1,3],[2,3]])); // 2

console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,1,2,3] or [0,2,1,3]