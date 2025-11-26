// Memoization utility for async functions
function memoizeAsync(fn, keyGenerator = (...args) => JSON.stringify(args)) {
  const cache = new Map();

  return async function (...args) {
    const key = keyGenerator(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = await fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Memoization with TTL (Time To Live)
function memoizeAsyncTTL(
  fn,
  ttl = 60000,
  keyGenerator = (...args) => JSON.stringify(args)
) {
  const cache = new Map();

  return async function (...args) {
    const key = keyGenerator(...args);
    const now = Date.now();

    if (cache.has(key)) {
      const { value, timestamp } = cache.get(key);
      if (now - timestamp < ttl) {
        return value;
      }
      cache.delete(key);
    }

    const result = await fn.apply(this, args);
    cache.set(key, { value: result, timestamp: now });
    return result;
  };
}

// Callback-based async function memoization
function memoizeCallback(
  fn,
  keyGenerator = (...args) => JSON.stringify(args.slice(0, -1))
) {
  const cache = new Map();

  return function (...args) {
    const callback = args.pop();
    const key = keyGenerator(...args);

    if (cache.has(key)) {
      const result = cache.get(key);
      setTimeout(() => callback(null, result), 0);
      return;
    }

    fn(...args, (err, result) => {
      if (!err) {
        cache.set(key, result);
      }
      callback(err, result);
    });
  };
}

// Usage Examples

// 1. Basic async memoization
const fetchUser = memoizeAsync(async (id) => {
  console.log(`Fetching user ${id}...`);
  const response = await fetch(`/api/users/${id}`);
  return response.json();
});

// 2. Memoization with TTL
const fetchUserTTL = memoizeAsyncTTL(async (id) => {
  console.log(`Fetching user ${id}...`);
  return { id, name: `User ${id}`, timestamp: Date.now() };
}, 5000); // 5 second TTL

// 3. Callback-based memoization
const getUserCallback = memoizeCallback((id, callback) => {
  console.log(`Fetching user ${id}...`);
  setTimeout(() => {
    callback(null, { id, name: `User ${id}` });
  }, 1000);
});

// Test functions
async function testMemoization() {
  console.log("=== Basic Async Memoization ===");
  console.log(await fetchUserTTL(1)); // Cache miss
  console.log(await fetchUserTTL(1)); // Cache hit
  console.log(await fetchUserTTL(2)); // Cache miss

  console.log("\n=== Callback Memoization ===");
  getUserCallback(1, (err, result) => console.log("First call:", result));
  getUserCallback(1, (err, result) =>
    console.log("Second call (cached):", result)
  );
  getUserCallback(2, (err, result) => console.log("Third call:", result));
}

// Advanced memoization with custom key generator
const memoizedFetch = memoizeAsync(
  async (url, options = {}) => {
    console.log(`Fetching: ${url}`);
    return { url, data: "mock data", timestamp: Date.now() };
  },
  (url, options) => `${url}-${JSON.stringify(options)}`
);

testMemoization();
