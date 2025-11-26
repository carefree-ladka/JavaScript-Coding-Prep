import { Task, TaskQueue } from './TaskQueue';

// Custom executor with logging and retry
const loggingExecutor = async <T>(task: Task<T>): Promise<void> => {
  console.log(`Starting task: ${task.id}`);
  let attempts = 0;
  const maxRetries = 2;

  while (attempts <= maxRetries) {
    try {
      const result = await task.fn();
      console.log(`Task ${task.id} completed successfully`);
      task.onSuccess?.(result);
      return;
    } catch (error) {
      attempts++;
      if (attempts > maxRetries) {
        console.log(`Task ${task.id} failed after ${maxRetries} retries`);
        task.onError?.(error as Error);
        return;
      }
      console.log(`Task ${task.id} failed, retrying... (${attempts}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

// Rate limiting executor
const rateLimitedExecutor = async <T>(task: Task<T>): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
  try {
    const result = await task.fn();
    task.onSuccess?.(result);
  } catch (error) {
    task.onError?.(error as Error);
  }
};

// Usage examples
const queue1 = new TaskQueue(3, loggingExecutor);
const queue2 = new TaskQueue(2, rateLimitedExecutor);

// Add tasks to queue with logging executor
queue1.add({
  id: "log-task-1",
  fn: () => fetch('/api/data').then(r => r.json()),
  onSuccess: (data) => console.log('Data received:', data),
  onError: (err) => console.error('Failed to fetch:', err)
});

// Add tasks to rate-limited queue
queue2.add({
  id: "rate-task-1", 
  fn: () => new Promise(resolve => setTimeout(() => resolve("Done"), 500)),
  onSuccess: (result) => console.log(result)
});