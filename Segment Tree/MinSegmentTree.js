class MinSegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(Infinity);
    this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const left = node * 2 + 1;
    const right = node * 2 + 2;

    this.build(arr, left, start, mid);
    this.build(arr, right, mid + 1, end);

    this.tree[node] = Math.min(this.tree[left], this.tree[right]);
  }

  queryRange(node, start, end, l, r) {
    if (r < start || end < l) return Infinity; // no overlap
    if (l <= start && end <= r) return this.tree[node]; // full overlap

    const mid = Math.floor((start + end) / 2);
    const leftMin = this.queryRange(node * 2 + 1, start, mid, l, r);
    const rightMin = this.queryRange(node * 2 + 2, mid + 1, end, l, r);

    return Math.min(leftMin, rightMin);
  }

  query(l, r) {
    return this.queryRange(0, 0, this.n - 1, l, r);
  }

  updatePoint(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }

    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      this.updatePoint(node * 2 + 1, start, mid, idx, val);
    } else {
      this.updatePoint(node * 2 + 2, mid + 1, end, idx, val);
    }

    this.tree[node] = Math.min(
      this.tree[node * 2 + 1],
      this.tree[node * 2 + 2]
    );
  }

  update(idx, val) {
    this.updatePoint(0, 0, this.n - 1, idx, val);
  }
}

// Test Cases
const arr = [5, 3, 8, 2, 7];
const stMin = new MinSegmentTree(arr);

console.log(stMin.query(1, 4)); // min from 3 to 7 => 2

stMin.update(3, 10); // arr[3] = 10

console.log(stMin.query(1, 4)); // now min = 3
