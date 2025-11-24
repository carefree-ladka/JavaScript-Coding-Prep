class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.nextId = this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
        
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.markAllCompleteBtn = document.getElementById('markAllComplete');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }
    
    bindEvents() {
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });
        
        this.markAllCompleteBtn.addEventListener('click', () => {
            this.markAllComplete();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'a':
                        if (e.target !== this.todoInput) {
                            e.preventDefault();
                            this.markAllComplete();
                        }
                        break;
                    case 'd':
                        e.preventDefault();
                        this.clearCompleted();
                        break;
                }
            }
        });
    }
    
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;
        
        const todo = {
            id: this.nextId++,
            text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
        this.updateStats();
        
        // Focus back to input
        this.todoInput.focus();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }
    
    editTodo(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
        }
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
        this.updateStats();
    }
    
    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.render();
        this.updateStats();
    }
    
    markAllComplete() {
        const allCompleted = this.todos.every(t => t.completed);
        this.todos.forEach(todo => {
            todo.completed = !allCompleted;
            todo.updatedAt = new Date().toISOString();
        });
        this.saveTodos();
        this.render();
        this.updateStats();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }
    
    getFilteredTodos() {
        switch(this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }
    
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.todoList.style.display = 'none';
            this.emptyState.style.display = 'block';
            
            // Update empty state message based on filter
            const emptyMessages = {
                all: { icon: '📝', title: 'No tasks yet', text: 'Add a task above to get started!' },
                active: { icon: '✅', title: 'All done!', text: 'No active tasks remaining.' },
                completed: { icon: '📋', title: 'No completed tasks', text: 'Complete some tasks to see them here.' }
            };
            
            const message = emptyMessages[this.currentFilter];
            this.emptyState.innerHTML = `
                <div class="empty-icon">${message.icon}</div>
                <h3>${message.title}</h3>
                <p>${message.text}</p>
            `;
        } else {
            this.todoList.style.display = 'block';
            this.emptyState.style.display = 'none';
            
            this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoElement(todo)).join('');
            
            // Bind events for todo items
            this.bindTodoEvents();
        }
    }
    
    createTodoElement(todo) {
        const createdDate = new Date(todo.createdAt).toLocaleDateString();
        
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-content">
                    <label class="todo-checkbox">
                        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                    <span class="todo-text" title="Created: ${createdDate}">${this.escapeHtml(todo.text)}</span>
                </div>
                <div class="todo-actions">
                    <button class="edit-btn" title="Edit task">✏️</button>
                    <button class="delete-btn" title="Delete task">🗑️</button>
                </div>
            </li>
        `;
    }
    
    bindTodoEvents() {
        // Toggle completion
        this.todoList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.closest('.todo-item').dataset.id);
                this.toggleTodo(id);
            });
        });
        
        // Edit todo
        this.todoList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const todoItem = e.target.closest('.todo-item');
                const id = parseInt(todoItem.dataset.id);
                this.startEdit(todoItem, id);
            });
        });
        
        // Delete todo
        this.todoList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.todo-item').dataset.id);
                this.deleteTodo(id);
            });
        });
        
        // Double click to edit
        this.todoList.querySelectorAll('.todo-text').forEach(text => {
            text.addEventListener('dblclick', (e) => {
                const todoItem = e.target.closest('.todo-item');
                const id = parseInt(todoItem.dataset.id);
                this.startEdit(todoItem, id);
            });
        });
    }
    
    startEdit(todoItem, id) {
        const textElement = todoItem.querySelector('.todo-text');
        const currentText = textElement.textContent;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        input.maxLength = 100;
        
        textElement.replaceWith(input);
        input.focus();
        input.select();
        
        const finishEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                this.editTodo(id, newText);
            } else {
                this.render();
            }
        };
        
        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                finishEdit();
            } else if (e.key === 'Escape') {
                this.render();
            }
        });
    }
    
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        
        this.totalTasks.textContent = `${total} task${total !== 1 ? 's' : ''}`;
        this.completedTasks.textContent = `${completed} completed`;
        
        // Update action buttons
        this.clearCompletedBtn.disabled = completed === 0;
        this.markAllCompleteBtn.disabled = total === 0;
        this.markAllCompleteBtn.textContent = total > 0 && completed === total ? 'Mark All Active' : 'Mark All Complete';
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the todo app
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});