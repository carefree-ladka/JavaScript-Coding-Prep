// Minimum Number of Arrows to Burst Balloons
const findMinArrowShots = (points) => {
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 1;
  let end = points[0][1];
  
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      arrows++;
      end = points[i][1];
    }
  }
  return arrows;
};

// Test Cases
console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2
console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])); // 4