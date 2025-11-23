// Bucket Sort - O(n + k) average, O(n²) worst, stable
const bucketSort = (arr, bucketCount = 10) => {
  if (arr.length <= 1) return arr;
  
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketSize = (max - min) / bucketCount;
  
  // Create buckets
  const buckets = Array(bucketCount).fill().map(() => []);
  
  // Distribute elements into buckets
  for (const num of arr) {
    const bucketIndex = Math.min(
      Math.floor((num - min) / bucketSize),
      bucketCount - 1
    );
    buckets[bucketIndex].push(num);
  }
  
  // Sort individual buckets and concatenate
  const result = [];
  for (const bucket of buckets) {
    if (bucket.length > 0) {
      bucket.sort((a, b) => a - b); // Use any sorting algorithm
      result.push(...bucket);
    }
  }
  
  return result;
};

// Bucket Sort for floating point numbers [0, 1)
const bucketSortFloat = (arr) => {
  const n = arr.length;
  const buckets = Array(n).fill().map(() => []);
  
  // Put array elements in different buckets
  for (const num of arr) {
    const bucketIndex = Math.floor(n * num);
    buckets[bucketIndex].push(num);
  }
  
  // Sort individual buckets
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }
  
  // Concatenate all buckets
  const result = [];
  for (const bucket of buckets) {
    result.push(...bucket);
  }
  
  return result;
};

// Top K Frequent Elements using Bucket Sort
const topKFrequent = (nums, k) => {
  const freq = {};
  for (const num of nums) {
    freq[num] = (freq[num] || 0) + 1;
  }
  
  // Create buckets based on frequency
  const buckets = Array(nums.length + 1).fill().map(() => []);
  
  for (const [num, count] of Object.entries(freq)) {
    buckets[count].push(parseInt(num));
  }
  
  // Collect top k elements
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  
  return result.slice(0, k);
};

// Sort Characters By Frequency
const frequencySort = (s) => {
  const freq = {};
  for (const char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  const buckets = Array(s.length + 1).fill().map(() => []);
  
  for (const [char, count] of Object.entries(freq)) {
    buckets[count].push(char);
  }
  
  let result = '';
  for (let i = buckets.length - 1; i >= 0; i--) {
    for (const char of buckets[i]) {
      result += char.repeat(i);
    }
  }
  
  return result;
};

// Test Cases
console.log(bucketSort([0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434])); 
// [0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897]

console.log(bucketSort([29, 25, 3, 49, 9, 37, 21, 43])); 
// [3, 9, 21, 25, 29, 37, 43, 49]

console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]
console.log(frequencySort("tree")); // "eert" or "eetr"