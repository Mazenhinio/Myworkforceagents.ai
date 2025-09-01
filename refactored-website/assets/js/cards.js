class CardSystem {
    constructor() {
        this.cards = document.querySelectorAll('.game-card');
        this.isMobile = window.innerWidth <= 768;
        this.currentCardIndex = 0;
        this.init();
    }

    init() {
        if (!this.cards.length) {
            console.warn('No cards found to initialize.');
            return;
        }
        console.log('🃏 Initializing Card System...');
        this.setupEventListeners();
        
        if (this.isMobile) {
            this.setupMobileNavigation();
        }
    }

    setupEventListeners() {
        this.cards.forEach(card => {
            const selectButton = card.querySelector('.btn-select');

            // Direct listener for the select button with stopPropagation
            if (selectButton) {
                selectButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleSelection(card);
                });
            }

            // Different logic for mobile vs. desktop
            if (this.isMobile) {
                // Mobile: Click card to flip (only active card)
                card.addEventListener('click', () => {
                    if (card.classList.contains('active') && !card.classList.contains('flipped')) {
                        this.flipCard(card);
                    }
                });
            } else {
                // Desktop: Hover to flip
                card.addEventListener('mouseenter', () => this.flipCard(card));
                card.addEventListener('mouseleave', () => this.unflipCard(card));
            }
        });
    }

    setupMobileNavigation() {
        const prevButton = document.getElementById('prevCard');
        const nextButton = document.getElementById('nextCard');

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => this.navigateCards('prev'));
            nextButton.addEventListener('click', () => this.navigateCards('next'));
        }

        this.updateCardDisplay();
    }

    navigateCards(direction) {
        if (direction === 'next') {
            this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
        } else if (direction === 'prev') {
            this.currentCardIndex = (this.currentCardIndex - 1 + this.cards.length) % this.cards.length;
        }
        this.updateCardDisplay();
    }

    updateCardDisplay() {
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'inactive', 'flipped');
            
            if (index === this.currentCardIndex) {
                card.classList.add('active');
            } else {
                card.classList.add('inactive');
            }
        });
    }

    flipCard(card) {
        if (card.classList.contains('selected')) return;
        card.classList.add('flipped');
    }

    unflipCard(card) {
        if (card.classList.contains('selected')) return;
        card.classList.remove('flipped');
    }

    handleSelection(card) {
        const cardType = card.dataset.card;
        console.log(`✅ Card selected: ${cardType}`);

        if (card.classList.contains('selected')) {
            console.log('🚫 Card already selected.');
            return;
        }

        this.cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.showLoadingState(card);

        console.log(`🚀 Triggering action for: ${cardType}`);
    }

    showLoadingState(card) {
        const button = card.querySelector('.btn-select');
        if (button) {
            if (!button.dataset.originalText) {
                button.dataset.originalText = button.innerHTML;
            }
            button.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
        }
    }

    reset() {
        this.cards.forEach(card => {
            card.classList.remove('flipped', 'selected', 'active', 'inactive');
            const button = card.querySelector('.btn-select');
            if (button && button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
                button.disabled = false;
            }
        });
    }
}

// Initialize the system once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CardSystem();
});