// Doubly Linked List Problems

class DoublyListNode {
  constructor(val = 0, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

// Design Doubly Linked List
class MyLinkedList {
  constructor() {
    this.head = new DoublyListNode(0);
    this.tail = new DoublyListNode(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  
  get(index) {
    if (index < 0 || index >= this.size) return -1;
    
    let current;
    if (index < this.size / 2) {
      current = this.head.next;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail.prev;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }
    
    return current.val;
  }
  
  addAtHead(val) {
    this.addAtIndex(0, val);
  }
  
  addAtTail(val) {
    this.addAtIndex(this.size, val);
  }
  
  addAtIndex(index, val) {
    if (index > this.size) return;
    if (index < 0) index = 0;
    
    let pred, succ;
    if (index < this.size / 2) {
      pred = this.head;
      for (let i = 0; i < index; i++) {
        pred = pred.next;
      }
      succ = pred.next;
    } else {
      succ = this.tail;
      for (let i = 0; i < this.size - index; i++) {
        succ = succ.prev;
      }
      pred = succ.prev;
    }
    
    const newNode = new DoublyListNode(val, pred, succ);
    pred.next = newNode;
    succ.prev = newNode;
    this.size++;
  }
  
  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return;
    
    let pred, succ;
    if (index < this.size / 2) {
      pred = this.head;
      for (let i = 0; i < index; i++) {
        pred = pred.next;
      }
      succ = pred.next.next;
    } else {
      succ = this.tail;
      for (let i = 0; i < this.size - index - 1; i++) {
        succ = succ.prev;
      }
      pred = succ.prev.prev;
    }
    
    pred.next = succ;
    succ.prev = pred;
    this.size--;
  }
}

// LRU Cache using Doubly Linked List
class LRUCacheDoubly {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    
    // Create dummy head and tail
    this.head = new DoublyListNode(0);
    this.tail = new DoublyListNode(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  addNode(node) {
    // Add node right after head
    node.prev = this.head;
    node.next = this.head.next;
    
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  removeNode(node) {
    // Remove an existing node
    const prevNode = node.prev;
    const nextNode = node.next;
    
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  
  moveToHead(node) {
    // Move node to head
    this.removeNode(node);
    this.addNode(node);
  }
  
  popTail() {
    // Remove last node
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }
  
  get(key) {
    const node = this.cache.get(key);
    
    if (node) {
      // Move to head
      this.moveToHead(node);
      return node.val;
    }
    
    return -1;
  }
  
  put(key, value) {
    const node = this.cache.get(key);
    
    if (node) {
      // Update value and move to head
      node.val = value;
      this.moveToHead(node);
    } else {
      const newNode = new DoublyListNode(value);
      newNode.key = key;
      
      if (this.cache.size >= this.capacity) {
        // Remove tail
        const tail = this.popTail();
        this.cache.delete(tail.key);
      }
      
      // Add to head
      this.addNode(newNode);
      this.cache.set(key, newNode);
    }
  }
}

// LFU Cache using Doubly Linked List
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.minFreq = 0;
    this.keyToNode = new Map();
    this.freqToList = new Map();
  }
  
  updateFreq(node) {
    const freq = node.freq;
    
    // Remove from current frequency list
    this.removeFromList(freq, node);
    
    // Add to new frequency list
    node.freq++;
    this.addToList(node.freq, node);
    
    // Update minFreq if needed
    if (freq === this.minFreq && this.getListSize(freq) === 0) {
      this.minFreq++;
    }
  }
  
  removeFromList(freq, node) {
    if (!this.freqToList.has(freq)) return;
    
    const list = this.freqToList.get(freq);
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    
    if (list.head === node) list.head = node.next;
    if (list.tail === node) list.tail = node.prev;
    list.size--;
  }
  
  addToList(freq, node) {
    if (!this.freqToList.has(freq)) {
      this.freqToList.set(freq, { head: null, tail: null, size: 0 });
    }
    
    const list = this.freqToList.get(freq);
    
    if (!list.head) {
      list.head = list.tail = node;
      node.prev = node.next = null;
    } else {
      node.next = list.head;
      node.prev = null;
      list.head.prev = node;
      list.head = node;
    }
    
    list.size++;
  }
  
  getListSize(freq) {
    return this.freqToList.has(freq) ? this.freqToList.get(freq).size : 0;
  }
  
  get(key) {
    if (!this.keyToNode.has(key)) return -1;
    
    const node = this.keyToNode.get(key);
    this.updateFreq(node);
    return node.val;
  }
  
  put(key, value) {
    if (this.capacity === 0) return;
    
    if (this.keyToNode.has(key)) {
      const node = this.keyToNode.get(key);
      node.val = value;
      this.updateFreq(node);
      return;
    }
    
    if (this.keyToNode.size >= this.capacity) {
      // Remove LFU node
      const list = this.freqToList.get(this.minFreq);
      const nodeToRemove = list.tail;
      this.removeFromList(this.minFreq, nodeToRemove);
      this.keyToNode.delete(nodeToRemove.key);
    }
    
    // Add new node
    const newNode = { key, val: value, freq: 1, prev: null, next: null };
    this.keyToNode.set(key, newNode);
    this.addToList(1, newNode);
    this.minFreq = 1;
  }
}

// All O(1) Data Structure
class AllOne {
  constructor() {
    this.keyCount = new Map();
    this.countKeys = new Map();
    this.head = { count: 0, keys: new Set(), prev: null, next: null };
    this.tail = { count: Infinity, keys: new Set(), prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  inc(key) {
    const count = this.keyCount.get(key) || 0;
    this.keyCount.set(key, count + 1);
    
    const currentNode = this.countKeys.get(count);
    const newCount = count + 1;
    let newNode = this.countKeys.get(newCount);
    
    if (!newNode) {
      newNode = { count: newCount, keys: new Set(), prev: null, next: null };
      this.countKeys.set(newCount, newNode);
      
      const insertAfter = currentNode || this.head;
      newNode.next = insertAfter.next;
      newNode.prev = insertAfter;
      insertAfter.next.prev = newNode;
      insertAfter.next = newNode;
    }
    
    newNode.keys.add(key);
    
    if (currentNode) {
      currentNode.keys.delete(key);
      if (currentNode.keys.size === 0) {
        this.removeNode(currentNode);
        this.countKeys.delete(count);
      }
    }
  }
  
  dec(key) {
    const count = this.keyCount.get(key);
    if (!count) return;
    
    if (count === 1) {
      this.keyCount.delete(key);
    } else {
      this.keyCount.set(key, count - 1);
    }
    
    const currentNode = this.countKeys.get(count);
    currentNode.keys.delete(key);
    
    if (count > 1) {
      const newCount = count - 1;
      let newNode = this.countKeys.get(newCount);
      
      if (!newNode) {
        newNode = { count: newCount, keys: new Set(), prev: null, next: null };
        this.countKeys.set(newCount, newNode);
        
        newNode.next = currentNode;
        newNode.prev = currentNode.prev;
        currentNode.prev.next = newNode;
        currentNode.prev = newNode;
      }
      
      newNode.keys.add(key);
    }
    
    if (currentNode.keys.size === 0) {
      this.removeNode(currentNode);
      this.countKeys.delete(count);
    }
  }
  
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  getMaxKey() {
    return this.tail.prev.keys.size > 0 ? 
           this.tail.prev.keys.values().next().value : "";
  }
  
  getMinKey() {
    return this.head.next.keys.size > 0 ? 
           this.head.next.keys.values().next().value : "";
  }
}

// Test Cases
const dll = new MyLinkedList();
dll.addAtHead(7);
dll.addAtHead(2);
dll.addAtHead(1);
dll.addAtIndex(3, 0);
dll.deleteAtIndex(2);
dll.addAtHead(6);
dll.addAtTail(4);
console.log(dll.get(4)); // 4

const lru = new LRUCacheDoubly(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // 1
lru.put(3, 3);
console.log(lru.get(2)); // -1

const allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
console.log(allOne.getMaxKey()); // "hello"
console.log(allOne.getMinKey()); // "hello"
allOne.inc("leet");
console.log(allOne.getMaxKey()); // "hello"
console.log(allOne.getMinKey()); // "leet"