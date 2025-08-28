# MyWorkforceAgents.AI - Refactored

A modern, scalable, component-based web application built with TypeScript, featuring AI-powered business transformation solutions.

## 🚀 Features

- **Component-Based Architecture**: Modular, reusable components with TypeScript
- **Modern UI/UX**: Glassmorphism design with smooth animations
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **TypeScript**: Full type safety and modern JavaScript features
- **Event-Driven**: Centralized event bus for component communication
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized animations and lazy loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 📁 Project Structure

```
refactored/
├── src/
│   ├── components/           # UI Components
│   │   ├── Navigation/       # Header navigation
│   │   ├── Hero/            # Landing section
│   │   ├── AgentShowcase/   # Agent carousel
│   │   ├── AgentTooltips/   # Cursor-following tooltips
│   │   ├── HumanProfile/    # Dr. G section
│   │   └── Footer/          # Footer with CTA
│   ├── styles/              # CSS files
│   │   ├── variables.css    # CSS custom properties
│   │   ├── reset.css        # CSS reset
│   │   ├── utilities.css    # Utility classes
│   │   └── main.css         # Main stylesheet
│   ├── utils/               # Utility functions
│   │   ├── dom.ts          # DOM manipulation
│   │   ├── device.ts       # Device detection
│   │   ├── events.ts       # Event handling
│   │   └── animations.ts   # Animation utilities
│   ├── data/               # Static data
│   │   ├── agents.ts       # Agent information
│   │   └── constants.ts    # App constants
│   ├── types/              # TypeScript types
│   │   ├── agents.ts       # Agent types
│   │   ├── components.ts   # Component interfaces
│   │   ├── events.ts       # Event types
│   │   └── index.ts        # Type exports
│   └── main.ts             # Application entry point
├── dist/                   # Built files
│   ├── index.html          # Main HTML file
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css    # Compiled CSS
│   │   ├── js/
│   │   │   └── main.js     # Compiled JavaScript
│   │   └── images/         # Image assets
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🛠️ Components

### 1. Navigation
- **File**: `src/components/Navigation/`
- **Features**: Mobile menu, scroll effects, smooth scrolling
- **Props**: `scrollThreshold`, `mobileBreakpoint`

### 2. Hero
- **File**: `src/components/Hero/`
- **Features**: Experience cards, animations, interactions
- **Props**: `cardAnimationDuration`, `enableHoverEffects`

### 3. AgentShowcase
- **File**: `src/components/AgentShowcase/`
- **Features**: Agent carousel, auto-play, keyboard navigation
- **Props**: `autoPlay`, `autoPlayInterval`, `enableKeyboard`

### 4. AgentTooltips
- **File**: `src/components/AgentTooltips/`
- **Features**: Cursor-following tooltips, agent-specific themes
- **Props**: `followCursor`, `showDelay`, `hideDelay`

### 5. HumanProfile
- **File**: `src/components/HumanProfile/`
- **Features**: Dr. G profile, stats animation, CTA buttons
- **Props**: `enableStatsAnimation`, `enableImageHover`

### 6. Footer
- **File**: `src/components/Footer/`
- **Features**: CTA section, social links, analytics tracking
- **Props**: `enableAnalytics`, `enableSocialTracking`

## 🎨 Design System

### Colors
- **Primary**: `#ff6b35` (Orange)
- **Secondary**: `#00c6ff` (Blue)
- **Success**: `#00ff88` (Green)
- **Background**: `#0a0a1a` (Dark)
- **Text**: `#ffffff` (White)

### Typography
- **Primary Font**: Inter (Sans-serif)
- **Display Font**: Clash Display (Headings)
- **Weights**: 300-900

### Spacing
- **Base Unit**: 8px
- **Scale**: 8px, 16px, 24px, 32px, 48px, 64px

### Breakpoints
- **Mobile**: 480px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Large**: 1200px

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd refactored
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm start
   ```

### Available Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build for production
- `npm run clean` - Clean build directory
- `npm run test` - Run tests (placeholder)

## 📱 Usage

### Basic Component Usage

```typescript
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';

// Initialize components
const navElement = document.querySelector('[data-component="navigation"]');
const heroElement = document.querySelector('[data-component="hero"]');

const navigation = new Navigation(navElement, {
  debug: true,
  scrollThreshold: 50
});

const hero = new Hero(heroElement, {
  enableHoverEffects: true
});
```

### Event Handling

```typescript
import { eventBus } from '@/utils/events';

// Listen for events
eventBus.on('agent:change', (data) => {
  console.log('Agent changed:', data.agentId);
});

eventBus.on('tooltip:show', (data) => {
  console.log('Tooltip shown for:', data.agentId);
});

// Emit events
eventBus.emit('analytics:event', {
  category: 'User',
  action: 'Click',
  label: 'CTA Button'
});
```

### Configuration

```typescript
// App configuration
const appConfig = {
  debug: process.env.NODE_ENV === 'development',
  enableAnalytics: true,
  enableTooltips: true,
  enableAutoPlay: true
};

// Initialize app
import { app } from '@/main';
app.init(appConfig);
```

## 🎯 Features

### Agent Showcase
- **Auto-play carousel** with configurable intervals
- **Keyboard navigation** (arrow keys)
- **Touch/swipe support** for mobile
- **Smooth transitions** between agents
- **Agent-specific themes** and colors

### Tooltips
- **Cursor-following** tooltips
- **Agent-specific content** (pain points & solutions)
- **Responsive positioning** (viewport boundaries)
- **Keyboard accessibility** (Escape to close)
- **Smooth animations** and transitions

### Navigation
- **Mobile-responsive** hamburger menu
- **Scroll effects** (background blur, shadow)
- **Smooth scrolling** to sections
- **Keyboard navigation** support
- **Accessibility features** (ARIA labels)

### Animations
- **Intersection Observer** for scroll-triggered animations
- **CSS transitions** for smooth interactions
- **Reduced motion** support for accessibility
- **Performance optimized** (60fps target)

## 🔧 Customization

### Adding New Components

1. **Create component directory**
   ```bash
   mkdir src/components/NewComponent
   ```

2. **Create component files**
   ```typescript
   // NewComponent.ts
   export class NewComponent implements BaseComponent {
     // Implementation
   }
   ```

3. **Add to main.ts**
   ```typescript
   import { NewComponent } from '@/components/NewComponent';
   ```

### Styling

- **CSS Variables**: Use design system variables
- **Component Scoping**: Each component has its own CSS file
- **Responsive Design**: Mobile-first approach
- **Accessibility**: High contrast and reduced motion support

### Data Management

- **Static Data**: Store in `src/data/` directory
- **Type Safety**: Define interfaces in `src/types/`
- **Event Bus**: Use for component communication

## 🧪 Testing

### Component Testing
```typescript
// Example test structure
describe('Navigation Component', () => {
  it('should initialize correctly', () => {
    const element = document.createElement('nav');
    const navigation = new Navigation(element);
    expect(navigation).toBeDefined();
  });
});
```

### Event Testing
```typescript
describe('Event Bus', () => {
  it('should emit and receive events', () => {
    const callback = jest.fn();
    eventBus.on('test:event', callback);
    eventBus.emit('test:event', { data: 'test' });
    expect(callback).toHaveBeenCalledWith({ data: 'test' });
  });
});
```

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Components load on demand
- **Debounced Events**: Prevents excessive function calls
- **CSS Optimization**: Minimal, scoped styles
- **Image Optimization**: WebP format with fallbacks
- **Bundle Splitting**: Separate vendor and app bundles

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

### Best Practices
- **Content Security Policy**: Restricts resource loading
- **XSS Prevention**: Sanitized user inputs
- **HTTPS Only**: Secure connections required
- **Input Validation**: Type-safe data handling

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS 14+, Android 10+

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email**: support@myworkforceagents.ai
- **Documentation**: [docs.myworkforceagents.ai](https://docs.myworkforceagents.ai)
- **Issues**: [GitHub Issues](https://github.com/myworkforceagents/website/issues)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload `dist/` contents
- **Custom Server**: Serve `dist/` directory

### Environment Variables
```bash
NODE_ENV=production
ANALYTICS_ID=your-analytics-id
API_URL=https://api.myworkforceagents.ai
```

---

**Built with ❤️ by the MyWorkforceAgents.AI team**
