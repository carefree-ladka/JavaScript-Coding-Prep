// Grid Union Find - For connectivity problems
class GridUnionFind {
  constructor(m, n) {
    this.m = m;
    this.n = n;
    this.parent = Array(m * n).fill().map((_, i) => i);
    this.rank = new Array(m * n).fill(0);
    this.components = 0;
  }
  
  getIndex(r, c) {
    return r * this.n + c;
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
    
    this.components--;
    return true;
  }
  
  addCell(r, c) {
    const idx = this.getIndex(r, c);
    this.components++;
    
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      
      if (nr >= 0 && nr < this.m && nc >= 0 && nc < this.n) {
        const neighborIdx = this.getIndex(nr, nc);
        if (this.parent[neighborIdx] !== neighborIdx || neighborIdx === idx) {
          this.union(idx, neighborIdx);
        }
      }
    }
  }
  
  connected(r1, c1, r2, c2) {
    return this.find(this.getIndex(r1, c1)) === this.find(this.getIndex(r2, c2));
  }
  
  getComponents() {
    return this.components;
  }
}

// Number of Islands II (Dynamic)
const numIslands2 = (m, n, positions) => {
  const uf = new GridUnionFind(m, n);
  const result = [];
  const isLand = Array(m).fill().map(() => Array(n).fill(false));
  
  for (const [r, c] of positions) {
    if (isLand[r][c]) {
      result.push(uf.getComponents());
      continue;
    }
    
    isLand[r][c] = true;
    uf.addCell(r, c);
    result.push(uf.getComponents());
  }
  
  return result;
};

// Accounts Merge (Grid-like problem)
const accountsMerge = (accounts) => {
  const emailToName = new Map();
  const emailToId = new Map();
  let id = 0;
  
  // Assign unique ID to each email
  for (const account of accounts) {
    const name = account[0];
    for (let i = 1; i < account.length; i++) {
      const email = account[i];
      if (!emailToId.has(email)) {
        emailToId.set(email, id++);
        emailToName.set(email, name);
      }
    }
  }
  
  const parent = Array(id).fill().map((_, i) => i);
  
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };
  
  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootX] = rootY;
    }
  };
  
  // Union emails in same account
  for (const account of accounts) {
    const firstEmailId = emailToId.get(account[1]);
    for (let i = 2; i < account.length; i++) {
      union(firstEmailId, emailToId.get(account[i]));
    }
  }
  
  // Group emails by root
  const groups = new Map();
  for (const [email, emailId] of emailToId) {
    const root = find(emailId);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }
  
  // Format result
  const result = [];
  for (const emails of groups.values()) {
    emails.sort();
    result.push([emailToName.get(emails[0]), ...emails]);
  }
  
  return result;
};

// Making A Large Island
const largestIsland = (grid) => {
  const n = grid.length;
  const uf = new GridUnionFind(n, n);
  const islandSize = new Map();
  
  // Add all land cells to union find
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        uf.addCell(i, j);
      }
    }
  }
  
  // Calculate size of each island
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        const root = uf.find(uf.getIndex(i, j));
        islandSize.set(root, (islandSize.get(root) || 0) + 1);
      }
    }
  }
  
  let maxSize = Math.max(...islandSize.values(), 0);
  
  // Try flipping each water cell
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        const connectedIslands = new Set();
        
        for (const [dr, dc] of dirs) {
          const nr = i + dr, nc = j + dc;
          
          if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
            connectedIslands.add(uf.find(uf.getIndex(nr, nc)));
          }
        }
        
        let newSize = 1; // The flipped cell itself
        for (const island of connectedIslands) {
          newSize += islandSize.get(island) || 0;
        }
        
        maxSize = Math.max(maxSize, newSize);
      }
    }
  }
  
  return maxSize;
};

// Redundant Connection II (Directed graph in grid-like structure)
const findRedundantDirectedConnection = (edges) => {
  const n = edges.length;
  const parent = Array(n + 1).fill().map((_, i) => i);
  const inDegree = new Array(n + 1).fill(0);
  let candidate1 = null, candidate2 = null;
  
  // Find node with in-degree 2
  for (const [u, v] of edges) {
    inDegree[v]++;
    if (inDegree[v] === 2) {
      candidate1 = [u, v];
      // Find the other edge pointing to v
      for (const [x, y] of edges) {
        if (y === v && x !== u) {
          candidate2 = [x, y];
          break;
        }
      }
      break;
    }
  }
  
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };
  
  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX === rootY) return false;
    parent[rootX] = rootY;
    return true;
  };
  
  // Case 1: No node has in-degree 2, just find cycle
  if (!candidate1) {
    for (const [u, v] of edges) {
      if (!union(u, v)) return [u, v];
    }
  }
  
  // Case 2: One node has in-degree 2
  for (const [u, v] of edges) {
    if (candidate1 && (u === candidate1[0] && v === candidate1[1])) continue;
    if (!union(u, v)) return candidate2;
  }
  
  return candidate1;
};

// Test Cases
console.log(numIslands2(3, 3, [[0,0],[0,1],[1,2],[2,1]])); // [1,1,2,3]

const accounts = [
  ["John","johnsmith@mail.com","john_newyork@mail.com"],
  ["John","johnsmith@mail.com","john00@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
];
console.log(accountsMerge(accounts));

const grid = [[1,0],[0,1]];
console.log(largestIsland(grid)); // 3