class Breadcrumb {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.path = [];
        this.routes = {
            'home': { label: 'Home', parent: null },
            'products': { label: 'Products', parent: 'home' },
            'electronics': { label: 'Electronics', parent: 'products' },
            'laptops': { label: 'Laptops', parent: 'electronics' },
            'gaming-laptops': { label: 'Gaming Laptops', parent: 'laptops' }
        };
        
        this.navigate('home');
    }
    
    navigate(routeId) {
        this.path = this.buildPath(routeId);
        this.render();
    }
    
    buildPath(routeId) {
        const path = [];
        let current = routeId;
        
        while (current) {
            const route = this.routes[current];
            if (route) {
                path.unshift({ id: current, ...route });
                current = route.parent;
            } else {
                break;
            }
        }
        
        return path;
    }
    
    render() {
        this.container.innerHTML = this.path.map((item, index) => {
            const isLast = index === this.path.length - 1;
            
            if (isLast) {
                return `<span class="breadcrumb-current">${item.label}</span>`;
            } else {
                return `<a href="#" onclick="breadcrumb.navigate('${item.id}')" class="breadcrumb-link">${item.label}</a>`;
            }
        }).join('');
    }
}

let breadcrumb;
document.addEventListener('DOMContentLoaded', () => {
    breadcrumb = new Breadcrumb('breadcrumb');
});