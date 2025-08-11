# N8N Chat Integration Guide for MWA.AI Landing Page

## 🎯 Overview

This guide shows you how to set up an N8N workflow to power the Text AI agent in your MWA.AI landing page. The integration replaces the simulated chat responses with real AI-powered conversations.

---

## 🛠️ Step 1: N8N Workflow Setup

### Required Nodes in Your N8N Workflow:

1. **Webhook** (Trigger)
2. **OpenAI** or **Anthropic** (AI Response)
3. **Code** (Response Processing)
4. **Respond to Webhook** (Return Response)

### Basic Workflow Structure:
```
Webhook → AI Node → Code Node → Respond to Webhook
```

---

## 📝 Step 2: Configure the Webhook Node

### Webhook Settings:
```json
{
  "httpMethod": "POST",
  "path": "mwa-ai-chat",
  "responseMode": "responseNode",
  "options": {
    "allowedOrigins": "*"
  }
}
```

### Expected Payload Structure:
```json
{
  "message": "User's message text",
  "sessionId": "mwa-ai-1234567890-abc123",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "userAgent": "Browser info",
  "referrer": "Page referrer",
  "chatContext": [
    {
      "role": "user",
      "content": "Previous message",
      "timestamp": "2024-01-01T11:59:00.000Z"
    }
  ]
}
```

---

## 🤖 Step 3: Configure AI Node (OpenAI Example)

### OpenAI Chat Model Settings:
```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "maxTokens": 500,
  "messages": [
    {
      "role": "system",
      "content": "You are a professional AI assistant for MWA.AI, a company that provides AI automation solutions for real estate professionals. You help potential clients understand how AI can transform their business, focusing on lead response automation, customer service, and workflow optimization. Be helpful, professional, and focus on the value of AI automation for real estate businesses. Keep responses concise but informative."
    }
  ]
}
```

### Dynamic Message Construction (Code Node):
```javascript
// Add conversation context
const chatContext = $json.chatContext || [];
const userMessage = $json.message;

// Build conversation history
const messages = [
  {
    role: "system",
    content: "You are a professional AI assistant for MWA.AI, a company that provides AI automation solutions for real estate professionals. You help potential clients understand how AI can transform their business, focusing on lead response automation, customer service, and workflow optimization. Be helpful, professional, and focus on the value of AI automation for real estate businesses. Keep responses concise but informative."
  }
];

// Add recent context (last 5 messages)
chatContext.forEach(msg => {
  messages.push({
    role: msg.role,
    content: msg.content
  });
});

// Add current user message
messages.push({
  role: "user",
  content: userMessage
});

return {
  messages: messages,
  sessionId: $json.sessionId,
  userMessage: userMessage
};
```

---

## 🔄 Step 4: Response Processing Node

### Code Node for Response Formatting:
```javascript
// Get AI response
const aiResponse = $node["OpenAI Chat Model"].json.choices[0].message.content;
const sessionId = $json.sessionId;

// Format response for landing page
const response = {
  message: aiResponse,
  sessionId: sessionId,
  timestamp: new Date().toISOString(),
  context: {
    lastResponse: aiResponse,
    messageCount: ($json.chatContext?.length || 0) + 1
  }
};

return response;
```

---

## 📤 Step 5: Configure Response Node

### Respond to Webhook Settings:
```json
{
  "respondWith": "json",
  "responseData": "{{ $json }}"
}
```

---

## 🔧 Step 6: Update Your Landing Page Configuration

### Update the webhook URL in `script.js`:
```javascript
const N8N_CONFIG = {
    webhookUrl: 'https://your-n8n-instance.com/webhook/mwa-ai-chat',
    timeout: 10000,
    retryAttempts: 2
};
```

**Replace `your-n8n-instance.com` with your actual N8N URL.**

---

## 🚀 Advanced N8N Workflow Features

### 1. **Lead Qualification Enhancement**
Add a Code Node to detect lead intent:
```javascript
const userMessage = $json.message.toLowerCase();
const leadSignals = [
  'pricing', 'cost', 'price', 'quote',
  'demo', 'trial', 'test',
  'contact', 'call', 'meeting',
  'interested', 'want to know more'
];

const isQualifiedLead = leadSignals.some(signal => 
  userMessage.includes(signal)
);

return {
  ...($json),
  leadScore: isQualifiedLead ? 'high' : 'low',
  leadSignals: leadSignals.filter(signal => 
    userMessage.includes(signal)
  )
};
```

### 2. **CRM Integration**
Add nodes to automatically create leads:
```
Webhook → AI Response → Lead Detection → HubSpot/Salesforce → Response
```

### 3. **Email Follow-up**
Trigger email sequences for qualified leads:
```javascript
// In Code Node
if ($json.leadScore === 'high') {
  return {
    ...($json),
    triggerEmail: true,
    emailTemplate: 'qualified-lead'
  };
}
```

### 4. **Analytics Tracking**
Add Google Analytics or custom tracking:
```javascript
// Track conversation metrics
const analytics = {
  sessionId: $json.sessionId,
  messageCount: $json.context.messageCount,
  leadScore: $json.leadScore,
  timestamp: new Date().toISOString(),
  source: 'landing-page-chat'
};

// Send to analytics endpoint
return analytics;
```

---

## 🛡️ Security & Best Practices

### 1. **Rate Limiting**
Add rate limiting to prevent abuse:
```javascript
// In Code Node
const sessionId = $json.sessionId;
const rateLimitKey = `rate_limit_${sessionId}`;

// Check rate limit (implement with Redis or similar)
const messageCount = await checkRateLimit(rateLimitKey);
if (messageCount > 10) {
  throw new Error('Rate limit exceeded');
}
```

### 2. **Input Validation**
Validate incoming messages:
```javascript
const message = $json.message;

// Basic validation
if (!message || message.length > 1000) {
  throw new Error('Invalid message');
}

// Content filtering (optional)
const prohibitedWords = ['spam', 'test123'];
if (prohibitedWords.some(word => message.toLowerCase().includes(word))) {
  throw new Error('Message contains prohibited content');
}
```

### 3. **Error Handling**
Implement comprehensive error handling:
```javascript
try {
  // AI processing logic
  const response = await processMessage($json.message);
  return response;
} catch (error) {
  return {
    message: "I apologize, but I'm experiencing a technical issue. Please try again or contact our team directly.",
    error: true,
    timestamp: new Date().toISOString()
  };
}
```

---

## 📊 Monitoring & Analytics

### Workflow Metrics to Track:
- **Response Time**: Average time from webhook to response
- **Success Rate**: Percentage of successful AI responses
- **Lead Quality**: Qualified vs unqualified conversations
- **User Engagement**: Messages per session
- **Error Rate**: Failed webhook calls

### N8N Monitoring Setup:
1. Enable workflow execution data retention
2. Set up error notifications
3. Create execution time dashboards
4. Monitor API usage (OpenAI tokens)

---

## 🔄 Testing Your Integration

### 1. **Local Testing**
```bash
# Test webhook directly
curl -X POST https://your-n8n-instance.com/webhook/mwa-ai-chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, I need help with AI automation",
    "sessionId": "test-session-123",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "chatContext": []
  }'
```

### 2. **Landing Page Testing**
1. Open your landing page
2. Select "Type" experience
3. Send test messages
4. Check N8N execution log
5. Verify responses appear correctly

### 3. **Error Testing**
1. Temporarily break the webhook URL
2. Verify fallback responses work
3. Check error indicators display
4. Restore webhook and test recovery

---

## 🚀 Deployment Checklist

- [ ] N8N workflow tested and working
- [ ] Webhook URL updated in landing page
- [ ] AI model configured with proper context
- [ ] Error handling tested
- [ ] Rate limiting implemented
- [ ] Analytics tracking set up
- [ ] Security measures in place
- [ ] Monitoring alerts configured

---

## 🔧 Troubleshooting Common Issues

### Issue: Webhook not receiving data
**Solution**: Check CORS settings and webhook path

### Issue: AI responses are inconsistent
**Solution**: Improve system prompt and add more context

### Issue: Slow response times
**Solution**: Optimize AI model settings and add caching

### Issue: High error rates
**Solution**: Implement retry logic and better error handling

---

## 📞 Next Steps

1. **Set up your N8N workflow** using the provided configuration
2. **Update the webhook URL** in your landing page
3. **Test thoroughly** with various message types
4. **Monitor performance** and adjust AI prompts as needed
5. **Scale up** with additional features like CRM integration

Your Text AI agent will now be powered by a sophisticated N8N workflow that can handle real conversations, qualify leads, and integrate with your business systems!