// Next Greater Element I
const nextGreaterElement1 = (nums1, nums2) => {
  const map = new Map();
  const stack = [];
  
  // Build next greater map for nums2
  for (const num of nums2) {
    while (stack.length && num > stack[stack.length - 1]) {
      map.set(stack.pop(), num);
    }
    stack.push(num);
  }
  
  return nums1.map(num => map.get(num) || -1);
};

// Next Greater Element II (Circular Array)
const nextGreaterElements2 = (nums) => {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];
  
  // Process array twice to handle circular nature
  for (let i = 0; i < 2 * n; i++) {
    const idx = i % n;
    
    while (stack.length && nums[idx] > nums[stack[stack.length - 1]]) {
      const popIdx = stack.pop();
      result[popIdx] = nums[idx];
    }
    
    if (i < n) stack.push(idx);
  }
  
  return result;
};

// Next Greater Element III
const nextGreaterElement3 = (n) => {
  const digits = n.toString().split('');
  
  // Find rightmost digit that is smaller than its next digit
  let i = digits.length - 2;
  while (i >= 0 && digits[i] >= digits[i + 1]) i--;
  
  if (i < 0) return -1; // No greater permutation exists
  
  // Find smallest digit on right side of i that is greater than digits[i]
  let j = digits.length - 1;
  while (digits[j] <= digits[i]) j--;
  
  // Swap
  [digits[i], digits[j]] = [digits[j], digits[i]];
  
  // Reverse the suffix starting at i+1
  const left = digits.slice(0, i + 1);
  const right = digits.slice(i + 1).reverse();
  
  const result = parseInt(left.concat(right).join(''));
  return result > 2**31 - 1 ? -1 : result;
};

// Next Greater Frequency Element
const nextGreaterFrequency = (nums) => {
  const freq = {};
  for (const num of nums) {
    freq[num] = (freq[num] || 0) + 1;
  }
  
  const result = new Array(nums.length).fill(-1);
  const stack = [];
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && freq[nums[i]] > freq[nums[stack[stack.length - 1]]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }
  
  return result;
};

// Test Cases
console.log(nextGreaterElement1([4,1,2], [1,3,4,2])); // [-1,3,-1]
console.log(nextGreaterElements2([1,2,1])); // [2,-1,2]
console.log(nextGreaterElement3(12)); // 21
console.log(nextGreaterFrequency([1,1,2,3,2])); // [2,2,1,-1,3]