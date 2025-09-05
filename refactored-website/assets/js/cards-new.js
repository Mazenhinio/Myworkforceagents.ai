class CardSystem {
    constructor() {
        this.caption = document.getElementById('experienceCaption');
        this.showTimeout = null;
        this.init();
    }

    init() {
        console.log('🃏 Initializing Card System...');
        console.log('📝 Caption element found:', !!this.caption);

        // Initialize caption state with smooth showing
        if (this.caption) {
            this.caption.classList.remove('hidden');
            this.caption.classList.add('showing');
        }

        // Simple approach: listen to all card interactions
        this.setupCaptionInteractions();
        this.setupCardSystem();
    }

    setupCaptionInteractions() {
        const cards = document.querySelectorAll('.game-card');
        const cardsContainer = document.getElementById('cardsContainer');

        console.log('🃏 Found cards:', cards.length);

        // For every card, add both mobile and desktop listeners
        cards.forEach(card => {
            // Mouse events (desktop)
            card.addEventListener('mouseenter', () => {
                console.log('🖱️ Card mouseenter');
                this.hideCaption();
            });

            card.addEventListener('mouseleave', () => {
                console.log('🖱️ Card mouseleave');
                this.scheduleShowCaption();
            });

            // Touch/click events (mobile and desktop)
            card.addEventListener('click', () => {
                console.log('👆 Card clicked');
                this.hideCaption();
                this.scheduleShowCaption();
            });

            // Handle select button
            const selectButton = card.querySelector('.btn-select');
            if (selectButton) {
                selectButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('🎯 Select button clicked');
                    const cardType = card.dataset.card;
                    this.selectCard(cardType);
                });
            }
        });

        // Container mouse leave (desktop safety net)
        if (cardsContainer) {
            cardsContainer.addEventListener('mouseleave', () => {
                console.log('🖱️ Cards container mouseleave');
                this.scheduleShowCaption();
            });
        }
    }

    setupCardSystem() {
        const cards = document.querySelectorAll('.game-card');
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            this.setupMobileNavigation();
        }

        // Setup card flip functionality
        cards.forEach(card => {
            if (isMobile) {
                card.addEventListener('click', () => {
                    if (card.classList.contains('active') && !card.classList.contains('flipped')) {
                        card.classList.add('flipped');
                    }
                });
            } else {
                card.addEventListener('mouseenter', () => {
                    if (!card.classList.contains('selected')) {
                        card.classList.add('flipped');
                    }
                });
                card.addEventListener('mouseleave', () => {
                    if (!card.classList.contains('selected')) {
                        card.classList.remove('flipped');
                    }
                });
            }
        });
    }

    setupMobileNavigation() {
        const cards = document.querySelectorAll('.game-card');
        const prevButton = document.getElementById('prevCard');
        const nextButton = document.getElementById('nextCard');
        let currentCardIndex = 0;

        function updateCardDisplay() {
            cards.forEach((card, index) => {
                card.classList.remove('active', 'inactive');
                if (index === currentCardIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.add('inactive');
                }
            });
        }

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
                updateCardDisplay();
            });
            nextButton.addEventListener('click', () => {
                currentCardIndex = (currentCardIndex + 1) % cards.length;
                updateCardDisplay();
            });
        }

        updateCardDisplay();
    }

    hideCaption() {
        console.log('🔥 Hiding caption smoothly');
        if (this.caption) {
            this.caption.classList.remove('showing');
            this.caption.classList.add('hidden');
            console.log('✅ Hidden class added with smooth transition');
        }
        this.clearShowTimeout();
    }

    scheduleShowCaption() {
        console.log('⏰ Scheduling caption to show smoothly in 3s');
        this.clearShowTimeout();
        this.showTimeout = setTimeout(() => {
            this.showCaption();
        }, 3000);
    }

    showCaption() {
        console.log('✨ Showing caption smoothly');
        if (this.caption) {
            this.caption.classList.remove('hidden');
            // Add showing class for smooth fade in
            setTimeout(() => {
                if (this.caption) {
                    this.caption.classList.add('showing');
                }
            }, 50); // Small delay to ensure smooth transition
            console.log('✅ Showing with smooth transition');
        }
    }

    clearShowTimeout() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }

    selectCard(cardType) {
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
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }

        // Update button text to show loading
        const button = gameCard.querySelector('.btn-select');
        const originalText = button.innerHTML;
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
}

// Card Effects & Animations
function createCardFlipParticles(card) {
    // Create particle explosion effect
    const particles = [];
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'card-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #00d4ff, #0066ff);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(particle);
        particles.push(particle);

        // Animate particle
        const angle = (i / particleCount) * 2 * Math.PI;
        const distance = 50 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: i * 50
        }).onfinish = () => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        };
    }
}

function createCardSelectionEffect(card) {
    // Create glowing ring effect
    const ring = document.createElement('div');
    ring.className = 'selection-ring';
    ring.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 2px solid #00d4ff;
        border-radius: 25px;
        pointer-events: none;
        z-index: 999;
        animation: selectionPulse 0.6s ease-out;
    `;

    card.appendChild(ring);

    // Add CSS animation
    if (!document.querySelector('#selection-animations')) {
        const style = document.createElement('style');
        style.id = 'selection-animations';
        style.textContent = `
            @keyframes selectionPulse {
                0% { transform: scale(0.8); opacity: 1; }
                100% { transform: scale(1.2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        if (card.contains(ring)) {
            card.removeChild(ring);
        }
    }, 600);
}

function addCardHoverEffect(card) {
    card.style.transform = card.style.transform + ' scale(1.02)';
}

function removeCardHoverEffect(card) {
    card.style.transform = card.style.transform.replace(' scale(1.02)', '');
}

function playCardFlipSound() {
    // Create audio context for sound effects
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
        console.log('Audio not supported');
    }
}

// Loading & Transition System
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
            completeCardLoading(cardType);
        }
    }, 800);
}

function getCardInfo(cardType) {
    const cardInfo = {
        click: {
            icon: 'fas fa-mouse-pointer',
            title: 'Interactive Interface',
            message: 'Loading your visual experience...'
        },
        type: {
            icon: 'fas fa-keyboard',
            title: 'Chat Interface',
            message: 'Preparing conversation mode...'
        },
        voice: {
            icon: 'fas fa-microphone',
            title: 'Voice Interface',
            message: 'Initializing voice AI...'
        }
    };

    return cardInfo[cardType] || cardInfo.click;
}

function completeCardLoading(cardType) {
    console.log(`✅ Loading complete for: ${cardType}`);

    // Remove loading screen
    const loadingScreen = document.getElementById('cardLoadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loadingScreen)) {
                document.body.removeChild(loadingScreen);
            }
        }, 300);
    }

    // Remove loading class from body
    document.body.classList.remove('loading-active');

    // Navigate to interface
    navigateToFormInterfaceDirect(cardType);
}

function navigateToFormInterfaceDirect(cardType) {
    console.log(`🚀 Navigating to ${cardType} interface`);

    // Show interface container
    const interfaceContainer = document.getElementById('interfaceContainer');
    interfaceContainer.style.display = 'flex';

    // Load appropriate interface
    let interfaceHTML = '';
    switch (cardType) {
        case 'click':
            interfaceHTML = createClickInterface();
            break;
        case 'type':
            interfaceHTML = createTypeInterface();
            break;
        case 'voice':
            interfaceHTML = createVoiceInterface();
            break;
    }

    interfaceContainer.innerHTML = interfaceHTML;

    // Activate interface with animation
    setTimeout(() => {
        interfaceContainer.classList.add('active');
        initializeFormInterface(cardType);
    }, 100);
}

function closeFormInterface() {
    console.log('🔙 Closing form interface');

    const interfaceContainer = document.getElementById('interfaceContainer');
    interfaceContainer.classList.remove('active');

    setTimeout(() => {
        interfaceContainer.style.display = 'none';
        interfaceContainer.innerHTML = '';
        resetAllCards();
    }, 300);
}

function initializeFormInterface(cardType) {
    console.log(`🔧 Initializing ${cardType} interface`);

    // Initialize specific interface functionality
    switch (cardType) {
        case 'click':
            initializeClickInterface();
            break;
        case 'type':
            initializeTypeInterface();
            break;
        case 'voice':
            initializeVoiceInterface();
            break;
    }
}

function resetAllCards() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.classList.remove('selected', 'pending', 'flipped');

        // Restore original button text
        const button = card.querySelector('.btn-select');
        if (card.dataset.originalLabel) {
            button.innerHTML = card.dataset.originalLabel;
        }
        button.disabled = false;
        button.style.pointerEvents = '';
    });
}

// Interface Functions (will be implemented in separate files)
function createClickInterface() {
    return `
        <div class="click-form-container">
            <div class="form-header">
                <div class="form-title">
                    <h1>AI Transformation Assessment</h1>
                </div>
                <div class="form-controls">
                    <button class="close-btn" onclick="closeFormInterface()" title="Exit to card selection">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="visual-form-grid">
                <div class="step-number">01</div>
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
                        <span class="status">At Your Service 24/7.</span>
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
            <div class="enhanced-voice-interface">
                <div class="voice-header">
                    <div class="voice-header-content">
                        <h2>AI Voice Assistant</h2>
                        <p>Click the interface below to activate the globe and start your conversation</p>
                    </div>
                    <div class="voice-header-controls">
                        <button class="close-btn" onclick="closeFormInterface()" title="Exit to card selection">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <div class="centered-voice-layout">
                    <div class="vapi-base-layer" id="vapiBaseLayer">
                        <iframe
                            id="vapiEmbeddedFrame"
                            src="https://vapi.ai?demo=true&shareKey=demo&assistantId=demo&embed=true&minimal=true"
                            width="100%"
                            height="100%"
                            frameborder="0"
                            allow="microphone; camera; autoplay; fullscreen"
                            sandbox="allow-scripts allow-same-origin allow-microphone allow-forms allow-popups"
                            onload="setupVapiFrameActivation(this)">
                        </iframe>
                    </div>

                    <div class="globe-overlay-layer" id="globeOverlayLayer">
                        <div class="main-globe-container">
                            <div class="globe-status-overlay" id="globeStatusOverlay">
                                <div class="status-indicator">
                                    <div class="status-dot inactive" id="globeStatusDot"></div>
                                    <span id="globeStatusText">Press the interface to start</span>
                                </div>
                            </div>

                            <div class="interactive-globe-wrapper" id="interactiveGlobe">
                                <div class="globe-canvas-container">
                                    <canvas id="threejs-canvas"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Placeholder functions for interface initialization
function initializeClickInterface() {
    console.log('🔧 Click Interface initialized');
    // Form navigation and validation logic will be implemented
}

function initializeTypeInterface() {
    console.log('🔧 Type Interface initialized');
    // Chat functionality will be implemented
}

function initializeVoiceInterface() {
    console.log('🔧 Voice Interface initialized');
    // VAPI integration will be implemented
}

// Initialize the system once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CardSystem();
});

// Global functions for HTML onclick handlers
window.selectCard = CardSystem.prototype.selectCard;
window.closeFormInterface = closeFormInterface;
