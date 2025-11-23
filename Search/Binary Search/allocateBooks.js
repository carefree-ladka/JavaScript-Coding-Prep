// Allocate Minimum Number of Pages (classic)
const allocateBooks = (books, students) => {
  if (students > books.length) return -1;
  
  let left = Math.max(...books), right = books.reduce((a, b) => a + b);
  
  const canAllocate = (maxPages) => {
    let studentsUsed = 1, currentPages = 0;
    
    for (const pages of books) {
      if (currentPages + pages > maxPages) {
        studentsUsed++;
        currentPages = pages;
        if (studentsUsed > students) return false;
      } else {
        currentPages += pages;
      }
    }
    return true;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    canAllocate(mid) ? right = mid : left = mid + 1;
  }
  return left;
};

// Test Cases
console.log(allocateBooks([12,34,67,90], 2)); // 113
console.log(allocateBooks([15,17,20], 2)); // 32