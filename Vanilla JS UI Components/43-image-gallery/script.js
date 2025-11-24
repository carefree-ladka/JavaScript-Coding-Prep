class ImageGallery {
    constructor() {
        this.images = this.generateImages();
        this.filteredImages = [...this.images];
        this.currentIndex = 0;
        this.currentView = 'grid';
        
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.galleryGrid = document.getElementById('galleryGrid');
        
        this.init();
    }
    
    generateImages() {
        const categories = ['nature', 'city', 'people'];
        const titles = ['Sunset Valley', 'Mountain Peak', 'Ocean Waves', 'City Lights', 'Street Art', 'Architecture', 'Portrait', 'Candid', 'Group Photo'];
        
        return Array.from({ length: 24 }, (_, i) => ({
            id: i + 1,
            src: `https://picsum.photos/400/300?random=${i + 1}`,
            thumb: `https://picsum.photos/200/150?random=${i + 1}`,
            title: titles[i % titles.length] + ` ${i + 1}`,
            description: `Beautiful ${categories[i % categories.length]} photography captured in high resolution.`,
            category: categories[i % categories.length],
            alt: `Image ${i + 1}`
        }));
    }
    
    init() {
        this.bindEvents();
        this.render();
    }
    
    bindEvents() {
        // Filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterImages(e.target.value);
        });
        
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setView(e.target.dataset.view);
            });
        });
        
        // Lightbox controls
        document.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        document.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        document.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape': this.closeLightbox(); break;
                    case 'ArrowLeft': this.prevImage(); break;
                    case 'ArrowRight': this.nextImage(); break;
                }
            }
        });
        
        // Close on backdrop click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
    }
    
    filterImages(category) {
        this.filteredImages = category === 'all' 
            ? [...this.images] 
            : this.images.filter(img => img.category === category);
        this.render();
    }
    
    setView(view) {
        this.currentView = view;
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.galleryGrid.className = `gallery-grid ${view}-view`;
        this.render();
    }
    
    render() {
        this.galleryGrid.innerHTML = this.filteredImages.map((image, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${image.thumb}" alt="${image.alt}" loading="lazy">
                <div class="image-overlay">
                    <h4>${image.title}</h4>
                    <p>${image.category}</p>
                    <button class="view-btn-overlay">View</button>
                </div>
            </div>
        `).join('');
        
        // Bind click events to gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox(parseInt(item.dataset.index));
            });
        });
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateLightbox();
        this.renderThumbnails();
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    prevImage() {
        this.currentIndex = this.currentIndex > 0 
            ? this.currentIndex - 1 
            : this.filteredImages.length - 1;
        this.updateLightbox();
    }
    
    nextImage() {
        this.currentIndex = this.currentIndex < this.filteredImages.length - 1 
            ? this.currentIndex + 1 
            : 0;
        this.updateLightbox();
    }
    
    updateLightbox() {
        const image = this.filteredImages[this.currentIndex];
        
        // Show loader
        document.querySelector('.image-loader').style.display = 'block';
        this.lightboxImage.style.opacity = '0';
        
        // Load new image
        const img = new Image();
        img.onload = () => {
            this.lightboxImage.src = img.src;
            this.lightboxImage.style.opacity = '1';
            document.querySelector('.image-loader').style.display = 'none';
        };
        img.src = image.src;
        
        // Update info
        document.getElementById('imageTitle').textContent = image.title;
        document.getElementById('imageDescription').textContent = image.description;
        document.getElementById('imageCounter').textContent = `${this.currentIndex + 1} / ${this.filteredImages.length}`;
        document.getElementById('imageCategory').textContent = image.category;
        
        // Update thumbnails
        this.updateThumbnails();
    }
    
    renderThumbnails() {
        const thumbnails = document.getElementById('thumbnails');
        thumbnails.innerHTML = this.filteredImages.map((image, index) => `
            <img src="${image.thumb}" alt="${image.alt}" 
                 class="thumbnail ${index === this.currentIndex ? 'active' : ''}"
                 data-index="${index}">
        `).join('');
        
        // Bind thumbnail clicks
        thumbnails.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                this.currentIndex = parseInt(thumb.dataset.index);
                this.updateLightbox();
            });
        });
    }
    
    updateThumbnails() {
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
        
        // Scroll active thumbnail into view
        const activeThumbnail = document.querySelector('.thumbnail.active');
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});