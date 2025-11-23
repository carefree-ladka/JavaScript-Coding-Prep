// DFS Traversal - Recursive and Iterative
const dfsRecursive = (graph, start, visited = new Set()) => {
  visited.add(start);
  const result = [start];
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      result.push(...dfsRecursive(graph, neighbor, visited));
    }
  }
  return result;
};

const dfsIterative = (graph, start) => {
  const stack = [start];
  const visited = new Set();
  const result = [];
  
  while (stack.length) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      
      for (const neighbor of graph[node] || []) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  return result;
};

// Connected Components
const connectedComponents = (graph) => {
  const visited = new Set();
  const components = [];
  
  for (const node in graph) {
    if (!visited.has(node)) {
      const component = dfsRecursive(graph, node, visited);
      components.push(component);
    }
  }
  return components;
};

// Test Cases
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1],
  4: [5],
  5: [4]
};
console.log(dfsRecursive(graph, 0)); // [0, 1, 3, 2]
console.log(dfsIterative(graph, 0)); // [0, 2, 1, 3]
console.log(connectedComponents(graph)); // [[0, 1, 3, 2], [4, 5]]