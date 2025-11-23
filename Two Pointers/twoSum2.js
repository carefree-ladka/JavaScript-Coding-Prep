// Two Sum II - Input Array Is Sorted
const twoSum = (numbers, target) => {
  let left = 0, right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    sum < target ? left++ : right--;
  }
  return [];
};

// Test Cases
console.log(twoSum([2,7,11,15], 9)); // [1,2]
console.log(twoSum([2,3,4], 6)); // [1,3]