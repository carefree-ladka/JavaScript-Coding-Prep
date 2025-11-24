/**
 * Execute N promises in batches of K promises
 * Most asked at: Google, Meta, Amazon
 * 
 * Problem: Given an array of promise-returning functions and batch size k,
 * execute them in batches where each batch runs concurrently but batches run sequentially
 */

// Solution 1: Basic batch execution
function executeBatch(promiseFunctions, batchSize) {
    const results = [];
    
    const executeBatchRecursive = async (startIndex) => {
        if (startIndex >= promiseFunctions.length) return;
        
        const batch = promiseFunctions.slice(startIndex, startIndex + batchSize);
        const batchResults = await Promise.all(batch.map(fn => fn()));
        results.push(...batchResults);
        
        await executeBatchRecursive(startIndex + batchSize);
    };
    
    return executeBatchRecursive(0).then(() => results);
}

// Solution 2: With error handling and progress tracking
function executeBatchAdvanced(promiseFunctions, batchSize, options = {}) {
    const { onProgress, onBatchComplete, continueOnError = false } = options;
    const results = [];
    let completed = 0;
    
    const executeBatch = async () => {
        for (let i = 0; i < promiseFunctions.length; i += batchSize) {
            const batch = promiseFunctions.slice(i, i + batchSize);
            
            try {
                const batchResults = continueOnError 
                    ? await Promise.allSettled(batch.map(fn => fn()))
                    : await Promise.all(batch.map(fn => fn()));
                
                results.push(...batchResults);
                completed += batch.length;
                
                onProgress?.(completed, promiseFunctions.length);
                onBatchComplete?.(batchResults, Math.floor(i / batchSize) + 1);
                
            } catch (error) {
                if (!continueOnError) throw error;
            }
        }
        
        return results;
    };
    
    return executeBatch();
}

// Solution 3: With concurrency control and rate limiting
class BatchExecutor {
    constructor(batchSize, delay = 0) {
        this.batchSize = batchSize;
        this.delay = delay;
    }
    
    async execute(promiseFunctions) {
        const results = [];
        
        for (let i = 0; i < promiseFunctions.length; i += this.batchSize) {
            const batch = promiseFunctions.slice(i, i + this.batchSize);
            const batchResults = await Promise.all(batch.map(fn => fn()));
            results.push(...batchResults);
            
            // Rate limiting between batches
            if (this.delay > 0 && i + this.batchSize < promiseFunctions.length) {
                await new Promise(resolve => setTimeout(resolve, this.delay));
            }
        }
        
        return results;
    }
}

// Test cases
const createPromise = (value, delay) => () => 
    new Promise(resolve => setTimeout(() => resolve(value), delay));

// Test 1: Basic usage
const promises1 = [
    createPromise('A', 100),
    createPromise('B', 200),
    createPromise('C', 150),
    createPromise('D', 300),
    createPromise('E', 50)
];

executeBatch(promises1, 2).then(console.log); // ['A', 'B', 'C', 'D', 'E']

// Test 2: With progress tracking
executeBatchAdvanced(promises1, 2, {
    onProgress: (completed, total) => console.log(`Progress: ${completed}/${total}`),
    onBatchComplete: (results, batchNum) => console.log(`Batch ${batchNum} complete:`, results)
});

// Test 3: With rate limiting
const executor = new BatchExecutor(3, 1000); // 3 promises per batch, 1s delay
executor.execute(promises1).then(console.log);

export { executeBatch, executeBatchAdvanced, BatchExecutor };