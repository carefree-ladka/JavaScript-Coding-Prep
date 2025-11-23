// Minimum Speed to Arrive on Time
const minSpeedOnTime = (dist, hour) => {
  let left = 1, right = 10**7;
  
  const canArrive = (speed) => {
    let time = 0;
    for (let i = 0; i < dist.length - 1; i++) {
      time += Math.ceil(dist[i] / speed);
    }
    time += dist[dist.length - 1] / speed;
    return time <= hour;
  };
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    canArrive(mid) ? right = mid : left = mid + 1;
  }
  
  return canArrive(left) ? left : -1;
};

// Test Cases
console.log(minSpeedOnTime([1,3,2], 6)); // 1
console.log(minSpeedOnTime([1,3,2], 2.7)); // 3