# THE GRAVITY OF UCI — DEPLOYMENT & PRIVATE SHARING GUIDE

This document provides step-by-step instructions for deploying **THE GRAVITY OF UCI** to the cloud so Uci can experience her birthday film from her laptop anywhere in the world.

---

## 1. Cloudflare Pages Deployment (Recommended)

Cloudflare Pages provides the fastest global CDN, integrated edge functions (`functions/_middleware.ts`), free HTTPS, and military-grade privacy.

### Step 1: Push Repository to GitHub
Create a **private** repository on GitHub and push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/the-gravity-of-uci.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages
1. Log into your free [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Compute (Workers & Pages)** → **Create application** → **Pages** → **Connect to Git**.
3. Select your private `the-gravity-of-uci` repository.
4. Configure Build Settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `18` or `20` (in Environment Variables set `NODE_VERSION=20`)

### Step 3: Configure Privacy Secrets (OQ-05 / REQ-QPA-04)
In the Pages deployment settings under **Environment variables**, add two secrets for Production:
1. `UCI_SHARED_PASSPHRASE`: A memorable secret phrase only you and Uci know (e.g. your private pet name or a milestone date).
2. `UCI_COOKIE_HMAC_SECRET`: A secure 32-byte random hex string (generate via `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).

> **Privacy Guarantee:**
> If these secrets are set, Cloudflare Edge functions (`functions/_middleware.ts`) automatically lock **both** webpage routes (`/*`) and direct media assets (`/media/*`). Unauthenticated visitors see only the dark-velvet passphrase gate. Even if someone guesses the URL of a personal photo or voice note, the CDN returns `401 Unauthorized` before serving a single byte.

### Step 4: Deploy & Test
1. Click **Save and Deploy**. Cloudflare will build the site in ~45 seconds.
2. Open your production URL (`https://your-project.pages.dev`).
3. You will see the velvet entry gate: *"Private Universe for Uci — Enter Our Secret Passphrase"*.
4. Enter your passphrase and click **Unlock Universe**.
5. You are authenticated for 30 days via a secure `HttpOnly; SameSite=Lax` cookie.

---

## 2. Direct CLI Deployment (Alternative Without GitHub)

If you prefer deploying directly from your computer without connecting GitHub:
```bash
# 1. Build the production bundle
npm run build

# 2. Deploy using Wrangler CLI
npx wrangler pages deploy dist --project-name=the-gravity-of-uci
```
Then configure the two environment secrets in the Cloudflare Pages web dashboard under **Settings** → **Environment variables**.

---

## 3. Alternative: Vercel / Netlify

If deploying to Vercel or Netlify instead of Cloudflare:
- Build command: `npm run build`
- Output directory: `dist`
- If you use Vercel/Netlify, note that edge middleware can be adapted to their respective edge middleware format (`middleware.ts` for Vercel Edge).
