/* =============================================
   CLICK INTERFACE JAVASCRIPT
   ============================================= */

let currentStep = 1;
const totalSteps = 4;
let formData = {
    industry: '',
    businessSize: '',
    goals: [],
    contact: {}
};

// Initialize the click interface
function initializeClickInterface() {
    console.log('🔧 Initializing Click Interface...');

    // Reset form state
    currentStep = 1;
    formData = {
        industry: '',
        businessSize: '',
        goals: [],
        contact: {}
    };

    // Setup event listeners
    setupDropdownInteractions();
    setupSizeCardInteractions();
    setupGoalInteractions();
    setupFormValidation();
    setupNavigation();

    // Update UI
    updateStepIndicator();
    showCurrentStep();
}

// Dropdown Interactions
function setupDropdownInteractions() {
    const dropdowns = document.querySelectorAll('.visual-dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const options = dropdown.querySelectorAll('.option');

        trigger.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.dataset.value;
                const text = option.textContent.trim();

                // Update selected text
                const selectedText = dropdown.querySelector('.selected-text');
                selectedText.textContent = text;

                // Store value
                const field = dropdown.dataset.field;
                formData[field] = value;

                // Close dropdown
                dropdown.classList.remove('open');

                // Mark as selected
                dropdown.classList.add('selected');

                console.log(`📝 ${field} selected:`, value);
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.visual-dropdown')) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
        }
    });
}

// Size Card Interactions
function setupSizeCardInteractions() {
    const sizeCards = document.querySelectorAll('.size-card');

    sizeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            sizeCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');

            // Store value
            const value = card.dataset.value;
            formData.businessSize = value;

            console.log('📏 Business size selected:', value);
        });
    });
}

// Goal Interactions
function setupGoalInteractions() {
    const goalItems = document.querySelectorAll('.goal-item');

    goalItems.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;

            // Toggle selection
            item.classList.toggle('selected');

            // Update form data
            if (item.classList.contains('selected')) {
                if (!formData.goals.includes(value)) {
                    formData.goals.push(value);
                }
            } else {
                formData.goals = formData.goals.filter(goal => goal !== value);
            }

            console.log('🎯 Goals updated:', formData.goals);
        });
    });
}

// Form Validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const fieldGroup = field.closest('.field-group');
    let isValid = true;

    // Remove previous error state
    field.classList.remove('error');
    const existingError = fieldGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
        }
    }

    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
        }
    }

    if (!isValid) {
        field.classList.add('error');

        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = getErrorMessage(field);
        fieldGroup.appendChild(errorMessage);
    }

    return isValid;
}

function getErrorMessage(field) {
    if (!field.value.trim()) {
        return `${field.previousElementSibling.textContent} is required`;
    }

    if (field.type === 'email') {
        return 'Please enter a valid email address';
    }

    if (field.type === 'tel') {
        return 'Please enter a valid phone number';
    }

    return 'Please fill in this field';
}

// Navigation
function setupNavigation() {
    // Navigation buttons are handled by onclick in HTML
    // This function ensures they're properly set up
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepIndicator();
            showCurrentStep();
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepIndicator();
        showCurrentStep();
    }
}

function validateCurrentStep() {
    let isValid = true;

    switch (currentStep) {
        case 1:
            if (!formData.industry) {
                isValid = false;
                showStepError('Please select your industry');
            }
            break;
        case 2:
            if (!formData.businessSize) {
                isValid = false;
                showStepError('Please select your business size');
            }
            break;
        case 3:
            if (formData.goals.length === 0) {
                isValid = false;
                showStepError('Please select at least one AI priority');
            }
            break;
        case 4:
            // Validate contact fields
            const contactFields = document.querySelectorAll('.contact-fields input[required], .contact-fields select[required]');
            contactFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Collect contact data
                formData.contact = {
                    name: document.querySelector('input[placeholder="Your full name"]').value,
                    email: document.querySelector('input[type="email"]').value,
                    phone: document.querySelector('input[type="tel"]').value,
                    volume: document.querySelector('select').value,
                    brokerage: document.querySelector('input[placeholder="Your brokerage name"]').value,
                    license: document.querySelector('input[placeholder="Your real estate license #"]').value
                };
            }
            break;
    }

    return isValid;
}

function showStepError(message) {
    // Remove existing error
    const existingError = document.querySelector('.step-error');
    if (existingError) {
        existingError.remove();
    }

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'step-error';
    errorDiv.textContent = message;

    // Add to current step
    const currentStepElement = document.querySelector('.form-step.active');
    if (currentStepElement) {
        currentStepElement.appendChild(errorDiv);

        // Remove after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 3000);
    }
}

function updateStepIndicator() {
    const currentStepElement = document.querySelector('.current-step');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (currentStepElement) {
        currentStepElement.textContent = currentStep;
    }

    if (prevBtn) {
        prevBtn.disabled = currentStep === 1;
    }

    if (nextBtn) {
        if (currentStep === totalSteps) {
            nextBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit';
            nextBtn.onclick = submitForm;
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            nextBtn.onclick = nextStep;
        }
    }
}

function showCurrentStep() {
    // Hide all steps
    const allSteps = document.querySelectorAll('.form-step');
    allSteps.forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepElement) {
        setTimeout(() => {
            currentStepElement.classList.add('active');
        }, 100);
    }

    // Update step number
    const stepNumber = document.querySelector('.step-number');
    if (stepNumber) {
        stepNumber.textContent = `0${currentStep}`;
    }
}

function submitForm() {
    console.log('📤 Submitting form...');
    console.log('📊 Form data:', formData);

    // Show loading state
    const submitBtn = document.querySelector('.next-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        console.log('✅ Form submitted successfully!');

        // Show success message
        showSuccessMessage();

        // Reset form after delay
        setTimeout(() => {
            closeFormInterface();
        }, 3000);
    }, 2000);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Thank You!</h3>
        <p>Your information has been submitted successfully. We'll be in touch within 24 hours to discuss your AI transformation journey.</p>
    `;

    // Replace form content with success message
    const formContainer = document.querySelector('.click-form-container');
    formContainer.innerHTML = '';
    formContainer.appendChild(successDiv);
}

// Error message styling
const errorStyles = `
    .error {
        border-color: #ff6b6b !important;
        background: rgba(255, 107, 107, 0.1) !important;
    }

    .error-message {
        color: #ff6b6b;
        font-size: 0.85rem;
        margin-top: 5px;
        font-weight: 500;
    }

    .step-error {
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        color: #ff6b6b;
        padding: 15px;
        border-radius: 10px;
        margin-top: 20px;
        font-weight: 500;
        text-align: center;
    }

    .success-message {
        text-align: center;
        padding: 60px 40px;
        color: white;
    }

    .success-icon {
        font-size: 4rem;
        color: #00d4ff;
        margin-bottom: 20px;
    }

    .success-message h3 {
        font-family: 'Clash Display', sans-serif;
        font-size: 2rem;
        margin-bottom: 15px;
        color: #00d4ff;
    }

    .success-message p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.8);
        max-width: 500px;
        margin: 0 auto;
    }
`;

// Add error styles to document
if (!document.querySelector('#click-interface-styles')) {
    const style = document.createElement('style');
    style.id = 'click-interface-styles';
    style.textContent = errorStyles;
    document.head.appendChild(style);
}

// Global functions for HTML onclick handlers
window.nextStep = nextStep;
window.previousStep = previousStep;
