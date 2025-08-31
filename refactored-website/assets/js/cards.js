/* =============================================
   CARD SYSTEM - REFACTORED & SIMPLIFIED
   ============================================= */

class CardSystem {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.cardsContainer = document.getElementById('cardsContainer');
        this.cards = this.cardsContainer ? Array.from(this.cardsContainer.querySelectorAll('.game-card')) : [];
        this.currentCardIndex = 0;
        this.isResizing = false;

        this.init();
    }

    init() {
        if (this.cards.length === 0) {
            return;
        }
        this.setupEventListeners();
        if (this.isMobile) {
            this.initializeMobileLayout();
        }
    }

    setupEventListeners() {
        // --- Event Delegation for Select Buttons ---
        // This is more robust and performant than individual listeners.
        this.cardsContainer.addEventListener('click', (e) => {
            const selectButton = e.target.closest('.btn-select');
            if (selectButton && !selectButton.disabled) {
                e.stopPropagation(); // Prevent card flip on button click.

                const card = selectButton.closest('.game-card');
                const cardType = card ? card.dataset.card : null;

                if (cardType && card) {
                    // Mark card as being selected to prevent flip-back
                    card.dataset.preventFlipBack = 'true';

                    // Add visual feedback
                    selectButton.classList.add('clicked');
                    setTimeout(() => selectButton.classList.remove('clicked'), 400);

                    // Trigger the global selection function
                    selectCard(cardType);
                }
            }
        });

        // --- Card Flip Event Listeners ---
        this.cards.forEach(card => {
            if (this.isMobile) {
                // On mobile, tapping the card (but not the button) flips it.
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-select')) {
                        return; // Button click is handled by the delegated listener.
                    }
                    this.toggleCardFlip(card);
                });
            } else {
                // On desktop, hovering the card flips it.
                card.addEventListener('mouseenter', () => {
                    // Only flip if not being selected
                    if (!card.dataset.preventFlipBack) {
                        this.toggleCardFlip(card);
                    }
                });
                card.addEventListener('mouseleave', () => {
                    // Only flip back if not being selected and not already selected
                    if (!card.dataset.preventFlipBack && !card.classList.contains('selected')) {
                        this.toggleCardFlip(card);
                    }
                });
            }
        });

        // --- Mobile-Only Arrow Navigation ---
        if (this.isMobile) {
            const prevButton = document.getElementById('prevCard');
            const nextButton = document.getElementById('nextCard');
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => this.navigateToPrevious());
                nextButton.addEventListener('click', () => this.navigateToNext());
            }
        }

        // --- Robust Resize Handler ---
        // Reloads the page on mode change to ensure a clean state.
        window.addEventListener('resize', () => {
            if (this.isResizing) return;
            this.isResizing = true;
            setTimeout(() => {
                const newIsMobile = window.innerWidth <= 768;
                if (newIsMobile !== this.isMobile) {
                    window.location.reload();
                }
                this.isResizing = false;
            }, 200);
        });
    }

    toggleCardFlip(card) {
        card.classList.toggle('flipped');
    }

    // --- Mobile-Specific Methods ---
    initializeMobileLayout() {
        this.currentCardIndex = 0;
        this.updateMobileCardPositions();
    }

    updateMobileCardPositions() {
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'inactive-left', 'inactive-right');
            if (index === this.currentCardIndex) {
                card.classList.add('active');
            } else if (index < this.currentCardIndex) {
                card.classList.add('inactive-left');
            } else {
                card.classList.add('inactive-right');
            }
        });
        this.updateArrowStates();
    }

    navigateToPrevious() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.updateMobileCardPositions();
        }
    }

    navigateToNext() {
        if (this.currentCardIndex < this.cards.length - 1) {
            this.currentCardIndex++;
            this.updateMobileCardPositions();
        }
    }

    updateArrowStates() {
        const prevButton = document.getElementById('prevCard');
        const nextButton = document.getElementById('nextCard');
        if (!prevButton || !nextButton) return;

        prevButton.classList.toggle('disabled', this.currentCardIndex === 0);
        nextButton.classList.toggle('disabled', this.currentCardIndex === this.cards.length - 1);
    }
}

// Card Selection and Effects
function selectCard(cardType) {
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    if (!gameCard) {
        return;
    }

    // Prevent double selection
    if (gameCard && gameCard.classList.contains('selected')) {
        return;
    }

    // Add selection state and ensure card stays flipped
    gameCard.classList.add('selected', 'pending', 'flipped');

    // Update button state
    const button = gameCard.querySelector('.btn-select');
    if (button) {
        const originalText = button.innerHTML;
        if (!gameCard.dataset.originalLabel) {
            gameCard.dataset.originalLabel = originalText;
        }
        button.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
    }

    // Visual effects
    createSelectionEffect(gameCard);

    // Show loading screen
    setTimeout(() => {
        showLoadingScreen(cardType);
    }, 600);
}

function createSelectionEffect(card) {
    if (!card) return;

    const ring = document.createElement('div');
    ring.className = 'selection-ring';
    ring.style.cssText = `
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border: 2px solid #00d4ff;
        border-radius: 25px;
        pointer-events: none;
        z-index: 999;
        animation: selectionPulse 0.6s ease-out;
    `;

    card.appendChild(ring);

    // Add animation styles if not present
    if (!document.querySelector('#selection-styles')) {
        const style = document.createElement('style');
        style.id = 'selection-styles';
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

function showLoadingScreen(cardType) {
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    if (gameCard) {
        gameCard.classList.remove('pending');
    } else {
        return;
    }

    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'card-loading-screen';
    loadingScreen.id = 'cardLoadingScreen';

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
    document.body.classList.add('loading-active');

    // Simulate loading progress
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
            completeLoading(cardType);
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

function completeLoading(cardType) {
    const loadingScreen = document.getElementById('cardLoadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loadingScreen)) {
                document.body.removeChild(loadingScreen);
            }
        }, 300);
    }

    document.body.classList.remove('loading-active');
    navigateToInterface(cardType);
}

function navigateToInterface(cardType) {
    const interfaceContainer = document.getElementById('interfaceContainer');
    if (interfaceContainer) {
        interfaceContainer.style.display = 'flex';

        // Load appropriate interface content here
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

        setTimeout(() => {
            interfaceContainer.classList.add('active');
            initializeInterface(cardType);
        }, 100);
    }
}

function closeInterface() {
    const interfaceContainer = document.getElementById('interfaceContainer');
    if (interfaceContainer) {
        interfaceContainer.classList.remove('active');

        setTimeout(() => {
            interfaceContainer.style.display = 'none';
            interfaceContainer.innerHTML = '';
            resetAllCards();
        }, 300);
    }
}

function resetAllCards() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.classList.remove('selected', 'pending', 'flipped');

        // Clear the prevent flip back flag
        delete card.dataset.preventFlipBack;

        const button = card.querySelector('.btn-select');
        if (button) {
            if (card.dataset.originalLabel) {
                button.innerHTML = card.dataset.originalLabel;
            }
            button.disabled = false;
        }
    });
}

function initializeInterface(cardType) {
    // Interface-specific initialization logic here
}

// Placeholder interface creators (implement based on your needs)
function createClickInterface() {
    return '<div class="interface-content">Click Interface Loading...</div>';
}

function createTypeInterface() {
    return '<div class="interface-content">Type Interface Loading...</div>';
}

function createVoiceInterface() {
    return '<div class="interface-content">Voice Interface Loading...</div>';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CardSystem();
});

// Global functions for HTML onclick handlers
window.selectCard = selectCard;
window.closeFormInterface = closeInterface;
