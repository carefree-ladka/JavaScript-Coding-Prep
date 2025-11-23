// Merge Sort - O(n log n) time, O(n) space, stable
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
};

const merge = (left, right) => {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
};

// In-place Merge Sort (optimized space)
const mergeSortInPlace = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);
    mergeInPlace(arr, left, mid, right);
  }
  return arr;
};

const mergeInPlace = (arr, left, mid, right) => {
  const temp = [];
  let i = left, j = mid + 1, k = 0;
  
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  
  while (i <= mid) temp[k++] = arr[i++];
  while (j <= right) temp[k++] = arr[j++];
  
  for (i = left; i <= right; i++) {
    arr[i] = temp[i - left];
  }
};

// Test Cases
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10])); // [3, 9, 10, 27, 38, 43, 82]
console.log(mergeSortInPlace([12, 11, 13, 5, 6, 7])); // [5, 6, 7, 11, 12, 13]