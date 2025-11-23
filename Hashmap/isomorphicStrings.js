// Isomorphic Strings
const isIsomorphic = (s, t) => {
  const mapS = {}, mapT = {};
  
  for (let i = 0; i < s.length; i++) {
    const charS = s[i], charT = t[i];
    
    if (mapS[charS] && mapS[charS] !== charT) return false;
    if (mapT[charT] && mapT[charT] !== charS) return false;
    
    mapS[charS] = charT;
    mapT[charT] = charS;
  }
  return true;
};

// Test Cases
console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false