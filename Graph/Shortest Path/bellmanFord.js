// Bellman-Ford Algorithm (handles negative weights)
const bellmanFord = (edges, vertices, start) => {
  const distances = {};
  
  // Initialize distances
  for (let i = 0; i < vertices; i++) {
    distances[i] = i === start ? 0 : Infinity;
  }
  
  // Relax edges V-1 times
  for (let i = 0; i < vertices - 1; i++) {
    for (const [u, v, weight] of edges) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
      }
    }
  }
  
  // Check for negative cycles
  for (const [u, v, weight] of edges) {
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      return { hasNegativeCycle: true, distances: null };
    }
  }
  
  return { hasNegativeCycle: false, distances };
};

// Cheapest Flights Within K Stops
const findCheapestPrice = (n, flights, src, dst, k) => {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;
  
  for (let i = 0; i <= k; i++) {
    const temp = [...prices];
    
    for (const [from, to, price] of flights) {
      if (prices[from] !== Infinity) {
        temp[to] = Math.min(temp[to], prices[from] + price);
      }
    }
    prices = temp;
  }
  
  return prices[dst] === Infinity ? -1 : prices[dst];
};

// Test Cases
const edges = [
  [0, 1, -1],
  [0, 2, 4],
  [1, 2, 3],
  [1, 3, 2],
  [1, 4, 2],
  [3, 2, 5],
  [3, 1, 1],
  [4, 3, -3]
];

console.log(bellmanFord(edges, 5, 0));
// { hasNegativeCycle: false, distances: { 0: 0, 1: -1, 2: 2, 3: -2, 4: 1 } }

const flights = [[0,1,100],[1,2,100],[0,2,500]];
console.log(findCheapestPrice(3, flights, 0, 2, 1)); // 200