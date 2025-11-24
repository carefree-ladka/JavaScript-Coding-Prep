/**
 * Promise Concurrency Patterns - Advanced async control
 * Most asked at: Google, Meta, Netflix, Uber
 * 
 * Advanced patterns for controlling promise execution flow
 */

// Pattern 1: Promise.map with concurrency limit
async function promiseMap(items, mapper, concurrency = Infinity) {
    const results = [];
    const executing = [];
    
    for (const [index, item] of items.entries()) {
        const promise = Promise.resolve().then(() => mapper(item, index));
        results.push(promise);
        
        if (items.length >= concurrency) {
            executing.push(promise);
            
            if (executing.length >= concurrency) {
                await Promise.race(executing);
                executing.splice(executing.findIndex(p => p === promise), 1);
            }
        }
    }
    
    return Promise.all(results);
}

// Pattern 2: Promise waterfall (sequential execution)
async function promiseWaterfall(tasks) {
    let result;
    
    for (const task of tasks) {
        result = await task(result);
    }
    
    return result;
}

// Pattern 3: Promise retry with exponential backoff
async function promiseRetry(fn, options = {}) {
    const { retries = 3, delay = 1000, backoff = 2, maxDelay = 30000 } = options;
    
    let attempt = 0;
    let currentDelay = delay;
    
    while (attempt <= retries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            
            if (attempt > retries) {
                throw error;
            }
            
            await new Promise(resolve => setTimeout(resolve, currentDelay));
            currentDelay = Math.min(currentDelay * backoff, maxDelay);
        }
    }
}

// Pattern 4: Promise timeout wrapper
function promiseTimeout(promise, timeout, timeoutError = new Error('Promise timeout')) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(timeoutError), timeout)
        )
    ]);
}

// Pattern 5: Promise pool (worker pool pattern)
class PromisePool {
    constructor(concurrency = 5) {
        this.concurrency = concurrency;
        this.running = [];
        this.queue = [];
    }
    
    async add(promiseFunction) {
        return new Promise((resolve, reject) => {
            this.queue.push({ promiseFunction, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.running.length >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        const { promiseFunction, resolve, reject } = this.queue.shift();
        
        const promise = promiseFunction()
            .then(resolve)
            .catch(reject)
            .finally(() => {
                this.running.splice(this.running.indexOf(promise), 1);
                this.process();
            });
        
        this.running.push(promise);
        this.process();
    }
}

// Pattern 6: Promise circuit breaker
class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeout = options.resetTimeout || 60000;
        this.monitoringPeriod = options.monitoringPeriod || 10000;
        
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.successCount = 0;
    }
    
    async execute(promiseFunction) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await promiseFunction();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        
        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= 3) {
                this.state = 'CLOSED';
            }
        }
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.failureThreshold) {
            this.state = 'OPEN';
        }
    }
}

// Pattern 7: Promise cache with TTL
class PromiseCache {
    constructor(ttl = 60000) {
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    async get(key, promiseFunction) {
        const cached = this.cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            return cached.promise;
        }
        
        const promise = promiseFunction();
        this.cache.set(key, { promise, timestamp: Date.now() });
        
        try {
            const result = await promise;
            return result;
        } catch (error) {
            this.cache.delete(key);
            throw error;
        }
    }
    
    clear() {
        this.cache.clear();
    }
}

// Pattern 8: Promise semaphore (resource limiting)
class Semaphore {
    constructor(permits) {
        this.permits = permits;
        this.waiting = [];
    }
    
    async acquire() {
        if (this.permits > 0) {
            this.permits--;
            return;
        }
        
        return new Promise(resolve => {
            this.waiting.push(resolve);
        });
    }
    
    release() {
        this.permits++;
        
        if (this.waiting.length > 0) {
            this.permits--;
            const resolve = this.waiting.shift();
            resolve();
        }
    }
    
    async execute(promiseFunction) {
        await this.acquire();
        
        try {
            return await promiseFunction();
        } finally {
            this.release();
        }
    }
}

// Test cases and examples
const delay = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
const failingTask = () => Promise.reject(new Error('Task failed'));

// Test 1: Promise map with concurrency
console.log('=== Promise Map with Concurrency ===');
const items = [1, 2, 3, 4, 5];
promiseMap(items, async (item) => {
    await delay(100);
    return item * 2;
}, 2).then(console.log); // [2, 4, 6, 8, 10]

// Test 2: Promise waterfall
console.log('=== Promise Waterfall ===');
const tasks = [
    (prev) => delay(100, (prev || 0) + 1),
    (prev) => delay(100, prev + 2),
    (prev) => delay(100, prev + 3)
];
promiseWaterfall(tasks).then(console.log); // 6

// Test 3: Promise retry
console.log('=== Promise Retry ===');
let attempts = 0;
const unreliableTask = () => {
    attempts++;
    if (attempts < 3) {
        return Promise.reject(new Error(`Attempt ${attempts} failed`));
    }
    return Promise.resolve('Success!');
};

promiseRetry(unreliableTask, { retries: 3, delay: 100 })
    .then(console.log)
    .catch(console.error);

// Test 4: Promise pool
console.log('=== Promise Pool ===');
const pool = new PromisePool(2);

for (let i = 0; i < 5; i++) {
    pool.add(() => delay(200, `Task ${i}`))
        .then(result => console.log('Pool result:', result));
}

// Test 5: Circuit breaker
console.log('=== Circuit Breaker ===');
const breaker = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 1000 });

// This will trip the circuit breaker after 2 failures
for (let i = 0; i < 5; i++) {
    breaker.execute(i < 2 ? failingTask : () => delay(100, 'Success'))
        .then(result => console.log('Breaker success:', result))
        .catch(error => console.log('Breaker error:', error.message));
}

export {
    promiseMap,
    promiseWaterfall,
    promiseRetry,
    promiseTimeout,
    PromisePool,
    CircuitBreaker,
    PromiseCache,
    Semaphore
};