// Koko Eating Bananas
const minEatingSpeed = (piles, h) => {
  let left = 1, right = Math.max(...piles);
  
  const canFinish = (speed) => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    canFinish(mid) ? right = mid : left = mid + 1;
  }
  return left;
};

// Test Cases
console.log(minEatingSpeed([3,6,7,11], 8)); // 4
console.log(minEatingSpeed([30,11,23,4,20], 5)); // 30