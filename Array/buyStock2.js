// Best Time to Buy and Sell Stock II - Multiple transactions
const maxProfit = (prices) => {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];
  }
  return profit;
};

// Test Cases
console.log(maxProfit([7,1,5,3,6,4])); // 7
console.log(maxProfit([1,2,3,4,5])); // 4