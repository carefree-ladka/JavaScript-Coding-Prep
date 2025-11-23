// Merge Sorted Array - Two Pointers from end
const merge = (nums1, m, nums2, n) => {
  let i = m - 1, j = n - 1, k = m + n - 1;
  
  while (j >= 0) {
    nums1[k--] = (i >= 0 && nums1[i] > nums2[j]) ? nums1[i--] : nums2[j--];
  }
};

// Test Cases
let nums1 = [1,2,3,0,0,0], nums2 = [2,5,6];
merge(nums1, 3, nums2, 3);
console.log(nums1); // [1,2,2,3,5,6]