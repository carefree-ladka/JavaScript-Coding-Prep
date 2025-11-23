// Basic Linked List Problems

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Reverse Linked List
const reverseList = (head) => {
  let prev = null, current = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
};

// Reverse Linked List (Recursive)
const reverseListRecursive = (head) => {
  if (!head || !head.next) return head;
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
};

// Middle of Linked List
const middleNode = (head) => {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
};

// Linked List Cycle
const hasCycle = (head) => {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  
  return false;
};

// Linked List Cycle II (Find start of cycle)
const detectCycle = (head) => {
  let slow = head, fast = head;
  
  // Detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  
  if (!fast || !fast.next) return null;
  
  // Find start of cycle
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  
  return slow;
};

// Remove Nth Node From End
const removeNthFromEnd = (head, n) => {
  const dummy = new ListNode(0, head);
  let first = dummy, second = dummy;
  
  // Move first n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }
  
  // Move both until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }
  
  second.next = second.next.next;
  return dummy.next;
};

// Delete Node in Linked List (given node only)
const deleteNode = (node) => {
  node.val = node.next.val;
  node.next = node.next.next;
};

// Palindrome Linked List
const isPalindrome = (head) => {
  if (!head || !head.next) return true;
  
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let secondHalf = reverseList(slow.next);
  
  // Compare
  let firstHalf = head;
  while (secondHalf) {
    if (firstHalf.val !== secondHalf.val) return false;
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }
  
  return true;
};

// Intersection of Two Linked Lists
const getIntersectionNode = (headA, headB) => {
  let pA = headA, pB = headB;
  
  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }
  
  return pA;
};

// Convert Binary Number in Linked List to Integer
const getDecimalValue = (head) => {
  let result = 0;
  
  while (head) {
    result = result * 2 + head.val;
    head = head.next;
  }
  
  return result;
};

// Helper function to create linked list from array
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

// Helper function to convert linked list to array
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
console.log(linkedListToArray(reverseList(list1))); // [5, 4, 3, 2, 1]

const list2 = createLinkedList([1, 2, 3, 4, 5]);
console.log(middleNode(list2).val); // 3

const list3 = createLinkedList([1, 2, 3, 4, 5]);
console.log(hasCycle(list3)); // false

const list4 = createLinkedList([1, 2, 3, 4, 5]);
console.log(linkedListToArray(removeNthFromEnd(list4, 2))); // [1, 2, 3, 5]

const palindromeList = createLinkedList([1, 2, 2, 1]);
console.log(isPalindrome(palindromeList)); // true

const binaryList = createLinkedList([1, 0, 1]);
console.log(getDecimalValue(binaryList)); // 5