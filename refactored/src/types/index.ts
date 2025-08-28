/**
 * Main types export barrel
 */

// Re-export all types for easy importing
export * from './agents.js';
export * from './components.js';
export * from './events.js';

// Global app types
export interface AppConfig {
  debug: boolean;
  autoPlay: boolean;
  animationDuration: number;
  mobile: {
    breakpoint: number;
    optimizations: boolean;
  };
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  supportsHover: boolean;
}

export interface ScrollInfo {
  scrollY: number;
  scrollProgress: number;
  isScrolling: boolean;
  direction: 'up' | 'down';
}

export interface ViewportInfo {
  width: number;
  height: number;
  ratio: number;
}
