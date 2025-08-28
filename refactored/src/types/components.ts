/**
 * Component-related type definitions
 */

export interface ComponentConfig {
  selector: string;
  autoInit?: boolean;
  debug?: boolean;
}

export interface BaseComponent {
  element: HTMLElement;
  config: ComponentConfig;
  init(): void;
  destroy(): void;
}

export interface EventHandler<T = Event> {
  (event: T): void;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ResponsiveConfig {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

export interface NavigationItem {
  text: string;
  href: string;
  external?: boolean;
  className?: string;
}

export interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  backText: string;
}

export interface JourneyStep {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  content: string | HTMLElement;
  reverse?: boolean;
}

export interface ProfileCredential {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}
