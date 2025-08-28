/**
 * Navigation Component
 * Handles mobile menu, scroll effects, and smooth scrolling
 */

import type { BaseComponent, ComponentConfig } from '@/types';
import { querySelector, addEventListener, toggleClass } from '@/utils/dom.js';
import { isMobile } from '@/utils/device.js';
import { eventBus } from '@/utils/events.js';
import { debounce } from '@/utils/events.js';

export interface NavigationConfig extends ComponentConfig {
  scrollThreshold?: number;
  mobileBreakpoint?: number;
}

export class Navigation implements BaseComponent {
  public element: HTMLElement;
  public config: NavigationConfig;
  
  private navLinks: HTMLElement | null = null;
  private mobileMenuBtn: HTMLElement | null = null;
  private menuIcon: HTMLElement | null = null;
  private isMenuOpen = false;
  private scrollHandler: (() => void) | null = null;
  private cleanupFunctions: (() => void)[] = [];

  constructor(element: HTMLElement, config: NavigationConfig = {}) {
    this.element = element;
    this.config = {
      selector: '[data-component="navigation"]',
      autoInit: true,
      debug: false,
      scrollThreshold: 50,
      mobileBreakpoint: 768,
      ...config
    };

    if (this.config.autoInit) {
      this.init();
    }
  }

  public init(): void {
    if (this.config.debug) {
      console.log('🚀 Initializing Navigation component');
    }

    this.setupElements();
    this.bindEvents();
    this.setupScrollEffect();
    this.addInitializedClass();
  }

  public destroy(): void {
    if (this.config.debug) {
      console.log('🗑️ Destroying Navigation component');
    }

    // Clean up all event listeners
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];

    // Remove scroll handler
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    // Reset state
    this.isMenuOpen = false;
    this.closeMobileMenu();
  }

  private setupElements(): void {
    this.navLinks = querySelector('[data-nav-links]', this.element);
    this.mobileMenuBtn = querySelector('[data-mobile-menu-btn]', this.element);
    this.menuIcon = querySelector('[data-menu-icon]', this.element);

    if (!this.navLinks || !this.mobileMenuBtn) {
      console.error('❌ Navigation: Required elements not found');
      return;
    }
  }

  private bindEvents(): void {
    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      const cleanup = addEventListener(this.mobileMenuBtn, 'click', () => {
        this.toggleMobileMenu();
      });
      this.cleanupFunctions.push(cleanup);
    }

    // Navigation link clicks (smooth scrolling)
    if (this.navLinks) {
      const cleanup = addEventListener(this.navLinks, 'click', (event) => {
        this.handleNavLinkClick(event);
      });
      this.cleanupFunctions.push(cleanup);
    }

    // Close mobile menu when clicking outside
    const outsideClickHandler = (event: Event) => {
      if (this.isMenuOpen && !this.element.contains(event.target as Node)) {
        this.closeMobileMenu();
      }
    };

    document.addEventListener('click', outsideClickHandler);
    this.cleanupFunctions.push(() => {
      document.removeEventListener('click', outsideClickHandler);
    });

    // Close mobile menu on escape key
    const escapeKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    };

    document.addEventListener('keydown', escapeKeyHandler);
    this.cleanupFunctions.push(() => {
      document.removeEventListener('keydown', escapeKeyHandler);
    });

    // Handle window resize
    const resizeHandler = debounce(() => {
      if (!isMobile() && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, 250);

    window.addEventListener('resize', resizeHandler);
    this.cleanupFunctions.push(() => {
      window.removeEventListener('resize', resizeHandler);
    });
  }

  private setupScrollEffect(): void {
    this.scrollHandler = debounce(() => {
      const scrollY = window.scrollY;
      const threshold = this.config.scrollThreshold || 50;

      if (scrollY > threshold) {
        this.element.classList.add('scrolled');
      } else {
        this.element.classList.remove('scrolled');
      }

      // Emit scroll progress event
      const scrollProgress = Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100);
      eventBus.emit('scroll:progress', { percentage: scrollProgress });
    }, 10);

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  private toggleMobileMenu(): void {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  private openMobileMenu(): void {
    if (!this.navLinks || !this.mobileMenuBtn) return;

    this.isMenuOpen = true;
    toggleClass(this.navLinks, 'active', true);
    this.mobileMenuBtn.setAttribute('data-menu-open', 'true');

    // Animate menu icon
    if (this.menuIcon) {
      this.menuIcon.style.transform = 'rotate(90deg)';
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Emit event
    eventBus.emit('navigation:toggle', { isOpen: true });

    if (this.config.debug) {
      console.log('📱 Mobile menu opened');
    }
  }

  private closeMobileMenu(): void {
    if (!this.navLinks || !this.mobileMenuBtn) return;

    this.isMenuOpen = false;
    toggleClass(this.navLinks, 'active', false);
    this.mobileMenuBtn.setAttribute('data-menu-open', 'false');

    // Reset menu icon
    if (this.menuIcon) {
      this.menuIcon.style.transform = 'rotate(0deg)';
    }

    // Restore body scroll
    document.body.style.overflow = '';

    // Emit event
    eventBus.emit('navigation:toggle', { isOpen: false });

    if (this.config.debug) {
      console.log('📱 Mobile menu closed');
    }
  }

  private handleNavLinkClick(event: Event): void {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

    if (!link) return;

    event.preventDefault();

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    // Close mobile menu if open
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Smooth scroll to target
    this.smoothScrollTo(href);

    // Track navigation
    const linkType = link.getAttribute('data-nav-link');
    if (linkType && this.config.debug) {
      console.log(`🧭 Navigation: Clicked ${linkType} link`);
    }
  }

  private smoothScrollTo(targetId: string): void {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) {
      console.warn(`⚠️ Navigation: Target element not found: ${targetId}`);
      return;
    }

    const headerHeight = this.element.offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  private addInitializedClass(): void {
    this.element.classList.add('mwa-initialized');
  }

  // Public methods for external control
  public openMenu(): void {
    if (!this.isMenuOpen) {
      this.openMobileMenu();
    }
  }

  public closeMenu(): void {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  public isMenuOpen(): boolean {
    return this.isMenuOpen;
  }

  public scrollToSection(sectionId: string): void {
    this.smoothScrollTo(sectionId);
  }
}
