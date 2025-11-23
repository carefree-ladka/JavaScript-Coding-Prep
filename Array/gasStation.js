// Gas Station - Greedy
const canCompleteCircuit = (gas, cost) => {
  let total = 0, tank = 0, start = 0;
  
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    
    if (tank < 0) {
      tank = 0;
      start = i + 1;
    }
  }
  return total >= 0 ? start : -1;
};

// Test Cases
console.log(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])); // 3
console.log(canCompleteCircuit([2,3,4], [3,4,3])); // -1