// Basic N-ary Tree Problems

class Node {
  constructor(val = 0, children = []) {
    this.val = val;
    this.children = children;
  }
}

// N-ary Tree Preorder Traversal
const preorderNary = (root) => {
  const result = [];
  
  const preorder = (node) => {
    if (!node) return;
    
    result.push(node.val);
    for (const child of node.children) {
      preorder(child);
    }
  };
  
  preorder(root);
  return result;
};

// N-ary Tree Postorder Traversal
const postorderNary = (root) => {
  const result = [];
  
  const postorder = (node) => {
    if (!node) return;
    
    for (const child of node.children) {
      postorder(child);
    }
    result.push(node.val);
  };
  
  postorder(root);
  return result;
};

// N-ary Tree Level Order Traversal
const levelOrderNary = (root) => {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      for (const child of node.children) {
        queue.push(child);
      }
    }
    
    result.push(currentLevel);
  }
  
  return result;
};

// Maximum Depth of N-ary Tree
const maxDepthNary = (root) => {
  if (!root) return 0;
  
  let maxChildDepth = 0;
  for (const child of root.children) {
    maxChildDepth = Math.max(maxChildDepth, maxDepthNary(child));
  }
  
  return 1 + maxChildDepth;
};

// N-ary Tree Preorder Traversal (Iterative)
const preorderIterativeNary = (root) => {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    
    // Add children in reverse order
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  
  return result;
};

// N-ary Tree Postorder Traversal (Iterative)
const postorderIterativeNary = (root) => {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length) {
    const node = stack.pop();
    result.unshift(node.val);
    
    for (const child of node.children) {
      stack.push(child);
    }
  }
  
  return result;
};

// Diameter of N-Ary Tree
const diameterNary = (root) => {
  let diameter = 0;
  
  const dfs = (node) => {
    if (!node) return 0;
    
    const depths = [];
    for (const child of node.children) {
      depths.push(dfs(child));
    }
    
    depths.sort((a, b) => b - a);
    
    // Diameter through this node
    const pathThroughNode = (depths[0] || 0) + (depths[1] || 0);
    diameter = Math.max(diameter, pathThroughNode);
    
    return 1 + (depths[0] || 0);
  };
  
  dfs(root);
  return diameter;
};

// Clone N-ary Tree
const cloneTree = (root) => {
  if (!root) return null;
  
  const clonedChildren = [];
  for (const child of root.children) {
    clonedChildren.push(cloneTree(child));
  }
  
  return new Node(root.val, clonedChildren);
};

// Serialize and Deserialize N-ary Tree
const serializeNary = (root) => {
  if (!root) return '';
  
  const result = [];
  
  const serialize = (node) => {
    if (!node) return;
    
    result.push(node.val);
    result.push(node.children.length);
    
    for (const child of node.children) {
      serialize(child);
    }
  };
  
  serialize(root);
  return result.join(',');
};

const deserializeNary = (data) => {
  if (!data) return null;
  
  const values = data.split(',').map(Number);
  let index = 0;
  
  const deserialize = () => {
    if (index >= values.length) return null;
    
    const val = values[index++];
    const childrenCount = values[index++];
    
    const children = [];
    for (let i = 0; i < childrenCount; i++) {
      children.push(deserialize());
    }
    
    return new Node(val, children);
  };
  
  return deserialize();
};

// Find Root of N-Ary Tree
const findRoot = (tree) => {
  let valueSum = 0;
  
  for (const node of tree) {
    valueSum += node.val;
    for (const child of node.children) {
      valueSum -= child.val;
    }
  }
  
  for (const node of tree) {
    if (node.val === valueSum) {
      return node;
    }
  }
  
  return null;
};

// N-ary Tree Path Sum
const hasPathSumNary = (root, targetSum) => {
  if (!root) return false;
  
  if (root.children.length === 0) {
    return root.val === targetSum;
  }
  
  for (const child of root.children) {
    if (hasPathSumNary(child, targetSum - root.val)) {
      return true;
    }
  }
  
  return false;
};

// Lowest Common Ancestor of N-ary Tree
const lowestCommonAncestorNary = (root, p, q) => {
  if (!root || root === p || root === q) return root;
  
  let foundCount = 0;
  let lca = null;
  
  for (const child of root.children) {
    const result = lowestCommonAncestorNary(child, p, q);
    if (result) {
      foundCount++;
      lca = result;
    }
  }
  
  return foundCount === 2 ? root : lca;
};

// Helper function to create N-ary tree
const createNaryTree = () => {
  // Create tree: 1 -> [3, 2, 4], 3 -> [5, 6]
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

console.log(preorderNary(root)); // [1, 3, 5, 6, 2, 4]
console.log(postorderNary(root)); // [5, 6, 3, 2, 4, 1]
console.log(levelOrderNary(root)); // [[1], [3, 2, 4], [5, 6]]
console.log(maxDepthNary(root)); // 3

console.log(preorderIterativeNary(root)); // [1, 3, 5, 6, 2, 4]
console.log(postorderIterativeNary(root)); // [5, 6, 3, 2, 4, 1]

console.log(diameterNary(root)); // 3

const cloned = cloneTree(root);
console.log(preorderNary(cloned)); // [1, 3, 5, 6, 2, 4]

const serialized = serializeNary(root);
console.log(serialized); // "1,3,3,2,5,0,6,0,2,0,4,0"
const deserialized = deserializeNary(serialized);
console.log(preorderNary(deserialized)); // [1, 3, 5, 6, 2, 4]

console.log(hasPathSumNary(root, 9)); // true (1 + 3 + 5 = 9)