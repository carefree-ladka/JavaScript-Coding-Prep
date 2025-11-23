// Maximum Number of Removable Characters
const maximumRemovals = (s, p, removable) => {
  const isSubsequence = (removed) => {
    const removedSet = new Set(removed);
    let i = 0;
    
    for (let j = 0; j < s.length && i < p.length; j++) {
      if (!removedSet.has(j) && s[j] === p[i]) i++;
    }
    return i === p.length;
  };
  
  let left = 0, right = removable.length;
  
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    const removed = new Set(removable.slice(0, mid));
    isSubsequence(removed) ? left = mid : right = mid - 1;
  }
  return left;
};

// Test Cases
console.log(maximumRemovals("abcacb", "ab", [3,1,0])); // 2
console.log(maximumRemovals("abcbddddd", "abcd", [3,2,1,4,5,6])); // 1