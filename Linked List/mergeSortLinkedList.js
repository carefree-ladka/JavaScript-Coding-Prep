// Merge and Sort Linked List Problems

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Merge Two Sorted Lists
const mergeTwoLists = (list1, list2) => {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  current.next = list1 || list2;
  return dummy.next;
};

// Merge k Sorted Lists
const mergeKLists = (lists) => {
  if (!lists.length) return null;
  
  while (lists.length > 1) {
    const mergedLists = [];
    
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(mergeTwoLists(l1, l2));
    }
    
    lists = mergedLists;
  }
  
  return lists[0];
};

// Sort List (Merge Sort)
const sortList = (head) => {
  if (!head || !head.next) return head;
  
  // Find middle and split
  let prev = null, slow = head, fast = head;
  
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  
  prev.next = null;
  
  // Recursively sort both halves
  const left = sortList(head);
  const right = sortList(slow);
  
  return mergeTwoLists(left, right);
};

// Insertion Sort List
const insertionSortList = (head) => {
  const dummy = new ListNode(0);
  let current = head;
  
  while (current) {
    const next = current.next;
    
    // Find insertion position
    let prev = dummy;
    while (prev.next && prev.next.val < current.val) {
      prev = prev.next;
    }
    
    // Insert current node
    current.next = prev.next;
    prev.next = current;
    
    current = next;
  }
  
  return dummy.next;
};

// Remove Duplicates from Sorted List
const deleteDuplicates = (head) => {
  let current = head;
  
  while (current && current.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  
  return head;
};

// Remove Duplicates from Sorted List II
const deleteDuplicates2 = (head) => {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  
  while (head) {
    if (head.next && head.val === head.next.val) {
      // Skip all duplicates
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      prev.next = head.next;
    } else {
      prev = prev.next;
    }
    head = head.next;
  }
  
  return dummy.next;
};

// Partition List
const partition = (head, x) => {
  const beforeHead = new ListNode(0);
  const afterHead = new ListNode(0);
  let before = beforeHead, after = afterHead;
  
  while (head) {
    if (head.val < x) {
      before.next = head;
      before = before.next;
    } else {
      after.next = head;
      after = after.next;
    }
    head = head.next;
  }
  
  after.next = null;
  before.next = afterHead.next;
  
  return beforeHead.next;
};

// Odd Even Linked List
const oddEvenList = (head) => {
  if (!head || !head.next) return head;
  
  let odd = head, even = head.next, evenHead = even;
  
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  
  odd.next = evenHead;
  return head;
};

// Swap Nodes in Pairs
const swapPairs = (head) => {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  
  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;
    
    // Swap
    prev.next = second;
    first.next = second.next;
    second.next = first;
    
    prev = first;
  }
  
  return dummy.next;
};

// Reverse Nodes in k-Group
const reverseKGroup = (head, k) => {
  // Check if we have k nodes
  let count = 0, current = head;
  while (current && count < k) {
    current = current.next;
    count++;
  }
  
  if (count === k) {
    // Reverse first k nodes
    current = reverseKGroup(current, k);
    
    while (count > 0) {
      const next = head.next;
      head.next = current;
      current = head;
      head = next;
      count--;
    }
    
    head = current;
  }
  
  return head;
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
const list1 = createLinkedList([1, 2, 4]);
const list2 = createLinkedList([1, 3, 4]);
console.log(linkedListToArray(mergeTwoLists(list1, list2))); // [1, 1, 2, 3, 4, 4]

const unsorted = createLinkedList([4, 2, 1, 3]);
console.log(linkedListToArray(sortList(unsorted))); // [1, 2, 3, 4]

const withDuplicates = createLinkedList([1, 1, 2]);
console.log(linkedListToArray(deleteDuplicates(withDuplicates))); // [1, 2]

const withDuplicates2 = createLinkedList([1, 2, 3, 3, 4, 4, 5]);
console.log(linkedListToArray(deleteDuplicates2(withDuplicates2))); // [1, 2, 5]

const toPartition = createLinkedList([1, 4, 3, 2, 5, 2]);
console.log(linkedListToArray(partition(toPartition, 3))); // [1, 2, 2, 4, 3, 5]

const oddEven = createLinkedList([1, 2, 3, 4, 5]);
console.log(linkedListToArray(oddEvenList(oddEven))); // [1, 3, 5, 2, 4]

const toSwap = createLinkedList([1, 2, 3, 4]);
console.log(linkedListToArray(swapPairs(toSwap))); // [2, 1, 4, 3]