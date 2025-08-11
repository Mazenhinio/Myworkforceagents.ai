# MWAAI Landing Page Deployment Guide

## Quick Start (Recommended)

### 1. Netlify (Free, Easy Setup)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) → "New site from Git"
3. Connect GitHub repo
4. Deploy (auto-detects static site)
5. Add custom domain in site settings

### 2. Vercel (Free, Fast CDN)
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Deploy automatically
4. Add custom domain in project settings

### 3. GitHub Pages (Free with Repo)
1. Push code to GitHub
2. Go to repo Settings → Pages
3. Source: Deploy from a branch → master
4. Custom domain: Add in Pages settings

## Traditional Hosting

### Upload via FTP/SFTP
Upload these files to your web host's public folder:
- `index.html`
- `styles.css`
- `script.js`
- `package.json`
- `.gitignore`

### Required Files for Production
```
your-domain.com/
├── index.html          # Main page
├── styles.css          # All styling
├── script.js          # All functionality
└── package.json       # Project info
```

## Pre-Deployment Checklist

### 1. Configure Webhook (Important!)
Update `script.js` line 899:
```javascript
const WEBHOOK_URL = 'https://your-actual-webhook-url.com/webhook';
```

### 2. Test Locally First
```bash
npm start
# Visit http://localhost:3000
```

### 3. Check Form Functionality
- Test form submission
- Verify dropdown options are visible
- Confirm success/error modals work

### 4. SEO Optimization (Optional)
- Update meta tags in `index.html`
- Add Google Analytics if needed
- Configure social media tags

## DNS Configuration

### For Custom Domain
1. **CNAME Record**: `www` → `your-hosting-provider.com`
2. **A Record**: `@` → IP address (if provided)
3. **TTL**: 300-3600 seconds

### Popular DNS Providers
- Cloudflare (recommended)
- Google Domains
- Namecheap
- GoDaddy

## Performance Tips

### 1. Enable Compression
Most modern hosts enable gzip automatically

### 2. CDN Setup
- Cloudflare (free tier available)
- AWS CloudFront
- Netlify/Vercel include CDN

### 3. Cache Headers
Add to `.htaccess` (Apache) or server config:
```apache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

## SSL Certificate

### Automatic SSL (Recommended)
- Netlify: Auto-provisions Let's Encrypt
- Vercel: SSL included
- Cloudflare: Free SSL certificates

### Manual SSL
- Let's Encrypt (free)
- Your hosting provider's SSL

## Monitoring & Analytics

### Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Common Issues
1. **Dropdown text not visible**: Fixed in latest update
2. **Form not submitting**: Check webhook URL configuration
3. **Animations not working**: Verify all CSS/JS files load correctly
4. **Mobile display issues**: Test responsive design

### Debug Steps
1. Open browser dev tools (F12)
2. Check Console for errors
3. Verify Network tab for failed requests
4. Test form submission manually

## Support

For hosting issues:
- Check hosting provider documentation
- Verify DNS propagation (can take 24-48 hours)
- Test on different devices/browsers
- Monitor webhook endpoint for incoming data 