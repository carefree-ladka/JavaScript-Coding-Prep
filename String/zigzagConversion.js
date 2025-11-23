// Zigzag Conversion
const convert = (s, numRows) => {
  if (numRows === 1) return s;
  
  const rows = Array(numRows).fill().map(() => []);
  let row = 0, direction = 1;
  
  for (const char of s) {
    rows[row].push(char);
    row += direction;
    if (row === numRows - 1 || row === 0) direction = -direction;
  }
  
  return rows.map(row => row.join('')).join('');
};

// Test Cases
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"