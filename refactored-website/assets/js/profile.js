/* =============================================
   PROFILE COMPONENT JAVASCRIPT
   ============================================= */

class ProfileSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error('Profile container not found');
            return;
        }
        
        this.createProfileStructure();
        this.setupRevealAnimations();
        this.setupInteractions();
    }
    
    createProfileStructure() {
        this.container.innerHTML = `
            <div class="profile-layout">
                <!-- Information Section -->
                <div class="profile-info">
                    <div class="profile-header">
                        <h3>Dr. Timothy J. Giardino</h3>
                        <div class="profile-title">Founder & CEO</div>
                        <div class="profile-description">
                            Trusted AI transformation partner with 20+ years of leadership experience, 
                            combining military precision and academic excellence to help businesses thrive in the AI era.
                        </div>
                    </div>
                    
                    <div class="credentials-grid">
                        <div class="credential-item">
                            <div class="credential-icon">
                                <i class="fas fa-medal"></i>
                            </div>
                            <div class="credential-content">
                                <h5>Army Veteran</h5>
                                <p>20 years of proven leadership</p>
                            </div>
                        </div>
                        
                        <div class="credential-item">
                            <div class="credential-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="credential-content">
                                <h5>Doctorate in Business</h5>
                                <p>Academic & practical expertise</p>
                            </div>
                        </div>
                        
                        <div class="credential-item">
                            <div class="credential-icon">
                                <i class="fas fa-briefcase"></i>
                            </div>
                            <div class="credential-content">
                                <h5>HRIS Executive</h5>
                                <p>Enterprise transformation leader</p>
                            </div>
                        </div>
                        
                        <div class="credential-item">
                            <div class="credential-icon">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="credential-content">
                                <h5>AI Entrepreneur</h5>
                                <p>Small business AI pioneer</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Photo Section -->
                <div class="profile-photo-section">
                    <div class="profile-photo-container">
                        <img src="assets/images/1711739037411.jpeg" 
                             alt="Dr. Timothy J. Giardino - Founder & CEO" 
                             class="profile-photo"
                             loading="lazy">
                    </div>
                </div>
            </div>
        `;
    }
    
    setupRevealAnimations() {
        // Get animation elements
        const profileInfo = this.container.querySelector('.profile-info');
        const profilePhoto = this.container.querySelector('.profile-photo-section');
        const credentialItems = this.container.querySelectorAll('.credential-item');
        
        // Set initial animation states (consistent with journey.js style)
        if (profileInfo) {
            profileInfo.style.opacity = '0';
            profileInfo.style.transform = 'translateX(-50px)'; // Slide from left
            profileInfo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (profilePhoto) {
            profilePhoto.style.opacity = '0';
            profilePhoto.style.transform = 'translateX(50px)'; // Slide from right  
            profilePhoto.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        }
        
        // Credentials slide in from right (like challenge items)
        credentialItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            item.style.transition = `opacity 0.6s ease ${0.4 + index * 0.15}s, transform 0.6s ease ${0.4 + index * 0.15}s`;
        });
        
        // Set up intersection observer for scroll-based reveals
        this.setupScrollReveal();
    }
    
    setupScrollReveal() {
        const options = {
            threshold: 0.2,
            rootMargin: '-50px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealProfileElements();
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, options);
        
        // Observe the profile container
        observer.observe(this.container);
    }
    
    revealProfileElements() {
        const profileInfo = this.container.querySelector('.profile-info');
        const profilePhoto = this.container.querySelector('.profile-photo-section');
        const credentialItems = this.container.querySelectorAll('.credential-item');
        
        // Reveal profile info (slide from left)
        if (profileInfo) {
            profileInfo.style.opacity = '1';
            profileInfo.style.transform = 'translateX(0)';
        }
        
        // Reveal profile photo (slide from right)
        if (profilePhoto) {
            profilePhoto.style.opacity = '1';
            profilePhoto.style.transform = 'translateX(0)';
        }
        
        // Reveal credentials (staggered from right)
        credentialItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        });
    }
    
    setupInteractions() {
        // Clean hover effects for credentials (consistent with site style)
        const credentialItems = this.container.querySelectorAll('.credential-item');
        credentialItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-2px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        new ProfileSection('profile-container');
    } catch (error) {
        console.error('Failed to initialize Profile Section:', error);
    }
});
