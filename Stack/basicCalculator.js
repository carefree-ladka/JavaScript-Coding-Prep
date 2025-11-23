// Basic Calculator
const calculate = (s) => {
  const stack = [];
  let num = 0, sign = 1, result = 0;
  
  for (const char of s) {
    if (char >= '0' && char <= '9') {
      num = num * 10 + parseInt(char);
    } else if (char === '+' || char === '-') {
      result += sign * num;
      num = 0;
      sign = char === '+' ? 1 : -1;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop(); // sign
      result += stack.pop(); // result
    }
  }
  
  return result + sign * num;
};

// Test Cases
console.log(calculate("1 + 1")); // 2
console.log(calculate(" 2-1 + 2 ")); // 3
console.log(calculate("(1+(4+5+2)-3)+(6+8)")); // 23