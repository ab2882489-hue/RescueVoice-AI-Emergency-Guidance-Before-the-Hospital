// guidance.js - AI guidance page specific JavaScript

let currentStepIndex = 0;
let guidanceSteps = [];
let emergencyData = null;

function initGuidancePage() {
    console.log('Initializing guidance page...');
    
    // Get DOM elements
    const repeatStepBtn = document.getElementById('repeatStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const severeActionBtn = document.getElementById('severeActionBtn');
    const languageSelector = document.getElementById('languageSelector');
    
    // Initialize language selector
    if (languageSelector) {
        languageSelector.value = getLanguage();
    }
    
    // Set up event listeners
    if (repeatStepBtn) {
        repeatStepBtn.addEventListener('click', repeatCurrentStep);
    }
    
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', nextStep);
    }
    
    if (severeActionBtn) {
        severeActionBtn.addEventListener('click', triggerSevereEmergency);
    }
    
    // Add emergency numbers button handler
    const emergencyNumbersBtn = document.getElementById('emergencyNumbersBtn');
    if (emergencyNumbersBtn) {
        emergencyNumbersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyNumbers();
        });
    }
    
    console.log('Guidance page initialized');
}

function loadEmergencyData() {
    // Get emergency data from storage
    emergencyData = getEmergencyData();
    
    if (!emergencyData) {
        // No emergency data found, redirect to input page
        console.warn('No emergency data found, redirecting to input page');
        window.location.href = 'emergency.html';
        return;
    }
    
    // Update UI with emergency data
    const conditionTitle = document.getElementById('conditionTitle');
    const severityBadge = document.getElementById('severityBadge');
    
    if (conditionTitle) {
        conditionTitle.textContent = emergencyData.displayName;
    }
    
    if (severityBadge) {
        severityBadge.textContent = emergencyData.severity.toUpperCase() + ' EMERGENCY';
        severityBadge.className = 'severity-badge ';
        
        if (emergencyData.severity === 'mild') {
            severityBadge.classList.add('severity-mild');
        } else if (emergencyData.severity === 'moderate') {
            severityBadge.classList.add('severity-moderate');
        } else {
            severityBadge.classList.add('severity-severe');
        }
    }
    
    // Load appropriate guidance steps
    loadGuidanceSteps();
    
    return emergencyData;
}

function loadGuidanceSteps() {
    if (!emergencyData) return;
    
    // Get steps for this emergency type
    const steps = guidanceSteps[emergencyData.type] || guidanceSteps.chest_pain;
    guidanceSteps = steps;
    currentStepIndex = 0;
    
    // Update UI
    const currentStepEl = document.getElementById('currentStep');
    const totalStepsEl = document.getElementById('totalSteps');
    const progressFill = document.getElementById('progressFill');
    const stepContainer = document.getElementById('stepContainer');
    
    if (currentStepEl) currentStepEl.textContent = '1';
    if (totalStepsEl) totalStepsEl.textContent = steps.length;
    if (progressFill) progressFill.style.width = `${(1 / steps.length) * 100}%`;
    
    // Load first step
    loadCurrentStep();
    
    return steps;
}

function loadCurrentStep() {
    if (!guidanceSteps.length || currentStepIndex >= guidanceSteps.length) return;
    
    const step = guidanceSteps[currentStepIndex];
    
    // Update progress
    const currentStepEl = document.getElementById('currentStep');
    const progressFill = document.getElementById('progressFill');
    const stepContainer = document.getElementById('stepContainer');
    
    if (currentStepEl) currentStepEl.textContent = currentStepIndex + 1;
    if (progressFill) {
        progressFill.style.width = `${((currentStepIndex + 1) / guidanceSteps.length) * 100}%`;
    }
    
    // Create step HTML
    if (stepContainer) {
        stepContainer.innerHTML = `
            <div class="step-header">
                <div class="step-number">${currentStepIndex + 1}</div>
                <div class="step-title">${step.title}</div>
            </div>
            <div class="step-content">
                ${step.content}
            </div>
        `;
    }
    
    return step;
}

function speakCurrentStep() {
    if (!guidanceSteps.length || currentStepIndex >= guidanceSteps.length) return;
    
    const step = guidanceSteps[currentStepIndex];
    speakMessage(`Step ${currentStepIndex + 1}: ${step.title}. ${step.content}`);
}

function nextStep() {
    if (currentStepIndex < guidanceSteps.length - 1) {
        currentStepIndex++;
        loadCurrentStep();
        speakCurrentStep();
    } else {
        // All steps completed
        if (emergencyData && emergencyData.severity === 'severe') {
            // For severe emergencies, suggest going to nearby help
            speakMessage("All steps completed. For severe emergencies, you should now proceed to the nearest hospital immediately. Redirecting to nearby help.");
            setTimeout(() => {
                window.location.href = 'nearby.html';
            }, 3000);
        } else {
            speakMessage("All steps completed. Please monitor the situation and seek medical attention if symptoms persist or worsen.");
            
            // Disable next button
            const nextStepBtn = document.getElementById('nextStepBtn');
            if (nextStepBtn) {
                nextStepBtn.disabled = true;
                nextStepBtn.textContent = 'All Steps Completed';
            }
        }
    }
}

function repeatCurrentStep() {
    speakCurrentStep();
}

function triggerSevereEmergency() {
    if (emergencyData && emergencyData.severity === 'severe') {
        // Save severe flag
        if (emergencyData) {
            emergencyData.isSevere = true;
            saveEmergencyData(emergencyData);
        }
        
        // Redirect to severe emergency page
        window.location.href = 'severe.html';
    } else {
        speakMessage("This emergency is not classified as severe. If the situation worsens, you can manually trigger severe emergency help.");
    }
}

// Export for use in HTML
window.initGuidancePage = initGuidancePage;
window.loadEmergencyData = loadEmergencyData;
window.repeatCurrentStep = repeatCurrentStep;
window.nextStep = nextStep;
window.triggerSevereEmergency = triggerSevereEmergency;
