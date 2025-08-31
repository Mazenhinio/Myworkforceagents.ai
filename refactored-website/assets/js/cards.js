/* =============================================
   CLEAN CARD SYSTEM - PRODUCTION-STYLE APPROACH
   ============================================= */

// Simple Card System - Production Style
function initializeCardExperience() {
    console.log('🃏 Initializing Card Experience...');

    // Add click handlers to card backs (only for mobile)
    if (window.innerWidth <= 768) {
        const gameCards = document.querySelectorAll('.game-card');

        gameCards.forEach(card => {
            const cardBack = card.querySelector('.card-back');

            // Click on card back to flip (mobile only)
            cardBack.addEventListener('click', () => {
                const cardType = card.dataset.card;
                flipCard(cardType);
            });
        });
    }
}

function flipCard(cardType) {
    console.log(`🃏 Flipping card: ${cardType}`);

    const gameCard = document.querySelector(`[data-card="${cardType}"]`);

    // Add flip animation - only to the game card container
    gameCard.classList.add('flipped');
}

function flipCardBack(cardType) {
    console.log(`🃏 Flipping card back: ${cardType}`);

    const gameCard = document.querySelector(`[data-card="${cardType}"]`);

    // Remove flip animation
    gameCard.classList.remove('flipped');

    // Remove selection state
    gameCard.classList.remove('selected');
}

// Card Selection and Effects
function selectCard(cardType) {
    console.log(`🃏 Card selected: ${cardType}`);

    const gameCard = document.querySelector(`[data-card="${cardType}"]`);

    // Prevent double-tapping on mobile
    if (gameCard.classList.contains('selected')) {
        console.log('🚫 Card already selected, preventing double selection');
        return;
    }

    // Add selection state and pending animation
    gameCard.classList.add('selected', 'pending');

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

function createCardSelectionEffect(gameCard) {
    // Simple selection effect
    const ring = document.createElement('div');
    ring.style.cssText = `
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border: 2px solid var(--accent-color);
        border-radius: 25px;
        pointer-events: none;
        z-index: 999;
        animation: selectionPulse 0.6s ease-out;
    `;

    gameCard.appendChild(ring);

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
        if (gameCard.contains(ring)) {
            gameCard.removeChild(ring);
        }
    }, 600);
}

// Show loading screen between card selection and interface transition
function showCardLoadingScreen(cardType) {
    console.log(`🔄 Showing loading screen for: ${cardType}`);

    // Remove pending state from card
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    gameCard.classList.remove('pending');

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
            completeCardLoading(cardType, loadingScreen);
        }
    }, 800);
}

// Get card information for personalized loading
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

function completeCardLoading(cardType, loadingScreen) {
    console.log(`✅ Loading complete for: ${cardType}`);

    // Fade out loading screen
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        if (document.body.contains(loadingScreen)) {
            document.body.removeChild(loadingScreen);
        }
    }, 300);

    document.body.classList.remove('loading-active');
    navigateToFormInterfaceDirect(cardType);
}

function navigateToFormInterfaceDirect(cardType) {
    console.log(`🚀 Direct navigation to ${cardType} interface...`);

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
    console.log('🔙 Closing interface');

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
    console.log('🔄 Resetting all cards...');
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.classList.remove('selected', 'pending', 'flipped');

        const button = card.querySelector('.btn-select');
        if (button) {
            if (card.dataset.originalLabel) {
                button.innerHTML = card.dataset.originalLabel;
            }
            button.disabled = false;
            button.style.pointerEvents = '';
        }
    });
    console.log('✅ All cards reset');
}

function initializeInterface(cardType) {
    console.log(`🔧 Initializing ${cardType} interface`);
    // Interface-specific initialization logic here
}

// Placeholder interface creators
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
    initializeCardExperience();
});

// Global functions for HTML onclick handlers
window.selectCard = selectCard;
window.closeFormInterface = closeInterface;