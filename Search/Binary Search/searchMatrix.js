// Search a 2D Matrix
const searchMatrix = (matrix, target) => {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];
    
    if (val === target) return true;
    val < target ? left = mid + 1 : right = mid - 1;
  }
  return false;
};

// Test Cases
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // true
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)); // false