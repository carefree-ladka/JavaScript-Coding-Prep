class UserCards {
    constructor() {
        this.users = [];
        this.filteredUsers = [];
        this.displayedUsers = [];
        this.currentView = 'grid';
        this.itemsPerPage = 12;
        this.currentPage = 1;
        
        this.container = document.getElementById('userCardsContainer');
        this.searchInput = document.getElementById('searchInput');
        this.sortSelect = document.getElementById('sortBy');
        this.loadMoreBtn = document.getElementById('loadMore');
        
        this.init();
    }
    
    init() {
        this.generateUsers();
        this.bindEvents();
        this.render();
    }
    
    generateUsers() {
        const names = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor', 'Ivy Chen', 'Jack Anderson', 'Kate Thompson', 'Liam Garcia', 'Mia Rodriguez', 'Noah Martinez', 'Olivia Lopez', 'Paul Hernandez', 'Quinn Walker', 'Ruby Hall', 'Sam Allen', 'Tina Young'];
        const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Consultant'];
        const statuses = ['online', 'offline', 'away', 'busy'];
        const locations = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin', 'Toronto'];
        
        this.users = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: names[i % names.length],
            email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@company.com`,
            role: roles[Math.floor(Math.random() * roles.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
            joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString(),
            projects: Math.floor(Math.random() * 20) + 1,
            rating: (Math.random() * 2 + 3).toFixed(1)
        }));
        
        this.filteredUsers = [...this.users];
        this.updateDisplayedUsers();
    }
    
    bindEvents() {
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setView(e.target.dataset.view);
            });
        });
        
        // Search
        this.searchInput.addEventListener('input', () => {
            this.filterUsers();
        });
        
        // Sort
        this.sortSelect.addEventListener('change', () => {
            this.sortUsers();
        });
        
        // Load more
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMore();
        });
        
        // Card interactions
        this.container.addEventListener('click', (e) => {
            if (e.target.closest('.user-card')) {
                this.handleCardClick(e.target.closest('.user-card'));
            }
        });
    }
    
    setView(view) {
        this.currentView = view;
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        this.container.className = `user-cards-container ${view}-view`;
        this.render();
    }
    
    filterUsers() {
        const query = this.searchInput.value.toLowerCase();
        
        this.filteredUsers = this.users.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query) ||
            user.location.toLowerCase().includes(query)
        );
        
        this.currentPage = 1;
        this.updateDisplayedUsers();
        this.render();
    }
    
    sortUsers() {
        const sortBy = this.sortSelect.value;
        
        this.filteredUsers.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'role':
                    return a.role.localeCompare(b.role);
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });
        
        this.currentPage = 1;
        this.updateDisplayedUsers();
        this.render();
    }
    
    updateDisplayedUsers() {
        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        this.displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
        
        this.loadMoreBtn.style.display = 
            endIndex >= this.filteredUsers.length ? 'none' : 'block';
    }
    
    loadMore() {
        this.currentPage++;
        this.updateDisplayedUsers();
        this.renderNewCards();
    }
    
    render() {
        this.container.innerHTML = this.displayedUsers.map(user => 
            this.createUserCard(user)
        ).join('');
    }
    
    renderNewCards() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const newCards = this.displayedUsers.slice(startIndex);
        
        newCards.forEach(user => {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = this.createUserCard(user);
            this.container.appendChild(cardElement.firstElementChild);
        });
    }
    
    createUserCard(user) {
        return `
            <div class="user-card" data-id="${user.id}">
                <div class="card-header">
                    <div class="avatar-container">
                        <img src="${user.avatar}" alt="${user.name}" class="avatar">
                        <div class="status-indicator ${user.status}"></div>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn" title="Message">💬</button>
                        <button class="action-btn" title="Call">📞</button>
                        <button class="action-btn" title="More">⋯</button>
                    </div>
                </div>
                
                <div class="card-body">
                    <h3 class="user-name">${user.name}</h3>
                    <p class="user-role">${user.role}</p>
                    <p class="user-email">${user.email}</p>
                    <p class="user-location">📍 ${user.location}</p>
                </div>
                
                <div class="card-stats">
                    <div class="stat">
                        <span class="stat-value">${user.projects}</span>
                        <span class="stat-label">Projects</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${user.rating}</span>
                        <span class="stat-label">Rating</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${user.status}</span>
                        <span class="stat-label">Status</span>
                    </div>
                </div>
                
                <div class="card-footer">
                    <span class="join-date">Joined ${user.joinDate}</span>
                    <div class="card-buttons">
                        <button class="btn btn-outline">View</button>
                        <button class="btn btn-primary">Connect</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    handleCardClick(card) {
        const userId = card.dataset.id;
        const user = this.users.find(u => u.id == userId);
        
        // Toggle card selection
        card.classList.toggle('selected');
        
        console.log('Card clicked:', user);
        
        // You can add modal or detailed view here
        this.showUserDetails(user);
    }
    
    showUserDetails(user) {
        // Simple alert for demo - replace with modal in production
        alert(`User Details:\n\nName: ${user.name}\nRole: ${user.role}\nEmail: ${user.email}\nLocation: ${user.location}\nProjects: ${user.projects}\nRating: ${user.rating}\nStatus: ${user.status}`);
    }
}

// Initialize the user cards component
document.addEventListener('DOMContentLoaded', () => {
    new UserCards();
});