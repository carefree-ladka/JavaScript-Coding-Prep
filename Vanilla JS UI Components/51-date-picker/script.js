class DatePicker {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            isRange: options.isRange || false,
            onChange: options.onChange || (() => {}),
            ...options
        };
        
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedRange = { start: null, end: null };
        this.isOpen = false;
        
        this.input = container.querySelector('.date-input');
        this.dropdown = container.querySelector('.calendar-dropdown');
        this.monthYear = container.querySelector('.month-year');
        this.daysContainer = container.querySelector('.calendar-days');
        this.prevBtn = container.querySelector('.prev-btn');
        this.nextBtn = container.querySelector('.next-btn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
    }
    
    bindEvents() {
        this.input.addEventListener('click', () => this.toggle());
        this.prevBtn.addEventListener('click', () => this.previousMonth());
        this.nextBtn.addEventListener('click', () => this.nextMonth());
        
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (this.isOpen && e.key === 'Escape') {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.dropdown.classList.add('active');
        this.render();
    }
    
    close() {
        this.isOpen = false;
        this.dropdown.classList.remove('active');
    }
    
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }
    
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }
    
    render() {
        this.renderHeader();
        this.renderDays();
    }
    
    renderHeader() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        
        this.monthYear.textContent = `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    }
    
    renderDays() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const days = [];
        const current = new Date(startDate);
        
        for (let i = 0; i < 42; i++) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        
        this.daysContainer.innerHTML = days.map(day => {
            const isCurrentMonth = day.getMonth() === month;
            const isToday = this.isToday(day);
            const isSelected = this.isSelected(day);
            const isInRange = this.isInRange(day);
            const isRangeStart = this.isRangeStart(day);
            const isRangeEnd = this.isRangeEnd(day);
            
            let className = 'calendar-day';
            if (!isCurrentMonth) className += ' other-month';
            if (isToday) className += ' today';
            if (isSelected) className += ' selected';
            if (isInRange) className += ' in-range';
            if (isRangeStart) className += ' range-start';
            if (isRangeEnd) className += ' range-end';
            
            return `<div class="${className}" data-date="${day.toISOString()}">${day.getDate()}</div>`;
        }).join('');
        
        // Bind click events
        this.daysContainer.querySelectorAll('.calendar-day').forEach(dayEl => {
            dayEl.addEventListener('click', () => {
                const date = new Date(dayEl.dataset.date);
                this.selectDate(date);
            });
        });
    }
    
    selectDate(date) {
        if (this.options.isRange) {
            this.selectRangeDate(date);
        } else {
            this.selectedDate = date;
            this.input.value = this.formatDate(date);
            this.options.onChange(date);
            this.close();
        }
        this.render();
    }
    
    selectRangeDate(date) {
        if (!this.selectedRange.start || (this.selectedRange.start && this.selectedRange.end)) {
            this.selectedRange = { start: date, end: null };
        } else if (date < this.selectedRange.start) {
            this.selectedRange = { start: date, end: this.selectedRange.start };
        } else {
            this.selectedRange.end = date;
        }
        
        if (this.selectedRange.start && this.selectedRange.end) {
            const startStr = this.formatDate(this.selectedRange.start);
            const endStr = this.formatDate(this.selectedRange.end);
            this.input.value = `${startStr} - ${endStr}`;
            this.options.onChange(this.selectedRange);
            this.close();
        } else if (this.selectedRange.start) {
            this.input.value = this.formatDate(this.selectedRange.start) + ' - ...';
        }
    }
    
    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
    
    isSelected(date) {
        if (this.options.isRange) {
            return false;
        }
        return this.selectedDate && date.toDateString() === this.selectedDate.toDateString();
    }
    
    isInRange(date) {
        if (!this.options.isRange || !this.selectedRange.start || !this.selectedRange.end) {
            return false;
        }
        return date >= this.selectedRange.start && date <= this.selectedRange.end;
    }
    
    isRangeStart(date) {
        return this.options.isRange && this.selectedRange.start && 
               date.toDateString() === this.selectedRange.start.toDateString();
    }
    
    isRangeEnd(date) {
        return this.options.isRange && this.selectedRange.end && 
               date.toDateString() === this.selectedRange.end.toDateString();
    }
    
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize date pickers
document.addEventListener('DOMContentLoaded', () => {
    // Single date picker
    new DatePicker(document.getElementById('datePicker1'), {
        onChange: (date) => {
            document.getElementById('output1').textContent = date.toLocaleDateString();
        }
    });
    
    // Range date picker
    new DatePicker(document.getElementById('datePicker2'), {
        isRange: true,
        onChange: (range) => {
            const start = range.start.toLocaleDateString();
            const end = range.end ? range.end.toLocaleDateString() : 'Not selected';
            document.getElementById('output2').textContent = `${start} to ${end}`;
        }
    });
});