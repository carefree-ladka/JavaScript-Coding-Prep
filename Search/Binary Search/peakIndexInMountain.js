// Peak Index in a Mountain Array
const peakIndexInMountainArray = (arr) => {
  let left = 0, right = arr.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    arr[mid] < arr[mid + 1] ? left = mid + 1 : right = mid;
  }
  return left;
};

// Test Cases
console.log(peakIndexInMountainArray([0,1,0])); // 1
console.log(peakIndexInMountainArray([0,2,1,0])); // 1
console.log(peakIndexInMountainArray([0,10,5,2])); // 1