# Engine Monitoring Dashboard

A comprehensive real-time monitoring dashboard for aircraft engines, built with vanilla JavaScript, HTML5, and CSS3. This project demonstrates industrial-grade frontend development skills suitable for aerospace applications.

## 🚀 Features

### Real-Time Monitoring
- **Live Engine Data**: RPM, Exhaust Gas Temperature (EGT), Fuel Flow, Thrust measurements
- **Multi-Engine Support**: Switch between TF-850, GT-9000X, and AE-7500 engines
- **Status Indicators**: Visual status displays (Normal, Warning, Critical)
- **Automatic Updates**: Real-time data simulation with 5-second intervals

### Data Visualization
- **Performance Trends**: Interactive line charts showing historical performance
- **Parameter Comparison**: Bar charts for current engine parameters
- **Fleet Overview**: Pie chart showing overall fleet status
- **Responsive Charts**: Built with Chart.js for professional data visualization

### Alert System
- **Real-Time Alerts**: Critical, Warning, and Info level notifications
- **Alert Modal**: Detailed alert management interface
- **Dismissible Alerts**: Interactive alert handling
- **Sound Notifications**: Audio alerts for critical conditions (optional)

### Maintenance Management
- **Scheduled Maintenance**: Track upcoming maintenance tasks
- **Priority Levels**: Critical, High, Medium, Low priority indicators
- **Due Date Tracking**: Visual indicators for overdue and upcoming tasks
- **Engine-Specific Tasks**: Maintenance organized by engine type

### Professional UI/UX
- **Clean Design**: Modern, professional interface suitable for industrial use
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Dark/Light Themes**: Adaptable color schemes
- **Accessibility**: WCAG compliant design elements

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Tailwind CSS for rapid UI development
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome for professional iconography
- **Build Tools**: Live-server for development

## 📁 Project Structure

```
engine-monitoring-dashboard/
├── index.html              # Main HTML structure
├── styles.css              # Custom CSS styles
├── script.js               # Main JavaScript application
├── package.json            # Node.js dependencies
├── README.md               # Project documentation
└── assets/
    ├── images/             # Project images and screenshots
    └── data/               # Mock data files (optional)
```

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for development server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/engine-monitoring-dashboard.git
   cd engine-monitoring-dashboard
   ```

2. **Install dependencies (optional)**
   ```bash
   npm install
   ```

3. **Run the application**
   
   **Option 1: Direct file opening**
   - Simply open `index.html` in your web browser
   
   **Option 2: Development server**
   ```bash
   npm start
   ```
   - Opens http://localhost:3000

## 💼 Skills Demonstrated

### Frontend Development
- **Vanilla JavaScript**: ES6+ features, classes, modules, async/await
- **DOM Manipulation**: Dynamic content updates, event handling
- **Responsive Design**: Mobile-first approach, flexible layouts
- **CSS Animations**: Smooth transitions, loading states, hover effects

### Data Management
- **Real-time Updates**: Simulated live data streaming
- **State Management**: Application state handling without frameworks
- **Data Visualization**: Interactive charts and graphs
- **Local Storage**: Client-side data persistence (optional)

### Industrial Application Features
- **Alert Systems**: Critical notification handling
- **Maintenance Scheduling**: Task management and tracking
- **Multi-Engine Support**: Scalable architecture
- **Export Functionality**: Data export and reporting

### Best Practices
- **Clean Code**: Well-commented, maintainable JavaScript
- **Error Handling**: Robust error management
- **Performance**: Optimized rendering and updates
- **Accessibility**: Screen reader support, keyboard navigation

## 🎯 Key Components

### 1. Engine Data Management
```javascript
class EngineDashboard {
    constructor() {
        this.engineData = {
            'TF-850': { /* engine parameters */ },
            'GT-9000X': { /* engine parameters */ },
            'AE-7500': { /* engine parameters */ }
        };
    }
}
```

### 2. Real-Time Data Simulation
```javascript
simulateDataUpdate() {
    // Realistic parameter variations
    // Status updates based on thresholds
    // Automatic UI refresh
}
```

### 3. Chart Integration
```javascript
renderPerformanceChart() {
    // Chart.js implementation
    // Dynamic data binding
    // Interactive features
}
```

### 4. Alert Management
```javascript
addRandomAlert() {
    // Alert generation
    // Severity classification
    // User notifications
}
```

## 📊 Data Models

### Engine Parameters
- **RPM**: Revolutions per minute (10,000-15,000)
- **EGT**: Exhaust Gas Temperature (600-800°C)
- **Fuel Flow**: Fuel consumption (2,500-3,500 kg/h)
- **Thrust**: Engine thrust (25-40 kN)
- **Vibration**: Vibration levels (0.1-3.0)
- **Oil Pressure**: Oil system pressure (25-50 PSI)

### Alert Severities
- **Critical**: Immediate action required
- **Warning**: Attention needed
- **Info**: General information

### Maintenance Priorities
- **Critical**: Safety-related, immediate
- **High**: Performance-affecting
- **Medium**: Scheduled maintenance
- **Low**: Preventive maintenance

## 🔧 Customization

### Adding New Engines
1. Update engineData object in script.js
2. Add engine-specific parameters
3. Update UI components as needed

### Modifying Parameters
1. Edit parameter ranges in getPerformancePercentage()
2. Update chart configurations
3. Adjust alert thresholds

### Styling Changes
1. Modify styles.css for custom themes
2. Update Tailwind classes in HTML
3. Adjust chart colors in JavaScript

## 📱 Responsive Design

- **Desktop**: Full dashboard with all features
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Stacked layout, essential information prioritized

## 🔒 Security Considerations

- **Data Validation**: Input validation for all user interactions
- **XSS Prevention**: Proper HTML escaping
- **CSRF Protection**: Token-based request validation (if backend added)
- **Content Security Policy**: Restrictive CSP headers

## 🚀 Deployment Options

### Static Hosting
- **GitHub Pages**: Free hosting for public repositories
- **Netlify**: Continuous deployment from Git
- **Vercel**: Optimized for frontend applications
- **AWS S3**: Scalable static website hosting

### Docker Deployment
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

## 📈 Performance Optimization

- **Lazy Loading**: Components loaded on demand
- **Debounced Updates**: Prevent excessive re-renders
- **Chart Optimization**: Efficient data binding
- **Memory Management**: Proper cleanup of intervals and listeners

## 🧪 Testing Strategy

### Manual Testing
- Cross-browser compatibility
- Responsive design testing
- User interaction testing
- Performance testing

### Automated Testing (Future Enhancement)
- Unit tests for JavaScript functions
- Integration tests for chart rendering
- E2E tests for user workflows

## 📝 Future Enhancements

### Technical Improvements
- [ ] WebSocket integration for real data
- [ ] Service Worker for offline functionality
- [ ] Progressive Web App (PWA) features
- [ ] TypeScript migration

### Feature Additions
- [ ] Historical data analysis
- [ ] Predictive maintenance algorithms
- [ ] Email/SMS alert notifications
- [ ] Multi-user authentication
- [ ] Advanced reporting features

### Integration Possibilities
- [ ] REST API backend integration
- [ ] Database connectivity
- [ ] Third-party monitoring tools
- [ ] Enterprise authentication (LDAP/SSO)

## 🛠 Development Commands

```bash
# Start development server
npm start

# Format code
npm run format

# Lint JavaScript
npm run lint

# Build (no build process for static files)
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Gauri Pandey - gauripandey9720@gmail.com  
Project Link: [https://github.com/gauripandey-dev/Engine-monitoring-dashboard](https://github.com/yourusername/engine-monitoring-dashboard)

## 🙏 Acknowledgments

- Aerospace industry for inspiration and engineering excellence
- Chart.js community for excellent charting library
- Tailwind CSS for rapid UI development
- Font Awesome for professional iconography

---

**Note**: This is a demonstration project created for portfolio purposes. It uses simulated data and is not connected to actual aircraft systems or real engine data.

## 🖼️ Screenshots

### Main Dashboard
![Dashboard Overview](IMAGES/dashboard-overview.png.png)

### Alert Management
![Alert System](IMAGES/alert-system.png.png)

### Performance Charts
![Performance Monitoring](<IMAGES/performance monitoring.png.png>)

### Mobile View

![Mobile Interface](IMAGES/mobile-view.png.png)
