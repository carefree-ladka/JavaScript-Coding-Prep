// Kruskal's Algorithm for Minimum Spanning Tree
class UnionFind {
  constructor(n) {
    this.parent = Array(n).fill().map((_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return false;
    
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

const kruskal = (edges, vertices) => {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  
  const uf = new UnionFind(vertices);
  const mst = [];
  let totalWeight = 0;
  
  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      totalWeight += weight;
      
      if (mst.length === vertices - 1) break;
    }
  }
  
  return { mst, totalWeight };
};

// Min Cost to Connect All Points
const minCostConnectPoints = (points) => {
  const n = points.length;
  const edges = [];
  
  // Generate all possible edges
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = Math.abs(points[i][0] - points[j][0]) + 
                   Math.abs(points[i][1] - points[j][1]);
      edges.push([i, j, dist]);
    }
  }
  
  return kruskal(edges, n).totalWeight;
};

// Connecting Cities With Minimum Cost
const minimumCost = (n, connections) => {
  const { mst, totalWeight } = kruskal(connections, n);
  return mst.length === n - 1 ? totalWeight : -1;
};

// Test Cases
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4]
];

console.log(kruskal(edges, 4));
// { mst: [[2, 3, 4], [0, 3, 5], [0, 1, 10]], totalWeight: 19 }

const points = [[0,0],[2,2],[3,10],[5,2],[7,0]];
console.log(minCostConnectPoints(points)); // 20