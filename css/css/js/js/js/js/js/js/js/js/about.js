// about.js - About & Disclaimer page specific JavaScript

function initAboutPage() {
    console.log('Initializing about page...');
    
    // Get DOM elements
    const languageSelector = document.getElementById('languageSelector');
    
    // Initialize language selector
    if (languageSelector) {
        languageSelector.value = getLanguage();
    }
    
    // Add emergency numbers button handler
    const emergencyNumbersBtn = document.getElementById('emergencyNumbersBtn');
    if (emergencyNumbersBtn) {
        emergencyNumbersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyNumbers();
        });
    }
    
    // Add print button handler if exists
    const printBtn = document.querySelector('[onclick*="print"]');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
    
    console.log('About page initialized');
}

function loadEmergencyNumbers() {
    const emergencyNumbersGrid = document.getElementById('emergencyNumbersGrid');
    if (!emergencyNumbersGrid) return;
    
    // Clear existing content
    emergencyNumbersGrid.innerHTML = '';
    
    // Sort countries alphabetically
    const sortedCountries = Object.keys(emergencyNumbers).sort();
    
    // Create grid items
    sortedCountries.forEach(country => {
        const number = emergencyNumbers[country];
        
        const item = document.createElement('div');
        item.className = 'emergency-number-item';
        item.innerHTML = `
            <div class="country-name">${country}</div>
            <div class="emergency-number">${number}</div>
        `;
        
        emergencyNumbersGrid.appendChild(item);
    });
}

// Export for use in HTML
window.initAboutPage = initAboutPage;
window.loadEmergencyNumbers = loadEmergencyNumbers;
