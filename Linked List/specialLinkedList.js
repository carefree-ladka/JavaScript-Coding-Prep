// Special Linked List Problems

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Reverse Linked List II
const reverseBetween = (head, left, right) => {
  if (!head || left === right) return head;
  
  const dummy = new ListNode(0, head);
  let prev = dummy;
  
  // Move to position before left
  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }
  
  // Reverse from left to right
  let current = prev.next;
  for (let i = 0; i < right - left; i++) {
    const next = current.next;
    current.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  
  return dummy.next;
};

// Split Linked List in Parts
const splitListToParts = (head, k) => {
  // Count total length
  let length = 0, current = head;
  while (current) {
    length++;
    current = current.next;
  }
  
  const partSize = Math.floor(length / k);
  const extraParts = length % k;
  
  const result = [];
  current = head;
  
  for (let i = 0; i < k; i++) {
    const partHead = current;
    const currentPartSize = partSize + (i < extraParts ? 1 : 0);
    
    // Move to end of current part
    for (let j = 0; j < currentPartSize - 1 && current; j++) {
      current = current.next;
    }
    
    // Break the connection
    if (current) {
      const next = current.next;
      current.next = null;
      current = next;
    }
    
    result.push(partHead);
  }
  
  return result;
};

// Next Greater Node In Linked List
const nextLargerNodes = (head) => {
  const values = [];
  while (head) {
    values.push(head.val);
    head = head.next;
  }
  
  const result = new Array(values.length).fill(0);
  const stack = [];
  
  for (let i = 0; i < values.length; i++) {
    while (stack.length && values[i] > values[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = values[i];
    }
    stack.push(i);
  }
  
  return result;
};

// Linked List Components
const numComponents = (head, nums) => {
  const numSet = new Set(nums);
  let components = 0;
  let inComponent = false;
  
  while (head) {
    if (numSet.has(head.val)) {
      if (!inComponent) {
        components++;
        inComponent = true;
      }
    } else {
      inComponent = false;
    }
    head = head.next;
  }
  
  return components;
};

// Delete Nodes And Return Forest (for trees, but similar concept)
// Swapping Nodes in a Linked List
const swapNodes = (head, k) => {
  let first = head, second = head;
  
  // Move first to kth node
  for (let i = 1; i < k; i++) {
    first = first.next;
  }
  
  // Move second to kth node from end
  let temp = first;
  while (temp.next) {
    temp = temp.next;
    second = second.next;
  }
  
  // Swap values
  [first.val, second.val] = [second.val, first.val];
  
  return head;
};

// Remove Linked List Elements
const removeElements = (head, val) => {
  const dummy = new ListNode(0, head);
  let current = dummy;
  
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  
  return dummy.next;
};

// Design Linked List (Singly)
class MyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  get(index) {
    if (index < 0 || index >= this.size) return -1;
    
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    
    return current.val;
  }
  
  addAtHead(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    this.size++;
  }
  
  addAtTail(val) {
    const newNode = new ListNode(val);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.size++;
  }
  
  addAtIndex(index, val) {
    if (index > this.size) return;
    if (index <= 0) {
      this.addAtHead(val);
      return;
    }
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }
    
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    
    const newNode = new ListNode(val, current.next);
    current.next = newNode;
    this.size++;
  }
  
  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return;
    
    if (index === 0) {
      this.head = this.head.next;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      current.next = current.next.next;
    }
    
    this.size--;
  }
}

// Convert Sorted List to Binary Search Tree
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const sortedListToBST = (head) => {
  if (!head) return null;
  if (!head.next) return new TreeNode(head.val);
  
  // Find middle node
  let slow = head, fast = head, prev = null;
  
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Break the list
  if (prev) prev.next = null;
  
  // Create root with middle node
  const root = new TreeNode(slow.val);
  
  // Recursively build left and right subtrees
  root.left = sortedListToBST(head);
  root.right = sortedListToBST(slow.next);
  
  return root;
};

// Merge In Between Linked Lists
const mergeInBetween = (list1, a, b, list2) => {
  let current = list1;
  
  // Find node before position a
  for (let i = 0; i < a - 1; i++) {
    current = current.next;
  }
  
  const beforeA = current;
  
  // Find node after position b
  for (let i = a - 1; i <= b; i++) {
    current = current.next;
  }
  
  const afterB = current;
  
  // Connect list1 -> list2 -> remaining list1
  beforeA.next = list2;
  
  // Find tail of list2
  while (list2.next) {
    list2 = list2.next;
  }
  
  list2.next = afterB;
  
  return list1;
};

// Helper functions
const createLinkedList = (arr) => {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
};

const linkedListToArray = (head) => {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
};

// Test Cases
const list1 = createLinkedList([1, 2, 3, 4, 5]);
console.log(linkedListToArray(reverseBetween(list1, 2, 4))); // [1, 4, 3, 2, 5]

const list2 = createLinkedList([1, 2, 3]);
console.log(splitListToParts(list2, 5).map(part => linkedListToArray(part))); 
// [[1], [2], [3], [], []]

const list3 = createLinkedList([2, 1, 5]);
console.log(nextLargerNodes(list3)); // [5, 5, 0]

const list4 = createLinkedList([0, 1, 2, 3]);
console.log(numComponents(list4, [0, 1, 3])); // 2

const list5 = createLinkedList([1, 2, 3, 4, 5]);
console.log(linkedListToArray(swapNodes(list5, 2))); // [1, 4, 3, 2, 5]

const list6 = createLinkedList([1, 2, 6, 3, 4, 5, 6]);
console.log(linkedListToArray(removeElements(list6, 6))); // [1, 2, 3, 4, 5]

// MyLinkedList test
const myList = new MyLinkedList();
myList.addAtHead(1);
myList.addAtTail(3);
myList.addAtIndex(1, 2);
console.log(myList.get(1)); // 2
myList.deleteAtIndex(1);
console.log(myList.get(1)); // 3