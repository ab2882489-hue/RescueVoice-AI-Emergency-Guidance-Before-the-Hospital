// nearby.js - Nearby help page specific JavaScript

let userLocation = null;
let nearbyHelp = [];

function initNearbyPage() {
    console.log('Initializing nearby help page...');
    
    // Get DOM elements
    const refreshBtn = document.getElementById('refreshBtn');
    const languageSelector = document.getElementById('languageSelector');
    
    // Initialize language selector
    if (languageSelector) {
        languageSelector.value = getLanguage();
    }
    
    // Set up event listeners
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshNearbyHelp);
    }
    
    // Add emergency numbers button handler
    const emergencyNumbersBtn = document.getElementById('emergencyNumbersBtn');
    if (emergencyNumbersBtn) {
        emergencyNumbersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyNumbers();
        });
    }
    
    console.log('Nearby help page initialized');
}

async function getUserLocation() {
    const userLocationEl = document.getElementById('userLocation');
    if (!userLocationEl) return;
    
    try {
        const location = await window.getUserLocation();
        userLocation = location;
        userLocationEl.textContent = location.address;
        return location;
    } catch (error) {
        console.error('Error getting location:', error);
        userLocationEl.textContent = "Location access denied or unavailable";
        return null;
    }
}

function loadNearbyHelp() {
    // Sample nearby help locations (in real app, this would come from a geolocation API)
    const sampleHelp = [
        {name: "City General Hospital", type: "Hospital", distance: "1.2 miles", phone: "+1-555-1234", icon: "fa-hospital"},
        {name: "Emergency Medical Center", type: "Emergency Room", distance: "0.8 miles", phone: "+1-555-5678", icon: "fa-notes-medical"},
        {name: "Quick Response Ambulance", type: "Ambulance Service", distance: "2.1 miles", phone: "+1-555-9012", icon: "fa-ambulance"},
        {name: "Urgent Care Clinic", type: "Clinic", distance: "1.5 miles", phone: "+1-555-3456", icon: "fa-clinic-medical"},
        {name: "24/7 Emergency Pharmacy", type: "Pharmacy", distance: "0.5 miles", phone: "+1-555-7890", icon: "fa-pills"}
    ];
    
    nearbyHelp = sampleHelp;
    renderHelpList();
    
    return sampleHelp;
}

function renderHelpList() {
    const helpList = document.getElementById('helpList');
    if (!helpList) return;
    
    helpList.innerHTML = '';
    
    nearbyHelp.forEach((help, index) => {
        const item = document.createElement('div');
        item.className = 'help-item';
        item.innerHTML = `
            <div class="help-icon"><i class="fas ${help.icon}"></i></div>
            <div class="help-info">
                <div class="help-name">${help.name}</div>
                <div class="help-type">${help.type}</div>
                <div class="help-distance">${help.distance} away</div>
            </div>
            <button class="call-button" onclick="callHelpLocation('${help.name}', '${help.phone}')">
                <i class="fas fa-phone-alt"></i>
            </button>
        `;
        
        helpList.appendChild(item);
    });
}

function refreshNearbyHelp() {
    speakMessage("Refreshing nearby emergency services locations.");
    
    // Show loading state
    const helpList = document.getElementById('helpList');
    if (helpList) {
        helpList.innerHTML = '<div class="text-center">Refreshing locations...</div>';
    }
    
    // Simulate API call delay
    setTimeout(() => {
        loadNearbyHelp();
        speakMessage("Nearby help locations refreshed.");
    }, 1500);
}

function callHelpLocation(name, phoneNumber) {
    speakMessage(`Calling ${name}. Please describe the emergency when they answer.`);
    
    // In a real app, this would initiate a phone call
    alert(`Simulated call to ${name} at ${phoneNumber}.\n\nIn a real app, this would initiate an actual phone call.`);
}

// Export for use in HTML
window.initNearbyPage = initNearbyPage;
window.getUserLocation = getUserLocation;
window.loadNearbyHelp = loadNearbyHelp;
window.refreshNearbyHelp = refreshNearbyHelp;
window.callHelpLocation = callHelpLocation;
