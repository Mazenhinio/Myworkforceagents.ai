/* =============================================
   API CONFIGURATION
   ============================================= */

// CRM Configuration (GoHighLevel)
const CRM_CONFIG = {
    // GoHighLevel API Configuration
    baseUrl: 'https://rest.gohighlevel.com/v1',
    apiKey: 'your-gohighlevel-api-key', // Replace with actual API key

    // Webhook Configuration
    webhookUrl: 'https://hooks.gohighlevel.com/webhook/your-webhook-id', // Replace with actual webhook URL

    // Contact mapping
    fieldMapping: {
        firstName: 'first_name',
        lastName: 'last_name',
        email: 'email',
        phone: 'phone',
        company: 'company_name',
        transactionVolume: 'custom_transaction_volume',
        licenseNumber: 'custom_license_number',
        industry: 'custom_industry',
        businessSize: 'custom_business_size',
        goals: 'custom_ai_goals'
    }
};

// VAPI Configuration
const VAPI_CONFIG = {
    // VAPI API Configuration
    publicKey: 'your-vapi-public-key', // Replace with actual public key
    assistantId: 'your-assistant-id', // Replace with actual assistant ID
    baseUrl: 'https://api.vapi.ai',

    // Voice settings
    voice: {
        provider: '11labs', // or 'azure', 'openai'
        voiceId: 'default-voice-id',
        model: 'eleven_monolingual_v1'
    },

    // Transcriber settings
    transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US'
    },

    // Model settings
    model: {
        provider: 'openai',
        model: 'gpt-4',
        temperature: 0.7,
        systemMessage: `You are MWA.AI's virtual assistant. You help real estate professionals learn about AI automation solutions.

Key points to cover:
- AI workforce solutions for real estate
- Lead generation and qualification automation
- Client communication management
- Transaction coordination
- Marketing and listing optimization
- ROI and time savings

Be helpful, professional, and focus on how AI can transform their business.`
    },

    // Call settings
    maxDuration: 600, // 10 minutes
    firstMessage: "Hello! I'm MWA.AI's virtual assistant. How can I help you learn about our AI workforce solutions today?"
};

// Email Configuration (for fallback)
const EMAIL_CONFIG = {
    serviceUrl: 'https://api.emailjs.com/api/v1.0/email/send',
    serviceId: 'your-emailjs-service-id',
    templateId: 'your-emailjs-template-id',
    publicKey: 'your-emailjs-public-key',

    // Email templates
    templates: {
        contact: 'contact-form-template',
        consultation: 'consultation-request-template',
        error: 'error-notification-template'
    }
};

// Analytics Configuration
const ANALYTICS_CONFIG = {
    // Google Analytics
    gaTrackingId: 'GA_MEASUREMENT_ID',

    // Custom events
    events: {
        cardSelection: 'card_selected',
        formStep: 'form_step_completed',
        formSubmit: 'form_submitted',
        voiceStart: 'voice_session_started',
        voiceEnd: 'voice_session_ended',
        chatMessage: 'chat_message_sent'
    },

    // User journey tracking
    journey: {
        startTime: null,
        steps: [],
        completion: false
    }
};

/* =============================================
   CRM INTEGRATION FUNCTIONS
   ============================================= */

// Submit form data to GoHighLevel CRM
async function submitToCRM(formData) {
    console.log('📤 Submitting to CRM:', formData);

    try {
        const contactData = mapFormDataToCRM(formData);

        const response = await fetch(`${CRM_CONFIG.baseUrl}/contacts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CRM_CONFIG.apiKey}`
            },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) {
            throw new Error(`CRM submission failed: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ CRM submission successful:', result);

        return {
            success: true,
            contactId: result.contact.id,
            data: result
        };

    } catch (error) {
        console.error('❌ CRM submission error:', error);

        // Fallback to email
        await submitToEmail(formData, 'CRM submission failed');

        return {
            success: false,
            error: error.message
        };
    }
}

// Map form data to CRM format
function mapFormDataToCRM(formData) {
    const contact = {
        first_name: formData.contact?.name?.split(' ')[0] || '',
        last_name: formData.contact?.name?.split(' ').slice(1).join(' ') || '',
        email: formData.contact?.email || '',
        phone: formData.contact?.phone || '',
        company_name: formData.contact?.brokerage || '',
        customFields: []
    };

    // Add custom fields
    if (formData.industry) {
        contact.customFields.push({
            id: CRM_CONFIG.fieldMapping.industry,
            value: formData.industry
        });
    }

    if (formData.businessSize) {
        contact.customFields.push({
            id: CRM_CONFIG.fieldMapping.businessSize,
            value: formData.businessSize
        });
    }

    if (formData.contact?.volume) {
        contact.customFields.push({
            id: CRM_CONFIG.fieldMapping.transactionVolume,
            value: formData.contact.volume
        });
    }

    if (formData.contact?.license) {
        contact.customFields.push({
            id: CRM_CONFIG.fieldMapping.licenseNumber,
            value: formData.contact.license
        });
    }

    if (formData.goals && formData.goals.length > 0) {
        contact.customFields.push({
            id: CRM_CONFIG.fieldMapping.goals,
            value: formData.goals.join(', ')
        });
    }

    return contact;
}

// Send webhook to GoHighLevel
async function sendCRMWebhook(formData, eventType = 'form_submission') {
    console.log('📡 Sending CRM webhook:', eventType);

    try {
        const webhookData = {
            event: eventType,
            timestamp: new Date().toISOString(),
            data: formData,
            source: 'MWA.AI Website'
        };

        const response = await fetch(CRM_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webhookData)
        });

        if (!response.ok) {
            throw new Error(`Webhook failed: ${response.status}`);
        }

        console.log('✅ Webhook sent successfully');
        return { success: true };

    } catch (error) {
        console.error('❌ Webhook error:', error);
        return { success: false, error: error.message };
    }
}

/* =============================================
   EMAIL FALLBACK FUNCTIONS
   ============================================= */

// Submit form data via email (fallback)
async function submitToEmail(formData, reason = 'Primary submission failed') {
    console.log('📧 Sending email fallback:', reason);

    try {
        const emailData = {
            service_id: EMAIL_CONFIG.serviceId,
            template_id: EMAIL_CONFIG.templates.contact,
            user_id: EMAIL_CONFIG.publicKey,
            template_params: {
                to_email: 'contact@myworkforceagents.ai',
                from_name: formData.contact?.name || 'Website Visitor',
                from_email: formData.contact?.email || 'noreply@mwa.ai',
                subject: 'New AI Consultation Request',
                message: formatEmailMessage(formData),
                reason: reason
            }
        };

        const response = await fetch(EMAIL_CONFIG.serviceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            throw new Error(`Email submission failed: ${response.status}`);
        }

        console.log('✅ Email fallback successful');
        return { success: true };

    } catch (error) {
        console.error('❌ Email fallback error:', error);
        return { success: false, error: error.message };
    }
}

// Format email message
function formatEmailMessage(formData) {
    return `
New AI Consultation Request

Contact Information:
- Name: ${formData.contact?.name || 'Not provided'}
- Email: ${formData.contact?.email || 'Not provided'}
- Phone: ${formData.contact?.phone || 'Not provided'}
- Company/Brokerage: ${formData.contact?.brokerage || 'Not provided'}
- License Number: ${formData.contact?.license || 'Not provided'}
- Transaction Volume: ${formData.contact?.volume || 'Not provided'}

Business Information:
- Industry: ${formData.industry || 'Not provided'}
- Business Size: ${formData.businessSize || 'Not provided'}

AI Goals: ${formData.goals?.length > 0 ? formData.goals.join(', ') : 'Not specified'}

Submitted: ${new Date().toLocaleString()}
    `.trim();
}

/* =============================================
   ANALYTICS FUNCTIONS
   ============================================= */

// Track user events
function trackEvent(eventName, parameters = {}) {
    console.log('📊 Tracking event:', eventName, parameters);

    // Google Analytics tracking
    if (window.gtag && ANALYTICS_CONFIG.gaTrackingId) {
        window.gtag('event', eventName, {
            ...parameters,
            timestamp: new Date().toISOString()
        });
    }

    // Custom analytics
    const eventData = {
        event: eventName,
        parameters,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
    };

    // Store in local analytics (could be sent to your analytics endpoint)
    storeAnalyticsEvent(eventData);
}

// Start journey tracking
function startJourneyTracking() {
    ANALYTICS_CONFIG.journey.startTime = new Date();
    ANALYTICS_CONFIG.journey.steps = [];
    ANALYTICS_CONFIG.journey.completion = false;

    console.log('🚀 Journey tracking started');
}

// Track journey step
function trackJourneyStep(stepName, stepData = {}) {
    if (!ANALYTICS_CONFIG.journey.startTime) {
        startJourneyTracking();
    }

    const step = {
        name: stepName,
        timestamp: new Date(),
        data: stepData
    };

    ANALYTICS_CONFIG.journey.steps.push(step);

    trackEvent('journey_step', {
        step_name: stepName,
        step_number: ANALYTICS_CONFIG.journey.steps.length,
        ...stepData
    });

    console.log('📍 Journey step tracked:', stepName);
}

// Complete journey tracking
function completeJourneyTracking(finalData = {}) {
    if (!ANALYTICS_CONFIG.journey.startTime) return;

    const duration = new Date() - ANALYTICS_CONFIG.journey.startTime;
    ANALYTICS_CONFIG.journey.completion = true;

    trackEvent('journey_completed', {
        duration_ms: duration,
        steps_count: ANALYTICS_CONFIG.journey.steps.length,
        ...finalData
    });

    console.log('✅ Journey completed:', {
        duration: Math.round(duration / 1000) + 's',
        steps: ANALYTICS_CONFIG.journey.steps.length
    });
}

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */

// Generate session ID
function getSessionId() {
    let sessionId = localStorage.getItem('mwa_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('mwa_session_id', sessionId);
    }
    return sessionId;
}

// Store analytics event (local storage for demo)
function storeAnalyticsEvent(eventData) {
    try {
        const events = JSON.parse(localStorage.getItem('mwa_analytics') || '[]');
        events.push(eventData);

        // Keep only last 100 events
        if (events.length > 100) {
            events.shift();
        }

        localStorage.setItem('mwa_analytics', JSON.stringify(events));
    } catch (error) {
        console.error('❌ Failed to store analytics event:', error);
    }
}

// Get stored analytics events
function getAnalyticsEvents() {
    try {
        return JSON.parse(localStorage.getItem('mwa_analytics') || '[]');
    } catch (error) {
        console.error('❌ Failed to get analytics events:', error);
        return [];
    }
}

// Clear analytics data
function clearAnalyticsData() {
    localStorage.removeItem('mwa_session_id');
    localStorage.removeItem('mwa_analytics');
    console.log('🧹 Analytics data cleared');
}

// Export functions for global use
window.submitToCRM = submitToCRM;
window.sendCRMWebhook = sendCRMWebhook;
window.submitToEmail = submitToEmail;
window.trackEvent = trackEvent;
window.startJourneyTracking = startJourneyTracking;
window.trackJourneyStep = trackJourneyStep;
window.completeJourneyTracking = completeJourneyTracking;
window.clearAnalyticsData = clearAnalyticsData;
