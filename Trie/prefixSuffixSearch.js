// Prefix and Suffix Search
class WordFilter {
  constructor(words) {
    this.trie = {};

    for (let weight = 0; weight < words.length; weight++) {
      const word = words[weight];

      // Insert all suffix#prefix combinations
      for (let i = 0; i <= word.length; i++) {
        const key = word.slice(i) + "#" + word;
        let node = this.trie;

        for (const char of key) {
          if (!node[char]) node[char] = {};
          node = node[char];
          node.weight = weight;
        }
      }
    }
  }

  f(prefix, suffix) {
    const key = suffix + "#" + prefix;
    let node = this.trie;

    for (const char of key) {
      if (!node[char]) return -1;
      node = node[char];
    }

    return node.weight || -1;
  }
}

// Test Cases
const wf = new WordFilter(["apple"]);
console.log(wf.f("a", "e")); // 0
