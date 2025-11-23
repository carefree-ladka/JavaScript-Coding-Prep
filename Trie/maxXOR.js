// Maximum XOR of Two Numbers in an Array
const findMaximumXOR = (nums) => {
  const trie = {};

  // Insert number into trie
  const insert = (num) => {
    let node = trie;
    for (let i = 31; i >= 0; i--) {
      const bit = (num >> i) & 1;
      if (!node[bit]) node[bit] = {};
      node = node[bit];
    }
  };

  // Find max XOR for a number
  const findMax = (num) => {
    let node = trie,
      maxXor = 0;
    for (let i = 31; i >= 0; i--) {
      const bit = (num >> i) & 1;
      const toggledBit = 1 - bit;

      if (node[toggledBit]) {
        maxXor |= 1 << i;
        node = node[toggledBit];
      } else {
        node = node[bit];
      }
    }
    return maxXor;
  };

  let maxXor = 0;
  insert(nums[0]);

  for (let i = 1; i < nums.length; i++) {
    maxXor = Math.max(maxXor, findMax(nums[i]));
    insert(nums[i]);
  }

  return maxXor;
};

// Test Cases
console.log(findMaximumXOR([3, 10, 5, 25, 2, 8])); // 28
console.log(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])); // 127
