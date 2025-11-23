// Remove Duplicates from Sorted Array II - Allow at most 2
const removeDuplicates = (nums) => {
  let k = 2;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k-2]) nums[k++] = nums[i];
  }
  return k;
};

// Test Cases
console.log(removeDuplicates([1,1,1,2,2,3])); // 5
console.log(removeDuplicates([0,0,1,1,1,1,2,3,3])); // 7