// Path Sum Binary Tree Problems

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Path Sum I
const hasPathSum = (root, targetSum) => {
  if (!root) return false;
  
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }
  
  const remainingSum = targetSum - root.val;
  return hasPathSum(root.left, remainingSum) || 
         hasPathSum(root.right, remainingSum);
};

// Path Sum II
const pathSum = (root, targetSum) => {
  const result = [];
  
  const dfs = (node, currentSum, path) => {
    if (!node) return;
    
    path.push(node.val);
    currentSum += node.val;
    
    if (!node.left && !node.right && currentSum === targetSum) {
      result.push([...path]);
    }
    
    dfs(node.left, currentSum, path);
    dfs(node.right, currentSum, path);
    
    path.pop();
  };
  
  dfs(root, 0, []);
  return result;
};

// Path Sum III
const pathSum3 = (root, targetSum) => {
  const prefixSumCount = new Map([[0, 1]]);
  
  const dfs = (node, currentSum) => {
    if (!node) return 0;
    
    currentSum += node.val;
    let count = prefixSumCount.get(currentSum - targetSum) || 0;
    
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
    
    count += dfs(node.left, currentSum);
    count += dfs(node.right, currentSum);
    
    prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1);
    
    return count;
  };
  
  return dfs(root, 0);
};

// Binary Tree Maximum Path Sum
const maxPathSum = (root) => {
  let maxSum = -Infinity;
  
  const maxGain = (node) => {
    if (!node) return 0;
    
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);
    
    const priceNewPath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, priceNewPath);
    
    return node.val + Math.max(leftGain, rightGain);
  };
  
  maxGain(root);
  return maxSum;
};

// Sum Root to Leaf Numbers
const sumNumbers = (root) => {
  const dfs = (node, currentNumber) => {
    if (!node) return 0;
    
    currentNumber = currentNumber * 10 + node.val;
    
    if (!node.left && !node.right) {
      return currentNumber;
    }
    
    return dfs(node.left, currentNumber) + dfs(node.right, currentNumber);
  };
  
  return dfs(root, 0);
};

// Binary Tree Paths
const binaryTreePaths = (root) => {
  const result = [];
  
  const dfs = (node, path) => {
    if (!node) return;
    
    path += node.val;
    
    if (!node.left && !node.right) {
      result.push(path);
    } else {
      dfs(node.left, path + '->');
      dfs(node.right, path + '->');
    }
  };
  
  dfs(root, '');
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

// Lowest Common Ancestor
const lowestCommonAncestor = (root, p, q) => {
  if (!root || root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  if (left && right) return root;
  return left || right;
};

// Maximum Width of Binary Tree
const widthOfBinaryTree = (root) => {
  if (!root) return 0;
  
  let maxWidth = 0;
  const queue = [[root, 0]];
  
  while (queue.length) {
    const levelSize = queue.length;
    const levelStart = queue[0][1];
    let levelEnd = levelStart;
    
    for (let i = 0; i < levelSize; i++) {
      const [node, index] = queue.shift();
      levelEnd = index;
      
      if (node.left) {
        queue.push([node.left, 2 * (index - levelStart)]);
      }
      if (node.right) {
        queue.push([node.right, 2 * (index - levelStart) + 1]);
      }
    }
    
    maxWidth = Math.max(maxWidth, levelEnd - levelStart + 1);
  }
  
  return maxWidth;
};

// Count Good Nodes
const goodNodes = (root) => {
  const dfs = (node, maxSoFar) => {
    if (!node) return 0;
    
    let count = node.val >= maxSoFar ? 1 : 0;
    const newMax = Math.max(maxSoFar, node.val);
    
    count += dfs(node.left, newMax);
    count += dfs(node.right, newMax);
    
    return count;
  };
  
  return dfs(root, -Infinity);
};

// Helper function
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
const root1 = createTreeFromArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);
console.log(hasPathSum(root1, 22)); // true
console.log(pathSum(root1, 22)); // [[5,4,11,2], [5,8,4,5]]

const root2 = createTreeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
console.log(pathSum3(root2, 8)); // 3

const root3 = createTreeFromArray([1, 2, 3]);
console.log(maxPathSum(root3)); // 6

const root4 = createTreeFromArray([1, 2, 3]);
console.log(sumNumbers(root4)); // 25 (12 + 13)

const root5 = createTreeFromArray([1, 2, 3, null, 5]);
console.log(binaryTreePaths(root5)); // ["1->2->5", "1->3"]

const root6 = createTreeFromArray([1, 2, 3, 4, 5]);
console.log(diameterOfBinaryTree(root6)); // 3

const root7 = createTreeFromArray([3, 1, 4, 3, null, 1, 5]);
console.log(goodNodes(root7)); // 4