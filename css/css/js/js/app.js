// app.js - Home page specific JavaScript

function initHomePage() {
    console.log('Initializing home page...');
    
    // Get DOM elements
    const startButton = document.getElementById('startButton');
    const languageSelector = document.getElementById('languageSelector');
    
    // Set up event listeners
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Clear any previous emergency data
            clearEmergencyData();
            
            // Speak confirmation
            speakMessage("Starting emergency help system. Please describe what happened.");
        });
    }
    
    // Initialize language selector
    if (languageSelector) {
        // Set current language
        languageSelector.value = getLanguage();
        
        // Add change event
        languageSelector.addEventListener('change', function(e) {
            const newLang = changeLanguage(e.target.value);
            console.log('Language changed to:', newLang);
        });
    }
    
    // Add emergency numbers button handler
    const emergencyNumbersBtn = document.getElementById('emergencyNumbersBtn');
    if (emergencyNumbersBtn) {
        emergencyNumbersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyNumbers();
        });
    }
    
    console.log('Home page initialized');
}

// Export for use in HTML
window.initHomePage = initHomePage;
