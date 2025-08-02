// Engine Performance Dashboard JavaScript

class EngineDashboard {
    constructor() {
        this.selectedEngine = 'TF-850';
        this.charts = {};
        this.updateInterval = null;
        
        // Mock engine data
        this.engineData = {
            'TF-850': {
                status: 'Normal',
                rpm: 12450,
                egt: 658, // Exhaust Gas Temperature
                fuelFlow: 2840,
                vibration: 0.8,
                oilPressure: 42,
                thrust: 33500,
                efficiency: 94.2
            },
            'GT-9000X': {
                status: 'Warning',
                rpm: 11200,
                egt: 720,
                fuelFlow: 3100,
                vibration: 1.2,
                oilPressure: 38,
                thrust: 35000,
                efficiency: 91.8
            },
            'AE-7500': {
                status: 'Critical',
                rpm: 10800,
                egt: 780,
                fuelFlow: 2950,
                vibration: 2.1,
                oilPressure: 35,
                thrust: 32000,
                efficiency: 87.5
            }
        };

        // Historical performance data
        this.performanceHistory = [
            { time: '00:00', rpm: 12000, egt: 650, fuelFlow: 2800, thrust: 33000 },
            { time: '04:00', rpm: 12200, egt: 655, fuelFlow: 2820, thrust: 33200 },
            { time: '08:00', rpm: 12400, egt: 660, fuelFlow: 2850, thrust: 33400 },
            { time: '12:00', rpm: 12450, egt: 658, fuelFlow: 2840, thrust: 33500 },
            { time: '16:00', rpm: 12300, egt: 665, fuelFlow: 2830, thrust: 33300 },
            { time: '20:00', rpm: 12100, egt: 662, fuelFlow: 2810, thrust: 33100 }
        ];

        // Fleet status data
        this.fleetData = [
            { name: 'Normal', value: 15, color: '#10b981' },
            { name: 'Warning', value: 3, color: '#f59e0b' },
            { name: 'Critical', value: 1, color: '#ef4444' },
            { name: 'Maintenance', value: 2, color: '#6b7280' }
        ];

        // Maintenance schedule
        this.maintenanceSchedule = [
            { engine: 'TF-850', task: 'Borescope Inspection', due: '2025-08-15', priority: 'Medium' },
            { engine: 'GT-9000X', task: 'Oil Change', due: '2025-07-30', priority: 'High' },
            { engine: 'AE-7500', task: 'Compressor Wash', due: '2025-07-28', priority: 'Critical' },
            { engine: 'TF-850', task: 'Filter Replacement', due: '2025-08-20', priority: 'Low' }
        ];

        // Active alerts
        this.alerts = [
            { id: 1, engine: 'AE-7500', message: 'High vibration detected', severity: 'Critical', time: '14:23' },
            { id: 2, engine: 'GT-9000X', message: 'EGT approaching limit', severity: 'Warning', time: '14:18' },
            { id: 3, engine: 'TF-850', message: 'Scheduled maintenance due', severity: 'Info', time: '13:45' }
        ];

        this.init();
    }

    init() {
        this.updateDateTime();
        this.setupEventListeners();
        this.renderEngineList();
        this.renderStatusCards();
        this.renderFleetChart();
        this.renderPerformanceChart();
        this.renderParametersChart();
        this.renderMaintenanceTable();
        this.renderAlerts();
        this.startRealTimeUpdates();
    }

    updateDateTime() {
        const now = new Date();
        document.getElementById('current-date').textContent = now.toLocaleDateString();
        document.getElementById('current-time').textContent = now.toLocaleTimeString();
    }

    setupEventListeners() {
        // Alert modal
        document.getElementById('alerts-btn').addEventListener('click', () => {
            this.showAlertModal();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideAlertModal();
        });

        // Trend metric selector
        document.getElementById('trend-metric').addEventListener('change', (e) => {
            this.updatePerformanceChart(e.target.value);
        });

        // Close modal when clicking outside
        document.getElementById('alert-modal').addEventListener('click', (e) => {
            if (e.target.id === 'alert-modal') {
                this.hideAlertModal();
            }
        });
    }

    selectEngine(engineName) {
        this.selectedEngine = engineName;
        this.renderStatusCards();
        this.updateEngineSelection();
    }

    updateEngineSelection() {
        const buttons = document.querySelectorAll('.engine-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.engine === this.selectedEngine) {
                btn.classList.add('active');
            }
        });
    }

    renderEngineList() {
        const engineList = document.getElementById('engine-list');
        engineList.innerHTML = '';

        Object.keys(this.engineData).forEach(engineName => {
            const engine = this.engineData[engineName];
            const button = document.createElement('button');
            button.className = `engine-btn w-full p-3 rounded-lg text-left transition-colors ${
                this.selectedEngine === engineName ? 'active' : 'bg-gray-50 hover:bg-gray-100'
            }`;
            button.dataset.engine = engineName;
            
            button.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="font-medium text-sm">${engineName}</span>
                    <span class="px-2 py-1 rounded-full text-xs font-medium status-${engine.status.toLowerCase()}">
                        ${engine.status}
                    </span>
                </div>
            `;

            button.addEventListener('click', () => this.selectEngine(engineName));
            engineList.appendChild(button);
        });
    }

    renderStatusCards() {
        const container = document.getElementById('status-cards');
        const engine = this.engineData[this.selectedEngine];
        
        const cards = [
            { icon: 'fas fa-tachometer-alt', label: 'RPM', value: engine.rpm.toLocaleString(), unit: '', color: 'blue' },
            { icon: 'fas fa-thermometer-half', label: 'EGT', value: engine.egt, unit: '°C', color: 'red' },
            { icon: 'fas fa-gas-pump', label: 'Fuel Flow', value: engine.fuelFlow, unit: 'kg/h', color: 'green' },
            { icon: 'fas fa-chart-line', label: 'Thrust', value: (engine.thrust / 1000).toFixed(1), unit: 'kN', color: 'purple' }
        ];

        container.innerHTML = '';
        
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'status-card bg-white p-6 rounded-xl shadow-sm';
            
            cardElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">${card.label}</p>
                        <p class="text-2xl font-bold text-gray-900 metric-value">${card.value}<span class="text-sm text-gray-500 ml-1">${card.unit}</span></p>
                    </div>
                    <div class="w-12 h-12 bg-${card.color}-100 rounded-lg flex items-center justify-center">
                        <i class="${card.icon} text-${card.color}-600 text-xl"></i>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="performance-bar">
                        <div class="performance-fill performance-normal" style="width: ${this.getPerformancePercentage(card.label, card.value)}%"></div>
                    </div>
                </div>
            `;
            
            container.appendChild(cardElement);
        });
    }

    getPerformancePercentage(metric, value) {
        // Simulate performance percentage based on normal operating ranges
        const ranges = {
            'RPM': { min: 10000, max: 15000 },
            'EGT': { min: 600, max: 800 },
            'Fuel Flow': { min: 2500, max: 3500 },
            'Thrust': { min: 25, max: 40 }
        };
        
        const range = ranges[metric];
        if (!range) return 75;
        
        const percentage = ((value - range.min) / (range.max - range.min)) * 100;
        return Math.max(0, Math.min(100, percentage));
    }

    renderFleetChart() {
        const canvas = document.getElementById('fleet-chart');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw pie chart
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        let startAngle = 0;
        
        const total = this.fleetData.reduce((sum, item) => sum + item.value, 0);
        
        this.fleetData.forEach(item => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();
            
            startAngle += sliceAngle;
        });
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        // Render legend
        const legend = document.getElementById('fleet-legend');
        legend.innerHTML = '';
        
        this.fleetData.forEach(item => {
            const legendItem = document.createElement('div');
            legendItem.className = 'flex items-center justify-between text-sm';
            legendItem.innerHTML = `
                <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${item.color}"></div>
                    <span>${item.name}</span>
                </div>
                <span class="font-medium">${item.value}</span>
            `;
            legend.appendChild(legendItem);
        });
    }

    renderPerformanceChart() {
        const canvas = document.getElementById('performance-chart');
        const ctx = canvas.getContext('2d');
        
        if (this.charts.performance) {
            this.charts.performance.destroy();
        }
        
        this.charts.performance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.performanceHistory.map(item => item.time),
                datasets: [{
                    label: 'RPM',
                    data: this.performanceHistory.map(item => item.rpm),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    updatePerformanceChart(metric) {
        if (!this.charts.performance) return;
        
        const dataMap = {
            'rpm': this.performanceHistory.map(item => item.rpm),
            'egt': this.performanceHistory.map(item => item.egt),
            'fuelFlow': this.performanceHistory.map(item => item.fuelFlow),
            'thrust': this.performanceHistory.map(item => item.thrust)
        };
        
        const colorMap = {
            'rpm': '#3b82f6',
            'egt': '#ef4444',
            'fuelFlow': '#10b981',
            'thrust': '#8b5cf6'
        };
        
        this.charts.performance.data.datasets[0].data = dataMap[metric];
        this.charts.performance.data.datasets[0].borderColor = colorMap[metric];
        this.charts.performance.data.datasets[0].backgroundColor = colorMap[metric] + '20';
        this.charts.performance.data.datasets[0].label = metric.toUpperCase();
        this.charts.performance.update();
    }

    renderParametersChart() {
        const canvas = document.getElementById('parameters-chart');
        const ctx = canvas.getContext('2d');
        
        if (this.charts.parameters) {
            this.charts.parameters.destroy();
        }
        
        const engine = this.engineData[this.selectedEngine];
        
        this.charts.parameters = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['RPM', 'EGT', 'Fuel Flow', 'Oil Pressure', 'Efficiency'],
                datasets: [{
                    label: 'Current Values',
                    data: [
                        (engine.rpm / 150), // Normalized
                        engine.egt,
                        (engine.fuelFlow / 30), // Normalized
                        engine.oilPressure,
                        engine.efficiency
                    ],
                    backgroundColor: [
                        '#3b82f6',
                        '#ef4444',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    renderMaintenanceTable() {
        const tbody = document.getElementById('maintenance-table');
        tbody.innerHTML = '';

        this.maintenanceSchedule.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-100 hover:bg-gray-50';
            
            const dueDate = new Date(item.due);
            const today = new Date();
            const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            const isOverdue = daysUntilDue < 0;
            const isUrgent = daysUntilDue <= 7 && daysUntilDue >= 0;
            
            row.innerHTML = `
                <td class="py-3 text-sm text-gray-900">${item.engine}</td>
                <td class="py-3 text-sm text-gray-700">${item.task}</td>
                <td class="py-3 text-sm ${isOverdue ? 'text-red-600 font-medium' : isUrgent ? 'text-orange-600 font-medium' : 'text-gray-700'}">
                    ${item.due}
                    ${isOverdue ? '(Overdue)' : isUrgent ? '(Soon)' : ''}
                </td>
                <td class="py-3">
                    <span class="px-2 py-1 rounded-full text-xs font-medium priority-${item.priority.toLowerCase()}">
                        ${item.priority}
                    </span>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    renderAlerts() {
        const container = document.getElementById('alerts-list');
        container.innerHTML = '';

        this.alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `p-3 rounded-lg alert-${alert.severity.toLowerCase()}`;
            
            alertElement.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-${this.getAlertIcon(alert.severity)} text-sm"></i>
                            <span class="font-medium text-sm">${alert.engine}</span>
                            <span class="text-xs text-gray-500">${alert.time}</span>
                        </div>
                        <p class="text-sm text-gray-700 mt-1">${alert.message}</p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600 ml-2" onclick="dashboard.dismissAlert(${alert.id})">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(alertElement);
        });

        // Update alert count
        document.getElementById('alert-count').textContent = this.alerts.length;
    }

    getAlertIcon(severity) {
        switch (severity) {
            case 'Critical': return 'exclamation-triangle';
            case 'Warning': return 'exclamation-circle';
            case 'Info': return 'info-circle';
            default: return 'bell';
        }
    }

    dismissAlert(alertId) {
        this.alerts = this.alerts.filter(alert => alert.id !== alertId);
        this.renderAlerts();
        this.updateModalAlerts();
    }

    showAlertModal() {
        const modal = document.getElementById('alert-modal');
        modal.classList.remove('hidden');
        this.updateModalAlerts();
    }

    hideAlertModal() {
        const modal = document.getElementById('alert-modal');
        modal.classList.add('hidden');
    }

    updateModalAlerts() {
        const container = document.getElementById('modal-alerts-list');
        container.innerHTML = '';

        if (this.alerts.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-4">No active alerts</p>';
            return;
        }

        this.alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `p-4 rounded-lg alert-${alert.severity.toLowerCase()} mb-3`;
            
            alertElement.innerHTML = `
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-2">
                            <i class="fas fa-${this.getAlertIcon(alert.severity)}"></i>
                            <span class="font-semibold">${alert.severity}</span>
                            <span class="text-sm text-gray-600">• ${alert.time}</span>
                        </div>
                        <h4 class="font-medium text-gray-900">${alert.engine}</h4>
                        <p class="text-gray-700 mt-1">${alert.message}</p>
                        <div class="mt-3 flex space-x-2">
                            <button class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                Acknowledge
                            </button>
                            <button class="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400" onclick="dashboard.dismissAlert(${alert.id})">
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(alertElement);
        });
    }

    simulateDataUpdate() {
        // Simulate real-time data changes
        Object.keys(this.engineData).forEach(engineName => {
            const engine = this.engineData[engineName];
            
            // Add small random variations to simulate real data
            engine.rpm += Math.floor(Math.random() * 20 - 10);
            engine.egt += Math.floor(Math.random() * 6 - 3);
            engine.fuelFlow += Math.floor(Math.random() * 20 - 10);
            engine.vibration += (Math.random() * 0.2 - 0.1);
            engine.oilPressure += Math.floor(Math.random() * 4 - 2);
            
            // Keep values within realistic ranges
            engine.rpm = Math.max(10000, Math.min(15000, engine.rpm));
            engine.egt = Math.max(600, Math.min(850, engine.egt));
            engine.fuelFlow = Math.max(2500, Math.min(3500, engine.fuelFlow));
            engine.vibration = Math.max(0.1, Math.min(3.0, engine.vibration));
            engine.oilPressure = Math.max(25, Math.min(50, engine.oilPressure));
            
            // Update status based on parameters
            if (engine.egt > 750 || engine.vibration > 1.5) {
                engine.status = 'Critical';
            } else if (engine.egt > 700 || engine.vibration > 1.0) {
                engine.status = 'Warning';
            } else {
                engine.status = 'Normal';
            }
        });

        // Update displays
        this.renderStatusCards();
        this.renderEngineList();
        this.renderParametersChart();
    }

    addRandomAlert() {
        const engines = Object.keys(this.engineData);
        const messages = [
            'Temperature spike detected',
            'Vibration anomaly reported',
            'Fuel pressure variance',
            'Oil temperature warning',
            'Performance degradation noted'
        ];
        const severities = ['Warning', 'Critical', 'Info'];
        
        const newAlert = {
            id: Date.now(),
            engine: engines[Math.floor(Math.random() * engines.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        this.alerts.unshift(newAlert);
        if (this.alerts.length > 5) {
            this.alerts.pop(); // Keep only 5 most recent alerts
        }
        
        this.renderAlerts();
    }

    startRealTimeUpdates() {
        // Update time every second
        setInterval(() => {
            this.updateDateTime();
        }, 1000);

        // Update engine data every 5 seconds
        setInterval(() => {
            this.simulateDataUpdate();
        }, 5000);

        // Add random alerts occasionally
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 15 seconds
                this.addRandomAlert();
            }
        }, 15000);

        // Add data refresh animation
        setInterval(() => {
            const cards = document.querySelectorAll('.status-card');
            cards.forEach(card => {
                card.classList.add('data-refresh');
                setTimeout(() => {
                    card.classList.remove('data-refresh');
                }, 2000);
            });
        }, 10000);
    }

    // Export functionality
    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            selectedEngine: this.selectedEngine,
            engineData: this.engineData,
            alerts: this.alerts,
            maintenance: this.maintenanceSchedule
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `engine-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Print report functionality
    printReport() {
        const printWindow = window.open('', '_blank');
        const engine = this.engineData[this.selectedEngine];
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Engine Performance Report - ${this.selectedEngine}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                        .metrics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
                        .metric { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
                        .alerts { margin-top: 20px; }
                        .alert { padding: 10px; margin: 5px 0; border-left: 4px solid #f59e0b; background: #fffbeb; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Engine Performance Report</h1>
                        <h2>Engine: ${this.selectedEngine}</h2>
                        <p>Generated: ${new Date().toLocaleString()}</p>
                        <p>Status: <strong>${engine.status}</strong></p>
                    </div>
                    
                    <div class="metrics">
                        <div class="metric">
                            <h3>RPM</h3>
                            <p>${engine.rpm.toLocaleString()}</p>
                        </div>
                        <div class="metric">
                            <h3>Exhaust Gas Temperature</h3>
                            <p>${engine.egt}°C</p>
                        </div>
                        <div class="metric">
                            <h3>Fuel Flow</h3>
                            <p>${engine.fuelFlow} kg/h</p>
                        </div>
                        <div class="metric">
                            <h3>Thrust</h3>
                            <p>${(engine.thrust / 1000).toFixed(1)} kN</p>
                        </div>
                    </div>
                    
                    <div class="alerts">
                        <h3>Active Alerts</h3>
                        ${this.alerts.map(alert => `
                            <div class="alert">
                                <strong>${alert.severity}:</strong> ${alert.message} (${alert.engine} - ${alert.time})
                            </div>
                        `).join('')}
                    </div>
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize dashboard when page loads
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new EngineDashboard();
    
    // Add export button functionality if needed
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => dashboard.exportData());
    }
    
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => dashboard.printReport());
    }
});