/**
 * Device detection and capabilities utilities
 */

import type { DeviceInfo, ViewportInfo } from '@/types';
import { BREAKPOINTS } from '@/data/constants.js';

/**
 * Detect if current device is mobile
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= BREAKPOINTS.mobile;
}

/**
 * Detect if current device is tablet
 */
export function isTablet(): boolean {
  return window.innerWidth > BREAKPOINTS.mobile && 
         window.innerWidth <= BREAKPOINTS.tablet;
}

/**
 * Detect if current device is desktop
 */
export function isDesktop(): boolean {
  return window.innerWidth > BREAKPOINTS.tablet;
}

/**
 * Detect if device supports touch
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || 
         navigator.maxTouchPoints > 0;
}

/**
 * Detect if device supports hover
 */
export function supportsHover(): boolean {
  return window.matchMedia('(hover: hover)').matches;
}

/**
 * Get comprehensive device information
 */
export function getDeviceInfo(): DeviceInfo {
  return {
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isTouchDevice: isTouchDevice(),
    supportsHover: supportsHover()
  };
}

/**
 * Get current viewport information
 */
export function getViewportInfo(): ViewportInfo {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  return {
    width,
    height,
    ratio: width / height
  };
}

/**
 * Optimize for mobile device
 */
export function optimizeForMobile(): void {
  if (!isMobile()) return;
  
  // Add mobile class to body
  document.body.classList.add('mobile-device');
  
  // Improve touch responsiveness
  document.body.style.touchAction = 'manipulation';
  
  // Prevent zoom on form inputs
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          'content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
      }
    });
    
    input.addEventListener('blur', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          'content', 
          'width=device-width, initial-scale=1.0'
        );
      }
    });
  });
}

/**
 * Watch for device orientation changes
 */
export function watchOrientation(callback: (orientation: OrientationLockType) => void): () => void {
  const handler = () => {
    // Use screen.orientation if available, fallback to window.orientation
    const orientation = screen.orientation?.type || 
                       (window.orientation === 90 || window.orientation === -90 ? 'landscape' : 'portrait');
    callback(orientation as OrientationLockType);
  };
  
  window.addEventListener('orientationchange', handler);
  window.addEventListener('resize', handler);
  
  // Initial call
  handler();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('orientationchange', handler);
    window.removeEventListener('resize', handler);
  };
}

/**
 * Detect reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detect dark mode preference
 */
export function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Get device pixel ratio
 */
export function getDevicePixelRatio(): number {
  return window.devicePixelRatio || 1;
}

/**
 * Check if device has high DPI display
 */
export function isHighDPI(): boolean {
  return getDevicePixelRatio() > 1;
}
