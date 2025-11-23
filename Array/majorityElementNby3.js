const majorityElementNby3 = (nums) => {
  let cand1 = null,
    cand2 = null;
  let count1 = 0,
    count2 = 0;

  for (const n of nums) {
    if (n === cand1) count1++;
    else if (n === cand2) count2++;
    else if (count1 === 0) (cand1 = n), (count1 = 1);
    else if (count2 === 0) (cand2 = n), (count2 = 1);
    else count1--, count2--;
  }

  // verify
  count1 = count2 = 0;
  for (const n of nums) {
    if (n === cand1) count1++;
    else if (n === cand2) count2++;
  }

  const res = [];
  if (count1 > Math.floor(nums.length / 3)) res.push(cand1);
  if (count2 > Math.floor(nums.length / 3)) res.push(cand2);
  return res;
};

// Test Cases

// 1. Simple one majority (> n/3)
console.log(majorityElementNby3([3, 2, 3]));
// [3]

// 2. Exactly one element > n/3
console.log(majorityElementNby3([1, 1, 1, 3, 3, 2, 2]));
// [1]

// 3. Two majority elements (> n/3)
console.log(majorityElementNby3([1, 2, 3, 1, 2, 1, 2]));
// [1, 2]

// 4. No majority
console.log(majorityElementNby3([1, 2, 3, 4]));
// []

// 5. All elements same
console.log(majorityElementNby3([5, 5, 5, 5]));
// [5]

// 6. Negative numbers
console.log(majorityElementNby3([-1, -1, -1, 2, 3]));
// [-1]

// 7. Two strong majorities
console.log(majorityElementNby3([2, 2, 9, 9, 9, 2, 2]));
// [2, 9]

// 8. Edge case: empty array
console.log(majorityElementNby3([]));
// []

// 9. Edge case: one element
console.log(majorityElementNby3([10]));
// [10]

// 10. Edge case: two elements
console.log(majorityElementNby3([4, 4]));
// [4]

// 11. Majority exactly equal to n/3 + 1
console.log(majorityElementNby3([1, 2, 3, 1, 1]));
// [1]

// 12. Stress test: two majorities large input
console.log(
  majorityElementNby3([
    ...Array(50).fill(7),
    ...Array(40).fill(8),
    ...Array(10).fill(1),
  ])
);
// [7, 8]
