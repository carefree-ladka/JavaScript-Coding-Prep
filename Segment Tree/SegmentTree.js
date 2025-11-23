/**
 * Segment Tree (Range Sum Query + Point Update)
 * Indexing: 0-based for input array
 */
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(arr, 0, 0, this.n - 1);
  }

  // Build tree in O(n)
  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const left = 2 * node + 1;
    const right = 2 * node + 2;

    this.build(arr, left, start, mid);
    this.build(arr, right, mid + 1, end);

    this.tree[node] = this.tree[left] + this.tree[right];
  }

  // Range sum query
  queryRange(node, start, end, l, r) {
    // no overlap
    if (r < start || end < l) return 0;

    // complete overlap
    if (l <= start && end <= r) return this.tree[node];

    // partial overlap
    const mid = Math.floor((start + end) / 2);
    const left = 2 * node + 1;
    const right = 2 * node + 2;

    const leftSum = this.queryRange(left, start, mid, l, r);
    const rightSum = this.queryRange(right, mid + 1, end, l, r);

    return leftSum + rightSum;
  }

  // Public API for query: sum in [l, r]
  query(l, r) {
    return this.queryRange(0, 0, this.n - 1, l, r);
  }

  // Point update: set arr[idx] = val
  updatePoint(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const left = 2 * node + 1;
    const right = 2 * node + 2;

    if (idx <= mid) {
      this.updatePoint(left, start, mid, idx, val);
    } else {
      this.updatePoint(right, mid + 1, end, idx, val);
    }

    this.tree[node] = this.tree[left] + this.tree[right];
  }

  // Public update API
  update(idx, val) {
    this.updatePoint(0, 0, this.n - 1, idx, val);
  }
}

// Test Cases
const arr = [1, 3, 5, 7, 9, 11];
const st = new SegmentTree(arr);

console.log(st.query(1, 3)); // 3 + 5 + 7 = 15
st.update(1, 10); // arr[1] = 10

console.log(st.query(1, 3)); // 10 + 5 + 7 = 22
