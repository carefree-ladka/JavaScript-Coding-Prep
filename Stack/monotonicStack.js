// Monotonic Stack - Basic Template
const nextGreaterElement = (nums) => {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Monotonic decreasing stack (indices)
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  
  return result;
};

const nextSmallerElement = (nums) => {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Monotonic increasing stack
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  
  return result;
};

const previousGreaterElement = (nums) => {
  const result = new Array(nums.length).fill(-1);
  const stack = [];
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    
    if (stack.length) {
      result[i] = nums[stack[stack.length - 1]];
    }
    
    stack.push(i);
  }
  
  return result;
};

const previousSmallerElement = (nums) => {
  const result = new Array(nums.length).fill(-1);
  const stack = [];
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    
    if (stack.length) {
      result[i] = nums[stack[stack.length - 1]];
    }
    
    stack.push(i);
  }
  
  return result;
};

// Test Cases
console.log(nextGreaterElement([2, 1, 2, 4, 3, 1])); // [4, 2, 4, -1, -1, -1]
console.log(nextSmallerElement([4, 5, 2, 10, 8])); // [2, 2, -1, 8, -1]
console.log(previousGreaterElement([2, 1, 2, 4, 3, 1])); // [-1, 2, -1, -1, 4, 3]
console.log(previousSmallerElement([4, 5, 2, 10, 8])); // [-1, 4, -1, 2, 2]