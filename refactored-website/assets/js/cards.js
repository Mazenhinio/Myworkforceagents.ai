class CardSystem {
    constructor() {
        this.caption = document.getElementById('experienceCaption');
        this.showTimeout = null;
        this.init();
    }

    init() {
        console.log('🃏 Initializing Card System...');
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
                    this.hideCaption(); // Hide permanently on selection
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
}

// Initialize the system once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CardSystem();
});
        
        // Initialize caption state
        if (this.caption) {
            this.caption.classList.remove('hidden');
            this.caption.classList.add('showing');
        }
        
        // Simple approach: listen to all card interactions
        this.setupCaptionInteractions();
        this.setupCardSystem();
    }

    init() {
        console.log('🃏 Initializing Card System...');
        console.log(' Caption element found:', !!this.caption);
        
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
                console.log('�️ Card mouseenter');
                this.hideCaption();
            });
            
            card.addEventListener('mouseleave', () => {
                console.log('🖱️ Card mouseleave');
                this.scheduleShowCaption();
            });
            
            // Touch/click events (mobile and desktop)
            card.addEventListener('click', () => {
                console.log('� Card clicked');
                this.hideCaption();
                this.scheduleShowCaption();
            });
            
            // Handle select button
            const selectButton = card.querySelector('.btn-select');
            if (selectButton) {
                selectButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('🎯 Select button clicked');
                    this.hideCaption(); // Hide permanently on selection
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
}

// Initialize the system once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CardSystem();
});