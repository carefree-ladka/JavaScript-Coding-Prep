// Heap Sort - O(n log n) time, O(1) space, not stable
const heapSort = (arr) => {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Move current root to end
    heapify(arr, i, 0); // Heapify reduced heap
  }
  
  return arr;
};

const heapify = (arr, n, i) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
};

// Min Heap Sort (ascending order)
const minHeapSort = (arr) => {
  const n = arr.length;
  
  // Build min heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    minHeapify(arr, n, i);
  }
  
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    minHeapify(arr, i, 0);
  }
  
  return arr.reverse(); // Reverse for ascending order
};

const minHeapify = (arr, n, i) => {
  let smallest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] < arr[smallest]) {
    smallest = left;
  }
  
  if (right < n && arr[right] < arr[smallest]) {
    smallest = right;
  }
  
  if (smallest !== i) {
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    minHeapify(arr, n, smallest);
  }
};

// Test Cases
console.log(heapSort([12, 11, 13, 5, 6, 7])); // [5, 6, 7, 11, 12, 13]
console.log(heapSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]