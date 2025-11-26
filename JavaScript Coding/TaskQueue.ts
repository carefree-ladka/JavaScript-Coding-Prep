export type Task<T = any> = {
  id: string;
  fn: () => Promise<T>;
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
};

export type TaskExecutor = <T>(task: Task<T>) => Promise<void>;

export class TaskQueue {
  private queue: Task[] = [];
  private running = 0;

  constructor(
    private maxConcurrency: number,
    private executor: TaskExecutor = this.defaultExecutor
  ) {}

  add<T>(task: Task<T>): void {
    this.queue.push(task);
    this.process();
  }

  private async process(): Promise<void> {
    if (this.running >= this.maxConcurrency || this.queue.length === 0) return;

    const task = this.queue.shift()!;
    this.running++;

    try {
      await this.executor(task);
    } finally {
      this.running--;
      this.process();
    }
  }

  private async defaultExecutor<T>(task: Task<T>): Promise<void> {
    try {
      const result = await task.fn();
      task.onSuccess?.(result);
    } catch (error) {
      task.onError?.(error as Error);
    }
  }
}

// Usage example
const queue = new TaskQueue(2);

queue.add({
  id: "task1",
  fn: () => new Promise(resolve => setTimeout(() => resolve("Task 1 done"), 1000)),
  onSuccess: (result) => console.log(result),
  onError: (error) => console.error(error)
});

queue.add({
  id: "task2", 
  fn: () => new Promise(resolve => setTimeout(() => resolve("Task 2 done"), 500)),
  onSuccess: (result) => console.log(result)
});

queue.add({
  id: "task3",
  fn: () => new Promise(resolve => setTimeout(() => resolve("Task 3 done"), 800)),
  onSuccess: (result) => console.log(result)
});