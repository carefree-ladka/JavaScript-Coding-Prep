// Shell Sort - O(n log n) to O(n²) depending on gap sequence
const shellSort = (arr) => {
  const n = arr.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Perform gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      // Shift earlier gap-sorted elements up until correct location
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
  }
  
  return arr;
};

// Shell Sort with Knuth's gap sequence (3k + 1)
const shellSortKnuth = (arr) => {
  const n = arr.length;
  
  // Generate gap sequence: 1, 4, 13, 40, 121, ...
  let gap = 1;
  while (gap < n / 3) {
    gap = gap * 3 + 1;
  }
  
  while (gap >= 1) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
    
    gap = Math.floor(gap / 3);
  }
  
  return arr;
};

// Shell Sort with Sedgewick's gap sequence
const shellSortSedgewick = (arr) => {
  const n = arr.length;
  
  // Sedgewick gaps: 1, 5, 19, 41, 109, ...
  const gaps = [];
  let k = 0;
  while (true) {
    let gap;
    if (k % 2 === 0) {
      gap = 9 * Math.pow(2, k) - 9 * Math.pow(2, k / 2) + 1;
    } else {
      gap = 8 * Math.pow(2, k) - 6 * Math.pow(2, (k + 1) / 2) + 1;
    }
    
    if (gap >= n) break;
    gaps.push(gap);
    k++;
  }
  
  // Sort with each gap
  for (let g = gaps.length - 1; g >= 0; g--) {
    const gap = gaps[g];
    
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
  }
  
  return arr;
};

// Test Cases
console.log(shellSort([12, 34, 54, 2, 3])); // [2, 3, 12, 34, 54]
console.log(shellSortKnuth([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(shellSortSedgewick([9, 8, 7, 6, 5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]