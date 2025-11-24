/**
 * API Utilities - Advanced API handling patterns
 * Most asked at: Google, Meta, Netflix, Uber (80% frequency)
 * 
 * Production-ready API utilities for robust applications
 */

// Utility 1: createAPIClient - Full-featured API client
function createAPIClient(baseURL, options = {}) {
    const {
        timeout = 10000,
        retries = 3,
        retryDelay = 1000,
        headers = {},
        interceptors = {}
    } = options;
    
    const client = {
        async request(url, config = {}) {
            const fullURL = baseURL + url;
            const requestConfig = {
                timeout,
                headers: { ...headers, ...config.headers },
                ...config
            };
            
            // Request interceptor
            if (interceptors.request) {
                await interceptors.request(requestConfig);
            }
            
            let attempt = 0;
            while (attempt <= retries) {
                try {
                    const response = await fetchWithTimeout(fullURL, requestConfig);
                    
                    // Response interceptor
                    if (interceptors.response) {
                        await interceptors.response(response);
                    }
                    
                    return response;
                } catch (error) {
                    attempt++;
                    
                    if (attempt > retries || !shouldRetry(error)) {
                        throw error;
                    }
                    
                    await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
                }
            }
        },
        
        get: (url, config) => client.request(url, { ...config, method: 'GET' }),
        post: (url, data, config) => client.request(url, { ...config, method: 'POST', body: JSON.stringify(data) }),
        put: (url, data, config) => client.request(url, { ...config, method: 'PUT', body: JSON.stringify(data) }),
        delete: (url, config) => client.request(url, { ...config, method: 'DELETE' })
    };
    
    return client;
}

// Utility 2: fetchWithTimeout - Fetch with timeout support
async function fetchWithTimeout(url, options = {}) {
    const { timeout = 10000, ...fetchOptions } = options;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }
        
        throw error;
    }
}

// Utility 3: batchRequests - Batch multiple API requests
async function batchRequests(requests, options = {}) {
    const { batchSize = 5, delay = 0 } = options;
    const results = [];
    
    for (let i = 0; i < requests.length; i += batchSize) {
        const batch = requests.slice(i, i + batchSize);
        const batchResults = await Promise.allSettled(batch);
        results.push(...batchResults);
        
        if (delay > 0 && i + batchSize < requests.length) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    return results;
}

// Utility 4: createPollingAPI - Polling with conditions
function createPollingAPI(apiCall, options = {}) {
    const {
        interval = 1000,
        maxAttempts = 10,
        condition = (result) => result.status === 'complete',
        onProgress = () => {}
    } = options;
    
    return async function(...args) {
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            try {
                const result = await apiCall(...args);
                
                onProgress(result, attempts + 1, maxAttempts);
                
                if (condition(result)) {
                    return result;
                }
                
                attempts++;
                await new Promise(resolve => setTimeout(resolve, interval));
            } catch (error) {
                attempts++;
                
                if (attempts >= maxAttempts) {
                    throw error;
                }
                
                await new Promise(resolve => setTimeout(resolve, interval));
            }
        }
        
        throw new Error('Polling timeout: max attempts reached');
    };
}

// Utility 5: createCacheAPI - API with intelligent caching
function createCacheAPI(apiCall, options = {}) {
    const {
        ttl = 300000, // 5 minutes
        maxSize = 100,
        keyGenerator = (...args) => JSON.stringify(args),
        shouldCache = () => true
    } = options;
    
    const cache = new Map();
    
    return async function(...args) {
        const key = keyGenerator(...args);
        const cached = cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.data;
        }
        
        try {
            const result = await apiCall(...args);
            
            if (shouldCache(result)) {
                // Implement LRU eviction
                if (cache.size >= maxSize) {
                    const firstKey = cache.keys().next().value;
                    cache.delete(firstKey);
                }
                
                cache.set(key, {
                    data: result,
                    timestamp: Date.now()
                });
            }
            
            return result;
        } catch (error) {
            // Don't cache errors
            throw error;
        }
    };
}

// Utility 6: createRetryAPI - Advanced retry with strategies
function createRetryAPI(apiCall, options = {}) {
    const {
        maxRetries = 3,
        baseDelay = 1000,
        strategy = 'exponential', // 'exponential', 'linear', 'fixed'
        maxDelay = 30000,
        jitter = true,
        retryCondition = (error) => error.status >= 500 || error.name === 'NetworkError'
    } = options;
    
    return async function(...args) {
        let attempt = 0;
        
        while (attempt <= maxRetries) {
            try {
                return await apiCall(...args);
            } catch (error) {
                attempt++;
                
                if (attempt > maxRetries || !retryCondition(error)) {
                    throw error;
                }
                
                const delay = calculateDelay(attempt, baseDelay, strategy, maxDelay, jitter);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    };
}

// Helper function for retry delay calculation
function calculateDelay(attempt, baseDelay, strategy, maxDelay, jitter) {
    let delay;
    
    switch (strategy) {
        case 'exponential':
            delay = baseDelay * Math.pow(2, attempt - 1);
            break;
        case 'linear':
            delay = baseDelay * attempt;
            break;
        case 'fixed':
        default:
            delay = baseDelay;
    }
    
    delay = Math.min(delay, maxDelay);
    
    if (jitter) {
        delay = delay * (0.5 + Math.random() * 0.5);
    }
    
    return delay;
}

// Utility 7: createQueuedAPI - Queue API calls
function createQueuedAPI(apiCall, concurrency = 1) {
    const queue = [];
    let running = 0;
    
    const processQueue = async () => {
        if (running >= concurrency || queue.length === 0) return;
        
        running++;
        const { args, resolve, reject } = queue.shift();
        
        try {
            const result = await apiCall(...args);
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            running--;
            processQueue();
        }
    };
    
    return function(...args) {
        return new Promise((resolve, reject) => {
            queue.push({ args, resolve, reject });
            processQueue();
        });
    };
}

// Utility 8: shouldRetry - Smart retry condition
function shouldRetry(error) {
    // Network errors
    if (error.name === 'NetworkError' || error.name === 'TypeError') {
        return true;
    }
    
    // HTTP status codes that should be retried
    if (error.status) {
        return error.status >= 500 || error.status === 429 || error.status === 408;
    }
    
    return false;
}

// Utility 9: createRateLimitedAPI - Rate limiting
function createRateLimitedAPI(apiCall, options = {}) {
    const { requestsPerSecond = 10, burstSize = 20 } = options;
    
    const tokens = burstSize;
    const refillRate = requestsPerSecond;
    let lastRefill = Date.now();
    let availableTokens = tokens;
    
    const refillTokens = () => {
        const now = Date.now();
        const timePassed = (now - lastRefill) / 1000;
        const tokensToAdd = Math.floor(timePassed * refillRate);
        
        if (tokensToAdd > 0) {
            availableTokens = Math.min(tokens, availableTokens + tokensToAdd);
            lastRefill = now;
        }
    };
    
    return async function(...args) {
        refillTokens();
        
        if (availableTokens < 1) {
            const waitTime = (1 / refillRate) * 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return this(...args);
        }
        
        availableTokens--;
        return apiCall(...args);
    };
}

// Test examples
const mockAPI = (data, shouldFail = false) => 
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject({ status: 500, message: 'Server error' });
            } else {
                resolve({ data, status: 'success' });
            }
        }, 100);
    });

// Test 1: API Client
console.log('=== API Client ===');
const client = createAPIClient('https://api.example.com', {
    timeout: 5000,
    retries: 2,
    headers: { 'Authorization': 'Bearer token' }
});

// Test 2: Batch requests
console.log('=== Batch Requests ===');
const requests = [
    () => mockAPI('data1'),
    () => mockAPI('data2'),
    () => mockAPI('data3', true), // This will fail
    () => mockAPI('data4')
];

batchRequests(requests, { batchSize: 2 })
    .then(results => console.log('Batch results:', results));

// Test 3: Polling API
console.log('=== Polling API ===');
let pollCount = 0;
const pollAPI = createPollingAPI(() => {
    pollCount++;
    return mockAPI({ status: pollCount >= 3 ? 'complete' : 'pending' });
}, {
    interval: 500,
    condition: (result) => result.data.status === 'complete',
    onProgress: (result, attempt) => console.log(`Poll attempt ${attempt}:`, result.data.status)
});

pollAPI().then(result => console.log('Polling complete:', result));

// Test 4: Cached API
console.log('=== Cached API ===');
const cachedAPI = createCacheAPI(mockAPI, { ttl: 2000 });

cachedAPI('test').then(() => console.log('First call'));
cachedAPI('test').then(() => console.log('Second call (cached)'));

export {
    createAPIClient,
    fetchWithTimeout,
    batchRequests,
    createPollingAPI,
    createCacheAPI,
    createRetryAPI,
    createQueuedAPI,
    createRateLimitedAPI,
    shouldRetry,
    calculateDelay
};