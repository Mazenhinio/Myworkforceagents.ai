/* =============================================
   VOICE INTERFACE JAVASCRIPT
   ============================================= */

let voiceInterfaceState = 'inactive';
let vapiInstance = null;
let isVapiInitialized = false;
let audioContext = null;
let analyser = null;
let microphone = null;
let animationId = null;

// VAPI Configuration
const VAPI_CONFIG = {
    publicKey: 'demo-key', // Replace with actual key
    assistantId: 'demo-assistant', // Replace with actual assistant ID
    baseUrl: 'https://vapi.ai'
};

// Initialize the voice interface
function initializeVoiceInterface() {
    console.log('🔧 Initializing Voice Interface...');

    // Reset state
    voiceInterfaceState = 'inactive';

    // Setup voice interface
    setupVoiceInterface();

    // Initialize Three.js globe if available
    if (typeof THREE !== 'undefined') {
        initializeGlobe();
    }

    // Setup VAPI integration
    setupVAPIIntegration();

    // Update UI
    updateVoiceInterfaceState('inactive');
}

// Setup voice interface UI
function setupVoiceInterface() {
    const globeOverlay = document.getElementById('globeOverlayLayer');
    if (globeOverlay) {
        globeOverlay.addEventListener('click', handleGlobeClick);
    }

    // Setup audio visualization
    setupAudioVisualization();
}

// Handle globe click
function handleGlobeClick() {
    console.log('🌐 Globe clicked, current state:', voiceInterfaceState);

    switch (voiceInterfaceState) {
        case 'inactive':
            startVoiceSession();
            break;
        case 'listening':
            stopListening();
            break;
        case 'processing':
            // Do nothing while processing
            break;
        case 'speaking':
            stopSpeaking();
            break;
    }
}

// Start voice session
function startVoiceSession() {
    console.log('🎤 Starting voice session...');
    updateVoiceInterfaceState('connecting');

    // Initialize audio context
    initializeAudioContext();

    // Start VAPI session
    if (!isVapiInitialized) {
        initializeVAPI();
    } else {
        startVAPICall();
    }
}

// Stop listening
function stopListening() {
    console.log('🛑 Stopping listening...');
    updateVoiceInterfaceState('processing');

    if (vapiInstance) {
        // Stop VAPI call
        stopVAPICall();
    }
}

// Stop speaking
function stopSpeaking() {
    console.log('🔇 Stopping speaking...');
    updateVoiceInterfaceState('inactive');

    if (vapiInstance) {
        // Stop VAPI call
        stopVAPICall();
    }
}

// Update voice interface state
function updateVoiceInterfaceState(newState) {
    voiceInterfaceState = newState;
    console.log('📊 Voice interface state changed to:', newState);

    const statusDot = document.getElementById('globeStatusDot');
    const statusText = document.getElementById('globeStatusText');
    const globeWrapper = document.querySelector('.interactive-globe-wrapper');

    if (!statusDot || !statusText || !globeWrapper) return;

    // Remove all state classes
    statusDot.className = 'status-dot';
    globeWrapper.className = 'interactive-globe-wrapper';

    // Add new state class and update UI
    switch (newState) {
        case 'inactive':
            statusDot.classList.add('inactive');
            statusText.textContent = 'Press the interface to start';
            globeWrapper.classList.add('inactive');
            break;

        case 'connecting':
            statusDot.classList.add('processing');
            statusText.textContent = 'Connecting...';
            globeWrapper.classList.add('connecting');
            break;

        case 'listening':
            statusDot.classList.add('listening');
            statusText.textContent = 'Listening...';
            globeWrapper.classList.add('listening');
            break;

        case 'processing':
            statusDot.classList.add('processing');
            statusText.textContent = 'Processing...';
            globeWrapper.classList.add('processing');
            break;

        case 'speaking':
            statusDot.classList.add('active');
            statusText.textContent = 'Speaking...';
            globeWrapper.classList.add('speaking');
            break;

        case 'error':
            statusDot.classList.add('inactive');
            statusText.textContent = 'Connection error';
            globeWrapper.classList.add('error');
            break;
    }
}

// Initialize audio context
function initializeAudioContext() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create analyser for audio visualization
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        console.log('🎵 Audio context initialized');
    } catch (error) {
        console.error('❌ Failed to initialize audio context:', error);
    }
}

// Setup audio visualization
function setupAudioVisualization() {
    const audioBars = document.querySelectorAll('.audio-bar');
    if (!audioBars.length) return;

    function updateAudioVisualization() {
        if (!analyser) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyser.getByteFrequencyData(dataArray);

        // Update audio bars based on frequency data
        audioBars.forEach((bar, index) => {
            const value = dataArray[index * 4] || 0;
            const height = (value / 255) * 100;
            bar.style.height = Math.max(20, height) + '%';

            if (value > 50) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });

        animationId = requestAnimationFrame(updateAudioVisualization);
    }

    updateAudioVisualization();
}

// Initialize Three.js globe
function initializeGlobe() {
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas) return;

    console.log('🌍 Initializing Three.js globe...');

    // Three.js scene setup would go here
    // This is a placeholder for the actual Three.js implementation
    const ctx = canvas.getContext('2d');

    // Simple animated globe placeholder
    let rotation = 0;
    function animateGlobe() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw simple animated circle as placeholder
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw rotating elements
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);

        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.arc(80, 0, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
            ctx.rotate(Math.PI / 4);
        }

        ctx.restore();

        rotation += 0.01;
        requestAnimationFrame(animateGlobe);
    }

    animateGlobe();
}

// Setup VAPI integration
function setupVAPIIntegration() {
    console.log('📡 Setting up VAPI integration...');

    // Load VAPI SDK dynamically if not already loaded
    if (!window.Vapi) {
        loadVAPISDK();
    }
}

// Load VAPI SDK
function loadVAPISDK() {
    const script = document.createElement('script');
    script.src = 'https://cdn.vapi.ai/web-sdk.js';
    script.onload = () => {
        console.log('✅ VAPI SDK loaded');
        initializeVAPI();
    };
    script.onerror = () => {
        console.error('❌ Failed to load VAPI SDK');
        handleVAPIError('Failed to load voice AI system');
    };
    document.head.appendChild(script);
}

// Initialize VAPI
function initializeVAPI() {
    try {
        if (!window.Vapi) {
            throw new Error('VAPI SDK not loaded');
        }

        vapiInstance = new window.Vapi(VAPI_CONFIG.publicKey);

        // Setup event listeners
        setupVAPIEventListeners();

        isVapiInitialized = true;
        console.log('✅ VAPI initialized');

    } catch (error) {
        console.error('❌ Failed to initialize VAPI:', error);
        handleVAPIError('Failed to initialize voice AI');
    }
}

// Setup VAPI event listeners
function setupVAPIEventListeners() {
    if (!vapiInstance) return;

    vapiInstance.on('call-start', () => {
        console.log('📞 Call started');
        updateVoiceInterfaceState('listening');
        startAudioVisualization();
    });

    vapiInstance.on('call-end', () => {
        console.log('📞 Call ended');
        updateVoiceInterfaceState('inactive');
        stopAudioVisualization();
    });

    vapiInstance.on('speech-start', () => {
        console.log('🎤 Speech started');
        updateVoiceInterfaceState('listening');
    });

    vapiInstance.on('speech-end', () => {
        console.log('🎤 Speech ended');
        updateVoiceInterfaceState('processing');
    });

    vapiInstance.on('message', (message) => {
        console.log('💬 Message:', message);
        handleVAPIMessage(message);
    });

    vapiInstance.on('error', (error) => {
        console.error('❌ VAPI Error:', error);
        handleVAPIError(error.message || 'Voice AI error occurred');
    });
}

// Start VAPI call
function startVAPICall() {
    if (!vapiInstance) {
        handleVAPIError('Voice AI not initialized');
        return;
    }

    try {
        vapiInstance.start({
            assistantId: VAPI_CONFIG.assistantId,
            config: {
                transcriber: {
                    provider: 'deepgram',
                    model: 'nova-2'
                },
                model: {
                    provider: 'openai',
                    model: 'gpt-3.5-turbo',
                    temperature: 0.7
                }
            }
        });

        console.log('🎯 VAPI call started');
    } catch (error) {
        console.error('❌ Failed to start VAPI call:', error);
        handleVAPIError('Failed to start voice conversation');
    }
}

// Stop VAPI call
function stopVAPICall() {
    if (vapiInstance) {
        try {
            vapiInstance.stop();
            console.log('🛑 VAPI call stopped');
        } catch (error) {
            console.error('❌ Failed to stop VAPI call:', error);
        }
    }
}

// Handle VAPI messages
function handleVAPIMessage(message) {
    console.log('📨 VAPI Message:', message);

    if (message.type === 'transcript') {
        // Handle transcript messages
        updateVoiceInterfaceState('speaking');
    } else if (message.type === 'function_call') {
        // Handle function calls
        console.log('🔧 Function call:', message.functionCall);
    }
}

// Handle VAPI errors
function handleVAPIError(errorMessage) {
    console.error('🚨 VAPI Error:', errorMessage);
    updateVoiceInterfaceState('error');

    // Show error UI
    showVoiceError(errorMessage);
}

// Show voice error
function showVoiceError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'voice-error';
    errorDiv.innerHTML = `
        <h3>Voice Connection Error</h3>
        <p>${message}</p>
        <button class="retry-btn" onclick="retryVoiceConnection()">Retry Connection</button>
    `;

    // Replace voice interface content
    const voiceContainer = document.querySelector('.centered-voice-layout');
    if (voiceContainer) {
        voiceContainer.innerHTML = '';
        voiceContainer.appendChild(errorDiv);
    }
}

// Retry voice connection
function retryVoiceConnection() {
    console.log('🔄 Retrying voice connection...');

    // Reset error state
    updateVoiceInterfaceState('inactive');

    // Reinitialize
    initializeVoiceInterface();
}

// Start audio visualization
function startAudioVisualization() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    const audioBars = document.querySelectorAll('.audio-bar');
    if (audioBars.length) {
        audioBars.forEach(bar => bar.style.display = 'block');
    }

    setupAudioVisualization();
}

// Stop audio visualization
function stopAudioVisualization() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    const audioBars = document.querySelectorAll('.audio-bar');
    if (audioBars.length) {
        audioBars.forEach(bar => {
            bar.style.display = 'none';
            bar.classList.remove('active');
        });
    }
}

// Fallback for browsers without VAPI support
function setupFallbackInterface() {
    console.log('🔄 Setting up fallback voice interface...');

    // Simple text-to-speech and speech-to-text fallback
    const statusText = document.getElementById('globeStatusText');
    if (statusText) {
        statusText.textContent = 'Voice AI not supported in this browser';
    }

    // Disable globe interaction
    const globeWrapper = document.querySelector('.interactive-globe-wrapper');
    if (globeWrapper) {
        globeWrapper.style.pointerEvents = 'none';
        globeWrapper.style.opacity = '0.5';
    }
}

// Check for browser support
function checkBrowserSupport() {
    const hasWebAudio = !!(window.AudioContext || window.webkitAudioContext);
    const hasWebRTC = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasWebGL = (() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    })();

    console.log('🔍 Browser Support Check:', {
        WebAudio: hasWebAudio,
        WebRTC: hasWebRTC,
        WebGL: hasWebGL
    });

    if (!hasWebAudio || !hasWebRTC) {
        console.warn('⚠️ Limited voice functionality due to browser limitations');
        setupFallbackInterface();
    }

    return {
        webAudio: hasWebAudio,
        webRTC: hasWebRTC,
        webGL: hasWebGL
    };
}

// Cleanup function
function cleanupVoiceInterface() {
    console.log('🧹 Cleaning up voice interface...');

    // Stop any ongoing processes
    stopVAPICall();
    stopAudioVisualization();

    // Close audio context
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
    }

    // Reset state
    voiceInterfaceState = 'inactive';
    vapiInstance = null;
    isVapiInitialized = false;
}

// Global functions for HTML onclick handlers
window.handleGlobeClick = handleGlobeClick;
window.retryVoiceConnection = retryVoiceConnection;
