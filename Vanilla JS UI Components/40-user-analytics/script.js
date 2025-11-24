class UserAnalytics {
    constructor() {
        this.startTime = Date.now();
        this.lastActivityTime = Date.now();
        this.isVisible = !document.hidden;
        this.isIdle = false;
        this.idleThreshold = 30000; // 30 seconds
        
        this.analytics = {
            sessionStart: new Date().toISOString(),
            sessionTime: 0,
            activeTime: 0,
            idleTime: 0,
            tabSwitches: 0,
            interactions: 0,
            visibilityChanges: [],
            activities: [],
            userAgent: navigator.userAgent,
            url: window.location.href,
            referrer: document.referrer
        };
        
        this.timers = {
            session: null,
            idle: null,
            update: null,
            beacon: null
        };
        
        this.elements = {
            sessionTime: document.getElementById('sessionTime'),
            activeTime: document.getElementById('activeTime'),
            idleTime: document.getElementById('idleTime'),
            tabSwitches: document.getElementById('tabSwitches'),
            interactions: document.getElementById('interactions'),
            visibilityStatus: document.getElementById('visibilityStatus'),
            statusDot: document.getElementById('statusDot'),
            statusText: document.getElementById('statusText'),
            activityTimeline: document.getElementById('activityTimeline'),
            analyticsData: document.getElementById('analyticsData')
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startTracking();
        this.updateDisplay();
        
        // Send analytics periodically
        this.timers.beacon = setInterval(() => {
            this.sendAnalytics(false);
        }, 30000); // Every 30 seconds
    }
    
    bindEvents() {
        // Page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // User interactions
        ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                this.handleUserActivity();
            }, { passive: true });
        });
        
        // Page unload - send final analytics
        window.addEventListener('beforeunload', () => {
            this.sendAnalytics(true);
        });
        
        // Page focus/blur (additional to visibility API)
        window.addEventListener('focus', () => {
            this.handleFocus();
        });
        
        window.addEventListener('blur', () => {
            this.handleBlur();
        });
        
        // Control buttons
        document.getElementById('sendAnalytics').addEventListener('click', () => {
            this.sendAnalytics(false);
        });
        
        document.getElementById('clearData').addEventListener('click', () => {
            this.clearData();
        });
        
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });
    }
    
    startTracking() {
        // Update session time every second
        this.timers.session = setInterval(() => {
            this.updateSessionTime();
        }, 1000);
        
        // Check for idle state
        this.timers.idle = setInterval(() => {
            this.checkIdleState();
        }, 1000);
        
        // Update display every second
        this.timers.update = setInterval(() => {
            this.updateDisplay();
        }, 1000);
        
        this.logActivity('session_start', 'User session started');
    }
    
    handleVisibilityChange() {
        const isVisible = !document.hidden;
        const timestamp = Date.now();
        
        if (isVisible !== this.isVisible) {
            this.analytics.tabSwitches++;
            
            const event = {
                timestamp: new Date().toISOString(),
                type: isVisible ? 'tab_focus' : 'tab_blur',
                duration: timestamp - this.lastActivityTime
            };
            
            this.analytics.visibilityChanges.push(event);
            this.logActivity(event.type, `Tab ${isVisible ? 'focused' : 'blurred'}`);
            
            this.isVisible = isVisible;
            this.lastActivityTime = timestamp;
            
            this.updateVisibilityStatus();
        }
    }
    
    handleFocus() {
        if (!this.isVisible) {
            this.handleVisibilityChange();
        }
        this.logActivity('window_focus', 'Window gained focus');
    }
    
    handleBlur() {
        this.logActivity('window_blur', 'Window lost focus');
    }
    
    handleUserActivity() {
        const now = Date.now();
        
        // Reset idle state
        if (this.isIdle) {
            this.isIdle = false;
            this.logActivity('user_active', 'User became active');
        }
        
        // Count interaction
        this.analytics.interactions++;
        this.lastActivityTime = now;
    }
    
    checkIdleState() {
        const now = Date.now();
        const timeSinceActivity = now - this.lastActivityTime;
        
        if (!this.isIdle && timeSinceActivity > this.idleThreshold) {
            this.isIdle = true;
            this.logActivity('user_idle', 'User became idle');
        }
    }
    
    updateSessionTime() {
        const now = Date.now();
        this.analytics.sessionTime = now - this.startTime;
        
        if (this.isVisible && !this.isIdle) {
            // Only count as active time if visible and not idle
            this.analytics.activeTime += 1000;
        }
        
        if (this.isIdle) {
            this.analytics.idleTime += 1000;
        }
    }
    
    updateDisplay() {
        this.elements.sessionTime.textContent = this.formatTime(this.analytics.sessionTime);
        this.elements.activeTime.textContent = this.formatTime(this.analytics.activeTime);
        this.elements.idleTime.textContent = this.formatTime(this.analytics.idleTime);
        this.elements.tabSwitches.textContent = this.analytics.tabSwitches;
        this.elements.interactions.textContent = this.analytics.interactions;
        
        this.updateVisibilityStatus();
        this.updateActivityTimeline();
        this.updateAnalyticsData();
    }
    
    updateVisibilityStatus() {
        let status = 'Visible';
        let statusClass = 'active';
        
        if (!this.isVisible) {
            status = 'Hidden';
            statusClass = 'inactive';
        } else if (this.isIdle) {
            status = 'Idle';
            statusClass = 'idle';
        }
        
        this.elements.visibilityStatus.textContent = status;
        this.elements.statusDot.className = `status-dot ${statusClass}`;
        this.elements.statusText.textContent = `Tracking ${status}`;
    }
    
    updateActivityTimeline() {
        const recentActivities = this.analytics.activities.slice(-10);
        
        this.elements.activityTimeline.innerHTML = recentActivities.map(activity => `
            <div class="timeline-item">
                <div class="timeline-time">${new Date(activity.timestamp).toLocaleTimeString()}</div>
                <div class="timeline-event">${activity.description}</div>
            </div>
        `).join('');
    }
    
    updateAnalyticsData() {
        const displayData = {
            ...this.analytics,
            sessionTime: this.formatTime(this.analytics.sessionTime),
            activeTime: this.formatTime(this.analytics.activeTime),
            idleTime: this.formatTime(this.analytics.idleTime),
            activities: this.analytics.activities.slice(-5) // Show last 5 activities
        };
        
        this.elements.analyticsData.textContent = JSON.stringify(displayData, null, 2);
    }
    
    logActivity(type, description) {
        const activity = {
            timestamp: new Date().toISOString(),
            type,
            description,
            url: window.location.href
        };
        
        this.analytics.activities.push(activity);
        
        // Keep only last 100 activities
        if (this.analytics.activities.length > 100) {
            this.analytics.activities = this.analytics.activities.slice(-100);
        }
    }
    
    sendAnalytics(isBeacon = false) {
        const analyticsData = {
            ...this.analytics,
            timestamp: new Date().toISOString(),
            sessionEnd: isBeacon ? new Date().toISOString() : null
        };
        
        const payload = JSON.stringify(analyticsData);
        
        if (isBeacon && navigator.sendBeacon) {
            // Use sendBeacon for reliable delivery during page unload
            const success = navigator.sendBeacon('/api/analytics', payload);
            console.log('Analytics sent via beacon:', success);
            this.logActivity('analytics_beacon', `Beacon sent: ${success}`);
        } else {
            // Regular fetch for periodic updates
            fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
                keepalive: true // Important for requests during page unload
            })
            .then(response => {
                console.log('Analytics sent via fetch:', response.ok);
                this.logActivity('analytics_fetch', `Fetch sent: ${response.ok}`);
            })
            .catch(error => {
                console.error('Analytics send failed:', error);
                this.logActivity('analytics_error', `Send failed: ${error.message}`);
                
                // Fallback to beacon if fetch fails
                if (navigator.sendBeacon) {
                    navigator.sendBeacon('/api/analytics', payload);
                }
            });
        }
        
        // Store in localStorage as backup
        try {
            localStorage.setItem('userAnalytics', payload);
        } catch (e) {
            console.warn('Failed to store analytics in localStorage:', e);
        }
    }
    
    clearData() {
        // Reset analytics data
        this.analytics = {
            sessionStart: new Date().toISOString(),
            sessionTime: 0,
            activeTime: 0,
            idleTime: 0,
            tabSwitches: 0,
            interactions: 0,
            visibilityChanges: [],
            activities: [],
            userAgent: navigator.userAgent,
            url: window.location.href,
            referrer: document.referrer
        };
        
        this.startTime = Date.now();
        this.lastActivityTime = Date.now();
        
        this.logActivity('data_cleared', 'Analytics data cleared');
        this.updateDisplay();
    }
    
    exportData() {
        const data = JSON.stringify(this.analytics, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        this.logActivity('data_exported', 'Analytics data exported');
    }
    
    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    destroy() {
        // Clean up timers
        Object.values(this.timers).forEach(timer => {
            if (timer) clearInterval(timer);
        });
        
        // Send final analytics
        this.sendAnalytics(true);
        
        this.logActivity('session_end', 'User session ended');
    }
}

// Initialize analytics when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.userAnalytics = new UserAnalytics();
    
    // Demo interactions
    document.querySelectorAll('.demo-btn, .demo-links a').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Demo interaction:', e.target.textContent);
        });
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.userAnalytics) {
        window.userAnalytics.destroy();
    }
});