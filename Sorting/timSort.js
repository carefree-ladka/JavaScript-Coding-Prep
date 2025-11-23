// Tim Sort - Hybrid stable sorting algorithm (used in Python and Java)
// Combines merge sort and insertion sort
const timSort = (arr) => {
  const MIN_MERGE = 32;
  const n = arr.length;
  
  // Sort individual subarrays of size MIN_MERGE using insertion sort
  for (let i = 0; i < n; i += MIN_MERGE) {
    insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
  }
  
  // Start merging from size MIN_MERGE
  let size = MIN_MERGE;
  while (size < n) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size - 1;
      const end = Math.min(start + size * 2 - 1, n - 1);
      
      if (mid < end) {
        merge(arr, start, mid, end);
      }
    }
    size *= 2;
  }
  
  return arr;
};

const insertionSort = (arr, left, right) => {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
};

const merge = (arr, left, mid, right) => {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }
  
  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
};

// Intro Sort - Hybrid of quicksort, heapsort, and insertion sort
const introSort = (arr, maxDepth = Math.floor(Math.log2(arr.length)) * 2) => {
  introSortUtil(arr, 0, arr.length - 1, maxDepth);
  return arr;
};

const introSortUtil = (arr, low, high, maxDepth) => {
  const size = high - low + 1;
  
  if (size < 16) {
    // Use insertion sort for small arrays
    insertionSortRange(arr, low, high);
  } else if (maxDepth === 0) {
    // Use heap sort when recursion depth is too deep
    heapSortRange(arr, low, high);
  } else {
    // Use quicksort
    const pivot = partition(arr, low, high);
    introSortUtil(arr, low, pivot - 1, maxDepth - 1);
    introSortUtil(arr, pivot + 1, high, maxDepth - 1);
  }
};

const insertionSortRange = (arr, low, high) => {
  for (let i = low + 1; i <= high; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= low && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
};

const heapSortRange = (arr, low, high) => {
  // Simple heap sort implementation for range
  const temp = arr.slice(low, high + 1);
  heapSort(temp);
  
  for (let i = 0; i < temp.length; i++) {
    arr[low + i] = temp[i];
  }
};

const heapSort = (arr) => {
  const n = arr.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
};

const heapify = (arr, n, i) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
};

const partition = (arr, low, high) => {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
};

// Test Cases
console.log(timSort([5, 2, 4, 6, 1, 3, 8, 7, 9])); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(introSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]