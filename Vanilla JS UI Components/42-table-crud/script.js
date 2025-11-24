class TableCRUD {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.editingId = null;
        
        this.initializeData();
        this.bindEvents();
        this.render();
    }
    
    initializeData() {
        const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
        const positions = ['Manager', 'Developer', 'Analyst', 'Coordinator', 'Specialist'];
        const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Lisa Davis', 'Tom Miller', 'Anna Garcia', 'Chris Lee', 'Emma Taylor'];
        
        this.data = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: names[i % names.length] + ` ${i + 1}`,
            email: `employee${i + 1}@company.com`,
            department: departments[Math.floor(Math.random() * departments.length)],
            position: positions[Math.floor(Math.random() * positions.length)],
            salary: Math.floor(Math.random() * 100000) + 40000,
            status: Math.random() > 0.2 ? 'Active' : 'Inactive'
        }));
        
        this.filteredData = [...this.data];
    }
    
    bindEvents() {
        // Add button
        document.getElementById('addBtn').addEventListener('click', () => this.openModal());
        
        // Search
        document.getElementById('searchInput').addEventListener('input', () => this.applyFilters());
        
        // Filters
        document.getElementById('departmentFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('statusFilter').addEventListener('change', () => this.applyFilters());
        
        // Sort
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', () => this.sort(th.dataset.column));
        });
        
        // Select all
        document.getElementById('selectAll').addEventListener('change', (e) => {
            document.querySelectorAll('.row-select').forEach(cb => {
                cb.checked = e.target.checked;
            });
        });
        
        // Pagination
        document.getElementById('prevBtn').addEventListener('click', () => this.changePage(-1));
        document.getElementById('nextBtn').addEventListener('click', () => this.changePage(1));
        
        // Export
        document.getElementById('exportBtn').addEventListener('click', () => this.exportCSV());
        
        // Delete selected
        document.getElementById('deleteSelectedBtn').addEventListener('click', () => this.deleteSelected());
        
        // Modal events
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('employeeForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Close modal on backdrop click
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') this.closeModal();
        });
    }
    
    applyFilters() {
        const search = document.getElementById('searchInput').value.toLowerCase();
        const department = document.getElementById('departmentFilter').value;
        const status = document.getElementById('statusFilter').value;
        
        this.filteredData = this.data.filter(item => {
            const matchesSearch = !search || 
                item.name.toLowerCase().includes(search) ||
                item.email.toLowerCase().includes(search) ||
                item.position.toLowerCase().includes(search);
            
            const matchesDepartment = !department || item.department === department;
            const matchesStatus = !status || item.status === status;
            
            return matchesSearch && matchesDepartment && matchesStatus;
        });
        
        this.currentPage = 1;
        this.render();
    }
    
    sort(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }
        
        this.filteredData.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];
            
            if (column === 'salary') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            
            if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        
        this.updateSortIcons();
        this.render();
    }
    
    updateSortIcons() {
        document.querySelectorAll('.sort-icon').forEach(icon => {
            icon.textContent = '↕';
        });
        
        if (this.sortColumn) {
            const activeIcon = document.querySelector(`[data-column="${this.sortColumn}"] .sort-icon`);
            activeIcon.textContent = this.sortDirection === 'asc' ? '↑' : '↓';
        }
    }
    
    changePage(direction) {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const newPage = this.currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.render();
        }
    }
    
    render() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);
        
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = pageData.map(item => `
            <tr>
                <td><input type="checkbox" class="row-select" data-id="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.department}</td>
                <td>${item.position}</td>
                <td>$${item.salary.toLocaleString()}</td>
                <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
                <td class="actions">
                    <button class="btn-icon edit" onclick="tableCRUD.edit(${item.id})" title="Edit">✏️</button>
                    <button class="btn-icon delete" onclick="tableCRUD.delete(${item.id})" title="Delete">🗑️</button>
                </td>
            </tr>
        `).join('');
        
        this.updatePagination();
        this.updateTableInfo();
    }
    
    updatePagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        document.getElementById('prevBtn').disabled = this.currentPage === 1;
        document.getElementById('nextBtn').disabled = this.currentPage === totalPages;
        document.getElementById('pageInfo').textContent = `Page ${this.currentPage} of ${totalPages}`;
    }
    
    updateTableInfo() {
        const total = this.filteredData.length;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIndex = Math.min(startIndex + this.itemsPerPage - 1, total);
        
        document.getElementById('tableInfo').textContent = 
            total > 0 ? `Showing ${startIndex}-${endIndex} of ${total} employees` : 'No employees found';
    }
    
    openModal(employee = null) {
        this.editingId = employee ? employee.id : null;
        
        document.getElementById('modalTitle').textContent = employee ? 'Edit Employee' : 'Add Employee';
        document.getElementById('saveBtn').textContent = employee ? 'Update' : 'Save';
        
        if (employee) {
            document.getElementById('name').value = employee.name;
            document.getElementById('email').value = employee.email;
            document.getElementById('department').value = employee.department;
            document.getElementById('position').value = employee.position;
            document.getElementById('salary').value = employee.salary;
            document.getElementById('status').value = employee.status;
        } else {
            document.getElementById('employeeForm').reset();
        }
        
        document.getElementById('modal').classList.add('active');
    }
    
    closeModal() {
        document.getElementById('modal').classList.remove('active');
        this.editingId = null;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const employee = {
            name: formData.get('name'),
            email: formData.get('email'),
            department: formData.get('department'),
            position: formData.get('position'),
            salary: parseInt(formData.get('salary')),
            status: formData.get('status')
        };
        
        if (this.editingId) {
            this.update(this.editingId, employee);
        } else {
            this.create(employee);
        }
        
        this.closeModal();
    }
    
    create(employee) {
        const newId = Math.max(...this.data.map(item => item.id)) + 1;
        const newEmployee = { id: newId, ...employee };
        
        this.data.unshift(newEmployee);
        this.applyFilters();
    }
    
    edit(id) {
        const employee = this.data.find(item => item.id === id);
        if (employee) {
            this.openModal(employee);
        }
    }
    
    update(id, updatedData) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updatedData };
            this.applyFilters();
        }
    }
    
    delete(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.data = this.data.filter(item => item.id !== id);
            this.applyFilters();
        }
    }
    
    deleteSelected() {
        const selectedIds = Array.from(document.querySelectorAll('.row-select:checked'))
            .map(cb => parseInt(cb.dataset.id));
        
        if (selectedIds.length === 0) {
            alert('Please select employees to delete');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${selectedIds.length} employee(s)?`)) {
            this.data = this.data.filter(item => !selectedIds.includes(item.id));
            document.getElementById('selectAll').checked = false;
            this.applyFilters();
        }
    }
    
    exportCSV() {
        const headers = ['ID', 'Name', 'Email', 'Department', 'Position', 'Salary', 'Status'];
        const csvContent = [
            headers.join(','),
            ...this.filteredData.map(item => [
                item.id,
                `"${item.name}"`,
                item.email,
                item.department,
                `"${item.position}"`,
                item.salary,
                item.status
            ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `employees-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }
}

// Initialize the table CRUD component
let tableCRUD;
document.addEventListener('DOMContentLoaded', () => {
    tableCRUD = new TableCRUD();
});