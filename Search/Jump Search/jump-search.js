// Jump Search - Block-based search algorithm
const jumpSearch = (arr, target) => {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  // Find block where element is present
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  // Linear search in identified block
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  
  return arr[prev] === target ? prev : -1;
};

// Optimized Jump Search
const jumpSearchOptimized = (arr, target) => {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0, curr = step;
  
  // Jump through blocks
  while (curr < n && arr[curr] < target) {
    prev = curr;
    curr += step;
  }
  
  // Linear search in the identified block
  for (let i = prev; i < Math.min(curr, n); i++) {
    if (arr[i] === target) return i;
  }
  
  return -1;
};

// Test Cases
console.log(jumpSearch([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610], 55)); // 10
console.log(jumpSearchOptimized([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], 13)); // 7