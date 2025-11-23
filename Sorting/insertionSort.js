// Insertion Sort - O(n²) time, O(1) space, stable
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
};

// Binary Insertion Sort - O(n² log n) comparisons, O(n²) shifts
const binaryInsertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let left = 0, right = i;
    
    // Binary search for insertion position
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] > key) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    
    // Shift elements and insert
    for (let j = i; j > left; j--) {
      arr[j] = arr[j - 1];
    }
    arr[left] = key;
  }
  
  return arr;
};

// Test Cases
console.log(insertionSort([12, 11, 13, 5, 6])); // [5, 6, 11, 12, 13]
console.log(binaryInsertionSort([37, 23, 0, 17, 12, 72, 31])); // [0, 12, 17, 23, 31, 37, 72]