// Jump Game II - Minimum jumps
const jump = (nums) => {
  let jumps = 0, currentEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  return jumps;
};

// Test Cases
console.log(jump([2,3,1,1,4])); // 2
console.log(jump([2,3,0,1,4])); // 2