// Stock DP Problems

// Best Time to Buy and Sell Stock with Cooldown
const maxProfitWithCooldown = (prices) => {
  let held = -prices[0], sold = 0, rest = 0;
  
  for (let i = 1; i < prices.length; i++) {
    const prevHeld = held, prevSold = sold, prevRest = rest;
    
    held = Math.max(prevHeld, prevRest - prices[i]);
    sold = prevHeld + prices[i];
    rest = Math.max(prevRest, prevSold);
  }
  
  return Math.max(sold, rest);
};

// Best Time to Buy and Sell Stock III (At most 2 transactions)
const maxProfitIII = (prices) => {
  let buy1 = -prices[0], sell1 = 0;
  let buy2 = -prices[0], sell2 = 0;
  
  for (let i = 1; i < prices.length; i++) {
    buy1 = Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }
  
  return sell2;
};

// Best Time to Buy and Sell Stock IV (At most k transactions)
const maxProfitIV = (k, prices) => {
  if (!prices.length) return 0;
  
  // If k >= n/2, we can do as many transactions as we want
  if (k >= Math.floor(prices.length / 2)) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1];
      }
    }
    return profit;
  }
  
  const buy = new Array(k + 1).fill(-prices[0]);
  const sell = new Array(k + 1).fill(0);
  
  for (let i = 1; i < prices.length; i++) {
    for (let j = k; j >= 1; j--) {
      sell[j] = Math.max(sell[j], buy[j] + prices[i]);
      buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
    }
  }
  
  return sell[k];
};

// Best Time to Buy and Sell Stock with Transaction Fee
const maxProfitWithFee = (prices, fee) => {
  let held = -prices[0], sold = 0;
  
  for (let i = 1; i < prices.length; i++) {
    held = Math.max(held, sold - prices[i]);
    sold = Math.max(sold, held + prices[i] - fee);
  }
  
  return sold;
};

// Stock Price Fluctuation
class StockPrice {
  constructor() {
    this.latestTime = 0;
    this.timePrice = new Map();
    this.priceCount = new Map();
  }
  
  update(timestamp, price) {
    this.latestTime = Math.max(this.latestTime, timestamp);
    
    if (this.timePrice.has(timestamp)) {
      const oldPrice = this.timePrice.get(timestamp);
      this.priceCount.set(oldPrice, this.priceCount.get(oldPrice) - 1);
      if (this.priceCount.get(oldPrice) === 0) {
        this.priceCount.delete(oldPrice);
      }
    }
    
    this.timePrice.set(timestamp, price);
    this.priceCount.set(price, (this.priceCount.get(price) || 0) + 1);
  }
  
  current() {
    return this.timePrice.get(this.latestTime);
  }
  
  maximum() {
    return Math.max(...this.priceCount.keys());
  }
  
  minimum() {
    return Math.min(...this.priceCount.keys());
  }
}

// Test Cases
console.log(maxProfitWithCooldown([1,2,3,0,2])); // 3
console.log(maxProfitIII([3,3,5,0,0,3,1,4])); // 6
console.log(maxProfitIV(2, [2,4,1])); // 2
console.log(maxProfitWithFee([1,3,2,8,4,9], 2)); // 8

const stockPrice = new StockPrice();
stockPrice.update(1, 10);
stockPrice.update(2, 5);
console.log(stockPrice.current()); // 5
console.log(stockPrice.maximum()); // 10