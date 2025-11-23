// Add Two Numbers
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

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

// Test Cases
const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
const result = addTwoNumbers(l1, l2);
console.log(result.val, result.next.val, result.next.next.val); // 7 0 8