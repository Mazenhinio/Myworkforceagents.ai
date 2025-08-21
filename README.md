# My Workforce Agents

A modern landing page showcasing AI workforce automation solutions for real estate professionals.

## What it does

This website demonstrates three different ways potential clients can interact with our AI systems:
- **Click Interface**: Traditional form-based interaction
- **Chat Interface**: Text-based conversation with AI
- **Voice Interface**: Voice AI conversation (currently disabled)

The goal is to capture leads and showcase our AI capabilities to real estate professionals looking to automate their workflows.

## Running the project

```bash
# Start a local server
npm run dev

# Or use Python if you prefer
python -m http.server 8000
```

Then open your browser to `http://localhost:8000`

## Files

- `index.html` - The main webpage
- `script.js` - All the interactive functionality
- `styles.css` - All the styling
- `package.json` - Project configuration

## Key features

- **Chat Integration**: Connected to N8N webhooks for live AI conversations
- **Lead Capture**: Multi-step forms that collect prospect information
- **Mobile Friendly**: Works on phones and tablets
- **Real Estate Focus**: Specifically designed for real estate automation use cases

## Configuration

The N8N webhook URL is configured in `script.js`. Update the `N8N_CONFIG` object to point to your webhook endpoint.

## Browser compatibility

Works in all modern browsers. Some features require user interaction to start (like audio features in Safari).

## Deployment

This is a static website that can be deployed anywhere:
- Netlify (recommended)
- Vercel
- GitHub Pages
- Any web hosting service

Just upload the files and you're done.