// Tree Recursion Problems

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Tree Traversals
const inorderTraversal = (root, result = []) => {
  if (!root) return result;
  
  inorderTraversal(root.left, result);
  result.push(root.val);
  inorderTraversal(root.right, result);
  
  return result;
};

const preorderTraversal = (root, result = []) => {
  if (!root) return result;
  
  result.push(root.val);
  preorderTraversal(root.left, result);
  preorderTraversal(root.right, result);
  
  return result;
};

const postorderTraversal = (root, result = []) => {
  if (!root) return result;
  
  postorderTraversal(root.left, result);
  postorderTraversal(root.right, result);
  result.push(root.val);
  
  return result;
};

// Tree Height/Depth
const maxDepth = (root) => {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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

// Check if Tree is Balanced
const isBalanced = (root) => {
  if (!root) return true;
  
  const leftHeight = maxDepth(root.left);
  const rightHeight = maxDepth(root.right);
  
  return Math.abs(leftHeight - rightHeight) <= 1 && 
         isBalanced(root.left) && 
         isBalanced(root.right);
};

// Check if Two Trees are Same
const isSameTree = (p, q) => {
  if (!p && !q) return true;
  if (!p || !q) return false;
  
  return p.val === q.val && 
         isSameTree(p.left, q.left) && 
         isSameTree(p.right, q.right);
};

// Mirror/Invert Binary Tree
const invertTree = (root) => {
  if (!root) return null;
  
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  
  return root;
};

// Check if Tree is Symmetric
const isSymmetric = (root) => {
  const isMirror = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right) return false;
    
    return left.val === right.val && 
           isMirror(left.left, right.right) && 
           isMirror(left.right, right.left);
  };
  
  return !root || isMirror(root.left, root.right);
};

// Find Maximum Value in Tree
const findMax = (root) => {
  if (!root) return -Infinity;
  
  return Math.max(
    root.val,
    findMax(root.left),
    findMax(root.right)
  );
};

// Search in Binary Tree
const searchBT = (root, target) => {
  if (!root) return false;
  if (root.val === target) return true;
  
  return searchBT(root.left, target) || searchBT(root.right, target);
};

// Path Sum
const hasPathSum = (root, targetSum) => {
  if (!root) return false;
  
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  
  const remainingSum = targetSum - root.val;
  return hasPathSum(root.left, remainingSum) || 
         hasPathSum(root.right, remainingSum);
};

// All Root to Leaf Paths
const binaryTreePaths = (root, path = '', result = []) => {
  if (!root) return result;
  
  path += root.val;
  
  if (!root.left && !root.right) {
    result.push(path);
  } else {
    binaryTreePaths(root.left, path + '->', result);
    binaryTreePaths(root.right, path + '->', result);
  }
  
  return result;
};

// Diameter of Binary Tree
const diameterOfBinaryTree = (root) => {
  let diameter = 0;
  
  const height = (node) => {
    if (!node) return 0;
    
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    
    diameter = Math.max(diameter, leftHeight + rightHeight);
    
    return 1 + Math.max(leftHeight, rightHeight);
  };
  
  height(root);
  return diameter;
};

// Test Cases
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(inorderTraversal(root)); // [4, 2, 5, 1, 3]
console.log(preorderTraversal(root)); // [1, 2, 4, 5, 3]
console.log(postorderTraversal(root)); // [4, 5, 2, 3, 1]
console.log(maxDepth(root)); // 3
console.log(countNodes(root)); // 5
console.log(sumOfNodes(root)); // 15
console.log(isBalanced(root)); // true
console.log(findMax(root)); // 5
console.log(searchBT(root, 4)); // true
console.log(hasPathSum(root, 7)); // true (1->2->4)
console.log(binaryTreePaths(root)); // ["1->2->4", "1->2->5", "1->3"]
console.log(diameterOfBinaryTree(root)); // 3