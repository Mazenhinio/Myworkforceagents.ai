/**
 * Main Application Entry Point
 * Initializes all components and manages the application lifecycle
 */

import { Navigation } from '@/components/Navigation/index.js';
import { Hero } from '@/components/Hero/index.js';
import { AgentShowcase } from '@/components/AgentShowcase/index.js';
import { AgentTooltips } from '@/components/AgentTooltips/index.js';
import { HumanProfile } from '@/components/HumanProfile/index.js';
import { Footer } from '@/components/Footer/index.js';
import { eventBus } from '@/utils/events.js';
import { isMobile } from '@/utils/device.js';

interface AppConfig {
  debug: boolean;
  enableAnalytics: boolean;
  enableTooltips: boolean;
  enableAutoPlay: boolean;
}

class MyWorkforceAgentsApp {
  private config: AppConfig;
  private components: Map<string, any> = new Map();
  private isInitialized = false;

  constructor(config: AppConfig = {
    debug: false,
    enableAnalytics: true,
    enableTooltips: true,
    enableAutoPlay: true
  }) {
    this.config = config;
  }

  public async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('⚠️ App already initialized');
      return;
    }

    try {
      console.log('🚀 Initializing MyWorkforceAgents.AI Application...');
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize components
      await this.initializeComponents();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Setup analytics
      if (this.config.enableAnalytics) {
        this.setupAnalytics();
      }

      this.isInitialized = true;
      console.log('✅ Application initialized successfully');
      
      // Emit app ready event
      eventBus.emit('app:ready', { timestamp: Date.now() });
      
    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
      throw error;
    }
  }

  private async initializeComponents(): Promise<void> {
    const componentInitializers = [
      { name: 'Navigation', selector: '[data-component="navigation"]', class: Navigation },
      { name: 'Hero', selector: '[data-component="hero"]', class: Hero },
      { name: 'AgentShowcase', selector: '[data-component="agent-showcase"]', class: AgentShowcase },
      { name: 'AgentTooltips', selector: '[data-component="agent-tooltips"]', class: AgentTooltips },
      { name: 'HumanProfile', selector: '[data-component="human-profile"]', class: HumanProfile },
      { name: 'Footer', selector: '[data-component="footer"]', class: Footer }
    ];

    for (const { name, selector, class: ComponentClass } of componentInitializers) {
      try {
        const element = document.querySelector(selector) as HTMLElement;
        if (!element) {
          console.warn(`⚠️ Component element not found: ${selector}`);
          continue;
        }

        const component = new ComponentClass(element, {
          debug: this.config.debug,
          autoInit: true
        });

        this.components.set(name, component);
        
        if (this.config.debug) {
          console.log(`✅ ${name} component initialized`);
        }
      } catch (error) {
        console.error(`❌ Failed to initialize ${name} component:`, error);
      }
    }
  }

  private setupGlobalEvents(): void {
    // Handle component events
    eventBus.on('agent:change', (data) => {
      if (this.config.debug) {
        console.log('🔄 Agent changed:', data);
      }
      
      // Update tooltips if agent showcase changes
      const tooltips = this.components.get('AgentTooltips');
      if (tooltips && data.agentId) {
        // Tooltips will automatically update based on active agent
      }
    });

    eventBus.on('tooltip:show', (data) => {
      if (this.config.debug) {
        console.log('💡 Tooltip shown:', data);
      }
    });

    eventBus.on('card:select', (data) => {
      if (this.config.debug) {
        console.log('🎯 Card selected:', data);
      }
    });

    // Handle navigation events
    eventBus.on('navigation:toggle', (data) => {
      if (this.config.debug) {
        console.log('📱 Navigation toggled:', data);
      }
    });

    // Handle CTA events
    eventBus.on('footer:cta', (data) => {
      if (this.config.debug) {
        console.log('🎯 Footer CTA:', data);
      }
    });

    eventBus.on('profile:cta', (data) => {
      if (this.config.debug) {
        console.log('🎯 Profile CTA:', data);
      }
    });

    // Handle scroll events
    eventBus.on('scroll:progress', (data) => {
      // Update scroll progress indicators if needed
      if (this.config.debug && data.percentage % 25 === 0) {
        console.log(`📊 Scroll progress: ${data.percentage}%`);
      }
    });

    // Handle window resize
    let resizeTimeout: number;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });
  }

  private setupAnalytics(): void {
    // Track page views
    eventBus.emit('analytics:pageview', {
      page: window.location.pathname,
      title: document.title
    });

    // Track component interactions
    eventBus.on('analytics:event', (data) => {
      if (this.config.debug) {
        console.log('📊 Analytics event:', data);
      }
      
      // Here you would send to your analytics service
      // gtag('event', data.action, {
      //   event_category: data.category,
      //   event_label: data.label
      // });
    });
  }

  private handleResize(): void {
    const isMobileNow = isMobile();
    
    // Update components that need to know about screen size changes
    const agentShowcase = this.components.get('AgentShowcase');
    if (agentShowcase && typeof agentShowcase.refresh === 'function') {
      agentShowcase.refresh();
    }

    // Emit resize event
    eventBus.emit('app:resize', { isMobile: isMobileNow });
  }

  private handlePageHidden(): void {
    // Pause auto-playing components
    const agentShowcase = this.components.get('AgentShowcase');
    if (agentShowcase && typeof agentShowcase.setAutoPlay === 'function') {
      agentShowcase.setAutoPlay(false);
    }

    eventBus.emit('app:pagehidden');
  }

  private handlePageVisible(): void {
    // Resume auto-playing components
    if (this.config.enableAutoPlay) {
      const agentShowcase = this.components.get('AgentShowcase');
      if (agentShowcase && typeof agentShowcase.setAutoPlay === 'function') {
        agentShowcase.setAutoPlay(true);
      }
    }

    eventBus.emit('app:pagevisible');
  }

  // Public methods for external control
  public getComponent(name: string): any {
    return this.components.get(name);
  }

  public getAllComponents(): Map<string, any> {
    return new Map(this.components);
  }

  public destroy(): void {
    console.log('🗑️ Destroying application...');
    
    // Destroy all components
    this.components.forEach((component, name) => {
      if (component && typeof component.destroy === 'function') {
        component.destroy();
      }
    });
    
    this.components.clear();
    this.isInitialized = false;
    
    console.log('✅ Application destroyed');
  }

  public updateConfig(newConfig: Partial<AppConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update components with new config
    this.components.forEach((component) => {
      if (component && typeof component.updateConfig === 'function') {
        component.updateConfig({ debug: this.config.debug });
      }
    });
  }

  public getConfig(): AppConfig {
    return { ...this.config };
  }
}

// Create and export the app instance
export const app = new MyWorkforceAgentsApp();

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  // Initialize with debug mode in development
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('dev');

  app.init({
    debug: isDevelopment,
    enableAnalytics: true,
    enableTooltips: true,
    enableAutoPlay: true
  }).catch(console.error);
}

// Export for manual initialization
export default MyWorkforceAgentsApp;
