# AudioSphereVisualizer

A reusable 3D audio visualizer React component that renders a sphere which pulses and deforms in real-time to both microphone input and page audio using Three.js and Web Audio API.

![Demo](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.158+-000000?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)

## Features

- 🎤 **Dual Audio Sources**: Combines microphone input and existing page audio
- 🌐 **3D Visualization**: Real-time shader-based sphere deformation
- 🎨 **Custom Shaders**: Handcrafted GLSL vertex and fragment shaders
- 🎵 **Frequency Analysis**: Uses Web Audio API for low-latency audio processing
- 🔧 **Fully Configurable**: Extensive prop API for customization
- 📱 **Performance Optimized**: Maintains 60fps on mid-tier mobile devices
- 🛡️ **Graceful Fallbacks**: Handles microphone permission denials elegantly

## Installation

```bash
# Using pnpm (recommended)
pnpm add three @react-three/fiber @react-three/drei

# Using npm
npm install three @react-three/fiber @react-three/drei

# Using yarn
yarn add three @react-three/fiber @react-three/drei
```

## Quick Start

```tsx
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AudioSphereVisualizer, VisualizerHandle } from './AudioSphereVisualizer';

function App() {
  const visualizerRef = useRef<VisualizerHandle>(null);

  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <AudioSphereVisualizer
        ref={visualizerRef}
        mic={true}
        fftSize={512}
        radius={1}
        colorScheme="neon"
      />
    </Canvas>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mic` | `boolean` | `true` | Enable microphone input |
| `existingContext` | `AudioContext` | `undefined` | Use existing AudioContext instead of creating new one |
| `fftSize` | `256 \| 512 \| 1024` | `512` | FFT size for frequency analysis |
| `radius` | `number` | `1` | Sphere radius |
| `colorScheme` | `'neon' \| 'pastel'` | `'neon'` | Color palette preset |
| `position` | `[number, number, number]` | `[0, 0, 0]` | 3D position of the sphere |

### Ref Methods

```tsx
interface VisualizerHandle {
  start(): void;  // Start audio analysis
  stop(): void;   // Stop audio analysis and cleanup
}
```

### Color Schemes

#### Neon
- Cyan to Magenta to Yellow gradient
- High contrast, vibrant colors
- Perfect for dark backgrounds

#### Pastel
- Light Blue to Light Pink to Light Green gradient
- Soft, subtle colors
- Great for light backgrounds

## Advanced Usage

### Multiple Visualizers

```tsx
<Canvas>
  {/* Main visualizer with microphone */}
  <AudioSphereVisualizer
    mic={true}
    radius={1.5}
    colorScheme="neon"
    position={[0, 0, 0]}
  />
  
  {/* Secondary visualizers for page audio only */}
  <AudioSphereVisualizer
    mic={false}
    radius={0.8}
    colorScheme="pastel"
    position={[-3, 0, 0]}
  />
  
  <AudioSphereVisualizer
    mic={false}
    radius={0.6}
    colorScheme="neon"
    position={[3, 0, 0]}
  />
</Canvas>
```

### Integration with Existing Audio Context

```tsx
// If you already have an AudioContext in your app
const existingAudioContext = new AudioContext();

<AudioSphereVisualizer
  existingContext={existingAudioContext}
  mic={true}
  fftSize={1024}
/>
```

### Manual Control

```tsx
function ControlledVisualizer() {
  const visualizerRef = useRef<VisualizerHandle>(null);

  const handleStart = () => {
    visualizerRef.current?.start();
  };

  const handleStop = () => {
    visualizerRef.current?.stop();
  };

  return (
    <>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      
      <Canvas>
        <AudioSphereVisualizer ref={visualizerRef} />
      </Canvas>
    </>
  );
}
```

## Integration with Voice AI Embed

The AudioSphereVisualizer works seamlessly with embedded voice AI agents like VAPI. Here's how to integrate it with your existing voice interface:

```tsx
// Your existing VAPI setup
const existingAudioContext = new AudioContext();

function VoiceAIWithVisualizer() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      {/* Your existing VAPI embed */}
      <iframe
        src="https://vapi.ai?demo=true&shareKey=YOUR_KEY&assistantId=YOUR_ID"
        width="100%"
        height="200"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />
      
      {/* 3D Visualizer overlay */}
      <Canvas
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none',  // Allow clicks to pass through
          zIndex: 2 
        }}
      >
        <AudioSphereVisualizer
          existingContext={existingAudioContext}
          mic={true}
          radius={0.8}
          colorScheme="neon"
        />
      </Canvas>
    </div>
  );
}
```

## Technical Details

### Shader Implementation

The component uses custom GLSL shaders for real-time deformation:

- **Vertex Shader**: Displaces vertices along their normals based on frequency data
- **Fragment Shader**: Creates dynamic colors based on displacement and time
- **Noise Function**: Adds organic motion using simplex noise

### Performance Considerations

- Uses `DataTexture` for efficient frequency data transfer to GPU
- Minimal CPU usage during animation loop
- Automatic cleanup of audio resources
- Frame budget optimized for 60fps on mobile devices

### Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (requires user gesture for AudioContext)
- **Mobile**: Optimized for performance on mid-tier devices

## Troubleshooting

### Microphone Access Denied
The component automatically falls back to a static rotating sphere with a tooltip when microphone access is denied.

### No Audio Visualization
1. Ensure audio is playing on the page
2. Check browser console for audio context errors
3. Verify microphone permissions in browser settings

### Performance Issues
1. Reduce `fftSize` prop (e.g., from 1024 to 256)
2. Use fewer simultaneous visualizers
3. Consider reducing sphere subdivision in geometry

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Inspired by modern audio visualization techniques
- Uses Web Audio API for real-time audio processing