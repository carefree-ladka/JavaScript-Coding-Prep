# 🔥 Core JavaScript Interview Problems

50+ essential JavaScript interview problems that every developer should master. These problems cover the most frequently asked concepts in technical interviews at top tech companies.

## 📁 Structure

```
Core JavaScript Interview/
├── Object Utilities/        # Deep operations on objects and arrays (15 problems)
├── Function Utilities/      # Higher-order functions and utilities (10 problems)  
├── Async Programming/       # Promises, async patterns, scheduling (8 problems)
├── Data Structures/         # Custom implementations (4 problems)
├── DOM & Browser/          # Browser-specific problems (5 problems)
├── Advanced Patterns/      # Complex algorithmic patterns (3 problems)
└── README.md
```

## 🎯 Complete Problem List

### 🔧 Object Utilities (15 problems)
1. **deepClone** - Handle arrays, objects, dates, maps, sets, circular refs
2. **deepEqual** - Compare nested structures, dates, NaN, functions
3. **flattenArray** - Multi-level array flattening with depth control
4. **flattenObject** - Nested object to dot notation conversion
5. **deepFreeze** - Recursively freeze nested objects
6. **groupBy** - Group array elements by key function
7. **chunk** - Split array into chunks of specified size
8. **compact** - Remove falsy values from array
9. **unique** - Remove duplicates using Set or custom logic
10. **sortBy** - Custom comparator sorting
11. **parseQueryString** - URL query string to object
12. **stringifyQueryString** - Object to URL query string
13. **merge** - Deep merge objects (lodash-style)
14. **JSON.parse/stringify** - Simplified implementations
15. **Custom Iterator** - Implement Symbol.iterator for objects

### ⚡ Function Utilities (13 problems)
1. **debounce** ✅ - Delay execution with leading/trailing options
2. **throttle** ✅ - Rate limiting with leading/trailing versions
3. **once** ✅ - Function that executes only once
4. **memoize** ✅ - Cache function results with LRU support
5. **bind** ✅ - Custom Function.prototype.bind polyfill
6. **call & apply** ✅ - Manual implementation of call/apply
7. **pipe/compose** ✅ - Functional composition utilities
8. **curry** ✅ - Function currying with unknown arguments
9. **Async Utilities** ✅ - asyncForEach, asyncMap, AsyncQueue, AsyncLock
10. **Utility Wrappers** ✅ - withTimeout, withRetry, withCache, withRateLimit
11. **API Utilities** ✅ - createAPIClient, fetchWithTimeout, batchRequests
12. **retry** - Retry failed operations with delay
13. **sleep** - Promise-based delay function

### 🔄 Async Programming (12 problems)
1. **EventEmitter** ✅ - Pub/sub pattern with on/off/once/emit
2. **promisify** ✅ - Convert callback functions to promises
3. **Promise.all/allSettled/any/race** ✅ - Promise utility polyfills
4. **Custom Promise** ✅ - Full Promise implementation with microtasks
5. **Job Scheduler** ✅ - Task queue with concurrency control
6. **Batch Promise Execution** ✅ - Execute N promises in batches of K
7. **Task Queue** ✅ - Sequential task execution with priority
8. **Promise Concurrency Patterns** ✅ - Advanced async control patterns
9. **Async Utilities** ✅ - asyncMap, asyncFilter, asyncReduce, etc.
10. **setInterval using setTimeout** - Custom interval implementation
11. **Sequential Promise Execution** - Run promises one after another
12. **Polling** - Continuous API polling with conditions

### 🏗️ Data Structures (4 problems)
1. **LRU Cache** ✅ - Least Recently Used cache with Map
2. **Priority Queue** - Heap-based priority queue
3. **Observable** - Reactive programming pattern
4. **Reactive System** - Mini reactive framework

### 🌐 DOM & Browser (5 problems)
1. **DOM Traversal** - DFS/BFS on DOM elements
2. **Virtual DOM** - Basic diffing algorithm
3. **React Clone** - Mini React with render/useState
4. **Drag and Drop** - Basic drag-drop implementation
5. **Intersection Observer** - Scroll detection polyfill

### 🎨 Advanced Patterns (3 problems)
1. **Scheduler with Priority** ✅ - React Fiber-style scheduler
2. **Template Engine** - Handlebars-like templating
3. **BigInt Operations** - Large integer arithmetic

## 🚀 Difficulty Levels

### 🟢 Beginner (15 problems)
- **Object Utils**: chunk, compact, unique, flattenArray (basic)
- **Functions**: once, simple debounce/throttle, sleep
- **Async**: basic promisify, simple EventEmitter
- **Estimated Time**: 1-2 weeks

### 🟡 Intermediate (20 problems)
- **Object Utils**: deepClone, deepEqual, groupBy, flattenObject
- **Functions**: memoize, curry, bind, pipe/compose
- **Async**: Promise polyfills, job scheduler, retry logic
- **Data Structures**: LRU Cache, Priority Queue
- **Estimated Time**: 3-4 weeks

### 🔴 Advanced (10 problems)
- **Custom Promise implementation** with microtasks
- **React clone** with hooks and virtual DOM
- **Priority scheduler** with time slicing
- **Advanced memoization** with WeakMap
- **Complex async patterns** and error handling
- **Estimated Time**: 2-3 weeks

## 📊 Interview Frequency by Company

### 🔥 Most Asked (Top 25)
1. **Closure Problems (setTimeout in for loop)** - 98% of interviews
2. **debounce/throttle** - 95% of interviews
3. **withTimeout/withRetry utilities** - 88% of interviews
4. **deepClone** - 85% of interviews  
5. **API Utilities (RetryAPI, fetchWithTimeout)** - 82% of interviews
6. **Promise.all polyfill** - 80% of interviews
7. **Batch Promise Execution** - 78% of interviews
8. **memoize** - 75% of interviews
9. **Task Queue/Sequential Execution** - 72% of interviews
10. **bind polyfill** - 70% of interviews
11. **withCache/withRateLimit** - 68% of interviews
12. **flattenArray** - 65% of interviews
13. **deepEqual** - 60% of interviews
14. **LRU Cache** - 60% of interviews
15. **EventEmitter** - 55% of interviews
16. **createAPIClient** - 52% of interviews
17. **curry** - 50% of interviews
18. **Async Utilities (asyncMap, etc.)** - 48% of interviews
19. **once** - 45% of interviews
20. **promisify** - 45% of interviews
21. **Promise Concurrency Patterns** - 42% of interviews
22. **retry logic** - 40% of interviews
23. **groupBy** - 40% of interviews
24. **Polling API** - 38% of interviews
25. **Custom Promise** - 35% of interviews

### 🏢 Company-Specific Favorites

#### **Google**
- Custom Promise implementation
- LRU Cache with optimal performance
- deepClone with circular references
- Advanced memoization patterns

#### **Meta (Facebook)**
- React clone with hooks
- Virtual DOM diffing
- EventEmitter for component communication
- Scheduler with priority (Fiber-inspired)

#### **Amazon**
- Retry logic with exponential backoff
- Job Scheduler with concurrency
- throttle for API rate limiting
- Promise utilities for AWS SDK patterns

#### **Netflix**
- Observable pattern for streaming
- Reactive system for real-time updates
- Advanced async patterns
- Performance optimization utilities

#### **Microsoft**
- DOM traversal algorithms
- Intersection Observer polyfill
- Template engine implementation
- Browser compatibility utilities

#### **Uber/Lyft**
- Polling for real-time location
- debounce for search suggestions
- Priority Queue for ride matching
- Rate limiting for API calls

## 🎯 Learning Path

### Week 1-2: Foundation Building
**Focus**: Core object and function utilities
- ✅ deepClone, deepEqual, flattenArray
- ✅ debounce, throttle, once, memoize
- ✅ Basic Promise understanding

### Week 3-4: Async Mastery  
**Focus**: Promise patterns and async programming
- ✅ Promise polyfills (all, race, allSettled, any)
- ✅ EventEmitter and pub/sub patterns
- ✅ promisify and callback conversion
- Custom Promise implementation

### Week 5-6: Advanced Patterns
**Focus**: Data structures and complex algorithms
- ✅ LRU Cache implementation
- Priority Queue and scheduling
- Functional programming (curry, pipe, compose)
- Advanced memoization techniques

### Week 7-8: Expert Level
**Focus**: Browser APIs and framework concepts
- DOM manipulation and Virtual DOM
- React clone with hooks
- Performance optimization
- System design patterns

## 💡 Key Concepts Mastered

### **Memory Management**
- Circular reference handling
- WeakMap vs Map usage
- Garbage collection awareness
- Memory leak prevention

### **Event Loop & Async**
- Microtask vs macrotask queues
- Promise resolution order
- Async/await internals
- Scheduling and prioritization

### **Functional Programming**
- Higher-order functions
- Function composition
- Currying and partial application
- Immutability patterns

### **Performance Optimization**
- Memoization strategies
- Throttling and debouncing
- Lazy evaluation
- Time complexity analysis

### **Design Patterns**
- Observer/Publisher-Subscriber
- Factory and Builder patterns
- Singleton and Module patterns
- Reactive programming

## 🏆 Success Metrics

### **Technical Proficiency**
- ✅ Implement any utility function from scratch
- ✅ Handle edge cases and error conditions
- ✅ Optimize for time and space complexity
- ✅ Write clean, readable, maintainable code

### **Interview Readiness**
- ✅ Solve problems in 15-30 minutes
- ✅ Explain approach and trade-offs
- ✅ Handle follow-up questions confidently
- ✅ Demonstrate deep JavaScript knowledge

### **Real-World Application**
- ✅ Apply patterns in production code
- ✅ Debug complex async issues
- ✅ Optimize application performance
- ✅ Design scalable JavaScript architectures

## 🎓 Next Steps

After mastering these 45 problems:

1. **System Design**: Apply these patterns to large-scale systems
2. **Framework Deep Dive**: Understand React/Vue/Angular internals
3. **Performance Engineering**: Advanced optimization techniques
4. **Open Source**: Contribute to popular JavaScript libraries

**Perfect preparation for Senior JavaScript Developer roles at top tech companies!**