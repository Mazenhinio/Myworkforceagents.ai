import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AudioSphereVisualizer, VisualizerHandle } from './AudioSphereVisualizer';

/**
 * Example integration of AudioSphereVisualizer with existing VAPI voice interface
 * This shows how to overlay the 3D visualizer on top of your current voice UI
 */
interface VAPIIntegrationProps {
  vapiPublicKey: string;
  vapiAssistantId: string;
}

const VAPIIntegrationExample: React.FC<VAPIIntegrationProps> = ({
  vapiPublicKey,
  vapiAssistantId
}) => {
  const visualizerRef = useRef<VisualizerHandle>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize AudioContext when component mounts
  useEffect(() => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);
    
    return () => {
      context.close();
    };
  }, []);

  // Start visualizer when call begins
  const handleCallStart = () => {
    setIsCallActive(true);
    visualizerRef.current?.start();
  };

  // Stop visualizer when call ends
  const handleCallEnd = () => {
    setIsCallActive(false);
    visualizerRef.current?.stop();
  };

  return (
    <div className="vapi-integration-container" style={{ 
      position: 'relative', 
      width: '100%', 
      height: '500px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      borderRadius: '15px',
      overflow: 'hidden'
    }}>
      
      {/* Your existing VAPI voice interface */}
      <div className="vapi-interface" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px'
      }}>
        
        {/* Voice Status */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '25px',
          fontSize: '14px'
        }}>
          {isCallActive ? '🎤 Call Active - Speak now' : '🎤 Click to start voice conversation'}
        </div>

        {/* Voice Controls */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={handleCallStart}
            disabled={isCallActive}
            style={{
              padding: '15px 25px',
              background: isCallActive ? '#666' : 'linear-gradient(135deg, #00ff88, #00d4ff)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isCallActive ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-phone"></i>
            Start Voice Call
          </button>
          
          <button
            onClick={handleCallEnd}
            disabled={!isCallActive}
            style={{
              padding: '15px 25px',
              background: !isCallActive ? '#666' : 'linear-gradient(135deg, #ff4757, #ff3742)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: !isCallActive ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-phone-slash"></i>
            End Call
          </button>
        </div>

        {/* Backup VAPI iframe (hidden by default, shown if needed) */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '10px',
          padding: '15px',
          marginTop: '20px',
          maxWidth: '400px'
        }}>
          <iframe
            src={`https://vapi.ai?demo=true&shareKey=${vapiPublicKey}&assistantId=${vapiAssistantId}&embed=true&minimal=true`}
            width="100%"
            height="200"
            frameBorder="0"
            allow="microphone; camera; autoplay"
            style={{ borderRadius: '8px' }}
          />
        </div>
      </div>

      {/* 3D Audio Visualizer Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none' // Allow clicks to pass through to controls above
      }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Ambient lighting for the sphere */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />

          {/* Main audio visualizer sphere */}
          <AudioSphereVisualizer
            ref={visualizerRef}
            mic={true}
            existingContext={audioContext || undefined}
            fftSize={512}
            radius={1.2}
            colorScheme="neon"
            position={[0, 0, 0]}
          />

          {/* Additional smaller spheres for ambient effect */}
          <AudioSphereVisualizer
            mic={false}
            existingContext={audioContext || undefined}
            fftSize={256}
            radius={0.3}
            colorScheme="pastel"
            position={[-2.5, 1, -1]}
          />
          
          <AudioSphereVisualizer
            mic={false}
            existingContext={audioContext || undefined}
            fftSize={256}
            radius={0.25}
            colorScheme="neon"
            position={[2.2, -0.8, -0.8]}
          />
        </Canvas>
      </div>

      {/* Instructions overlay */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '15px',
        right: '15px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '12px 15px',
        borderRadius: '8px',
        fontSize: '12px',
        textAlign: 'center',
        zIndex: 3
      }}>
        🎵 The sphere visualizes your voice and AI responses in real-time • Allow microphone access for best experience
      </div>
    </div>
  );
};

export default VAPIIntegrationExample;

/**
 * Usage example in your main app:
 * 
 * ```tsx
 * function App() {
 *   return (
 *     <VAPIIntegrationExample
 *       vapiPublicKey="e84ab93f-6b83-4994-9e1a-1ab3cda12a23"
 *       vapiAssistantId="518c4706-c417-4d19-9e2d-9b2171b0cf9f"
 *     />
 *   );
 * }
 * ```
 * 
 * This creates a complete voice interface with:
 * - 3D audio visualizer background
 * - Voice controls overlay  
 * - VAPI integration
 * - Graceful fallbacks
 * - Mobile-friendly design
 */