/**
 * Hero Component
 * Handles experience card interactions and animations
 */

import type { BaseComponent, ComponentConfig } from '@/types';
import { querySelector, querySelectorAll, addEventListener } from '@/utils/dom.js';
import { eventBus } from '@/utils/events.js';
import { animateElement, scale } from '@/utils/animations.js';

export interface HeroConfig extends ComponentConfig {
  cardAnimationDuration?: number;
  enableHoverEffects?: boolean;
}

export class Hero implements BaseComponent {
  public element: HTMLElement;
  public config: HeroConfig;
  
  private cardsContainer: HTMLElement | null = null;
  private gameCards: HTMLElement[] = [];
  private selectButtons: HTMLElement[] = [];
  private cleanupFunctions: (() => void)[] = [];

  constructor(element: HTMLElement, config: HeroConfig = {}) {
    this.element = element;
    this.config = {
      selector: '[data-component="hero"]',
      autoInit: true,
      debug: false,
      cardAnimationDuration: 300,
      enableHoverEffects: true,
      ...config
    };

    if (this.config.autoInit) {
      this.init();
    }
  }

  public init(): void {
    if (this.config.debug) {
      console.log('🚀 Initializing Hero component');
    }

    this.setupElements();
    this.bindEvents();
    this.setupAnimations();
    this.addInitializedClass();
  }

  public destroy(): void {
    if (this.config.debug) {
      console.log('🗑️ Destroying Hero component');
    }

    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }

  private setupElements(): void {
    this.cardsContainer = querySelector('[data-cards-container]', this.element);
    this.gameCards = querySelectorAll('[data-card]', this.element);
    this.selectButtons = querySelectorAll('[data-card-type]', this.element);

    if (!this.cardsContainer) {
      console.error('❌ Hero: Cards container not found');
      return;
    }
  }

  private bindEvents(): void {
    // Card hover effects
    if (this.config.enableHoverEffects) {
      this.gameCards.forEach(card => {
        const cleanup = addEventListener(card, 'mouseenter', () => {
          this.handleCardHover(card, true);
        });
        this.cleanupFunctions.push(cleanup);

        const cleanup2 = addEventListener(card, 'mouseleave', () => {
          this.handleCardHover(card, false);
        });
        this.cleanupFunctions.push(cleanup2);
      });
    }

    // Select button clicks
    this.selectButtons.forEach(button => {
      const cleanup = addEventListener(button, 'click', (event) => {
        this.handleCardSelection(event);
      });
      this.cleanupFunctions.push(cleanup);
    });

    // Keyboard navigation
    const keyboardHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.target as HTMLElement;
        const card = target.closest('[data-card]') as HTMLElement;
        if (card) {
          event.preventDefault();
          this.handleCardSelection(event);
        }
      }
    };

    this.element.addEventListener('keydown', keyboardHandler);
    this.cleanupFunctions.push(() => {
      this.element.removeEventListener('keydown', keyboardHandler);
    });
  }

  private setupAnimations(): void {
    // Stagger card animations
    this.gameCards.forEach((card, index) => {
      const delay = index * 200;
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        requestAnimationFrame(() => {
          animateElement(card, {
            opacity: '1',
            transform: 'translateY(0)'
          }, {
            duration: 600,
            easing: 'ease-out',
            delay: delay
          });
        });
      }, 100);
    });
  }

  private handleCardHover(card: HTMLElement, isHovering: boolean): void {
    const iconContainer = card.querySelector('.icon-container') as HTMLElement;
    const button = card.querySelector('.btn-select') as HTMLElement;

    if (isHovering) {
      // Scale up icon
      if (iconContainer) {
        scale(iconContainer, 1, 1.1, { duration: 200, easing: 'ease-out' });
      }

      // Add glow effect
      card.style.boxShadow = '0 20px 60px rgba(255, 107, 53, 0.3)';
    } else {
      // Scale down icon
      if (iconContainer) {
        scale(iconContainer, 1.1, 1, { duration: 200, easing: 'ease-out' });
      }

      // Remove glow effect
      card.style.boxShadow = '';
    }
  }

  private handleCardSelection(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-card-type]') as HTMLElement;
    const card = target.closest('[data-card]') as HTMLElement;

    if (!button || !card) return;

    const cardType = button.getAttribute('data-card-type');
    if (!cardType) return;

    // Add selection feedback
    this.animateCardSelection(card, button);

    // Emit selection event
    eventBus.emit('card:select', { cardId: cardType, cardType });

    if (this.config.debug) {
      console.log(`🎯 Hero: Card selected - ${cardType}`);
    }

    // Handle the selection (placeholder for business logic)
    this.handleExperienceSelection(cardType);
  }

  private animateCardSelection(card: HTMLElement, button: HTMLElement): void {
    // Button animation
    animateElement(button, {
      transform: 'scale(0.95)'
    }, {
      duration: 100,
      easing: 'ease-out'
    }).then(() => {
      animateElement(button, {
        transform: 'scale(1)'
      }, {
        duration: 100,
        easing: 'ease-out'
      });
    });

    // Card glow effect
    const originalBoxShadow = card.style.boxShadow;
    card.style.boxShadow = '0 25px 80px rgba(255, 107, 53, 0.5)';

    setTimeout(() => {
      card.style.boxShadow = originalBoxShadow;
    }, 500);
  }

  private handleExperienceSelection(cardType: string): void {
    // This would typically trigger navigation or state change
    switch (cardType) {
      case 'click':
        console.log('👆 Click/Tap experience selected');
        // Navigate to click experience
        break;
      case 'type':
        console.log('⌨️ Type/Text experience selected');
        // Navigate to type experience
        break;
      case 'voice':
        console.log('🎤 Voice/Talk experience selected');
        // Navigate to voice experience
        break;
      default:
        console.warn(`⚠️ Unknown card type: ${cardType}`);
    }
  }

  private addInitializedClass(): void {
    this.element.classList.add('mwa-initialized');
  }

  // Public methods for external control
  public selectCard(cardType: string): void {
    const card = this.element.querySelector(`[data-card="${cardType}"]`) as HTMLElement;
    const button = card?.querySelector(`[data-card-type="${cardType}"]`) as HTMLElement;
    
    if (card && button) {
      this.animateCardSelection(card, button);
      this.handleExperienceSelection(cardType);
    }
  }

  public resetCards(): void {
    this.gameCards.forEach(card => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  }

  public enableHoverEffects(enable: boolean): void {
    this.config.enableHoverEffects = enable;
  }
}
