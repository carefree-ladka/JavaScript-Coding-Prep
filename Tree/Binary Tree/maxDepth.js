// Maximum Depth of Binary Tree - DFS Pattern

const maxDepth = (root) => {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// BFS approach
const maxDepthBFS = (root) => {
  if (!root) return 0;
  const queue = [[root, 1]];
  let maxDepth = 0;
  
  while (queue.length) {
    const [node, depth] = queue.shift();
    maxDepth = Math.max(maxDepth, depth);
    
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }
  return maxDepth;
};

// Test Cases
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(maxDepth(root)); // 3
console.log(maxDepthBFS(root)); // 3