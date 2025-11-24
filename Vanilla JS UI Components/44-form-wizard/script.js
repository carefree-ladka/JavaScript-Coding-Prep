class FormWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        
        this.form = document.getElementById('wizardForm');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.form.addEventListener('input', (e) => this.validateField(e.target));
        this.form.addEventListener('change', (e) => this.validateField(e.target));
        
        // Step navigation
        document.querySelectorAll('.step').forEach(step => {
            step.addEventListener('click', () => {
                const stepNum = parseInt(step.dataset.step);
                if (stepNum < this.currentStep) {
                    this.goToStep(stepNum);
                }
            });
        });
    }
    
    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateUI();
                if (this.currentStep === 4) {
                    this.populateReview();
                }
            }
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }
    
    goToStep(stepNum) {
        this.currentStep = stepNum;
        this.updateUI();
    }
    
    validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Custom validations
        if (this.currentStep === 2) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                this.showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            if (password.length < 6) {
                this.showError('password', 'Password must be at least 6 characters');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Clear previous error
        this.clearError(field.name || field.id);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showError(field.name || field.id, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field.name || field.id, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Username validation
        if (field.name === 'username' && value) {
            if (value.length < 3) {
                this.showError('username', 'Username must be at least 3 characters');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    showError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"], #${fieldName}`);
        if (field) {
            field.classList.add('error');
            const errorElement = field.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }
    }
    
    clearError(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"], #${fieldName}`);
        if (field) {
            field.classList.remove('error');
            const errorElement = field.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    }
    
    saveCurrentStepData() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.name === 'interests') {
                    if (!this.formData.interests) this.formData.interests = [];
                    if (input.checked) {
                        this.formData.interests.push(input.value);
                    }
                } else {
                    this.formData[input.name] = input.checked;
                }
            } else if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                }
            } else {
                this.formData[input.name || input.id] = input.value;
            }
        });
    }
    
    populateReview() {
        document.getElementById('reviewName').textContent = 
            `${this.formData.firstName || ''} ${this.formData.lastName || ''}`.trim();
        document.getElementById('reviewEmail').textContent = this.formData.email || '';
        document.getElementById('reviewPhone').textContent = this.formData.phone || 'Not provided';
        document.getElementById('reviewUsername').textContent = this.formData.username || '';
        document.getElementById('reviewAccountType').textContent = 
            this.formData.accountType ? this.formData.accountType.charAt(0).toUpperCase() + this.formData.accountType.slice(1) : '';
    }
    
    updateUI() {
        // Update steps
        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.toggle('active', stepNum === this.currentStep);
            step.classList.toggle('completed', stepNum < this.currentStep);
        });
        
        // Update form steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.toggle('active', parseInt(step.dataset.step) === this.currentStep);
        });
        
        // Update progress bar
        const progress = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        
        // Update buttons
        this.prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-block';
        this.nextBtn.style.display = this.currentStep === this.totalSteps ? 'none' : 'inline-block';
        this.submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none';
        
        // Update button text
        if (this.currentStep === this.totalSteps - 1) {
            this.nextBtn.textContent = 'Review';
        } else {
            this.nextBtn.textContent = 'Next';
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }
        
        this.saveCurrentStepData();
        
        // Simulate form submission
        this.submitBtn.textContent = 'Submitting...';
        this.submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Registration completed successfully!');
            console.log('Form Data:', this.formData);
            
            // Reset form
            this.resetForm();
        }, 2000);
    }
    
    resetForm() {
        this.currentStep = 1;
        this.formData = {};
        this.form.reset();
        
        // Clear all errors
        document.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        this.submitBtn.textContent = 'Submit';
        this.submitBtn.disabled = false;
        
        this.updateUI();
    }
}

// Initialize form wizard
document.addEventListener('DOMContentLoaded', () => {
    new FormWizard();
});