/**
 * Utility Wrappers - Essential function wrappers
 * Most asked at: All companies (85% frequency)
 *
 * Common utility wrappers that enhance function behavior
 */

// Utility 1: withTimeout - Add timeout to any promise/function
function withTimeout(
  promiseOrFn,
  timeout,
  timeoutError = new Error("Operation timeout")
) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(timeoutError), timeout)
  );

  const promise =
    typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;

  return Promise.race([promise, timeoutPromise]);
}

// Utility 2: withRetry - Add retry logic to any function
function withRetry(fn, options = {}) {
  const { retries = 3, delay = 1000, backoff = 1, maxDelay = 30000 } = options;

  return async function (...args) {
    let attempt = 0;
    let currentDelay = delay;

    while (attempt <= retries) {
      try {
        return await fn.apply(this, args);
      } catch (error) {
        attempt++;

        if (attempt > retries) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        currentDelay = Math.min(currentDelay * backoff, maxDelay);
      }
    }
  };
}

// Utility 3: withCache - Add caching to any function
function withCache(fn, options = {}) {
  const {
    ttl = Infinity,
    maxSize = Infinity,
    keyFn = JSON.stringify,
  } = options;
  const cache = new Map();

  return function (...args) {
    const key = keyFn(args);
    const cached = cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }

    const result = fn.apply(this, args);

    // Handle cache size limit
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  };
}

// Utility 4: withRateLimit - Rate limit function calls
function withRateLimit(fn, limit, window = 1000) {
  const calls = [];

  return function (...args) {
    const now = Date.now();

    // Remove old calls outside the window
    while (calls.length > 0 && now - calls[0] > window) {
      calls.shift();
    }

    if (calls.length >= limit) {
      throw new Error("Rate limit exceeded");
    }

    calls.push(now);
    return fn.apply(this, args);
  };
}

// Utility 5: withFallback - Add fallback for failed operations
function withFallback(fn, fallbackFn) {
  return async function (...args) {
    try {
      return await fn.apply(this, args);
    } catch (error) {
      return fallbackFn.apply(this, [error, ...args]);
    }
  };
}

// Utility 6: withValidation - Add input validation
function withValidation(fn, validator) {
  return function (...args) {
    const validation = validator(args);
    if (!validation.valid) {
      throw new Error(validation.error || "Validation failed");
    }
    return fn.apply(this, args);
  };
}

// Utility 7: withLogging - Add logging to function calls
function withLogging(fn, logger = console) {
  return function (...args) {
    const start = Date.now();
    logger.log(`Calling ${fn.name} with args:`, args);

    try {
      const result = fn.apply(this, args);

      if (result instanceof Promise) {
        return result
          .then((res) => {
            logger.log(`${fn.name} completed in ${Date.now() - start}ms:`, res);
            return res;
          })
          .catch((err) => {
            logger.error(`${fn.name} failed in ${Date.now() - start}ms:`, err);
            throw err;
          });
      }

      logger.log(`${fn.name} completed in ${Date.now() - start}ms:`, result);
      return result;
    } catch (error) {
      logger.error(`${fn.name} failed in ${Date.now() - start}ms:`, error);
      throw error;
    }
  };
}

// Utility 8: RetryAPI - Specialized API retry utility
class RetryAPI {
  constructor(options = {}) {
    this.retries = options.retries || 3;
    this.delay = options.delay || 1000;
    this.backoff = options.backoff || 2;
    this.maxDelay = options.maxDelay || 30000;
    this.retryCondition =
      options.retryCondition || ((error) => error.status >= 500);
  }

  async call(apiFunction, ...args) {
    let attempt = 0;
    let currentDelay = this.delay;

    while (attempt <= this.retries) {
      try {
        return await apiFunction(...args);
      } catch (error) {
        attempt++;

        if (attempt > this.retries || !this.retryCondition(error)) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        currentDelay = Math.min(currentDelay * this.backoff, this.maxDelay);
      }
    }
  }
}

// Utility 9: withCircuitBreaker - Circuit breaker pattern
function withCircuitBreaker(fn, options = {}) {
  const {
    threshold = 5,
    resetTimeout = 60000,
    monitorWindow = 10000,
  } = options;

  let state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
  let failures = 0;
  let lastFailure = 0;
  let successes = 0;

  return async function (...args) {
    const now = Date.now();

    if (state === "OPEN") {
      if (now - lastFailure >= resetTimeout) {
        state = "HALF_OPEN";
        successes = 0;
      } else {
        throw new Error("Circuit breaker is OPEN");
      }
    }

    try {
      const result = await fn.apply(this, args);

      if (state === "HALF_OPEN") {
        successes++;
        if (successes >= 3) {
          state = "CLOSED";
          failures = 0;
        }
      } else {
        failures = 0;
      }

      return result;
    } catch (error) {
      failures++;
      lastFailure = now;

      if (failures >= threshold) {
        state = "OPEN";
      }

      throw error;
    }
  };
}

// Utility 10: withQueue - Queue function calls
function withQueue(fn, concurrency = 1) {
  const queue = [];
  let running = 0;

  const process = async () => {
    if (running >= concurrency || queue.length === 0) return;

    running++;
    const { args, resolve, reject, context } = queue.shift();

    try {
      const result = await fn.apply(context, args);
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      running--;
      process();
    }
  };

  return function (...args) {
    return new Promise((resolve, reject) => {
      queue.push({ args, resolve, reject, context: this });
      process();
    });
  };
}

// Utility 11: compose - Compose multiple utilities
function compose(...wrappers) {
  return function (fn) {
    return wrappers.reduceRight((wrapped, wrapper) => wrapper(wrapped), fn);
  };
}

// Test cases and examples
const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));
const failingAPI = () =>
  Promise.reject({ status: 500, message: "Server error" });
const unreliableAPI = () =>
  Math.random() > 0.7
    ? Promise.resolve("Success")
    : Promise.reject({ status: 500 });

// Test 1: withTimeout
console.log("=== withTimeout ===");
const timeoutAPI = withTimeout(() => delay(2000, "Slow response"), 1000);
timeoutAPI.catch((err) => console.log("Timeout error:", err.message));

// Test 2: withRetry
console.log("=== withRetry ===");
const retryAPI = withRetry(unreliableAPI, { retries: 3, delay: 100 });
retryAPI().then(console.log).catch(console.error);

// Test 3: withCache
console.log("=== withCache ===");
const cachedFn = withCache(
  (x) => {
    console.log("Computing:", x);
    return x * 2;
  },
  { ttl: 5000 }
);

console.log(cachedFn(5)); // Computes
console.log(cachedFn(5)); // From cache

// Test 4: withRateLimit
console.log("=== withRateLimit ===");
const rateLimitedFn = withRateLimit(() => console.log("API call"), 2, 1000);

try {
  rateLimitedFn(); // OK
  rateLimitedFn(); // OK
  rateLimitedFn(); // Rate limit exceeded
} catch (error) {
  console.log(error.message);
}

// Test 5: RetryAPI
console.log("=== RetryAPI ===");
const retryAPI2 = new RetryAPI({
  retries: 3,
  delay: 100,
  retryCondition: (error) => error.status >= 500,
});

retryAPI2.call(unreliableAPI).then(console.log).catch(console.error);

// Test 6: Compose utilities
console.log("=== Compose utilities ===");
const enhancedAPI = compose(
  (fn) => withTimeout(fn, 5000),
  (fn) => withRetry(fn, { retries: 2 }),
  (fn) => withLogging(fn),
  (fn) => withCache(fn, { ttl: 10000 })
);

const myAPI = enhancedAPI(() => delay(100, "Enhanced API result"));
myAPI().then(console.log);
