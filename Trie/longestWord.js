// Longest Word in Dictionary
const longestWord = (words) => {
  const trie = {};
  
  // Build trie
  for (const word of words) {
    let node = trie;
    for (const char of word) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.isEnd = true;
  }
  
  let longest = "";
  
  const dfs = (node, path) => {
    if (path.length > longest.length || 
        (path.length === longest.length && path < longest)) {
      longest = path;
    }
    
    for (const char in node) {
      if (char !== 'isEnd' && node[char].isEnd) {
        dfs(node[char], path + char);
      }
    }
  };
  
  dfs(trie, "");
  return longest;
};

// Test Cases
console.log(longestWord(["w","wo","wor","worl","world"])); // "world"
console.log(longestWord(["a","banana","app","appl","ap","apply","apple"])); // "apple"