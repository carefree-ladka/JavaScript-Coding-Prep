// Container With Most Water - Two Pointers
const maxArea = (height) => {
  let left = 0, right = height.length - 1, maxWater = 0;
  
  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, water);
    height[left] < height[right] ? left++ : right--;
  }
  return maxWater;
};

// Test Cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1])); // 1