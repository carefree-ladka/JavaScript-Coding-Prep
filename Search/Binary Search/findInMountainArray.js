// Find in Mountain Array
const findInMountainArray = (target, mountainArr) => {
  const get = (i) => mountainArr.get(i);
  const length = mountainArr.length();
  
  // Find peak
  let left = 0, right = length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    get(mid) < get(mid + 1) ? left = mid + 1 : right = mid;
  }
  const peak = left;
  
  // Search left side (ascending)
  left = 0; right = peak;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = get(mid);
    if (val === target) return mid;
    val < target ? left = mid + 1 : right = mid - 1;
  }
  
  // Search right side (descending)
  left = peak; right = length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = get(mid);
    if (val === target) return mid;
    val > target ? left = mid + 1 : right = mid - 1;
  }
  
  return -1;
};

// Mock MountainArray for testing
class MountainArray {
  constructor(arr) { this.arr = arr; }
  get(i) { return this.arr[i]; }
  length() { return this.arr.length; }
}

// Test Cases
const mountain = new MountainArray([1,2,3,4,5,3,1]);
console.log(findInMountainArray(3, mountain)); // 2