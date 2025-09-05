/* =============================================
   TYPE INTERFACE JAVASCRIPT
   ============================================= */

let chatMessages = [];
let isTyping = false;

// Initialize the type interface
function initializeTypeInterface() {
    console.log('🔧 Initializing Type Interface...');

    // Reset chat state
    chatMessages = [];
    isTyping = false;

    // Setup chat functionality
    setupChatInterface();
    setupSuggestions();

    // Show welcome message
    showWelcomeMessage();
}

// Setup chat interface
function setupChatInterface() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    if (chatInput && sendBtn) {
        // Enable input and send button
        chatInput.disabled = false;
        sendBtn.disabled = false;

        // Handle input events
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        sendBtn.addEventListener('click', sendMessage);
    }

    // Auto-focus input
    setTimeout(() => {
        if (chatInput) {
            chatInput.focus();
        }
    }, 500);
}

// Setup suggestion buttons
function setupSuggestions() {
    const suggestions = document.querySelectorAll('.suggestion');

    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            const message = suggestion.textContent;
            sendUserMessage(message);
        });
    });
}

// Show welcome message
function showWelcomeMessage() {
    const welcomeMessage = {
        type: 'ai',
        content: "Hello! I'm MWA.AI's virtual assistant. I'm here to help you learn about our AI-powered workforce solutions. What would you like to know?",
        timestamp: new Date()
    };

    addMessageToChat(welcomeMessage);
}

// Send message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (message && !isTyping) {
        sendUserMessage(message);
        chatInput.value = '';
    }
}

// Send user message
function sendUserMessage(message) {
    const userMessage = {
        type: 'user',
        content: message,
        timestamp: new Date()
    };

    addMessageToChat(userMessage);
    handleUserMessage(message);
}

// Add message to chat
function addMessageToChat(message) {
    chatMessages.push(message);
    renderMessage(message);

    // Scroll to bottom
    scrollToBottom();
}

// Render message in UI
function renderMessage(message) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (!chatMessagesContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.type}-message`;

    let messageClass = '';
    if (message.type === 'ai') {
        if (message.isTyping) {
            messageClass = 'typing';
        } else if (message.error) {
            messageClass = 'error';
        } else if (message.success) {
            messageClass = 'success';
        }
    }

    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="message-content ${messageClass}">
            ${message.isTyping ? getTypingIndicator() : `<p>${message.content}</p>`}
        </div>
    `;

    chatMessagesContainer.appendChild(messageElement);
}

// Get typing indicator HTML
function getTypingIndicator() {
    return `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
}

// Handle user message
function handleUserMessage(message) {
    const lowerMessage = message.toLowerCase();

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response delay
    setTimeout(() => {
        hideTypingIndicator();

        let response = getAIResponse(lowerMessage);

        const aiMessage = {
            type: 'ai',
            content: response,
            timestamp: new Date()
        };

        addMessageToChat(aiMessage);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;

    const typingMessage = {
        type: 'ai',
        content: '',
        isTyping: true,
        timestamp: new Date()
    };

    addMessageToChat(typingMessage);
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;

    // Remove typing indicator
    const typingIndicator = document.querySelector('.message.typing');
    if (typingIndicator) {
        typingIndicator.remove();
    }

    // Remove from messages array
    chatMessages = chatMessages.filter(msg => !msg.isTyping);
}

// Get AI response based on user input
function getAIResponse(message) {
    // Service inquiries
    if (message.includes('service') || message.includes('what do you do') || message.includes('offer')) {
        return "We specialize in AI-powered workforce solutions for real estate professionals. Our AI agents handle lead generation, client communication, transaction management, and more. Would you like me to explain any specific service?";
    }

    // Pricing inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('fee')) {
        return "Our pricing is customized based on your business needs and the specific AI agents you choose. Most clients see ROI within 30-60 days. Would you like to schedule a free consultation to discuss pricing for your specific situation?";
    }

    // AI/Workforce questions
    if (message.includes('ai') || message.includes('automation') || message.includes('workforce')) {
        return "Our AI workforce includes specialized agents like FINN (lead coordinator), LISA (client communications), RESE (marketing & listings), and TESSA (transaction management). Each AI agent is trained specifically for real estate workflows and can handle 24/7 operations.";
    }

    // Industry questions
    if (message.includes('industry') || message.includes('serve') || message.includes('work with')) {
        return "We primarily serve the real estate industry, including residential sales, commercial real estate, property management, and investment firms. Our solutions are tailored to each sector's unique needs and workflows.";
    }

    // Contact/Getting started
    if (message.includes('contact') || message.includes('start') || message.includes('begin') || message.includes('schedule')) {
        return "Great! To get started, you can fill out our contact form or schedule a free consultation. We'll assess your current workflows and recommend the perfect AI team for your business. Would you like me to help you get started?";
    }

    // Default responses
    const defaultResponses = [
        "That's an interesting question! Let me help you understand how our AI solutions can benefit your business. Could you tell me more about your current challenges?",
        "I'd love to help you learn more about our AI workforce solutions. What specific aspect interests you most - lead generation, client communication, or transaction management?",
        "Thanks for reaching out! Our AI agents are designed to handle the repetitive tasks that take up your valuable time. What would you like to automate first?",
        "That's a great question about AI in real estate. Our solutions have helped many professionals reclaim 20-30 hours per week. Would you like to hear some success stories?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Scroll to bottom of chat
function scrollToBottom() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (chatMessagesContainer) {
        setTimeout(() => {
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }, 100);
    }
}

// Handle suggestion clicks
function handleSuggestionClick(suggestion) {
    const message = suggestion.textContent.trim();
    sendUserMessage(message);

    // Remove clicked suggestion
    suggestion.style.opacity = '0';
    setTimeout(() => {
        suggestion.remove();
    }, 300);
}

// Add quick responses for common questions
function addQuickResponse(message, delay = 0) {
    setTimeout(() => {
        const quickMessage = {
            type: 'ai',
            content: message,
            timestamp: new Date()
        };
        addMessageToChat(quickMessage);
    }, delay);
}

// Error handling
function showErrorMessage(message) {
    const errorMessage = {
        type: 'ai',
        content: message,
        error: true,
        timestamp: new Date()
    };
    addMessageToChat(errorMessage);
}

// Success message
function showSuccessMessage(message) {
    const successMessage = {
        type: 'ai',
        content: message,
        success: true,
        timestamp: new Date()
    };
    addMessageToChat(successMessage);
}

// Chat session management
function startNewChatSession() {
    // Clear chat messages
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (chatMessagesContainer) {
        chatMessagesContainer.innerHTML = '';
    }

    // Reset messages array
    chatMessages = [];
    isTyping = false;

    // Show welcome message
    showWelcomeMessage();
}

// Export chat history (for analytics)
function getChatHistory() {
    return chatMessages.map(msg => ({
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp,
        isTyping: msg.isTyping,
        error: msg.error,
        success: msg.success
    }));
}

// Global functions for HTML onclick handlers
window.sendMessage = sendMessage;
window.handleSuggestionClick = handleSuggestionClick;
