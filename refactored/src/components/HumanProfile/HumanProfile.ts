/**
 * Human Profile Component
 * Handles Dr. G profile section with CTA interactions
 */

import type { BaseComponent, ComponentConfig } from '@/types';
import { querySelector, querySelectorAll, addEventListener } from '@/utils/dom.js';
import { eventBus } from '@/utils/events.js';
import { animateElement } from '@/utils/animations.js';

export interface HumanProfileConfig extends ComponentConfig {
  enableStatsAnimation?: boolean;
  enableImageHover?: boolean;
}

export class HumanProfile implements BaseComponent {
  public element: HTMLElement;
  public config: HumanProfileConfig;
  
  private ctaButtons: HTMLElement[] = [];
  private statItems: HTMLElement[] = [];
  private expertiseTags: HTMLElement[] = [];
  private cleanupFunctions: (() => void)[] = [];

  constructor(element: HTMLElement, config: HumanProfileConfig = {}) {
    this.element = element;
    this.config = {
      selector: '[data-component="human-profile"]',
      autoInit: true,
      debug: false,
      enableStatsAnimation: true,
      enableImageHover: true,
      ...config
    };

    if (this.config.autoInit) {
      this.init();
    }
  }

  public init(): void {
    if (this.config.debug) {
      console.log('🚀 Initializing HumanProfile component');
    }

    this.setupElements();
    this.bindEvents();
    this.setupAnimations();
    this.addInitializedClass();
  }

  public destroy(): void {
    if (this.config.debug) {
      console.log('🗑️ Destroying HumanProfile component');
    }

    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }

  private setupElements(): void {
    this.ctaButtons = querySelectorAll('[data-cta-action]', this.element);
    this.statItems = querySelectorAll('.stat-item', this.element);
    this.expertiseTags = querySelectorAll('.expertise-tag', this.element);
  }

  private bindEvents(): void {
    // CTA button clicks
    this.ctaButtons.forEach(button => {
      const action = button.getAttribute('data-cta-action');
      const cleanup = addEventListener(button, 'click', () => {
        this.handleCTAAction(action);
      });
      this.cleanupFunctions.push(cleanup);
    });

    // Expertise tag interactions
    this.expertiseTags.forEach(tag => {
      const cleanup = addEventListener(tag, 'click', () => {
        this.handleExpertiseClick(tag);
      });
      this.cleanupFunctions.push(cleanup);
    });

    // Intersection Observer for animations
    if (this.config.enableStatsAnimation) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(this.element);
  }

  private setupAnimations(): void {
    // Animate elements on load
    const animatedElements = [
      '.profile-title',
      '.profile-subtitle',
      '.profile-image-container',
      '.profile-bio',
      '.profile-expertise',
      '.profile-cta'
    ];

    animatedElements.forEach((selector, index) => {
      const element = querySelector(selector, this.element);
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          animateElement(element, {
            opacity: '1',
            transform: 'translateY(0)'
          }, {
            duration: 600,
            easing: 'ease-out',
            delay: index * 100
          });
        }, 200);
      }
    });
  }

  private animateStats(): void {
    this.statItems.forEach((stat, index) => {
      const numberElement = stat.querySelector('.stat-number') as HTMLElement;
      if (!numberElement) return;

      const finalNumber = parseInt(numberElement.textContent?.replace(/\D/g, '') || '0');
      const suffix = numberElement.textContent?.replace(/\d/g, '') || '';
      
      // Animate number counting
      let currentNumber = 0;
      const increment = finalNumber / 30; // 30 steps
      const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
          currentNumber = finalNumber;
          clearInterval(timer);
        }
        numberElement.textContent = Math.floor(currentNumber) + suffix;
      }, 50);

      // Animate stat item appearance
      setTimeout(() => {
        animateElement(stat, {
          transform: 'translateY(0) scale(1)',
          opacity: '1'
        }, {
          duration: 400,
          easing: 'ease-out'
        });
      }, index * 100);
    });
  }

  private handleCTAAction(action: string | null): void {
    if (!action) return;

    if (this.config.debug) {
      console.log(`🎯 HumanProfile: CTA action clicked - ${action}`);
    }

    // Emit event
    eventBus.emit('profile:cta', { action });

    // Handle specific actions
    switch (action) {
      case 'schedule-consultation':
        this.handleScheduleConsultation();
        break;
      case 'view-case-studies':
        this.handleViewCaseStudies();
        break;
      default:
        console.warn(`⚠️ HumanProfile: Unknown CTA action - ${action}`);
    }
  }

  private handleScheduleConsultation(): void {
    // Open consultation scheduling
    const consultationUrl = 'https://calendly.com/myworkforceagents/consultation';
    window.open(consultationUrl, '_blank');
    
    // Track event
    eventBus.emit('analytics:event', {
      category: 'Profile',
      action: 'Schedule Consultation',
      label: 'Dr. G Profile'
    });
  }

  private handleViewCaseStudies(): void {
    // Navigate to case studies
    const caseStudiesUrl = 'https://myworkforceagents.ai/case-studies';
    window.open(caseStudiesUrl, '_blank');
    
    // Track event
    eventBus.emit('analytics:event', {
      category: 'Profile',
      action: 'View Case Studies',
      label: 'Dr. G Profile'
    });
  }

  private handleExpertiseClick(tag: HTMLElement): void {
    const expertise = tag.textContent;
    
    if (this.config.debug) {
      console.log(`🎯 HumanProfile: Expertise clicked - ${expertise}`);
    }

    // Animate tag
    animateElement(tag, {
      transform: 'scale(1.1)',
      boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
    }, {
      duration: 200,
      easing: 'ease-out'
    }).then(() => {
      animateElement(tag, {
        transform: 'scale(1)',
        boxShadow: '0 4px 12px rgba(255, 107, 53, 0.2)'
      }, {
        duration: 200,
        easing: 'ease-out'
      });
    });

    // Emit event
    eventBus.emit('profile:expertise', { expertise });

    // Track event
    eventBus.emit('analytics:event', {
      category: 'Profile',
      action: 'Expertise Click',
      label: expertise
    });
  }

  private addInitializedClass(): void {
    this.element.classList.add('mwa-initialized');
  }

  // Public methods for external control
  public triggerCTA(action: string): void {
    this.handleCTAAction(action);
  }

  public animateStats(): void {
    this.animateStats();
  }

  public getStats(): Array<{ number: string; label: string }> {
    return this.statItems.map(stat => {
      const number = stat.querySelector('.stat-number')?.textContent || '';
      const label = stat.querySelector('.stat-label')?.textContent || '';
      return { number, label };
    });
  }

  public getExpertise(): string[] {
    return this.expertiseTags.map(tag => tag.textContent || '');
  }
}
