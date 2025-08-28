/**
 * DOM manipulation utilities
 */

import type { DOMEventConfig } from '@/types';

/**
 * Type-safe querySelector with error handling
 */
export function querySelector<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T | null {
  try {
    return parent.querySelector<T>(selector);
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return null;
  }
}

/**
 * Type-safe querySelectorAll with error handling
 */
export function querySelectorAll<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T[] {
  try {
    return Array.from(parent.querySelectorAll<T>(selector));
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return [];
  }
}

/**
 * Get element with required validation
 */
export function getRequiredElement<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T {
  const element = querySelector<T>(selector, parent);
  if (!element) {
    throw new Error(`Required element not found: ${selector}`);
  }
  return element;
}

/**
 * Create element with type safety
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: {
    className?: string;
    id?: string;
    textContent?: string;
    innerHTML?: string;
    attributes?: Record<string, string>;
    dataset?: Record<string, string>;
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  
  if (options) {
    if (options.className) element.className = options.className;
    if (options.id) element.id = options.id;
    if (options.textContent) element.textContent = options.textContent;
    if (options.innerHTML) element.innerHTML = options.innerHTML;
    
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    
    if (options.dataset) {
      Object.entries(options.dataset).forEach(([key, value]) => {
        element.dataset[key] = value;
      });
    }
  }
  
  return element;
}

/**
 * Add event listener with type safety and cleanup
 */
export function addEventListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: DOMEventConfig
): () => void {
  element.addEventListener(type, listener, options);
  
  // Return cleanup function
  return () => {
    element.removeEventListener(type, listener, options);
  };
}

/**
 * Toggle class with optional condition
 */
export function toggleClass(
  element: HTMLElement,
  className: string,
  force?: boolean
): boolean {
  return element.classList.toggle(className, force);
}

/**
 * Add multiple classes
 */
export function addClasses(element: HTMLElement, ...classNames: string[]): void {
  element.classList.add(...classNames);
}

/**
 * Remove multiple classes
 */
export function removeClasses(element: HTMLElement, ...classNames: string[]): void {
  element.classList.remove(...classNames);
}

/**
 * Check if element has all specified classes
 */
export function hasClasses(element: HTMLElement, ...classNames: string[]): boolean {
  return classNames.every(className => element.classList.contains(className));
}

/**
 * Get element's position relative to viewport
 */
export function getElementPosition(element: HTMLElement): DOMRect {
  return element.getBoundingClientRect();
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement, threshold = 0): boolean {
  const rect = getElementPosition(element);
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  );
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(
  element: HTMLElement,
  options?: ScrollIntoViewOptions
): void {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    ...options
  });
}

/**
 * Wait for element to be available in DOM
 */
export function waitForElement<T extends HTMLElement = HTMLElement>(
  selector: string,
  timeout = 5000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const element = querySelector<T>(selector);
    if (element) {
      resolve(element);
      return;
    }
    
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const element = querySelector<T>(selector);
          if (element) {
            observer.disconnect();
            resolve(element);
            return;
          }
        }
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Timeout fallback
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element not found within ${timeout}ms: ${selector}`));
    }, timeout);
  });
}
