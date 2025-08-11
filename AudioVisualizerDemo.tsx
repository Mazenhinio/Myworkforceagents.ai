import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { AudioSphereVisualizer, VisualizerHandle } from './AudioSphereVisualizer';

const AudioVisualizerDemo: React.FC = () => {
  const visualizerRef = useRef<VisualizerHandle>(null);

  const handleStart = () => {
    visualizerRef.current?.start();
  };

  const handleStop = () => {
    visualizerRef.current?.stop();
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {/* Controls */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1000,
          display: 'flex',
          gap: '10px',
        }}
      >
        <button
          onClick={handleStart}
          style={{
            padding: '10px 20px',
            background: '#00d4ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Start Visualizer
        </button>
        <button
          onClick={handleStop}
          style={{
            padding: '10px 20px',
            background: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Stop Visualizer
        </button>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: 'radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* Environment for reflections */}
          <Environment preset="night" />
          
          {/* Audio Visualizer */}
          <AudioSphereVisualizer
            ref={visualizerRef}
            mic={true}
            fftSize={512}
            radius={1.5}
            colorScheme="neon"
          />
          
          {/* Additional spheres for demonstration */}
          <AudioSphereVisualizer
            mic={false}
            fftSize={256}
            radius={0.8}
            colorScheme="pastel"
            position={[-3, 0, 0]}
          />
          
          <AudioSphereVisualizer
            mic={false}
            fftSize={1024}
            radius={0.6}
            colorScheme="neon"
            position={[3, 0, 0]}
          />
          
          {/* Camera controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Instructions */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '15px',
          borderRadius: '5px',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#00d4ff' }}>Audio Sphere Visualizer Demo</h3>
        <p style={{ margin: '0 0 10px 0' }}>
          🎤 <strong>Center sphere:</strong> Responds to microphone input and page audio
        </p>
        <p style={{ margin: '0 0 10px 0' }}>
          🎨 <strong>Side spheres:</strong> React to page audio only (different color schemes)
        </p>
        <p style={{ margin: '0' }}>
          💡 <strong>Tip:</strong> Play music or speak into your microphone to see the spheres react!
        </p>
      </div>
    </div>
  );
};

export default AudioVisualizerDemo;