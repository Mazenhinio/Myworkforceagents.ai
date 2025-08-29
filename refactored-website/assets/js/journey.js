/* =============================================
   JOURNEY ANIMATION SYSTEM
   ============================================= */

// Modern, smooth reveal animations for journey section
class JourneyAnimations {
    constructor() {
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.journeySteps = document.querySelectorAll('.journey-step');
        this.challengeItems = document.querySelectorAll('.challenge-item');
        this.highlightItems = document.querySelectorAll('.highlight-item');
        
        this.init();
    }
    
    init() {
        this.setupRevealAnimations();
        this.setupProgressTracking();
        this.setupStaggeredReveal();
    }
    
    setupRevealAnimations() {
        // Add initial states to elements with directional slide-ins
        this.journeySteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        // Challenge items slide in from RIGHT to LEFT
        this.challengeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        });
        
        // Highlight items slide in from RIGHT to LEFT  
        this.highlightItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        });
    }
    
    setupProgressTracking() {
        const options = {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stepNumber = parseInt(entry.target.getAttribute('data-step'));
                    this.updateProgress(stepNumber);
                    this.revealStep(entry.target);
                }
            });
        }, options);
        
        this.journeySteps.forEach(step => observer.observe(step));
    }
    
    updateProgress(activeStep) {
        this.progressDots.forEach((dot, index) => {
            if (index < activeStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    revealStep(step) {
        // Reveal the main step with smooth animation
        step.style.opacity = '1';
        step.style.transform = 'translateY(0)';
        
        // Reveal child elements sliding from right to left
        const challenges = step.querySelectorAll('.challenge-item');
        const highlights = step.querySelectorAll('.highlight-item');
        
        challenges.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 150);
        });
        
        highlights.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 150);
        });
    }
    
    setupStaggeredReveal() {
        // Smooth entrance for the header
        const header = document.querySelector('.journey-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-10px)';
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 200);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new JourneyAnimations();
});
