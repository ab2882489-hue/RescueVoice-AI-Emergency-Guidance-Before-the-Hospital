// utils.js - Shared utility functions for Emergency AI Guidance System

// Emergency databases
const emergencyNumbers = {
    'US': '911',
    'UK': '999',
    'Pakistan': '1122',
    'India': '112',
    'UAE': '999',
    'Canada': '911',
    'Australia': '000',
    'Germany': '112',
    'France': '112',
    'Japan': '119',
    'China': '120',
    'Brazil': '192',
    'Russia': '112',
    'South Africa': '10111',
    'Mexico': '911',
    'Spain': '112',
    'Italy': '112',
    'South Korea': '119'
};

const guidanceSteps = {
    'chest_pain': [
        {title: "Call Emergency Services", content: "If the person is experiencing severe chest pain, call emergency services immediately. Don't wait to see if symptoms improve."},
        {title: "Help Person Sit Down", content: "Help the person sit in a comfortable position, usually leaning slightly forward. Loosen any tight clothing."},
        {title: "Ask About Medication", content: "Ask if they have prescribed heart medication like nitroglycerin. Help them take it if available."},
        {title: "Monitor Breathing", content: "Check if they're breathing normally. If they stop breathing, begin CPR immediately."},
        {title: "Stay Calm & Reassure", content: "Keep the person calm. Anxiety can worsen symptoms. Reassure them that help is on the way."},
        {title: "Prepare for Paramedics", content: "Unlock doors, clear pathways, and have someone wait outside to guide emergency responders."}
    ],
    'breathing_difficulty': [
        {title: "Call Emergency Services", content: "If breathing is severely difficult or has stopped, call emergency services immediately."},
        {title: "Help Person Sit Upright", content: "Help the person sit in an upright position to make breathing easier."},
        {title: "Check for Obstructions", content: "Look for visible obstructions in the mouth. Remove if visible and easily reachable."},
        {title: "Loosen Tight Clothing", content: "Remove or loosen any tight clothing around the neck and waist."},
        {title: "Use Inhaler if Available", content: "If the person has asthma and an inhaler, help them use it."},
        {title: "Monitor Until Help Arrives", content: "Watch for changes in breathing or consciousness. Be prepared to perform CPR if needed."}
    ],
    'bleeding': [
        {title: "Apply Direct Pressure", content: "Use a clean cloth or bandage to apply firm, direct pressure on the wound."},
        {title: "Elevate the Injury", content: "If possible, raise the injured area above heart level to reduce blood flow."},
        {title: "Add More Layers", content: "If blood soaks through, don't remove the cloth. Add more layers on top."},
        {title: "Apply Pressure Points", content: "If bleeding doesn't stop, apply pressure to the artery between the wound and the heart."},
        {title: "Tourniquet for Severe Bleeding", content: "For life-threatening limb bleeding, apply a tourniquet 2-3 inches above the wound."},
        {title: "Keep Person Warm & Still", content: "Cover the person with a blanket to prevent shock. Keep them still until help arrives."}
    ],
    'unconscious': [
        {title: "Check Responsiveness", content: "Gently shake the person and shout 'Are you okay?' If no response, call emergency services."},
        {title: "Check Breathing", content: "Look for chest movement, listen for breathing, feel for breath on your cheek."},
        {title: "Open Airway", content: "Tilt head back and lift chin to open airway if they're not breathing normally."},
        {title: "Begin CPR if Needed", content: "If not breathing normally, begin chest compressions: 30 compressions then 2 breaths."},
        {title: "Recovery Position", content: "If breathing normally but unconscious, place in recovery position to keep airway open."},
        {title: "Monitor Until Help Arrives", content: "Check breathing regularly and be prepared to restart CPR if needed."}
    ],
    'burn': [
        {title: "Cool the Burn", content: "Hold burned area under cool (not cold) running water for 10-20 minutes."},
        {title: "Remove Constrictive Items", content: "Gently remove jewelry or tight clothing near the burn before swelling starts."},
        {title: "Cover the Burn", content: "Cover with a sterile non-stick dressing or clean cloth."},
        {title: "Don't Break Blisters", content: "Leave blisters intact to prevent infection."},
        {title: "Pain Relief", content: "Give over-the-counter pain reliever if available and person can swallow."},
        {title: "Seek Medical Help", content: "For serious burns, call emergency services or go to hospital immediately."}
    ]
};

// Current application state
let currentLanguage = 'en';
let voiceActive = false;

// DOM Elements cache
let voiceIndicator, voiceText, languageSelector;

// Initialize common elements
function initCommonElements() {
    voiceIndicator = document.getElementById('voiceIndicator');
    voiceText = document.getElementById('voiceText');
    languageSelector = document.getElementById('languageSelector');
    
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
    
    // Add emergency numbers button handler if exists
    const emergencyNumbersBtn = document.getElementById('emergencyNumbersBtn');
    if (emergencyNumbersBtn) {
        emergencyNumbersBtn.addEventListener('click', showEmergencyNumbers);
    }
}

// Language functions
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update UI elements based on language
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        if (lang === 'ur') {
            logoText.textContent = 'ایمرجنسی AI گائیڈنس';
        } else {
            logoText.textContent = 'Emergency AI Guidance';
        }
    }
    
    // Speak confirmation
    speakMessage(getGreetingMessage());
    
    return lang;
}

function getGreetingMessage() {
    if (currentLanguage === 'ur') {
        return "آپ ایمرجنسی گائیڈنس سسٹم پر ہیں۔ آرام سے بتائیں کیا ہوا ہے۔";
    } else if (currentLanguage === 'ur-roman') {
        return "Aap emergency guidance system par hain. Aaram se batayein kya hua hai.";
    } else {
        return "You are on the emergency guidance system. Please calmly describe what happened.";
    }
}

function getLanguage() {
    return currentLanguage;
}

// Voice functions
function speakMessage(message) {
    if (!voiceIndicator || !voiceText) {
        console.warn('Voice indicator elements not found');
        return;
    }
    
    // Show voice indicator
    voiceIndicator.classList.remove('hidden');
    voiceText.textContent = `System is speaking: ${message.substring(0, 60)}...`;
    
    // Use Web Speech API if available
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(message);
        
        // Set language based on selection
        if (currentLanguage === 'ur') {
            utterance.lang = 'ur-PK';
        } else {
            utterance.lang = 'en-US';
        }
        
        utterance.rate = 0.9; // Slightly slower for emergencies
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onend = function() {
            // Hide voice indicator after a delay
            setTimeout(() => {
                if (voiceIndicator) {
                    voiceIndicator.classList.add('hidden');
                }
            }, 500);
        };
        
        utterance.onerror = function() {
            // Hide indicator on error
            if (voiceIndicator) {
                voiceIndicator.classList.add('hidden');
            }
        };
        
        speechSynthesis.speak(utterance);
    } else {
        // Fallback: hide indicator after simulated speech
        console.log('Speech synthesis not supported. Message:', message);
        setTimeout(() => {
            if (voiceIndicator) {
                voiceIndicator.classList.add('hidden');
            }
        }, 3000);
    }
}

function stopSpeaking() {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
    if (voiceIndicator) {
        voiceIndicator.classList.add('hidden');
    }
}

// Emergency analysis functions
function analyzeEmergencyInput(input) {
    input = input.toLowerCase();
    
    // Simple keyword detection
    if (input.includes('chest') && (input.includes('pain') || input.includes('pressure'))) {
        return {
            type: 'chest_pain',
            displayName: 'Chest Pain & Possible Heart Issue',
            severity: 'severe',
            stepCount: 6
        };
    } else if (input.includes('breath') || input.includes('choking') || input.includes('asthma')) {
        return {
            type: 'breathing_difficulty',
            displayName: 'Breathing Difficulty',
            severity: input.includes('severe') || input.includes('cannot breathe') ? 'severe' : 'moderate',
            stepCount: 6
        };
    } else if (input.includes('bleed') || input.includes('blood') || input.includes('cut')) {
        return {
            type: 'bleeding',
            displayName: 'Bleeding Injury',
            severity: input.includes('heavy') || input.includes('lot of blood') ? 'severe' : 'moderate',
            stepCount: 6
        };
    } else if (input.includes('unconscious') || input.includes('not responding') || input.includes('passed out')) {
        return {
            type: 'unconscious',
            displayName: 'Unconscious Person',
            severity: 'severe',
            stepCount: 6
        };
    } else if (input.includes('burn') || input.includes('fire') || input.includes('scald')) {
        return {
            type: 'burn',
            displayName: 'Burn Injury',
            severity: input.includes('severe') || input.includes('third degree') ? 'severe' : 'moderate',
            stepCount: 6
        };
    } else {
        // Default general emergency
        return {
            type: 'general',
            displayName: 'Medical Emergency',
            severity: 'moderate',
            stepCount: 4
        };
    }
}

// Storage functions
function saveEmergencyData(data) {
    try {
        sessionStorage.setItem('emergencyData', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Failed to save emergency data:', e);
        return false;
    }
}

function getEmergencyData() {
    try {
        const data = sessionStorage.getItem('emergencyData');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to get emergency data:', e);
        return null;
    }
}

function clearEmergencyData() {
    sessionStorage.removeItem('emergencyData');
}

// Location functions
function getUserLocation() {
    return new Promise((resolve) => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
            resolve({ lat: null, lon: null, address: "Location access not available" });
            return;
        }
        
        // Try to get location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // For demo, we'll use a mock address
                // In production, you would reverse geocode here
                const address = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
                
                resolve({ lat, lon, address });
            },
            (error) => {
                console.log("Geolocation error:", error);
                // Return mock location for demo
                resolve({ 
                    lat: 40.7128, 
                    lon: -74.0060, 
                    address: "New York City Area (Demo Location)" 
                });
            },
            { timeout: 10000, maximumAge: 60000 }
        );
    });
}

// Country detection (simplified)
function detectCountry() {
    // This is a simplified version
    // In production, you would use IP geolocation or ask the user
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (timezone.includes("America")) return "US";
    if (timezone.includes("Europe/London")) return "UK";
    if (timezone.includes("Asia/Karachi")) return "Pakistan";
    if (timezone.includes("Asia/Calcutta")) return "India";
    
    return "US"; // Default
}

// Emergency number functions
function getEmergencyNumber(countryCode) {
    return emergencyNumbers[countryCode] || '911';
}

function showEmergencyNumbers() {
    let numbersText = "International Emergency Numbers:\n\n";
    for (const [country, number] of Object.entries(emergencyNumbers)) {
        numbersText += `${country}: ${number}\n`;
    }
    
    alert(numbersText);
    
    // Speak the numbers
    speakMessage("Showing international emergency numbers. The most common is 911 for United States and Canada, 112 for Europe, and 999 for United Kingdom.");
}

// Format timestamp
function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initCommonElements();
});
