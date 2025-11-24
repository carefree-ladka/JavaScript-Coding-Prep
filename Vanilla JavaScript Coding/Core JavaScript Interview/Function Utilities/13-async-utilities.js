/**
 * Async Utilities - Common async function patterns
 * Most asked at: All companies (90% frequency)
 *
 * Essential async utilities that every developer should know
 */

// Utility 1: Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility 2: Async forEach (sequential)
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// Utility 3: Async map (parallel)
async function asyncMap(array, callback) {
    return Promise.all(array.map(callback));
}

// Utility 4: Async filter
async function asyncFilter(array, predicate) {
    const results = await Promise.all(array.map(predicate));
    return array.filter((_, index) => results[index]);
}

// Utility 5: Async reduce
async function asyncReduce(array, callback, initialValue) {
    let accumulator = initialValue;

    for (let i = 0; i < array.length; i++) {
        accumulator = await callback(accumulator, array[i], i, array);
    }

    return accumulator;
}

// Utility 6: Async some
async function asyncSome(array, predicate) {
    for (const item of array) {
        if (await predicate(item)) {
            return true;
        }
    }
    return false;
}

// Utility 7: Async every
async function asyncEvery(array, predicate) {
    for (const item of array) {
        if (!(await predicate(item))) {
            return false;
        }
    }
    return true;
}

// Utility 8: Async find
async function asyncFind(array, predicate) {
    for (const item of array) {
        if (await predicate(item)) {
            return item;
        }
    }
    return undefined;
}

// Utility 9: Parallel execution with limit
async function parallelLimit(tasks, limit) {
    const results = [];
    const executing = [];

    for (const [index, task] of tasks.entries()) {
        const promise = Promise.resolve().then(() => task()).then(result => {
            results[index] = result;
        });

        executing.push(promise);

        if (executing.length >= limit) {
            await Promise.race(executing);
            executing.splice(executing.findIndex(p => p === promise), 1);
        }
    }

    await Promise.all(executing);
    return results;
}

// Utility 10: Async queue processor
class AsyncQueue {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }

        this.running++;
        const { task, resolve, reject } = this.queue.shift();

        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process();
        }
    }
}

// Utility 11: Async lock/mutex
class AsyncLock {
    constructor() {
        this.locked = false;
        this.waiting = [];
    }

    async acquire() {
        if (!this.locked) {
            this.locked = true;
            return;
        }

        return new Promise(resolve => {
            this.waiting.push(resolve);
        });
    }

    release() {
        if (this.waiting.length > 0) {
            const resolve = this.waiting.shift();
            resolve();
        } else {
            this.locked = false;
        }
    }

    async execute(fn) {
        await this.acquire();
        try {
            return await fn();
        } finally {
            this.release();
        }
    }
}

// Utility 12: Async event emitter
class AsyncEventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (!this.events[event]) return;

        const index = this.events[event].indexOf(listener);
        if (index > -1) {
            this.events[event].splice(index, 1);
        }
    }

    async emit(event, ...args) {
        if (!this.events[event]) return;

        const promises = this.events[event].map(listener =>
            Promise.resolve(listener(...args))
        );

        return Promise.all(promises);
    }

    async emitSerial(event, ...args) {
        if (!this.events[event]) return;

        const results = [];
        for (const listener of this.events[event]) {
            results.push(await listener(...args));
        }
        return results;
    }
}

// Test cases
console.log('=== Async Utilities Tests ===');

// Test async forEach
console.log('Testing asyncForEach:');
asyncForEach([1, 2, 3], async (item) => {
    await sleep(100);
    console.log('Processed:', item);
});

// Test async map
console.log('Testing asyncMap:');
asyncMap([1, 2, 3], async (item) => {
    await sleep(100);
    return item * 2;
}).then(results => console.log('Map results:', results));

// Test async filter
console.log('Testing asyncFilter:');
asyncFilter([1, 2, 3, 4, 5], async (item) => {
    await sleep(50);
    return item % 2 === 0;
}).then(results => console.log('Filter results:', results));

// Test async queue
console.log('Testing AsyncQueue:');
const queue = new AsyncQueue(2);

for (let i = 0; i < 5; i++) {
    queue.add(async () => {
        await sleep(200);
        return `Task ${i}`;
    }).then(result => console.log('Queue result:', result));
}

// Test async lock
console.log('Testing AsyncLock:');
const lock = new AsyncLock();
let counter = 0;

const incrementWithLock = async () => {
    await lock.execute(async () => {
        const current = counter;
        await sleep(10); // Simulate async operation
        counter = current + 1;
    });
};

Promise.all([
    incrementWithLock(),
    incrementWithLock(),
    incrementWithLock()
]).then(() => console.log('Final counter:', counter)); // Should be 3

// Test async event emitter
console.log('Testing AsyncEventEmitter:');
const emitter = new AsyncEventEmitter();

emitter.on('test', async (data) => {
    await sleep(100);
    console.log('Listener 1:', data);
    return 'result1';
});

emitter.on('test', async (data) => {
    await sleep(50);
    console.log('Listener 2:', data);
    return 'result2';
});

emitter.emit('test', 'hello').then(results => {
    console.log('Emit results:', results);
});
