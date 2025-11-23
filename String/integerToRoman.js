// Integer to Roman
const intToRoman = (num) => {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let result = "";
  
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) {
      result += syms[i];
      num -= vals[i];
    }
  }
  return result;
};

// Test Cases
console.log(intToRoman(3749)); // "MMMDCCXLIX"
console.log(intToRoman(58)); // "LVIII"