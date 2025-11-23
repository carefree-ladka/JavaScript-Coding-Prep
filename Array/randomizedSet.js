// Insert Delete GetRandom O(1)
class RandomizedSet {
  constructor() {
    this.map = new Map();
    this.list = [];
  }
  
  insert(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }
  
  remove(val) {
    if (!this.map.has(val)) return false;
    const idx = this.map.get(val);
    const last = this.list[this.list.length - 1];
    this.list[idx] = last;
    this.map.set(last, idx);
    this.list.pop();
    this.map.delete(val);
    return true;
  }
  
  getRandom() {
    return this.list[Math.floor(Math.random() * this.list.length)];
  }
}

// Test Cases
const rs = new RandomizedSet();
console.log(rs.insert(1)); // true
console.log(rs.remove(2)); // false
console.log(rs.insert(2)); // true
console.log(rs.getRandom()); // 1 or 2