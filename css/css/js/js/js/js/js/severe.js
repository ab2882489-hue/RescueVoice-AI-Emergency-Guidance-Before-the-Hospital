// severe.js - Severe emergency page specific JavaScript

let countdownInterval = null;
let countdownValue = 5;
let emergencyData = null;

function initSeverePage() {
    console.log('Initializing severe emergency page...');
    
    // Get DOM elements
    const cancelBtn = document.getElementById('cancelBtn');
    const callNowBtn = document.getElementById('callNowBtn');
    const messageBtn = document.getElementById('messageBtn');
    const languageSelector = document.getElementById('languageSelector');
    const countdownNumber = document.getElementById('countdownNumber');
    
    // Initialize language selector
    if (languageSelector) {
        languageSelector.value = getLanguage();
    }
    
    // Set up event listeners
    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelEmergencyCall);
    }
    
    if (callNowBtn) {
        callNowBtn.addEventListener('click', callEmergencyNow);
    }
    
    if (messageBtn) {
        messageBtn.addEventListener('click', sendEmergencyMessage);
    }
    
    // Load emergency data
    emergencyData = getEmergencyData();
    
    if (!emergencyData) {
        // No emergency data, redirect to input
        console.warn('No emergency data found for severe page');
        window.location.href = 'emergency.html';
        return;
    }
    
    // Add emergency numbers button handler
    const emergencyNumbersBtn = document.getElementById('emergencyNumbersBtn');
    if (emergencyNumbersBtn) {
        emergencyNumbersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyNumbers();
        });
    }
    
    console.log('Severe emergency page initialized');
}

function startCountdown() {
    const countdownNumber = document.getElementById('countdownNumber');
    if (!countdownNumber) return;
    
    countdownValue = 5;
    countdownNumber.textContent = countdownValue;
    
    // Initial warning
    speakMessage("Severe emergency detected. Calling emergency services in 5 seconds. Say cancel or press cancel button to stop.");
    
    // Start countdown
    countdownInterval = setInterval(() => {
        countdownValue--;
        countdownNumber.textContent = countdownValue;
        
        // Speak countdown every second
        if (countdownValue > 0) {
            speakMessage(`${countdownValue}`);
        }
        
        // When countdown reaches 0, make the call
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            callEmergencyNow();
        }
    }, 1000);
}

function cancelEmergencyCall() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    speakMessage("Emergency call cancelled. Returning to guidance.");
    
    // Redirect back to guidance page
    setTimeout(() => {
        window.location.href = 'guidance.html';
    }, 1500);
}

function callEmergencyNow() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    // Determine country and emergency number
    const country = detectCountry();
    const emergencyNumber = getEmergencyNumber(country);
    
    // Update UI
    const countdownNumber = document.getElementById('countdownNumber');
    if (countdownNumber) {
        countdownNumber.textContent = "CALLING";
    }
    
    // Speak confirmation
    speakMessage(`Calling ${emergencyNumber} now. Please stay on the line and describe the emergency to the operator.`);
    
    // In a real app, this would initiate a phone call
    // For demo purposes, we'll show an alert
    setTimeout(() => {
        const emergencyType = emergencyData ? emergencyData.displayName : 'Medical Emergency';
        const locationInfo = "Using your current location";
        
        alert(`Simulated emergency call to ${emergencyNumber} (${country} emergency services).\n\nEmergency Type: ${emergencyType}\nLocation: ${locationInfo}\n\nIn a real app, this would initiate an actual phone call.`);
        
        // After "call", redirect to nearby help
        setTimeout(() => {
            window.location.href = 'nearby.html';
        }, 2000);
    }, 2000);
}

function sendEmergencyMessage() {
    if (!emergencyData) return;
    
    // Determine country
    const country = detectCountry();
    const emergencyNumber = getEmergencyNumber(country);
    
    // Get location
    getUserLocation().then(location => {
        // Create emergency message
        const message = `EMERGENCY ALERT via Emergency AI Guidance System\n\nType: ${emergencyData.displayName}\nSeverity: ${emergencyData.severity.toUpperCase()}\nLocation: ${location.address}\nTime: ${getCurrentTimestamp()}\n\nCall ${emergencyNumber} for immediate assistance.`;
        
        // Speak confirmation
        speakMessage("Sending emergency message with situation and location details to emergency contacts.");
        
        // Show message content (in real app, this would send via SMS/WhatsApp)
        setTimeout(() => {
            alert(`Emergency message would be sent:\n\n${message}\n\nIn a real app, this would send via SMS/WhatsApp to emergency contacts.`);
        }, 1000);
    });
}

// Export for use in HTML
window.initSeverePage = initSeverePage;
window.startCountdown = startCountdown;
window.cancelEmergencyCall = cancelEmergencyCall;
window.callEmergencyNow = callEmergencyNow;
window.sendEmergencyMessage = sendEmergencyMessage;
