// Advanced Linked List Problems

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Add Two Numbers
const addTwoNumbers = (l1, l2) => {
  const dummy = new ListNode(0);
  let current = dummy, carry = 0;
  
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    
    l1 = l1?.next;
    l2 = l2?.next;
  }
  
  return dummy.next;
};

// Add Two Numbers II (Most significant digit first)
const addTwoNumbers2 = (l1, l2) => {
  const stack1 = [], stack2 = [];
  
  // Push all values to stacks
  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  
  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }
  
  let head = null, carry = 0;
  
  while (stack1.length || stack2.length || carry) {
    const sum = (stack1.pop() || 0) + (stack2.pop() || 0) + carry;
    carry = Math.floor(sum / 10);
    
    const newNode = new ListNode(sum % 10);
    newNode.next = head;
    head = newNode;
  }
  
  return head;
};

// Copy List with Random Pointer
class RandomNode {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

const copyRandomList = (head) => {
  if (!head) return null;
  
  const map = new Map();
  
  // First pass: create all nodes
  let current = head;
  while (current) {
    map.set(current, new RandomNode(current.val));
    current = current.next;
  }
  
  // Second pass: set next and random pointers
  current = head;
  while (current) {
    const copy = map.get(current);
    copy.next = current.next ? map.get(current.next) : null;
    copy.random = current.random ? map.get(current.random) : null;
    current = current.next;
  }
  
  return map.get(head);
};

// Rotate List
const rotateRight = (head, k) => {
  if (!head || !head.next || k === 0) return head;
  
  // Find length and tail
  let length = 1, tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }
  
  // Make it circular
  tail.next = head;
  
  // Find new tail (length - k % length - 1 steps from head)
  k = k % length;
  let stepsToNewTail = length - k;
  let newTail = head;
  
  for (let i = 1; i < stepsToNewTail; i++) {
    newTail = newTail.next;
  }
  
  const newHead = newTail.next;
  newTail.next = null;
  
  return newHead;
};

// Reorder List
const reorderList = (head) => {
  if (!head || !head.next) return;
  
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let prev = null, current = slow.next;
  slow.next = null;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  // Merge two halves
  let first = head, second = prev;
  while (second) {
    const temp1 = first.next;
    const temp2 = second.next;
    
    first.next = second;
    second.next = temp1;
    
    first = temp1;
    second = temp2;
  }
};

// Remove Zero Sum Consecutive Nodes
const removeZeroSumSublists = (head) => {
  const dummy = new ListNode(0, head);
  const prefixSumMap = new Map();
  let prefixSum = 0;
  
  // First pass: record prefix sums
  for (let node = dummy; node; node = node.next) {
    prefixSum += node.val;
    prefixSumMap.set(prefixSum, node);
  }
  
  // Second pass: remove zero sum sublists
  prefixSum = 0;
  for (let node = dummy; node; node = node.next) {
    prefixSum += node.val;
    node.next = prefixSumMap.get(prefixSum).next;
  }
  
  return dummy.next;
};

// Flatten a Multilevel Doubly Linked List
class DoublyNode {
  constructor(val, prev = null, next = null, child = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
  }
}

const flatten = (head) => {
  if (!head) return head;
  
  const stack = [];
  let current = head;
  
  while (current) {
    if (current.child) {
      if (current.next) {
        stack.push(current.next);
      }
      
      current.next = current.child;
      current.child.prev = current;
      current.child = null;
    }
    
    if (!current.next && stack.length) {
      const next = stack.pop();
      current.next = next;
      next.prev = current;
    }
    
    current = current.next;
  }
  
  return head;
};

// LRU Cache
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// Design Browser History
class BrowserHistory {
  constructor(homepage) {
    this.history = [homepage];
    this.current = 0;
  }
  
  visit(url) {
    this.history = this.history.slice(0, this.current + 1);
    this.history.push(url);
    this.current++;
  }
  
  back(steps) {
    this.current = Math.max(0, this.current - steps);
    return this.history[this.current];
  }
  
  forward(steps) {
    this.current = Math.min(this.history.length - 1, this.current + steps);
    return this.history[this.current];
  }
}

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
const l1 = createLinkedList([2, 4, 3]);
const l2 = createLinkedList([5, 6, 4]);
console.log(linkedListToArray(addTwoNumbers(l1, l2))); // [7, 0, 8] (342 + 465 = 807)

const l3 = createLinkedList([7, 2, 4, 3]);
const l4 = createLinkedList([5, 6, 4]);
console.log(linkedListToArray(addTwoNumbers2(l3, l4))); // [7, 8, 0, 7] (7243 + 564 = 7807)

const toRotate = createLinkedList([1, 2, 3, 4, 5]);
console.log(linkedListToArray(rotateRight(toRotate, 2))); // [4, 5, 1, 2, 3]

const toReorder = createLinkedList([1, 2, 3, 4]);
reorderList(toReorder);
console.log(linkedListToArray(toReorder)); // [1, 4, 2, 3]

const zeroSum = createLinkedList([1, 2, -3, 3, 1]);
console.log(linkedListToArray(removeZeroSumSublists(zeroSum))); // [3, 1]

// LRU Cache test
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // 1
lru.put(3, 3);
console.log(lru.get(2)); // -1
lru.put(4, 4);
console.log(lru.get(1)); // -1
console.log(lru.get(3)); // 3
console.log(lru.get(4)); // 4