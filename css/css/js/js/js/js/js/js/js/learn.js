// learn.js - Learn First Aid page specific JavaScript

function initLearnPage() {
    console.log('Initializing learn first aid page...');
    
    // Get DOM elements
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    const languageSelector = document.getElementById('languageSelector');
    
    // Initialize language selector
    if (languageSelector) {
        languageSelector.value = getLanguage();
    }
    
    // Set up event listeners for learn more buttons
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            showFirstAidDetails(topic);
        });
    });
    
    // Add emergency numbers button handler
    const emergencyNumbersBtn = document.getElementById('emergencyNumbersBtn');
    if (emergencyNumbersBtn) {
        emergencyNumbersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyNumbers();
        });
    }
    
    console.log('Learn first aid page initialized');
}

function showFirstAidDetails(topic) {
    const details = {
        'cpr': {
            title: "CPR (Cardiopulmonary Resuscitation)",
            steps: [
                "1. Check responsiveness: Tap shoulder and shout 'Are you okay?'",
                "2. Call emergency services: If no response, call 911 or local emergency number",
                "3. Check breathing: Look for chest movement, listen for breath",
                "4. Begin compressions: Place heel of hand on center of chest, other hand on top",
                "5. Compress: Push hard and fast (2 inches deep, 100-120 compressions per minute)",
                "6. Give rescue breaths: Tilt head back, pinch nose, give 2 breaths (1 second each)",
                "7. Continue: 30 compressions then 2 breaths until help arrives or person recovers"
            ],
            notes: "For adults only. Child and infant CPR differs."
        },
        'bleeding': {
            title: "Bleeding Control",
            steps: [
                "1. Apply direct pressure: Use clean cloth or bandage directly on wound",
                "2. Elevate: Raise injured area above heart level if possible",
                "3. Add layers: If blood soaks through, add more cloth (don't remove)",
                "4. Pressure points: For severe bleeding, press artery between wound and heart",
                "5. Tourniquet: For life-threatening limb bleeding, apply 2-3 inches above wound",
                "6. Stay with person: Keep them calm, lying down, and warm",
                "7. Seek medical help: Even if bleeding stops, professional care is needed"
            ],
            notes: "Tourniquets should only be used for life-threatening bleeding."
        },
        'stroke': {
            title: "Stroke Recognition (FAST)",
            steps: [
                "F - Face drooping: Ask person to smile. Is one side drooping?",
                "A - Arm weakness: Ask person to raise both arms. Does one drift downward?",
                "S - Speech difficulty: Ask person to repeat a simple sentence. Is speech slurred or strange?",
                "T - Time to call emergency: If any of these signs are present, call emergency services immediately",
                "Note time: When symptoms first appeared (critical for treatment)",
                "Keep comfortable: Help person lie down with head slightly elevated",
                "Don't give anything: No food, drink, or medication"
            ],
            notes: "Every minute counts. Treatment is most effective within 3 hours."
        },
        'allergy': {
            title: "Severe Allergic Reaction (Anaphylaxis)",
            steps: [
                "1. Recognize symptoms: Difficulty breathing, swelling, hives, dizziness",
                "2. Use epinephrine auto-injector (EpiPen) if available",
                "3. Call emergency services immediately",
                "4. Help person lie down with legs elevated (unless breathing is difficult)",
                "5. Loosen tight clothing, cover with blanket",
                "6. Monitor breathing and consciousness",
                "7. Give second dose if symptoms return and medical help not arrived"
            ],
            notes: "Even if symptoms improve, hospital evaluation is necessary."
        }
    };
    
    const detail = details[topic] || details['cpr'];
    
    // Create and show modal or alert with details
    const detailText = `${detail.title}\n\nSteps:\n${detail.steps.join('\n')}\n\n${detail.notes}`;
    
    alert(detailText);
    
    // Speak summary
    speakMessage(`First aid for ${detail.title}. ${detail.steps[0]}. Remember to call emergency services first in serious situations.`);
}

// Export for use in HTML
window.initLearnPage = initLearnPage;
window.showFirstAidDetails = showFirstAidDetails;
