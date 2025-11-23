// Minimum Number of Days to Make m Bouquets
const minDays = (bloomDay, m, k) => {
  if (m * k > bloomDay.length) return -1;
  
  let left = Math.min(...bloomDay), right = Math.max(...bloomDay);
  
  const canMakeBouquets = (days) => {
    let bouquets = 0, consecutive = 0;
    
    for (const day of bloomDay) {
      if (day <= days) {
        consecutive++;
        if (consecutive === k) {
          bouquets++;
          consecutive = 0;
        }
      } else {
        consecutive = 0;
      }
    }
    return bouquets >= m;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    canMakeBouquets(mid) ? right = mid : left = mid + 1;
  }
  return left;
};

// Test Cases
console.log(minDays([1,10,3,10,2], 3, 1)); // 3
console.log(minDays([1,10,3,10,2], 3, 2)); // -1