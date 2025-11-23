// Successful Pairs of Spells and Potions
const successfulPairs = (spells, potions, success) => {
  potions.sort((a, b) => a - b);
  
  const findFirst = (target) => {
    let left = 0, right = potions.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      potions[mid] >= target ? right = mid : left = mid + 1;
    }
    return left;
  };
  
  return spells.map(spell => {
    const needed = Math.ceil(success / spell);
    const idx = findFirst(needed);
    return potions.length - idx;
  });
};

// Test Cases
console.log(successfulPairs([5,1,3], [1,2,3,4,5], 7)); // [4,0,3]
console.log(successfulPairs([3,1,2], [8,5,8], 16)); // [2,0,2]