// Aggressive Cows (classic problem)
const aggressiveCows = (stalls, cows) => {
  stalls.sort((a, b) => a - b);
  let left = 1, right = stalls[stalls.length - 1] - stalls[0];
  
  const canPlace = (minDist) => {
    let count = 1, lastPos = stalls[0];
    
    for (let i = 1; i < stalls.length; i++) {
      if (stalls[i] - lastPos >= minDist) {
        count++;
        lastPos = stalls[i];
        if (count === cows) return true;
      }
    }
    return false;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    canPlace(mid) ? left = mid : right = mid - 1;
  }
  return left;
};

// Test Cases
console.log(aggressiveCows([1,2,4,8,9], 3)); // 3
console.log(aggressiveCows([1,2,3,4,5], 3)); // 2