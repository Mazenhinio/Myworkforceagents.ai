/**
 * Application constants and configuration
 */

import type { AppConfig } from '@/types';

export const APP_CONFIG: AppConfig = {
  debug: true, // Set to false in production
  autoPlay: true,
  animationDuration: 800,
  mobile: {
    breakpoint: 768,
    optimizations: true
  }
};

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1200
} as const;

export const ANIMATION_CONFIGS = {
  fast: { duration: 300, easing: 'ease-out' },
  normal: { duration: 600, easing: 'ease-in-out' },
  slow: { duration: 1000, easing: 'ease-in-out-cubic' },
  tooltip: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
} as const;

export const CSS_CLASSES = {
  // State classes
  active: 'active',
  visible: 'visible',
  hidden: 'hidden',
  loading: 'loading',
  
  // Component classes
  component: 'mwa-component',
  initialized: 'mwa-initialized',
  mobile: 'mobile-device',
  
  // Animation classes
  fadeIn: 'fade-in',
  fadeOut: 'fade-out',
  slideIn: 'slide-in',
  slideOut: 'slide-out'
} as const;

export const SELECTORS = {
  // Main containers
  app: '#app',
  main: 'main',
  
  // Navigation
  navbar: '.navbar',
  mobileMenu: '.mobile-menu-btn',
  navLinks: '.nav-links',
  
  // Hero
  hero: '.hero',
  heroLogo: '.hero-infinity-symbol',
  
  // Experience cards
  cardsContainer: '.cards-container',
  gameCard: '.game-card',
  
  // Agent showcase
  agentShowcase: '.agent-showcase',
  agentCard: '.agent-card',
  agentDisplay: '.agent-display',
  navArrow: '.nav-arrow',
  
  // Journey steps
  journeySection: '.journey-section',
  journeyStep: '.journey-step',
  
  // Profile
  profileSection: '.meet-human-section',
  
  // Footer
  footer: '.learn-more-footer',
  
  // Tooltip
  tooltip: '.agent-tooltip',
  
  // Scroll progress
  scrollProgress: '.scroll-progress-bar'
} as const;

export const EVENTS = {
  // DOM events
  click: 'click',
  mouseover: 'mouseover',
  mouseout: 'mouseout',
  mousemove: 'mousemove',
  scroll: 'scroll',
  resize: 'resize',
  keydown: 'keydown',
  
  // Custom events
  agentChange: 'agent:change',
  tooltipShow: 'tooltip:show',
  tooltipHide: 'tooltip:hide',
  cardSelect: 'card:select',
  navigationToggle: 'navigation:toggle',
  scrollProgress: 'scroll:progress'
} as const;

export const URLS = {
  learnMore: 'https://myworkforceagents.ai/',
  // Add other external URLs here
} as const;
