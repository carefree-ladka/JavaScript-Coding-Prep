// Search a 2D Matrix II
const searchMatrix = (matrix, target) => {
  let row = 0, col = matrix[0].length - 1;
  
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    matrix[row][col] > target ? col-- : row++;
  }
  return false;
};

// Test Cases
const matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]];
console.log(searchMatrix(matrix, 5)); // true
console.log(searchMatrix(matrix, 14)); // true