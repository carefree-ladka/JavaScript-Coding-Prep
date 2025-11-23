// Rotate Array - Reverse approach
const rotate = (nums, k) => {
  k %= nums.length;
  const reverse = (start, end) => {
    while (start < end) [nums[start++], nums[end--]] = [nums[end], nums[start]];
  };
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
};

// Test Cases
let arr1 = [1,2,3,4,5,6,7];
rotate(arr1, 3);
console.log(arr1); // [5,6,7,1,2,3,4]