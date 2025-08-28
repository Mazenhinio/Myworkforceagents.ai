/**
 * Footer Component
 * Handles footer CTA actions and link tracking
 */

import type { BaseComponent, ComponentConfig } from '@/types';
import { querySelector, querySelectorAll, addEventListener } from '@/utils/dom.js';
import { eventBus } from '@/utils/events.js';

export interface FooterConfig extends ComponentConfig {
  enableAnalytics?: boolean;
  enableSocialTracking?: boolean;
}

export class Footer implements BaseComponent {
  public element: HTMLElement;
  public config: FooterConfig;
  
  private ctaButtons: HTMLElement[] = [];
  private footerLinks: HTMLElement[] = [];
  private socialLinks: HTMLElement[] = [];
  private cleanupFunctions: (() => void)[] = [];

  constructor(element: HTMLElement, config: FooterConfig = {}) {
    this.element = element;
    this.config = {
      selector: '[data-component="footer"]',
      autoInit: true,
      debug: false,
      enableAnalytics: true,
      enableSocialTracking: true,
      ...config
    };

    if (this.config.autoInit) {
      this.init();
    }
  }

  public init(): void {
    if (this.config.debug) {
      console.log('🚀 Initializing Footer component');
    }

    this.setupElements();
    this.bindEvents();
    this.addInitializedClass();
  }

  public destroy(): void {
    if (this.config.debug) {
      console.log('🗑️ Destroying Footer component');
    }

    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }

  private setupElements(): void {
    this.ctaButtons = querySelectorAll('[data-footer-action]', this.element);
    this.footerLinks = querySelectorAll('[data-footer-link]', this.element);
    this.socialLinks = querySelectorAll('[data-social]', this.element);
  }

  private bindEvents(): void {
    // CTA button clicks
    this.ctaButtons.forEach(button => {
      const action = button.getAttribute('data-footer-action');
      const cleanup = addEventListener(button, 'click', () => {
        this.handleCTAAction(action);
      });
      this.cleanupFunctions.push(cleanup);
    });

    // Footer link clicks
    this.footerLinks.forEach(link => {
      const linkType = link.getAttribute('data-footer-link');
      const cleanup = addEventListener(link, 'click', () => {
        this.handleFooterLinkClick(linkType, link);
      });
      this.cleanupFunctions.push(cleanup);
    });

    // Social link clicks
    this.socialLinks.forEach(link => {
      const platform = link.getAttribute('data-social');
      const cleanup = addEventListener(link, 'click', () => {
        this.handleSocialLinkClick(platform, link);
      });
      this.cleanupFunctions.push(cleanup);
    });
  }

  private handleCTAAction(action: string | null): void {
    if (!action) return;

    if (this.config.debug) {
      console.log(`🎯 Footer: CTA action clicked - ${action}`);
    }

    // Emit event
    eventBus.emit('footer:cta', { action });

    // Track analytics
    if (this.config.enableAnalytics) {
      eventBus.emit('analytics:event', {
        category: 'Footer',
        action: 'CTA Click',
        label: action
      });
    }

    // Handle specific actions
    switch (action) {
      case 'get-started':
        this.handleGetStarted();
        break;
      case 'contact-sales':
        this.handleContactSales();
        break;
      default:
        console.warn(`⚠️ Footer: Unknown CTA action - ${action}`);
    }
  }

  private handleGetStarted(): void {
    // Navigate to get started page
    const getStartedUrl = 'https://myworkforceagents.ai/get-started';
    window.open(getStartedUrl, '_blank');
  }

  private handleContactSales(): void {
    // Open contact sales form or phone
    const contactUrl = 'https://myworkforceagents.ai/contact-sales';
    window.open(contactUrl, '_blank');
  }

  private handleFooterLinkClick(linkType: string | null, link: HTMLElement): void {
    if (!linkType) return;

    if (this.config.debug) {
      console.log(`🎯 Footer: Link clicked - ${linkType}`);
    }

    // Emit event
    eventBus.emit('footer:link', { linkType, href: link.getAttribute('href') });

    // Track analytics
    if (this.config.enableAnalytics) {
      eventBus.emit('analytics:event', {
        category: 'Footer',
        action: 'Link Click',
        label: linkType
      });
    }
  }

  private handleSocialLinkClick(platform: string | null, link: HTMLElement): void {
    if (!platform) return;

    if (this.config.debug) {
      console.log(`🎯 Footer: Social link clicked - ${platform}`);
    }

    // Emit event
    eventBus.emit('footer:social', { platform, href: link.getAttribute('href') });

    // Track analytics
    if (this.config.enableAnalytics && this.config.enableSocialTracking) {
      eventBus.emit('analytics:event', {
        category: 'Footer',
        action: 'Social Click',
        label: platform
      });
    }
  }

  private addInitializedClass(): void {
    this.element.classList.add('mwa-initialized');
  }

  // Public methods for external control
  public triggerCTA(action: string): void {
    this.handleCTAAction(action);
  }

  public getCTAActions(): string[] {
    return this.ctaButtons.map(button => 
      button.getAttribute('data-footer-action') || ''
    ).filter(Boolean);
  }

  public getFooterLinks(): Array<{ type: string; href: string }> {
    return this.footerLinks.map(link => ({
      type: link.getAttribute('data-footer-link') || '',
      href: link.getAttribute('href') || ''
    }));
  }

  public getSocialLinks(): Array<{ platform: string; href: string }> {
    return this.socialLinks.map(link => ({
      platform: link.getAttribute('data-social') || '',
      href: link.getAttribute('href') || ''
    }));
  }

  public updateConfig(newConfig: Partial<FooterConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}
