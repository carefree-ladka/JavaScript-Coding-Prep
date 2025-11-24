class TagInput {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            maxTags: options.maxTags || null,
            suggestions: options.suggestions || [],
            allowDuplicates: options.allowDuplicates || false,
            onChange: options.onChange || (() => {}),
            ...options
        };
        
        this.tags = [];
        this.input = container.querySelector('.tag-input-field');
        this.tagsContainer = container.querySelector('.tags-container');
        this.suggestionsDropdown = container.querySelector('.suggestions-dropdown');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.input.addEventListener('input', (e) => this.handleInput(e));
        this.input.addEventListener('blur', () => this.hideSuggestions());
        
        this.container.addEventListener('click', () => this.input.focus());
    }
    
    handleKeydown(e) {
        const value = this.input.value.trim();
        
        switch(e.key) {
            case 'Enter':
            case ',':
                e.preventDefault();
                if (value) this.addTag(value);
                break;
            case 'Backspace':
                if (!value && this.tags.length > 0) {
                    this.removeTag(this.tags.length - 1);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateSuggestions(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateSuggestions(-1);
                break;
        }
    }
    
    handleInput(e) {
        const value = e.target.value;
        
        if (this.options.suggestions.length > 0) {
            this.showSuggestions(value);
        }
    }
    
    addTag(tagText) {
        if (!tagText || tagText.length === 0) return;
        
        if (this.options.maxTags && this.tags.length >= this.options.maxTags) {
            this.showError(`Maximum ${this.options.maxTags} tags allowed`);
            return;
        }
        
        if (!this.options.allowDuplicates && this.tags.includes(tagText)) {
            this.showError('Tag already exists');
            return;
        }
        
        this.tags.push(tagText);
        this.input.value = '';
        this.render();
        this.hideSuggestions();
        this.options.onChange(this.tags);
    }
    
    removeTag(index) {
        this.tags.splice(index, 1);
        this.render();
        this.options.onChange(this.tags);
    }
    
    render() {
        this.tagsContainer.innerHTML = this.tags.map((tag, index) => `
            <span class="tag">
                ${tag}
                <button class="tag-remove" onclick="this.parentElement.parentElement.parentElement.tagInput.removeTag(${index})">&times;</button>
            </span>
        `).join('');
        
        // Update input placeholder
        if (this.options.maxTags && this.tags.length >= this.options.maxTags) {
            this.input.placeholder = 'Maximum tags reached';
            this.input.disabled = true;
        } else {
            this.input.disabled = false;
        }
    }
    
    showSuggestions(query) {
        if (!this.suggestionsDropdown || !query) {
            this.hideSuggestions();
            return;
        }
        
        const filtered = this.options.suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(query.toLowerCase()) &&
            !this.tags.includes(suggestion)
        );
        
        if (filtered.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        this.suggestionsDropdown.innerHTML = filtered.map(suggestion => `
            <div class="suggestion-item" onclick="this.parentElement.parentElement.tagInput.addTag('${suggestion}')">
                ${suggestion}
            </div>
        `).join('');
        
        this.suggestionsDropdown.style.display = 'block';
    }
    
    hideSuggestions() {
        if (this.suggestionsDropdown) {
            setTimeout(() => {
                this.suggestionsDropdown.style.display = 'none';
            }, 150);
        }
    }
    
    navigateSuggestions(direction) {
        if (!this.suggestionsDropdown || this.suggestionsDropdown.style.display === 'none') return;
        
        const items = this.suggestionsDropdown.querySelectorAll('.suggestion-item');
        const current = this.suggestionsDropdown.querySelector('.suggestion-item.active');
        let index = current ? Array.from(items).indexOf(current) : -1;
        
        if (current) current.classList.remove('active');
        
        index += direction;
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        
        if (items[index]) {
            items[index].classList.add('active');
        }
    }
    
    showError(message) {
        const error = document.createElement('div');
        error.className = 'tag-error';
        error.textContent = message;
        this.container.appendChild(error);
        
        setTimeout(() => error.remove(), 3000);
    }
    
    getTags() {
        return [...this.tags];
    }
    
    setTags(tags) {
        this.tags = [...tags];
        this.render();
        this.options.onChange(this.tags);
    }
}

// Initialize tag inputs
document.addEventListener('DOMContentLoaded', () => {
    const suggestions = ['JavaScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'C++', 'HTML', 'CSS'];
    
    // Basic tag input
    const tagInput1 = new TagInput(document.getElementById('tagInput1'), {
        onChange: (tags) => {
            document.getElementById('output1').textContent = JSON.stringify(tags, null, 2);
        }
    });
    document.getElementById('tagInput1').tagInput = tagInput1;
    
    // Tag input with suggestions
    const tagInput2 = new TagInput(document.getElementById('tagInput2'), {
        suggestions: suggestions,
        onChange: (tags) => {
            document.getElementById('output2').textContent = JSON.stringify(tags, null, 2);
        }
    });
    document.getElementById('tagInput2').tagInput = tagInput2;
    
    // Limited tag input
    const tagInput3 = new TagInput(document.getElementById('tagInput3'), {
        maxTags: 5,
        onChange: (tags) => {
            document.getElementById('output3').textContent = JSON.stringify(tags, null, 2);
        }
    });
    document.getElementById('tagInput3').tagInput = tagInput3;
});