class SidebarNav {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.toggleBtn = document.getElementById('toggleBtn');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.isCollapsed = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggleSidebar());
        this.mobileToggle.addEventListener('click', () => this.toggleMobile());
        
        // Submenu toggles
        document.querySelectorAll('.nav-item > .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = link.parentElement;
                parent.classList.toggle('open');
            });
        });
        
        // Active link handling
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.querySelector('.arrow')) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        
        // Close sidebar on outside click (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !this.sidebar.contains(e.target) && 
                !this.mobileToggle.contains(e.target)) {
                this.sidebar.classList.remove('mobile-open');
            }
        });
    }
    
    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        this.sidebar.classList.toggle('collapsed', this.isCollapsed);
    }
    
    toggleMobile() {
        this.sidebar.classList.toggle('mobile-open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SidebarNav();
});