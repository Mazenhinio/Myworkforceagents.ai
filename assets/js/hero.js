/* =============================================
   HERO REVEAL ANIMATIONS
   ============================================= */

class HeroReveal {
    constructor() {
        this.heroLogo = document.querySelector('.hero-infinity-logo');
        this.heroTitle = document.querySelector('.hero-headline');
        this.heroHighlight = document.querySelector('.hero-headline .highlight');
        this.handEffect = document.querySelector('.hand-effect');
        this.floatingOrbs = document.querySelectorAll('.floating-orb');
        this.particles = document.querySelectorAll('.particle');
        
        this.init();
    }
    
    init() {
        this.setupInitialStates();
        this.startRevealSequence();
    }
    
    setupInitialStates() {
        // Logo starts invisible and scaled down
        if (this.heroLogo) {
            this.heroLogo.style.opacity = '0';
            this.heroLogo.style.transform = 'scale(0.8) rotate(-10deg)';
            this.heroLogo.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        
        // Title starts invisible and translated up
        if (this.heroTitle) {
            this.heroTitle.style.opacity = '0';
            this.heroTitle.style.transform = 'translateY(30px)';
            this.heroTitle.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        
        // Highlight starts invisible
        if (this.heroHighlight) {
            this.heroHighlight.style.opacity = '0';
            this.heroHighlight.style.transform = 'scale(0.9)';
            this.heroHighlight.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        
        // Hand effect starts invisible
        if (this.handEffect) {
            this.handEffect.style.opacity = '0';
            this.handEffect.style.transform = 'scale(0.8)';
            this.handEffect.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        
        // Floating orbs start invisible and positioned off-screen
        this.floatingOrbs.forEach((orb, index) => {
            orb.style.opacity = '0';
            orb.style.transform = `translateY(${50 + index * 20}px) scale(0.5)`;
            orb.style.transition = `all 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.2}s`;
        });
        
        // Particles start invisible but keep their original positions
        this.particles.forEach((particle, index) => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
            particle.style.transition = `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${1 + index * 0.1}s`;
        });
    }
    
    startRevealSequence() {
        // Start the reveal sequence immediately for smoother experience
        setTimeout(() => {
            this.revealLogo();
        }, 100);
        
        setTimeout(() => {
            this.revealTitle();
        }, 400);
        
        setTimeout(() => {
            this.revealHighlight();
        }, 700);
        
        setTimeout(() => {
            this.revealHandEffect();
        }, 1000);
        
        setTimeout(() => {
            this.revealOrbs();
        }, 1300);
        
        setTimeout(() => {
            this.revealParticles();
        }, 1600);
    }
    
    revealLogo() {
        if (this.heroLogo) {
            this.heroLogo.style.opacity = '1';
            this.heroLogo.style.transform = 'scale(1) rotate(0deg)';
        }
    }
    
    revealTitle() {
        if (this.heroTitle) {
            this.heroTitle.style.opacity = '1';
            this.heroTitle.style.transform = 'translateY(0)';
        }
    }
    
    revealHighlight() {
        if (this.heroHighlight) {
            this.heroHighlight.style.opacity = '1';
            this.heroHighlight.style.transform = 'scale(1)';
        }
    }
    
    revealHandEffect() {
        if (this.handEffect) {
            this.handEffect.style.opacity = '1';
            this.handEffect.style.transform = 'scale(1)';
        }
    }
    
    revealOrbs() {
        this.floatingOrbs.forEach(orb => {
            orb.style.opacity = '0.6';
            orb.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    revealParticles() {
        this.particles.forEach(particle => {
            particle.style.opacity = '1';
            particle.style.transform = 'scale(1)';
        });
    }
}

// Initialize hero reveal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroReveal();
});
