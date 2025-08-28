/**
 * Event handling utilities and event bus implementation
 */

import type { EventBus, CustomEventType, CustomEventMap } from '@/types';

/**
 * Simple event bus implementation for component communication
 */
class EventBusImpl implements EventBus {
  private listeners: Map<string, Set<Function>> = new Map();

  on<T extends CustomEventType>(
    type: T,
    handler: (detail: CustomEventMap[T]) => void
  ): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(handler);
  }

  off<T extends CustomEventType>(
    type: T,
    handler: (detail: CustomEventMap[T]) => void
  ): void {
    const handlers = this.listeners.get(type);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  emit<T extends CustomEventType>(
    type: T,
    detail: CustomEventMap[T]
  ): void {
    const handlers = this.listeners.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(detail);
        } catch (error) {
          console.error(`Error in event handler for ${type}:`, error);
        }
      });
    }
  }

  clear(): void {
    this.listeners.clear();
  }

  getListenerCount(type?: string): number {
    if (type) {
      return this.listeners.get(type)?.size || 0;
    }
    return Array.from(this.listeners.values())
      .reduce((total, handlers) => total + handlers.size, 0);
  }
}

// Global event bus instance
export const eventBus = new EventBusImpl();

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Create a one-time event listener
 */
export function once<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void
): void {
  const oneTimeListener = (event: HTMLElementEventMap[K]) => {
    listener(event);
    element.removeEventListener(type, oneTimeListener);
  };
  
  element.addEventListener(type, oneTimeListener);
}

/**
 * Wait for DOM event to occur
 */
export function waitForEvent<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  timeout = 5000
): Promise<HTMLElementEventMap[K]> {
  return new Promise((resolve, reject) => {
    const listener = (event: HTMLElementEventMap[K]) => {
      clearTimeout(timeoutId);
      element.removeEventListener(type, listener);
      resolve(event);
    };
    
    const timeoutId = setTimeout(() => {
      element.removeEventListener(type, listener);
      reject(new Error(`Event ${type} timeout after ${timeout}ms`));
    }, timeout);
    
    element.addEventListener(type, listener);
  });
}

/**
 * Dispatch custom event on element
 */
export function dispatchCustomEvent<T extends CustomEventType>(
  element: HTMLElement,
  type: T,
  detail: CustomEventMap[T],
  options?: CustomEventInit
): void {
  const event = new CustomEvent(type, {
    detail,
    bubbles: true,
    cancelable: true,
    ...options
  });
  
  element.dispatchEvent(event);
}

/**
 * Prevent default and stop propagation
 */
export function preventAndStop(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Check if event target matches selector
 */
export function eventTargetMatches(
  event: Event,
  selector: string
): HTMLElement | null {
  const target = event.target as HTMLElement;
  if (target?.matches?.(selector)) {
    return target;
  }
  return target?.closest?.(selector) || null;
}

/**
 * Add delegated event listener
 */
export function delegate<K extends keyof HTMLElementEventMap>(
  container: HTMLElement,
  selector: string,
  type: K,
  listener: (event: HTMLElementEventMap[K], target: HTMLElement) => void
): () => void {
  const delegatedListener = (event: HTMLElementEventMap[K]) => {
    const target = eventTargetMatches(event, selector);
    if (target) {
      listener(event, target);
    }
  };
  
  container.addEventListener(type, delegatedListener);
  
  return () => {
    container.removeEventListener(type, delegatedListener);
  };
}
