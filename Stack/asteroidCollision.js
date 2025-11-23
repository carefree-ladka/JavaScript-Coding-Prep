// Asteroid Collision using Stack
const asteroidCollision = (asteroids) => {
  const stack = [];
  
  for (const asteroid of asteroids) {
    let exploded = false;
    
    // Handle collision with negative asteroid
    while (stack.length && asteroid < 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      
      if (top < -asteroid) {
        stack.pop(); // Top asteroid explodes
        continue;
      } else if (top === -asteroid) {
        stack.pop(); // Both explode
      }
      
      exploded = true;
      break;
    }
    
    if (!exploded) {
      stack.push(asteroid);
    }
  }
  
  return stack;
};

// Car Fleet using Monotonic Stack concept
const carFleet = (target, position, speed) => {
  const cars = position.map((pos, i) => [pos, speed[i]]);
  cars.sort((a, b) => b[0] - a[0]); // Sort by position descending
  
  const stack = [];
  
  for (const [pos, spd] of cars) {
    const time = (target - pos) / spd;
    
    // If current car takes longer, it forms a new fleet
    if (!stack.length || time > stack[stack.length - 1]) {
      stack.push(time);
    }
  }
  
  return stack.length;
};

// Remove All Adjacent Duplicates
const removeDuplicates = (s) => {
  const stack = [];
  
  for (const char of s) {
    if (stack.length && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  
  return stack.join('');
};

// Remove All Adjacent Duplicates II
const removeDuplicates2 = (s, k) => {
  const stack = []; // [char, count]
  
  for (const char of s) {
    if (stack.length && stack[stack.length - 1][0] === char) {
      stack[stack.length - 1][1]++;
      if (stack[stack.length - 1][1] === k) {
        stack.pop();
      }
    } else {
      stack.push([char, 1]);
    }
  }
  
  let result = '';
  for (const [char, count] of stack) {
    result += char.repeat(count);
  }
  
  return result;
};

// Valid Stack Sequences
const validateStackSequences = (pushed, popped) => {
  const stack = [];
  let i = 0;
  
  for (const num of pushed) {
    stack.push(num);
    
    while (stack.length && stack[stack.length - 1] === popped[i]) {
      stack.pop();
      i++;
    }
  }
  
  return i === popped.length;
};

// Score of Parentheses using Stack
const scoreOfParentheses = (s) => {
  const stack = [0]; // Start with base score
  
  for (const char of s) {
    if (char === '(') {
      stack.push(0);
    } else {
      const top = stack.pop();
      const newScore = stack.pop() + Math.max(2 * top, 1);
      stack.push(newScore);
    }
  }
  
  return stack[0];
};

// Test Cases
console.log(asteroidCollision([5,10,-5])); // [5,10]
console.log(asteroidCollision([8,-8])); // []
console.log(asteroidCollision([10,2,-5])); // [10]

console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // 3

console.log(removeDuplicates("abbaca")); // "ca"
console.log(removeDuplicates2("abcd", 2)); // "abcd"
console.log(removeDuplicates2("deeedbbcccbdaa", 3)); // "aa"

console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1])); // true
console.log(scoreOfParentheses("(())")); // 2