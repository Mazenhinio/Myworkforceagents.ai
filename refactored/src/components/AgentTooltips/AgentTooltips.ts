/**
 * Agent Tooltips Component
 * Handles cursor-following tooltips for agent information
 */

import type { BaseComponent, ComponentConfig, AgentType, TooltipData } from '@/types';
import { querySelector, addEventListener, createElement } from '@/utils/dom.js';
import { eventBus } from '@/utils/events.js';
import { AGENTS } from '@/data/agents.js';
import { debounce } from '@/utils/events.js';

export interface AgentTooltipsConfig extends ComponentConfig {
  followCursor?: boolean;
  showDelay?: number;
  hideDelay?: number;
  maxDistance?: number;
}

export class AgentTooltips implements BaseComponent {
  public element: HTMLElement;
  public config: AgentTooltipsConfig;
  
  private tooltipContainer: HTMLElement | null = null;
  private tooltipContent: HTMLElement | null = null;
  private tooltipAgentName: HTMLElement | null = null;
  private tooltipAgentRole: HTMLElement | null = null;
  private tooltipPainContent: HTMLElement | null = null;
  private tooltipSolutionContent: HTMLElement | null = null;
  private tooltipClose: HTMLElement | null = null;
  private tooltipArrow: HTMLElement | null = null;
  
  private isVisible = false;
  private currentAgent: string | null = null;
  private showTimeout: number | null = null;
  private hideTimeout: number | null = null;
  private cleanupFunctions: (() => void)[] = [];

  constructor(element: HTMLElement, config: AgentTooltipsConfig = {}) {
    this.element = element;
    this.config = {
      selector: '[data-component="agent-tooltips"]',
      autoInit: true,
      debug: false,
      followCursor: true,
      showDelay: 300,
      hideDelay: 100,
      maxDistance: 20,
      ...config
    };

    if (this.config.autoInit) {
      this.init();
    }
  }

  public init(): void {
    if (this.config.debug) {
      console.log('🚀 Initializing AgentTooltips component');
    }

    this.setupElements();
    this.bindEvents();
    this.addInitializedClass();
  }

  public destroy(): void {
    if (this.config.debug) {
      console.log('🗑️ Destroying AgentTooltips component');
    }

    this.hideTooltip();
    this.cleanupFunctions.forEach(cleanup => cleanup());
    this.cleanupFunctions = [];
  }

  private setupElements(): void {
    this.tooltipContainer = querySelector('[data-tooltip-container]', this.element);
    this.tooltipContent = querySelector('[data-tooltip-content]', this.element);
    this.tooltipAgentName = querySelector('[data-tooltip-agent-name]', this.element);
    this.tooltipAgentRole = querySelector('[data-tooltip-agent-role]', this.element);
    this.tooltipPainContent = querySelector('[data-tooltip-pain-content]', this.element);
    this.tooltipSolutionContent = querySelector('[data-tooltip-solution-content]', this.element);
    this.tooltipClose = querySelector('[data-tooltip-close]', this.element);
    this.tooltipArrow = querySelector('[data-tooltip-arrow]', this.element);

    if (!this.tooltipContainer) {
      console.error('❌ AgentTooltips: Tooltip container not found');
      return;
    }
  }

  private bindEvents(): void {
    // Global mouse events for tooltip triggers
    const mouseOverHandler = (event: MouseEvent) => {
      this.handleMouseOver(event);
    };

    const mouseMoveHandler = debounce((event: MouseEvent) => {
      if (this.isVisible && this.config.followCursor) {
        this.updatePosition(event.clientX, event.clientY);
      }
    }, 16); // ~60fps

    const mouseOutHandler = (event: MouseEvent) => {
      this.handleMouseOut(event);
    };

    // Close button
    if (this.tooltipClose) {
      const cleanup = addEventListener(this.tooltipClose, 'click', () => {
        this.hideTooltip();
      });
      this.cleanupFunctions.push(cleanup);
    }

    // Action buttons
    const actionButtons = querySelector('[data-tooltip-action]', this.element);
    if (actionButtons) {
      const cleanup = addEventListener(actionButtons, 'click', (event) => {
        this.handleActionClick(event);
      });
      this.cleanupFunctions.push(cleanup);
    }

    // Global events
    document.addEventListener('mouseover', mouseOverHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseout', mouseOutHandler);

    this.cleanupFunctions.push(() => {
      document.removeEventListener('mouseover', mouseOverHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseout', mouseOutHandler);
    });

    // Keyboard events
    const escapeHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isVisible) {
        this.hideTooltip();
      }
    };

    document.addEventListener('keydown', escapeHandler);
    this.cleanupFunctions.push(() => {
      document.removeEventListener('keydown', escapeHandler);
    });

    // Scroll and resize events
    const scrollResizeHandler = debounce(() => {
      if (this.isVisible) {
        this.hideTooltip();
      }
    }, 100);

    window.addEventListener('scroll', scrollResizeHandler);
    window.addEventListener('resize', scrollResizeHandler);

    this.cleanupFunctions.push(() => {
      window.removeEventListener('scroll', scrollResizeHandler);
      window.removeEventListener('resize', scrollResizeHandler);
    });
  }

  private handleMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const agentCard = target.closest('[data-agent]') as HTMLElement;
    const challengeDiv = target.closest('.challenge') as HTMLElement;
    const solutionDiv = target.closest('.solution') as HTMLElement;

    if (!agentCard || !agentCard.classList.contains('active')) return;
    if (!challengeDiv && !solutionDiv) return;

    const agentId = agentCard.getAttribute('data-agent');
    if (!agentId) return;

    // Clear existing timeouts
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    // Show tooltip after delay
    this.showTimeout = window.setTimeout(() => {
      this.showTooltip(agentId, event.clientX, event.clientY);
    }, this.config.showDelay);
  }

  private handleMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const agentCard = target.closest('[data-agent]') as HTMLElement;
    const challengeDiv = target.closest('.challenge') as HTMLElement;
    const solutionDiv = target.closest('.solution') as HTMLElement;

    if (!agentCard || !challengeDiv && !solutionDiv) return;

    // Clear show timeout
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    // Hide tooltip after delay
    this.hideTimeout = window.setTimeout(() => {
      this.hideTooltip();
    }, this.config.hideDelay);
  }

  private showTooltip(agentId: string, x: number, y: number): void {
    if (!this.tooltipContainer || this.isVisible) return;

    const agentData = AGENTS[agentId as AgentType];
    if (!agentData) {
      console.warn(`⚠️ AgentTooltips: No data found for agent ${agentId}`);
      return;
    }

    // Get tooltip data from agent card
    const agentCard = document.querySelector(`[data-agent="${agentId}"]`) as HTMLElement;
    if (!agentCard) return;

    const painText = agentCard.getAttribute('data-tooltip-pain');
    const solutionText = agentCard.getAttribute('data-tooltip-solution');

    if (!painText || !solutionText) {
      console.warn(`⚠️ AgentTooltips: Missing tooltip data for agent ${agentId}`);
      return;
    }

    // Update tooltip content
    this.updateTooltipContent(agentId, agentData, painText, solutionText);

    // Position tooltip
    this.updatePosition(x, y);

    // Show tooltip
    this.tooltipContainer.style.display = 'block';
    this.tooltipContainer.classList.add('visible');
    this.tooltipContainer.classList.remove('hidden');

    this.isVisible = true;
    this.currentAgent = agentId;

    // Emit event
    eventBus.emit('tooltip:show', { agentId, x, y });

    if (this.config.debug) {
      console.log(`💡 AgentTooltips: Showing tooltip for ${agentId}`);
    }
  }

  private hideTooltip(): void {
    if (!this.tooltipContainer || !this.isVisible) return;

    this.tooltipContainer.classList.remove('visible');
    this.tooltipContainer.classList.add('hidden');

    // Hide after animation
    setTimeout(() => {
      if (this.tooltipContainer) {
        this.tooltipContainer.style.display = 'none';
        this.tooltipContainer.classList.remove('hidden');
      }
    }, 200);

    this.isVisible = false;
    this.currentAgent = null;

    // Emit event
    eventBus.emit('tooltip:hide', {});

    if (this.config.debug) {
      console.log('💡 AgentTooltips: Hiding tooltip');
    }
  }

  private updateTooltipContent(agentId: string, agentData: any, painText: string, solutionText: string): void {
    if (!this.tooltipAgentName || !this.tooltipAgentRole || !this.tooltipPainContent || !this.tooltipSolutionContent) return;

    // Update agent info
    this.tooltipAgentName.textContent = agentData.name;
    this.tooltipAgentRole.textContent = agentData.role;

    // Update pain points
    const painPoints = painText.split('•').map(point => point.trim()).filter(Boolean);
    this.tooltipPainContent.innerHTML = this.createListHTML(painPoints);

    // Update solutions
    const solutions = solutionText.split('•').map(solution => solution.trim()).filter(Boolean);
    this.tooltipSolutionContent.innerHTML = this.createListHTML(solutions);

    // Update agent theme
    if (this.tooltipContainer) {
      this.tooltipContainer.setAttribute('data-agent', agentId);
    }
  }

  private createListHTML(items: string[]): string {
    return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
  }

  private updatePosition(x: number, y: number): void {
    if (!this.tooltipContainer) return;

    const tooltipRect = this.tooltipContainer.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate initial position
    let left = x + 15;
    let top = y - tooltipRect.height - 15;
    let arrowPosition = 'top';

    // Adjust for viewport boundaries
    if (left + tooltipRect.width > viewportWidth - 20) {
      left = x - tooltipRect.width - 15;
      arrowPosition = 'right';
    }

    if (top < 20) {
      top = y + 15;
      arrowPosition = 'bottom';
    }

    if (left < 20) {
      left = 20;
      arrowPosition = 'left';
    }

    // Apply position
    this.tooltipContainer.style.left = `${left}px`;
    this.tooltipContainer.style.top = `${top}px`;

    // Update arrow position
    if (this.tooltipArrow) {
      this.tooltipArrow.className = `tooltip-arrow ${arrowPosition}`;
    }
  }

  private handleActionClick(event: Event): void {
    const target = event.target as HTMLElement;
    const action = target.getAttribute('data-tooltip-action');

    if (!action || !this.currentAgent) return;

    event.preventDefault();

    // Emit action event
    eventBus.emit('tooltip:action', { action, agentId: this.currentAgent });

    if (this.config.debug) {
      console.log(`💡 AgentTooltips: Action clicked - ${action} for ${this.currentAgent}`);
    }

    // Handle specific actions
    switch (action) {
      case 'learn-more':
        this.handleLearnMore();
        break;
      case 'demo':
        this.handleRequestDemo();
        break;
    }

    // Hide tooltip after action
    this.hideTooltip();
  }

  private handleLearnMore(): void {
    // Navigate to agent-specific page or show more details
    if (this.currentAgent) {
      window.open(`https://myworkforceagents.ai/agents/${this.currentAgent}`, '_blank');
    }
  }

  private handleRequestDemo(): void {
    // Open demo request form or contact form
    eventBus.emit('demo:request', { agentId: this.currentAgent });
  }

  private addInitializedClass(): void {
    this.element.classList.add('mwa-initialized');
  }

  // Public methods for external control
  public show(agentId: string, x: number, y: number): void {
    this.showTooltip(agentId, x, y);
  }

  public hide(): void {
    this.hideTooltip();
  }

  public isTooltipVisible(): boolean {
    return this.isVisible;
  }

  public getCurrentAgent(): string | null {
    return this.currentAgent;
  }

  public updateConfig(newConfig: Partial<AgentTooltipsConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}
