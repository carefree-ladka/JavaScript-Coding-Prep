// Stock Price Span using Monotonic Stack
class StockSpanner {
  constructor() {
    this.stack = []; // [price, span]
  }
  
  next(price) {
    let span = 1;
    
    // Pop all prices <= current price and accumulate spans
    while (this.stack.length && this.stack[this.stack.length - 1][0] <= price) {
      span += this.stack.pop()[1];
    }
    
    this.stack.push([price, span]);
    return span;
  }
}

// Online Stock Span (Alternative implementation)
class StockSpannerAlt {
  constructor() {
    this.prices = [];
    this.spans = [];
  }
  
  next(price) {
    this.prices.push(price);
    const stack = [];
    
    for (let i = 0; i < this.prices.length; i++) {
      while (stack.length && this.prices[i] >= this.prices[stack[stack.length - 1]]) {
        stack.pop();
      }
      
      const span = stack.length ? i - stack[stack.length - 1] : i + 1;
      this.spans[i] = span;
      stack.push(i);
    }
    
    return this.spans[this.spans.length - 1];
  }
}

// Maximum Frequency Stack
class FreqStack {
  constructor() {
    this.freq = new Map();
    this.group = new Map();
    this.maxFreq = 0;
  }
  
  push(val) {
    const f = (this.freq.get(val) || 0) + 1;
    this.freq.set(val, f);
    
    if (f > this.maxFreq) this.maxFreq = f;
    
    if (!this.group.has(f)) this.group.set(f, []);
    this.group.get(f).push(val);
  }
  
  pop() {
    const val = this.group.get(this.maxFreq).pop();
    this.freq.set(val, this.freq.get(val) - 1);
    
    if (this.group.get(this.maxFreq).length === 0) {
      this.maxFreq--;
    }
    
    return val;
  }
}

// Sum of Subarray Minimums
const sumSubarrayMins = (arr) => {
  const MOD = 10**9 + 7;
  const n = arr.length;
  
  // Find previous smaller and next smaller elements
  const prevSmaller = new Array(n).fill(-1);
  const nextSmaller = new Array(n).fill(n);
  
  // Previous smaller
  const stack1 = [];
  for (let i = 0; i < n; i++) {
    while (stack1.length && arr[i] <= arr[stack1[stack1.length - 1]]) {
      stack1.pop();
    }
    if (stack1.length) prevSmaller[i] = stack1[stack1.length - 1];
    stack1.push(i);
  }
  
  // Next smaller
  const stack2 = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack2.length && arr[i] < arr[stack2[stack2.length - 1]]) {
      stack2.pop();
    }
    if (stack2.length) nextSmaller[i] = stack2[stack2.length - 1];
    stack2.push(i);
  }
  
  let result = 0;
  for (let i = 0; i < n; i++) {
    const left = i - prevSmaller[i];
    const right = nextSmaller[i] - i;
    result = (result + arr[i] * left * right) % MOD;
  }
  
  return result;
};

// Test Cases
const spanner = new StockSpanner();
console.log(spanner.next(100)); // 1
console.log(spanner.next(80));  // 1
console.log(spanner.next(60));  // 1
console.log(spanner.next(70));  // 2
console.log(spanner.next(60));  // 1
console.log(spanner.next(75));  // 4
console.log(spanner.next(85));  // 6

const freqStack = new FreqStack();
freqStack.push(5);
freqStack.push(7);
freqStack.push(5);
freqStack.push(7);
freqStack.push(4);
freqStack.push(5);
console.log(freqStack.pop()); // 5
console.log(freqStack.pop()); // 7
console.log(freqStack.pop()); // 5

console.log(sumSubarrayMins([3,1,2,4])); // 17