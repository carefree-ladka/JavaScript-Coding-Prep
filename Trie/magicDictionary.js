// Implement Magic Dictionary
class MagicDictionary {
  constructor() {
    this.trie = {};
  }
  
  buildDict(dictionary) {
    for (const word of dictionary) {
      let node = this.trie;
      for (const char of word) {
        if (!node[char]) node[char] = {};
        node = node[char];
      }
      node.isEnd = true;
    }
  }
  
  search(searchWord) {
    const dfs = (node, i, changed) => {
      if (i === searchWord.length) return changed && node.isEnd;
      
      const char = searchWord[i];
      
      // Try exact match
      if (node[char] && dfs(node[char], i + 1, changed)) return true;
      
      // Try changing current character (if not changed yet)
      if (!changed) {
        for (const key in node) {
          if (key !== 'isEnd' && key !== char && dfs(node[key], i + 1, true)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    return dfs(this.trie, 0, false);
  }
}

// Test Cases
const md = new MagicDictionary();
md.buildDict(["hello", "leetcode"]);
console.log(md.search("hello")); // false
console.log(md.search("hhllo")); // true
console.log(md.search("hell")); // false
console.log(md.search("leetcoded")); // false