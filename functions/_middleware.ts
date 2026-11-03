// functions/_middleware.ts
// Cloudflare Pages Edge Authentication Middleware (OQ-05 / REQ-QPA-04 / AT-35)
// Protects both webpage routes (/*) and direct private media assets (/media/*)

interface Env {
  UCI_SHARED_PASSPHRASE?: string;
  UCI_COOKIE_HMAC_SECRET?: string;
}

const COOKIE_NAME = 'uci_edge_auth';
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

// Helper to calculate HMAC-SHA256 hex string using Web Crypto
export async function generateHmacHex(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Helper to verify HMAC-SHA256 signature
export async function verifyHmacHex(data: string, signatureHex: string, secret: string): Promise<boolean> {
  try {
    const expectedHex = await generateHmacHex(data, secret);
    // Constant-time comparison
    if (expectedHex.length !== signatureHex.length) return false;
    let match = 0;
    for (let i = 0; i < expectedHex.length; i++) {
      match |= expectedHex.charCodeAt(i) ^ signatureHex.charCodeAt(i);
    }
    return match === 0;
  } catch {
    return false;
  }
}

// Helper to parse cookies from headers
export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });
  return cookies;
}

// Generate the self-contained dark-velvet HTML gate
function renderLoginGateHtml(errorMsg?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Gravity of Uci — Private Universe</title>
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #040407;
      color: #F5EBDD;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      max-width: 440px;
      width: 100%;
      background: rgba(18, 18, 28, 0.75);
      border: 1px solid rgba(253, 230, 138, 0.35);
      border-radius: 1.5rem;
      padding: 2.5rem 2rem;
      text-align: center;
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.8), 0 0 30px rgba(253, 230, 138, 0.08);
      backdrop-filter: blur(16px);
    }
    .monogram {
      width: 4rem;
      height: 4rem;
      border-radius: 9999px;
      border: 1px solid rgba(253, 230, 138, 0.4);
      background: rgba(225, 29, 72, 0.15);
      color: #FDE68A;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.15em;
    }
    .eyebrow {
      font-size: 0.7rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #FDE68A;
      margin-bottom: 0.5rem;
      font-family: monospace;
    }
    h1 {
      font-size: 1.6rem;
      font-weight: 300;
      margin-bottom: 0.75rem;
      color: #F5EBDD;
    }
    p {
      font-size: 0.85rem;
      color: rgba(245, 235, 221, 0.75);
      line-height: 1.6;
      margin-bottom: 1.75rem;
    }
    input[type="password"] {
      width: 100%;
      padding: 0.85rem 1rem;
      border-radius: 0.75rem;
      background: rgba(4, 4, 7, 0.8);
      border: 1px solid rgba(253, 230, 138, 0.3);
      color: #F5EBDD;
      font-size: 0.95rem;
      outline: none;
      margin-bottom: 1rem;
      text-align: center;
      letter-spacing: 0.1em;
    }
    input[type="password"]:focus {
      border-color: #FDE68A;
      box-shadow: 0 0 10px rgba(253, 230, 138, 0.2);
    }
    button {
      width: 100%;
      padding: 0.85rem;
      border-radius: 9999px;
      background: #FDE68A;
      color: #040407;
      border: none;
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background: #D97706;
    }
    .error {
      color: #FDA4AF;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="monogram">U ♥ S</div>
    <div class="eyebrow">Private Birthday Film</div>
    <h1>The Gravity of Uci.</h1>
    <p>A private interactive universe created exclusively for Uci. Enter our secret passphrase to unlock.</p>
    ${errorMsg ? `<div class="error">${errorMsg}</div>` : ''}
    <form method="POST" action="/__auth">
      <input type="password" name="passphrase" placeholder="Secret Passphrase" required autofocus />
      <button type="submit">Unlock Universe</button>
    </form>
  </div>
</body>
</html>`;
}

export type PagesFunctionContext<E = Record<string, any>> = {
  request: Request;
  env: E;
  next: () => Promise<Response>;
  params?: Record<string, string | string[]>;
  data?: Record<string, any>;
};

export const onRequest = async (context: PagesFunctionContext<Env>): Promise<Response> => {
  const { request, env } = context;
  const url = new URL(request.url);

  const sharedPassphrase = env.UCI_SHARED_PASSPHRASE;
  const hmacSecret = env.UCI_COOKIE_HMAC_SECRET;

  // Fail-closed policy: if edge secrets are unconfigured in production, do not expose personal assets
  if (!sharedPassphrase || !hmacSecret) {
    if (url.pathname.startsWith('/media/')) {
      return new Response('Edge Authentication Misconfigured: Secrets Missing', {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
    // Allow dev bypass if running on localhost / test harness without env secrets
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return context.next();
    }
    return new Response(
      'Edge Authentication Required: UCI_SHARED_PASSPHRASE and UCI_COOKIE_HMAC_SECRET must be configured.',
      { status: 503 }
    );
  }

  // 1. Handle Passphrase Submission (POST /__auth)
  if (url.pathname === '/__auth' && request.method === 'POST') {
    try {
      const formData = await request.formData();
      const submittedPassphrase = formData.get('passphrase')?.toString();

      if (submittedPassphrase === sharedPassphrase) {
        // Valid passphrase: generate timestamp and HMAC
        const timestamp = Date.now().toString();
        const signature = await generateHmacHex(timestamp, hmacSecret);
        const cookieVal = `${timestamp}.${signature}`;

        const headers = new Headers();
        headers.set(
          'Set-Cookie',
          `${COOKIE_NAME}=${cookieVal}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE_SECONDS}`
        );
        headers.set('Location', url.origin + '/');
        return new Response(null, { status: 303, headers });
      } else {
        return new Response(renderLoginGateHtml('Incorrect passphrase. Please try again, cintaku.'), {
          status: 401,
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
        });
      }
    } catch {
      return new Response(renderLoginGateHtml('Error processing request. Please try again.'), {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  }

  // 2. Verify Session Cookie on All Routes
  const cookies = parseCookies(request.headers.get('Cookie'));
  const sessionToken = cookies[COOKIE_NAME];

  let isAuthenticated = false;

  if (sessionToken && sessionToken.includes('.')) {
    const [timestamp, signature] = sessionToken.split('.');
    const timeNum = parseInt(timestamp, 10);
    const now = Date.now();
    // Validate timestamp within 30 days
    if (!isNaN(timeNum) && now >= timeNum && now - timeNum < COOKIE_MAX_AGE_SECONDS * 1000) {
      isAuthenticated = await verifyHmacHex(timestamp, signature, hmacSecret);
    }
  }

  // If authenticated, permit request to pass to static files or next handler
  if (isAuthenticated) {
    return context.next();
  }

  // 3. Unauthenticated Behavior
  // Direct asset requests to /media/* are blocked immediately with 401
  if (url.pathname.startsWith('/media/')) {
    return new Response('Unauthorized: Private Media Asset Protected (OQ-05)', {
      status: 401,
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
      },
    });
  }

  // Webpage navigation returns the dark velvet unlock screen
  return new Response(renderLoginGateHtml(), {
    status: 401,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
    },
  });
};
