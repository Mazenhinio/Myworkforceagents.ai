
// Global time tracking variables
let globalStartTime = null;

// Performance optimization variables
let isLowPerformanceDevice = false;
let animationFrameId = null;
let scrollTimeout = null;
let resizeTimeout = null;
let isMobileDevice = false;

// Enhanced mobile detection and performance assessment
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
};

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Performance detection for older devices
const detectDevicePerformance = () => {
    const userAgent = navigator.userAgent;
    const isOldDevice = /iPhone.*OS [7-9]_|iPhone.*OS 1[0-2]_|Android.*4\.[0-4]|Android.*5\.[0-3]/.test(userAgent);
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const isSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || 
         navigator.connection.effectiveType === '2g' || 
         navigator.connection.effectiveType === '3g');
    
    isLowPerformanceDevice = isOldDevice || isLowMemory || isSlowConnection;
    isMobileDevice = isMobile();
    
    // Add performance class to body for CSS targeting
    if (isLowPerformanceDevice) {
        document.body.classList.add('low-performance-device');
    }
    if (isMobileDevice) {
        document.body.classList.add('mobile-device');
    }
};

// Enhanced mobile-specific optimizations
function optimizeForMobile() {
    detectDevicePerformance();
    
    if (isMobileDevice) {
        // Add mobile class to body for CSS targeting
        document.body.classList.add('mobile-device');
        
        // Add performance class for low-end devices
        if (isLowPerformanceDevice) {
            document.body.classList.add('low-performance-device');
        }
        
        // Improve touch responsiveness
        document.body.style.touchAction = 'manipulation';
        
        // Reduce motion for accessibility and performance
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isLowPerformanceDevice) {
            document.body.classList.add('reduced-motion');
        }
        
        // Optimize viewport for better performance
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport && isLowPerformanceDevice) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Prevent zoom on form inputs only for low-performance devices
        if (isLowPerformanceDevice) {
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    if (viewport) {
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                    }
                });
                
                input.addEventListener('blur', () => {
                    if (viewport) {
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                    }
                });
            });
        }
    }
}

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

// Journey Progress Tracking
function initJourneyProgress() {
    const journeySteps = document.querySelectorAll('.journey-step');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    if (!journeySteps.length || !progressDots.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.getAttribute('data-step');
                
                // Update progress dots
                progressDots.forEach((dot, index) => {
                    if (index < parseInt(stepNumber)) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
                
                // Add animation class to current step
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px'
    });
    
    journeySteps.forEach(step => {
        observer.observe(step);
    });
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

// Intersection Observer for animations
function initScrollAnimations() {
    // Only use if AOS is not available or for additional custom animations
    if (typeof AOS === 'undefined') {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Apply mobile optimizations first
    optimizeForMobile();
    
    // Initialize core features (agent system is handled separately)
    initScrollProgress();
    initNavbarEffects();
    initJourneyProgress();
    initSmoothScrolling();
    initScrollAnimations();
    
    // Add loading class removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle resize events
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-detect mobile state on resize
        isMobileDevice = isMobile();
        
        if (isMobileDevice) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    }, 250);
});

// Global functions for footer interaction

// Journey Progress Dots




// Intersection Observer for animations


// Add minimal CSS for scroll animations only
const style = document.createElement('style');
style.textContent = `
    /* Restrict fade-in starter state to elements explicitly marked with data-aos (already handled by AOS) or custom class .reveal */
    [data-aos], .reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
    [data-aos].aos-animate, .reveal.animate-in { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// Performance optimizations


// (Removed unused utility helpers for leaner bundle)