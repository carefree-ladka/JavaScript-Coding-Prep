// Remove Duplicates from Sorted Array
const removeDuplicates = (nums) => {
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i-1]) nums[k++] = nums[i];
  }
  return k;
};

// Test Cases
console.log(removeDuplicates([1,1,2])); // 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // 5