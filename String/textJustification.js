// Text Justification
const fullJustify = (words, maxWidth) => {
  const result = [];
  let i = 0;
  
  while (i < words.length) {
    let line = [words[i]];
    let lineLength = words[i].length;
    i++;
    
    while (i < words.length && lineLength + 1 + words[i].length <= maxWidth) {
      line.push(words[i]);
      lineLength += 1 + words[i].length;
      i++;
    }
    
    if (i === words.length || line.length === 1) {
      const leftJustified = line.join(' ');
      result.push(leftJustified + ' '.repeat(maxWidth - leftJustified.length));
    } else {
      const totalSpaces = maxWidth - line.reduce((sum, word) => sum + word.length, 0);
      const gaps = line.length - 1;
      const spacesPerGap = Math.floor(totalSpaces / gaps);
      const extraSpaces = totalSpaces % gaps;
      
      let justified = '';
      for (let j = 0; j < line.length - 1; j++) {
        justified += line[j] + ' '.repeat(spacesPerGap + (j < extraSpaces ? 1 : 0));
      }
      justified += line[line.length - 1];
      result.push(justified);
    }
  }
  return result;
};

// Test Cases
console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16));
// ["This    is    an","example  of text","justification.  "]