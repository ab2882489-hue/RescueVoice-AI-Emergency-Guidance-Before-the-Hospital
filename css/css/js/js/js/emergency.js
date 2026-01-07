// emergency.js - Emergency input page specific JavaScript

let voiceRecognitionActive = false;
let transcript = '';

function initEmergencyPage() {
    console.log('Initializing emergency input page...');
    
    // Get DOM elements
    const micButton = document.getElementById('micButton');
    const transcriptContainer = document.getElementById('transcriptContainer');
    const transcriptText = document.getElementById('transcriptText');
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const languageSelector = document.getElementById('languageSelector');
    
    // Initialize language selector
    if (languageSelector) {
        languageSelector.value = getLanguage();
    }
    
    // Set up microphone button
    if (micButton) {
        micButton.addEventListener('click', toggleVoiceRecognition);
    }
    
    // Set up analyze button
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', processEmergencyInput);
    }
    
    // Set up text input
    if (textInput) {
        textInput.addEventListener('input', function() {
            transcript = textInput.value;
            if (transcript.trim()) {
                transcriptContainer.classList.remove('hidden');
                transcriptText.textContent = transcript;
            } else {
                transcriptContainer.classList.add('hidden');
            }
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
    
    console.log('Emergency input page initialized');
}

function toggleVoiceRecognition() {
    const micButton = document.getElementById('micButton');
    const transcriptContainer = document.getElementById('transcriptContainer');
    const transcriptText = document.getElementById('transcriptText');
    
    if (!voiceRecognitionActive) {
        startVoiceRecognition(micButton, transcriptContainer, transcriptText);
    } else {
        stopVoiceRecognition(micButton);
    }
    voiceRecognitionActive = !voiceRecognitionActive;
}

function startVoiceRecognition(micButton, transcriptContainer, transcriptText) {
    // Show active state
    micButton.classList.add('active');
    micButton.innerHTML = '<i class="fas fa-stop"></i>';
    
    // Simulate voice recognition (in a real app, use Web Speech API)
    const sampleTranscripts = {
        en: "My father is having severe chest pain and difficulty breathing",
        ur: "میرے والد کو سینے میں شدید درد ہے اور سانس لینے میں دشواری ہو رہی ہے",
        'ur-roman': "Mere walid ko seenay mein shadeed dard hai aur saans lenay mein dushwari ho rahi hai"
    };
    
    const currentLang = getLanguage();
    const sampleText = sampleTranscripts[currentLang] || sampleTranscripts.en;
    
    // Simulate listening for 3 seconds
    setTimeout(() => {
        transcript = sampleText;
        
        // Update UI with transcript
        transcriptContainer.classList.remove('hidden');
        transcriptText.textContent = transcript;
        
        // Stop listening
        micButton.classList.remove('active');
        micButton.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceRecognitionActive = false;
        
        // Speak confirmation
        speakMessage("I understand. You said: " + transcript.substring(0, 50) + "... Analyzing the situation now.");
    }, 3000);
}

function stopVoiceRecognition(micButton) {
    if (micButton) {
        micButton.classList.remove('active');
        micButton.innerHTML = '<i class="fas fa-microphone"></i>';
    }
    voiceRecognitionActive = false;
}

function processEmergencyInput() {
    // Get input from either voice transcript or text input
    let userInput = '';
    const textInput = document.getElementById('textInput');
    
    if (transcript && transcript.trim()) {
        userInput = transcript;
    } else if (textInput && textInput.value.trim()) {
        userInput = textInput.value;
    } else {
        alert('Please describe the emergency by speaking or typing.');
        return;
    }
    
    // Analyze the input
    const analysis = analyzeEmergencyInput(userInput);
    
    // Save emergency data
    const emergencyData = {
        type: analysis.type,
        displayName: analysis.displayName,
        severity: analysis.severity,
        stepCount: analysis.stepCount,
        userInput: userInput,
        timestamp: getCurrentTimestamp()
    };
    
    const saved = saveEmergencyData(emergencyData);
    
    if (saved) {
        // Speak confirmation
        speakMessage(`I've analyzed your situation. This appears to be ${analysis.severity} level. Redirecting to guidance page.`);
        
        // Redirect to guidance page after a delay
        setTimeout(() => {
            window.location.href = 'guidance.html';
        }, 2000);
    } else {
        alert('Error saving emergency data. Please try again.');
    }
}

// Export for use in HTML
window.initEmergencyPage = initEmergencyPage;
window.toggleVoiceRecognition = toggleVoiceRecognition;
window.processEmergencyInput = processEmergencyInput;
