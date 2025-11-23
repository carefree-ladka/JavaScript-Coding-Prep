// Sentinel Linear Search - Optimized linear search
const sentinelSearch = (arr, target) => {
  const n = arr.length;
  const last = arr[n - 1];
  
  // Set target as sentinel at end
  arr[n - 1] = target;
  let i = 0;
  
  // Search without bound checking
  while (arr[i] !== target) {
    i++;
  }
  
  // Restore last element
  arr[n - 1] = last;
  
  // Check if target was found or was sentinel
  return (i < n - 1 || arr[n - 1] === target) ? i : -1;
};

// Sentinel Search with Original Array Preservation
const sentinelSearchSafe = (arr, target) => {
  const copy = [...arr];
  return sentinelSearch(copy, target);
};

// Test Cases
console.log(sentinelSearchSafe([10, 20, 80, 30, 60, 50, 110, 100, 130, 170], 110)); // 6
console.log(sentinelSearchSafe([10, 20, 80, 30, 60, 50, 110, 100, 130, 170], 175)); // -1