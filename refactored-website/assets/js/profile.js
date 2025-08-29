/* =============================================
   PROFILE COMPONENT JAVASCRIPT
   ============================================= */

class ProfileSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.photoElement = null;
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.error('Profile container not found');
            return;
        }
        
        this.createProfileStructure();
        this.setupInteractions();
        this.createParticles();
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
                        
                        <div class="photo-overlay">
                            <div class="photo-info">
                                <h4>Dr. Timothy J. Giardino</h4>
                                <p>Your AI Transformation Partner</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Background Particles -->
                <div class="profile-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
            </div>
        `;
        
        this.photoElement = this.container.querySelector('.profile-photo');
    }
    
    setupInteractions() {
        if (!this.photoElement) return;
        
        // Credential hover effects
        const credentialItems = this.container.querySelectorAll('.credential-item');
        credentialItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-3px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
        
        // Photo click for modal view
        this.photoElement.addEventListener('click', () => {
            this.showPhotoModal();
        });
    }
    
    createParticles() {
        const particles = this.container.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            const delay = Math.random() * 4;
            const duration = 6 + Math.random() * 4;
            
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
        });
    }
    
    showPhotoModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const img = document.createElement('img');
        img.src = this.photoElement.src;
        img.alt = this.photoElement.alt;
        img.style.cssText = `
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 102, 255, 0.3);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        });
        
        // Add modal animations
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize with error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        new ProfileSection('profile-container');
    } catch (error) {
        console.error('Failed to initialize Profile Section:', error);
        
        // Simple fallback
        const container = document.getElementById('profile-container');
        if (container) {
            container.innerHTML = `
                <div class="profile-layout">
                    <div class="profile-info">
                        <div class="profile-header">
                            <h3>Dr. Timothy J. Giardino</h3>
                            <div class="profile-title">Founder & CEO</div>
                            <div class="profile-description">
                                Your trusted AI transformation partner with 20+ years of experience.
                            </div>
                        </div>
                    </div>
                    <div class="profile-photo-section">
                        <div class="profile-photo-container">
                            <img src="assets/images/1711739037411.jpeg" 
                                 alt="Dr. Timothy J. Giardino" 
                                 class="profile-photo">
                        </div>
                    </div>
                </div>
            `;
        }
    }
});
