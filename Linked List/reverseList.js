// Reverse Linked List - Iterative Pattern

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

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

// Test Cases
const list1 = new ListNode(1, new ListNode(2, new ListNode(3)));
const reversed = reverseList(list1);
console.log(reversed.val, reversed.next.val, reversed.next.next.val); // 3 2 1