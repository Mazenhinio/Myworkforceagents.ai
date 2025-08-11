import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { DataTexture, RGBAFormat, FloatType, IcosahedronGeometry, ShaderMaterial, Mesh } from 'three';
import * as THREE from 'three';

// Type definitions
export type ColorScheme = 'neon' | 'pastel';

export interface AudioSphereVisualizerProps {
  mic?: boolean;
  existingContext?: AudioContext;
  fftSize?: 256 | 512 | 1024;
  radius?: number;
  colorScheme?: ColorScheme;
  position?: [number, number, number];
}

export interface VisualizerHandle {
  start: () => void;
  stop: () => void;
}

// Custom hook for audio analysis
function useAudioAnalyser({
  mic = true,
  existingContext,
  fftSize = 512,
}: Pick<AudioSphereVisualizerProps, 'mic' | 'existingContext' | 'fftSize'>) {
  const [dataTexture, setDataTexture] = useState<DataTexture | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const initializeAudio = async () => {
    try {
      // Use existing context or create new one
      const audioContext = existingContext || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Create analyser
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      // Create data texture for shader
      const texture = new DataTexture(
        new Float32Array(bufferLength * 4),
        bufferLength,
        1,
        RGBAFormat,
        FloatType
      );
      texture.needsUpdate = true;
      setDataTexture(texture);

      let micSource: MediaStreamAudioSourceNode | null = null;
      let pageSource: MediaStreamAudioSourceNode | null = null;

      // Connect microphone if requested
      if (mic) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            }
          });
          micStreamRef.current = stream;
          micSource = audioContext.createMediaStreamSource(stream);
          micSource.connect(analyser);
          setHasPermission(true);
        } catch (error) {
          console.warn('Microphone access denied:', error);
          setHasPermission(false);
        }
      }

      // Try to connect to page audio (if available)
      try {
        if (audioContext.destination) {
          // Create a gain node to tap into existing audio
          const gainNode = audioContext.createGain();
          gainNode.gain.value = 0; // Silent monitoring
          gainNode.connect(audioContext.destination);
          gainNode.connect(analyser);
        }
      } catch (error) {
        console.warn('Could not connect to page audio:', error);
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      setHasPermission(false);
      return false;
    }
  };

  const updateAnalyser = () => {
    if (!analyserRef.current || !dataArrayRef.current || !dataTexture) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Convert to float array for texture
    const textureData = new Float32Array(dataArrayRef.current.length * 4);
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const normalizedValue = dataArrayRef.current[i] / 255;
      textureData[i * 4] = normalizedValue;     // R: amplitude
      textureData[i * 4 + 1] = normalizedValue; // G: amplitude
      textureData[i * 4 + 2] = normalizedValue; // B: amplitude
      textureData[i * 4 + 3] = 1.0;            // A: always 1
    }
    
    dataTexture.image.data = textureData;
    dataTexture.needsUpdate = true;

    if (isActive) {
      animationIdRef.current = requestAnimationFrame(updateAnalyser);
    }
  };

  const start = async () => {
    if (isActive) return;
    
    const success = await initializeAudio();
    if (success) {
      setIsActive(true);
      updateAnalyser();
    }
  };

  const stop = () => {
    setIsActive(false);
    
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    if (audioContextRef.current && !existingContext) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stop();
      if (dataTexture) {
        dataTexture.dispose();
      }
    };
  }, []);

  return { dataTexture, isActive, hasPermission, start, stop };
}

// Vertex shader
const vertexShader = `
  uniform sampler2D uDataTex;
  uniform float uTime;
  uniform float uAmplitude;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  // Simple noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    // Sample frequency data based on vertex position
    float freqIndex = length(position.xy) * 0.5 + 0.5;
    freqIndex = clamp(freqIndex, 0.0, 1.0);
    
    vec4 audioData = texture2D(uDataTex, vec2(freqIndex, 0.5));
    float amplitude = audioData.r;
    
    // Add noise for organic motion
    float noiseValue = noise(normal.xy * 3.0 + uTime * 0.5);
    
    // Calculate displacement
    float displacement = amplitude * uAmplitude * (0.5 + 0.5 * noiseValue);
    vDisplacement = displacement;
    
    // Displace vertex along normal
    vec3 newPosition = position + normal * displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment shader
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorScheme[3];
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  void main() {
    // Calculate base color based on displacement
    float intensity = vDisplacement * 2.0;
    
    // Create color gradient based on intensity
    vec3 color = mix(uColorScheme[0], uColorScheme[1], intensity);
    color = mix(color, uColorScheme[2], intensity * 0.5);
    
    // Add time-based hue shift
    float hueShift = sin(uTime * 0.5) * 0.1;
    color.r += hueShift;
    color.g += hueShift * 0.5;
    color.b -= hueShift * 0.5;
    
    // Add fresnel effect
    float fresnel = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
    color += fresnel * 0.3 * uColorScheme[2];
    
    // Add emissive glow
    float emissive = intensity * 0.5 + 0.2;
    color *= emissive;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Color schemes
const colorSchemes = {
  neon: [
    new THREE.Vector3(0.0, 0.8, 1.0),  // Cyan
    new THREE.Vector3(1.0, 0.0, 1.0),  // Magenta
    new THREE.Vector3(1.0, 1.0, 0.0),  // Yellow
  ],
  pastel: [
    new THREE.Vector3(0.7, 0.9, 1.0),  // Light blue
    new THREE.Vector3(1.0, 0.7, 0.9),  // Light pink
    new THREE.Vector3(0.9, 1.0, 0.7),  // Light green
  ],
};

// Main component
export const AudioSphereVisualizer = forwardRef<VisualizerHandle, AudioSphereVisualizerProps>(({
  mic = true,
  existingContext,
  fftSize = 512,
  radius = 1,
  colorScheme = 'neon',
  position = [0, 0, 0],
}, ref) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { clock } = useThree();
  
  const { dataTexture, isActive, hasPermission, start, stop } = useAudioAnalyser({
    mic,
    existingContext,
    fftSize,
  });

  // Expose handle methods
  useImperativeHandle(ref, () => ({
    start,
    stop,
  }), [start, stop]);

  // Create geometry and material
  const geometry = useMemo(() => new IcosahedronGeometry(radius, 4), [radius]);
  
  const material = useMemo(() => {
    const colors = colorSchemes[colorScheme];
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uDataTex: { value: null },
        uTime: { value: 0 },
        uAmplitude: { value: 0.3 },
        uColorScheme: { value: colors },
      },
      transparent: true,
    });
  }, [colorScheme]);

  // Update uniforms each frame
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uDataTex.value = dataTexture;
    }
    
    if (meshRef.current && (!isActive || hasPermission === false)) {
      // Gentle rotation when not active
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  // Start automatically on mount if permission granted
  useEffect(() => {
    if (hasPermission !== false) {
      start();
    }
  }, [hasPermission, start]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Fallback UI when microphone access denied
  if (hasPermission === false && mic) {
    return (
      <group position={position}>
        <mesh ref={meshRef} geometry={geometry} material={material} />
        <Html
          position={[0, radius + 0.5, 0]}
          center
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          Microphone access denied
        </Html>
      </group>
    );
  }

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <shaderMaterial ref={materialRef} attach="material" {...material} />
    </mesh>
  );
});

AudioSphereVisualizer.displayName = 'AudioSphereVisualizer';

export default AudioSphereVisualizer;