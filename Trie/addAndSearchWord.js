// Add and Search Word - Data structure design
class WordDictionary {
  constructor() {
    this.root = {};
  }
  
  addWord(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.isEnd = true;
  }
  
  search(word) {
    const dfs = (node, i) => {
      if (i === word.length) return !!node.isEnd;
      
      const char = word[i];
      if (char === '.') {
        for (const key in node) {
          if (key !== 'isEnd' && dfs(node[key], i + 1)) return true;
        }
        return false;
      } else {
        return node[char] && dfs(node[char], i + 1);
      }
    };
    
    return dfs(this.root, 0);
  }
}

// Test Cases
const wd = new WordDictionary();
wd.addWord("bad");
wd.addWord("dad");
wd.addWord("mad");
console.log(wd.search("pad")); // false
console.log(wd.search("bad")); // true
console.log(wd.search(".ad")); // true
console.log(wd.search("b..")); // true