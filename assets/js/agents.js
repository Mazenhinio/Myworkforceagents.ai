/**
 * Agent Carousel - Refactored for Cleanliness and Performance
 * Implements a smooth fade-in/fade-out transition.
 */
function initializeAgentCarousel() {
    const agentCards = document.querySelectorAll('.agent-card');
    if (agentCards.length === 0) return;

    const agents = ['finn', 'lisa', 'rese', 'tessa', 'ross'];
    let currentIndex = 0;
    let autoPlayInterval = null;
    const autoPlayDelay = 3000; // 3 seconds

    function updateCarousel(newIndex) {
        const oldIndex = currentIndex;
        currentIndex = newIndex;

        const currentCard = agentCards[oldIndex];
        const newCard = agentCards[newIndex];

        // No need to do anything if it's the same card
        if (oldIndex === newIndex && currentCard.classList.contains('active')) {
            return;
        }

        // Transition out the current card
        if (currentCard) {
            currentCard.classList.add('exiting');
            currentCard.classList.remove('active');
        }

        // Transition in the new card
        if (newCard) {
            // Remove 'exiting' in case it was stuck from a previous fast transition
            newCard.classList.remove('exiting');
            newCard.classList.add('active');
        }
        
        // Clean up the exiting class after the animation is complete
        if(currentCard) {
            setTimeout(() => {
                currentCard.classList.remove('exiting');
            }, 400); // Matches the CSS transition duration
        }
    }

    function nextAgent() {
        const nextIndex = (currentIndex + 1) % agents.length;
        updateCarousel(nextIndex);
    }

    function prevAgent() {
        const prevIndex = (currentIndex - 1 + agents.length) % agents.length;
        updateCarousel(prevIndex);
    }

    function startAutoPlay() {
        // Skip autoplay on narrow mobile screens to prioritize manual swipe
        if (window.innerWidth < 769) return;
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextAgent, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
    
    function pauseAndResumeAutoPlay() {
        stopAutoPlay();
        setTimeout(startAutoPlay, 8000); // Resume after 8s of inactivity
    }

    var prevBtn = document.querySelector('.prev-arrow');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevAgent();
            pauseAndResumeAutoPlay();
        });
    }
    var nextBtn = document.querySelector('.next-arrow');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextAgent();
            pauseAndResumeAutoPlay();
        });
    }
    var showcaseContainer = document.querySelector('.agent-showcase');
    if (showcaseContainer) {
        showcaseContainer.addEventListener('mouseenter', stopAutoPlay);
        showcaseContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch / Swipe Support
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isSwiping = false;
    const SWIPE_THRESHOLD = 40; // px horizontal
    const VERTICAL_LIMIT = 60; // ignore vertical scrolls

    function onTouchStart(e) {
        if (!e.touches || e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
    }

    function onTouchMove(e) {
        if (!e.touches || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dy) < VERTICAL_LIMIT) {
            // horizontal intent
            isSwiping = true;
            e.preventDefault(); // prevent horizontal scroll bounce
        }
    }

    function onTouchEnd(e) {
        if (!isSwiping) return;
        touchEndX = (e.changedTouches && e.changedTouches[0].clientX) || touchStartX;
        const dx = touchEndX - touchStartX;
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
            if (dx < 0) {
                nextAgent();
            } else {
                prevAgent();
            }
            pauseAndResumeAutoPlay();
        }
        isSwiping = false;
    }

    // Attach listeners to display container for better touch area
    const agentDisplay = document.querySelector('.agent-display');
    if (agentDisplay) {
        agentDisplay.addEventListener('touchstart', onTouchStart, { passive: true });
        agentDisplay.addEventListener('touchmove', onTouchMove, { passive: false });
        agentDisplay.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.agent-showcase')) {
            if (e.key === 'ArrowLeft') {
                prevAgent();
                pauseAndResumeAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextAgent();
                pauseAndResumeAutoPlay();
            }
        }
    });

    // Initialize
    updateCarousel(0);
    startAutoPlay();
}

document.addEventListener('DOMContentLoaded', initializeAgentCarousel);
