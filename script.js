// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MWAAI System Initializing...');
    
    // Initialize all systems
    initializeAnimations();
    initialize3DStoryAnimations();
    initializeFormValidation();
    initializeScrollEffects();
    initializeMobileMenu();
    
    // Start lead counter animation immediately
    animateLeadCounter();
    
    console.log('✅ All systems online!');
});

// 3D Story Animation Controller - SCROLL-DRIVEN ANIMATIONS
function initialize3DStoryAnimations() {
    console.log('🎬 Initializing Scroll-Driven 3D Story Animations...');
    
    const scenes = document.querySelectorAll('.story-scene');
    const progressFill = document.getElementById('progressFill');
    
    if (!scenes.length) {
        console.log('❌ No story scenes found');
        return;
    }
    
    console.log(`🎬 Found ${scenes.length} story scenes`);
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    let activeScenes = new Set();
    
    // Track scroll direction
    function updateScrollDirection() {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
    }
    
    // Calculate scene progress based on scroll position
    function calculateSceneProgress(scene) {
        const rect = scene.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Scene is fully visible when it's centered
        const sceneCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        
        // Calculate progress (0 to 1)
        const distanceFromCenter = Math.abs(sceneCenter - windowCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        const progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        
        return {
            progress: progress,
            isVisible: rect.top < windowHeight && rect.bottom > 0,
            isActive: progress > 0.3
        };
    }
    
    // Apply scroll-based animations
    function handleScrollAnimations() {
        updateScrollDirection();
        
        scenes.forEach((scene, index) => {
            const sceneNumber = index + 1;
            const { progress, isVisible, isActive } = calculateSceneProgress(scene);
            
            // Update progress bar
            if (isActive && progressFill) {
                const progressPercent = (sceneNumber / scenes.length) * 100;
                progressFill.style.height = `${progressPercent}%`;
            }
            
            // Scene activation/deactivation
            if (isActive && !activeScenes.has(sceneNumber)) {
                activeScenes.add(sceneNumber);
                scene.classList.add('active');
                triggerSceneAnimations(sceneNumber, scrollDirection, progress);
                addVisualEffects(scene);
                console.log(`🎬 Scene ${sceneNumber} activated (${scrollDirection})`);
            } else if (!isActive && activeScenes.has(sceneNumber)) {
                activeScenes.delete(sceneNumber);
                scene.classList.remove('active');
                reverseSceneAnimations(sceneNumber);
                console.log(`🎬 Scene ${sceneNumber} deactivated`);
            }
            
            // Update animation progress for active scenes
            if (activeScenes.has(sceneNumber) && isVisible) {
                updateAnimationProgress(sceneNumber, progress, scrollDirection);
            }
        });
    }
    
    // Throttled scroll handler for performance
    let scrollTimeout;
    function onScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(handleScrollAnimations, 16); // ~60fps
    }
    
    // Set up scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    handleScrollAnimations();
    
    // Add continuous sparkles for active scenes
    setInterval(() => {
        addRandomSparkles();
    }, 3000);
}

function triggerSceneAnimations(sceneNumber, direction = 'down', progress = 1) {
    const scene = document.querySelector(`[data-scene="${sceneNumber}"]`);
    if (!scene) {
        console.log(`❌ Scene ${sceneNumber} not found`);
        return;
    }
    
    console.log(`🎬 Triggering animations for scene ${sceneNumber} (${direction}, progress: ${progress.toFixed(2)})`);
    
    switch(sceneNumber) {
        case 1:
            animatePhoneScene(scene, direction, progress);
            break;
        case 2:
            animateAIBrainScene(scene, direction, progress);
            break;
        case 3:
            animateContractScene(scene, direction, progress);
            break;
        case 4:
            animateHouseScene(scene, direction, progress);
            break;
    }
}

function reverseSceneAnimations(sceneNumber) {
    const scene = document.querySelector(`[data-scene="${sceneNumber}"]`);
    if (!scene) return;
    
    console.log(`🎬 Reversing animations for scene ${sceneNumber}`);
    
    // Pause all animations and set to reverse
    const animatedElements = scene.querySelectorAll('*');
    animatedElements.forEach(element => {
        if (element.style.animation) {
            element.style.animationDirection = 'reverse';
            element.style.animationFillMode = 'backwards';
        }
    });
}

function updateAnimationProgress(sceneNumber, progress, direction) {
    const scene = document.querySelector(`[data-scene="${sceneNumber}"]`);
    if (!scene) return;
    
    // Apply transform and opacity based on scroll progress
    const container = scene.querySelector('.scene-3d-container');
    if (container) {
        const translateY = direction === 'down' ? 
            (1 - progress) * 50 : 
            progress * -50;
        
        const rotateX = direction === 'down' ? 
            (1 - progress) * 15 : 
            progress * -15;
        
        const opacity = Math.max(0.3, progress);
        
        container.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg)`;
        container.style.opacity = opacity;
    }
    
    // Update animation speed based on scroll progress
    const animatedElements = scene.querySelectorAll('*');
    animatedElements.forEach(element => {
        if (element.style.animation) {
            const baseSpeed = direction === 'down' ? 1 : 0.5;
            const speed = baseSpeed * (0.5 + progress * 0.5);
            element.style.animationDuration = `${2 / speed}s`;
            element.style.animationDirection = direction === 'down' ? 'normal' : 'reverse';
        }
    });
}

function animatePhoneScene(scene, direction = 'down', progress = 1) {
    console.log(`📱 Starting phone scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const phone = scene.querySelector('.phone-mockup');
    const calendarDay = scene.querySelector('.calendar-day.selected');
    const timeSlot = scene.querySelector('.time-slot.active');
    const bookButton = scene.querySelector('.book-button');
    const floatingIcons = scene.querySelectorAll('.floating-icon');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.7;
    
    // Phone animations with scroll-responsive transforms
    if (phone) {
        const baseTransform = 'rotateY(-15deg) rotateX(5deg)';
        const scrollTransform = direction === 'down' ? 
            `${baseTransform} scale(${0.8 + progress * 0.2}) translateZ(${progress * 20}px)` :
            `${baseTransform} scale(${1 - progress * 0.2}) translateZ(${-progress * 20}px)`;
        
        phone.style.animation = `phoneFloat ${4 / speedMultiplier}s ease-in-out infinite ${animDirection}`;
        phone.style.transform = scrollTransform;
        console.log(`📱 Phone animation: ${direction}`);
    }
    
    // Calendar day pulsing with dynamic intensity
    if (calendarDay) {
        const pulseSpeed = 1.5 / speedMultiplier;
        calendarDay.style.animation = `calendarPulse ${pulseSpeed}s ease-in-out infinite ${animDirection}`;
        calendarDay.style.opacity = 0.7 + progress * 0.3;
        console.log(`📅 Calendar pulse: ${direction}`);
    }
    
    // Time slot glowing with scroll responsiveness
    if (timeSlot) {
        const glowSpeed = 1.5 / speedMultiplier;
        timeSlot.style.animation = `timeSlotGlow ${glowSpeed}s ease-in-out infinite ${animDirection}`;
        timeSlot.style.opacity = 0.8 + progress * 0.2;
        console.log(`⏰ Time slot glow: ${direction}`);
    }
    
    // Book button with enhanced effects
    if (bookButton) {
        const buttonSpeed = 2 / speedMultiplier;
        bookButton.style.animation = `buttonGlow ${buttonSpeed}s ease-in-out infinite ${animDirection}`;
        bookButton.style.transform = `scale(${0.95 + progress * 0.05})`;
        console.log(`🔘 Button glow: ${direction}`);
    }
    
    // Floating icons with staggered entrance/exit
    floatingIcons.forEach((icon, index) => {
        const delay = direction === 'down' ? index * 200 : (floatingIcons.length - index) * 200;
        const iconProgress = Math.max(0, Math.min(1, (progress - index * 0.1) * 1.5));
        
        setTimeout(() => {
            icon.style.animation = `floatIcon ${3 / speedMultiplier}s ease-in-out infinite ${animDirection}`;
            icon.style.opacity = iconProgress;
            icon.style.transform = `scale(${0.5 + iconProgress * 0.5}) translateY(${(1 - iconProgress) * 30}px)`;
            console.log(`✨ Floating icon ${index + 1}: ${direction}`);
        }, delay);
    });
}

function animateAIBrainScene(scene, direction = 'down', progress = 1) {
    console.log(`🧠 Starting AI brain scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const aiBrain = scene.querySelector('.ai-brain');
    const neurons = scene.querySelectorAll('.neuron');
    const rings = scene.querySelectorAll('.processing-ring');
    const actionBubbles = scene.querySelectorAll('.action-bubble');
    const dataStreams = scene.querySelectorAll('.data-stream');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.8;
    
    // Brain rotation with dynamic speed
    if (aiBrain) {
        const rotationSpeed = 6 / speedMultiplier;
        const scaleValue = 0.7 + progress * 0.3;
        aiBrain.style.animation = `brainRotate ${rotationSpeed}s linear infinite ${animDirection}`;
        aiBrain.style.transform = `scale(${scaleValue}) rotateZ(${direction === 'down' ? progress * 360 : -progress * 360}deg)`;
        console.log(`🧠 Brain rotation: ${direction}`);
    }
    
    // Neuron pulsing with staggered activation
    neurons.forEach((neuron, index) => {
        const pulseSpeed = 1.5 / speedMultiplier;
        const neuronProgress = Math.max(0, Math.min(1, (progress - index * 0.15) * 2));
        const delay = direction === 'down' ? index * 0.3 : (neurons.length - index) * 0.3;
        
        neuron.style.animation = `neuronPulse ${pulseSpeed}s ease-in-out infinite ${animDirection}`;
        neuron.style.animationDelay = `${delay}s`;
        neuron.style.opacity = neuronProgress;
        neuron.style.transform = `scale(${0.5 + neuronProgress * 0.5})`;
        console.log(`🔵 Neuron ${index + 1}: ${direction}`);
    });
    
    // Processing rings with variable speeds
    rings.forEach((ring, index) => {
        const ringSpeed = 3 / speedMultiplier;
        const ringProgress = Math.max(0.3, progress);
        const delay = direction === 'down' ? index * -1 : -(rings.length - index);
        
        ring.style.animation = `ringRotate ${ringSpeed}s linear infinite ${animDirection}`;
        ring.style.animationDelay = `${delay}s`;
        ring.style.opacity = ringProgress;
        ring.style.transform = `scale(${0.8 + ringProgress * 0.2})`;
        console.log(`⭕ Processing ring ${index + 1}: ${direction}`);
    });
    
    // Action bubbles with entrance effects
    actionBubbles.forEach((bubble, index) => {
        const floatSpeed = 3 / speedMultiplier;
        const bubbleProgress = Math.max(0, Math.min(1, (progress - index * 0.2) * 1.5));
        const delay = direction === 'down' ? index * 1 : (actionBubbles.length - index) * 1;
        
        bubble.style.animation = `bubbleFloat ${floatSpeed}s ease-in-out infinite ${animDirection}`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.opacity = bubbleProgress * 0.9;
        bubble.style.transform = `scale(${0.6 + bubbleProgress * 0.4}) translateY(${(1 - bubbleProgress) * 20}px)`;
        console.log(`💭 Action bubble ${index + 1}: ${direction}`);
    });
    
    // Data streams with flow direction changes
    dataStreams.forEach((stream, index) => {
        const flowSpeed = 2 / speedMultiplier;
        const streamProgress = Math.max(0, Math.min(1, (progress - index * 0.1) * 1.3));
        const delay = direction === 'down' ? index * 0.7 : (dataStreams.length - index) * 0.7;
        
        stream.style.animation = `dataFlow ${flowSpeed}s ease-in-out infinite ${animDirection}`;
        stream.style.animationDelay = `${delay}s`;
        stream.style.opacity = streamProgress;
        console.log(`📊 Data stream ${index + 1}: ${direction}`);
    });
}

function animateContractScene(scene, direction = 'down', progress = 1) {
    console.log(`📄 Starting contract scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const contractScene = scene.querySelector('.contract-scene');
    const signature = scene.querySelector('.signature');
    const checkmark = scene.querySelector('.checkmark');
    const handshake = scene.querySelector('.handshake');
    const confetti = scene.querySelectorAll('.confetti');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.6;
    
    // Contract floating with rotation based on scroll
    if (contractScene) {
        const floatSpeed = 4 / speedMultiplier;
        const rotateValue = direction === 'down' ? progress * 5 : -progress * 5;
        const scaleValue = 0.8 + progress * 0.2;
        
        contractScene.style.animation = `contractFloat ${floatSpeed}s ease-in-out infinite ${animDirection}`;
        contractScene.style.transform = `rotateY(-10deg) rotateX(10deg) rotateZ(${rotateValue}deg) scale(${scaleValue})`;
        console.log(`📄 Contract floating: ${direction}`);
    }
    
    // Signature writing with progress-based visibility
    if (signature) {
        const writeSpeed = 4 / speedMultiplier;
        const signatureProgress = Math.max(0, Math.min(1, (progress - 0.3) * 2));
        
        signature.style.animation = `signatureWrite ${writeSpeed}s ease-in-out infinite ${animDirection}`;
        signature.style.opacity = signatureProgress;
        signature.style.transform = `scaleX(${direction === 'down' ? signatureProgress : 1 - signatureProgress})`;
        console.log(`✍️ Signature writing: ${direction}`);
    }
    
    // Checkmark with delayed appearance
    if (checkmark) {
        const checkSpeed = 4 / speedMultiplier;
        const checkProgress = Math.max(0, Math.min(1, (progress - 0.6) * 3));
        
        checkmark.style.animation = `checkmarkAppear ${checkSpeed}s ease-in-out infinite ${animDirection}`;
        checkmark.style.opacity = checkProgress;
        checkmark.style.transform = `scale(${checkProgress}) rotate(${direction === 'down' ? 0 : -180}deg)`;
        console.log(`✅ Checkmark: ${direction}`);
    }
    
    // Handshake with enhanced movement
    if (handshake) {
        const shakeSpeed = 3 / speedMultiplier;
        const shakeProgress = Math.max(0.3, progress);
        
        handshake.style.animation = `handshakeMove ${shakeSpeed}s ease-in-out infinite ${animDirection}`;
        handshake.style.opacity = shakeProgress;
        handshake.style.transform = `scale(${0.7 + shakeProgress * 0.3}) rotate(${direction === 'down' ? progress * 10 : -progress * 10}deg)`;
        console.log(`🤝 Handshake: ${direction}`);
    }
    
    // Confetti with staggered timing and reverse fall
    confetti.forEach((piece, index) => {
        const fallSpeed = 4 / speedMultiplier;
        const confettiProgress = Math.max(0, Math.min(1, (progress - 0.7) * 4));
        const delay = direction === 'down' ? index * 0.5 : (confetti.length - index) * 0.5;
        
        piece.style.animation = `confettiFall ${fallSpeed}s ease-in-out infinite ${animDirection}`;
        piece.style.animationDelay = `${delay}s`;
        piece.style.opacity = confettiProgress;
        
        if (direction === 'up') {
            piece.style.transform = `translateY(${(1 - confettiProgress) * -200}px) rotate(${-confettiProgress * 360}deg)`;
        }
        
        console.log(`🎉 Confetti piece ${index + 1}: ${direction}`);
    });
}

function animateHouseScene(scene, direction = 'down', progress = 1) {
    console.log(`🏠 Starting house scene animations (${direction}, ${progress.toFixed(2)})`);
    
    const houseExterior = scene.querySelector('.house-exterior');
    const personAvatar = scene.querySelector('.person-avatar');
    const coffeeCup = scene.querySelector('.coffee-cup');
    const houseKeys = scene.querySelector('.house-keys');
    const successMetrics = scene.querySelectorAll('.metric');
    
    const animDirection = direction === 'down' ? 'normal' : 'reverse';
    const speedMultiplier = direction === 'down' ? 1 : 0.7;
    
    // House floating with enhanced 3D effects
    if (houseExterior) {
        const floatSpeed = 5 / speedMultiplier;
        const houseProgress = Math.max(0.5, progress);
        const rotateY = direction === 'down' ? 20 + progress * 10 : 30 - progress * 10;
        
        houseExterior.style.animation = `houseFloat ${floatSpeed}s ease-in-out infinite ${animDirection}`;
        houseExterior.style.transform = `rotateY(${rotateY}deg) rotateX(-5deg) scale(${0.7 + houseProgress * 0.3})`;
        houseExterior.style.opacity = houseProgress;
        console.log(`🏠 House floating: ${direction}`);
    }
    
    // Happy person with excitement level based on progress
    if (personAvatar) {
        const happySpeed = 2.5 / speedMultiplier;
        const happyProgress = Math.max(0, Math.min(1, (progress - 0.2) * 1.5));
        
        personAvatar.style.animation = `personHappy ${happySpeed}s ease-in-out infinite ${animDirection}`;
        personAvatar.style.opacity = happyProgress;
        personAvatar.style.transform = `scale(${0.6 + happyProgress * 0.4}) rotate(${direction === 'down' ? happyProgress * 8 : -happyProgress * 8}deg)`;
        console.log(`😊 Happy person: ${direction}`);
    }
    
    // Coffee cup with steam effect
    if (coffeeCup) {
        const coffeeSpeed = 3.5 / speedMultiplier;
        const coffeeProgress = Math.max(0, Math.min(1, (progress - 0.4) * 2));
        
        coffeeCup.style.animation = `relaxationFloat ${coffeeSpeed}s ease-in-out infinite ${animDirection}`;
        coffeeCup.style.opacity = coffeeProgress;
        coffeeCup.style.transform = `scale(${0.5 + coffeeProgress * 0.5}) translateY(${(1 - coffeeProgress) * 20}px)`;
        console.log(`☕ Coffee floating: ${direction}`);
    }
    
    // House keys with jingling effect
    if (houseKeys) {
        const keysSpeed = 3.5 / speedMultiplier;
        const keysProgress = Math.max(0, Math.min(1, (progress - 0.6) * 2));
        const delay = direction === 'down' ? 0.5 : 0;
        
        houseKeys.style.animation = `relaxationFloat ${keysSpeed}s ease-in-out infinite ${animDirection}`;
        houseKeys.style.animationDelay = `${delay}s`;
        houseKeys.style.opacity = keysProgress;
        houseKeys.style.transform = `scale(${0.5 + keysProgress * 0.5}) rotate(${direction === 'down' ? keysProgress * 15 : -keysProgress * 15}deg)`;
        console.log(`🗝️ Keys floating: ${direction}`);
    }
    
    // Success metrics with count-up effect
    successMetrics.forEach((metric, index) => {
        const metricProgress = Math.max(0, Math.min(1, (progress - 0.8) * 5));
        const delay = direction === 'down' ? index * 0.3 : (successMetrics.length - index) * 0.3;
        
        setTimeout(() => {
            metric.style.opacity = metricProgress;
            metric.style.transform = `scale(${0.7 + metricProgress * 0.3}) translateY(${(1 - metricProgress) * 30}px)`;
            
            // Animate the metric values
            const valueElement = metric.querySelector('.metric-value');
            if (valueElement && metricProgress > 0.5) {
                valueElement.style.animation = `pulse 2s ease-in-out infinite`;
            }
        }, delay * 1000);
        
        console.log(`📊 Success metric ${index + 1}: ${direction}`);
    });
}

function addVisualEffects(scene) {
    // Add extra sparkle effects
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.position = 'absolute';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.right = '0';
    sparkleContainer.style.bottom = '0';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '10';
    
    scene.style.position = 'relative';
    scene.appendChild(sparkleContainer);
    
    // Create sparkles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(sparkleContainer);
        }, i * 1000);
    }
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '20px';
    sparkle.style.opacity = '0';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animation = 'sparkleFloat 3s ease-in-out forwards';
    sparkle.style.pointerEvents = 'none';
    
    // Add sparkle keyframes if not already added
    if (!document.querySelector('#sparkleKeyframes')) {
        const style = document.createElement('style');
        style.id = 'sparkleKeyframes';
        style.textContent = `
            @keyframes sparkleFloat {
                0% { opacity: 0; transform: translateY(0px) scale(0); }
                10% { opacity: 1; transform: translateY(0px) scale(1); }
                90% { opacity: 1; transform: translateY(-50px) scale(1); }
                100% { opacity: 0; transform: translateY(-100px) scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 3000);
}

function addRandomSparkles() {
    const scenes = document.querySelectorAll('.story-scene');
    scenes.forEach(scene => {
        const sparkleContainer = scene.querySelector('.sparkle-container');
        if (sparkleContainer) {
            createSparkle(sparkleContainer);
        }
    });
}

// Section-specific scroll animations
function animateHeroSection(section, direction, progress, isActive) {
    const heroText = section.querySelector('.hero-text');
    const heroVisual = section.querySelector('.hero-visual');
    const heroStats = section.querySelectorAll('.stat');
    
    if (!isActive) return;
    
    console.log(`🦸 Hero section: ${direction} (${progress.toFixed(2)})`);
    
    // Text animations
    if (heroText) {
        const translateY = direction === 'down' ? 
            (1 - progress) * 30 : 
            progress * -30;
        
        const opacity = Math.max(0.3, progress);
        
        heroText.style.transform = `translateY(${translateY}px)`;
        heroText.style.opacity = opacity;
        heroText.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Visual animations
    if (heroVisual) {
        const scale = 0.8 + progress * 0.2;
        const rotateY = direction === 'down' ? 
            progress * 5 : 
            -progress * 5;
        
        heroVisual.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
        heroVisual.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Stats animation
    heroStats.forEach((stat, index) => {
        const delay = direction === 'down' ? index * 0.1 : (heroStats.length - index) * 0.1;
        const statProgress = Math.max(0, Math.min(1, (progress - delay) * 1.5));
        
        setTimeout(() => {
            stat.style.opacity = statProgress;
            stat.style.transform = `scale(${0.8 + statProgress * 0.2}) translateY(${(1 - statProgress) * 20}px)`;
            stat.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 100);
    });
}

function animateResultsSection(section, direction, progress, isActive) {
    const resultCards = section.querySelectorAll('.result-card');
    const sectionHeader = section.querySelector('.section-header');
    
    if (!isActive) return;
    
    console.log(`📊 Results section: ${direction} (${progress.toFixed(2)})`);
    
    // Section header animation
    if (sectionHeader) {
        const headerY = direction === 'down' ? 
            (1 - progress) * 40 : 
            progress * -40;
        
        sectionHeader.style.transform = `translateY(${headerY}px)`;
        sectionHeader.style.opacity = Math.max(0.2, progress);
        sectionHeader.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Result cards staggered animation
    resultCards.forEach((card, index) => {
        const delay = direction === 'down' ? index * 0.15 : (resultCards.length - index) * 0.15;
        const cardProgress = Math.max(0, Math.min(1, (progress - delay) * 1.2));
        
        setTimeout(() => {
            const translateY = (1 - cardProgress) * 60;
            const scale = 0.85 + cardProgress * 0.15;
            const rotateX = direction === 'down' ? 
                (1 - cardProgress) * 15 : 
                cardProgress * -15;
            
            card.style.transform = `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
            card.style.opacity = cardProgress;
            card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Animate the icon
            const icon = card.querySelector('.result-icon');
            if (icon && cardProgress > 0.5) {
                icon.style.animation = `pulse 2s ease-in-out infinite`;
            }
        }, delay * 150);
    });
}

function animateFormSection(section, direction, progress, isActive) {
    const formContainer = section.querySelector('.form-container');
    const formGroups = section.querySelectorAll('.form-group');
    const trustItems = section.querySelectorAll('.trust-item');
    
    if (!isActive) return;
    
    console.log(`📝 Form section: ${direction} (${progress.toFixed(2)})`);
    
    // Form container animation
    if (formContainer) {
        const containerScale = 0.9 + progress * 0.1;
        const containerY = direction === 'down' ? 
            (1 - progress) * 50 : 
            progress * -50;
        
        formContainer.style.transform = `translateY(${containerY}px) scale(${containerScale})`;
        formContainer.style.opacity = Math.max(0.4, progress);
        formContainer.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Form groups staggered entrance
    formGroups.forEach((group, index) => {
        const delay = direction === 'down' ? index * 0.08 : (formGroups.length - index) * 0.08;
        const groupProgress = Math.max(0, Math.min(1, (progress - delay) * 1.3));
        
        setTimeout(() => {
            const translateX = direction === 'down' ? 
                (1 - groupProgress) * 30 : 
                groupProgress * -30;
            
            group.style.transform = `translateX(${translateX}px)`;
            group.style.opacity = groupProgress;
            group.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 100);
    });
    
    // Trust items animation
    trustItems.forEach((item, index) => {
        const delay = direction === 'down' ? index * 0.2 : (trustItems.length - index) * 0.2;
        const itemProgress = Math.max(0, Math.min(1, (progress - 0.6 - delay) * 2));
        
        setTimeout(() => {
            item.style.opacity = itemProgress;
            item.style.transform = `scale(${0.8 + itemProgress * 0.2})`;
            item.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 200);
    });
}

function animateFinalCTA(section, direction, progress, isActive) {
    const ctaContent = section.querySelector('.cta-content');
    const urgencyItems = section.querySelectorAll('.urgency-item');
    const finalButton = section.querySelector('.final-cta-button');
    
    if (!isActive) return;
    
    console.log(`🚀 Final CTA: ${direction} (${progress.toFixed(2)})`);
    
    // CTA content animation
    if (ctaContent) {
        const contentScale = 0.85 + progress * 0.15;
        const rotateZ = direction === 'down' ? 
            (1 - progress) * 3 : 
            progress * -3;
        
        ctaContent.style.transform = `scale(${contentScale}) rotateZ(${rotateZ}deg)`;
        ctaContent.style.opacity = Math.max(0.3, progress);
        ctaContent.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Urgency items with wave effect
    urgencyItems.forEach((item, index) => {
        const delay = direction === 'down' ? index * 0.2 : (urgencyItems.length - index) * 0.2;
        const itemProgress = Math.max(0, Math.min(1, (progress - delay) * 1.4));
        
        setTimeout(() => {
            const translateY = (1 - itemProgress) * 40;
            const rotateY = direction === 'down' ? 
                (1 - itemProgress) * 15 : 
                itemProgress * -15;
            
            item.style.transform = `translateY(${translateY}px) rotateY(${rotateY}deg)`;
            item.style.opacity = itemProgress;
            item.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        }, delay * 200);
    });
    
    // Final button dramatic entrance
    if (finalButton && progress > 0.7) {
        const buttonProgress = (progress - 0.7) / 0.3;
        const buttonScale = 0.8 + buttonProgress * 0.2;
        const buttonGlow = buttonProgress * 100;
        
        finalButton.style.transform = `scale(${buttonScale})`;
        finalButton.style.boxShadow = `0 0 ${buttonGlow}px rgba(0, 212, 255, 0.6)`;
        finalButton.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
}

function animateScrollElements(direction) {
    // Update global scroll progress bar
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        
        // Change color based on section
        if (scrollPercent < 25) {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--accent-color))';
        } else if (scrollPercent < 50) {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--accent-color), var(--neon-purple))';
        } else if (scrollPercent < 75) {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--neon-purple), var(--success-color))';
        } else {
            scrollProgressBar.style.background = 'linear-gradient(90deg, var(--success-color), var(--warning-color))';
        }
    }
    
    // Animate navbar on scroll with enhanced effects
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrolled = window.scrollY > 50;
        const scrollProgress = Math.min(1, window.scrollY / 500);
        
        navbar.style.background = scrolled ? 
            `rgba(255, 255, 255, ${0.95 + scrollProgress * 0.05})` : 
            'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = `blur(${20 + scrollProgress * 10}px)`;
        navbar.style.boxShadow = scrolled ? 
            `0 2px 20px rgba(0, 0, 0, ${0.1 + scrollProgress * 0.05})` :
            'none';
        navbar.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Lead counter responsive to scroll with acceleration
    const leadCounter = document.getElementById('leadCounter');
    if (leadCounter) {
        const scrollProgress = Math.min(1, window.scrollY / 1000);
        const baseValue = 247;
        const maxIncrement = 73; // Reaches 320 at full scroll
        const counterValue = baseValue + Math.floor(scrollProgress * maxIncrement);
        
        if (direction === 'down') {
            leadCounter.textContent = counterValue;
            
            // Add flash effect when incrementing
            if (parseInt(leadCounter.textContent) !== counterValue) {
                leadCounter.style.color = '#00d4ff';
                leadCounter.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
                leadCounter.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    leadCounter.style.color = '';
                    leadCounter.style.textShadow = '';
                    leadCounter.style.transform = 'scale(1)';
                }, 200);
            }
        }
    }
    
    // Add subtle page tilt effect based on scroll direction
    const body = document.body;
    if (body) {
        const tiltAmount = direction === 'down' ? 0.2 : -0.2;
        body.style.transform = `perspective(2000px) rotateX(${tiltAmount}deg)`;
        body.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Reset tilt after scroll stops
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            body.style.transform = 'perspective(2000px) rotateX(0deg)';
        }, 100);
    }
}

// Lead counter animation
function animateLeadCounter() {
    const counter = document.getElementById('leadCounter');
    if (!counter) return;
    
    let current = 247;
    const increment = () => {
        current++;
        counter.textContent = current;
        
        // Flash effect
        counter.style.color = '#00d4ff';
        counter.style.textShadow = '0 0 20px rgba(0, 212, 255, 0.8)';
        
        setTimeout(() => {
            counter.style.color = '';
            counter.style.textShadow = '';
        }, 200);
    };
    
    // Increment every 3-8 seconds
    setInterval(increment, 3000 + Math.random() * 5000);
}

// Form validation and submission
function initializeFormValidation() {
    const form = document.getElementById('leadForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add timestamp and source info
        const submissionData = {
            ...data,
            timestamp: new Date().toISOString(),
            source: 'MWAAI Landing Page',
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct'
        };
        
        console.log('📧 Form submitted:', submissionData);
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;
        
        try {
            // Send webhook request
            await sendWebhook(submissionData);
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
            
            console.log('✅ Form processed successfully');
        } catch (error) {
            console.error('❌ Form submission error:', error);
            
            // Show error message
            showErrorModal(error.message);
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Webhook Configuration - UPDATE THIS URL WITH YOUR WEBHOOK ENDPOINT
const WEBHOOK_URL = 'https://your-webhook-url.com/webhook'; // 👈 CHANGE THIS TO YOUR WEBHOOK URL

// Send form data to webhook
async function sendWebhook(data) {
    if (!WEBHOOK_URL || WEBHOOK_URL === 'https://your-webhook-url.com/webhook') {
        throw new Error('Webhook URL not configured. Please update WEBHOOK_URL in script.js');
    }
    
    const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    return await response.json().catch(() => ({})); // Return empty object if no JSON response
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Close modal when clicking X or outside
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => modal.style.display = 'none';
        
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            modal.style.display = 'none';
        }, 10000);
    }
}

function showErrorModal(errorMessage) {
    // Create error modal if it doesn't exist
    let modal = document.getElementById('errorModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'errorModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>❌ Submission Failed</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p id="errorMessage"></p>
                    <p><strong>Please try again or contact support.</strong></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update error message
    const errorMsgElement = modal.querySelector('#errorMessage');
    if (errorMsgElement) {
        errorMsgElement.textContent = errorMessage;
    }
    
    modal.style.display = 'block';
    
    // Close modal when clicking X or outside
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Auto-close after 15 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 15000);
}

// Global Scroll Effects with Direction Awareness
function initializeScrollEffects() {
    console.log('🎬 Initializing Global Scroll Animations...');
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    let ticking = false;
    
    // All sections that should have scroll animations
    const animatedSections = [
        '.hero',
        '.results-section', 
        '.form-section',
        '.final-cta',
        '.ai-story-section'
    ];
    
    // Track scroll direction
    function updateScrollDirection() {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
    }
    
    // Calculate element visibility and progress
    function calculateElementProgress(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Element center position relative to viewport center
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Calculate progress (0 to 1) based on distance from viewport center
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        const progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        
        return {
            progress: progress,
            isVisible: rect.top < windowHeight && rect.bottom > 0,
            isActive: progress > 0.2,
            inViewport: rect.top >= 0 && rect.bottom <= windowHeight
        };
    }
    
    // Apply scroll-based animations to elements
    function applyScrollAnimations() {
        updateScrollDirection();
        
        animatedSections.forEach(sectionSelector => {
            const section = document.querySelector(sectionSelector);
            if (!section) return;
            
            const { progress, isVisible, isActive } = calculateElementProgress(section);
            
            // Apply section-specific animations
            switch(sectionSelector) {
                case '.hero':
                    animateHeroSection(section, scrollDirection, progress, isActive);
                    break;
                case '.results-section':
                    animateResultsSection(section, scrollDirection, progress, isActive);
                    break;
                case '.form-section':
                    animateFormSection(section, scrollDirection, progress, isActive);
                    break;
                case '.final-cta':
                    animateFinalCTA(section, scrollDirection, progress, isActive);
                    break;
            }
        });
        
        // Animate individual elements
        animateScrollElements(scrollDirection);
    }
    
    // Throttled scroll handler
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                applyScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Set up scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial animation state
    applyScrollAnimations();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// General animations initialization
function initializeAnimations() {
    console.log('🎨 Initializing general animations...');
    
    // Set initial states for elements that will be animated by scroll
    const elementsToAnimate = [
        '.result-card',
        '.form-container', 
        '.urgency-item',
        '.stat',
        '.hero-text',
        '.hero-visual'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            // Set initial state - elements start slightly hidden/offset
            el.style.opacity = '0.3';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
    
    // Add subtle parallax effect to background elements
    const parallaxElements = document.querySelectorAll('.ai-story-section::before');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
            const rate = scrolled * -0.5;
            el.style.transform = `translateY(${rate}px)`;
        });
    }, { passive: true });
    
    console.log('✅ General animations initialized');
}

// Utility functions
function scrollToForm() {
    const form = document.getElementById('get-started');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function triggerAICall() {
    alert('🤖 AI Demo Call activated! Our system will call you within 90 seconds.');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.error);
});

console.log('🎯 MWAAI JavaScript loaded successfully!'); 