// Largest Rectangle in Histogram
const largestRectangleArea = (heights) => {
  const stack = [];
  let maxArea = 0;
  
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    
    while (stack.length && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    
    stack.push(i);
  }
  
  return maxArea;
};

// Maximal Rectangle in Binary Matrix
const maximalRectangle = (matrix) => {
  if (!matrix.length) return 0;
  
  const heights = new Array(matrix[0].length).fill(0);
  let maxArea = 0;
  
  for (const row of matrix) {
    for (let j = 0; j < row.length; j++) {
      heights[j] = row[j] === '1' ? heights[j] + 1 : 0;
    }
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }
  
  return maxArea;
};

// Largest Rectangle in Binary Matrix (0s and 1s)
const maxRectangle = (matrix) => {
  if (!matrix.length) return 0;
  
  const m = matrix.length, n = matrix[0].length;
  const heights = new Array(n).fill(0);
  let maxArea = 0;
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      heights[j] = matrix[i][j] === 0 ? 0 : heights[j] + 1;
    }
    
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }
  
  return maxArea;
};

// Count of Rectangles
const countRectangles = (heights) => {
  const stack = [];
  let count = 0;
  
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    
    while (stack.length && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      
      // Count all possible rectangles with this height
      count += (width * (width + 1)) / 2;
    }
    
    stack.push(i);
  }
  
  return count;
};

// Test Cases
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(maximalRectangle([
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
])); // 6

console.log(maxRectangle([
  [1,0,1,0,0],
  [1,0,1,1,1],
  [1,1,1,1,1],
  [1,0,0,1,0]
])); // 6