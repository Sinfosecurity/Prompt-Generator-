// State Management
const appState = {
    currentStep: 1,
    totalSteps: 6,
    data: {
        appType: '',
        customAppType: '',
        targetUsers: '',
        customTargetUsers: '',
        problemStatement: '',
        inputTypes: [],
        customInputType: '',
        outputTypes: [],
        colorScheme: '',
        visualStyle: '',
        tone: '',
        platform: ''
    },
    selectedBuilder: 'universal'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initializeWizard();
    updateProgressBar();
});

// Initialize Wizard
function initializeWizard() {
    // Step 1: App Type handlers
    const appTypeCards = document.querySelectorAll('[data-step="1"] .option-card');
    appTypeCards.forEach(card => {
        card.addEventListener('click', () => handleSingleSelect(card, appTypeCards, 'appType'));
    });

    // Step 2: Target Users handlers
    const targetUsersCards = document.querySelectorAll('[data-step="2"] .option-card');
    targetUsersCards.forEach(card => {
        card.addEventListener('click', () => handleSingleSelect(card, targetUsersCards, 'targetUsers'));
    });

    // Step 3: Problem Statement handler
    const problemStatement = document.getElementById('problemStatement');
    problemStatement.addEventListener('input', (e) => {
        appState.data.problemStatement = e.target.value;
        validateProblemStatement(e.target.value);
    });

    // Step 4: Input Types handlers (multi-select)
    const inputTypeCards = document.querySelectorAll('[data-step="4"] .option-card');
    inputTypeCards.forEach(card => {
        card.addEventListener('click', () => handleMultiSelect(card, 'inputTypes'));
    });

    // Step 5: Output Types handlers (multi-select)
    const outputTypeCards = document.querySelectorAll('[data-step="5"] .option-card');
    outputTypeCards.forEach(card => {
        card.addEventListener('click', () => handleMultiSelect(card, 'outputTypes'));
    });

    // Step 6: Design handlers
    document.getElementById('colorScheme').addEventListener('input', (e) => {
        appState.data.colorScheme = e.target.value;
    });

    document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.data.visualStyle = e.target.value;
        });
    });

    document.querySelectorAll('input[name="tone"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.data.tone = e.target.value;
        });
    });

    document.querySelectorAll('input[name="platform"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.data.platform = e.target.value;
        });
    });

    // Navigation handlers
    document.getElementById('prevBtn').addEventListener('click', previousStep);
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('generateBtn').addEventListener('click', generatePrompt);

    // Builder selector handlers
    document.querySelectorAll('.builder-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.builder-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            appState.selectedBuilder = e.target.dataset.builder;
            updatePromptOutput();
        });
    });

    // Copy handlers
    document.getElementById('copyPlainBtn').addEventListener('click', () => copyPrompt('plain'));
    document.getElementById('copyMarkdownBtn').addEventListener('click', () => copyPrompt('markdown'));
    document.getElementById('startOverBtn').addEventListener('click', startOver);
}

// Single Select Handler
function handleSingleSelect(selectedCard, allCards, dataKey) {
    allCards.forEach(card => card.classList.remove('selected'));
    selectedCard.classList.add('selected');
    
    const value = selectedCard.dataset.value;
    appState.data[dataKey] = value;

    // Handle custom input
    const customInputId = dataKey === 'appType' ? 'customAppType' : 'customTargetUsers';
    const customContainer = document.getElementById(customInputId);
    const customInput = document.getElementById(`${customInputId}Input`);

    if (value === 'custom' || value === 'niche') {
        customContainer.classList.remove('hidden');
        customInput.addEventListener('input', (e) => {
            const customKey = dataKey === 'appType' ? 'customAppType' : 'customTargetUsers';
            appState.data[customKey] = e.target.value;
        });
    } else {
        customContainer.classList.add('hidden');
        const customKey = dataKey === 'appType' ? 'customAppType' : 'customTargetUsers';
        appState.data[customKey] = '';
    }
}

// Multi Select Handler
function handleMultiSelect(card, dataKey) {
    card.classList.toggle('selected');
    const value = card.dataset.value;
    
    if (card.classList.contains('selected')) {
        if (!appState.data[dataKey].includes(value)) {
            appState.data[dataKey].push(value);
        }
        card.querySelector('.checkmark').classList.remove('hidden');
    } else {
        appState.data[dataKey] = appState.data[dataKey].filter(v => v !== value);
        card.querySelector('.checkmark').classList.add('hidden');
    }

    // Handle custom input for inputTypes
    if (dataKey === 'inputTypes') {
        const customContainer = document.getElementById('customInputType');
        const customInput = document.getElementById('customInputTypeInput');
        
        if (appState.data[dataKey].includes('custom-input')) {
            customContainer.classList.remove('hidden');
            customInput.addEventListener('input', (e) => {
                appState.data.customInputType = e.target.value;
            });
        } else {
            customContainer.classList.add('hidden');
            appState.data.customInputType = '';
        }
    }
}

// Validate Problem Statement
function validateProblemStatement(value) {
    const hint = document.getElementById('problemHint');
    if (value.length > 0 && value.length < 20) {
        hint.classList.remove('hidden');
    } else {
        hint.classList.add('hidden');
    }
}

// Navigation
function nextStep() {
    if (validateCurrentStep()) {
        if (appState.currentStep < appState.totalSteps) {
            appState.currentStep++;
            updateWizardDisplay();
            updateProgressBar();
        }
    }
}

function previousStep() {
    if (appState.currentStep > 1) {
        appState.currentStep--;
        updateWizardDisplay();
        updateProgressBar();
    }
}

// Validate Current Step
function validateCurrentStep() {
    const step = appState.currentStep;
    
    switch(step) {
        case 1:
            if (!appState.data.appType) {
                alert('Please select an app type');
                return false;
            }
            if ((appState.data.appType === 'custom') && !appState.data.customAppType) {
                alert('Please describe your app type');
                return false;
            }
            return true;
        case 2:
            if (!appState.data.targetUsers) {
                alert('Please select your target users');
                return false;
            }
            if ((appState.data.targetUsers === 'niche') && !appState.data.customTargetUsers) {
                alert('Please describe your specific niche');
                return false;
            }
            return true;
        case 3:
            if (!appState.data.problemStatement || appState.data.problemStatement.length < 20) {
                alert('Please provide a clear problem statement (at least 20 characters)');
                return false;
            }
            return true;
        case 4:
            if (appState.data.inputTypes.length === 0) {
                alert('Please select at least one input type');
                return false;
            }
            if (appState.data.inputTypes.includes('custom-input') && !appState.data.customInputType) {
                alert('Please describe your custom input type');
                return false;
            }
            return true;
        case 5:
            if (appState.data.outputTypes.length === 0) {
                alert('Please select at least one output type');
                return false;
            }
            return true;
        case 6:
            // Optional fields, no strict validation
            return true;
        default:
            return true;
    }
}

// Update Wizard Display
function updateWizardDisplay() {
    // Update steps
    document.querySelectorAll('.wizard-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === appState.currentStep);
    });

    // Update progress steps
    document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
        const stepNum = index + 1;
        if (stepNum < appState.currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNum === appState.currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');

    prevBtn.style.visibility = appState.currentStep === 1 ? 'hidden' : 'visible';
    
    if (appState.currentStep === appState.totalSteps) {
        nextBtn.classList.add('hidden');
        generateBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        generateBtn.classList.add('hidden');
    }
}

// Update Progress Bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const percentage = (appState.currentStep / appState.totalSteps) * 100;
    progressBar.style.setProperty('--progress', `${percentage}%`);
    progressBar.querySelector('::before') || (progressBar.style.cssText = `&::before { width: ${percentage}% }`);
    
    // Update CSS custom property
    const style = document.createElement('style');
    style.textContent = `.progress-bar::before { width: ${percentage}% !important; }`;
    document.head.appendChild(style);
}

// Generate Prompt
function generatePrompt() {
    if (!validateCurrentStep()) return;
    
    // Hide wizard, show results
    document.querySelector('.wizard-container').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    
    updatePromptOutput();
    
    // Scroll to results
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
}

// Update Prompt Output
function updatePromptOutput() {
    const prompt = buildPrompt(appState.selectedBuilder);
    document.getElementById('promptOutput').textContent = prompt;
}

// Build Prompt based on builder
function buildPrompt(builder) {
    const data = appState.data;
    
    // Get display values
    const appType = data.appType === 'custom' ? data.customAppType : formatValue(data.appType);
    const targetUsers = data.targetUsers === 'niche' ? data.customTargetUsers : formatValue(data.targetUsers);
    const inputTypesList = formatList(data.inputTypes, data.customInputType);
    const outputTypesList = formatList(data.outputTypes, '');
    
    // Set defaults for optional fields
    const colorScheme = data.colorScheme || 'Clean and modern (choose appropriate colors)';
    const visualStyle = data.visualStyle || 'clean and modern';
    const tone = data.tone || 'professional and friendly';
    const platform = data.platform || 'responsive (desktop and mobile)';

    let prompt = '';

    // Builder-specific introductions
    if (builder === 'cursor') {
        prompt += '# Cursor Instructions\n\n';
        prompt += 'Build a complete, production-ready web application based on the following specifications.\n';
        prompt += 'Use modern web technologies (HTML5, CSS3, vanilla JavaScript or React if needed).\n';
        prompt += 'Ensure the code is clean, well-structured, and fully functional.\n\n';
    } else if (builder === 'antigravity') {
        prompt += '# Antigravity App Specification\n\n';
        prompt += 'Create a fully functional web application with the following requirements.\n';
        prompt += 'The application should be complete and ready to deploy.\n\n';
    } else if (builder === 'v0') {
        prompt += '# v0 Component Specification\n\n';
        prompt += 'Design and build a modern web application using React and Tailwind CSS.\n';
        prompt += 'Focus on clean UI/UX and component reusability.\n\n';
    } else {
        prompt += '# AI-Ready Web Application Prompt\n\n';
        prompt += 'This prompt is designed to work with any AI builder (Cursor, Antigravity, v0, etc.).\n';
        prompt += 'It contains all necessary information to build the application without follow-up questions.\n\n';
    }

    prompt += '---\n\n';
    prompt += '## 1. APPLICATION PURPOSE\n\n';
    prompt += `**App Type:** ${appType}\n\n`;
    prompt += `**Primary Goal:** ${data.problemStatement}\n\n`;
    prompt += `**Target Users:** ${targetUsers}\n\n`;
    prompt += `**Success Criteria:**\n`;
    prompt += `- Users can complete their task with minimal friction\n`;
    prompt += `- The interface is intuitive and requires no technical knowledge\n`;
    prompt += `- Results are delivered clearly and actionably\n`;
    prompt += `- The app handles edge cases gracefully\n\n`;

    prompt += '---\n\n';
    prompt += '## 2. INPUT REQUIREMENTS\n\n';
    prompt += `**User will provide:**\n${inputTypesList}\n\n`;
    prompt += `**Input Validation:**\n`;
    prompt += `- All required fields must be validated before processing\n`;
    prompt += `- Provide clear, helpful error messages for invalid inputs\n`;
    prompt += `- Use appropriate input types (text, number, file upload, etc.)\n`;
    prompt += `- Show inline validation feedback as users type\n`;
    prompt += `- Never accept empty or malformed inputs\n\n`;

    prompt += '---\n\n';
    prompt += '## 3. OUTPUT SPECIFICATION\n\n';
    prompt += `**After submission, display:**\n${outputTypesList}\n\n`;
    prompt += `**Output Requirements:**\n`;
    prompt += `- Results must be clear, scannable, and actionable\n`;
    prompt += `- Use visual hierarchy to emphasize key information\n`;
    prompt += `- Provide a "what to do next" section\n`;
    prompt += `- Include a way to copy, download, or share results\n`;
    prompt += `- If generating text, use proper formatting (headings, lists, spacing)\n\n`;

    prompt += '---\n\n';
    prompt += '## 4. USER FLOW\n\n';
    prompt += `1. **Landing:** User sees clear headline explaining what the app does\n`;
    prompt += `2. **Input:** User provides required information through well-labeled form fields\n`;
    prompt += `3. **Validation:** System validates inputs and shows helpful error messages if needed\n`;
    prompt += `4. **Processing:** Clear loading state while processing (if applicable)\n`;
    prompt += `5. **Results:** Display output in organized, readable format\n`;
    prompt += `6. **Action:** User can copy/download results or start over\n\n`;
    prompt += `**Important:** Guide users step by step. No jargon. No confusion.\n\n`;

    prompt += '---\n\n';
    prompt += '## 5. DESIGN & UX REQUIREMENTS\n\n';
    prompt += `**Color Scheme:** ${colorScheme}\n\n`;
    prompt += `**Visual Style:** ${visualStyle}\n\n`;
    prompt += `**Tone:** ${tone}\n\n`;
    prompt += `**Platform Focus:** ${platform}\n\n`;
    prompt += `**Design Principles:**\n`;
    prompt += `- Minimal, distraction-free interface\n`;
    prompt += `- Clear visual hierarchy\n`;
    prompt += `- Generous white space\n`;
    prompt += `- Readable typography (16px minimum for body text)\n`;
    prompt += `- High contrast for accessibility\n`;
    prompt += `- Mobile-responsive design\n`;
    prompt += `- No login or account required\n`;
    prompt += `- Fast load times\n\n`;

    prompt += '---\n\n';
    prompt += '## 6. TECHNICAL REQUIREMENTS\n\n';
    prompt += `- Use semantic HTML5\n`;
    prompt += `- Modern CSS (Flexbox/Grid for layout)\n`;
    prompt += `- Vanilla JavaScript or React (choose based on complexity)\n`;
    prompt += `- No unnecessary dependencies\n`;
    prompt += `- Works in all modern browsers\n`;
    prompt += `- Responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)\n`;
    prompt += `- Keyboard accessible\n`;
    prompt += `- Fast performance (optimized assets, minimal reflows)\n\n`;

    prompt += '---\n\n';
    prompt += '## 7. EDGE CASES & SAFEGUARDS\n\n';
    prompt += `- Handle empty inputs gracefully\n`;
    prompt += `- Validate all user inputs before processing\n`;
    prompt += `- Show appropriate error messages (never generic "Error" messages)\n`;
    prompt += `- Prevent form resubmission\n`;
    prompt += `- Handle loading/processing states\n`;
    prompt += `- Provide fallback content if something fails\n`;
    prompt += `- Set sensible defaults where possible\n`;
    prompt += `- Make assumptions explicit when needed\n\n`;

    prompt += '---\n\n';
    prompt += '## 8. WHAT TO BUILD (EXPLICIT DELIVERABLES)\n\n';
    prompt += `Build a complete, single-page web application that includes:\n\n`;
    prompt += `1. **HTML file** with proper structure and semantic markup\n`;
    prompt += `2. **CSS file** with all styles (no inline styles)\n`;
    prompt += `3. **JavaScript file** with all functionality\n`;
    prompt += `4. Clear, prominent headline explaining the app's purpose\n`;
    prompt += `5. Input form with proper labels and validation\n`;
    prompt += `6. Submit button with clear call-to-action text\n`;
    prompt += `7. Results section with formatted output\n`;
    prompt += `8. Copy/download functionality for results\n`;
    prompt += `9. "Start over" or "Reset" button\n`;
    prompt += `10. Responsive layout that works on all devices\n\n`;

    prompt += '---\n\n';
    prompt += '## 9. CONSTRAINTS & RULES\n\n';
    prompt += `- This prompt is complete and self-contained\n`;
    prompt += `- Do not ask follow-up questions\n`;
    prompt += `- Make reasonable assumptions where details are not specified\n`;
    prompt += `- Prioritize clarity and usability over feature complexity\n`;
    prompt += `- The app must be fully functional, not a prototype\n`;
    prompt += `- No authentication or backend required (unless explicitly needed)\n`;
    prompt += `- Keep the interface clean and minimal\n`;
    prompt += `- Every feature must serve the core user goal\n\n`;

    prompt += '---\n\n';
    prompt += '## 10. FINAL INSTRUCTION\n\n';
    prompt += `Build this application now. Make it production-ready, beautiful, and functional.\n`;
    prompt += `Do not return partial code or placeholders. Complete the entire implementation.\n`;

    return prompt;
}

// Helper Functions
function formatValue(value) {
    return value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatList(items, customItem) {
    let result = '';
    items.forEach(item => {
        if (item === 'custom-input' && customItem) {
            result += `- ${customItem}\n`;
        } else if (item !== 'custom-input') {
            result += `- ${formatValue(item)}\n`;
        }
    });
    return result || '- (Not specified)\n';
}

// Copy Prompt
function copyPrompt(format) {
    const promptText = document.getElementById('promptOutput').textContent;
    let textToCopy = promptText;
    
    if (format === 'markdown') {
        textToCopy = '```markdown\n' + promptText + '\n```';
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showCopyFeedback();
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard. Please select and copy manually.');
    });
}

function showCopyFeedback() {
    const feedback = document.getElementById('copyFeedback');
    feedback.classList.remove('hidden');
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 3000);
}

// Start Over
function startOver() {
    // Reset state
    appState.currentStep = 1;
    appState.data = {
        appType: '',
        customAppType: '',
        targetUsers: '',
        customTargetUsers: '',
        problemStatement: '',
        inputTypes: [],
        customInputType: '',
        outputTypes: [],
        colorScheme: '',
        visualStyle: '',
        tone: '',
        platform: ''
    };
    appState.selectedBuilder = 'universal';
    
    // Reset UI
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
        const checkmark = card.querySelector('.checkmark');
        if (checkmark) checkmark.classList.add('hidden');
    });
    
    document.getElementById('problemStatement').value = '';
    document.getElementById('colorScheme').value = '';
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    
    // Show wizard, hide results
    document.querySelector('.wizard-container').classList.remove('hidden');
    document.getElementById('resultsContainer').classList.add('hidden');
    
    // Reset progress
    updateWizardDisplay();
    updateProgressBar();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
