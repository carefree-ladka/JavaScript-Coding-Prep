// Magnetic Force Between Two Balls
const maxDistance = (position, m) => {
  position.sort((a, b) => a - b);
  let left = 1, right = position[position.length - 1] - position[0];
  
  const canPlace = (minDist) => {
    let count = 1, lastPos = position[0];
    
    for (let i = 1; i < position.length; i++) {
      if (position[i] - lastPos >= minDist) {
        count++;
        lastPos = position[i];
        if (count === m) return true;
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
console.log(maxDistance([1,2,3,4,7], 3)); // 3
console.log(maxDistance([5,4,3,2,1,1000000000], 2)); // 999999999