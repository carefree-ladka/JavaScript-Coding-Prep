// 2D Matrix Prefix Sum Problems

// Range Sum Query 2D - Mutable
class NumMatrix2 {
  constructor(matrix) {
    this.matrix = matrix.map((row) => [...row]);
    this.m = matrix.length;
    this.n = matrix[0].length;
    this.buildPrefixSum();
  }

  buildPrefixSum() {
    this.prefixSum = Array(this.m + 1)
      .fill()
      .map(() => Array(this.n + 1).fill(0));

    for (let i = 1; i <= this.m; i++) {
      for (let j = 1; j <= this.n; j++) {
        this.prefixSum[i][j] =
          this.matrix[i - 1][j - 1] +
          this.prefixSum[i - 1][j] +
          this.prefixSum[i][j - 1] -
          this.prefixSum[i - 1][j - 1];
      }
    }
  }

  update(row, col, val) {
    this.matrix[row][col] = val;
    this.buildPrefixSum();
  }

  sumRegion(row1, col1, row2, col2) {
    return (
      this.prefixSum[row2 + 1][col2 + 1] -
      this.prefixSum[row1][col2 + 1] -
      this.prefixSum[row2 + 1][col1] +
      this.prefixSum[row1][col1]
    );
  }
}

// Maximum Sum Rectangle in 2D Array
const maxSumRectangle = (matrix) => {
  const m = matrix.length,
    n = matrix[0].length;
  let maxSum = -Infinity;

  for (let top = 0; top < m; top++) {
    const temp = new Array(n).fill(0);

    for (let bottom = top; bottom < m; bottom++) {
      // Add current row to temp array
      for (let i = 0; i < n; i++) {
        temp[i] += matrix[bottom][i];
      }

      // Find max subarray sum in temp (Kadane's algorithm)
      let currentSum = temp[0],
        maxSubarraySum = temp[0];
      for (let i = 1; i < n; i++) {
        currentSum = Math.max(temp[i], currentSum + temp[i]);
        maxSubarraySum = Math.max(maxSubarraySum, currentSum);
      }

      maxSum = Math.max(maxSum, maxSubarraySum);
    }
  }

  return maxSum;
};

// Count Square Submatrices with All Ones
const countSquares = (matrix) => {
  const m = matrix.length,
    n = matrix[0].length;
  const dp = Array(m)
    .fill()
    .map(() => Array(n).fill(0));
  let count = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
        count += dp[i][j];
      }
    }
  }

  return count;
};

// Matrix Block Sum
const matrixBlockSum = (mat, k) => {
  const m = mat.length,
    n = mat[0].length;

  // Build prefix sum
  const prefixSum = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      prefixSum[i][j] =
        mat[i - 1][j - 1] +
        prefixSum[i - 1][j] +
        prefixSum[i][j - 1] -
        prefixSum[i - 1][j - 1];
    }
  }

  const result = Array(m)
    .fill()
    .map(() => Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const r1 = Math.max(0, i - k);
      const c1 = Math.max(0, j - k);
      const r2 = Math.min(m - 1, i + k);
      const c2 = Math.min(n - 1, j + k);

      result[i][j] =
        prefixSum[r2 + 1][c2 + 1] -
        prefixSum[r1][c2 + 1] -
        prefixSum[r2 + 1][c1] +
        prefixSum[r1][c1];
    }
  }

  return result;
};

// Number of Submatrices That Sum to Target
const numSubmatrixSumTarget = (matrix, target) => {
  const m = matrix.length,
    n = matrix[0].length;
  let count = 0;

  // Build prefix sum for each row
  for (let i = 0; i < m; i++) {
    for (let j = 1; j < n; j++) {
      matrix[i][j] += matrix[i][j - 1];
    }
  }

  for (let c1 = 0; c1 < n; c1++) {
    for (let c2 = c1; c2 < n; c2++) {
      const map = new Map([[0, 1]]);
      let sum = 0;

      for (let r = 0; r < m; r++) {
        sum += matrix[r][c2] - (c1 > 0 ? matrix[r][c1 - 1] : 0);
        count += map.get(sum - target) || 0;
        map.set(sum, (map.get(sum) || 0) + 1);
      }
    }
  }

  return count;
};

// Largest Rectangle in Binary Matrix
const maximalRectangle = (matrix) => {
  if (!matrix.length) return 0;

  const m = matrix.length,
    n = matrix[0].length;
  const heights = new Array(n).fill(0);
  let maxArea = 0;

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

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      heights[j] = matrix[i][j] === "1" ? heights[j] + 1 : 0;
    }
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
};

// Minimum Falling Path Sum
const minFallingPathSum = (matrix) => {
  const n = matrix.length;
  const dp = matrix.map((row) => [...row]);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let minPrev = dp[i - 1][j];
      if (j > 0) minPrev = Math.min(minPrev, dp[i - 1][j - 1]);
      if (j < n - 1) minPrev = Math.min(minPrev, dp[i - 1][j + 1]);

      dp[i][j] += minPrev;
    }
  }

  return Math.min(...dp[n - 1]);
};

// Maximum Sum of 3 Non-Overlapping Subarrays
const maxSumOfThreeSubarrays = (nums, k) => {
  const n = nums.length;
  const sums = new Array(n - k + 1);

  // Calculate sum of each subarray of length k
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  sums[0] = windowSum;

  for (let i = 1; i <= n - k; i++) {
    windowSum = windowSum - nums[i - 1] + nums[i + k - 1];
    sums[i] = windowSum;
  }

  // Find best left and right positions
  const left = new Array(sums.length);
  const right = new Array(sums.length);

  left[0] = 0;
  for (let i = 1; i < sums.length; i++) {
    left[i] = sums[i] > sums[left[i - 1]] ? i : left[i - 1];
  }

  right[sums.length - 1] = sums.length - 1;
  for (let i = sums.length - 2; i >= 0; i--) {
    right[i] = sums[i] >= sums[right[i + 1]] ? i : right[i + 1];
  }

  let maxSum = 0;
  let result = [-1, -1, -1];

  for (let mid = k; mid <= n - 2 * k; mid++) {
    const l = left[mid - k];
    const r = right[mid + k];
    const totalSum = sums[l] + sums[mid] + sums[r];

    if (totalSum > maxSum) {
      maxSum = totalSum;
      result = [l, mid, r];
    }
  }

  return result;
};

// Test Cases
const matrix1 = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
];
const numMatrix2 = new NumMatrix2(matrix1);
console.log(numMatrix2.sumRegion(2, 1, 4, 3)); // 8
numMatrix2.update(3, 2, 2);
console.log(numMatrix2.sumRegion(2, 1, 4, 3)); // 10

console.log(
  maxSumRectangle([
    [1, 2, -1, -4, -20],
    [-8, -3, 4, 2, 1],
    [3, 8, 10, 1, 3],
    [-4, -1, 1, 7, -6],
  ])
); // 29

console.log(
  countSquares([
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 1, 1, 1],
  ])
); // 15

console.log(
  matrixBlockSum(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1
  )
);

console.log(
  numSubmatrixSumTarget(
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    0
  )
); // 4

console.log(
  maximalRectangle([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ])
); // 6

console.log(
  minFallingPathSum([
    [2, 1, 3],
    [6, 5, 4],
    [7, 8, 9],
  ])
); // 13

console.log(maxSumOfThreeSubarrays([1, 2, 1, 2, 6, 7, 5, 1], 2)); // [0, 3, 5]
