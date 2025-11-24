class BatchProgressManager {
    constructor() {
        this.tasks = [];
        this.running = [];
        this.completed = [];
        this.pending = [];
        this.batchSize = 3;
        this.isProcessing = false;
        
        this.initElements();
        this.bindEvents();
    }
    
    initElements() {
        this.totalTasksInput = document.getElementById('totalTasks');
        this.batchSizeInput = document.getElementById('batchSize');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.progressContainer = document.getElementById('progressContainer');
        this.runningCount = document.getElementById('running');
        this.completedCount = document.getElementById('completed');
        this.pendingCount = document.getElementById('pending');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.totalTasksInput.addEventListener('input', () => this.generateTasks());
        this.generateTasks();
    }
    
    generateTasks() {
        const total = parseInt(this.totalTasksInput.value);
        this.tasks = Array.from({ length: total }, (_, i) => ({
            id: i + 1,
            progress: 0,
            status: 'pending',
            duration: Math.random() * 3000 + 1000 // 1-4 seconds
        }));
        
        this.pending = [...this.tasks];
        this.running = [];
        this.completed = [];
        this.renderTasks();
        this.updateStats();
    }
    
    renderTasks() {
        this.progressContainer.innerHTML = this.tasks.map(task => `
            <div class="progress-item ${task.status}" data-id="${task.id}">
                <div class="task-id">Task ${task.id}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${task.progress}%"></div>
                </div>
                <div class="progress-text">${task.progress}%</div>
                <div class="status ${task.status}">${task.status}</div>
            </div>
        `).join('');
    }
    
    updateTask(taskId, progress, status) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        task.progress = progress;
        task.status = status;
        
        const element = document.querySelector(`[data-id="${taskId}"]`);
        if (element) {
            element.className = `progress-item ${status}`;
            element.querySelector('.progress-fill').style.width = `${progress}%`;
            element.querySelector('.progress-text').textContent = `${progress}%`;
            element.querySelector('.status').textContent = status;
            element.querySelector('.status').className = `status ${status}`;
        }
    }
    
    updateStats() {
        this.runningCount.textContent = this.running.length;
        this.completedCount.textContent = this.completed.length;
        this.pendingCount.textContent = this.pending.length;
    }
    
    async start() {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        this.batchSize = parseInt(this.batchSizeInput.value);
        this.startBtn.disabled = true;
        
        // Start initial batch
        this.startNextBatch();
    }
    
    startNextBatch() {
        const toStart = Math.min(this.batchSize - this.running.length, this.pending.length);
        
        for (let i = 0; i < toStart; i++) {
            const task = this.pending.shift();
            if (task) {
                this.running.push(task);
                this.startTask(task);
            }
        }
        
        this.updateStats();
    }
    
    async startTask(task) {
        this.updateTask(task.id, 0, 'running');
        
        const startTime = Date.now();
        const duration = task.duration;
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(Math.round((elapsed / duration) * 100), 100);
            
            this.updateTask(task.id, progress, 'running');
            
            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                this.completeTask(task);
            }
        };
        
        requestAnimationFrame(updateProgress);
    }
    
    completeTask(task) {
        // Remove from running
        this.running = this.running.filter(t => t.id !== task.id);
        
        // Add to completed
        this.completed.push(task);
        
        // Update UI
        this.updateTask(task.id, 100, 'completed');
        this.updateStats();
        
        // Start next task if available
        if (this.pending.length > 0) {
            this.startNextBatch();
        } else if (this.running.length === 0) {
            // All tasks completed
            this.isProcessing = false;
            this.startBtn.disabled = false;
        }
    }
    
    reset() {
        this.isProcessing = false;
        this.startBtn.disabled = false;
        this.generateTasks();
    }
}

// Initialize the batch progress manager
new BatchProgressManager();