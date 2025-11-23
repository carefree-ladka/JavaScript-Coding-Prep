// Boyer–Moore Majority Vote Algorithm

const majorityElement = (nums) => {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  // verify
  let freq = 0;
  for (const num of nums) {
    if (num === candidate) freq++;
  }

  return freq > Math.floor(nums.length / 2) ? candidate : -1;
};

// Test Cases
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(majorityElement([1])); // 1
console.log(majorityElement([1, 2])); // -1 (no majority element)
console.log(majorityElement([1, 1, 2, 3])); // -1 (1 appears only twice out of 4)
console.log(majorityElement([5, 5, 5, 2, 2])); // 5
console.log(majorityElement([-1, -1, -1, 2, 3])); // -1
console.log(majorityElement([0, 0, 0, 0, 1, 2, 3])); // 0
console.log(majorityElement([4, 4, 2, 4, 3, 4, 4])); // 4
console.log(majorityElement([1, 2, 3, 4, 5, 6])); // -1
console.log(majorityElement([7, 7, 7, 7, 7, 1, 2, 3, 4, 5, 7, 7])); // 7
