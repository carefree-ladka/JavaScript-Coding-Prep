// Remove K Digits to Make Smallest Number
const removeKdigits = (num, k) => {
  const stack = [];
  let toRemove = k;
  
  for (const digit of num) {
    // Remove larger digits from stack
    while (stack.length && toRemove > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      toRemove--;
    }
    stack.push(digit);
  }
  
  // Remove remaining digits from end
  while (toRemove > 0) {
    stack.pop();
    toRemove--;
  }
  
  // Remove leading zeros and handle empty result
  const result = stack.join('').replace(/^0+/, '');
  return result || '0';
};

// Create Maximum Number
const maxNumber = (nums1, nums2, k) => {
  const maxSubsequence = (nums, k) => {
    const stack = [];
    let toRemove = nums.length - k;
    
    for (const num of nums) {
      while (stack.length && toRemove > 0 && stack[stack.length - 1] < num) {
        stack.pop();
        toRemove--;
      }
      stack.push(num);
    }
    
    return stack.slice(0, k);
  };
  
  const merge = (arr1, arr2) => {
    const result = [];
    let i = 0, j = 0;
    
    while (i < arr1.length || j < arr2.length) {
      const greater = compare(arr1, i, arr2, j) > 0;
      result.push(greater ? arr1[i++] : arr2[j++]);
    }
    
    return result;
  };
  
  const compare = (arr1, i, arr2, j) => {
    while (i < arr1.length && j < arr2.length && arr1[i] === arr2[j]) {
      i++;
      j++;
    }
    
    if (i === arr1.length) return -1;
    if (j === arr2.length) return 1;
    return arr1[i] - arr2[j];
  };
  
  let maxResult = [];
  
  for (let i = Math.max(0, k - nums2.length); i <= Math.min(k, nums1.length); i++) {
    const sub1 = maxSubsequence(nums1, i);
    const sub2 = maxSubsequence(nums2, k - i);
    const merged = merge(sub1, sub2);
    
    if (compare(merged, 0, maxResult, 0) > 0) {
      maxResult = merged;
    }
  }
  
  return maxResult;
};

// Monotonic Array
const isMonotonic = (nums) => {
  let increasing = true, decreasing = true;
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) decreasing = false;
    if (nums[i] < nums[i - 1]) increasing = false;
  }
  
  return increasing || decreasing;
};

// Find the Most Competitive Subsequence
const mostCompetitive = (nums, k) => {
  const stack = [];
  let toRemove = nums.length - k;
  
  for (const num of nums) {
    while (stack.length && toRemove > 0 && stack[stack.length - 1] > num) {
      stack.pop();
      toRemove--;
    }
    stack.push(num);
  }
  
  return stack.slice(0, k);
};

// Remove Duplicate Letters (Lexicographically Smallest)
const removeDuplicateLetters = (s) => {
  const count = {};
  const inStack = new Set();
  const stack = [];
  
  // Count frequency
  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (const char of s) {
    count[char]--;
    
    if (inStack.has(char)) continue;
    
    // Remove larger characters that appear later
    while (stack.length && char < stack[stack.length - 1] && count[stack[stack.length - 1]] > 0) {
      inStack.delete(stack.pop());
    }
    
    stack.push(char);
    inStack.add(char);
  }
  
  return stack.join('');
};

// Test Cases
console.log(removeKdigits("1432219", 3)); // "1219"
console.log(removeKdigits("10200", 1)); // "200"
console.log(maxNumber([3,4,6,5], [9,1,2,5,8,3], 5)); // [9,8,6,5,3]
console.log(isMonotonic([1,2,2,3])); // true
console.log(mostCompetitive([3,5,2,6], 2)); // [2,6]
console.log(removeDuplicateLetters("bcabc")); // "abc"