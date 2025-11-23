// Linked List Cycle - Floyd's Cycle Detection (Two Pointers)

const hasCycle = (head) => {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

// Test Cases
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

const node1 = new ListNode(3);
const node2 = new ListNode(2);
node1.next = node2;
node2.next = node1; // cycle
console.log(hasCycle(node1)); // true