// Basic Binary Tree Problems

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Binary Tree Traversals
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

const preorderTraversal = (root) => {
  const result = [];
  const preorder = (node) => {
    if (!node) return;
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };
  preorder(root);
  return result;
};

const postorderTraversal = (root) => {
  const result = [];
  const postorder = (node) => {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    result.push(node.val);
  };
  postorder(root);
  return result;
};

// Iterative Traversals
const inorderIterative = (root) => {
  const result = [],
    stack = [];
  let current = root;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
};

const preorderIterative = (root) => {
  if (!root) return [];

  const result = [],
    stack = [root];

  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
};

const postorderIterative = (root) => {
  if (!root) return [];

  const result = [],
    stack = [root];

  while (stack.length) {
    const node = stack.pop();
    result.unshift(node.val);

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return result;
};

// Level Order Traversal
const levelOrder = (root) => {
  if (!root) return [];

  const result = [],
    queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
};

// Maximum Depth
const maxDepth = (root) => {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// Minimum Depth
const minDepth = (root) => {
  if (!root) return 0;
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};

// Same Tree
const isSameTree = (p, q) => {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

// Symmetric Tree
const isSymmetric = (root) => {
  const isMirror = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    );
  };

  return !root || isMirror(root.left, root.right);
};

// Invert Binary Tree
const invertTree = (root) => {
  if (!root) return null;

  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);

  return root;
};

// Count Nodes
const countNodes = (root) => {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

// Sum of All Nodes
const sumOfNodes = (root) => {
  if (!root) return 0;
  return root.val + sumOfNodes(root.left) + sumOfNodes(root.right);
};

// Helper function to create tree from array (level order)
const createTreeFromArray = (arr) => {
  if (!arr.length || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (queue.length && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }

  return root;
};

// Test Cases
const root = createTreeFromArray([3, 9, 20, null, null, 15, 7]);

console.log(inorderTraversal(root)); // [9, 3, 15, 20, 7]
console.log(preorderTraversal(root)); // [3, 9, 20, 15, 7]
console.log(postorderTraversal(root)); // [9, 15, 7, 20, 3]
console.log(levelOrder(root)); // [[3], [9, 20], [15, 7]]
console.log(maxDepth(root)); // 3
console.log(minDepth(root)); // 2
console.log(countNodes(root)); // 5
console.log(sumOfNodes(root)); // 54

const symmetric = createTreeFromArray([1, 2, 2, 3, 4, 4, 3]);
console.log(isSymmetric(symmetric)); // true

const tree1 = createTreeFromArray([1, 2, 3]);
const tree2 = createTreeFromArray([1, 2, 3]);
console.log(isSameTree(tree1, tree2)); // true
