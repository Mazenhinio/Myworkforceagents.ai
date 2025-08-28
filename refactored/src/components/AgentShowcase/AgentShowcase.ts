/**
 * Agent Showcase Component
 * Handles agent carousel, navigation, and interactions
 */

import type { BaseComponent, ComponentConfig, AgentType, CarouselState } from '@/types';
import { querySelector, querySelectorAll, addEventListener } from '@/utils/dom.js';
import { eventBus } from '@/utils/events.js';
import { animateElement } from '@/utils/animations.js';
import { AGENTS, AGENT_ORDER } from '@/data/agents.js';

export interface AgentShowcaseConfig extends ComponentConfig {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  enableKeyboard?: boolean;
  enableSwipe?: boolean;
}

export class AgentShowcase implements BaseComponent {
  public element: HTMLElement;
  public config: AgentShowcaseConfig;
  
  private agentDisplay: HTMLElement | null = null;
  private agentCards: HTMLElement[] = [];
  private navArrows: HTMLElement[] = [];
  private currentIndex = 0;
  private autoPlayInterval: number | null = null;
  private isAutoPlaying = false;
  private cleanupFunctions: (() => void)[] = [];

  constructor(element: HTMLElement, config: AgentShowcaseConfig = {}) {
    this.element = element;
    this.config = {
      selector: '[data-component="agent-showcase"]',
      autoInit: true,
      debug: false,
      autoPlay: true,
      autoPlayInterval: 5000,
      enableKeyboard: true,
      enableSwipe: true,
      ...config
    };

    if (this.config.autoInit) {
      this.init();
    }
  }

  public init(): void {
    if (this.config.debug) {
      console.log('🚀 Initializing AgentShowcase component');
    }

    this.setupElements();
    this.bindEvents();
    this.setupAutoPlay();
    this.addInitializedClass();
  }

  public destroy(): void {
    if (this.config.debug) {
      console.log('🗑️ Destroying AgentShowcase component');
    }

    this.stopAutoPlay();
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }

  private setupElements(): void {
    this.agentDisplay = querySelector('[data-agent-display]', this.element);
    this.agentCards = querySelectorAll('[data-agent]', this.element);
    this.navArrows = querySelectorAll('[data-nav-arrow]', this.element);

    if (!this.agentDisplay || this.agentCards.length === 0) {
      console.error('❌ AgentShowcase: Required elements not found');
      return;
    }
  }

  private bindEvents(): void {
    // Navigation arrow clicks
    this.navArrows.forEach(arrow => {
      const direction = arrow.getAttribute('data-nav-arrow');
      const cleanup = addEventListener(arrow, 'click', () => {
        if (direction === 'prev') {
          this.previousAgent();
        } else if (direction === 'next') {
          this.nextAgent();
        }
      });
      this.cleanupFunctions.push(cleanup);
    });

    // Keyboard navigation
    if (this.config.enableKeyboard) {
      const keyboardHandler = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          this.previousAgent();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          this.nextAgent();
        }
      };

      this.element.addEventListener('keydown', keyboardHandler);
      this.cleanupFunctions.push(() => {
        this.element.removeEventListener('keydown', keyboardHandler);
      });
    }

    // Mouse hover to pause auto-play
    const pauseAutoPlay = () => {
      if (this.isAutoPlaying) {
        this.pauseAutoPlay();
      }
    };

    const resumeAutoPlay = () => {
      if (this.config.autoPlay && !this.isAutoPlaying) {
        this.startAutoPlay();
      }
    };

    this.element.addEventListener('mouseenter', pauseAutoPlay);
    this.element.addEventListener('mouseleave', resumeAutoPlay);
    this.cleanupFunctions.push(() => {
      this.element.removeEventListener('mouseenter', pauseAutoPlay);
      this.element.removeEventListener('mouseleave', resumeAutoPlay);
    });

    // Touch/swipe support
    if (this.config.enableSwipe) {
      this.setupSwipeSupport();
    }
  }

  private setupSwipeSupport(): void {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const touchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      isSwiping = false;
    };

    const touchMove = (event: TouchEvent) => {
      if (!startX || !startY) return;

      const deltaX = startX - event.touches[0].clientX;
      const deltaY = startY - event.touches[0].clientY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isSwiping = true;
        event.preventDefault();
      }
    };

    const touchEnd = (event: TouchEvent) => {
      if (!isSwiping) return;

      const deltaX = startX - event.changedTouches[0].clientX;
      const threshold = 50;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          this.nextAgent();
        } else {
          this.previousAgent();
        }
      }

      startX = 0;
      startY = 0;
      isSwiping = false;
    };

    this.element.addEventListener('touchstart', touchStart, { passive: true });
    this.element.addEventListener('touchmove', touchMove, { passive: false });
    this.element.addEventListener('touchend', touchEnd, { passive: true });

    this.cleanupFunctions.push(() => {
      this.element.removeEventListener('touchstart', touchStart);
      this.element.removeEventListener('touchmove', touchMove);
      this.element.removeEventListener('touchend', touchEnd);
    });
  }

  private setupAutoPlay(): void {
    if (this.config.autoPlay) {
      this.startAutoPlay();
    }
  }

  private startAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }

    this.isAutoPlaying = true;
    this.autoPlayInterval = window.setInterval(() => {
      this.nextAgent();
    }, this.config.autoPlayInterval);

    if (this.config.debug) {
      console.log('▶️ AgentShowcase: Auto-play started');
    }
  }

  private pauseAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.isAutoPlaying = false;

    if (this.config.debug) {
      console.log('⏸️ AgentShowcase: Auto-play paused');
    }
  }

  private stopAutoPlay(): void {
    this.pauseAutoPlay();
  }

  public nextAgent(): void {
    const nextIndex = (this.currentIndex + 1) % AGENT_ORDER.length;
    this.goToAgent(nextIndex, 'next');
  }

  public previousAgent(): void {
    const prevIndex = (this.currentIndex - 1 + AGENT_ORDER.length) % AGENT_ORDER.length;
    this.goToAgent(prevIndex, 'prev');
  }

  public goToAgent(index: number, direction: 'next' | 'prev' | 'direct' = 'direct'): void {
    if (index < 0 || index >= AGENT_ORDER.length) {
      console.warn(`⚠️ AgentShowcase: Invalid agent index: ${index}`);
      return;
    }

    const previousIndex = this.currentIndex;
    this.currentIndex = index;

    this.updateCarousel(direction);
    this.updateNavigationState();
    this.emitAgentChangeEvent(AGENT_ORDER[index], index);

    if (this.config.debug) {
      console.log(`🔄 AgentShowcase: Switched to ${AGENT_ORDER[index]} (${direction})`);
    }
  }

  private updateCarousel(direction: 'next' | 'prev' | 'direct'): void {
    const currentCard = this.agentCards[this.currentIndex];
    const previousCard = this.agentCards.find(card => card.classList.contains('active'));

    if (!currentCard) return;

    // Remove active class from all cards
    this.agentCards.forEach(card => {
      card.classList.remove('active', 'leaving', 'entering');
    });

    // Add leaving animation to previous card
    if (previousCard && previousCard !== currentCard) {
      previousCard.classList.add('leaving');
      setTimeout(() => {
        previousCard.classList.remove('leaving');
      }, 600);
    }

    // Add entering animation to new card
    currentCard.classList.add('entering');
    setTimeout(() => {
      currentCard.classList.remove('entering');
      currentCard.classList.add('active');
    }, 150);
  }

  private updateNavigationState(): void {
    // Update arrow states if needed
    this.navArrows.forEach(arrow => {
      const direction = arrow.getAttribute('data-nav-arrow');
      if (direction === 'prev') {
        arrow.setAttribute('aria-label', `Previous Agent (${AGENT_ORDER[this.currentIndex - 1] || AGENT_ORDER[AGENT_ORDER.length - 1]})`);
      } else if (direction === 'next') {
        arrow.setAttribute('aria-label', `Next Agent (${AGENT_ORDER[this.currentIndex + 1] || AGENT_ORDER[0]})`);
      }
    });
  }

  private emitAgentChangeEvent(agentId: string, index: number): void {
    eventBus.emit('agent:change', { agentId, index });
  }

  private addInitializedClass(): void {
    this.element.classList.add('mwa-initialized');
  }

  // Public methods for external control
  public getCurrentAgent(): AgentType {
    return AGENT_ORDER[this.currentIndex] as AgentType;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getAgentData(agentId: AgentType) {
    return AGENTS[agentId];
  }

  public setAutoPlay(enabled: boolean): void {
    this.config.autoPlay = enabled;
    if (enabled && !this.isAutoPlaying) {
      this.startAutoPlay();
    } else if (!enabled && this.isAutoPlaying) {
      this.stopAutoPlay();
    }
  }

  public getCarouselState(): CarouselState {
    return {
      currentIndex: this.currentIndex,
      agents: AGENT_ORDER,
      isAutoPlaying: this.isAutoPlaying,
      direction: 'direct'
    };
  }

  public refresh(): void {
    this.updateNavigationState();
  }
}
