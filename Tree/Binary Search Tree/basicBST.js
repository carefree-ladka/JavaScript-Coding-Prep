// Basic Binary Search Tree Problems

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Search in BST
const searchBST = (root, val) => {
  if (!root || root.val === val) return root;

  return val < root.val
    ? searchBST(root.left, val)
    : searchBST(root.right, val);
};

// Insert into BST
const insertIntoBST = (root, val) => {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
};

// Delete Node in BST
const deleteNode = (root, key) => {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node to delete found
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Node has both children
    const minNode = findMin(root.right);
    root.val = minNode.val;
    root.right = deleteNode(root.right, minNode.val);
  }

  return root;
};

const findMin = (node) => {
  while (node.left) {
    node = node.left;
  }
  return node;
};

// Validate Binary Search Tree
const isValidBST = (root) => {
  const validate = (node, min, max) => {
    if (!node) return true;

    if (node.val <= min || node.val >= max) return false;

    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  };

  return validate(root, -Infinity, Infinity);
};

// Kth Smallest Element in BST
const kthSmallest = (root, k) => {
  let count = 0,
    result = null;

  const inorder = (node) => {
    if (!node || result !== null) return;

    inorder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  };

  inorder(root);
  return result;
};

// Lowest Common Ancestor in BST
const lowestCommonAncestor = (root, p, q) => {
  if (!root) return null;

  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }

  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }

  return root;
};

// Convert BST to Greater Tree
const convertBST = (root) => {
  let sum = 0;

  const reverseInorder = (node) => {
    if (!node) return;

    reverseInorder(node.right);
    sum += node.val;
    node.val = sum;
    reverseInorder(node.left);
  };

  reverseInorder(root);
  return root;
};

// Range Sum of BST
const rangeSumBST = (root, low, high) => {
  if (!root) return 0;

  let sum = 0;

  if (root.val >= low && root.val <= high) {
    sum += root.val;
  }

  if (root.val > low) {
    sum += rangeSumBST(root.left, low, high);
  }

  if (root.val < high) {
    sum += rangeSumBST(root.right, low, high);
  }

  return sum;
};

// Minimum Absolute Difference in BST
const getMinimumDifference = (root) => {
  let minDiff = Infinity,
    prev = null;

  const inorder = (node) => {
    if (!node) return;

    inorder(node.left);

    if (prev !== null) {
      minDiff = Math.min(minDiff, node.val - prev);
    }
    prev = node.val;

    inorder(node.right);
  };

  inorder(root);
  return minDiff;
};

// Two Sum IV - Input is a BST
const findTarget = (root, k) => {
  const values = new Set();

  const inorder = (node) => {
    if (!node) return false;

    if (values.has(k - node.val)) return true;
    values.add(node.val);

    return inorder(node.left) || inorder(node.right);
  };

  return inorder(root);
};

// Mode in BST
const findMode = (root) => {
  let maxCount = 0,
    currentCount = 0,
    prev = null;
  const modes = [];

  const inorder = (node) => {
    if (!node) return;

    inorder(node.left);

    if (prev === null || node.val !== prev) {
      currentCount = 1;
    } else {
      currentCount++;
    }

    if (currentCount > maxCount) {
      maxCount = currentCount;
      modes.length = 0;
      modes.push(node.val);
    } else if (currentCount === maxCount) {
      modes.push(node.val);
    }

    prev = node.val;
    inorder(node.right);
  };

  inorder(root);
  return modes;
};

// Trim BST
const trimBST = (root, low, high) => {
  if (!root) return null;

  if (root.val < low) {
    return trimBST(root.right, low, high);
  }

  if (root.val > high) {
    return trimBST(root.left, low, high);
  }

  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);

  return root;
};

// Helper functions
const createBSTFromArray = (arr) => {
  let root = null;
  for (const val of arr) {
    root = insertIntoBST(root, val);
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
let bst = createBSTFromArray([4, 2, 7, 1, 3]);

console.log(searchBST(bst, 2)?.val); // 2
console.log(isValidBST(bst)); // true
console.log(kthSmallest(bst, 1)); // 1

bst = insertIntoBST(bst, 5);
console.log(inorderTraversal(bst)); // [1, 2, 3, 4, 5, 7]

console.log(rangeSumBST(bst, 3, 7)); // 19 (3+4+5+7)
console.log(getMinimumDifference(bst)); // 1
console.log(findTarget(bst, 9)); // true (2+7=9)

const modes = findMode(createBSTFromArray([1, 1, 2, 2, 2]));
console.log(modes); // [2]

const trimmed = trimBST(bst, 3, 7);
console.log(inorderTraversal(trimmed)); // [3, 4, 5, 7]
