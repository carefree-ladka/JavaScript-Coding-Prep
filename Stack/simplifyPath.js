// Simplify Path
const simplifyPath = (path) => {
  const stack = [];
  const parts = path.split('/');
  
  for (const part of parts) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (stack.length) stack.pop();
    } else {
      stack.push(part);
    }
  }
  
  return '/' + stack.join('/');
};

// Test Cases
console.log(simplifyPath("/home/")); // "/home"
console.log(simplifyPath("/../")); // "/"
console.log(simplifyPath("/home//foo/")); // "/home/foo"