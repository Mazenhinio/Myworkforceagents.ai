// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;
    
    const updateProgress = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        
        progressBar.style.width = Math.min(progress, 100) + '%';
        
        // Add glow effect when near completion
        if (progress > 90) {
            progressBar.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
        } else {
            progressBar.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.4)';
        }
    };
    
    // Throttled scroll event
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial call
}

function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
        const y = window.scrollY;
        if (y > 100) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
        // Hide when scrolling down, show when scrolling up
        if (y > lastY && y > 140) navbar.classList.add('hide-up'); else navbar.classList.remove('hide-up');
        lastY = y;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize navigation functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initNavbarEffects();
    initSmoothScrolling();
});
