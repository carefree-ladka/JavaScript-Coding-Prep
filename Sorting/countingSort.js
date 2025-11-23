// Counting Sort - O(n + k) time, O(k) space, stable
const countingSort = (arr, maxVal = Math.max(...arr)) => {
  const count = new Array(maxVal + 1).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences
  for (const num of arr) {
    count[num]++;
  }
  
  // Transform to cumulative count
  for (let i = 1; i <= maxVal; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array (stable)
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  return output;
};

// Counting Sort for negative numbers
const countingSortNegative = (arr) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;
  
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences (shift by min)
  for (const num of arr) {
    count[num - min]++;
  }
  
  // Cumulative count
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  return output;
};

// Sort Colors (Dutch National Flag) - Special case of counting sort
const sortColors = (nums) => {
  let low = 0, mid = 0, high = nums.length - 1;
  
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  
  return nums;
};

// Test Cases
console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]
console.log(countingSortNegative([4, -2, 2, -8, 3, -3, 1])); // [-8, -3, -2, 1, 2, 3, 4]
console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]