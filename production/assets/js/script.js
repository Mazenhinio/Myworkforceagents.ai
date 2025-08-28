// Clean, minimal JavaScript for MWA.AI Landing Page
console.log('🚀 Loading MWA.AI scripts...');

// Mobile detection
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
};

// Global functions for HTML onclick handlers
function selectCard(cardType) {
    console.log('🎯 Card selected:', cardType);
    
    // Add visual feedback
    const selectedCard = document.querySelector(`[data-card="${cardType}"]`);
    if (selectedCard) {
        selectedCard.style.transform = 'scale(1.05)';
    setTimeout(() => {
            selectedCard.style.transform = '';
        }, 200);
    }
    
    // Handle the card selection (placeholder for your business logic)
    switch(cardType) {
        case 'click':
            console.log('👆 Click/Tap experience selected');
            break;
        case 'type':
            console.log('⌨️ Type/Text experience selected');
            break;
        case 'voice':
            console.log('🎤 Voice/Talk experience selected');
            break;
    }
}

function goBackToExperiences() {
    console.log('🔙 Going back to experiences');
    const experiencesSection = document.querySelector('.cards-container');
    if (experiencesSection) {
        experiencesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Agent Carousel Functionality
function initializeAgentCarousel() {
    console.log('🎠 Initializing agent carousel...');
    
    const agents = ['finn', 'lisa', 'rese', 'tessa', 'ross'];
    let currentIndex = 0;

    function updateCarousel(index) {
        // Remove active class from all cards
        document.querySelectorAll('.agent-card').forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to new card
        const newCard = document.querySelector(`.agent-card[data-agent="${agents[index]}"]`);
        if (newCard) {
                setTimeout(() => {
                newCard.classList.add('active');
                }, 100);
        }

        currentIndex = index;
    }

    function nextAgent() {
        const nextIndex = (currentIndex + 1) % agents.length;
        updateCarousel(nextIndex);
    }

    function prevAgent() {
        const prevIndex = (currentIndex - 1 + agents.length) % agents.length;
        updateCarousel(prevIndex);
    }

    // Event listeners for navigation arrows
    document.addEventListener('click', function(e) {
        if (e.target.closest('.prev-arrow')) {
            e.preventDefault();
            prevAgent();
        }
        if (e.target.closest('.next-arrow')) {
            e.preventDefault();
            nextAgent();
        }
    });

    // Auto-play functionality
    let autoPlayInterval = setInterval(nextAgent, 5000);

    // Pause on hover
    const showcaseContainer = document.querySelector('.agent-showcase');
    if (showcaseContainer) {
        showcaseContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        showcaseContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextAgent, 5000);
        });
    }

    // Initialize first agent
    updateCarousel(0);
}

// Agent Tooltip Functionality
function initializeAgentTooltips() {
    console.log('💡 Initializing agent tooltips...');
    
    let tooltip = null;
    let isVisible = false;

    const agentData = {
        'finn': { name: 'FINN', role: 'Lead Generation', icon: 'fas fa-bullseye' },
        'lisa': { name: 'LISA', role: 'Response & Nurture', icon: 'fas fa-comments' },
        'rese': { name: 'RESE', role: 'Listings & Socials', icon: 'fas fa-home' },
        'tessa': { name: 'TESSA', role: 'Ops & Transaction', icon: 'fas fa-file-contract' },
        'ross': { name: 'ROSS', role: 'Voice Receptionist', icon: 'fas fa-phone' }
    };

    function createTooltip() {
        const el = document.createElement('div');
        el.className = 'agent-tooltip';
        el.style.cssText = `
            position: fixed;
            z-index: 9999;
            background: rgba(20, 20, 30, 0.95);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 20px;
            max-width: 400px;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
            pointer-events: none;
            font-family: 'Inter', sans-serif;
            color: white;
        `;
        document.body.appendChild(el);
        return el;
    }

    function buildContent(agent, painText, solutionText) {
        const data = agentData[agent];
        const painPoints = painText.split('•').map(item => item.trim()).filter(item => item);
        const solutionPoints = solutionText.split('•').map(item => item.trim()).filter(item => item);

        return `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <i class="${data.icon}" style="color: #ff6b35; font-size: 1.1rem;"></i>
                <div>
                    <div style="font-size: 1.2rem; font-weight: 700;">${data.name}</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">${data.role}</div>
            </div>
        </div>
            
            <div style="margin-bottom: 16px;">
                <div style="color: #ff6b35; font-weight: 600; margin-bottom: 8px;">
                    <i class="fas fa-exclamation-triangle"></i> Pain Points
                </div>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${painPoints.map(point => `<li style="position: relative; padding-left: 16px; margin-bottom: 6px; font-size: 0.9rem; line-height: 1.5;">
                        <span style="position: absolute; left: 0; color: #ff6b35;">●</span>${point}
                    </li>`).join('')}
        </ul>
        </div>
            
            <div>
                <div style="color: #00ff88; font-weight: 600; margin-bottom: 8px;">
                    <i class="fas fa-lightbulb"></i> Solutions
        </div>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${solutionPoints.map(point => `<li style="position: relative; padding-left: 16px; margin-bottom: 6px; font-size: 0.9rem; line-height: 1.5;">
                        <span style="position: absolute; left: 0; color: #00ff88;">●</span>${point}
                    </li>`).join('')}
                    </ul>
        </div>
    `;
    }

    function showTooltip(event, agent, painText, solutionText) {
        if (!tooltip) tooltip = createTooltip();
        
        tooltip.innerHTML = buildContent(agent, painText, solutionText);
        updatePosition(event);
        
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'scale(1)';
            isVisible = true;
        });
    }

    function hideTooltip() {
        if (tooltip && isVisible) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'scale(0.8)';
            isVisible = false;
        setTimeout(() => {
                if (tooltip && !isVisible) {
                    document.body.removeChild(tooltip);
                    tooltip = null;
                }
        }, 300);
    }
}

    function updatePosition(event) {
        if (!tooltip) return;
        
        const rect = tooltip.getBoundingClientRect();
        let x = event.clientX + 15;
        let y = event.clientY + 15;

        if (x + rect.width > window.innerWidth) {
            x = event.clientX - rect.width - 15;
        }
        if (y + rect.height > window.innerHeight) {
            y = event.clientY - rect.height - 15;
        }

        x = Math.max(10, Math.min(x, window.innerWidth - rect.width - 10));
        y = Math.max(10, Math.min(y, window.innerHeight - rect.height - 10));

        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    // Event listeners
    document.addEventListener('mouseover', (e) => {
        const agentCard = e.target.closest('.agent-card');
        const challenge = e.target.closest('.challenge');
        const solution = e.target.closest('.solution');
        
        if (agentCard && agentCard.classList.contains('active') && (challenge || solution)) {
            const agent = agentCard.getAttribute('data-agent');
            const painText = agentCard.getAttribute('data-tooltip-pain');
            const solutionText = agentCard.getAttribute('data-tooltip-solution');
            
            if (agent && painText && solutionText) {
                showTooltip(e, agent, painText, solutionText);
            }
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isVisible && tooltip) updatePosition(e);
    });

    document.addEventListener('mouseout', (e) => {
        const agentCard = e.target.closest('.agent-card');
        const challenge = e.target.closest('.challenge');
        const solution = e.target.closest('.solution');
        
        if (!agentCard || (!challenge && !solution)) {
            setTimeout(hideTooltip, 100);
        }
    });

    document.addEventListener('scroll', hideTooltip);
}

// Scroll progress bar
function initializeScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
}

// Mobile menu
function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Mobile optimizations
function optimizeForMobile() {
    if (isMobile()) {
        document.body.classList.add('mobile-device');
        document.body.style.touchAction = 'manipulation';
    }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded - initializing...');
    
    optimizeForMobile();
    initializeScrollProgress();
    initializeMobileMenu();
    initializeAgentCarousel();
    initializeAgentTooltips();
    
    console.log('✅ All components initialized');
});

// Initialize AOS (if available)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100
    });
}

console.log('✅ MWA.AI scripts loaded');
