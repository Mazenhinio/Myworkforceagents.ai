/**
 * Event-related type definitions
 */

export interface CustomEventMap {
  'agent:change': { agentId: string; index: number };
  'tooltip:show': { agentId: string; position: { x: number; y: number } };
  'tooltip:hide': Record<string, never>;
  'card:select': { cardId: string; cardType: string };
  'navigation:toggle': { isOpen: boolean };
  'scroll:progress': { percentage: number };
}

export type CustomEventType = keyof CustomEventMap;

export interface CustomEventDetail<T extends CustomEventType> {
  type: T;
  detail: CustomEventMap[T];
}

export interface EventBus {
  on<T extends CustomEventType>(
    type: T,
    handler: (detail: CustomEventMap[T]) => void
  ): void;
  
  off<T extends CustomEventType>(
    type: T,
    handler: (detail: CustomEventMap[T]) => void
  ): void;
  
  emit<T extends CustomEventType>(
    type: T,
    detail: CustomEventMap[T]
  ): void;
}

export interface DOMEventConfig {
  passive?: boolean;
  once?: boolean;
  capture?: boolean;
}
