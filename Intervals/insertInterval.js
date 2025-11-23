// Insert Interval
const insert = (intervals, newInterval) => {
  const result = [];
  let i = 0;

  // Add intervals before overlap
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }

  // Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // Add remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i++]);
  }

  return result;
};

// Test Cases
console.log(
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5]
  )
); // [[1,5],[6,9]]
console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8]
  )
); // [[1,2],[3,10],[12,16]]
