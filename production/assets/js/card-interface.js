// =============================================
// CARD INTERFACE SYSTEM - COMPLETE FILE
// =============================================

// Card Experience Interaction Handlers
function initializeCardExperience() {
    console.log('🃏 Initializing Card Experience...');
    
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const cardBack = card.querySelector('.card-back');
        
        // Click on card back to flip
        cardBack.addEventListener('click', () => {
            const cardType = card.dataset.card;
            flipCard(cardType);
        });
    });
}

function flipCard(cardType) {
    console.log(`🃏 Flipping card: ${cardType}`);
    
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    
    // Add flip animation - only to the game card container
    gameCard.classList.add('flipped');
    
    // Add sound effect (optional)
    playCardFlipSound();
    
    // Add special effects
    createCardFlipParticles(gameCard);
}

function flipCardBack(cardType) {
    console.log(`🃏 Flipping card back: ${cardType}`);
    
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    
    // Remove flip animation
    gameCard.classList.remove('flipped');
    
    // Remove selection state
    gameCard.classList.remove('selected');
    
    // Add sound effect
    playCardFlipSound();
}

function selectCard(cardType) {
    console.log(`🃏 Card selected: ${cardType}`);
    
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    
    // Prevent double-tapping on mobile
    if (gameCard.classList.contains('selected')) {
        console.log('🚫 Card already selected, preventing double selection');
        return;
    }
    
    // Play click/selection sound
    try { playCardFlipSound(); } catch (_) {}

    // Add selection state and pending animation
    gameCard.classList.add('selected', 'pending');
    
    // Provide haptic feedback on mobile devices
    if (isTouchDevice() && navigator.vibrate) {
        navigator.vibrate(50); // Short vibration for feedback
    }
    
    // Update button text to show loading
    const button = gameCard.querySelector('.btn-select');
    const originalText = button.innerHTML;
    // Persist original label on the card for later restore
    if (!gameCard.dataset.originalLabel) {
        gameCard.dataset.originalLabel = originalText;
    }
    button.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
    
    // Disable button to prevent multiple clicks
    button.disabled = true;
    button.style.pointerEvents = 'none';
    
    // Create dramatic effect
    createCardSelectionEffect(gameCard);
    
    // Show loading screen after a brief moment
    setTimeout(() => {
        showCardLoadingScreen(cardType);
    }, 600);
}

// Show loading screen between card selection and interface transition
function showCardLoadingScreen(cardType) {
    console.log(`🔄 Showing loading screen for: ${cardType}`);
    
    // Remove pending state from card
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    if (gameCard) {
        gameCard.classList.remove('pending');
    }
    
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'card-loading-screen';
    loadingScreen.id = 'cardLoadingScreen';
    
    // Get card info for personalized loading
    const cardInfo = getCardInfo(cardType);
    
    loadingScreen.innerHTML = `
        <div class="card-loading-content">
            <div class="card-loading-icon">
                <i class="${cardInfo.icon}"></i>
            </div>
            <h2 class="card-loading-title">${cardInfo.title}</h2>
            <p class="card-loading-message">${cardInfo.message}</p>
            <div class="card-loading-progress">
                <div class="card-loading-progress-bar"></div>
            </div>
            <div class="card-loading-status">Preparing your experience...</div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Prevent body scrolling while loading
    document.body.classList.add('loading-active');
    
    // Simulate loading progress with status updates
    const statusElement = loadingScreen.querySelector('.card-loading-status');
    const statusMessages = [
        'Initializing AI systems...',
        'Loading interface components...',
        'Preparing your workspace...',
        'Almost ready...'
    ];
    
    let messageIndex = 0;
    const statusInterval = setInterval(() => {
        if (messageIndex < statusMessages.length) {
            statusElement.textContent = statusMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(statusInterval);
            // Complete loading and transition to interface
            setTimeout(() => {
                completeCardLoading(cardType, loadingScreen);
            }, 800);
        }
    }, 800);
}

// Get card information for personalized loading
function getCardInfo(cardType) {
    const cardInfo = {
        click: {
            icon: 'fas fa-hand-pointer',
            title: 'Interactive Experience',
            message: 'Setting up your visual AI workflow interface with point-and-click controls.'
        },
        type: {
            icon: 'fas fa-keyboard',
            title: 'Text Experience',
            message: 'Preparing your instant messaging AI assistant for text-based communication.'
        },
        voice: {
            icon: 'fas fa-microphone',
            title: 'Voice Experience',
            message: 'Initializing your hands-free voice AI interface with real-time conversation.'
        }
    };
    
    return cardInfo[cardType] || cardInfo.click;
}

// Complete loading and transition to interface
function completeCardLoading(cardType, loadingScreen) {
    console.log(`✅ Loading complete for: ${cardType}`);
    
    // Fade out loading screen
    loadingScreen.style.transition = 'opacity 0.5s ease-out';
    loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
        // Remove loading screen
        loadingScreen.remove();
        
        // Re-enable body scrolling
        document.body.classList.remove('loading-active');
        
        // Skip the old 3-second animation and go directly to interface
        navigateToFormInterfaceDirect(cardType);
    }, 500);
}

// Direct interface navigation without old overlay system
function navigateToFormInterfaceDirect(cardType) {
    console.log(`🚀 Direct navigation to ${cardType} interface...`);
    
    // Hide original content first (blur background)
    hideOriginalContent();
    
    // Small delay to let blur effect settle, then show interface
    setTimeout(() => {
        // Restore background but keep it dimmed
        restoreBackgroundForForm();
        
        // Create and show the specific form interface
        createFormInterface(cardType);
        
        // Note: Global time tracking already started on page load
    }, 300);
}

// Form Interface Functions
function createFormInterface(cardType) {
    const formInterface = document.createElement('div');
    formInterface.className = `form-interface ${cardType}-interface`;
    formInterface.id = 'activeFormInterface';
    
    switch(cardType) {
        case 'click':
            clickFormStartTime = Date.now(); // Start tracking time for click form
            formInterface.innerHTML = createClickInterface();
            break;
        case 'type':
            formInterface.innerHTML = createTypeInterface();
            break;
        case 'voice':
            formInterface.innerHTML = createVoiceInterface();
            break;
    }
    
    document.body.appendChild(formInterface);
    
    // Disable background scrolling and interaction
    document.body.classList.add('interface-open');
    
    // Prevent background interaction by stopping event propagation
    formInterface.addEventListener('click', function(e) {
        // Only close if clicking directly on the backdrop (not on content)
        if (e.target === formInterface) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    
    // Animate interface entrance
    setTimeout(() => {
        formInterface.classList.add('interface-active');
        initializeFormInterface(cardType);
    }, 100);
}

function createClickInterface() {
    return `
        <div class="click-form-container">
            <div class="form-header">
                <div class="form-title">
                    <h2>AI Transformation Request</h2>
                </div>
                <div class="form-controls">
                    <button class="close-btn" onclick="closeFormInterface()" title="Exit to card selection">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="visual-form-grid">
                <div class="step-number">01</div>
                <!-- Step 1: Industry Selection -->
                <div class="form-step active" data-step="1">
                    <div class="step-header">
                        <h3>Select Your Industry</h3>
                    </div>
                    <div class="visual-dropdown" data-field="industry">
                        <div class="dropdown-trigger">
                            <span class="selected-text">Choose your real estate focus</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="dropdown-options">
                            <div class="option" data-value="residential-sales"><i class="fas fa-home"></i> Residential Sales</div>
                            <div class="option" data-value="commercial-real-estate"><i class="fas fa-building"></i> Commercial Real Estate</div>
                            <div class="option" data-value="property-management"><i class="fas fa-tools"></i> Property Management</div>
                            <div class="option" data-value="real-estate-investment"><i class="fas fa-chart-line"></i> Real Estate Investment</div>
                            <div class="option" data-value="luxury-real-estate"><i class="fas fa-crown"></i> Luxury Real Estate</div>
                            <div class="option" data-value="new-construction"><i class="fas fa-hammer"></i> New Construction</div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Business Size -->
                <div class="form-step" data-step="2">
                    <div class="step-header">
                        <h3>Your Real Estate Business</h3>
                    </div>
                    <div class="size-cards">
                        <div class="size-card" data-value="solo-agent">
                            <i class="fas fa-user-tie"></i>
                            <h4>Solo Agent</h4>
                            <p>Independent real estate agent</p>
                        </div>
                        <div class="size-card" data-value="small-team">
                            <i class="fas fa-users"></i>
                            <h4>Small Team</h4>
                            <p>2-10 agents</p>
                        </div>
                        <div class="size-card" data-value="brokerage">
                            <i class="fas fa-building"></i>
                            <h4>Mid-Sized Brokerage</h4>
                            <p>11-50 agents</p>
                        </div>
                        <div class="size-card" data-value="large-brokerage">
                            <i class="fas fa-city"></i>
                            <h4>Large Brokerage</h4>
                            <p>51+ agents</p>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: AI Goals -->
                <div class="form-step" data-step="3">
                    <div class="step-header">
                        <h3>Choose Your AI Agent Priorities</h3>
                        <p class="step-subcaption">Select the digital employees you want to put to work first.</p>
                    </div>
                    <div class="goals-grid">
                        <div class="goal-item" data-value="instant-lead-response">
                            <div class="goal-icon"><i class="fas fa-bolt"></i></div>
                            <div class="goal-content">
                                <h4>Instant Lead Response (FINN + LISA)</h4>
                                <p class="goal-desc">Reply quickly, qualify, auto-book showings.</p>
                            </div>
                        </div>
                        <div class="goal-item" data-value="client-communications">
                            <div class="goal-icon"><i class="fas fa-comments"></i></div>
                            <div class="goal-content">
                                <h4>Client Communications (LISA + ROSS)</h4>
                                <p class="goal-desc">Send DMs/texts/emails via voice—manage updates, reschedules, follow‑ups.</p>
                            </div>
                        </div>
                        <div class="goal-item" data-value="listing-social-optimization">
                            <div class="goal-icon"><i class="fas fa-bullhorn"></i></div>
                            <div class="goal-content">
                                <h4>Listing & Social Optimization (RESE)</h4>
                                <p class="goal-desc">Auto-generate, brand, syndicate listings and social content.</p>
                            </div>
                        </div>
                        <div class="goal-item" data-value="transaction-management">
                            <div class="goal-icon"><i class="fas fa-file-contract"></i></div>
                            <div class="goal-content">
                                <h4>Transaction Management (TESSA)</h4>
                                <p class="goal-desc">Track deadlines, prep packets, send reminders, manage deal progress.</p>
                            </div>
                        </div>
                        <div class="goal-item" data-value="follow-up-nurture-automation">
                            <div class="goal-icon"><i class="fas fa-seedling"></i></div>
                            <div class="goal-content">
                                <h4>Follow-Up & Nurture Automation (LISA + FINN)</h4>
                                <p class="goal-desc">Re-engage cold leads, post-showing touchpoints, long-term nurture.</p>
                            </div>
                        </div>
                        <div class="goal-item" data-value="voice-activated-control">
                            <div class="goal-icon"><i class="fas fa-microphone"></i></div>
                            <div class="goal-content">
                                <h4>Voice-Activated Agent Control (ROSS)</h4>
                                <p class="goal-desc">Hands-free control—add leads, send updates, schedule tasks via voice.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4: Contact Info -->
                <div class="form-step" data-step="4">
                    <div class="step-header">
                        <h3>Get Your AI Transformation Started</h3>
                        <p class="step-subcaption">Fill out the form below and we'll get back to you within 24 hours</p>
                    </div>
                    <div class="contact-fields">
                        <div class="field-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Your full name" required>
                        </div>
                        <div class="field-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="your@email.com" required>
                        </div>
                        <div class="field-group">
                            <label>Phone Number</label>
                            <input type="tel" placeholder="+1 (555) 123-4567" required>
                        </div>
                        <div class="field-group">
                            <label>Monthly Transaction Volume</label>
                            <select required>
                                <option value="">Select your volume</option>
                                <option value="1-5">1-5 transactions/month</option>
                                <option value="6-15">6-15 transactions/month</option>
                                <option value="16-30">16-30 transactions/month</option>
                                <option value="30+">30+ transactions/month</option>
                            </select>
                        </div>
                        <div class="field-group">
                            <label>Brokerage/Company</label>
                            <input type="text" placeholder="Your brokerage name" required>
                        </div>
                        <div class="field-group">
                            <label>License Number (Optional)</label>
                            <input type="text" placeholder="Your real estate license #">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-navigation">
                <button class="nav-btn prev-btn" onclick="previousStep()" disabled>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <div class="step-indicator">
                    <span class="current-step">1</span> / <span class="total-steps">4</span>
                </div>
                <button class="nav-btn next-btn" onclick="nextStep()">
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Navigation Functions
window.currentStep = 1;
const totalSteps = 4;
window.isTransitioning = false;

function nextStep() {
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
        return; // Stop if validation fails
    }
    
    if (window.currentStep < totalSteps && !window.isTransitioning) {
        window.isTransitioning = true; // Prevent multiple transitions
        // Close all open dropdowns
        closeAllDropdowns();
        
        // Get current and next step elements
        const currentStepEl = document.querySelector(`[data-step="${window.currentStep}"]`);
        const nextStepEl = document.querySelector(`[data-step="${window.currentStep + 1}"]`);
        
        if (currentStepEl && nextStepEl) {
            // Start transition
            currentStepEl.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            currentStepEl.style.opacity = '0';
            currentStepEl.style.transform = 'translateX(-30px)';
            
            // Wait for current step to fade out, then show next step
            setTimeout(() => {
                // Hide current step completely
                currentStepEl.classList.remove('active');
                currentStepEl.style.visibility = 'hidden';
                currentStepEl.style.opacity = '0';
                currentStepEl.style.transform = 'translateX(0)';
                currentStepEl.style.transition = '';
                
                // Show next step
                window.currentStep++;
                nextStepEl.classList.add('active');
                nextStepEl.style.visibility = 'visible';
                nextStepEl.style.opacity = '0';
                nextStepEl.style.transform = 'translateX(30px)';
                
                // Update navigation immediately after step change
                updateStepNavigation();
                
                // Trigger animation
                requestAnimationFrame(() => {
                    nextStepEl.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                    nextStepEl.style.opacity = '1';
                    nextStepEl.style.transform = 'translateX(0)';
                });
                
                // Clean up animation after completion
                setTimeout(() => {
                    nextStepEl.style.transform = '';
                    nextStepEl.style.transition = '';
                    window.isTransitioning = false; // Re-enable transitions
                }, 400);
            }, 300);
        } else {
            window.isTransitioning = false; // Re-enable transitions if elements not found
        }
    }
}

function previousStep() {
    if (window.currentStep > 1 && !window.isTransitioning) {
        window.isTransitioning = true; // Prevent multiple transitions
        // Close all open dropdowns
        closeAllDropdowns();
        
        // Get current and previous step elements
        const currentStepEl = document.querySelector(`[data-step="${window.currentStep}"]`);
        const prevStepEl = document.querySelector(`[data-step="${window.currentStep - 1}"]`);
        
        if (currentStepEl && prevStepEl) {
            // Start transition
            currentStepEl.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            currentStepEl.style.opacity = '0';
            currentStepEl.style.transform = 'translateX(30px)';
            
            // Wait for current step to fade out, then show previous step
            setTimeout(() => {
                // Hide current step completely
                currentStepEl.classList.remove('active');
                currentStepEl.style.visibility = 'hidden';
                currentStepEl.style.opacity = '0';
                currentStepEl.style.transform = 'translateX(0)';
                currentStepEl.style.transition = '';
                
                // Show previous step
                window.currentStep--;
                prevStepEl.classList.add('active');
                prevStepEl.style.visibility = 'visible';
                prevStepEl.style.opacity = '0';
                prevStepEl.style.transform = 'translateX(-30px)';
                
                // Update navigation immediately after step change
                updateStepNavigation();
                
                // Trigger animation
                requestAnimationFrame(() => {
                    prevStepEl.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                    prevStepEl.style.opacity = '1';
                    prevStepEl.style.transform = 'translateX(0)';
                });
                
                // Clean up animation after completion
                setTimeout(() => {
                    prevStepEl.style.transform = '';
                    prevStepEl.style.transition = '';
                    window.isTransitioning = false; // Re-enable transitions
                }, 400);
            }, 300);
        } else {
            window.isTransitioning = false; // Re-enable transitions if elements not found
        }
    }
}

function validateCurrentStep() {
    console.log('🔍 Validating step:', window.currentStep);
    
    switch(window.currentStep) {
        case 1: // Industry selection
            const dropdown = document.querySelector('.visual-dropdown[data-field="industry"]');
            if (!dropdown || !dropdown.dataset.selected) {
                showValidationError('Please select your real estate industry focus.');
                return false;
            }
            break;
            
        case 2: // Business size
            const selectedSize = document.querySelector('.size-card.selected');
            if (!selectedSize) {
                showValidationError('Please select your business size.');
                return false;
            }
            break;
            
        case 3: // AI Goals
            const selectedGoals = document.querySelectorAll('.goal-item.selected');
            if (selectedGoals.length === 0) {
                showValidationError('Please select at least one AI goal.');
                return false;
            }
            break;
            
        case 4: // Contact info
            const step4 = document.querySelector('[data-step="4"]');
            if (!step4) {
                console.error('Step 4 not found');
                return false;
            }
            
            const requiredFields = step4.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    isValid = false;
                } else {
                    field.classList.remove('invalid');
                }
            });
            
            if (!isValid) {
                showValidationError('Please fill in all required fields.');
                return false;
            }
            break;
    }
    
    return true;
}

function showValidationError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    // Insert error message at the top of the current step
    const currentStep = document.querySelector(`[data-step="${window.currentStep}"]`);
    if (currentStep) {
        currentStep.insertBefore(errorDiv, currentStep.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

function updateStepIndicator() {
    const currentStepSpan = document.querySelector('.current-step');
    const totalStepsSpan = document.querySelector('.total-steps');
    
    if (currentStepSpan) currentStepSpan.textContent = window.currentStep;
    if (totalStepsSpan) totalStepsSpan.textContent = totalSteps;
}

function updateStepNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentStepDisplay = document.querySelector('.current-step');

    // Update step indicator
    if (currentStepDisplay) {
        currentStepDisplay.textContent = window.currentStep;
    }

    // Update button states
    if (prevBtn) {
        prevBtn.disabled = window.currentStep === 1;
    }

    if (nextBtn) {
        if (window.currentStep === totalSteps) {
            nextBtn.innerHTML = 'Submit <i class="fas fa-check"></i>';
            nextBtn.onclick = submitClickForm;

            // Check if entire form is complete for submit button (without showing errors)
            const isFormComplete = checkFormCompletion();
            nextBtn.disabled = !isFormComplete;
            nextBtn.classList.toggle('form-incomplete', !isFormComplete);
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            nextBtn.onclick = nextStep;
            nextBtn.disabled = false;
            nextBtn.classList.remove('form-incomplete');
        }
    }
}

// Helper Functions
function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.visual-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
    });
}

function closeFormInterface() {
    console.log('🚪 Closing form interface...');
    
    // Remove interface-active class to trigger exit animation
    const formInterface = document.getElementById('activeFormInterface');
    if (formInterface) {
        formInterface.classList.remove('interface-active');
        
        // Wait for animation to complete, then remove
        setTimeout(() => {
            if (formInterface.parentNode) {
                formInterface.remove();
            }
            
            // Re-enable body scrolling
            document.body.classList.remove('interface-open');
            
            // Restore background elements
            restoreBackgroundAfterClose();
            
            // Reset card states
            resetCardStates();
            
            console.log('✅ Form interface closed successfully');
        }, 500);
    }
}

function restoreBackgroundAfterClose() {
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const meetSection = document.querySelector('#meet-section');
    const aiStorySection = document.querySelector('#ai-story');
    
    const elementsToRestore = [hero, navbar, footer, meetSection, aiStorySection];
    
    elementsToRestore.forEach(element => {
        if (element) {
            element.style.transition = 'filter 1s ease-out, opacity 1s ease-out';
            element.style.filter = 'blur(0px)';
            element.style.opacity = '1';
        }
    });
}

function resetCardStates() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.classList.remove('selected', 'pending', 'flipped');
        
        // Restore original button text
        const button = card.querySelector('.btn-select');
        if (button && card.dataset.originalLabel) {
            button.innerHTML = card.dataset.originalLabel;
            button.disabled = false;
            button.style.pointerEvents = 'auto';
        }
    });
}

async function initializeFormInterface(cardType) {
    console.log(`🎯 Initializing ${cardType} interface...`);
    
    switch(cardType) {
        case 'click':
            initializeClickInterface();
            break;
        case 'type':
            initializeTypeInterface();
            break;
        case 'voice':
            await initializeVoiceInterface();
            break;
    }
}

function initializeClickInterface() {
    console.log('🎯 Initializing click interface...');
    // Reset to step 1 and ensure proper initial state
    window.currentStep = 1;
    
    // Hide all steps except the first one
    const allSteps = document.querySelectorAll('.form-step');
    allSteps.forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
            step.style.visibility = 'visible';
            step.style.opacity = '1';
            step.style.zIndex = '10';
        } else {
            step.classList.remove('active');
            step.style.visibility = 'hidden';
            step.style.opacity = '0';
            step.style.zIndex = '1';
        }
    });
    
    // Initialize dropdown interactions
    const dropdowns = document.querySelectorAll('.visual-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const options = dropdown.querySelector('.dropdown-options');
        
        trigger.addEventListener('click', () => {
            console.log('Dropdown clicked');
            // Close all other dropdowns first
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
        
        options.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                console.log('Option selected:', option.dataset.value);
                const text = option.textContent;
                const value = option.dataset.value;
                
                dropdown.querySelector('.selected-text').textContent = text;
                dropdown.classList.remove('open');
                dropdown.dataset.selected = value;
                
                // Auto-advance to next step
                setTimeout(() => {
                    nextStep();
                    // Update navigation in case we're on the final step
                    setTimeout(updateStepNavigation, 100);
                }, 500);
            });
        });
    });
    
    // Initialize card selections
    const sizeCards = document.querySelectorAll('.size-card');
    sizeCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Size card selected:', card.dataset.value);
            sizeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            setTimeout(() => {
                nextStep();
                // Update navigation in case we're on the final step (without showing errors)
                setTimeout(updateStepNavigation, 100);
            }, 500);
        });
    });
    
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Goal item clicked:', item.dataset.value);
            item.classList.toggle('selected');
        });
    });

    // Auto-format phone input (US style) in Step 4
    const phoneInput = document.querySelector('.form-step[data-step="4"] input[type="tel"]');
    if (phoneInput && !phoneInput.dataset.boundFormat) {
        phoneInput.dataset.boundFormat = '1';
        phoneInput.addEventListener('input', (e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 11); // allow leading 1
            let formatted = '';
            if (digits.startsWith('1')) {
                const rest = digits.slice(1);
                if (rest.length > 0) {
                    formatted = `+1 (${rest.slice(0,3)}`;
                    if (rest.length >= 3) formatted += `) ${rest.slice(3,6)}`;
                    if (rest.length >= 6) formatted += `-${rest.slice(6,10)}`;
                } else {
                    formatted = '+1 ';
                }
            } else {
                if (digits.length > 0) formatted = `+1 (${digits.slice(0,3)}`;
                if (digits.length >= 3) formatted += `) ${digits.slice(3,6)}`;
                if (digits.length >= 6) formatted += `-${digits.slice(6,10)}`;
            }
            e.target.value = formatted;
        });
    }
    
    // Add validation clearing for all form fields in step 4
    const step4Fields = document.querySelectorAll('.form-step[data-step="4"] input, .form-step[data-step="4"] select');
    step4Fields.forEach(field => {
        if (!field.dataset.boundValidation) {
            field.dataset.boundValidation = '1';
            field.addEventListener('input', () => {
                // Clear invalid state when user starts typing
                field.classList.remove('invalid');
                // Also remove validation errors
                const existingError = document.querySelector('.validation-error');
                if (existingError) {
                    existingError.remove();
                }
            });
            field.addEventListener('change', () => {
                // Update navigation in case we're on the final step (without showing errors)
                setTimeout(updateStepNavigation, 100);
                // Clear invalid state when user changes select value
                field.classList.remove('invalid');
                const existingError = document.querySelector('.validation-error');
                if (existingError) {
                    existingError.remove();
                }
            });
        }
    });

    // Initialize navigation
    updateStepNavigation();
    
    console.log('✅ Click interface initialized');
}

// Missing critical functions from working production
function checkFormCompletion() {
    // Check all steps for completion without showing error messages
    for (let step = 1; step <= totalSteps; step++) {
        // Temporarily set current step for validation
        const originalStep = window.currentStep;
        window.currentStep = step;

        if (!isStepComplete(step)) {
            window.currentStep = originalStep;
            return false;
        }

        window.currentStep = originalStep;
    }
    return true;
}

function isStepComplete(stepNumber) {
    switch(stepNumber) {
        case 1: // Industry selection
            const dropdown = document.querySelector('.visual-dropdown[data-field="industry"]');
            return dropdown && dropdown.dataset.selected;

        case 2: // Business size
            const selectedSize = document.querySelector('.size-card.selected');
            return selectedSize !== null;

        case 3: // AI Goals
            const selectedGoals = document.querySelectorAll('.goal-item.selected');
            return selectedGoals.length > 0;

        case 4: // Contact info
            const step4 = document.querySelector('[data-step="4"]');
            if (!step4) return false;
            
            const requiredFields = step4.querySelectorAll('input[required], select[required]');
            let allFieldsFilled = true;

            for (let field of requiredFields) {
                if (!field.value.trim()) {
                    allFieldsFilled = false;
                    break;
                }
            }

            // Email validation if email field exists and has value
            if (allFieldsFilled) {
                const emailField = step4.querySelector('input[type="email"]');
                if (emailField && emailField.value && !isValidEmail(emailField.value)) {
                    allFieldsFilled = false;
                }
            }

            return allFieldsFilled;

        default:
            return true;
    }
}

function submitClickForm() {
    console.log('📝 Submitting click form...');
    
    try {
        // Validate current step before submitting
        if (!validateCurrentStep()) {
            // Show friendly message if validation fails
            showValidationError('Please fill in all required fields before proceeding.');
            return; // Stop if validation fails
        }
        
        // Collect form data
        const formData = collectFormData();
        
        // Calculate time spent
        const timeSpent = clickFormStartTime ? Date.now() - clickFormStartTime : 0;
        const timeDisplay = formatTimeSpent(timeSpent);
        
        // Show loading state
        showFormSubmitting();
        
        // Send to CRM and show appropriate success message
        handleFormSubmissionWithCRM(formData, timeSpent)
            .then(result => {
                if (result.success) {
                    showFormSuccess(formData, timeDisplay, result.crm);
                } else {
                    showFormError('Submission failed. Please try again or contact support.');
                }
            })
            .catch(error => {
                console.error('❌ Form submission error:', error);
                showFormError('Something went wrong. Please try again or contact support.');
            });
        
    } catch (error) {
        console.error('❌ Error submitting form:', error);
        showValidationError('Something went wrong. Please check all fields and try again.');
    }
}

function collectFormData() {
    const formData = {
        industry: document.querySelector('[data-field="industry"]')?.dataset.selected || '',
        businessSize: document.querySelector('.size-card.selected')?.dataset.value || '',
        goals: Array.from(document.querySelectorAll('.goal-item.selected')).map(item => item.dataset.value),
        contact: {
            name: document.querySelector('.form-step[data-step="4"] input[type="text"]')?.value || '',
            email: document.querySelector('.form-step[data-step="4"] input[type="email"]')?.value || '',
            phone: document.querySelector('.form-step[data-step="4"] input[type="tel"]')?.value || '',
            company: document.querySelector('.form-step[data-step="4"] input[placeholder*="brokerage"]')?.value || '',
            license: document.querySelector('.form-step[data-step="4"] input[placeholder*="license"]')?.value || '',
            volume: document.querySelector('.form-step[data-step="4"] select')?.value || ''
        }
    };
    
    console.log('📊 Form data collected:', formData);
    return formData;
}

function validateFormData(formData) {
    const errors = [];
    
    if (!formData.industry) {
        errors.push('Please select your industry');
    }
    
    if (!formData.businessSize) {
        errors.push('Please select your business size');
    }
    
    if (formData.goals.length === 0) {
        errors.push('Please select at least one AI goal');
    }
    
    if (!formData.contact.name || !formData.contact.email || !formData.contact.phone) {
        errors.push('Please fill in all required contact fields');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

function showFormErrors(errors) {
    // Create error display
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-errors';
    errorContainer.innerHTML = `
        <div class="error-header">
            <i class="fas fa-exclamation-triangle"></i>
            <h4>Please fix the following issues:</h4>
        </div>
        <ul class="error-list">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
        <button class="error-close-btn" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i> Close
        </button>
    `;
    
    // Insert at top of form
    const formContainer = document.querySelector('.click-form-container');
    formContainer.insertBefore(errorContainer, formContainer.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.remove();
        }
    }, 5000);
}

function showFormSuccess(formData, timeDisplay = null, crmType = null) {
    // Replace form content with success message
    const formContainer = document.querySelector('.click-form-container');
    
    // Build time display if provided
    const timeSection = timeDisplay ? `
        <div class="completion-time">
            <p><i class="fas fa-clock"></i> <strong>Completed in:</strong> ${timeDisplay}</p>
        </div>
    ` : '';
    
    // Build CRM success indicator
    const crmSection = crmType === 'ghl' ? `
        <div class="crm-success">
            <p><i class="fas fa-check-circle"></i> <strong>Successfully sent to GoHighLevel CRM</strong></p>
        </div>
    ` : crmType === 'fallback' ? `
        <div class="crm-fallback">
            <p><i class="fas fa-info-circle"></i> <strong>Submission saved - our team will contact you shortly</strong></p>
        </div>
    ` : '';
    
    formContainer.innerHTML = `
        <div class="form-success">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Thank You!</h2>
            <p>Your AI transformation request has been submitted successfully.</p>
            ${timeSection}
            ${crmSection}
            <div class="success-details">
                <p><strong>Industry:</strong> ${formData.industry}</p>
                <p><strong>Business Size:</strong> ${formData.businessSize}</p>
                <p><strong>AI Goals:</strong> ${formData.goals.length} selected</p>
            </div>
            <p class="success-message">
                Our team will review your information and contact you within 24 hours 
                to schedule your personalized AI transformation consultation.
            </p>
            <div class="success-actions">
                <button class="btn-primary" onclick="closeFormInterface()">
                    <i class="fas fa-home"></i> Return to Home
                </button>
                <button class="btn-outline" onclick="window.open('https://myworkforceagents.ai/', '_blank')">
                    <i class="fas fa-external-link-alt"></i> Visit Our Website
                </button>
            </div>
        </div>
    `;
}

function showFormSubmitting() {
    const formContainer = document.querySelector('.click-form-container');
    formContainer.innerHTML = `
        <div class="form-submitting">
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <h2>Submitting Your Request...</h2>
            <p>Please wait while we process your AI transformation request.</p>
            <div class="loading-steps">
                <div class="step active">
                    <i class="fas fa-check"></i> Validating information
                </div>
                <div class="step active">
                    <i class="fas fa-spinner fa-spin"></i> Sending to CRM
                </div>
                <div class="step">
                    <i class="fas fa-clock"></i> Setting up consultation
                </div>
            </div>
        </div>
    `;
}

function showFormError(message) {
    const formContainer = document.querySelector('.click-form-container');
    formContainer.innerHTML = `
        <div class="form-error">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Submission Failed</h2>
            <p>${message}</p>
            <div class="error-actions">
                <button class="btn-primary" onclick="location.reload()">
                    <i class="fas fa-redo"></i> Try Again
                </button>
                <button class="btn-outline" onclick="window.open('mailto:support@myworkforceagents.ai?subject=Form Submission Issue', '_blank')">
                    <i class="fas fa-envelope"></i> Contact Support
                </button>
            </div>
        </div>
    `;
}

// Make all functions globally available
window.selectCard = selectCard;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.closeFormInterface = closeFormInterface;
window.closeAllDropdowns = closeAllDropdowns;
window.submitClickForm = submitClickForm;
