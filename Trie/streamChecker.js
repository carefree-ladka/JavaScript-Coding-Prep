// Stream of Characters
class StreamChecker {
  constructor(words) {
    this.trie = {};
    this.stream = [];
    
    // Build trie with reversed words
    for (const word of words) {
      let node = this.trie;
      for (let i = word.length - 1; i >= 0; i--) {
        const char = word[i];
        if (!node[char]) node[char] = {};
        node = node[char];
      }
      node.isEnd = true;
    }
  }
  
  query(letter) {
    this.stream.push(letter);
    let node = this.trie;
    
    // Check from the end of stream backwards
    for (let i = this.stream.length - 1; i >= 0; i--) {
      const char = this.stream[i];
      if (!node[char]) return false;
      node = node[char];
      if (node.isEnd) return true;
    }
    
    return false;
  }
}

// Test Cases
const sc = new StreamChecker(["cd", "f", "kl"]);
console.log(sc.query('a')); // false
console.log(sc.query('b')); // false
console.log(sc.query('c')); // false
console.log(sc.query('d')); // true (matches "cd")
console.log(sc.query('e')); // false
console.log(sc.query('f')); // true (matches "f")