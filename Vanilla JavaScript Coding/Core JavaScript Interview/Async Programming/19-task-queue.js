/**
 * Task Queue - Execute tasks one by one
 * Most asked at: Google, Meta, Uber, Netflix
 * 
 * Problem: Implement a task queue that executes async tasks sequentially
 * with support for priority, retry, and concurrency control
 */

// Solution 1: Basic sequential task queue
class TaskQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }
    
    add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.running || this.queue.length === 0) return;
        
        this.running = true;
        
        while (this.queue.length > 0) {
            const { task, resolve, reject } = this.queue.shift();
            
            try {
                const result = await task();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
        
        this.running = false;
    }
}

// Solution 2: Priority task queue with retry
class PriorityTaskQueue {
    constructor(concurrency = 1) {
        this.queue = [];
        this.running = 0;
        this.concurrency = concurrency;
    }
    
    add(task, priority = 0, retries = 0) {
        return new Promise((resolve, reject) => {
            const taskItem = { task, priority, retries, resolve, reject, attempts: 0 };
            
            // Insert based on priority (higher priority first)
            const index = this.queue.findIndex(item => item.priority < priority);
            if (index === -1) {
                this.queue.push(taskItem);
            } else {
                this.queue.splice(index, 0, taskItem);
            }
            
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) return;
        
        const taskItem = this.queue.shift();
        if (!taskItem) return;
        
        this.running++;
        
        try {
            const result = await taskItem.task();
            taskItem.resolve(result);
        } catch (error) {
            taskItem.attempts++;
            
            if (taskItem.attempts <= taskItem.retries) {
                // Retry: add back to queue with same priority
                this.queue.unshift(taskItem);
            } else {
                taskItem.reject(error);
            }
        } finally {
            this.running--;
            this.process(); // Process next task
        }
    }
    
    size() {
        return this.queue.length;
    }
    
    clear() {
        this.queue.forEach(item => item.reject(new Error('Queue cleared')));
        this.queue = [];
    }
}

// Solution 3: Advanced task queue with events and scheduling
class AdvancedTaskQueue {
    constructor(options = {}) {
        this.concurrency = options.concurrency || 1;
        this.delay = options.delay || 0;
        this.queue = [];
        this.running = 0;
        this.completed = 0;
        this.failed = 0;
        this.listeners = {};
    }
    
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
    
    add(task, options = {}) {
        const { priority = 0, retries = 0, timeout = 0 } = options;
        
        return new Promise((resolve, reject) => {
            const taskItem = {
                id: Date.now() + Math.random(),
                task: timeout > 0 ? this.withTimeout(task, timeout) : task,
                priority,
                retries,
                attempts: 0,
                resolve,
                reject,
                createdAt: Date.now()
            };
            
            this.insertByPriority(taskItem);
            this.emit('added', taskItem);
            this.process();
        });
    }
    
    withTimeout(task, timeout) {
        return () => Promise.race([
            task(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Task timeout')), timeout)
            )
        ]);
    }
    
    insertByPriority(taskItem) {
        const index = this.queue.findIndex(item => item.priority < taskItem.priority);
        if (index === -1) {
            this.queue.push(taskItem);
        } else {
            this.queue.splice(index, 0, taskItem);
        }
    }
    
    async process() {
        while (this.running < this.concurrency && this.queue.length > 0) {
            const taskItem = this.queue.shift();
            this.running++;
            
            this.executeTask(taskItem);
        }
    }
    
    async executeTask(taskItem) {
        this.emit('start', taskItem);
        
        try {
            const result = await taskItem.task();
            taskItem.resolve(result);
            this.completed++;
            this.emit('success', { ...taskItem, result });
        } catch (error) {
            taskItem.attempts++;
            
            if (taskItem.attempts <= taskItem.retries) {
                this.insertByPriority(taskItem);
                this.emit('retry', { ...taskItem, error });
            } else {
                taskItem.reject(error);
                this.failed++;
                this.emit('error', { ...taskItem, error });
            }
        } finally {
            this.running--;
            
            if (this.delay > 0) {
                await new Promise(resolve => setTimeout(resolve, this.delay));
            }
            
            this.process();
        }
    }
    
    stats() {
        return {
            queued: this.queue.length,
            running: this.running,
            completed: this.completed,
            failed: this.failed
        };
    }
}

// Test cases
const delay = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
const failTask = () => Promise.reject(new Error('Task failed'));

// Test 1: Basic queue
const basicQueue = new TaskQueue();
basicQueue.add(() => delay(100, 'Task 1')).then(console.log);
basicQueue.add(() => delay(50, 'Task 2')).then(console.log);
basicQueue.add(() => delay(200, 'Task 3')).then(console.log);

// Test 2: Priority queue with retry
const priorityQueue = new PriorityTaskQueue(2);
priorityQueue.add(() => delay(100, 'Low priority'), 1);
priorityQueue.add(() => delay(50, 'High priority'), 10);
priorityQueue.add(failTask, 5, 2); // Will retry twice

// Test 3: Advanced queue with events
const advancedQueue = new AdvancedTaskQueue({ concurrency: 2, delay: 100 });

advancedQueue.on('added', task => console.log('Added:', task.id));
advancedQueue.on('start', task => console.log('Started:', task.id));
advancedQueue.on('success', ({ id, result }) => console.log('Success:', id, result));
advancedQueue.on('error', ({ id, error }) => console.log('Error:', id, error.message));

advancedQueue.add(() => delay(200, 'A'), { priority: 1 });
advancedQueue.add(() => delay(100, 'B'), { priority: 10 });
advancedQueue.add(failTask, { priority: 5, retries: 1 });

export { TaskQueue, PriorityTaskQueue, AdvancedTaskQueue };