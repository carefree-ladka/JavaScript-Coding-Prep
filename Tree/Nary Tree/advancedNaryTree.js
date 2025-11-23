// Advanced N-ary Tree Problems

class Node {
  constructor(val = 0, children = []) {
    this.val = val;
    this.children = children;
  }
}

// Encode N-ary Tree to Binary Tree
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const encode = (root) => {
  if (!root) return null;
  
  const binaryRoot = new TreeNode(root.val);
  
  if (root.children.length > 0) {
    binaryRoot.left = encode(root.children[0]);
    
    let current = binaryRoot.left;
    for (let i = 1; i < root.children.length; i++) {
      current.right = encode(root.children[i]);
      current = current.right;
    }
  }
  
  return binaryRoot;
};

const decode = (root) => {
  if (!root) return null;
  
  const naryRoot = new Node(root.val);
  let current = root.left;
  
  while (current) {
    naryRoot.children.push(decode(current));
    current = current.right;
  }
  
  return naryRoot;
};

// N-ary Tree with Lock/Unlock Operations
class LockingTree {
  constructor(parent) {
    this.parent = parent;
    this.children = Array(parent.length).fill().map(() => []);
    this.locked = new Array(parent.length).fill(false);
    this.lockedBy = new Array(parent.length).fill(-1);
    
    // Build children array
    for (let i = 1; i < parent.length; i++) {
      this.children[parent[i]].push(i);
    }
  }
  
  lock(num, user) {
    if (this.locked[num]) return false;
    
    // Check if any ancestor is locked
    let current = this.parent[num];
    while (current !== -1) {
      if (this.locked[current]) return false;
      current = this.parent[current];
    }
    
    // Check if any descendant is locked
    if (this.hasLockedDescendant(num)) return false;
    
    this.locked[num] = true;
    this.lockedBy[num] = user;
    return true;
  }
  
  unlock(num, user) {
    if (!this.locked[num] || this.lockedBy[num] !== user) return false;
    
    this.locked[num] = false;
    this.lockedBy[num] = -1;
    return true;
  }
  
  upgrade(num, user) {
    if (this.locked[num]) return false;
    
    // Check if any ancestor is locked
    let current = this.parent[num];
    while (current !== -1) {
      if (this.locked[current]) return false;
      current = this.parent[current];
    }
    
    // Check if at least one descendant is locked by the same user
    const lockedDescendants = this.getLockedDescendants(num, user);
    if (lockedDescendants.length === 0) return false;
    
    // Unlock all descendants and lock current node
    for (const desc of lockedDescendants) {
      this.locked[desc] = false;
      this.lockedBy[desc] = -1;
    }
    
    this.locked[num] = true;
    this.lockedBy[num] = user;
    return true;
  }
  
  hasLockedDescendant(node) {
    if (this.locked[node]) return true;
    
    for (const child of this.children[node]) {
      if (this.hasLockedDescendant(child)) return true;
    }
    
    return false;
  }
  
  getLockedDescendants(node, user) {
    const result = [];
    
    if (this.locked[node] && this.lockedBy[node] === user) {
      result.push(node);
    }
    
    for (const child of this.children[node]) {
      result.push(...this.getLockedDescendants(child, user));
    }
    
    return result;
  }
}

// Maximum Sum of Nodes in N-ary Tree (No Adjacent)
const maxSumNary = (root) => {
  const dfs = (node) => {
    if (!node) return [0, 0]; // [include, exclude]
    
    let includeSum = node.val;
    let excludeSum = 0;
    
    for (const child of node.children) {
      const [childInclude, childExclude] = dfs(child);
      includeSum += childExclude;
      excludeSum += Math.max(childInclude, childExclude);
    }
    
    return [includeSum, excludeSum];
  };
  
  const [include, exclude] = dfs(root);
  return Math.max(include, exclude);
};

// Count Nodes in Complete N-ary Tree
const countNodesNary = (root) => {
  if (!root) return 0;
  
  let count = 1;
  for (const child of root.children) {
    count += countNodesNary(child);
  }
  
  return count;
};

// Find Leaves of N-ary Tree
const findLeavesNary = (root) => {
  const result = [];
  
  const getHeight = (node) => {
    if (!node) return -1;
    
    let maxChildHeight = -1;
    for (const child of node.children) {
      maxChildHeight = Math.max(maxChildHeight, getHeight(child));
    }
    
    const height = maxChildHeight + 1;
    
    if (result.length <= height) {
      result.push([]);
    }
    
    result[height].push(node.val);
    return height;
  };
  
  getHeight(root);
  return result;
};

// N-ary Tree Right Side View
const rightSideViewNary = (root) => {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length) {
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      
      if (i === levelSize - 1) {
        result.push(node.val);
      }
      
      for (const child of node.children) {
        queue.push(child);
      }
    }
  }
  
  return result;
};

// Vertical Order Traversal of N-ary Tree
const verticalOrderNary = (root) => {
  if (!root) return [];
  
  const columnMap = new Map();
  const queue = [[root, 0]]; // [node, column]
  
  while (queue.length) {
    const [node, col] = queue.shift();
    
    if (!columnMap.has(col)) {
      columnMap.set(col, []);
    }
    columnMap.get(col).push(node.val);
    
    for (let i = 0; i < node.children.length; i++) {
      queue.push([node.children[i], col + i - Math.floor(node.children.length / 2)]);
    }
  }
  
  const sortedColumns = Array.from(columnMap.keys()).sort((a, b) => a - b);
  return sortedColumns.map(col => columnMap.get(col));
};

// Sum of Distances in N-ary Tree
const sumOfDistancesNary = (root) => {
  const nodeCount = new Map();
  const result = new Map();
  
  const postorder = (node) => {
    if (!node) return 0;
    
    let count = 1;
    let sum = 0;
    
    for (const child of node.children) {
      const childCount = postorder(child);
      count += childCount;
      sum += result.get(child) + childCount;
    }
    
    nodeCount.set(node, count);
    result.set(node, sum);
    return count;
  };
  
  const preorder = (node, parentSum, totalNodes) => {
    if (!node) return;
    
    if (parentSum !== undefined) {
      result.set(node, parentSum + totalNodes - 2 * nodeCount.get(node));
    }
    
    for (const child of node.children) {
      preorder(child, result.get(node), totalNodes);
    }
  };
  
  postorder(root);
  const totalNodes = nodeCount.get(root);
  preorder(root, undefined, totalNodes);
  
  return result;
};

// Helper function to create N-ary tree
const createNaryTree = () => {
  const node5 = new Node(5);
  const node6 = new Node(6);
  const node3 = new Node(3, [node5, node6]);
  const node2 = new Node(2);
  const node4 = new Node(4);
  const root = new Node(1, [node3, node2, node4]);
  
  return root;
};

// Test Cases
const root = createNaryTree();

// Encode/Decode test
const encoded = encode(root);
const decoded = decode(encoded);
console.log(decoded.val); // 1
console.log(decoded.children.length); // 3

// Locking Tree test
const lockingTree = new LockingTree([-1, 0, 0, 1, 1, 2, 2]);
console.log(lockingTree.lock(2, 2)); // true
console.log(lockingTree.unlock(2, 3)); // false
console.log(lockingTree.unlock(2, 2)); // true

console.log(maxSumNary(root)); // Maximum sum without adjacent nodes
console.log(countNodesNary(root)); // 6

console.log(findLeavesNary(root)); // [[5, 6, 2, 4], [3], [1]]
console.log(rightSideViewNary(root)); // [1, 4, 6]

const verticalOrder = verticalOrderNary(root);
console.log(verticalOrder); // Vertical order traversal

const distances = sumOfDistancesNary(root);
console.log(distances.get(root)); // Sum of distances from root