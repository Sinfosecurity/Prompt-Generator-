# Deployment Guide - PromptFoundry

## Hosting Options

Since PromptFoundry is a pure static site (HTML/CSS/JS only), it can be hosted for **FREE** on multiple platforms.

---

## Option 1: GitHub Pages (Recommended)

**Best for:** Developers familiar with Git
**Cost:** Free
**Setup time:** 5 minutes

### Steps:

1. **Create GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/promptfoundry.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "Pages"
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Click "Save"

3. **Access your site**
   - URL: `https://YOUR_USERNAME.github.io/promptfoundry`
   - Takes 2-5 minutes to deploy

---

## Option 2: Netlify

**Best for:** Non-developers, fastest deployment
**Cost:** Free
**Setup time:** 2 minutes

### Steps:

1. **Create account** at [netlify.com](https://netlify.com)

2. **Deploy via drag-and-drop**
   - Click "Add new site" → "Deploy manually"
   - Drag the entire "Prompt Generator" folder onto the page
   - Wait 30 seconds
   - Your site is live!

3. **Access your site**
   - You'll get a URL like: `random-name-123.netlify.app`
   - Can customize to: `your-name.netlify.app`

---

## Option 3: Vercel

**Best for:** Developers, great performance
**Cost:** Free
**Setup time:** 3 minutes

### Steps:

1. **Create account** at [vercel.com](https://vercel.com)

2. **Deploy**
   - Click "Add New Project"
   - Import from Git or drag folder
   - Click "Deploy"
   - Done!

3. **Access your site**
   - URL: `promptfoundry.vercel.app`
   - Can add custom domain

---

## Option 4: Cloudflare Pages

**Best for:** Best performance, CDN included
**Cost:** Free
**Setup time:** 5 minutes

### Steps:

1. **Create account** at [pages.cloudflare.com](https://pages.cloudflare.com)

2. **Connect GitHub** or upload directly

3. **Deploy**
   - Build command: (leave empty)
   - Output directory: (leave empty)
   - Click "Save and Deploy"

4. **Access your site**
   - URL: `promptfoundry.pages.dev`

---

## Option 5: Surge.sh

**Best for:** CLI users, instant deployment
**Cost:** Free
**Setup time:** 1 minute

### Steps:

1. **Install Surge**
   ```bash
   npm install -g surge
   ```

2. **Deploy**
   ```bash
   cd /Users/tahirah-macmini/Documents/Prompt\ Generator
   surge
   ```

3. **Follow prompts**
   - Email: (enter yours)
   - Password: (create one)
   - Domain: `promptfoundry.surge.sh` (or custom)

4. **Done!**
   - Your site is instantly live

---

## Custom Domain Setup

Want to use your own domain (e.g., `promptfoundry.com`)?

### For Netlify:
1. Buy domain (Namecheap, Google Domains, etc.)
2. Netlify → Domain Settings → Add custom domain
3. Update DNS records as shown
4. Wait 24-48 hours for propagation

### For Vercel:
1. Vercel → Settings → Domains
2. Add your domain
3. Configure DNS (A record or CNAME)
4. SSL automatically enabled

### For GitHub Pages:
1. Settings → Pages → Custom domain
2. Add CNAME file with your domain
3. Configure DNS at your registrar
4. Enable "Enforce HTTPS"

---

## Performance Optimization

Before deploying, you can optionally optimize:

### 1. Minify CSS
```bash
# Install cssnano
npm install -g cssnano-cli

# Minify
cssnano styles.css styles.min.css

# Update index.html to use styles.min.css
```

### 2. Minify JavaScript
```bash
# Install terser
npm install -g terser

# Minify
terser script.js -o script.min.js

# Update index.html to use script.min.js
```

### 3. Add Favicon
Create or download a `favicon.ico` and place it in the root folder.

Add to `<head>` in index.html:
```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

---

## Analytics (Optional)

Want to track visitors? Add privacy-friendly analytics:

### Plausible Analytics (Privacy-friendly)
```html
<!-- Add before </head> in index.html -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Simple Analytics (Privacy-friendly)
```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

---

## SEO Optimization

Add these to `<head>` in index.html:

```html
<!-- Primary Meta Tags -->
<meta name="title" content="PromptFoundry - AI Prompt Architect">
<meta name="description" content="Turn ideas into AI-ready prompts. Generate precise, structured prompts for building web apps with Cursor, Antigravity, v0, and more.">
<meta name="keywords" content="AI prompt generator, Cursor, Antigravity, v0, web app builder, prompt engineering">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="PromptFoundry - AI Prompt Architect">
<meta property="og:description" content="Turn ideas into AI-ready prompts">
<meta property="og:image" content="https://yourdomain.com/preview.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:title" content="PromptFoundry - AI Prompt Architect">
<meta property="twitter:description" content="Turn ideas into AI-ready prompts">
<meta property="twitter:image" content="https://yourdomain.com/preview.png">
```

---

## SSL/HTTPS

All recommended hosting platforms provide **FREE SSL certificates automatically**:
- ✅ Netlify: Auto SSL via Let's Encrypt
- ✅ Vercel: Auto SSL
- ✅ Cloudflare Pages: Auto SSL
- ✅ GitHub Pages: Auto SSL
- ✅ Surge: Auto SSL

You don't need to do anything!

---

## Maintenance

### Updates
1. Edit files locally
2. Test in browser
3. Redeploy:
   - **Netlify/Vercel/Cloudflare**: Git push or drag-drop
   - **Surge**: Run `surge` again
   - **GitHub Pages**: Git push

### Backups
- Git repositories are automatically backed up
- Download backups from your hosting dashboard
- Keep local copies always

---

## Cost Comparison

| Platform | Free Tier | Bandwidth | Custom Domain | SSL |
|----------|-----------|-----------|---------------|-----|
| GitHub Pages | Unlimited | 100 GB/month | ✅ | ✅ |
| Netlify | Unlimited sites | 100 GB/month | ✅ | ✅ |
| Vercel | Unlimited | 100 GB/month | ✅ | ✅ |
| Cloudflare | Unlimited | Unlimited | ✅ | ✅ |
| Surge | 1 project | Unlimited | ✅ ($30/mo) | ✅ |

**Recommendation:** Start with **Netlify** (easiest) or **Cloudflare Pages** (fastest).

---

## Quick Deploy Commands

### Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Cloudflare Wrangler
```bash
npm install -g wrangler
wrangler pages publish .
```

---

## Monitoring Uptime

Free uptime monitoring:
- [UptimeRobot](https://uptimerobot.com) - 50 monitors free
- [Pingdom](https://pingdom.com) - 1 monitor free
- [StatusCake](https://statuscake.com) - 10 monitors free

---

## Need Help?

- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)
- **Cloudflare**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)

---

**PromptFoundry** is ready to deploy. Choose your platform and go live in minutes!
