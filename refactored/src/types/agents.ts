/**
 * Agent-related type definitions
 */

export type AgentType = 'finn' | 'lisa' | 'rese' | 'tessa' | 'ross';

export interface AgentData {
  id: AgentType;
  name: string;
  role: string;
  description: string;
  icon: string;
  avatar: string;
  painPoints: string[];
  solutions: string[];
  features: AgentFeature[];
  colorTheme: ColorTheme;
}

export interface AgentFeature {
  icon: string;
  text: string;
  description?: string;
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  gradient: string;
}

export interface TooltipData {
  agent: AgentType;
  position: { x: number; y: number };
  painPoints: string[];
  solutions: string[];
}

export interface CarouselState {
  currentIndex: number;
  agents: AgentType[];
  isAutoPlaying: boolean;
  direction: 'next' | 'prev' | 'direct';
}
