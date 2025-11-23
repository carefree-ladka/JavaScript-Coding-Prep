// Advanced Binary Search Tree Problems

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// BST Iterator
class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.pushLeft(root);
  }

  pushLeft(node) {
    while (node) {
      this.stack.push(node);
      node = node.left;
    }
  }

  next() {
    const node = this.stack.pop();
    this.pushLeft(node.right);
    return node.val;
  }

  hasNext() {
    return this.stack.length > 0;
  }
}

// Serialize and Deserialize BST
const serializeBST = (root) => {
  const result = [];

  const preorder = (node) => {
    if (!node) return;
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };

  preorder(root);
  return result.join(",");
};

const deserializeBST = (data) => {
  if (!data) return null;

  const values = data.split(",").map(Number);
  let index = 0;

  const build = (min, max) => {
    if (index >= values.length) return null;

    const val = values[index];
    if (val < min || val > max) return null;

    index++;
    const node = new TreeNode(val);
    node.left = build(min, val);
    node.right = build(val, max);

    return node;
  };

  return build(-Infinity, Infinity);
};

// Unique Binary Search Trees
const numTrees = (n) => {
  const dp = new Array(n + 1).fill(0);
  dp[0] = dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }

  return dp[n];
};

// Unique Binary Search Trees II
const generateTrees = (n) => {
  const generate = (start, end) => {
    if (start > end) return [null];

    const result = [];

    for (let i = start; i <= end; i++) {
      const leftTrees = generate(start, i - 1);
      const rightTrees = generate(i + 1, end);

      for (const left of leftTrees) {
        for (const right of rightTrees) {
          const root = new TreeNode(i);
          root.left = left;
          root.right = right;
          result.push(root);
        }
      }
    }

    return result;
  };

  return generate(1, n);
};

// Balance a Binary Search Tree
const balanceBST = (root) => {
  const inorder = [];

  const getInorder = (node) => {
    if (!node) return;
    getInorder(node.left);
    inorder.push(node.val);
    getInorder(node.right);
  };

  const buildBalanced = (start, end) => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new TreeNode(inorder[mid]);

    root.left = buildBalanced(start, mid - 1);
    root.right = buildBalanced(mid + 1, end);

    return root;
  };

  getInorder(root);
  return buildBalanced(0, inorder.length - 1);
};

// Closest Binary Search Tree Value
const closestValue = (root, target) => {
  let closest = root.val;

  while (root) {
    if (Math.abs(root.val - target) < Math.abs(closest - target)) {
      closest = root.val;
    }

    root = target < root.val ? root.left : root.right;
  }

  return closest;
};

// Closest Binary Search Tree Value II
const closestKValues = (root, target, k) => {
  const inorder = [];

  const getInorder = (node) => {
    if (!node) return;
    getInorder(node.left);
    inorder.push(node.val);
    getInorder(node.right);
  };

  getInorder(root);

  // Find closest position
  let left = 0,
    right = inorder.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (inorder[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // Expand around closest position
  const result = [];
  left = left - 1;
  right = left + 1;

  while (result.length < k) {
    if (left < 0) {
      result.push(inorder[right++]);
    } else if (right >= inorder.length) {
      result.push(inorder[left--]);
    } else if (
      Math.abs(inorder[left] - target) <= Math.abs(inorder[right] - target)
    ) {
      result.push(inorder[left--]);
    } else {
      result.push(inorder[right++]);
    }
  }

  return result;
};

// Count Nodes Equal to Average of Subtree
const averageOfSubtree = (root) => {
  let count = 0;

  const dfs = (node) => {
    if (!node) return [0, 0]; // [sum, count]

    const [leftSum, leftCount] = dfs(node.left);
    const [rightSum, rightCount] = dfs(node.right);

    const totalSum = leftSum + rightSum + node.val;
    const totalCount = leftCount + rightCount + 1;

    if (Math.floor(totalSum / totalCount) === node.val) {
      count++;
    }

    return [totalSum, totalCount];
  };

  dfs(root);
  return count;
};

// Largest BST Subtree
const largestBSTSubtree = (root) => {
  let maxSize = 0;

  const dfs = (node) => {
    if (!node) return [true, 0, Infinity, -Infinity]; // [isBST, size, min, max]

    const [leftIsBST, leftSize, leftMin, leftMax] = dfs(node.left);
    const [rightIsBST, rightSize, rightMin, rightMax] = dfs(node.right);

    if (
      leftIsBST &&
      rightIsBST &&
      (leftSize === 0 || leftMax < node.val) &&
      (rightSize === 0 || rightMin > node.val)
    ) {
      const size = leftSize + rightSize + 1;
      maxSize = Math.max(maxSize, size);

      const min = leftSize === 0 ? node.val : leftMin;
      const max = rightSize === 0 ? node.val : rightMax;

      return [true, size, min, max];
    }

    return [false, 0, 0, 0];
  };

  dfs(root);
  return maxSize;
};

// Inorder Successor in BST
const inorderSuccessor = (root, p) => {
  let successor = null;

  while (root) {
    if (p.val < root.val) {
      successor = root;
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return successor;
};

// Helper functions
const createBSTFromArray = (arr) => {
  let root = null;
  for (const val of arr) {
    root = insertIntoBST(root, val);
  }
  return root;
};

const insertIntoBST = (root, val) => {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
};

const inorderTraversal = (root) => {
  const result = [];
  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  };
  inorder(root);
  return result;
};

// Test Cases
const bst = createBSTFromArray([7, 3, 15, null, null, 9, 20]);
const iterator = new BSTIterator(bst);
console.log(iterator.next()); // 3
console.log(iterator.next()); // 7
console.log(iterator.hasNext()); // true

const serialized = serializeBST(bst);
console.log(serialized); // "7,3,15,9,20"
const deserialized = deserializeBST(serialized);
console.log(inorderTraversal(deserialized)); // [3, 7, 9, 15, 20]

console.log(numTrees(3)); // 5

const trees = generateTrees(3);
console.log(trees.length); // 5

console.log(closestValue(bst, 4.5)); // 3 or 7
console.log(closestKValues(bst, 4.5, 2)); // [3, 7]

const avgTree = createBSTFromArray([4, 8, 5, 0, 1, null, 6]);
console.log(averageOfSubtree(avgTree)); // 5
