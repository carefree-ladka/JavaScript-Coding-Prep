// Capacity to Ship Packages Within D Days
const shipWithinDays = (weights, days) => {
  let left = Math.max(...weights), right = weights.reduce((a, b) => a + b);
  
  const canShip = (capacity) => {
    let daysNeeded = 1, currentWeight = 0;
    
    for (const weight of weights) {
      if (currentWeight + weight > capacity) {
        daysNeeded++;
        currentWeight = weight;
      } else {
        currentWeight += weight;
      }
    }
    return daysNeeded <= days;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    canShip(mid) ? right = mid : left = mid + 1;
  }
  return left;
};

// Test Cases
console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)); // 15
console.log(shipWithinDays([3,2,2,4,1,4], 3)); // 6