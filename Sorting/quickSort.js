// Quick Sort - O(n log n) average, O(n²) worst, O(log n) space
const quickSort = (arr, low = 0, high = arr.length - 1) => {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
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

// Quick Sort with Random Pivot
const quickSortRandom = (arr, low = 0, high = arr.length - 1) => {
  if (low < high) {
    // Random pivot to avoid worst case
    const randomIdx = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIdx], arr[high]] = [arr[high], arr[randomIdx]];
    
    const pi = partition(arr, low, high);
    quickSortRandom(arr, low, pi - 1);
    quickSortRandom(arr, pi + 1, high);
  }
  return arr;
};

// 3-Way Quick Sort (handles duplicates efficiently)
const quickSort3Way = (arr, low = 0, high = arr.length - 1) => {
  if (low < high) {
    const [lt, gt] = partition3Way(arr, low, high);
    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
  }
  return arr;
};

const partition3Way = (arr, low, high) => {
  const pivot = arr[low];
  let lt = low, i = low, gt = high;
  
  while (i <= gt) {
    if (arr[i] < pivot) {
      [arr[lt++], arr[i++]] = [arr[i], arr[lt]];
    } else if (arr[i] > pivot) {
      [arr[i], arr[gt--]] = [arr[gt], arr[i]];
    } else {
      i++;
    }
  }
  
  return [lt, gt];
};

// Test Cases
console.log(quickSort([10, 7, 8, 9, 1, 5])); // [1, 5, 7, 8, 9, 10]
console.log(quickSortRandom([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(quickSort3Way([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]