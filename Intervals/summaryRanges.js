// Summary Ranges
const summaryRanges = (nums) => {
  const result = [];
  let start = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (i === nums.length - 1 || nums[i] + 1 !== nums[i + 1]) {
      if (start === i) {
        result.push(nums[start].toString());
      } else {
        result.push(`${nums[start]}->${nums[i]}`);
      }
      start = i + 1;
    }
  }
  return result;
};

// Test Cases
console.log(summaryRanges([0,1,2,4,5,7])); // ["0->2","4->5","7"]
console.log(summaryRanges([0,2,3,4,6,8,9])); // ["0","2->4","6","8->9"]