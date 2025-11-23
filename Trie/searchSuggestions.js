// Search Suggestions System
const suggestedProducts = (products, searchWord) => {
  products.sort();
  const result = [];
  let left = 0, right = products.length - 1;
  
  for (let i = 0; i < searchWord.length; i++) {
    const char = searchWord[i];
    
    // Narrow down the range
    while (left <= right && (products[left].length <= i || products[left][i] !== char)) {
      left++;
    }
    while (left <= right && (products[right].length <= i || products[right][i] !== char)) {
      right--;
    }
    
    // Get up to 3 suggestions
    const suggestions = [];
    for (let j = left; j <= Math.min(left + 2, right); j++) {
      suggestions.push(products[j]);
    }
    result.push(suggestions);
  }
  
  return result;
};

// Trie approach
const suggestedProductsTrie = (products, searchWord) => {
  const trie = {};
  
  // Build trie
  for (const product of products) {
    let node = trie;
    for (const char of product) {
      if (!node[char]) node[char] = { words: [] };
      node = node[char];
      node.words.push(product);
      node.words.sort();
      if (node.words.length > 3) node.words.pop();
    }
  }
  
  const result = [];
  let node = trie;
  
  for (const char of searchWord) {
    if (node && node[char]) {
      node = node[char];
      result.push([...node.words]);
    } else {
      node = null;
      result.push([]);
    }
  }
  
  return result;
};

// Test Cases
console.log(suggestedProducts(["mobile","mouse","moneypot","monitor","mousepad"], "mouse"));
// [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]