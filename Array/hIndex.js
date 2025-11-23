// H-Index - Sorting approach
const hIndex = (citations) => {
  citations.sort((a, b) => b - a);
  let h = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) h = i + 1;
    else break;
  }
  return h;
};

// Test Cases
console.log(hIndex([3,0,6,1,5])); // 3
console.log(hIndex([1,3,1])); // 1