/**
 * Fenwick Tree (Binary Indexed Tree)
 * 1-indexed BIT implementation
 */
class FenwickTree {
  constructor(n) {
    this.n = n;
    this.bit = new Array(n + 1).fill(0);
  }

  // Add 'delta' to index 'i'
  update(i, delta) {
    while (i <= this.n) {
      this.bit[i] += delta;
      i += i & -i; // move to parent
    }
  }

  // Prefix sum from 1..i
  query(i) {
    let sum = 0;
    while (i > 0) {
      sum += this.bit[i];
      i -= i & -i; // move to previous
    }
    return sum;
  }

  // Range sum l..r
  rangeQuery(l, r) {
    if (l > r) return 0;
    return this.query(r) - this.query(l - 1);
  }

  // Build tree in O(n)
  build(arr) {
    for (let i = 1; i <= this.n; i++) {
      this.update(i, arr[i - 1]);
    }
  }
}

// Test Cases
const arr = [1, 2, 3, 4, 5];
const ft = new FenwickTree(arr.length);
ft.build(arr);

console.log(ft.rangeQuery(2, 4)); // 2+3+4 = 9

ft.update(3, 10); // add +10 at index 3
console.log(ft.rangeQuery(2, 4)); // 2+13+4 = 19
