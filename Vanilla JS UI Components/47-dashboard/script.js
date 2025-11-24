class Dashboard {
    constructor() {
        this.data = this.generateData();
        this.init();
    }
    
    generateData() {
        return {
            stats: {
                users: { value: 12543, change: 12.5 },
                revenue: { value: 45678, change: 8.3 },
                orders: { value: 1234, change: -2.1 },
                rating: { value: 4.8, change: 0.2 }
            },
            salesData: Array.from({length: 30}, (_, i) => ({
                day: i + 1,
                sales: Math.floor(Math.random() * 1000) + 500
            })),
            transactions: Array.from({length: 10}, (_, i) => ({
                id: `TXN${1000 + i}`,
                customer: `Customer ${i + 1}`,
                amount: Math.floor(Math.random() * 500) + 50,
                status: Math.random() > 0.3 ? 'Completed' : 'Pending',
                date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
            }))
        };
    }
    
    init() {
        this.updateStats();
        this.drawSalesChart();
        this.drawActivityChart();
        this.renderTransactions();
        this.bindEvents();
        this.startRealTimeUpdates();
    }
    
    bindEvents() {
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.data = this.generateData();
            this.updateStats();
            this.drawSalesChart();
            this.drawActivityChart();
            this.renderTransactions();
        });
        
        document.getElementById('timeRange').addEventListener('change', () => {
            this.drawSalesChart();
        });
    }
    
    updateStats() {
        const { stats } = this.data;
        
        document.getElementById('totalUsers').textContent = stats.users.value.toLocaleString();
        document.getElementById('revenue').textContent = `$${stats.revenue.value.toLocaleString()}`;
        document.getElementById('orders').textContent = stats.orders.value.toLocaleString();
        document.getElementById('rating').textContent = stats.rating.value.toFixed(1);
        
        document.getElementById('usersChange').textContent = `+${stats.users.change}%`;
        document.getElementById('revenueChange').textContent = `+${stats.revenue.change}%`;
        document.getElementById('ordersChange').textContent = `${stats.orders.change}%`;
        document.getElementById('ratingChange').textContent = `+${stats.rating.change}%`;
        
        document.getElementById('ordersChange').className = `stat-change ${stats.orders.change < 0 ? 'negative' : 'positive'}`;
    }
    
    drawSalesChart() {
        const canvas = document.getElementById('salesChart');
        const ctx = canvas.getContext('2d');
        const { salesData } = this.data;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padding = 40;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        const maxSales = Math.max(...salesData.map(d => d.sales));
        const minSales = Math.min(...salesData.map(d => d.sales));
        
        // Draw grid
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }
        
        // Draw line
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        salesData.forEach((point, index) => {
            const x = padding + (chartWidth / (salesData.length - 1)) * index;
            const y = padding + chartHeight - ((point.sales - minSales) / (maxSales - minSales)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#3b82f6';
        salesData.forEach((point, index) => {
            const x = padding + (chartWidth / (salesData.length - 1)) * index;
            const y = padding + chartHeight - ((point.sales - minSales) / (maxSales - minSales)) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    
    drawActivityChart() {
        const container = document.getElementById('activityChart');
        const hours = Array.from({length: 24}, (_, i) => ({
            hour: i,
            activity: Math.floor(Math.random() * 100)
        }));
        
        container.innerHTML = hours.map(h => `
            <div class="activity-bar">
                <div class="bar" style="height: ${h.activity}%"></div>
                <span class="hour">${h.hour}:00</span>
            </div>
        `).join('');
    }
    
    renderTransactions() {
        const tbody = document.querySelector('#transactionsTable tbody');
        tbody.innerHTML = this.data.transactions.map(t => `
            <tr>
                <td>${t.id}</td>
                <td>${t.customer}</td>
                <td>$${t.amount}</td>
                <td><span class="status ${t.status.toLowerCase()}">${t.status}</span></td>
                <td>${t.date}</td>
            </tr>
        `).join('');
    }
    
    startRealTimeUpdates() {
        setInterval(() => {
            // Simulate real-time updates
            this.data.stats.users.value += Math.floor(Math.random() * 10);
            this.data.stats.revenue.value += Math.floor(Math.random() * 100);
            this.updateStats();
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});