// Construct Binary Tree Problems

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Construct Binary Tree from Preorder and Inorder
const buildTreePreIn = (preorder, inorder) => {
  if (!preorder.length || !inorder.length) return null;

  const root = new TreeNode(preorder[0]);
  const rootIndex = inorder.indexOf(preorder[0]);

  root.left = buildTreePreIn(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );

  root.right = buildTreePreIn(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );

  return root;
};

// Construct Binary Tree from Inorder and Postorder
const buildTreeInPost = (inorder, postorder) => {
  if (!inorder.length || !postorder.length) return null;

  const rootVal = postorder[postorder.length - 1];
  const root = new TreeNode(rootVal);
  const rootIndex = inorder.indexOf(rootVal);

  root.left = buildTreeInPost(
    inorder.slice(0, rootIndex),
    postorder.slice(0, rootIndex)
  );

  root.right = buildTreeInPost(
    inorder.slice(rootIndex + 1),
    postorder.slice(rootIndex, postorder.length - 1)
  );

  return root;
};

// Construct Binary Tree from Preorder and Postorder
const constructFromPrePost = (preorder, postorder) => {
  if (!preorder.length) return null;

  const root = new TreeNode(preorder[0]);
  if (preorder.length === 1) return root;

  const leftRootVal = preorder[1];
  const leftRootIndex = postorder.indexOf(leftRootVal);

  root.left = constructFromPrePost(
    preorder.slice(1, leftRootIndex + 2),
    postorder.slice(0, leftRootIndex + 1)
  );

  root.right = constructFromPrePost(
    preorder.slice(leftRootIndex + 2),
    postorder.slice(leftRootIndex + 1, postorder.length - 1)
  );

  return root;
};

// Serialize and Deserialize Binary Tree
const serialize = (root) => {
  const result = [];

  const preorder = (node) => {
    if (!node) {
      result.push("null");
      return;
    }

    result.push(node.val.toString());
    preorder(node.left);
    preorder(node.right);
  };

  preorder(root);
  return result.join(",");
};

const deserialize = (data) => {
  const values = data.split(",");
  let index = 0;

  const buildTree = () => {
    if (values[index] === "null") {
      index++;
      return null;
    }

    const node = new TreeNode(parseInt(values[index]));
    index++;

    node.left = buildTree();
    node.right = buildTree();

    return node;
  };

  return buildTree();
};

// Convert Sorted Array to Binary Search Tree
const sortedArrayToBST = (nums) => {
  if (!nums.length) return null;

  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);

  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));

  return root;
};

// Maximum Binary Tree
const constructMaximumBinaryTree = (nums) => {
  if (!nums.length) return null;

  const maxIndex = nums.indexOf(Math.max(...nums));
  const root = new TreeNode(nums[maxIndex]);

  root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));
  root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));

  return root;
};

// Construct Binary Tree from String
const str2tree = (s) => {
  if (!s) return null;

  let index = 0;

  const buildTree = () => {
    if (index >= s.length) return null;

    // Parse number (could be negative)
    let start = index;
    if (s[index] === "-") index++;
    while (index < s.length && s[index] >= "0" && s[index] <= "9") {
      index++;
    }

    const node = new TreeNode(parseInt(s.substring(start, index)));

    // Check for left child
    if (index < s.length && s[index] === "(") {
      index++; // skip '('
      node.left = buildTree();
      index++; // skip ')'
    }

    // Check for right child
    if (index < s.length && s[index] === "(") {
      index++; // skip '('
      node.right = buildTree();
      index++; // skip ')'
    }

    return node;
  };

  return buildTree();
};

// Flatten Binary Tree to Linked List
const flatten = (root) => {
  if (!root) return;

  flatten(root.left);
  flatten(root.right);

  const rightSubtree = root.right;
  root.right = root.left;
  root.left = null;

  // Find the rightmost node
  let current = root;
  while (current.right) {
    current = current.right;
  }

  current.right = rightSubtree;
};

// Clone Binary Tree with Random Pointer
class TreeNodeRandom {
  constructor(val = 0, left = null, right = null, random = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.random = random;
  }
}

const copyRandomBinaryTree = (root) => {
  if (!root) return null;

  const map = new Map();

  const clone = (node) => {
    if (!node) return null;
    if (map.has(node)) return map.get(node);

    const newNode = new TreeNodeRandom(node.val);
    map.set(node, newNode);

    newNode.left = clone(node.left);
    newNode.right = clone(node.right);
    newNode.random = clone(node.random);

    return newNode;
  };

  return clone(root);
};

// Recover Binary Search Tree
const recoverTree = (root) => {
  let first = null,
    second = null,
    prev = null;

  const inorder = (node) => {
    if (!node) return;

    inorder(node.left);

    if (prev && prev.val > node.val) {
      if (!first) first = prev;
      second = node;
    }
    prev = node;

    inorder(node.right);
  };

  inorder(root);

  // Swap the values
  [first.val, second.val] = [second.val, first.val];
};

// Helper functions
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
const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];
const tree1 = buildTreePreIn(preorder, inorder);
console.log(inorderTraversal(tree1)); // [9, 3, 15, 20, 7]

const postorder = [9, 15, 7, 20, 3];
const tree2 = buildTreeInPost(inorder, postorder);
console.log(inorderTraversal(tree2)); // [9, 3, 15, 20, 7]

const serialized = serialize(tree1);
console.log(serialized); // "3,9,null,null,20,15,null,null,7,null,null"
const deserialized = deserialize(serialized);
console.log(inorderTraversal(deserialized)); // [9, 3, 15, 20, 7]

const sortedArray = [-10, -3, 0, 5, 9];
const bst = sortedArrayToBST(sortedArray);
console.log(inorderTraversal(bst)); // [-10, -3, 0, 5, 9]

const maxTree = constructMaximumBinaryTree([3, 2, 1, 6, 0, 5]);
console.log(inorderTraversal(maxTree)); // [3, 2, 1, 0, 5, 6]

const stringTree = str2tree("4(2(3)(1))(6(5))");
console.log(inorderTraversal(stringTree)); // [3, 2, 1, 4, 5, 6]
