// Binary Tree Inorder Traversal - Recursive & Iterative

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Recursive
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

// Iterative
const inorderIterative = (root) => {
  const result = [], stack = [];
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

// Test Cases
const root = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));
console.log(inorderTraversal(root)); // [1, 3, 2]
console.log(inorderIterative(root)); // [1, 3, 2]