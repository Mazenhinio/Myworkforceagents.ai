// Global time tracking variables
let globalStartTime = null;
let globalTimerInterval = null;

// Global functions for HTML onclick handlers
function scrollToExperiences() {
    const experiencesSection = document.getElementById('experiences');
    if (experiencesSection) {
        const offset = 120; // Account for fixed header
        const targetPosition = experiencesSection.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        // Fallback to top if experiences section not found
        scrollToTop();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function goBackToExperiences() {
    console.log('🎯 Back to Experiences clicked!');
    
    // Find the experiences section
    const experiencesSection = document.getElementById('experiences');
    
    if (experiencesSection) {
        // Calculate scroll position (accounting for fixed header)
        const headerHeight = 120;
        const targetPosition = experiencesSection.offsetTop - headerHeight;
        
        console.log('Scrolling to experiences section at position:', targetPosition);
        
        // Smooth scroll to the experiences section
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        console.log('Experiences section not found, scrolling to top');
        // Fallback: scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Make function globally available
window.goBackToExperiences = goBackToExperiences;

// Event delegation: handle Back to Experiences clicks reliably without inline onclick
console.log('🔧 Installing delegated click handler for Back to Experiences...');
document.addEventListener('click', function(event) {
    const delegateTarget = event.target && event.target.closest('#backToExperiencesBtn, [data-action="back-to-experiences"]');
    if (!delegateTarget) return;

    console.log('🖱️ Delegated handler: Back to Experiences button clicked');
    event.preventDefault();
    try {
        goBackToExperiences();
    } catch (err) {
        console.error('❌ Error in goBackToExperiences:', err);
    }
}, { capture: true });

// Initialize the Back to Experiences button with event listener
function initializeBackToExperiencesButton() {
    console.log('🔗 Setting up Back to Experiences button...');
    
    const backToExperiencesBtn = document.getElementById('backToExperiencesBtn');
    
    if (backToExperiencesBtn) {
        console.log('✅ Found Back to Experiences button, adding event listener');
        
        backToExperiencesBtn.addEventListener('click', function() {
            console.log('🎯 Back to Experiences clicked!');
            
            // Find the experiences section
            const experiencesSection = document.getElementById('experiences');
            
            if (experiencesSection) {
                // Calculate scroll position (accounting for fixed header)
                const headerHeight = 120;
                const targetPosition = experiencesSection.offsetTop - headerHeight;
                
                console.log('Scrolling to experiences section at position:', targetPosition);
                
                // Smooth scroll to the experiences section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.log('Experiences section not found, scrolling to top');
                // Fallback: scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
        
        console.log('✅ Back to Experiences button event listener added successfully');
    } else {
        console.log('❌ Back to Experiences button not found');
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MWA.AI System Initializing...');
    
    // Start global time tracking immediately (hidden from user)
    startGlobalTimeTracking();
    
    // Initialize all systems
    initializeAnimations();
    initialize3DStoryAnimations();
    initializeFormValidation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeCardExperience(); // Add this new function
    initializeTimeline();
    
    // Using delegated click handler for Back to Experiences button (no direct binding needed)
    // Initialize Voice Interface when page loads
    setTimeout(() => {
        const canvas = document.getElementById('threejs-canvas');
        if (canvas && window.THREE) {
            console.log('🎙️ Pre-loading Voice Interface...');
            initVoiceInterface();
        }
    }, 2000);
    
    // Start lead counter animation immediately
    animateLeadCounter();
    
    console.log('✅ All systems online!');
});

// Card Experience Interaction Handlers
function initializeCardExperience() {
    console.log('🃏 Initializing Card Experience...');
    
    // Add click handlers to card backs
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
    
    // Add selection state
    gameCard.classList.add('selected');
    
    // Create dramatic effect
    createCardSelectionEffect(gameCard);
    
    // Start infinity zoom transition after a brief moment
    setTimeout(() => {
        startInfinityToHourglassTransition(cardType);
    }, 1200);
}

// Enhanced infinity-to-hourglass transition with real estate themed cinematic effects
function startInfinityToHourglassTransition(cardType) {
    console.log(`🎯 Starting real estate themed cinematic transition for: ${cardType}`);
    
    // SAFETY: Clean up any existing overlays or states first
    cleanupAllWarpElements();
    
    // Get the hero infinity symbol
    const infinitySymbol = document.querySelector('.hero-infinity-symbol');
    if (!infinitySymbol) {
        console.error('❌ Hero infinity symbol not found');
        return;
    }
    
    // Create real estate themed overlay with enhanced visuals
    const overlay = createRealEstateTransitionOverlay();
    document.body.appendChild(overlay);
    
    // Hide original content and start real estate themed sequence
    hideOriginalContent();
    
    // REAL ESTATE THEMED TRANSITION SEQUENCE
    executeRealEstateTransitionSequence(infinitySymbol, overlay, cardType);
}

function createRealEstateTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'real-estate-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-container">
            <div class="real-estate-elements">
                <!-- House Keys Animation -->
                <div class="house-keys-animation">
                    <div class="key-ring">
                        <div class="key key-1">🗝️</div>
                        <div class="key key-2">🔑</div>
                        <div class="key key-3">🏠</div>
                    </div>
                </div>
                
                <!-- Property Sign -->
                <div class="property-sign">
                    <div class="sign-post"></div>
                    <div class="sign-board">
                        <div class="sign-text">AI TRANSFORMATION</div>
                        <div class="sign-subtext">Ready to Deploy</div>
                    </div>
                </div>
                
                <!-- Blueprint Grid -->
                <div class="blueprint-grid">
                    <div class="grid-line horizontal"></div>
                    <div class="grid-line vertical"></div>
                    <div class="grid-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                
                <!-- Loading Indicator -->
                <div class="loading-indicator">
                    <div class="loading-spinner"></div>
                    <p class="transition-message">Preparing your AI transformation...</p>
                </div>
            </div>
        </div>
    `;
    
    return overlay;
}

function executeRealEstateTransitionSequence(infinitySymbol, overlay, cardType) {
    console.log('🏠 Executing real estate themed transition...');
    
    // Phase 1: Keys animation (0-1s)
    setTimeout(() => {
        animateHouseKeys();
    }, 100);
    
    // Phase 2: Property sign reveal (1-2s)
    setTimeout(() => {
        animatePropertySign();
    }, 1000);
    
    // Phase 3: Blueprint grid activation (2-3s)
    setTimeout(() => {
        animateBlueprintGrid();
    }, 2000);
    
    // Phase 4: Complete transition (3-4s)
    setTimeout(() => {
        console.log('✨ Transitioning to interface...');
        completeRealEstateTransition(overlay, cardType);
    }, 3000);
}

function animateHouseKeys() {
    const keys = document.querySelectorAll('.key');
    const keyRing = document.querySelector('.key-ring');
    
    // Animate key ring entrance
    keyRing.style.animation = 'keyRingFloat 2s ease-out forwards';
    
    // Play key jingling sound effect
    playKeyJinglingSound();
    
    // Stagger key animations
    keys.forEach((key, index) => {
        setTimeout(() => {
            key.style.animation = `keySpin ${1.5}s ease-out forwards`;
            key.style.transform = `rotateY(${360 * (index + 1)}deg) scale(1.2)`;
        }, index * 300);
    });
}

function animatePropertySign() {
    const signPost = document.querySelector('.sign-post');
    const signBoard = document.querySelector('.sign-board');
    const signText = document.querySelector('.sign-text');
    const signSubtext = document.querySelector('.sign-subtext');
    
    // Animate sign post growing from ground
    signPost.style.animation = 'signPostGrow 1.5s ease-out forwards';
    
    // Animate sign board appearing
    setTimeout(() => {
        signBoard.style.animation = 'signBoardAppear 1s ease-out forwards';
    }, 500);
    
    // Animate text appearing
    setTimeout(() => {
        signText.style.animation = 'textTypewriter 1s ease-out forwards';
    }, 1000);
    
    setTimeout(() => {
        signSubtext.style.animation = 'textTypewriter 0.8s ease-out forwards';
    }, 1500);
}

function animateBlueprintGrid() {
    const gridLines = document.querySelectorAll('.grid-line');
    const dots = document.querySelectorAll('.dot');
    
    // Animate grid lines drawing
    gridLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'gridLineDraw 1s ease-out forwards';
        }, index * 200);
    });
    
    // Animate dots appearing
    dots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.animation = 'dotPulse 0.5s ease-out forwards';
        }, 800 + index * 100);
    });
}

function completeRealEstateTransition(overlay, cardType) {
    // Add completion effect
    const loadingSpinner = overlay.querySelector('.loading-spinner');
    const transitionMessage = overlay.querySelector('.transition-message');
    
    loadingSpinner.style.animation = 'spinnerComplete 0.5s ease-out forwards';
    transitionMessage.textContent = 'AI System Ready!';
    transitionMessage.style.animation = 'textGlow 0.5s ease-out forwards';
    
    // Complete transition after brief pause
    setTimeout(() => {
        navigateToFormInterface(cardType, overlay);
    }, 800);
}

function createSimpleTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'simple-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-container">
            <div class="transition-content">
                <div class="loading-indicator">⚡</div>
                <p class="transition-message">Preparing interface...</p>
            </div>
        </div>
    `;
    
    return overlay;
}

// Clean slate - complex helper functions removed

function hideOriginalContent() {
    // Smoothly hide hero content and apply blur to background elements only
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const meetSection = document.querySelector('#meet-section');
    const aiStorySection = document.querySelector('#ai-story');
    const resultsSection = document.querySelector('.results-section');
    const formSection = document.querySelector('.form-section');
    const finalCta = document.querySelector('.final-cta');
    
    // List of elements to blur (everything except the warp overlay)
    const elementsToBlur = [hero, navbar, footer, meetSection, aiStorySection, resultsSection, formSection, finalCta];
    
    elementsToBlur.forEach(element => {
        if (element) {
            // Use will-change for performance and clean transitions
            element.style.willChange = 'filter, opacity';
            element.style.transition = 'filter 1s ease-out, opacity 1s ease-out';
            element.style.filter = 'blur(8px)';
            element.style.opacity = '0.3';
        }
    });
}

function executeWarpSequence(infinitySymbol, overlay, cardType) {
    console.log('🎬 Executing clean transition...');
    
    // Simple fade transition (1 second)
    setTimeout(() => {
        console.log('✨ Transitioning to interface...');
        completeWarpAndNavigate(overlay, cardType);
    }, 1000);
}

// Clean slate - complex animations removed

function updateWarpStatus(statusText) {
    const statusElement = document.querySelector('.status-text');
    if (statusElement) {
        statusElement.textContent = statusText;
        
        // Add status pulse effect
        const statusIndicator = document.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.style.animation = 'statusUpdate 0.5s ease-out';
            setTimeout(() => {
                statusIndicator.style.animation = 'statusPulse 2s ease-in-out infinite';
            }, 500);
        }
    }
}

function completeWarpAndNavigate(overlay, cardType) {
    // Simple completion and navigate
    setTimeout(() => {
        navigateToFormInterface(cardType, overlay);
    }, 500);
}

function navigateToFormInterface(cardType, overlay) {
    // Remove warp overlay
    overlay.style.transition = 'opacity 1s ease-out';
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.remove();
        
        // Restore background but keep it dimmed
        restoreBackgroundForForm();
        
        // Create and show the specific form interface
        createFormInterface(cardType);
        
        // Note: Global time tracking already started on page load
        
    }, 1000);
}

function restoreBackgroundForForm() {
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const meetSection = document.querySelector('#meet-section');
    const aiStorySection = document.querySelector('#ai-story');
    const resultsSection = document.querySelector('.results-section');
    const formSection = document.querySelector('.form-section');
    const finalCta = document.querySelector('.final-cta');
    
    const elementsToRestore = [hero, navbar, footer, meetSection, aiStorySection, resultsSection, formSection, finalCta];
    
    elementsToRestore.forEach(element => {
        if (element) {
            element.style.transition = 'filter 1s ease-out, opacity 1s ease-out';
            element.style.filter = 'blur(3px)';
            element.style.opacity = '0.1';
        }
    });
}

function createFormInterface(cardType) {
    const formInterface = document.createElement('div');
    formInterface.className = `form-interface ${cardType}-interface`;
    formInterface.id = 'activeFormInterface';
    
    switch(cardType) {
        case 'click':
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
                    <div class="click-icon"><i class="fas fa-mouse-pointer"></i></div>
                    <h2>Interactive Experience Setup</h2>
                    <p>Configure your AI workflow through visual selection</p>
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
                            <h4>Brokerage</h4>
                            <p>11-50 agents</p>
                        </div>
                        <div class="size-card" data-value="large-brokerage">
                            <i class="fas fa-city"></i>
                            <h4>Large Brokerage</h4>
                            <p>50+ agents</p>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: AI Goals -->
                <div class="form-step" data-step="3">
                    <div class="step-header">
                        <h3>AI Automation Priorities</h3>
                    </div>
                    <div class="goals-grid">
                        <div class="goal-item" data-value="lead-response">
                            <div class="goal-icon"><i class="fas fa-bolt"></i></div>
                            <h4>Instant Lead Response</h4>
                        </div>
                        <div class="goal-item" data-value="client-communication">
                            <div class="goal-icon"><i class="fas fa-comments"></i></div>
                            <h4>Client Communication</h4>
                        </div>
                        <div class="goal-item" data-value="market-analysis">
                            <div class="goal-icon"><i class="fas fa-chart-line"></i></div>
                            <h4>Market Analysis</h4>
                        </div>
                        <div class="goal-item" data-value="transaction-management">
                            <div class="goal-icon"><i class="fas fa-file-contract"></i></div>
                            <h4>Transaction Management</h4>
                        </div>
                        <div class="goal-item" data-value="listing-optimization">
                            <div class="goal-icon"><i class="fas fa-search"></i></div>
                            <h4>Listing Optimization</h4>
                        </div>
                        <div class="goal-item" data-value="follow-up-automation">
                            <div class="goal-icon"><i class="fas fa-clock"></i></div>
                            <h4>Follow-up Automation</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4: Contact Info -->
                <div class="form-step" data-step="4">
                    <div class="step-header">
                        <h3>Get Your AI Transformation Started</h3>
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
                            <label>Brokerage/Company</label>
                            <input type="text" placeholder="Your brokerage name" required>
                        </div>
                        <div class="field-group">
                            <label>License Number (Optional)</label>
                            <input type="text" placeholder="Your real estate license #">
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

function createTypeInterface() {
    return `
        <div class="type-form-container">
            <div class="chat-interface">
                <div class="chat-header">
                    <div class="ai-avatar">
                        <div class="avatar-pulse"></div>
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="chat-info">
                        <h3>MWA.AI Assistant</h3>
                        <span class="status">Ready to help</span>
                    </div>
                    <div class="chat-controls">
                        <button class="minimize-btn"><i class="fas fa-minus"></i></button>
                        <button class="close-btn" onclick="closeFormInterface()"><i class="fas fa-times"></i></button>
                    </div>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="message ai-message">
                        <div class="message-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="message-content">
                            <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="input-container">
                        <input type="text" id="chatInput" placeholder="Type your message..." disabled>
                        <button class="send-btn" id="sendBtn" disabled>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="suggestions" id="chatSuggestions">
                        <button class="suggestion">Tell me about your services</button>
                        <button class="suggestion">How does AI automation work?</button>
                        <button class="suggestion">What industries do you serve?</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createVoiceInterface() {
    return `
        <div class="voice-form-container">
            <div class="voice-interface">
                <div class="voice-header">
                    <h2>Voice AI Assistant</h2>
                    <p>Speak naturally with our AI-powered voice agent</p>
                </div>
                
                <div class="voice-layout">
                    <div class="vapi-voice-panel">
                        <div class="voice-controls">
                            <div class="voice-status">
                                <div class="status-indicator">
                                    <div class="status-dot"></div>
                                    <span>Voice Agent Ready</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Side-by-Side Voice AI Interface -->
                        <div class="side-by-side-voice-interface" id="voiceInterface">
                            <div class="voice-interface-header">
                                <h3>AI Voice Assistant</h3>
                                <p>Interactive voice AI with real-time 3D globe visualization</p>
                            </div>
                            
                            <!-- Side-by-side container -->
                            <div class="voice-interface-grid">
                                <!-- 3D Globe Visualizer -->
                                <div class="globe-visualizer-panel">
                                    <div class="visualizer-header">
                                        <h4><i class="fas fa-globe"></i> Audio Globe</h4>
                                        <p>Watch the globe react to conversation</p>
                                    </div>
                                    <div class="globe-canvas-container">
                                        <canvas id="threejs-canvas"></canvas>
                                        <!-- Removed globe status overlay for cleaner look -->
                                    </div>
                                    <div class="globe-controls">
                                        <button class="globe-btn active" id="toggleGlobeBtn" onclick="toggleAudioGlobe()">
                                            <i class="fas fa-stop"></i>
                                            <span>Stop Globe</span>
                                        </button>
                                        <p class="globe-info">Wave effects responding to audio</p>
                                    </div>
                                </div>
                                
                                <!-- VAPI Interface Panel -->
                                <div class="vapi-interface-panel">
                                    <div class="vapi-header">
                                        <h4><i class="fas fa-robot"></i> Voice AI Agent</h4>
                                        <p>Click to interact with the AI assistant</p>
                                    </div>
                                    <div class="vapi-container">
                                        <!-- VAPI iframe will be embedded here by setupVAPIInterface() -->
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Real-time Transcription (Full Width) -->
                            <div class="transcription-container" id="transcriptionContainer">
                                <div class="transcription-header">
                                    <h4><i class="fas fa-closed-captioning"></i> Live Transcription</h4>
                                    <div class="transcription-controls">
                                        <button class="clear-transcript-btn" onclick="clearTranscription()">
                                            <i class="fas fa-trash"></i>
                                            Clear
                                        </button>
                                        <button class="transcription-toggle-btn" onclick="toggleTranscription()">
                                            <i class="fas fa-microphone"></i>
                                            Start Listening
                                        </button>
                                    </div>
                                </div>
                                <div class="transcription-content" id="transcriptionContent">
                                    <div class="transcript-placeholder">
                                        <i class="fas fa-comment-dots"></i>
                                        <p>Click "Start Listening" to begin transcription...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="voice-instructions">
                            <div class="instruction-content">
                                <h4>How to Use Voice Assistant:</h4>
                                <ol>
                                    <li>The globe automatically shows wave and ripple effects</li>
                                    <li>Use the VAPI interface on the right to interact with the AI agent</li>
                                    <li>Click "Start Listening" to enable real-time transcription</li>
                                    <li>Speak and watch waves ripple across the globe surface</li>
                                    <li>View conversation transcripts in the panel below</li>
                                </ol>
                                <p><i class="fas fa-info-circle"></i> The 3D globe creates dynamic wave patterns that respond to audio in real-time. VAPI provides the actual AI conversation while waves visualize your voice.</p>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateAudioWaveform(barCount) {
    let waves = '';
    for (let i = 0; i < barCount; i++) {
        const height = Math.random() * 60 + 20;
        const delay = Math.random() * 2;
        waves += `<div class="wave-bar" style="height: ${height}%; animation-delay: ${delay}s;"></div>`;
    }
    return waves;
}

function startHourglassTimer() {
    // Create floating hourglass timer
    const hourglassTimer = document.createElement('div');
    hourglassTimer.className = 'hourglass-timer';
    hourglassTimer.id = 'hourglassTimer';
    hourglassTimer.innerHTML = `
        <div class="timer-hourglass">
            <div class="timer-frame">
                <div class="timer-top">
                    <div class="timer-sand" id="timerTopSand"></div>
                </div>
                <div class="timer-neck">
                    <div class="timer-stream"></div>
                </div>
                <div class="timer-bottom">
                    <div class="timer-sand" id="timerBottomSand"></div>
                </div>
            </div>
        </div>
        <div class="timer-display">
            <span id="timerMinutes">00</span>:<span id="timerSeconds">00</span>
        </div>
    `;
    
    document.body.appendChild(hourglassTimer);
    
    // Animate hourglass to top position
    setTimeout(() => {
        hourglassTimer.classList.add('timer-active');
        startTimeTracking();
    }, 500);
}

// Global Time Tracking (Hidden)
function startGlobalTimeTracking() {
    globalStartTime = Date.now();
    console.log('⏱️ Global time tracking started (hidden)');
}

function getGlobalElapsedTime() {
    if (!globalStartTime) return 0;
    return Date.now() - globalStartTime;
}

function formatTimeForDisplay(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds, totalSeconds };
}

// Legacy timer variables (for old hourglass if needed)
let startTime = Date.now();
let timerInterval;

function startTimeTracking() {
    startTime = Date.now();
    
    // Clear any existing timer first
    if (window.timerInterval) {
        clearInterval(window.timerInterval);
    }
    
    window.timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        const minutesEl = document.getElementById('timerMinutes');
        const secondsEl = document.getElementById('timerSeconds');
        
        if (minutesEl && secondsEl) {
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            // Update sand animation based on time
            updateTimerSandAnimation(elapsed);
        }
    }, 1000);
}

function updateTimerSandAnimation(elapsed) {
    const progress = (elapsed % 60000) / 60000; // Reset every minute
    const topSand = document.getElementById('timerTopSand');
    const bottomSand = document.getElementById('timerBottomSand');
    
    if (topSand && bottomSand) {
        topSand.style.height = `${100 - (progress * 100)}%`;
        bottomSand.style.height = `${progress * 100}%`;
    }
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
            // Close all other dropdowns first
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
        
        options.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                const text = option.textContent;
                const value = option.dataset.value;
                
                dropdown.querySelector('.selected-text').textContent = text;
                dropdown.classList.remove('open');
                dropdown.dataset.selected = value;
                
                // Auto-advance to next step
                setTimeout(nextStep, 500);
            });
        });
    });
    
    // Initialize card selections
    const sizeCards = document.querySelectorAll('.size-card');
    sizeCards.forEach(card => {
        card.addEventListener('click', () => {
            sizeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            setTimeout(nextStep, 500);
        });
    });
    
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    });
    
    // Initialize navigation
    updateStepNavigation();
}

function initializeTypeInterface() {
    // Simulate AI initialization
    setTimeout(() => {
        showAIMessage("Hello! I'm your AI assistant. I'm here to help you set up your AI transformation journey. What would you like to know about our services?");
        enableChatInput();
    }, 2000);
}

async function initializeVoiceInterface() {
    console.log('🎤 Initializing Voice Interface (called from card selection)...');
    
    // Set initial status
    updateVoiceStatus('Loading voice AI...');
    
    // Initialize our proper voice interface with 3D globe and VAPI
    console.log('🚀 Calling initVoiceInterface for full setup...');
    initVoiceInterface();
    
    // Load Vapi widget script (keeping for compatibility)
    loadVapiScript();
    
    // Initialize audio visualizer after a short delay (keeping for compatibility)
    setTimeout(() => {
        initializeAudioVisualizer();
    }, 1000);
    
    // Set a fallback timeout in case VAPI fails to load completely
    setTimeout(() => {
        if (!vapiInstance) {
            console.log('⏱️ VAPI loading timeout - ensuring voice interface is ready');
            updateVoiceStatus('Voice AI ready - Use the interface below to start');
            
            // Make sure fallback is available
            const fallbackAddon = document.querySelector('.vapi-fallback-addon');
            if (!fallbackAddon) {
                showVapiFallback();
            }
        }
    }, 10000); // 10 second timeout
    
    // Add completion button event listener after a short delay
    setTimeout(() => {
        const completeBtn = document.querySelector('.complete-voice');
        if (completeBtn) {
            completeBtn.addEventListener('click', showVoiceCompletion);
        }
    }, 1000);
    
    console.log('✅ Voice interface initialization completed');
}

// VAPI Configuration
const VAPI_CONFIG = {
    publicKey: 'e84ab93f-6b83-4994-9e1a-1ab3cda12a23',
    assistantId: '518c4706-c417-4d19-9e2d-9b2171b0cf9f'
};

// Make VAPI config globally available
window.VAPI_CONFIG = VAPI_CONFIG;

// VAPI Instance
let vapiInstance = null;

// Audio Visualizer Variables
let audioContext = null;
let analyser = null;
let microphone = null;
let dataArray = null;
let bufferLength = null;
let canvas = null;
let canvasCtx = null;
let animationId = null;
let isVisualizerActive = false;

// Audio Visualizer Functions
async function initializeAudioVisualizer() {
    try {
        console.log('🎵 Initializing audio visualizer...');
        
        canvas = document.getElementById('audioCanvas');
        if (!canvas) {
            console.error('❌ Audio canvas not found');
            return;
        }
        
        canvasCtx = canvas.getContext('2d');
        
        // Set canvas size for high DPI displays
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvasCtx.scale(dpr, dpr);
        
        // Setup audio capture
        await setupAudioCapture();
        
        // Start visualization
        drawVisualizer();
        
        console.log('✅ Audio visualizer initialized');
    } catch (error) {
        console.error('❌ Failed to initialize audio visualizer:', error);
    }
}

async function setupAudioCapture() {
    try {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create analyser
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        // Get microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            } 
        });
        
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        
        console.log('🎤 Microphone connected to visualizer');
        updateVisualizerState('listening');
        
    } catch (error) {
        console.error('❌ Failed to setup audio capture:', error);
        updateVisualizerState('error');
    }
}

function drawVisualizer() {
    if (!isVisualizerActive || !analyser || !canvasCtx) return;
    
    animationId = requestAnimationFrame(drawVisualizer);
    
    // Get audio data
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate average amplitude
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }
    const average = sum / bufferLength;
    const normalizedAmplitude = average / 255;
    
    // Clear canvas
    const canvas = canvasCtx.canvas;
    const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
    const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;
    
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw frequency bars in a circle
    const radius = 60;
    const barCount = 32;
    const angleStep = (Math.PI * 2) / barCount;
    
    for (let i = 0; i < barCount; i++) {
        const angle = i * angleStep;
        const dataIndex = Math.floor((i / barCount) * bufferLength);
        const barHeight = (dataArray[dataIndex] / 255) * 40;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);
        
        // Color gradient based on frequency
        const hue = (i / barCount) * 360;
        canvasCtx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
        canvasCtx.lineWidth = 3;
        
        canvasCtx.beginPath();
        canvasCtx.moveTo(x1, y1);
        canvasCtx.lineTo(x2, y2);
        canvasCtx.stroke();
    }
    
    // Draw center circle
    canvasCtx.beginPath();
    canvasCtx.arc(centerX, centerY, 20 + normalizedAmplitude * 20, 0, Math.PI * 2);
    canvasCtx.fillStyle = `rgba(0, 212, 255, ${0.3 + normalizedAmplitude * 0.7})`;
    canvasCtx.fill();
    
    // Update pulse effect
    updateAudioPulse(normalizedAmplitude);
}

function updateAudioPulse(amplitude) {
    const audioPulse = document.getElementById('audioPulse');
    const frequencyRings = document.getElementById('frequencyRings');
    
    if (audioPulse) {
        const scale = 1 + amplitude * 0.5;
        const opacity = 0.3 + amplitude * 0.7;
        audioPulse.style.transform = `scale(${scale})`;
        audioPulse.style.opacity = opacity;
    }
    
    if (frequencyRings) {
        const rings = frequencyRings.querySelectorAll('.freq-ring');
        rings.forEach((ring, index) => {
            const delay = index * 0.1;
            const scale = 1 + amplitude * (0.3 + delay);
            ring.style.transform = `scale(${scale})`;
            ring.style.opacity = amplitude * 0.8;
        });
    }
}

function updateVisualizerState(state) {
    const container = document.getElementById('audioVisualizerContainer');
    const indicator = document.getElementById('audioTypeIndicator');
    
    if (!container || !indicator) return;
    
    // Remove all state classes
    container.classList.remove('listening', 'speaking', 'processing', 'idle', 'error');
    
    // Add current state
    container.classList.add(state);
    
    // Update indicator
    const icon = indicator.querySelector('i');
    const text = indicator.querySelector('span');
    
    switch (state) {
        case 'listening':
            icon.className = 'fas fa-microphone';
            text.textContent = 'Listening';
            break;
        case 'speaking':
            icon.className = 'fas fa-volume-up';
            text.textContent = 'AI Speaking';
            break;
        case 'processing':
            icon.className = 'fas fa-cog fa-spin';
            text.textContent = 'Processing';
            break;
        case 'idle':
            icon.className = 'fas fa-microphone-slash';
            text.textContent = 'Ready';
            break;
        case 'error':
            icon.className = 'fas fa-exclamation-triangle';
            text.textContent = 'Error';
            break;
    }
}

function setVisualizerMode(mode) {
    updateVisualizerState(mode);
    
    if (mode === 'listening' || mode === 'speaking') {
        isVisualizerActive = true;
        if (!animationId) {
            drawVisualizer();
        }
    } else {
        isVisualizerActive = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
}

function loadVapiScript() {
    console.log('🔄 Initializing VAPI integration...');
    
    // Skip SDK loading and go directly to backup interface for now
    console.log('⚠️ Using voice interface as primary method');
    updateVoiceStatus('Voice AI ready - click the orb or button below to start');
    
    // Initialize audio visualizer
    setTimeout(() => {
        initializeAudioVisualizer();
        showVapiFallback();
    }, 500);
    
    /* 
    // Commented out for debugging - we'll go straight to backup
    // Check if VAPI is already available globally
    if (window.Vapi) {
        console.log('✅ VAPI SDK already available');
        initializeVapiSDK();
        return;
    }
    
    // Try to load VAPI Web SDK with multiple fallback URLs
    const sdkUrls = [
        'https://unpkg.com/@vapi-ai/web@latest',
        'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest',
        'https://unpkg.com/@vapi-ai/web'
    ];
    
    let urlIndex = 0;
    
    function tryLoadScript() {
        if (urlIndex >= sdkUrls.length) {
            console.error('❌ Failed to load VAPI SDK from all URLs');
            console.log('🔄 Setting up backup interface - main buttons will use fallback');
            updateVoiceStatus('Voice AI ready - click button to start (using backup mode)');
            setTimeout(() => showVapiFallback(), 1000);
        return;
    }
    
    const script = document.createElement('script');
        script.src = sdkUrls[urlIndex];
        script.type = 'module';
        
        // Set a timeout for loading
        const timeout = setTimeout(() => {
            console.warn(`⏱️ Timeout loading from: ${sdkUrls[urlIndex]}`);
            script.onload = null;
            script.onerror = null;
            urlIndex++;
            tryLoadScript();
        }, 5000);
    
    script.onload = () => {
            clearTimeout(timeout);
            console.log(`✅ VAPI SDK loaded successfully from: ${sdkUrls[urlIndex]}`);
            // Give it a moment to initialize
            setTimeout(() => {
                initializeVapiSDK();
            }, 500);
    };
    
    script.onerror = () => {
            clearTimeout(timeout);
            console.warn(`⚠️ Failed to load from: ${sdkUrls[urlIndex]}`);
            urlIndex++;
            tryLoadScript();
    };
    
    document.head.appendChild(script);
    }
    
    tryLoadScript();
    */
}

async function initializeVapiSDK() {
    try {
        let Vapi;
        
        // Try different ways to access the VAPI SDK
        if (window.Vapi) {
            Vapi = window.Vapi;
            console.log('Using global VAPI');
        } else {
            try {
                // Try importing as module
                const module = await import('https://unpkg.com/@vapi-ai/web@latest');
                Vapi = module.default || module.Vapi;
                console.log('Imported VAPI as module');
            } catch (importError) {
                console.warn('Module import failed, trying alternative approach');
                // Show fallback but keep existing interface
                console.log('🔄 Will show fallback option alongside existing interface');
                setTimeout(() => showVapiFallback(), 1000);
                return;
            }
        }
        
        if (!Vapi) {
            throw new Error('VAPI SDK not available');
        }
        
        vapiInstance = new Vapi(VAPI_CONFIG.publicKey);
        
        // Set up event listeners
        vapiInstance.on('call-start', () => {
            console.log('🎤 Call started');
            const voiceOrb = document.getElementById('voiceOrb');
            voiceOrb?.classList.add('active');
            updateVoiceStatus('Connected - Speak now');
            setVisualizerMode('listening');
        });
        
        vapiInstance.on('call-end', () => {
            console.log('📞 Call ended');
            const voiceOrb = document.getElementById('voiceOrb');
            voiceOrb?.classList.remove('active');
            updateVoiceStatus('Click the orb to start voice conversation');
            setVisualizerMode('idle');
        });
        
        vapiInstance.on('speech-start', () => {
            console.log('🗣️ User started speaking');
            updateVoiceStatus('Listening...');
            setVisualizerMode('listening');
        });
        
        vapiInstance.on('speech-end', () => {
            console.log('🤫 User stopped speaking');
            updateVoiceStatus('Processing...');
            setVisualizerMode('processing');
        });
        
        vapiInstance.on('message', (message) => {
            console.log('💬 Message:', message);
            if (message.type === 'assistant-response') {
                updateVoiceStatus('AI responding...');
                setVisualizerMode('speaking');
            } else if (message.type === 'transcript') {
                updateVoiceStatus(`You said: "${message.transcript}"`);
                setVisualizerMode('listening');
            }
        });
        
        vapiInstance.on('error', (error) => {
            console.error('VAPI Error:', error);
            updateVoiceStatus('Voice error - please try again');
            setTimeout(() => {
                updateVoiceStatus('Click the orb to start voice conversation');
                const voiceOrb = document.getElementById('voiceOrb');
                voiceOrb?.classList.remove('active');
            }, 3000);
        });
        
        // Initialize UI
        initializeVoiceUI();
        
        // Update status to indicate successful initialization
        updateVoiceStatus('🎤 Voice AI ready - click the orb to start talking!');
        console.log('🎉 VAPI initialized successfully - voice interface active');
        
    } catch (error) {
        console.error('❌ Failed to initialize VAPI:', error);
        console.log('🔄 Will show fallback option alongside existing interface');
        setTimeout(() => showVapiFallback(), 1000);
    }
}

function initializeVoiceUI() {
    const voiceOrb = document.getElementById('voiceOrb');
    
    if (voiceOrb) {
        voiceOrb.addEventListener('click', showVoiceInterface);
    }
}

function showVoiceInterface() {
    console.log('🎤 Voice orb clicked - showing voice interface');
    updateVoiceStatus('Opening voice interface...');
    
    // Initialize voice interface if needed
    initVoiceInterface();
    
    // Show and highlight the voice interface
    const backupContainer = document.querySelector('.backup-iframe-container');
    if (backupContainer) {
        activateBackupInterface();
        updateVoiceStatus('🎤 Use the voice interface below');
    } else {
        // If no interface exists, create it
        showVapiFallback();
        setTimeout(() => {
            activateBackupInterface();
            updateVoiceStatus('🎤 Use the voice interface below');
        }, 500);
    }
}

// Removed old startVoiceCall, endVoiceCall, and toggleVoiceCall functions
// Now using simplified showVoiceInterface function

// Add a helper function to activate backup interface
function activateBackupInterface() {
    const backupContainer = document.querySelector('.backup-iframe-container');
    
    if (backupContainer) {
        // Show backup interface if hidden
        if (backupContainer.style.display === 'none') {
            window.toggleBackupInterface();
        }
        
        // Scroll backup interface into view
        setTimeout(() => {
            backupContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add visual highlight to backup interface
            backupContainer.classList.add('highlighted');
            
            // Remove highlight after animation completes
            setTimeout(() => {
                backupContainer.classList.remove('highlighted');
            }, 4000);
        }, 300);
    }
}

// Removed updateVoiceUI function - no longer needed without start/end call buttons

function updateVoiceStatus(message) {
    const statusElement = document.querySelector('#voiceStatus p');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

// =============================================
// 3D AUDIO GLOBE WITH THREE.JS
// =============================================

class AudioGlobe3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.dataArray = null;
        this.animationId = null;
        this.isActive = false;
        this.canvas = null;
        this.globeGeometry = null;
        this.globeMaterial = null;
        this.baseRadius = 1;
        this.currentScale = 1;
        this.targetScale = 1;
        this.particles = null;
        
        console.log('🌍 3D Audio Globe initialized');
    }

    async init() {
        try {
            this.canvas = document.getElementById('threejs-canvas');
            if (!this.canvas) {
                console.error('❌ Canvas element not found');
                return false;
            }

            this.setupThreeJS();
            this.createGlobe();
            this.setupLighting();
            await this.setupAudio();
            this.animate();
            
            console.log('✅ 3D Audio Globe setup complete');
            return true;
            
        } catch (error) {
            console.error('❌ Error initializing 3D Audio Globe:', error);
            return false;
        }
    }

    setupThreeJS() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a1a);

        const canvasWidth = this.canvas.clientWidth;
        const canvasHeight = this.canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
        this.camera.position.z = 3.5;

        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(canvasWidth, canvasHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        console.log('🎬 Three.js scene setup complete');
    }

    createGlobe() {
        // Create main globe geometry with more subdivisions for wave effects
        this.globeGeometry = new THREE.SphereGeometry(this.baseRadius, 128, 128);
        
        // Store original vertex positions for wave calculations
        this.originalVertices = [...this.globeGeometry.attributes.position.array];
        
        // Create wave variables
        this.waveAmplitude = 0.0;
        this.waveFrequency = 1.0;
        this.waveSpeed = 1.0;
        this.rippleCenter = { x: 0, y: 0, z: 1 }; // Center of ripple effects
        
        // Globe material with enhanced shader effects
        this.globeMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                uniform float time;
                uniform float amplitude;
                uniform float frequency;
                uniform vec3 rippleCenter;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    
                    vec3 pos = position;
                    
                    // Create wave effects based on audio
                    float distance = length(pos - rippleCenter);
                    float wave1 = sin(distance * frequency + time * 2.0) * amplitude;
                    float wave2 = sin(distance * frequency * 2.0 - time * 3.0) * amplitude * 0.5;
                    float wave3 = sin(distance * frequency * 0.5 + time * 1.5) * amplitude * 0.3;
                    
                    // Apply multi-layered wave displacement
                    pos += normal * (wave1 + wave2 + wave3);
                    
                    // Add global pulsing effect
                    pos += normal * sin(time * 4.0) * amplitude * 0.2;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float amplitude;
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Dynamic color mixing based on wave displacement
                    float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
                    float colorMix = sin(time * 2.0 + length(vPosition) * 5.0) * 0.5 + 0.5;
                    
                    vec3 finalColor = mix(color1, color2, colorMix + amplitude * 2.0);
                    
                    gl_FragColor = vec4(finalColor, 0.8);
                }
            `,
            uniforms: {
                time: { value: 0.0 },
                amplitude: { value: 0.0 },
                frequency: { value: 8.0 },
                rippleCenter: { value: new THREE.Vector3(0, 0, 1) },
                color1: { value: new THREE.Vector3(0.0, 0.8, 1.0) },
                color2: { value: new THREE.Vector3(0.5, 0.0, 1.0) }
            },
            transparent: true,
            side: THREE.DoubleSide
        });

        this.globe = new THREE.Mesh(this.globeGeometry, this.globeMaterial);
        this.globe.castShadow = true;
        this.globe.receiveShadow = true;
        this.scene.add(this.globe);

        // Create wireframe overlay for enhanced globe effect
        const wireframeGeometry = new THREE.SphereGeometry(this.baseRadius * 1.02, 64, 64);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        });
        
        this.wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        this.scene.add(this.wireframe);

        // Create particles around globe
        this.createParticles();

        console.log('🌊 3D Globe created with advanced wave and ripple effects');
    }

    createParticles() {
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Randomly distribute particles around the globe
            const radius = 1.5 + Math.random() * 0.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Blue to cyan color gradient
            colors[i * 3] = 0.0;     // R
            colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
            colors[i * 3 + 2] = 1.0; // B
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(particles, particleMaterial);
        this.scene.add(this.particles);
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        const light1 = new THREE.PointLight(0x8b5cf6, 0.5, 10);
        light1.position.set(-3, 2, 1);
        this.scene.add(light1);

        const light2 = new THREE.PointLight(0xff7733, 0.3, 8);
        light2.position.set(2, -2, 2);
        this.scene.add(light2);

        console.log('💡 Lighting setup complete');
    }

    async setupAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.analyser.smoothingTimeConstant = 0.3; // Lower smoothing = maximum sensitivity to all audio
            
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);

            // Auto-start microphone for real-time audio detection
            await this.startMicrophone();

            console.log('🎤 Audio analysis setup complete with auto-start');
            
        } catch (error) {
            console.error('❌ Error setting up audio:', error);
            // Continue without microphone if permission denied
            console.log('⚠️ Continuing without microphone access');
        }
    }

    async startMicrophone() {
        try {
            if (this.microphone) return;

            // Try to get microphone access for audio detection
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,  // We want to detect all audio
                    noiseSuppression: false,  // We want to detect all audio
                    autoGainControl: false    // We want raw audio levels
                } 
            });
            
            const source = this.audioContext.createMediaStreamSource(stream);
            source.connect(this.analyser);
            this.microphone = stream;
            
            console.log('🎤 Microphone connected to globe visualizer');
            
        } catch (error) {
            console.error('❌ Error accessing microphone:', error);
            // Try alternative audio setup for system audio detection
            await this.setupSystemAudioDetection();
        }
    }

    async setupSystemAudioDetection() {
        try {
            // Try to use getDisplayMedia for system audio capture
            if (navigator.mediaDevices.getDisplayMedia) {
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({
                        audio: {
                            echoCancellation: false,
                            noiseSuppression: false,
                            autoGainControl: false
                        },
                        video: false
                    });
                    
                    if (stream.getAudioTracks().length > 0) {
                        const source = this.audioContext.createMediaStreamSource(stream);
                        source.connect(this.analyser);
                        this.microphone = stream;
                        console.log('🔊 System audio capture enabled');
                        return;
                    }
                } catch (displayError) {
                    console.log('📱 Display media not available, using fallback');
                }
            }
            
            // Fallback: Create dynamic audio simulation for demonstration
            this.createAudioSimulation();
            
        } catch (error) {
            console.error('❌ Error setting up system audio detection:', error);
            this.createAudioSimulation();
        }
    }

    createAudioSimulation() {
        // Create multiple oscillators for a richer audio simulation
        const oscillators = [];
        const gainNodes = [];
        
        for (let i = 0; i < 3; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.analyser);
            
            // Different frequencies for each oscillator
            const frequencies = [220, 440, 880];
            oscillator.frequency.setValueAtTime(frequencies[i], this.audioContext.currentTime);
            
            // Modulate the gain with time for dynamic effect
            gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
            
            oscillator.start();
            oscillators.push(oscillator);
            gainNodes.push(gainNode);
        }
        
        // Add periodic gain modulation for dynamic visualization
        setInterval(() => {
            gainNodes.forEach((gainNode, index) => {
                const randomGain = 0.01 + Math.random() * 0.05;
                gainNode.gain.setValueAtTime(randomGain, this.audioContext.currentTime);
            });
        }, 500);
        
        console.log('🎵 Audio simulation created for globe visualization');
    }

    updateGlobe() {
        if (!this.globe || !this.dataArray || !this.analyser) return;

        this.analyser.getByteFrequencyData(this.dataArray);
        
        let sum = 0;
        for (let i = 0; i < this.dataArray.length; i++) {
            sum += this.dataArray[i];
        }
        const average = sum / this.dataArray.length;
        const normalizedAverage = average / 255;

        // Time for wave animations
        const time = Date.now() * 0.001;
        
        // Update shader uniforms for wave effects (ULTRA SENSITIVE)
        if (this.globeMaterial.uniforms) {
            // Time uniform for animation
            this.globeMaterial.uniforms.time.value = time;
            
            // Wave amplitude based on audio (MAXIMUM SENSITIVITY)
            const waveAmplitude = 0.05 + normalizedAverage * 0.3; // Constant waves + audio boost
            this.globeMaterial.uniforms.amplitude.value = waveAmplitude;
            
            // Dynamic wave frequency based on audio intensity
            const waveFreq = 8.0 + normalizedAverage * 12.0; // More waves with louder audio
            this.globeMaterial.uniforms.frequency.value = waveFreq;
            
            // Dynamic ripple center that moves with audio
            this.rippleCenter.x = Math.sin(time * 0.8 + normalizedAverage * 5.0) * 0.5;
            this.rippleCenter.y = Math.cos(time * 0.6 + normalizedAverage * 3.0) * 0.5;
            this.rippleCenter.z = Math.sin(time * 1.2 + normalizedAverage * 4.0) * 0.3 + 0.7;
            this.globeMaterial.uniforms.rippleCenter.value.set(
                this.rippleCenter.x, 
                this.rippleCenter.y, 
                this.rippleCenter.z
            );
            
            // Dynamic colors based on audio
            const baseHue = time * 0.1 % 1;
            const audioHue = normalizedAverage * 0.8;
            const finalHue = (baseHue + audioHue) % 1;
            
            // Convert HSL to RGB for shader
            const color1 = new THREE.Color().setHSL(finalHue, 0.8, 0.6);
            const color2 = new THREE.Color().setHSL((finalHue + 0.3) % 1, 0.9, 0.4);
            
            this.globeMaterial.uniforms.color1.value.set(color1.r, color1.g, color1.b);
            this.globeMaterial.uniforms.color2.value.set(color2.r, color2.g, color2.b);
        }

        // Gentle rotation enhanced by audio
        this.globe.rotation.y += 0.008 + normalizedAverage * 0.03;
        this.globe.rotation.x += Math.sin(time * 0.7) * 0.002 + normalizedAverage * 0.01;

        // Wireframe effects
        if (this.wireframe) {
            this.wireframe.rotation.y += 0.012 + normalizedAverage * 0.04;
            this.wireframe.rotation.x -= Math.sin(time * 0.9) * 0.003 + normalizedAverage * 0.015;
            this.wireframe.material.opacity = 0.2 + normalizedAverage * 0.3;
        }

        // Enhanced particle animation (MAXIMUM AUDIO INFLUENCE)
        if (this.particles) {
            this.particles.rotation.y += 0.004 + normalizedAverage * 0.03; // VERY reactive particles
            this.particles.rotation.x += Math.sin(time * 0.6) * 0.002;
            
            // Particle scaling with wave effects
            const particleScale = 0.8 + Math.sin(time * 2.0) * 0.1 + normalizedAverage * 0.8;
            this.particles.scale.setScalar(particleScale);
        }

        // Wave-based globe display with no overlay needed
    }

    // Removed updateGlobeStatus function - no more overlay needed

    animate() {
        if (!this.isActive) return;

        this.animationId = requestAnimationFrame(() => this.animate());
        this.updateGlobe();
        this.renderer.render(this.scene, this.camera);
    }

    async start() {
        if (this.isActive) return;

        try {
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            await this.startMicrophone();
            this.isActive = true;
            this.animate();

            const canvas = document.getElementById('threejs-canvas');
            const button = document.getElementById('toggleGlobeBtn');
            
            if (canvas) canvas.classList.add('active');
            if (button) {
                button.classList.add('active');
                button.innerHTML = '<i class="fas fa-stop"></i><span>Stop Globe</span>';
            }

            console.log('🌍 3D Audio Globe started');
            
        } catch (error) {
            console.error('❌ Error starting visualizer:', error);
        }
    }

    stop() {
        this.isActive = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        if (this.microphone) {
            this.microphone.getTracks().forEach(track => track.stop());
            this.microphone = null;
        }

        const canvas = document.getElementById('threejs-canvas');
        const button = document.getElementById('toggleGlobeBtn');
        
        if (canvas) canvas.classList.remove('active');
        if (button) {
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-play"></i><span>Start Globe</span>';
        }

        console.log('⏹️ 3D Audio Globe stopped');
    }
}

// =============================================
// AUDIO GLOBE AND TRANSCRIPTION CONTROLS
// =============================================

// Global instances
let audioGlobe3D = null;
let speechRecognition = null;
let isTranscribing = false;

// Globe control functions
async function toggleAudioGlobe() {
    if (!audioGlobe3D) {
        if (!window.THREE) {
            console.error('❌ Three.js not loaded');
            return;
        }

        audioGlobe3D = new AudioGlobe3D();
        const success = await audioGlobe3D.init();
        if (!success) {
            console.error('❌ Failed to initialize audio globe');
            return;
        }
    }

    if (audioGlobe3D.isActive) {
        audioGlobe3D.stop();
    } else {
        await audioGlobe3D.start();
    }
}

// Transcription control functions
function toggleTranscription() {
    if (isTranscribing) {
        stopTranscription();
    } else {
        startTranscription();
    }
}

function startTranscription() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('⚠️ Speech recognition not supported');
        showTranscriptionError('Speech recognition not supported in this browser');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRecognition();
    
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'en-US';

    speechRecognition.onstart = () => {
        console.log('🎤 Transcription started');
        isTranscribing = true;
        updateTranscriptionUI(true);
        clearTranscriptionPlaceholder();
    };

    speechRecognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        if (finalTranscript) {
            addTranscript('user', finalTranscript);
        }
    };

    speechRecognition.onerror = (event) => {
        console.error('❌ Speech recognition error:', event.error);
        showTranscriptionError(`Speech recognition error: ${event.error}`);
        stopTranscription();
    };

    speechRecognition.onend = () => {
        console.log('🔇 Speech recognition ended');
        if (isTranscribing) {
            // Restart recognition to keep it continuous
            setTimeout(() => {
                if (isTranscribing) {
                    speechRecognition.start();
                }
            }, 100);
        }
    };

    speechRecognition.start();
}

function stopTranscription() {
    if (speechRecognition) {
        speechRecognition.stop();
        speechRecognition = null;
    }
    
    isTranscribing = false;
    updateTranscriptionUI(false);
    console.log('⏹️ Transcription stopped');
}

function updateTranscriptionUI(active) {
    const button = document.querySelector('.transcription-toggle-btn');
    
    if (button) {
        if (active) {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-stop"></i>Stop Listening';
        } else {
            button.classList.remove('active');
            button.innerHTML = '<i class="fas fa-microphone"></i>Start Listening';
        }
    }
}

function addTranscript(speaker, text) {
    const transcriptionContent = document.getElementById('transcriptionContent');
    if (!transcriptionContent) return;

    // Create transcript entry
    const entry = document.createElement('div');
    entry.className = `transcript-entry ${speaker}`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    entry.innerHTML = `
        <div class="transcript-speaker">${speaker === 'user' ? 'You' : 'AI Assistant'}</div>
        <p class="transcript-text">${text}</p>
        <div class="transcript-timestamp">${timestamp}</div>
    `;

    transcriptionContent.appendChild(entry);
    transcriptionContent.scrollTop = transcriptionContent.scrollHeight;
}

function clearTranscriptionPlaceholder() {
    const placeholder = document.querySelector('.transcript-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
}

function showTranscriptionError(message) {
    const transcriptionContent = document.getElementById('transcriptionContent');
    if (transcriptionContent) {
        transcriptionContent.innerHTML = `
            <div class="transcript-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// VAPI Setup - Embedded Iframe Approach
function setupVAPIInterface() {
    console.log('📞 Starting VAPI iframe embedding setup...');
    
    const container = document.querySelector('.vapi-container');
    
    if (!container) {
        console.error('❌ VAPI container (.vapi-container) not found');
        return;
    }
    
    console.log('✅ VAPI container found, setting up embedded iframe...');
    
    // Create iframe for VAPI demo
    const iframe = document.createElement('iframe');
    iframe.id = 'vapiEmbeddedFrame';
    iframe.src = 'https://vapi.ai?demo=true&shareKey=e84ab93f-6b83-4994-9e1a-1ab3cda12a23&assistantId=518c4706-c417-4d19-9e2d-9b2171b0cf9f&embed=true&theme=dark';
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10px;
        background: transparent;
    `;
    iframe.allow = 'microphone; camera; autoplay; clipboard-write; encrypted-media; fullscreen';
    iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-microphone allow-camera allow-autoplay';
    
    // Clear container and add iframe directly (no loading overlay)
    container.innerHTML = '';
    container.appendChild(iframe);
    
    // Handle iframe loading events
    let loadingTimeout;
    let fallbackTimer;
    
    iframe.onload = () => {
        console.log('✅ VAPI iframe loaded successfully');
        clearTimeout(loadingTimeout);
        clearTimeout(fallbackTimer);
        // No loading overlay to remove - iframe shows directly
    };
    
    iframe.onerror = () => {
        console.error('❌ VAPI iframe failed to load');
        clearTimeout(loadingTimeout);
        clearTimeout(fallbackTimer);
        showVAPIEmbedFallback();
    };
    
    // Fallback timeout - if iframe doesn't respond in 10 seconds
    loadingTimeout = setTimeout(() => {
        console.log('⏱️ VAPI iframe loading timeout, checking if content loaded...');
        
        // Try to detect if iframe has content or is blocked
        try {
            // If we can't access iframe content due to CORS, assume it's working
            if (iframe.contentWindow) {
                console.log('🔍 Iframe seems to be loading, giving more time...');
                
                // Extended timeout before showing fallback
                fallbackTimer = setTimeout(() => {
                    console.log('🔄 Showing embedded content with fallback option...');
                    showVAPIEmbedFallback();
                }, 5000);
            }
        } catch (e) {
            // CORS restriction means iframe is likely working
            console.log('🛡️ CORS detected - iframe likely working');
        }
    }, 10000);
    
    console.log('✅ VAPI iframe embedding setup complete');
}

// Fallback when iframe embedding fails or times out
function showVAPIEmbedFallback() {
    const container = document.querySelector('.vapi-container');
    if (!container) return;
    
    // No loading overlay to remove since we removed it from setup
    
    // Show fallback with option to open in new tab
    const fallbackDiv = document.createElement('div');
    fallbackDiv.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 107, 53, 0.1)); border-radius: 10px; border: 1px solid rgba(255, 193, 7, 0.3); padding: 20px; text-align: center;">
            <div style="background: rgba(255, 193, 7, 0.2); border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <i class="fas fa-external-link-alt" style="font-size: 1.5rem; color: #ffc107;"></i>
            </div>
            <h4 style="color: var(--text-primary); margin-bottom: 8px; font-size: 1.1rem;">Iframe Embedding Restricted</h4>
            <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.9rem; line-height: 1.4;">The voice assistant needs to open in a new window for full functionality.</p>
            <a href="https://vapi.ai?demo=true&shareKey=e84ab93f-6b83-4994-9e1a-1ab3cda12a23&assistantId=518c4706-c417-4d19-9e2d-9b2171b0cf9f" 
               target="_blank" 
               style="background: linear-gradient(135deg, #ffc107, #ff6b35); color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 600; font-size: 1rem; box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4); transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px;"
               onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(255, 193, 7, 0.6)';" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(255, 193, 7, 0.4)';">
                <i class="fas fa-microphone"></i> 
                Open Voice Assistant
            </a>
        </div>
    `;
    
    container.appendChild(fallbackDiv);
}

// Removed showVAPIFallback function - no longer needed with direct link approach

// OLD VOICEAISESSION CLASS (keeping for compatibility) - will remove later
class VoiceAISession {
    constructor() {
        this.audioVisualizer3D = null;
        this.speechRecognition = null;
        this.isActive = false;
        this.sessionStartTime = null;
        this.vapiIframe = null;
        this.transcripts = [];
        this.isListening = false;
        this.isSpeaking = false;
        
        console.log('🎙️ Voice AI Session Manager initialized');
    }

    async init() {
        try {
            // Initialize 3D visualizer
            if (!this.audioVisualizer3D && window.THREE) {
                this.audioVisualizer3D = new AudioVisualizer3D();
                await this.audioVisualizer3D.init();
            }

            // Initialize speech recognition
            this.initSpeechRecognition();
            
            // Setup VAPI iframe
            this.setupVAPIIframe();
            
            console.log('✅ Voice AI Session initialized');
            return true;
            
        } catch (error) {
            console.error('❌ Error initializing Voice AI Session:', error);
            return false;
        }
    }

    initSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('⚠️ Speech recognition not supported');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechRecognition = new SpeechRecognition();
        
        this.speechRecognition.continuous = true;
        this.speechRecognition.interimResults = true;
        this.speechRecognition.lang = 'en-US';

        this.speechRecognition.onstart = () => {
            console.log('🎤 Speech recognition started');
            this.updateVoiceStatus('Listening...', 'listening');
            this.isListening = true;
        };

        this.speechRecognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            if (finalTranscript) {
                this.addTranscript('user', finalTranscript);
                // Here you would send to VAPI and get response
                this.simulateAIResponse(finalTranscript);
            }
        };

        this.speechRecognition.onerror = (event) => {
            console.error('❌ Speech recognition error:', event.error);
            this.updateVoiceStatus('Speech recognition error', 'error');
        };

        this.speechRecognition.onend = () => {
            console.log('🔇 Speech recognition ended');
            if (this.isActive) {
                // Restart recognition to keep it continuous
                setTimeout(() => {
                    if (this.isActive) {
                        this.speechRecognition.start();
                    }
                }, 100);
            }
        };
    }

    setupVAPIIframe() {
        const iframe = document.getElementById('vapiIframe');
        if (iframe) {
            const vapiUrl = `https://vapi.ai?demo=true&shareKey=e84ab93f-6b83-4994-9e1a-1ab3cda12a23&assistantId=518c4706-c417-4d19-9e2d-9b2171b0cf9f&embed=true&minimal=true&autoStart=true`;
            iframe.src = vapiUrl;
            this.vapiIframe = iframe;
            console.log('📞 VAPI iframe configured');
        }
    }

    async start() {
        if (this.isActive) return;

        try {
            this.sessionStartTime = Date.now();
            this.isActive = true;

            // Start 3D visualizer
            if (this.audioVisualizer3D) {
                await this.audioVisualizer3D.start();
            }

            // Start speech recognition
            if (this.speechRecognition) {
                this.speechRecognition.start();
            }

            // Update UI
            this.updateUI(true);
            this.updateVoiceStatus('Starting conversation...', 'active');
            
            console.log('🎙️ Voice AI session started');

        } catch (error) {
            console.error('❌ Error starting session:', error);
            this.updateVoiceStatus('Failed to start session', 'error');
        }
    }

    async stop() {
        if (!this.isActive) return;

        this.isActive = false;

        // Stop speech recognition
        if (this.speechRecognition) {
            this.speechRecognition.stop();
        }

        // Stop 3D visualizer
        if (this.audioVisualizer3D) {
            this.audioVisualizer3D.stop();
        }

        // Calculate session duration
        const sessionDuration = this.sessionStartTime ? Date.now() - this.sessionStartTime : 0;

        // Update UI
        this.updateUI(false);
        this.updateVoiceStatus('Session ended', 'inactive');

        // Show completion popup with 3D hourglass
        this.showCompletionPopup(sessionDuration);

        console.log('⏹️ Voice AI session stopped');
    }

    updateUI(isActive) {
        const startBtn = document.getElementById('startVoiceAIBtn');
        const stopBtn = document.getElementById('stopVoiceAIBtn');
        const canvas = document.getElementById('threejs-canvas');

        if (isActive) {
            startBtn.classList.add('hidden');
            stopBtn.classList.remove('hidden');
            if (canvas) canvas.classList.add('active');
        } else {
            startBtn.classList.remove('hidden');
            stopBtn.classList.add('hidden');
            if (canvas) canvas.classList.remove('active');
        }
    }

    updateVoiceStatus(message, status = 'default') {
        const statusText = document.getElementById('voiceStatusText');
        const statusOverlay = document.getElementById('voiceStatusOverlay');
        
        if (statusText) {
            statusText.textContent = message;
        }
        
        if (statusOverlay) {
            statusOverlay.className = `voice-status-overlay ${status}`;
        }
    }

    addTranscript(speaker, text) {
        const transcriptionContent = document.getElementById('transcriptionContent');
        if (!transcriptionContent) return;

        // Remove placeholder if it exists
        const placeholder = transcriptionContent.querySelector('.transcript-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        // Create transcript entry
        const entry = document.createElement('div');
        entry.className = `transcript-entry ${speaker}`;
        
        const timestamp = new Date().toLocaleTimeString();
        
        entry.innerHTML = `
            <div class="transcript-speaker">${speaker === 'user' ? 'You' : 'AI Assistant'}</div>
            <p class="transcript-text">${text}</p>
            <div class="transcript-timestamp">${timestamp}</div>
        `;

        transcriptionContent.appendChild(entry);
        transcriptionContent.scrollTop = transcriptionContent.scrollHeight;

        // Store transcript
        this.transcripts.push({
            speaker,
            text,
            timestamp: Date.now()
        });
    }

    simulateAIResponse(userInput) {
        // This is a placeholder - in a real implementation, this would integrate with VAPI
        setTimeout(() => {
            const responses = [
                "I understand your request. Let me help you with that.",
                "That's an interesting point. Can you tell me more?",
                "I can assist you with that. What would you like to know?",
                "Based on what you've said, I recommend...",
                "Let me process that information for you."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addTranscript('ai', randomResponse);
            
            this.updateVoiceStatus('AI responding...', 'speaking');
            setTimeout(() => {
                this.updateVoiceStatus('Listening...', 'listening');
            }, 2000);
            
        }, 1000);
    }

    showCompletionPopup(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        
        // Create 3D hourglass completion popup
        this.create3DHourglassPopup(minutes, seconds);
    }

    create3DHourglassPopup(minutes, seconds) {
        // Create popup overlay
        const popup = document.createElement('div');
        popup.className = 'completion-popup-overlay';
        popup.innerHTML = `
            <div class="completion-popup">
                <div class="completion-header">
                    <h3>🎉 Voice Session Complete!</h3>
                    <p>Thank you for using MWA.AI Voice Assistant</p>
                </div>
                <div class="hourglass-container">
                    <canvas id="hourglass-canvas"></canvas>
                </div>
                <div class="session-stats">
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span class="stat-label">Session Duration</span>
                        <span class="stat-value">${minutes}m ${seconds}s</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-comments"></i>
                        <span class="stat-label">Conversations</span>
                        <span class="stat-value">${this.transcripts.length}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-microphone"></i>
                        <span class="stat-label">Voice Recognition</span>
                        <span class="stat-value">Active</span>
                    </div>
                </div>
                <div class="completion-actions">
                    <button class="completion-btn primary" onclick="restartVoiceSession()">
                        <i class="fas fa-redo"></i>
                        Start New Session
                    </button>
                    <button class="completion-btn secondary" onclick="closeCompletionPopup()">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        // Initialize 3D hourglass
        setTimeout(() => {
            this.init3DHourglass(minutes, seconds);
        }, 100);

        // Auto-close after 30 seconds
        setTimeout(() => {
            if (document.body.contains(popup)) {
                this.closePopup(popup);
            }
        }, 30000);
    }

    init3DHourglass(minutes, seconds) {
        const canvas = document.getElementById('hourglass-canvas');
        if (!canvas || !window.THREE) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        renderer.setSize(300, 300);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Hourglass geometry
        const hourglassGroup = new THREE.Group();
        
        // Create hourglass shape using ConeGeometry
        const topCone = new THREE.ConeGeometry(1.2, 1.5, 8);
        const bottomCone = new THREE.ConeGeometry(1.2, 1.5, 8);
        
        // Hourglass material
        const glassMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });

        const topGlass = new THREE.Mesh(topCone, glassMaterial);
        const bottomGlass = new THREE.Mesh(bottomCone, glassMaterial);
        
        topGlass.position.y = 0.75;
        bottomGlass.position.y = -0.75;
        bottomGlass.rotation.x = Math.PI;

        hourglassGroup.add(topGlass);
        hourglassGroup.add(bottomGlass);

        // Create sand particles
        const particleCount = 200;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            // Start particles in top cone
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 1.0;
            const height = Math.random() * 1.2 + 0.3;

            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = Math.sin(angle) * radius;

            // Golden sand color
            colors[i * 3] = 1.0;     // R
            colors[i * 3 + 1] = 0.8; // G
            colors[i * 3 + 2] = 0.3; // B

            velocities.push({
                x: 0,
                y: -0.02 - Math.random() * 0.01,
                z: 0,
                resetTime: Math.random() * 200
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        hourglassGroup.add(particleSystem);

        scene.add(hourglassGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.8);
        directionalLight.position.set(2, 2, 2);
        scene.add(directionalLight);

        camera.position.z = 4;

        // Animation
        let time = 0;
        const animate = () => {
            if (!document.getElementById('hourglass-canvas')) return;

            time += 0.016;

            // Rotate hourglass
            hourglassGroup.rotation.y += 0.005;

            // Update particles
            const positionsAttr = particles.getAttribute('position');
            for (let i = 0; i < particleCount; i++) {
                const velocity = velocities[i];
                
                positionsAttr.array[i * 3 + 1] += velocity.y;

                // Reset particle when it reaches bottom
                if (positionsAttr.array[i * 3 + 1] < -1.5) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = Math.random() * 1.0;
                    
                    positionsAttr.array[i * 3] = Math.cos(angle) * radius;
                    positionsAttr.array[i * 3 + 1] = Math.random() * 1.2 + 0.3;
                    positionsAttr.array[i * 3 + 2] = Math.sin(angle) * radius;
                }

                // Funnel effect in middle
                const y = positionsAttr.array[i * 3 + 1];
                if (y > -0.2 && y < 0.2) {
                    const factor = Math.abs(y) / 0.2;
                    positionsAttr.array[i * 3] *= (0.1 + factor * 0.9);
                    positionsAttr.array[i * 3 + 2] *= (0.1 + factor * 0.9);
                }
            }
            positionsAttr.needsUpdate = true;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }

    closePopup(popup) {
        if (popup && popup.parentNode) {
            popup.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                popup.remove();
            }, 300);
        }
    }
}

// Global voice AI session instance
let voiceAISession = null;

// Voice AI session functions
async function startVoiceAISession() {
    try {
        if (!voiceAISession) {
            voiceAISession = new VoiceAISession();
            await voiceAISession.init();
        }

        await voiceAISession.start();
        
    } catch (error) {
        console.error('❌ Error starting Voice AI session:', error);
    }
}

async function stopVoiceAISession() {
    if (voiceAISession) {
        await voiceAISession.stop();
    }
}

// Transcription functions
function clearTranscription() {
    const transcriptionContent = document.getElementById('transcriptionContent');
    if (transcriptionContent) {
        transcriptionContent.innerHTML = `
            <div class="transcript-placeholder">
                <i class="fas fa-comment-dots"></i>
                <p>Transcription will appear here when you start talking...</p>
            </div>
        `;
    }
    
    if (voiceAISession) {
        voiceAISession.transcripts = [];
    }
    
    console.log('🗑️ Transcription cleared');
}

// Completion popup functions
function restartVoiceSession() {
    closeCompletionPopup();
    setTimeout(() => {
        startVoiceAISession();
    }, 500);
}

function closeCompletionPopup() {
    const popup = document.querySelector('.completion-popup-overlay');
    if (popup && voiceAISession) {
        voiceAISession.closePopup(popup);
    }
}

// Auto-initialize when voice interface is shown
function initVoiceInterface() {
    console.log('🎙️ Initializing Voice Interface...');
    console.log('🔧 Checking for required elements...');
    
    // Debug: Check if elements exist
    const canvas = document.getElementById('threejs-canvas');
    const vapiContainer = document.querySelector('.vapi-container');
    
    console.log('📋 Element check:', {
        canvas: canvas ? 'Found' : 'Missing',
        vapiContainer: vapiContainer ? 'Found' : 'Missing',
        threeJS: window.THREE ? 'Loaded' : 'Missing'
    });
    
    // Initialize 3D Audio Globe
    console.log('🌍 Starting Audio Globe initialization...');
    initAudioGlobe();
    
    // Setup VAPI interface  
    console.log('📞 Starting VAPI interface initialization...');
    setTimeout(() => {
        setupVAPIInterface();
    }, 500);
    
    console.log('✅ Voice interface initialization completed');
}

// Dedicated function for audio globe initialization
function initAudioGlobe() {
    console.log('🌍 Starting Audio Globe initialization...');
    
    const canvas = document.getElementById('threejs-canvas');
    
    if (!canvas) {
        console.error('❌ Canvas element #threejs-canvas not found');
        return;
    }
    
    if (!window.THREE) {
        console.error('❌ Three.js library not loaded');
        // Try to show an error in the canvas area
        const container = canvas.parentElement;
        if (container) {
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; background: rgba(255, 71, 87, 0.1); border-radius: 50%; border: 2px solid rgba(255, 71, 87, 0.3); color: var(--text-primary); text-align: center; padding: 20px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ff4757; margin-bottom: 10px;"></i>
                    <p style="margin: 0; font-size: 0.9rem;">3D Library Error</p>
                    <small style="opacity: 0.7; margin-top: 5px;">Three.js failed to load</small>
                </div>
            `;
        }
        return;
    }
    
    // Ensure canvas has proper dimensions and visibility
    const container = canvas.parentElement;
    if (container) {
        canvas.style.width = '300px';
        canvas.style.height = '300px';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        canvas.width = 300;
        canvas.height = 300;
        
        console.log('📐 Canvas dimensions set:', {
            width: canvas.width,
            height: canvas.height,
            styleWidth: canvas.style.width,
            styleHeight: canvas.style.height
        });
    }
    
    console.log('🌍 Initializing Audio Globe...');
    
    // Initialize globe with shorter delay
    setTimeout(async () => {
        try {
            console.log('🚀 Creating AudioGlobe3D instance...');
            
            if (!audioGlobe3D) {
                audioGlobe3D = new AudioGlobe3D();
                const success = await audioGlobe3D.init();
                
                if (success) {
                    console.log('✅ Audio Globe initialized successfully');
                    
                    // Auto-start the globe
                    await audioGlobe3D.start();
                    console.log('🎬 Audio Globe started and running');
                    
                    // Status overlay removed - globe shows wave effects directly
                    
                    // Update button state
                    const globeBtn = document.getElementById('toggleGlobeBtn');
                    if (globeBtn) {
                        globeBtn.querySelector('i').className = 'fas fa-stop';
                        globeBtn.querySelector('span').textContent = 'Stop Globe';
                        globeBtn.classList.add('active');
                    }
                    
                } else {
                    console.error('❌ Audio Globe initialization failed');
                    showGlobeError('Initialization failed');
                }
            } else {
                console.log('ℹ️ Audio Globe already exists, restarting...');
                await audioGlobe3D.start();
            }
        } catch (error) {
            console.error('❌ Error during Audio Globe setup:', error);
            showGlobeError('Setup error: ' + error.message);
        }
    }, 800);
}

// Helper function to show globe initialization errors
function showGlobeError(errorMessage) {
    const canvas = document.getElementById('threejs-canvas');
    if (canvas) {
        const container = canvas.parentElement;
        if (container) {
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; background: rgba(255, 71, 87, 0.1); border-radius: 50%; border: 2px solid rgba(255, 71, 87, 0.3); color: var(--text-primary); text-align: center; padding: 20px;">
                    <i class="fas fa-globe" style="font-size: 2.5rem; color: rgba(255, 71, 87, 0.7); margin-bottom: 15px;"></i>
                    <p style="margin: 0; font-size: 0.9rem; font-weight: 600;">Audio Globe Unavailable</p>
                    <small style="opacity: 0.7; margin-top: 5px; font-size: 0.8rem;">${errorMessage}</small>
                    <button onclick="location.reload()" style="margin-top: 15px; padding: 8px 16px; background: rgba(255, 71, 87, 0.2); border: 1px solid rgba(255, 71, 87, 0.5); border-radius: 15px; color: white; cursor: pointer; font-size: 0.8rem;">Retry</button>
                </div>
            `;
        }
    }
}

function showVapiFallback() {
    const vapiInterface = document.querySelector('.vapi-interface');
    
    if (vapiInterface) {
        // Check if fallback already exists
        let fallbackElement = document.querySelector('.vapi-fallback-addon');
        
        if (!fallbackElement) {
            // Create fallback element that doesn't replace the existing interface
            fallbackElement = document.createElement('div');
            fallbackElement.className = 'vapi-fallback-addon';
            fallbackElement.innerHTML = `
                <div class="fallback-message">
                    <div class="fallback-status">
                        <i class="fas fa-microphone"></i>
                        <span>Voice AI Interface Ready</span>
                    </div>
                    <div class="backup-iframe-container" style="display: none;">
                        <iframe 
                            src="https://vapi.ai?demo=true&shareKey=${VAPI_CONFIG.publicKey}&assistantId=${VAPI_CONFIG.assistantId}&embed=true&minimal=true"
                            width="100%"
                            height="300"
                            frameborder="0"
                            allow="microphone; camera; autoplay"
                            sandbox="allow-scripts allow-same-origin allow-microphone allow-forms"
                            loading="lazy"
                            style="border-radius: 10px; background: rgba(0,0,0,0.1);">
                        </iframe>
                    </div>
                    <button class="show-backup-btn" onclick="toggleBackupInterface()">
                        <i class="fas fa-microphone"></i>
                        Show Voice Interface
                    </button>
                </div>
            `;
            
            // Add fallback after the existing interface, not replacing it
            vapiInterface.appendChild(fallbackElement);
        }
        
        // Update voice status to indicate ready state
        updateVoiceStatus('🎤 Voice AI ready - click the orb or button below to start voice chat');
    }
}

// Make toggleBackupInterface globally accessible
window.toggleBackupInterface = function() {
    const backupContainer = document.querySelector('.backup-iframe-container');
    const toggleBtn = document.querySelector('.show-backup-btn');
    
    if (backupContainer && toggleBtn) {
        if (backupContainer.style.display === 'none') {
            backupContainer.style.display = 'block';
            toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Voice Interface';
        } else {
            backupContainer.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-microphone"></i> Show Voice Interface';
        }
    }
}

function showVoiceCompletion() {
    const formData = {
        formType: 'voice',
        timeSpent: Date.now() - startTime
    };
    
    console.log('Voice interaction completed:', formData);
    showFormCompletion('voice', formData);
}

function toggleFullscreen() {
    const embedContainer = document.getElementById('embedContainer');
    const fullscreenBtn = document.getElementById('embedFullscreen');
    const vapiEmbedPanel = document.getElementById('vapiEmbedPanel');
    
    if (vapiEmbedPanel.classList.contains('fullscreen')) {
        // Exit fullscreen
        vapiEmbedPanel.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        fullscreenBtn.title = 'Enter Fullscreen';
    } else {
        // Enter fullscreen
        vapiEmbedPanel.classList.add('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        fullscreenBtn.title = 'Exit Fullscreen';
    }
}

function closeFormInterface() {
    const formInterface = document.getElementById('activeFormInterface');
    if (formInterface) {
        formInterface.classList.remove('interface-active');
        
        setTimeout(() => {
            // Complete cleanup of everything
            cleanupAllWarpElements();
        }, 500);
    } else {
        // If no form interface found, still do cleanup
        cleanupAllWarpElements();
    }
}

// CLICK INTERFACE FUNCTIONS
window.currentStep = 1;
const totalSteps = 4;

function nextStep() {
    if (window.currentStep < totalSteps) {
        // Close all open dropdowns
        closeAllDropdowns();
        
        // Hide current step completely
        const currentStepEl = document.querySelector(`[data-step="${window.currentStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
            currentStepEl.style.visibility = 'hidden';
            currentStepEl.style.opacity = '0';
        }
        
        // Show next step
        window.currentStep++;
        const nextStepEl = document.querySelector(`[data-step="${window.currentStep}"]`);
        if (nextStepEl) {
            nextStepEl.classList.add('active');
            nextStepEl.style.visibility = 'visible';
            nextStepEl.style.opacity = '1';
            nextStepEl.style.animation = 'stepSlideIn 0.5s ease-out forwards';
        }
        
        // Update step number in top-left corner
        const stepNumberEl = document.querySelector('.visual-form-grid .step-number');
        if (stepNumberEl) {
            stepNumberEl.textContent = window.currentStep.toString().padStart(2, '0');
        }
        
        // Update navigation
        updateStepNavigation();
    }
}

function previousStep() {
    if (window.currentStep > 1) {
        // Close all open dropdowns
        closeAllDropdowns();
        
        // Hide current step completely  
        const currentStepEl = document.querySelector(`[data-step="${window.currentStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
            currentStepEl.style.visibility = 'hidden';
            currentStepEl.style.opacity = '0';
        }
        
        // Show previous step
        window.currentStep--;
        const prevStepEl = document.querySelector(`[data-step="${window.currentStep}"]`);
        if (prevStepEl) {
            prevStepEl.classList.add('active');
            prevStepEl.style.visibility = 'visible';
            prevStepEl.style.opacity = '1';
            prevStepEl.style.animation = 'stepSlideIn 0.5s ease-out forwards';
        }
        
        // Update step number in top-left corner
        const stepNumberEl = document.querySelector('.visual-form-grid .step-number');
        if (stepNumberEl) {
            stepNumberEl.textContent = window.currentStep.toString().padStart(2, '0');
        }
        
        // Update navigation
        updateStepNavigation();
    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.visual-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
    });
}

function updateStepNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentStepDisplay = document.querySelector('.current-step');
    
    // Update step indicator
    currentStepDisplay.textContent = window.currentStep;
    
    // Update button states
    prevBtn.disabled = window.currentStep === 1;
    
    if (window.currentStep === totalSteps) {
        nextBtn.innerHTML = 'Submit <i class="fas fa-check"></i>';
        nextBtn.onclick = submitClickForm;
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        nextBtn.onclick = nextStep;
    }
}

function submitClickForm() {
    // Collect form data
    const formData = {
        realEstateFocus: document.querySelector('[data-field="industry"]')?.dataset.selected,
        businessType: document.querySelector('.size-card.selected')?.dataset.value,
        automationPriorities: Array.from(document.querySelectorAll('.goal-item.selected')).map(item => item.dataset.value),
        name: document.querySelector('input[type="text"]')?.value,
        email: document.querySelector('input[type="email"]')?.value,
        phone: document.querySelector('input[type="tel"]')?.value,
        brokerage: document.querySelector('input[type="text"]:nth-of-type(2)')?.value,
        licenseNumber: document.querySelector('input[type="text"]:nth-of-type(3)')?.value,
        transactionVolume: document.querySelector('select')?.value,
        formType: 'click',
        timeSpent: Date.now() - startTime
    };
    
    console.log('Real estate form submitted:', formData);
    showFormCompletion('click', formData);
}

// TYPE INTERFACE FUNCTIONS
function showAIMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.querySelector('.typing-indicator');
    
    // Remove typing indicator
    if (typingIndicator) {
        typingIndicator.parentElement.parentElement.remove();
    }
    
    // Create AI message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function enableChatInput() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const suggestions = document.querySelectorAll('.suggestion');
    
    chatInput.disabled = false;
    sendBtn.disabled = false;
    
    // Handle input
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    sendBtn.addEventListener('click', sendMessage);
    
    // Handle suggestions
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            chatInput.value = suggestion.textContent;
            sendMessage();
        });
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send message to N8N workflow
    sendMessageToN8N(message);
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// N8N Webhook Configuration
const N8N_CONFIG = {
    webhookUrl: 'https://khalil1973.app.n8n.cloud/webhook/23ac8ed0-1716-4ac4-bd64-197f883f4393',
    timeout: 10000, // 10 seconds
    retryAttempts: 2
};

// Send message to N8N workflow
async function sendMessageToN8N(userMessage) {
    const sessionId = getOrCreateSessionId();
    const timestamp = new Date().toISOString();
    
    const payload = {
        message: userMessage,
        sessionId: sessionId,
        timestamp: timestamp,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        chatContext: getChatContext()
    };
    
    try {
        const response = await fetch(N8N_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Chat-Source': 'MWA-AI-Landing-Page'
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(N8N_CONFIG.timeout)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle successful response - support multiple N8N output formats
        let aiMessage = null;
        
        if (data.message) {
            // Standard format: { message: "text" }
            aiMessage = data.message;
        } else if (Array.isArray(data) && data.length > 0 && data[0].output) {
            // N8N array format: [{ output: "text" }]
            aiMessage = data[0].output;
        } else if (data.output) {
            // Direct output format: { output: "text" }
            aiMessage = data.output;
        }
        
        if (aiMessage) {
            showAIMessage(aiMessage);
        } else {
            throw new Error('No valid message found in response');
        }
        
        // Store conversation context if provided
        if (data.context) {
            updateChatContext(data.context);
        }
        
    } catch (error) {
        console.error('N8N webhook error:', error);
        handleChatError(error, userMessage);
    }
}

// Generate or retrieve session ID for conversation continuity
function getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('mwa-ai-session-id');
    if (!sessionId) {
        sessionId = 'mwa-ai-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('mwa-ai-session-id', sessionId);
    }
    return sessionId;
}

// Get current chat context for continuity
function getChatContext() {
    const chatMessages = document.getElementById('chatMessages');
    const messages = [];
    
    // Get last 5 messages for context
    const messageElements = chatMessages.querySelectorAll('.message');
    const recentMessages = Array.from(messageElements).slice(-5);
    
    recentMessages.forEach(messageEl => {
        const isUser = messageEl.classList.contains('user-message');
        const content = messageEl.querySelector('.message-content p')?.textContent || '';
        
        if (content && !content.includes('typing-indicator')) {
            messages.push({
                role: isUser ? 'user' : 'assistant',
                content: content,
                timestamp: new Date().toISOString()
            });
        }
    });
    
    return messages;
}

// Update chat context from N8N response
function updateChatContext(context) {
    // Store context for next message
    sessionStorage.setItem('mwa-ai-chat-context', JSON.stringify(context));
}

// Handle chat errors with fallback responses
function handleChatError(error, userMessage) {
    console.error('Chat error details:', error);
    
    // Remove typing indicator
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.parentElement.parentElement.remove();
    }
    
    // Show error message or fallback response
    const fallbackResponse = getFallbackResponse(userMessage);
    showAIMessage(fallbackResponse);
    
    // Optionally show a subtle error indicator
    showErrorIndicator();
}

// Fallback responses when N8N is unavailable
function getFallbackResponse(userMessage) {
    const fallbacks = {
        'services': "I'd love to tell you about our AI automation services! However, I'm experiencing a brief connection issue. Could you please try refreshing the page or contact us directly?",
        'pricing': "I have detailed pricing information to share with you! There seems to be a temporary connectivity issue. Please try again in a moment or reach out to our team directly.",
        'default': "Thanks for your message! I'm experiencing a brief technical issue, but I'd still love to help you. Please try refreshing the page or contact our team directly at your convenience."
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
        return fallbacks.services;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        return fallbacks.pricing;
    } else {
        return fallbacks.default;
    }
}

// Show subtle error indicator
function showErrorIndicator() {
    const chatHeader = document.querySelector('.chat-info .status');
    if (chatHeader) {
        const originalText = chatHeader.textContent;
        chatHeader.textContent = 'Reconnecting...';
        chatHeader.style.color = '#ff6b35';
        
        setTimeout(() => {
            chatHeader.textContent = originalText;
            chatHeader.style.color = '';
        }, 3000);
    }
}

// Voice interface functions removed

// Pipecat dependencies removed

// Audio visualization functions removed

// Enhanced audio visualization functions removed

// All voice interface functions removed

// TIME REVEAL COMPLETION FUNCTION - Shows user the time they spent
function showFormCompletion(formType, data) {
    const elapsedMs = getGlobalElapsedTime();
    const timeData = formatTimeForDisplay(elapsedMs);
    
    // Create the time-reveal modal with hourglass
    const timeRevealModal = document.createElement('div');
    timeRevealModal.className = 'time-reveal-modal';
    timeRevealModal.innerHTML = `
        <div class="time-reveal-content">
            <div class="time-reveal-header">
                <div class="revealed-hourglass">
                    <div class="hourglass-frame">
                        <div class="hourglass-top">
                            <div class="sand-particles"></div>
                        </div>
                        <div class="hourglass-neck">
                            <div class="sand-stream flowing"></div>
                        </div>
                        <div class="hourglass-bottom">
                            <div class="sand-particles"></div>
                        </div>
                    </div>
                </div>
                <div class="time-display">
                    <span class="time-number">${timeData.minutes}:${timeData.seconds.toString().padStart(2, '0')}</span>
                    <span class="time-label">Minutes Elapsed</span>
                </div>
            </div>
            
            <div class="time-revelation">
                <h2>You Just Spent <span class="highlight-time">${timeData.minutes}:${timeData.seconds.toString().padStart(2, '0')}</span></h2>
                <p class="time-question">Imagine if you <strong>hadn't</strong> spent this time ${getActivityDescription(formType)}...</p>
                
                <div class="alternative-activities">
                    <h3>In ${timeData.minutes}:${timeData.seconds.toString().padStart(2, '0')}, you could have:</h3>
                    <div class="activity-list">
                        ${generateTimeAlternatives(timeData.totalSeconds)}
                    </div>
                </div>
                
                <div class="ai-automation-pitch">
                    <div class="pitch-icon">⚡</div>
                    <h3>What if AI handled this instantly?</h3>
                    <p>Our AI agents respond to leads in <strong>90 seconds</strong> vs the industry average of <strong>5+ hours</strong>. 
                    While you were exploring this ${timeData.minutes}+ minute process, an AI agent could have already:</p>
                    <ul>
                        <li>✅ Qualified your lead</li>
                        <li>✅ Scheduled a consultation</li>
                        <li>✅ Sent personalized follow-ups</li>
                        <li>✅ Started nurturing the relationship</li>
                    </ul>
                </div>
            </div>
            
            <div class="time-reveal-actions">
                <button class="btn-warm" onclick="bookAutomationCall()">
                    <i class="fas fa-rocket"></i>
                    Get AI Working For You
                </button>
                <button class="btn-secondary" onclick="closeTimeReveal()">
                    Continue Exploring
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(timeRevealModal);
    
    // Animate the hourglass revealing with dramatic effect
    setTimeout(() => {
        timeRevealModal.classList.add('reveal-active');
        animateHourglassReveal();
    }, 500);
    
    // Log the time revelation for analytics
    console.log(`⏱️ Time Revealed: ${timeData.minutes}:${timeData.seconds} for ${formType} experience`);
}

function getActivityDescription(formType) {
    const activities = {
        'click': 'filling out forms and clicking through interfaces',
        'type': 'typing messages back and forth with an AI agent',
        'voice': 'talking to a voice AI assistant'
    };
    return activities[formType] || 'exploring this interface';
}

function generateTimeAlternatives(totalSeconds) {
    const activities = [
        { time: 30, activity: "☕ Made a perfect cup of coffee" },
        { time: 60, activity: "📞 Called a potential client" },
        { time: 90, activity: "📧 Sent 3 personalized follow-up emails" },
        { time: 120, activity: "🏠 Reviewed 2 new property listings" },
        { time: 180, activity: "💼 Planned your next business strategy" },
        { time: 300, activity: "🚗 Driven to a client meeting" },
        { time: 600, activity: "🍽️ Enjoyed a relaxing lunch break" }
    ];
    
    return activities
        .filter(item => totalSeconds >= item.time)
        .slice(-3)
        .map(item => `<div class="activity-item">${item.activity}</div>`)
        .join('');
}

function animateHourglassReveal() {
    const hourglass = document.querySelector('.revealed-hourglass');
    if (hourglass) {
        hourglass.style.animation = 'hourglassRevealSpin 2s ease-out forwards';
    }
}

function bookAutomationCall() {
    // Close the time reveal modal
    closeTimeReveal();
    
    // Trigger booking action - could open calendar, redirect, etc.
    window.open('https://calendly.com/your-booking-link', '_blank');
    console.log('🚀 User clicked to book automation call after time revelation');
}

function closeTimeReveal() {
    const modal = document.querySelector('.time-reveal-modal');
    if (modal) {
        modal.classList.remove('reveal-active');
        setTimeout(() => modal.remove(), 500);
    }
    
    // Restore the page to normal state
    closeAllInterfaces();
}

function tryAnotherInterface() {
    // Remove completion modal
    const modal = document.querySelector('.form-completion-modal');
    if (modal) {
        modal.remove();
    }
    
    // Complete cleanup and restore page
    cleanupAllWarpElements();
}

function closeAllInterfaces() {
    // Remove completion modal
    const modal = document.querySelector('.form-completion-modal');
    if (modal) {
        modal.remove();
    }
    
    // Complete cleanup and restore page
    cleanupAllWarpElements();
}

function getExperienceTitle(cardType) {
    const titles = {
        'click': 'Interactive Click Experience',
        'type': 'Text-Based Experience',
        'voice': 'Voice AI Experience'
    };
    return titles[cardType] || 'Unknown Experience';
}

function getExperienceDescription(cardType) {
    const descriptions = {
        'click': 'Visual dashboard with drag-and-drop AI workflows',
        'type': 'Conversational AI assistant for detailed discussions',
        'voice': 'Natural voice interaction with AI assistant'
    };
    return descriptions[cardType] || 'Experience ready';
}

function getExperienceFeatures(cardType) {
    const features = {
        'click': ['Point & Click Interface', 'Visual AI Builder', 'Real-time Preview'],
        'type': ['Natural Language Processing', 'Context-Aware Responses', 'Document Analysis'],
        'voice': ['Speech Recognition', 'Voice Commands', 'Audio Responses']
    };
    return features[cardType] || ['Advanced Features', 'AI Integration', 'Seamless Experience'];
}

function completeWarpTransition() {
    const overlay = document.querySelector('.cinematic-warp-overlay');
    if (overlay) {
        overlay.style.transition = 'opacity 1.5s ease-out';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            overlay.remove();
            
            // Complete cleanup
            cleanupAllWarpElements();
            
            console.log('🎯 Warp transition completed successfully');
        }, 1500);
    }
}

function cleanupAllWarpElements() {
    // Remove any remaining warp or form elements
    const elementsToRemove = [
        '.cinematic-warp-overlay',
        '.real-estate-transition-overlay',
        '.form-interface',
        '.form-completion-modal',
        '.hourglass-timer'
    ];
    
    elementsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.remove());
    });
    
    // Clear any running timers
    if (window.timerInterval) {
        clearInterval(window.timerInterval);
        window.timerInterval = null;
    }
    
    // Voice agent cleanup removed (functionality removed)
    
    // Restore ALL page elements to original state
    restoreOriginalPageState();
    
    // Reset all cards
    resetAllCards();
}

function restoreOriginalPageState() {
    // Get ALL main page elements
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const meetSection = document.querySelector('#meet-section');
    const aiStorySection = document.querySelector('#ai-story');
    const resultsSection = document.querySelector('.results-section');
    const formSection = document.querySelector('.form-section');
    const finalCta = document.querySelector('.final-cta');
    const main = document.querySelector('main');
    const body = document.body;
    
    const allElements = [hero, navbar, footer, meetSection, aiStorySection, resultsSection, formSection, finalCta, main, body];
    
    // Reset ALL styles to original state
    allElements.forEach(element => {
        if (element) {
            // Complete style reset - remove ALL possible inline styles
            element.style.filter = '';
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transition = '';
            element.style.background = '';
            element.style.backgroundColor = '';
            element.style.backdropFilter = '';
            element.style.webkitBackdropFilter = '';
            element.style.willChange = '';
            element.style.zIndex = '';
            element.style.position = '';
            element.style.top = '';
            element.style.left = '';
            element.style.right = '';
            element.style.bottom = '';
            element.style.width = '';
            element.style.height = '';
            element.style.visibility = '';
            element.style.display = '';
            element.style.pointerEvents = '';
            
            // Force a repaint to ensure styles are cleared
            element.offsetHeight;
        }
    });
    
    // Extra body cleanup
    body.style.filter = '';
    body.style.opacity = '';
    body.style.overflow = '';
    body.style.backdropFilter = '';
    body.style.webkitBackdropFilter = '';
    body.style.background = '';
    body.style.backgroundColor = '';
    
    // Remove any remaining overlay classes or data attributes
    body.classList.remove('warp-active', 'form-active', 'blur-active');
    body.removeAttribute('data-warp-active');
    
    // Clear any global variables
    window.currentStep = 1;
    
    console.log('🧹 Page state fully restored - all styles cleared');
}

function completeTransition() {
    const overlay = document.querySelector('.infinity-transition-overlay');
    if (overlay) {
        overlay.style.transition = 'opacity 1s ease';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            overlay.remove();
            
            // Restore original infinity symbol
            const originalSymbol = document.querySelector('.hero-infinity-symbol');
            if (originalSymbol) {
                originalSymbol.style.opacity = '1';
            }
        }, 1000);
    }
}

// Empty functions for now
function startSandAnimation() {
    // TODO: Implement sand animation
    const bottomSand = document.getElementById('bottomSand');
    const sandStream = document.querySelector('.sand-stream');
    
    // Create sand particles with different densities
    for (let i = 0; i < 60; i++) {
        createSandParticle(topSand, 'top');
    }
    
    // Add a few initial particles to bottom
    for (let i = 0; i < 5; i++) {
        createSandParticle(bottomSand, 'bottom');
    }
    
    // Start sand flowing animation
    sandStream.classList.add('flowing');
    
    // Play a subtle sound effect (optional - browser-generated)
    try {
        // Create a subtle sand sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silent fallback if audio not supported
        console.log('Audio not available for sand effect');
    }
    
    // Gradually move sand from top to bottom
    setTimeout(() => {
        animateSandFlow();
    }, 500);
}

function createSandParticle(container, type) {
    const particle = document.createElement('div');
    particle.className = 'sand-grain';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // Add different sizes for more realistic sand
    const size = Math.random() * 2 + 2; // 2-4px
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Add slight color variation
    const goldShade = Math.floor(Math.random() * 3);
    const goldColors = ['#ffd700', '#ffed4a', '#f39c12'];
    particle.style.background = goldColors[goldShade];
    
    container.appendChild(particle);
}

function animateSandFlow() {
    const topSand = document.getElementById('topSand');
    const bottomSand = document.getElementById('bottomSand');
    
    // Gradually move particles from top to bottom
    const interval = setInterval(() => {
        const topParticles = topSand.querySelectorAll('.sand-grain');
        if (topParticles.length > 0) {
            const particle = topParticles[0];
            particle.remove();
            createSandParticle(bottomSand, 'bottom');
        } else {
            clearInterval(interval);
        }
    }, 100);
}

function navigateToCardPage(cardType) {
    console.log(`🎯 Navigating to ${cardType} experience page`);
    
    const overlay = document.querySelector('.infinity-transition-overlay');
    const hourglassContainer = document.querySelector('.hourglass-container');
    
    // Experience descriptions
    const experiences = {
        'click': {
            title: 'Interactive Click Experience',
            description: 'Visual dashboard with drag-and-drop AI workflows',
            features: ['Point & Click Interface', 'Visual AI Builder', 'Real-time Preview']
        },
        'type': {
            title: 'Text-Based Experience', 
            description: 'Conversational AI assistant for detailed discussions',
            features: ['Natural Language Processing', 'Context-Aware Responses', 'Document Analysis']
        },
        'voice': {
            title: 'Voice AI Experience',
            description: 'Natural voice interaction with AI assistant',
            features: ['Speech Recognition', 'Voice Commands', 'Audio Responses']
        }
    };
    
    const exp = experiences[cardType];
    
    // Show completion message with experience preview
    hourglassContainer.innerHTML = `
        <div class="transition-complete">
            <div class="success-icon">✓</div>
            <h2>${exp.title} Ready!</h2>
            <p>${exp.description}</p>
            <div class="experience-preview">
                <h4>What you'll experience:</h4>
                <ul>
                    ${exp.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="demo-notice">
                <p><em>This is a demo - In production, you would be redirected to the full experience</em></p>
            </div>
            <button class="continue-btn" onclick="completeTransition()">Return to Homepage</button>
        </div>
    `;
    
    // Auto-continue after longer time to let user read
    // TODO: Implement navigation
}





function showCardSelectionModal(cardType) {
    const modalData = {
        click: {
            title: 'Interactive Click Experience',
            description: 'You\'ve chosen the visual interface path. Perfect for users who prefer point-and-click interactions and immediate visual feedback.',
            icon: 'fas fa-mouse-pointer',
            color: '#00ff88'
        },
        type: {
            title: 'Text-Based Communication',
            description: 'You\'ve chosen the conversational path. Ideal for detailed discussions and precise instructions through text.',
            icon: 'fas fa-keyboard',
            color: '#00d4ff'
        },
        voice: {
            title: 'Voice AI Interaction',
            description: 'You\'ve chosen the voice interface path. The most natural and intuitive way to interact with our AI systems.',
            icon: 'fas fa-microphone',
            color: '#8b5cf6'
        }
    };
    
    const data = modalData[cardType];
    
    const modal = document.createElement('div');
    modal.className = 'card-selection-modal';
    modal.innerHTML = `
        <div class="modal-content retro-modal">
            <div class="modal-header">
                <div class="selected-card-icon" style="color: ${data.color}">
                    <i class="${data.icon}"></i>
                </div>
                <h3>${data.title}</h3>
                <button class="modal-close" onclick="closeCardSelectionModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>${data.description}</p>
                <div class="hologram-scanner"></div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeCardSelectionModal()">Choose Different Card</button>
                <button class="btn btn-primary retro-btn" onclick="confirmCardSelection('${cardType}')">
                    Begin Experience <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeCardSelectionModal() {
    const modal = document.querySelector('.card-selection-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            // Reset all cards
            resetAllCards();
        }, 300);
    }
}

function confirmCardSelection(cardType) {
    console.log(`🚀 Confirming card selection: ${cardType}`);
    closeCardSelectionModal();
    
    // Trigger the appropriate experience flow
    setTimeout(() => {
        scrollToForm();
        // You can add specific logic for each card type here
    }, 500);
}

function resetAllCards() {
    const containers = document.querySelectorAll('.card-container');
    containers.forEach(container => {
        const card = container.querySelector('.card');
        card.classList.remove('flipped');
        container.classList.remove('flipped');
        container.classList.remove('selected');
    });
}

function addCardHoverEffect(container) {
    const cardBack = container.querySelector('.card-back');
    const circuitLines = cardBack.querySelector('.circuit-lines');
    const holographicOverlay = cardBack.querySelector('.holographic-overlay');
    const cardLogo = cardBack.querySelector('.card-logo');
    
    // Enhanced hover effects
    cardBack.style.transition = 'all 0.3s ease';
    cardBack.style.transform = 'scale(1.02)';
    cardBack.style.boxShadow = '0 30px 80px rgba(0, 212, 255, 0.6)';
    cardBack.style.borderColor = 'rgba(0, 212, 255, 0.8)';
    
    // Enhance circuit animation
    if (circuitLines) {
        circuitLines.style.animationDuration = '4s';
        circuitLines.style.opacity = '1';
    }
    
    // Enhance holographic effect
    if (holographicOverlay) {
        holographicOverlay.style.animationDuration = '1.5s';
    }
    
    // Enhance logo glow
    if (cardLogo) {
        cardLogo.style.textShadow = `
            0 0 20px rgba(0, 212, 255, 1),
            0 0 30px rgba(0, 212, 255, 0.8),
            0 0 40px rgba(0, 212, 255, 0.6),
            0 0 50px rgba(0, 212, 255, 0.4)
        `;
        cardLogo.style.transform = 'scale(1.1)';
    }
}

function removeCardHoverEffect(container) {
    const cardBack = container.querySelector('.card-back');
    const circuitLines = cardBack.querySelector('.circuit-lines');
    const holographicOverlay = cardBack.querySelector('.holographic-overlay');
    const cardLogo = cardBack.querySelector('.card-logo');
    
    // Reset effects
    cardBack.style.transform = '';
    cardBack.style.boxShadow = '';
    cardBack.style.borderColor = '';
    
    // Reset circuit animation
    if (circuitLines) {
        circuitLines.style.animationDuration = '8s';
        circuitLines.style.opacity = '';
    }
    
    // Reset holographic effect
    if (holographicOverlay) {
        holographicOverlay.style.animationDuration = '3s';
    }
    
    // Reset logo glow
    if (cardLogo) {
        cardLogo.style.textShadow = '';
        cardLogo.style.transform = '';
    }
}

function createCardFlipParticles(container) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'flip-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            animation: particleExplode 1s ease-out forwards;
            left: 50%;
            top: 50%;
            z-index: 1000;
        `;
        
        const angle = (i / 8) * 360;
        particle.style.animationDelay = `${i * 0.1}s`;
        particle.style.setProperty('--angle', `${angle}deg`);
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

function createCardSelectionEffect(container) {
    // Create glowing ring effect
    const ring = document.createElement('div');
    ring.className = 'selection-ring';
    ring.style.cssText = `
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border: 3px solid var(--accent-color);
        border-radius: 25px;
        animation: selectionPulse 2s ease-in-out infinite;
        pointer-events: none;
        z-index: 5;
    `;
    
    container.appendChild(ring);
    
    setTimeout(() => {
        if (ring.parentNode) {
            ring.parentNode.removeChild(ring);
        }
    }, 2000);
}

function playCardFlipSound() {
    // Create audio context for card flip sound effect
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        try {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Silent fail if audio context not supported
        }
    }
}

function playKeyJinglingSound() {
    // Create audio context for key jingling sound effect
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        try {
            const audioContext = new (AudioContext || webkitAudioContext)();
            
            // Create multiple oscillators for jingling effect
            for (let i = 0; i < 3; i++) {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Different frequencies for each key
                const baseFreq = 600 + (i * 200);
                oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, audioContext.currentTime + 0.2);
                
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime + (i * 0.1));
                oscillator.stop(audioContext.currentTime + 0.2 + (i * 0.1));
            }
        } catch (error) {
            // Silent fail if audio context not supported
        }
    }
}

// Office Transformation Timeline already initialized above
// (Replaced the old Meet Tiles functionality)

function addDynamicLighting(tile) {
    const lighting = document.createElement('div');
    lighting.className = 'dynamic-lighting';
    lighting.style.position = 'absolute';
    lighting.style.top = '0';
    lighting.style.left = '0';
    lighting.style.right = '0';
    lighting.style.bottom = '0';
    lighting.style.background = 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,102,255,0.1) 100%)';
    lighting.style.pointerEvents = 'none';
    lighting.style.borderRadius = '22px';
    lighting.style.animation = 'lightSweep 2s ease-in-out infinite';
    
    tile.appendChild(lighting);
}

function removeDynamicLighting(tile) {
    const lighting = tile.querySelector('.dynamic-lighting');
    if (lighting) {
        tile.removeChild(lighting);
    }
}

// Office Transformation Timeline Functions
function showTimelinePhase(phase) {
    console.log(`🏢 Showing timeline phase: ${phase}`);
    
    // Update progress bar
    const progressFill = document.getElementById('timelineProgress');
    const markers = document.querySelectorAll('.marker');
    const scenes = document.querySelectorAll('.office-scene');
    const buttons = document.querySelectorAll('.timeline-btn');
    const timelineContainer = document.querySelector('.timeline-office-container');
    
    // Remove active states with proper timing
    markers.forEach(marker => marker.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // First fade out all scenes
    scenes.forEach(scene => {
        scene.classList.remove('active');
        scene.style.opacity = '0';
        scene.style.transform = 'translateX(100px)';
        scene.style.zIndex = '1';
    });
    
    // Wait for fade out, then show new scene
    setTimeout(() => {
        // Set active states based on phase
        let progressWidth = '0%';
        let targetScene = null;
        
        switch(phase) {
            case 'before':
                progressWidth = '0%';
                document.querySelector('[data-phase="before"]').classList.add('active');
                targetScene = document.getElementById('officeBefore');
                document.querySelector('.timeline-btn[data-phase="before"]').classList.add('active');
                break;
            case 'during':
                progressWidth = '50%';
                document.querySelector('[data-phase="during"]').classList.add('active');
                targetScene = document.getElementById('officeDuring');
                document.querySelector('.timeline-btn[data-phase="during"]').classList.add('active');
                break;
            case 'after':
                progressWidth = '100%';
                document.querySelector('[data-phase="after"]').classList.add('active');
                targetScene = document.getElementById('officeAfter');
                document.querySelector('.timeline-btn[data-phase="after"]').classList.add('active');
                break;
        }
        
        // Show the target scene
        if (targetScene) {
            targetScene.classList.add('active');
            targetScene.style.zIndex = '10';
            targetScene.style.opacity = '1';
            targetScene.style.transform = 'translateX(0)';
            
            // Adjust container height based on content
            setTimeout(() => {
                const contentHeight = targetScene.scrollHeight;
                if (timelineContainer) {
                    timelineContainer.style.minHeight = Math.max(800, contentHeight + 100) + 'px';
                }
            }, 100);
        }
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = progressWidth;
        }
        
        // Trigger phase-specific animations
        setTimeout(() => {
            triggerPhaseAnimation(phase);
            if (phase === 'during') {
                animateProcessSteps();
            } else if (phase === 'after') {
                animateAgentStatus();
            }
        }, 200);
        
    }, 300); // Wait for previous scene to fade out
    
    // Add subtle scroll to timeline
    const timelineWrapper = document.querySelector('.transformation-timeline-container');
    if (timelineWrapper) {
        setTimeout(() => {
            timelineWrapper.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 400);
    }
}

function triggerPhaseAnimation(phase) {
    const activeScene = document.querySelector('.office-scene.active');
    if (!activeScene) return;
    
    // Add entrance animation
    activeScene.style.transform = 'translateX(50px) scale(0.95)';
    activeScene.style.opacity = '0';
    
    setTimeout(() => {
        activeScene.style.transform = 'translateX(0) scale(1)';
        activeScene.style.opacity = '1';
    }, 100);
    
    // Phase-specific animations
    if (phase === 'before') {
        animateWorkerCards();
    } else if (phase === 'after') {
        animateAgentCards();
    }
}

function animateWorkerCards() {
    const workers = document.querySelectorAll('.human-worker');
    workers.forEach((worker, index) => {
        worker.style.transform = 'translateY(30px)';
        worker.style.opacity = '0';
        
        setTimeout(() => {
            worker.style.transform = 'translateY(0)';
            worker.style.opacity = '1';
        }, 200 + (index * 150));
    });
}

function animateAgentCards() {
    const agents = document.querySelectorAll('.ai-agent');
    agents.forEach((agent, index) => {
        agent.style.transform = 'translateY(30px) scale(0.9)';
        agent.style.opacity = '0';
        
        setTimeout(() => {
            agent.style.transform = 'translateY(0) scale(1)';
            agent.style.opacity = '1';
        }, 200 + (index * 150));
    });
}

function animateProcessSteps() {
    const steps = document.querySelectorAll('.step');
    
    // Reset all steps
    steps.forEach(step => {
        step.classList.remove('active');
        step.style.transform = 'scale(0.9)';
        step.style.opacity = '0.7';
    });
    
    // Animate steps in sequence
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.transform = 'scale(1)';
            step.style.opacity = '1';
            step.classList.add('active');
            
            // Remove active from previous step
            if (index > 0) {
                steps[index - 1].classList.remove('active');
            }
        }, index * 1500);
    });
}

function animateAgentStatus() {
    const statuses = document.querySelectorAll('.agent-status');
    statuses.forEach((status, index) => {
        setTimeout(() => {
            status.classList.add('online');
        }, 300 + (index * 200));
    });
}

// Initialize Timeline Interactions
function initializeTimeline() {
    // Add click handlers to timeline markers
    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const phase = marker.getAttribute('data-phase');
            if (phase) {
                showTimelinePhase(phase);
            }
        });
    });
    
    // Add hover effects to worker and agent cards
    const workers = document.querySelectorAll('.human-worker');
    workers.forEach(worker => {
        worker.addEventListener('mouseenter', () => {
            const role = worker.getAttribute('data-role');
            const salary = worker.getAttribute('data-salary');
            console.log(`💰 ${role}: ${salary}/year`);
            
            // Add pulse effect
            worker.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        worker.addEventListener('mouseleave', () => {
            worker.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const agents = document.querySelectorAll('.ai-agent');
    agents.forEach(agent => {
        agent.addEventListener('mouseenter', () => {
            const role = agent.getAttribute('data-role');
            const savings = agent.getAttribute('data-savings');
            console.log(`🤖 ${role}: Saves ${savings}/year`);
            
            // Add glow effect
            agent.style.transform = 'translateY(-8px) scale(1.02)';
            agent.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.4)';
        });
        
        agent.addEventListener('mouseleave', () => {
            agent.style.transform = 'translateY(0) scale(1)';
            agent.style.boxShadow = '';
        });
    });
    
    // Add click handler to Dr. G's profile for easter egg
    const drGProfile = document.querySelector('.dr-g-profile');
    if (drGProfile) {
        drGProfile.addEventListener('click', () => {
            console.log('🎖️ "Mission accomplished! Ready for your AI transformation?" - Dr. G');
            
            // Add special animation
            const leaderPhoto = document.querySelector('.leader-photo');
            if (leaderPhoto) {
                leaderPhoto.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    leaderPhoto.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }
        });
    }
}

// Enhanced timeline progression
function autoProgressTimeline() {
    let currentPhase = 0;
    const phases = ['before', 'during', 'after'];
    
    const interval = setInterval(() => {
        if (currentPhase < phases.length) {
            showTimelinePhase(phases[currentPhase]);
            currentPhase++;
        } else {
            clearInterval(interval);
            // Reset to beginning after showing all phases
            setTimeout(() => {
                showTimelinePhase('before');
            }, 3000);
        }
    }, 4000);
    
    // Stop auto-progression if user interacts
    const timelineContainer = document.querySelector('.transformation-timeline-container');
    if (timelineContainer) {
        timelineContainer.addEventListener('click', () => {
            clearInterval(interval);
        });
    }
}

function showMeetModal(type, title, description) {
    const modal = document.createElement('div');
    modal.className = 'meet-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeMeetModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>${description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="learnMore('${type}')">Learn More</button>
                    <button class="btn btn-secondary" onclick="closeMeetModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeMeetModal() {
    const modal = document.querySelector('.meet-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => document.body.removeChild(modal), 300);
    }
}

function learnMore(type) {
    console.log(`📚 Learning more about ${type}...`);
    closeMeetModal();
    scrollToForm();
}

function triggerTileAnimation(tileClass) {
    const tile = document.querySelector(`.${tileClass}`);
    if (tile) {
        tile.style.animation = 'tileSelect 1s ease';
        setTimeout(() => {
            tile.style.animation = '';
        }, 1000);
    }
}

// Enhanced Animation Keyframes (to be added via CSS)
const additionalCSS = `
@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}

@keyframes experienceSelect {
    0% { transform: scale(1); }
    50% { transform: scale(1.1) rotateY(10deg); }
    100% { transform: scale(1); }
}

@keyframes tileSelect {
    0% { transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1); }
    50% { transform: translateY(-20px) rotateX(10deg) rotateY(5deg) scale(1.05); }
    100% { transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1); }
}

@keyframes lightSweep {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.experience-modal, .meet-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.experience-modal.active, .meet-modal.active {
    opacity: 1;
}

.modal-content {
    background: white;
    border-radius: 20px;
    padding: 40px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.experience-modal.active .modal-content,
.meet-modal.active .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
}

.modal-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}
`;

// 3D Story Animation Controller - SCROLL-DRIVEN ANIMATIONS
function initialize3DStoryAnimations() {
    console.log('🎬 Initializing Scroll-Driven 3D Story Animations...');
    
    const scenes = document.querySelectorAll('.story-scene');
    const progressFill = document.getElementById('progressFill');
    
    if (!scenes.length) {
        console.log('❌ No story scenes found');
        return;
    }
    
    console.log(`🎬 Found ${scenes.length} story scenes`);
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    let activeScenes = new Set();
    
    // Track scroll direction
    function updateScrollDirection() {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
    }
    
    // Calculate scene progress based on scroll position
    function calculateSceneProgress(scene) {
        const rect = scene.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Scene is fully visible when it's centered
        const sceneCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        
        // Calculate progress (0 to 1)
        const distanceFromCenter = Math.abs(sceneCenter - windowCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        const progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        
        return {
            progress: progress,
            isVisible: rect.top < windowHeight && rect.bottom > 0,
            isActive: progress > 0.3
        };
    }
    
    // Apply scroll-based animations
    function handleScrollAnimations() {
        updateScrollDirection();
        
        scenes.forEach((scene, index) => {
            const sceneNumber = index + 1;
            const { progress, isVisible, isActive } = calculateSceneProgress(scene);
            
            // Update progress bar
            if (isActive && progressFill) {
                const progressPercent = (sceneNumber / scenes.length) * 100;
                progressFill.style.height = `${progressPercent}%`;
            }
            
            // Scene activation/deactivation
            if (isActive && !activeScenes.has(sceneNumber)) {
                activeScenes.add(sceneNumber);
                scene.classList.add('active');
                triggerSceneAnimations(sceneNumber, scrollDirection, progress);
                addVisualEffects(scene);
                console.log(`🎬 Scene ${sceneNumber} activated (${scrollDirection})`);
            } else if (!isActive && activeScenes.has(sceneNumber)) {
                activeScenes.delete(sceneNumber);
                scene.classList.remove('active');
                reverseSceneAnimations(sceneNumber);
                console.log(`🎬 Scene ${sceneNumber} deactivated`);
            }
            
            // Update animation progress for active scenes
            if (activeScenes.has(sceneNumber) && isVisible) {
                updateAnimationProgress(sceneNumber, progress, scrollDirection);
            }
        });
    }
    
    // Throttled scroll handler for performance
    let scrollTimeout;
    function onScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(handleScrollAnimations, 16); // ~60fps
    }
    
    // Set up scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    handleScrollAnimations();
    
    // Add continuous sparkles for active scenes
    setInterval(() => {
        addRandomSparkles();
    }, 3000);
}

function triggerSceneAnimations(sceneNumber, direction = 'down', progress = 1) {
    const scene = document.querySelector(`[data-scene="${sceneNumber}"]`);
    if (!scene) {
        console.log(`❌ Scene ${sceneNumber} not found`);
        return;
    }
    
    console.log(`🎬 Triggering animations for scene ${sceneNumber} (${direction}, progress: ${progress.toFixed(2)})`);
    
    switch(sceneNumber) {
        case 1:
            animatePhoneScene(scene, direction, progress);
            break;
        case 2:
            animateAIBrainScene(scene, direction, progress);
            break;
        case 3:
            animateContractScene(scene, direction, progress);
            break;
        case 4:
            animateHouseScene(scene, direction, progress);
            break;
    }
}

function reverseSceneAnimations(sceneNumber) {
    const scene = document.querySelector(`[data-scene="${sceneNumber}"]`);
    if (!scene) return;
    
    console.log(`🎬 Reversing animations for scene ${sceneNumber}`);
    
    // Pause all animations and set to reverse
    const animatedElements = scene.querySelectorAll('*');
    animatedElements.forEach(element => {
        if (element.style.animation) {
            element.style.animationDirection = 'reverse';
            element.style.animationFillMode = 'backwards';
        }
    });
}

function updateAnimationProgress(sceneNumber, progress, direction) {
    const scene = document.querySelector(`[data-scene="${sceneNumber}"]`);
    if (!scene) return;
    
    // Apply transform and opacity based on scroll progress
    const container = scene.querySelector('.scene-3d-container');
    if (container) {
        const translateY = direction === 'down' ? 
            (1 - progress) * 50 : 
            progress * -50;
        
        const rotateX = direction === 'down' ? 
            (1 - progress) * 15 : 
            progress * -15;
        
        const opacity = Math.max(0.3, progress);
        
        container.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg)`;
        container.style.opacity = opacity;
    }
    
    // Update animation speed based on scroll progress
    const animatedElements = scene.querySelectorAll('*');
    animatedElements.forEach(element => {
        if (element.style.animation) {
            const baseSpeed = direction === 'down' ? 1 : 0.5;
            const speed = baseSpeed * (0.5 + progress * 0.5);
            element.style.animationDuration = `${2 / speed}s`;
            element.style.animationDirection = direction === 'down' ? 'normal' : 'reverse';
        }
    });
}

function animatePhoneScene(scene, direction = 'down', progress = 1) {
    console.log(`📱 Starting phone scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const phone = scene.querySelector('.phone-mockup');
    const calendarDay = scene.querySelector('.calendar-day.selected');
    const timeSlot = scene.querySelector('.time-slot.active');
    const bookButton = scene.querySelector('.book-button');
    const floatingIcons = scene.querySelectorAll('.floating-icon');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.7;
    
    // Phone animations with scroll-responsive transforms
    if (phone) {
        const baseTransform = 'rotateY(-15deg) rotateX(5deg)';
        const scrollTransform = direction === 'down' ? 
            `${baseTransform} scale(${0.8 + progress * 0.2}) translateZ(${progress * 20}px)` :
            `${baseTransform} scale(${1 - progress * 0.2}) translateZ(${-progress * 20}px)`;
        
        phone.style.animation = `phoneFloat ${4 / speedMultiplier}s ease-in-out infinite ${animDirection}`;
        phone.style.transform = scrollTransform;
        console.log(`📱 Phone animation: ${direction}`);
    }
    
    // Calendar day pulsing with dynamic intensity
    if (calendarDay) {
        const pulseSpeed = 1.5 / speedMultiplier;
        calendarDay.style.animation = `calendarPulse ${pulseSpeed}s ease-in-out infinite ${animDirection}`;
        calendarDay.style.opacity = 0.7 + progress * 0.3;
        console.log(`📅 Calendar pulse: ${direction}`);
    }
    
    // Time slot glowing with scroll responsiveness
    if (timeSlot) {
        const glowSpeed = 1.5 / speedMultiplier;
        timeSlot.style.animation = `timeSlotGlow ${glowSpeed}s ease-in-out infinite ${animDirection}`;
        timeSlot.style.opacity = 0.8 + progress * 0.2;
        console.log(`⏰ Time slot glow: ${direction}`);
    }
    
    // Book button with enhanced effects
    if (bookButton) {
        const buttonSpeed = 2 / speedMultiplier;
        bookButton.style.animation = `buttonGlow ${buttonSpeed}s ease-in-out infinite ${animDirection}`;
        bookButton.style.transform = `scale(${0.95 + progress * 0.05})`;
        console.log(`🔘 Button glow: ${direction}`);
    }
    
    // Floating icons with staggered entrance/exit
    floatingIcons.forEach((icon, index) => {
        const delay = direction === 'down' ? index * 200 : (floatingIcons.length - index) * 200;
        const iconProgress = Math.max(0, Math.min(1, (progress - index * 0.1) * 1.5));
        
        setTimeout(() => {
            icon.style.animation = `floatIcon ${3 / speedMultiplier}s ease-in-out infinite ${animDirection}`;
            icon.style.opacity = iconProgress;
            icon.style.transform = `scale(${0.5 + iconProgress * 0.5}) translateY(${(1 - iconProgress) * 30}px)`;
            console.log(`✨ Floating icon ${index + 1}: ${direction}`);
        }, delay);
    });
}

function animateAIBrainScene(scene, direction = 'down', progress = 1) {
    console.log(`💻 Starting AI computer scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const aiComputer = scene.querySelector('.ai-computer');
    const computerMonitor = scene.querySelector('.computer-monitor');
    const taskLines = scene.querySelectorAll('.task-line');
    const progressBar = scene.querySelector('.progress-bar');
    const windowButtons = scene.querySelectorAll('.btn-dot');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.8;
    
    // Computer monitor glow with dynamic intensity
    if (computerMonitor) {
        const glowIntensity = 0.8 + progress * 0.3;
        const scaleValue = 0.85 + progress * 0.15;
        computerMonitor.style.transform = `scale(${scaleValue})`;
        computerMonitor.style.filter = `brightness(${glowIntensity}) contrast(${1 + progress * 0.2})`;
        console.log(`💻 Computer monitor: ${direction}`);
    }
    
    // Task lines with staggered typing effect
    taskLines.forEach((taskLine, index) => {
        const typeSpeed = 3 / speedMultiplier;
        const taskProgress = Math.max(0, Math.min(1, (progress - index * 0.15) * 2));
        const delay = direction === 'down' ? index * 0.3 : (taskLines.length - index) * 0.3;
        
        taskLine.style.animation = `taskProgress ${typeSpeed}s ease-in-out infinite ${animDirection}`;
        taskLine.style.animationDelay = `${delay}s`;
        taskLine.style.opacity = taskProgress;
        taskLine.style.transform = `translateX(${(1-taskProgress) * -20}px)`;
        console.log(`📝 Task ${index + 1}: ${direction}`);
    });
    
    // Progress bar animation
    if (progressBar) {
        const progressSpeed = 2 / speedMultiplier;
        const barProgress = Math.max(0.1, progress);
        
        progressBar.style.animation = `progressFlow ${progressSpeed}s ease-in-out infinite ${animDirection}`;
        progressBar.style.width = `${barProgress * 100}%`;
        console.log(`📊 Progress bar: ${direction}`);
    }
    
    // Window buttons blinking
    windowButtons.forEach((button, index) => {
        const blinkSpeed = 2 / speedMultiplier;
        const buttonProgress = Math.max(0.3, progress);
        const delay = direction === 'down' ? index * 0.2 : (windowButtons.length - index) * 0.2;
        
        button.style.animation = `buttonBlink ${blinkSpeed}s ease-in-out infinite ${animDirection}`;
        button.style.animationDelay = `${delay}s`;
        button.style.opacity = buttonProgress;
        console.log(`🔴 Button ${index + 1}: ${direction}`);
    });
}

function animateContractScene(scene, direction = 'down', progress = 1) {
    console.log(`📄 Starting contract scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const contractScene = scene.querySelector('.contract-scene');
    const signature = scene.querySelector('.signature');
    const checkmark = scene.querySelector('.checkmark');
    const handshake = scene.querySelector('.handshake');
    const confetti = scene.querySelectorAll('.confetti');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.6;
    
    // Contract floating with rotation based on scroll
    if (contractScene) {
        const floatSpeed = 4 / speedMultiplier;
        const rotateValue = direction === 'down' ? progress * 5 : -progress * 5;
        const scaleValue = 0.8 + progress * 0.2;
        
        contractScene.style.animation = `contractFloat ${floatSpeed}s ease-in-out infinite ${animDirection}`;
        contractScene.style.transform = `rotateY(-10deg) rotateX(10deg) rotateZ(${rotateValue}deg) scale(${scaleValue})`;
        console.log(`📄 Contract floating: ${direction}`);
    }
    
    // Signature writing with progress-based visibility
    if (signature) {
        const writeSpeed = 4 / speedMultiplier;
        const signatureProgress = Math.max(0, Math.min(1, (progress - 0.3) * 2));
        
        signature.style.animation = `signatureWrite ${writeSpeed}s ease-in-out infinite ${animDirection}`;
        signature.style.opacity = signatureProgress;
        signature.style.transform = `scaleX(${direction === 'down' ? signatureProgress : 1 - signatureProgress})`;
        console.log(`✍️ Signature writing: ${direction}`);
    }
    
    // Checkmark with delayed appearance
    if (checkmark) {
        const checkSpeed = 4 / speedMultiplier;
        const checkProgress = Math.max(0, Math.min(1, (progress - 0.6) * 3));
        
        checkmark.style.animation = `checkmarkAppear ${checkSpeed}s ease-in-out infinite ${animDirection}`;
        checkmark.style.opacity = checkProgress;
        checkmark.style.transform = `scale(${checkProgress}) rotate(${direction === 'down' ? 0 : -180}deg)`;
        console.log(`✅ Checkmark: ${direction}`);
    }
    
    // Handshake with enhanced movement
    if (handshake) {
        const shakeSpeed = 3 / speedMultiplier;
        const shakeProgress = Math.max(0.3, progress);
        
        handshake.style.animation = `handshakeMove ${shakeSpeed}s ease-in-out infinite ${animDirection}`;
        handshake.style.opacity = shakeProgress;
        handshake.style.transform = `scale(${0.7 + shakeProgress * 0.3}) rotate(${direction === 'down' ? progress * 10 : -progress * 10}deg)`;
        console.log(`🤝 Handshake: ${direction}`);
    }
    
    // Confetti with staggered timing and reverse fall
    confetti.forEach((piece, index) => {
        const fallSpeed = 4 / speedMultiplier;
        const confettiProgress = Math.max(0, Math.min(1, (progress - 0.7) * 4));
        const delay = direction === 'down' ? index * 0.5 : (confetti.length - index) * 0.5;
        
        piece.style.animation = `confettiFall ${fallSpeed}s ease-in-out infinite ${animDirection}`;
        piece.style.animationDelay = `${delay}s`;
        piece.style.opacity = confettiProgress;
        
        if (direction === 'up') {
            piece.style.transform = `translateY(${(1 - confettiProgress) * -200}px) rotate(${-confettiProgress * 360}deg)`;
        }
        
        console.log(`🎉 Confetti piece ${index + 1}: ${direction}`);
    });
}

function animateHouseScene(scene, direction = 'down', progress = 1) {
    console.log(`🏠 Starting house scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const houseExterior = scene.querySelector('.house-exterior');
    const personAvatar = scene.querySelector('.person-avatar');
    const coffeeCup = scene.querySelector('.coffee-cup');
    const houseKeys = scene.querySelector('.house-keys');
    const successMetrics = scene.querySelectorAll('.metric');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.7;
    
    // House floating with enhanced 3D effects
    if (houseExterior) {
        const floatSpeed = 5 / speedMultiplier;
        const houseProgress = Math.max(0.5, progress);
        const rotateY = direction === 'down' ? 20 + progress * 10 : 30 - progress * 10;
        
        houseExterior.style.animation = `houseFloat ${floatSpeed}s ease-in-out infinite ${animDirection}`;
        houseExterior.style.transform = `rotateY(${rotateY}deg) rotateX(-5deg) scale(${0.7 + houseProgress * 0.3})`;
        houseExterior.style.opacity = houseProgress;
        console.log(`🏠 House floating: ${direction}`);
    }
    
    // Happy person with excitement level based on progress
    if (personAvatar) {
        const happySpeed = 2.5 / speedMultiplier;
        const happyProgress = Math.max(0, Math.min(1, (progress - 0.2) * 1.5));
        
        personAvatar.style.animation = `personHappy ${happySpeed}s ease-in-out infinite ${animDirection}`;
        personAvatar.style.opacity = happyProgress;
        personAvatar.style.transform = `scale(${0.6 + happyProgress * 0.4}) rotate(${direction === 'down' ? happyProgress * 8 : -happyProgress * 8}deg)`;
        console.log(`😊 Happy person: ${direction}`);
    }
    
    // Coffee cup with steam effect
    if (coffeeCup) {
        const coffeeSpeed = 3.5 / speedMultiplier;
        const coffeeProgress = Math.max(0, Math.min(1, (progress - 0.4) * 2));
        
        coffeeCup.style.animation = `relaxationFloat ${coffeeSpeed}s ease-in-out infinite ${animDirection}`;
        coffeeCup.style.opacity = coffeeProgress;
        coffeeCup.style.transform = `scale(${0.5 + coffeeProgress * 0.5}) translateY(${(1 - coffeeProgress) * 20}px)`;
        console.log(`☕ Coffee floating: ${direction}`);
    }
    
    // House keys with jingling effect
    if (houseKeys) {
        const keysSpeed = 3.5 / speedMultiplier;
        const keysProgress = Math.max(0, Math.min(1, (progress - 0.6) * 2));
        const delay = direction === 'down' ? 0.5 : 0;
        
        houseKeys.style.animation = `relaxationFloat ${keysSpeed}s ease-in-out infinite ${animDirection}`;
        houseKeys.style.animationDelay = `${delay}s`;
        houseKeys.style.opacity = keysProgress;
        houseKeys.style.transform = `scale(${0.5 + keysProgress * 0.5}) rotate(${direction === 'down' ? keysProgress * 15 : -keysProgress * 15}deg)`;
        console.log(`🗝️ Keys floating: ${direction}`);
    }
    
    // Success metrics with count-up effect
    successMetrics.forEach((metric, index) => {
        const metricProgress = Math.max(0, Math.min(1, (progress - 0.8) * 5));
        const delay = direction === 'down' ? index * 0.3 : (successMetrics.length - index) * 0.3;
        
        setTimeout(() => {
            metric.style.opacity = metricProgress;
            metric.style.transform = `scale(${0.7 + metricProgress * 0.3}) translateY(${(1 - metricProgress) * 30}px)`;
            
            // Animate the metric values
            const valueElement = metric.querySelector('.metric-value');
            if (valueElement && metricProgress > 0.5) {
                valueElement.style.animation = `pulse 2s ease-in-out infinite`;
            }
        }, delay * 1000);
        
        console.log(`📊 Success metric ${index + 1}: ${direction}`);
    });
}

function addVisualEffects(scene) {
    // Add extra sparkle effects
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.position = 'absolute';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.right = '0';
    sparkleContainer.style.bottom = '0';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '10';
    
    scene.style.position = 'relative';
    scene.appendChild(sparkleContainer);
    
    // Create sparkles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(sparkleContainer);
        }, i * 1000);
    }
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '20px';
    sparkle.style.opacity = '0';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animation = 'sparkleFloat 3s ease-in-out forwards';
    sparkle.style.pointerEvents = 'none';
    
    // Add sparkle keyframes if not already added
    if (!document.querySelector('#sparkleKeyframes')) {
        const style = document.createElement('style');
        style.id = 'sparkleKeyframes';
        style.textContent = `
            @keyframes sparkleFloat {
                0% { opacity: 0; transform: translateY(0px) scale(0); }
                10% { opacity: 1; transform: translateY(0px) scale(1); }
                90% { opacity: 1; transform: translateY(-50px) scale(1); }
                100% { opacity: 0; transform: translateY(-100px) scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 3000);
}

function addRandomSparkles() {
    const scenes = document.querySelectorAll('.story-scene');
    scenes.forEach(scene => {
        const sparkleContainer = scene.querySelector('.sparkle-container');
        if (sparkleContainer) {
            createSparkle(sparkleContainer);
        }
    });
}

// Section-specific scroll animations
function animateHeroSection(section, direction, progress, isActive) {
    const heroText = section.querySelector('.hero-text');
    const heroVisual = section.querySelector('.hero-visual');
    const heroStats = section.querySelectorAll('.stat');
    
    if (!isActive) return;
    
    console.log(`🦸 Hero section: ${direction} (${progress.toFixed(2)})`);
    
    // Text animations
    if (heroText) {
        const translateY = direction === 'down' ? 
            (1 - progress) * 30 : 
            progress * -30;
        
        const opacity = Math.max(0.3, progress);
        
        heroText.style.transform = `translateY(${translateY}px)`;
        heroText.style.opacity = opacity;
        heroText.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Visual animations
    if (heroVisual) {
        const scale = 0.8 + progress * 0.2;
        const rotateY = direction === 'down' ? 
            progress * 5 : 
            -progress * 5;
        
        heroVisual.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
        heroVisual.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Stats animation
    heroStats.forEach((stat, index) => {
        const delay = direction === 'down' ? index * 0.1 : (heroStats.length - index) * 0.1;
        const statProgress = Math.max(0, Math.min(1, (progress - delay) * 1.5));
        
        setTimeout(() => {
            stat.style.opacity = statProgress;
            stat.style.transform = `scale(${0.8 + statProgress * 0.2}) translateY(${(1 - statProgress) * 20}px)`;
            stat.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 100);
    });
}

function animateResultsSection(section, direction, progress, isActive) {
    const resultCards = section.querySelectorAll('.result-card');
    const sectionHeader = section.querySelector('.section-header');
    
    if (!isActive) return;
    
    console.log(`📊 Results section: ${direction} (${progress.toFixed(2)})`);
    
    // Section header animation
    if (sectionHeader) {
        const headerY = direction === 'down' ? 
            (1 - progress) * 40 : 
            progress * -40;
        
        sectionHeader.style.transform = `translateY(${headerY}px)`;
        sectionHeader.style.opacity = Math.max(0.2, progress);
        sectionHeader.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Result cards staggered animation
    resultCards.forEach((card, index) => {
        const delay = direction === 'down' ? index * 0.15 : (resultCards.length - index) * 0.15;
        const cardProgress = Math.max(0, Math.min(1, (progress - delay) * 1.2));
        
        setTimeout(() => {
            const translateY = (1 - cardProgress) * 60;
            const scale = 0.85 + cardProgress * 0.15;
            const rotateX = direction === 'down' ? 
                (1 - cardProgress) * 15 : 
                cardProgress * -15;
            
            card.style.transform = `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
            card.style.opacity = cardProgress;
            card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Animate the icon
            const icon = card.querySelector('.result-icon');
            if (icon && cardProgress > 0.5) {
                icon.style.animation = `pulse 2s ease-in-out infinite`;
            }
        }, delay * 150);
    });
}

function animateFormSection(section, direction, progress, isActive) {
    const formContainer = section.querySelector('.form-container');
    const formGroups = section.querySelectorAll('.form-group');
    const trustItems = section.querySelectorAll('.trust-item');
    
    if (!isActive) return;
    
    console.log(`📝 Form section: ${direction} (${progress.toFixed(2)})`);
    
    // Form container animation
    if (formContainer) {
        const containerScale = 0.9 + progress * 0.1;
        const containerY = direction === 'down' ? 
            (1 - progress) * 50 : 
            progress * -50;
        
        formContainer.style.transform = `translateY(${containerY}px) scale(${containerScale})`;
        formContainer.style.opacity = Math.max(0.4, progress);
        formContainer.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Form groups staggered entrance
    formGroups.forEach((group, index) => {
        const delay = direction === 'down' ? index * 0.08 : (formGroups.length - index) * 0.08;
        const groupProgress = Math.max(0, Math.min(1, (progress - delay) * 1.3));
        
        setTimeout(() => {
            const translateX = direction === 'down' ? 
                (1 - groupProgress) * 30 : 
                groupProgress * -30;
            
            group.style.transform = `translateX(${translateX}px)`;
            group.style.opacity = groupProgress;
            group.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 100);
    });
    
    // Trust items animation
    trustItems.forEach((item, index) => {
        const delay = direction === 'down' ? index * 0.2 : (trustItems.length - index) * 0.2;
        const itemProgress = Math.max(0, Math.min(1, (progress - 0.6 - delay) * 2));
        
        setTimeout(() => {
            item.style.opacity = itemProgress;
            item.style.transform = `scale(${0.8 + itemProgress * 0.2})`;
            item.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 200);
    });
}

function animateFinalCTA(section, direction, progress, isActive) {
    const ctaContent = section.querySelector('.cta-content');
    const urgencyItems = section.querySelectorAll('.urgency-item');
    const finalButton = section.querySelector('.final-cta-button');
    
    if (!isActive) return;
    
    console.log(`🚀 Final CTA: ${direction} (${progress.toFixed(2)})`);
    
    // CTA content animation
    if (ctaContent) {
        const contentScale = 0.85 + progress * 0.15;
        const rotateZ = direction === 'down' ? 
            (1 - progress) * 3 : 
            progress * -3;
        
        ctaContent.style.transform = `scale(${contentScale}) rotateZ(${rotateZ}deg)`;
        ctaContent.style.opacity = Math.max(0.3, progress);
        ctaContent.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Urgency items with wave effect
    urgencyItems.forEach((item, index) => {
        const delay = direction === 'down' ? index * 0.2 : (urgencyItems.length - index) * 0.2;
        const itemProgress = Math.max(0, Math.min(1, (progress - delay) * 1.4));
        
        setTimeout(() => {
            const translateY = (1 - itemProgress) * 40;
            const rotateY = direction === 'down' ? 
                (1 - itemProgress) * 15 : 
                itemProgress * -15;
            
            item.style.transform = `translateY(${translateY}px) rotateY(${rotateY}deg)`;
            item.style.opacity = itemProgress;
            item.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 200);
    });
    
    // Final button dramatic entrance
    if (finalButton && progress > 0.7) {
        const buttonProgress = (progress - 0.7) / 0.3;
        const buttonScale = 0.8 + buttonProgress * 0.2;
        const buttonGlow = buttonProgress * 100;
        
        finalButton.style.transform = `scale(${buttonScale})`;
        finalButton.style.boxShadow = `0 0 ${buttonGlow}px rgba(0, 212, 255, 0.6)`;
        finalButton.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
}

function animateScrollElements(direction) {
    // Update global scroll progress bar
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        
        // Change color based on section
        if (scrollPercent < 25) {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--accent-color))';
        } else if (scrollPercent < 50) {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--accent-color), var(--creative-purple))';
        } else if (scrollPercent < 75) {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--creative-purple), var(--success-color))';
        } else {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--success-color), var(--warning-color))';
        }
    }
    
    // Animate navbar on scroll with enhanced effects
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrolled = window.scrollY > 50;
        const scrollProgress = Math.min(1, window.scrollY / 500);
        
        navbar.style.background = scrolled ? 
            `linear-gradient(135deg, rgba(26, 26, 46, ${0.98 + scrollProgress * 0.02}), rgba(22, 33, 62, ${0.95 + scrollProgress * 0.05}), rgba(26, 26, 46, ${0.99}))` : 
            'linear-gradient(135deg, rgba(26, 26, 46, 0.98), rgba(22, 33, 62, 0.95), rgba(26, 26, 46, 0.98))';
        navbar.style.backdropFilter = `blur(${20 + scrollProgress * 10}px)`;
        navbar.style.boxShadow = scrolled ? 
            `0 4px 30px rgba(0, 212, 255, ${0.15 + scrollProgress * 0.05}), 0 12px 48px rgba(26, 26, 46, ${0.6 + scrollProgress * 0.1}), inset 0 1px 0 rgba(0, 212, 255, ${0.15})` :
            '0 2px 20px rgba(0, 212, 255, 0.15), 0 8px 32px rgba(26, 26, 46, 0.4), inset 0 1px 0 rgba(0, 212, 255, 0.1)';
        navbar.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        navbar.style.borderBottom = '1px solid var(--electric-blue)';
    }
    
    // Lead counter responsive to scroll with acceleration
    const leadCounter = document.getElementById('leadCounter');
    if (leadCounter) {
        const scrollProgress = Math.min(1, window.scrollY / 1000);
        const baseValue = 247;
        const maxIncrement = 73; // Reaches 320 at full scroll
        const counterValue = baseValue + Math.floor(scrollProgress * maxIncrement);
        
        if (direction === 'down') {
            leadCounter.textContent = counterValue;
            
            // Add flash effect when incrementing
            if (parseInt(leadCounter.textContent) !== counterValue) {
                leadCounter.style.color = '#00d4ff';
                leadCounter.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
                leadCounter.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    leadCounter.style.color = '';
                    leadCounter.style.textShadow = '';
                    leadCounter.style.transform = 'scale(1)';
                }, 200);
            }
        }
    }
    
    // Add subtle page tilt effect based on scroll direction
    const body = document.body;
    if (body) {
        const tiltAmount = direction === 'down' ? 0.2 : -0.2;
        body.style.transform = `perspective(2000px) rotateX(${tiltAmount}deg)`;
        body.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Reset tilt after scroll stops
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            body.style.transform = 'perspective(2000px) rotateX(0deg)';
        }, 100);
    }
}

// Lead counter animation
function animateLeadCounter() {
    const counter = document.getElementById('leadCounter');
    if (!counter) return;
    
    let current = 247;
    const increment = () => {
        current++;
        counter.textContent = current;
        
        // Flash effect
        counter.style.color = '#00d4ff';
        counter.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
        
        setTimeout(() => {
            counter.style.color = '';
            counter.style.textShadow = '';
        }, 200);
    };
    
    // Increment every 3-8 seconds
    setInterval(increment, 3000 + Math.random() * 5000);
}

// Form validation and submission
function initializeFormValidation() {
    const form = document.getElementById('leadForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Handle multiple checkbox values for serviceType
        const serviceTypeCheckboxes = form.querySelectorAll('input[name="serviceType"]:checked');
        const serviceTypes = Array.from(serviceTypeCheckboxes).map(cb => cb.value);
        
        // Validate that at least one service type is selected
        if (serviceTypes.length === 0) {
            alert('Please select at least one service type (Consultation or Implementation).');
            return;
        }
        
        // Add timestamp and source info
        const submissionData = {
            ...data,
            serviceType: serviceTypes, // Array of selected service types
            timestamp: new Date().toISOString(),
            source: 'MWAAI Landing Page',
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct'
        };
        
        console.log('📧 Form submitted:', submissionData);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;
        
        try {
            // Send webhook request
            await sendWebhook(submissionData);
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
            
            console.log('✅ Form processed successfully');
        } catch (error) {
            console.error('❌ Form submission error:', error);
            
            // Show error message
            showErrorModal(error.message);
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Webhook Configuration - UPDATE THIS URL WITH YOUR WEBHOOK ENDPOINT
const WEBHOOK_URL = 'https://your-webhook-url.com/webhook'; // 👈 CHANGE THIS TO YOUR WEBHOOK URL

// Send form data to webhook
async function sendWebhook(data) {
    if (!WEBHOOK_URL || WEBHOOK_URL === 'https://your-webhook-url.com/webhook') {
        throw new Error('Webhook URL not configured. Please update WEBHOOK_URL in script.js');
    }
    
    const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    return await response.json().catch(() => ({})); // Return empty object if no JSON response
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Close modal when clicking X or outside
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => modal.style.display = 'none';
        
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            modal.style.display = 'none';
        }, 10000);
    }
}

function showErrorModal(errorMessage) {
    // Create error modal if it doesn't exist
    let modal = document.getElementById('errorModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'errorModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>❌ Submission Failed</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p id="errorMessage"></p>
                    <p><strong>Please try again or contact support.</strong></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update error message
    const errorMsgElement = modal.querySelector('#errorMessage');
    if (errorMsgElement) {
        errorMsgElement.textContent = errorMessage;
    }
    
    modal.style.display = 'block';
    
    // Close modal when clicking X or outside
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Auto-close after 15 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 15000);
}

// Global Scroll Effects with Direction Awareness
function initializeScrollEffects() {
    console.log('🎬 Initializing Global Scroll Animations...');
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    let ticking = false;
    
    // All sections that should have scroll animations
    const animatedSections = [
        '.hero',
        '.results-section', 
        '.form-section',
        '.final-cta',
        '.ai-story-section'
    ];
    
    // Track scroll direction
    function updateScrollDirection() {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
    }
    
    // Calculate element visibility and progress
    function calculateElementProgress(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Element center position relative to viewport center
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Calculate progress (0 to 1) based on distance from viewport center
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        const progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        
        return {
            progress: progress,
            isVisible: rect.top < windowHeight && rect.bottom > 0,
            isActive: progress > 0.2,
            inViewport: rect.top >= 0 && rect.bottom <= windowHeight
        };
    }
    
    // Apply scroll-based animations to elements
    function applyScrollAnimations() {
        updateScrollDirection();
        
        animatedSections.forEach(sectionSelector => {
            const section = document.querySelector(sectionSelector);
            if (!section) return;
            
            const { progress, isVisible, isActive } = calculateElementProgress(section);
            
            // Apply section-specific animations
            switch(sectionSelector) {
                case '.hero':
                    animateHeroSection(section, scrollDirection, progress, isActive);
                    break;
                case '.results-section':
                    animateResultsSection(section, scrollDirection, progress, isActive);
                    break;
                case '.form-section':
                    animateFormSection(section, scrollDirection, progress, isActive);
                    break;
                case '.final-cta':
                    animateFinalCTA(section, scrollDirection, progress, isActive);
                    break;
            }
        });
        
        // Animate individual elements
        animateScrollElements(scrollDirection);
    }
    
    // Throttled scroll handler
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                applyScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Set up scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial animation state
    applyScrollAnimations();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// General animations initialization
function initializeAnimations() {
    console.log('🎨 Initializing general animations...');
    
    // Set initial states for elements that will be animated by scroll
    const elementsToAnimate = [
        '.result-card',
        '.form-container', 
        '.urgency-item',
        '.stat',
        '.hero-text',
        '.hero-visual'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            // Set initial state - elements start slightly hidden/offset
            el.style.opacity = '0.3';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
    
    // Add subtle parallax effect to background elements
    const parallaxElements = document.querySelectorAll('.ai-story-section::before');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
            const rate = scrolled * -0.5;
            el.style.transform = `translateY(${rate}px)`;
        });
    }, { passive: true });
    
    console.log('✅ General animations initialized');
}

// Utility functions
function scrollToForm() {
    const form = document.getElementById('get-started');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function triggerAICall() {
    alert('🤖 AI Demo Call activated! Our system will call you within 90 seconds.');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.error);
});

console.log('🎯 MWAAI JavaScript loaded successfully!'); 

// Enhanced Journey Timeline Functionality
function initializeJourneyTimeline() {
    console.log('🚀 Initializing Enhanced Journey Timeline...');
    
    const timeline = document.getElementById('journeyTimeline');
    const stages = document.querySelectorAll('.journey-stage');
    const progressFill = document.getElementById('journeyProgressFill');
    
    if (!timeline || !stages.length) {
        console.log('⚠️ Journey timeline elements not found');
        return;
    }
    
    // Create timeline navigation dots
    createTimelineNavigation(stages);
    
    // Initialize scroll-based progression
    initializeScrollProgression(timeline, stages, progressFill);
    
    // Add click interactions to stages
    addStageClickInteractions(stages);
    
    // Initialize energy bar animations
    initializeEnergyBarAnimations(stages);
    
    console.log('✅ Journey Timeline Enhanced!');
}

function createTimelineNavigation(stages) {
    const navigation = document.createElement('div');
    navigation.className = 'timeline-navigation';
    
    stages.forEach((stage, index) => {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.setAttribute('data-stage', index + 1);
        dot.setAttribute('data-stage-name', stage.querySelector('h3').textContent);
        
        dot.addEventListener('click', () => {
            scrollToStage(stage);
            updateActiveStage(stages, index + 1);
        });
        
        navigation.appendChild(dot);
    });
    
    document.body.appendChild(navigation);
}

function initializeScrollProgression(timeline, stages, progressFill) {
    let currentStage = 1;
    let isScrolling = false;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };
    
    const stageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stageNumber = parseInt(entry.target.getAttribute('data-stage'));
                if (stageNumber !== currentStage) {
                    currentStage = stageNumber;
                    updateActiveStage(stages, stageNumber);
                    updateProgressBar(progressFill, stageNumber, stages.length);
                    animateStageActivation(entry.target);
                }
            }
        });
    }, observerOptions);
    
    stages.forEach(stage => {
        stageObserver.observe(stage);
    });
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                updateProgressOnScroll(timeline, progressFill, stages);
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

function updateActiveStage(stages, activeStageNumber) {
    stages.forEach((stage, index) => {
        const stageNumber = index + 1;
        const isActive = stageNumber === activeStageNumber;
        
        stage.classList.toggle('active', isActive);
        
        // Update navigation dots
        const dot = document.querySelector(`.timeline-dot[data-stage="${stageNumber}"]`);
        if (dot) {
            dot.classList.toggle('active', isActive);
        }
        
        // Animate energy bar
        if (isActive) {
            animateEnergyBar(stage, stageNumber);
        }
    });
}

function updateProgressBar(progressFill, currentStage, totalStages) {
    const progress = (currentStage - 1) / (totalStages - 1);
    progressFill.style.transform = `scaleX(${progress})`;
}

function updateProgressOnScroll(timeline, progressFill, stages) {
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;
    const viewportHeight = window.innerHeight;
    
    // Calculate overall progress through the timeline
    const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight - timelineTop) / (timelineHeight + viewportHeight)
    ));
    
    progressFill.style.transform = `scaleX(${scrollProgress})`;
}

function animateStageActivation(stage) {
    // Add entrance animation
    stage.style.animation = 'none';
    stage.offsetHeight; // Trigger reflow
    stage.style.animation = 'stageActivate 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    
    // Animate customer quote
    const quote = stage.querySelector('.customer-quote');
    if (quote) {
        quote.style.animation = 'quoteSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both';
    }
    
    // Animate tags
    const tags = stage.querySelectorAll('.pain-points span, .trigger-moments span, .agent-activities span, .momentum-results span, .achievement-state span');
    tags.forEach((tag, index) => {
        tag.style.animation = `tagPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.1}s both`;
    });
}

function addStageClickInteractions(stages) {
    stages.forEach((stage, index) => {
        stage.addEventListener('click', () => {
            // Smooth scroll to stage
            scrollToStage(stage);
            
            // Add click effect
            addClickEffect(stage);
            
            // Log interaction
            console.log(`🎯 Stage ${index + 1} clicked: ${stage.querySelector('h3').textContent}`);
        });
        
        // Add hover effects
        stage.addEventListener('mouseenter', () => {
            stage.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        stage.addEventListener('mouseleave', () => {
            if (!stage.classList.contains('active')) {
                stage.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

function scrollToStage(stage) {
    const offset = 120; // Account for fixed header
    const stageTop = stage.offsetTop - offset;
    
    window.scrollTo({
        top: stageTop,
        behavior: 'smooth'
    });
}

function addClickEffect(stage) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'stage-ripple';
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10;
        animation: rippleExpand 0.6s ease-out;
    `;
    
    stage.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeEnergyBarAnimations(stages) {
    stages.forEach((stage, index) => {
        const energyBar = stage.querySelector('.energy-fill');
        if (energyBar) {
            // Set initial width based on stage
            const energyLevels = [20, 40, 60, 80, 100];
            energyBar.style.width = `${energyLevels[index]}%`;
        }
    });
}

function animateEnergyBar(stage, stageNumber) {
    const energyBar = stage.querySelector('.energy-fill');
    if (!energyBar) return;
    
    // Animate energy bar fill
    const energyLevels = [20, 40, 60, 80, 100];
    const targetLevel = energyLevels[stageNumber - 1];
    
    energyBar.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
    energyBar.style.width = `${targetLevel}%`;
    
    // Add pulse effect
    energyBar.style.animation = 'energyPulse 0.6s ease-out';
    
    setTimeout(() => {
        energyBar.style.animation = '';
    }, 600);
}

// Add CSS animations dynamically
function addTimelineAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes stageActivate {
            0% {
                opacity: 0.6;
                transform: translateY(30px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes quoteSlideIn {
            0% {
                opacity: 0;
                transform: translateX(-20px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes tagPopIn {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(10px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes rippleExpand {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        
        @keyframes energyPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(0, 255, 136, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(0, 255, 136, 0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced timeline initialization
function initializeTimeline() {
    // Add timeline animations
    addTimelineAnimations();
    
    // Initialize enhanced journey timeline
    initializeJourneyTimeline();
    
    // Add click handlers to timeline markers
    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const phase = marker.getAttribute('data-phase');
            if (phase) {
                showTimelinePhase(phase);
            }
        });
    });
    
    // Add hover effects to worker and agent cards
    const workers = document.querySelectorAll('.human-worker');
    workers.forEach(worker => {
        worker.addEventListener('mouseenter', () => {
            const role = worker.getAttribute('data-role');
            const salary = worker.getAttribute('data-salary');
            console.log(`💰 ${role}: ${salary}/year`);
            
            // Add pulse effect
            worker.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        worker.addEventListener('mouseleave', () => {
            worker.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const agents = document.querySelectorAll('.ai-agent');
    agents.forEach(agent => {
        agent.addEventListener('mouseenter', () => {
            const role = agent.getAttribute('data-role');
            const savings = agent.getAttribute('data-savings');
            console.log(`🤖 ${role}: Saves ${savings}/year`);
            
            // Add glow effect
            agent.style.transform = 'translateY(-8px) scale(1.02)';
            agent.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.4)';
        });
        
        agent.addEventListener('mouseleave', () => {
            agent.style.transform = 'translateY(0) scale(1)';
            agent.style.boxShadow = '';
        });
    });
    
    // Add click handler to Dr. G's profile for easter egg
    const drGProfile = document.querySelector('.dr-g-profile');
    if (drGProfile) {
        drGProfile.addEventListener('click', () => {
            console.log('🎖️ "Mission accomplished! Ready for your AI transformation?" - Dr. G');
            
            // Add special animation
            const leaderPhoto = document.querySelector('.leader-photo');
            if (leaderPhoto) {
                leaderPhoto.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    leaderPhoto.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }
        });
    }
}
