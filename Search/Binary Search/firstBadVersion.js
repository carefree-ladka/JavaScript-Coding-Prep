// First Bad Version
const solution = (isBadVersion) => {
  return function(n) {
    let left = 1, right = n;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      isBadVersion(mid) ? right = mid : left = mid + 1;
    }
    return left;
  };
};

// Mock isBadVersion for testing
let bad = 4;
const isBadVersion = (version) => version >= bad;

// Test Cases
const firstBadVersion = solution(isBadVersion);
console.log(firstBadVersion(5)); // 4