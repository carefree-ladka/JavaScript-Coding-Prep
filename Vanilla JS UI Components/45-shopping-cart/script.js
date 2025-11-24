class ShoppingCart {
    constructor() {
        this.products = this.generateProducts();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.taxRate = 0.1;
        this.shippingCost = 5.99;
        
        this.init();
    }
    
    generateProducts() {
        return [
            { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://picsum.photos/200/200?random=1' },
            { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/200/200?random=2' },
            { id: 3, name: 'Laptop Stand', price: 49.99, image: 'https://picsum.photos/200/200?random=3' },
            { id: 4, name: 'USB-C Cable', price: 19.99, image: 'https://picsum.photos/200/200?random=4' },
            { id: 5, name: 'Bluetooth Speaker', price: 79.99, image: 'https://picsum.photos/200/200?random=5' },
            { id: 6, name: 'Phone Case', price: 29.99, image: 'https://picsum.photos/200/200?random=6' }
        ];
    }
    
    init() {
        this.renderProducts();
        this.renderCart();
        this.bindEvents();
    }
    
    bindEvents() {
        document.getElementById('checkoutBtn').addEventListener('click', () => this.checkout());
    }
    
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = this.products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="cart.addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `).join('');
    }
    
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.renderCart();
        this.showNotification(`${product.name} added to cart!`);
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.renderCart();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.renderCart();
            }
        }
    }
    
    renderCart() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartSummary = document.getElementById('cartSummary');
        
        cartCount.textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
            cartSummary.style.display = 'none';
            return;
        }
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="cart.removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        this.updateSummary();
        cartSummary.style.display = 'block';
    }
    
    updateSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax + (subtotal > 0 ? this.shippingCost : 0);
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('shipping').textContent = subtotal > 0 ? `$${this.shippingCost.toFixed(2)}` : '$0.00';
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    
    checkout() {
        if (this.cart.length === 0) return;
        
        alert('Checkout completed! Thank you for your purchase.');
        this.cart = [];
        this.saveCart();
        this.renderCart();
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
});