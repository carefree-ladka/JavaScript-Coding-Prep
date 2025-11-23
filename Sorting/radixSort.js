// Radix Sort - O(d * (n + k)) time, O(n + k) space, stable
const radixSort = (arr) => {
  const max = Math.max(...arr);
  
  // Sort by each digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
};

const countingSortByDigit = (arr, exp) => {
  const count = new Array(10).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences of digits
  for (const num of arr) {
    count[Math.floor(num / exp) % 10]++;
  }
  
  // Cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy back to original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
};

// Radix Sort for strings
const radixSortStrings = (arr) => {
  if (!arr.length) return arr;
  
  const maxLen = Math.max(...arr.map(s => s.length));
  
  // Pad strings to same length
  const paddedArr = arr.map(s => s.padEnd(maxLen, '\0'));
  
  // Sort by each character position from right to left
  for (let pos = maxLen - 1; pos >= 0; pos--) {
    countingSortByChar(paddedArr, pos);
  }
  
  // Remove padding
  return paddedArr.map(s => s.replace(/\0+$/, ''));
};

const countingSortByChar = (arr, pos) => {
  const count = new Array(256).fill(0); // ASCII characters
  const output = new Array(arr.length);
  
  // Count character occurrences
  for (const str of arr) {
    count[str.charCodeAt(pos)]++;
  }
  
  // Cumulative count
  for (let i = 1; i < 256; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output
  for (let i = arr.length - 1; i >= 0; i--) {
    const charCode = arr[i].charCodeAt(pos);
    output[count[charCode] - 1] = arr[i];
    count[charCode]--;
  }
  
  // Copy back
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
};

// Maximum Gap using Radix Sort concept
const maximumGap = (nums) => {
  if (nums.length < 2) return 0;
  
  radixSort(nums);
  
  let maxGap = 0;
  for (let i = 1; i < nums.length; i++) {
    maxGap = Math.max(maxGap, nums[i] - nums[i - 1]);
  }
  
  return maxGap;
};

// Test Cases
console.log(radixSort([170, 45, 75, 90, 2, 802, 24, 66])); // [2, 24, 45, 66, 75, 90, 170, 802]
console.log(radixSortStrings(["abc", "ab", "abcd", "a"])); // ["a", "ab", "abc", "abcd"]
console.log(maximumGap([3, 6, 9, 1])); // 3