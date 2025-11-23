// Bubble Sort - O(n²) time, O(1) space
const bubbleSort = (arr) => {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    if (!swapped) break; // Optimization: early exit if sorted
  }
  
  return arr;
};

// Test Cases
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(bubbleSort([5, 1, 4, 2, 8])); // [1, 2, 4, 5, 8]
console.log(bubbleSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5] (already sorted)