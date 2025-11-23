// Design Search Autocomplete System
class AutocompleteSystem {
  constructor(sentences, times) {
    this.trie = {};
    this.current = "";
    
    // Build trie with frequencies
    for (let i = 0; i < sentences.length; i++) {
      this.addSentence(sentences[i], times[i]);
    }
  }
  
  addSentence(sentence, count) {
    let node = this.trie;
    for (const char of sentence) {
      if (!node[char]) node[char] = { sentences: new Map() };
      node = node[char];
      node.sentences.set(sentence, (node.sentences.get(sentence) || 0) + count);
    }
  }
  
  input(c) {
    if (c === '#') {
      this.addSentence(this.current, 1);
      this.current = "";
      return [];
    }
    
    this.current += c;
    let node = this.trie;
    
    // Navigate to current prefix
    for (const char of this.current) {
      if (!node[char]) return [];
      node = node[char];
    }
    
    // Get top 3 sentences
    const candidates = Array.from(node.sentences.entries());
    candidates.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    
    return candidates.slice(0, 3).map(([sentence]) => sentence);
  }
}

// Test Cases
const ac = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
console.log(ac.input('i')); // ["i love you", "island", "i love leetcode"]
console.log(ac.input(' ')); // ["i love you", "i love leetcode"]