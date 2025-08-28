/**
 * Animation utilities and helpers
 */

import type { AnimationConfig } from '@/types';
import { ANIMATION_CONFIGS } from '@/data/constants.js';
import { prefersReducedMotion } from './device.js';

/**
 * Request animation frame with Promise support
 */
export function requestAnimationFrameAsync(): Promise<number> {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}

/**
 * Wait for specified duration
 */
export function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

/**
 * Animate element with CSS transitions
 */
export function animateElement(
  element: HTMLElement,
  properties: Partial<CSSStyleDeclaration>,
  config: AnimationConfig = ANIMATION_CONFIGS.normal
): Promise<void> {
  return new Promise((resolve) => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      Object.assign(element.style, properties);
      resolve();
      return;
    }

    // Set transition
    element.style.transition = `all ${config.duration}ms ${config.easing}`;
    
    // Apply delay if specified
    if (config.delay) {
      element.style.transitionDelay = `${config.delay}ms`;
    }

    // Listen for transition end
    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === element) {
        element.removeEventListener('transitionend', handleTransitionEnd);
        // Clean up transition styles
        element.style.transition = '';
        element.style.transitionDelay = '';
        resolve();
      }
    };

    element.addEventListener('transitionend', handleTransitionEnd);

    // Apply properties after a frame to ensure transition is set
    requestAnimationFrame(() => {
      Object.assign(element.style, properties);
    });

    // Fallback timeout
    setTimeout(() => {
      element.removeEventListener('transitionend', handleTransitionEnd);
      resolve();
    }, config.duration + (config.delay || 0) + 100);
  });
}

/**
 * Fade in element
 */
export function fadeIn(
  element: HTMLElement,
  config: AnimationConfig = ANIMATION_CONFIGS.normal
): Promise<void> {
  element.style.opacity = '0';
  element.style.display = '';
  
  return animateElement(element, { opacity: '1' }, config);
}

/**
 * Fade out element
 */
export function fadeOut(
  element: HTMLElement,
  config: AnimationConfig = ANIMATION_CONFIGS.normal
): Promise<void> {
  return animateElement(element, { opacity: '0' }, config)
    .then(() => {
      element.style.display = 'none';
    });
}

/**
 * Slide element from/to position
 */
export function slide(
  element: HTMLElement,
  from: { x?: number; y?: number },
  to: { x?: number; y?: number },
  config: AnimationConfig = ANIMATION_CONFIGS.normal
): Promise<void> {
  // Set initial position
  element.style.transform = `translate(${from.x || 0}px, ${from.y || 0}px)`;
  
  // Animate to final position
  return animateElement(
    element,
    { transform: `translate(${to.x || 0}px, ${to.y || 0}px)` },
    config
  );
}

/**
 * Scale element animation
 */
export function scale(
  element: HTMLElement,
  from: number,
  to: number,
  config: AnimationConfig = ANIMATION_CONFIGS.normal
): Promise<void> {
  element.style.transform = `scale(${from})`;
  
  return animateElement(
    element,
    { transform: `scale(${to})` },
    config
  );
}

/**
 * Stagger animations for multiple elements
 */
export function staggeredAnimation<T extends HTMLElement>(
  elements: T[],
  animationFn: (element: T, index: number) => Promise<void>,
  staggerDelay = 100
): Promise<void[]> {
  return Promise.all(
    elements.map((element, index) => 
      wait(index * staggerDelay).then(() => animationFn(element, index))
    )
  );
}

/**
 * Parallax scroll effect
 */
export function parallaxScroll(
  element: HTMLElement,
  speed = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
): () => void {
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const value = scrolled * speed;
    
    if (direction === 'vertical') {
      element.style.transform = `translateY(${value}px)`;
    } else {
      element.style.transform = `translateX(${value}px)`;
    }
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', updateParallax);
  };
}

/**
 * Smooth value transition using requestAnimationFrame
 */
export function smoothTransition(
  from: number,
  to: number,
  duration: number,
  callback: (value: number) => void,
  easing: (t: number) => number = (t) => t // Linear easing
): Promise<void> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const difference = to - from;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const currentValue = from + (difference * easedProgress);

      callback(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
}

/**
 * Common easing functions
 */
export const easingFunctions = {
  linear: (t: number): number => t,
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => (--t) * t * t + 1,
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
} as const;
