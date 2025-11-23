// Redundant Connection using Union Find
const findRedundantConnection = (edges) => {
  const uf = new UnionFind(edges.length + 1);
  
  for (const [u, v] of edges) {
    if (uf.connected(u, v)) {
      return [u, v]; // This edge creates a cycle
    }
    uf.union(u, v);
  }
  
  return [];
};

// Accounts Merge
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
  
  const uf = new UnionFind(id);
  
  // Union emails in same account
  for (const account of accounts) {
    const firstEmailId = emailToId.get(account[1]);
    for (let i = 2; i < account.length; i++) {
      uf.union(firstEmailId, emailToId.get(account[i]));
    }
  }
  
  // Group emails by root
  const groups = new Map();
  for (const [email, emailId] of emailToId) {
    const root = uf.find(emailId);
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
  
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Test Cases
console.log(findRedundantConnection([[1,2],[1,3],[2,3]])); // [2,3]
console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]