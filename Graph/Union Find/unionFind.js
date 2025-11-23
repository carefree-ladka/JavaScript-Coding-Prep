// Union Find (Disjoint Set Union) with Path Compression and Union by Rank
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.components--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }

  getComponents() {
    return this.components;
  }
}

// Number of Connected Components
const countComponents = (n, edges) => {
  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    uf.union(u, v);
  }

  return uf.getComponents();
};

// Graph Valid Tree
const validTree = (n, edges) => {
  if (edges.length !== n - 1) return false;

  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) return false; // Cycle detected
  }

  return uf.getComponents() === 1;
};

// Test Cases
const uf = new UnionFind(5);
console.log(uf.union(0, 1)); // true
console.log(uf.union(1, 2)); // true
console.log(uf.connected(0, 2)); // true
console.log(uf.getComponents()); // 3

console.log(
  countComponents(5, [
    [0, 1],
    [1, 2],
    [3, 4],
  ])
); // 2
console.log(
  validTree(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ])
); // true
