const majorityElement = (nums = []) => {
  let count = 0;
  let cand = 0;

  for (const num of nums) {
    if (count === 0) {
      cand = num;
    }
    count += cand === num ? 1 : -1;
  }

  return cand;
};
