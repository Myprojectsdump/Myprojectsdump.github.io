import os

html_content = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>
body {
  background: #07040C;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Cinzel', serif;
}
.ambient-glow {
  position: absolute;
  width: 700px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 184, 56, 0.12) 0%, rgba(180, 83, 9, 0.04) 50%, transparent 75%);
  pointer-events: none;
}
</style>
</head>
<body>
<div class="ambient-glow"></div>

<svg width="960" height="520" viewBox="0 0 960 520" style="overflow: visible;">
  <defs>
    <!-- 1. Warm Champagne-Gold Luxury Gradient matching Image 1 -->
    <linearGradient id="luxuryGoldGrad" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="18%" stop-color="#FFF2B2" />
      <stop offset="45%" stop-color="#FCD34D" />
      <stop offset="70%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <!-- 2. Heart Starlight Ribbon Gradient -->
    <linearGradient id="heartRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="25%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="80%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#FFFDF7" />
    </linearGradient>

    <!-- 3. Crystal Gemstone Ruby-Amber Gradient -->
    <radialGradient id="crystalGemGrad" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="20%" stop-color="#FEF08A" />
      <stop offset="45%" stop-color="#F59E0B" />
      <stop offset="75%" stop-color="#E11D48" />
      <stop offset="100%" stop-color="#881337" />
    </radialGradient>

    <!-- 4. Multi-Layer Incandescent Gold Bloom Filter -->
    <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur1" />
      <feGaussianBlur stdDeviation="9" result="blur2" />
      <feGaussianBlur stdDeviation="24" result="blur3" />
      <feMerge>
        <feMergeNode in="blur3" />
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- 5. Subtle Soft Drop Shadow -->
    <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.9" />
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#F59E0B" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- ───────────────────────────────────────────────────────────── -->
  <!-- A. TOP EYEBROW: THE GRAVITY OF UCI                            -->
  <!-- ───────────────────────────────────────────────────────────── -->
  <g transform="translate(480, 50)" text-anchor="middle">
    <text font-family="'Cinzel', serif" font-size="12" font-weight="600" letter-spacing="0.38em" fill="#D9B77B" opacity="0.9">
      ⋆ &nbsp; ☾ &nbsp; ⋆ &nbsp; THE GRAVITY OF UCI &nbsp; ⋆ &nbsp; ☽ &nbsp; ⋆
    </text>
  </g>

  <!-- ───────────────────────────────────────────────────────────── -->
  <!-- B. CELESTIAL BACKGROUND PERSPECTIVE ORBIT (Saturn Ring)       -->
  <!-- ───────────────────────────────────────────────────────────── -->
  <path
    d="M 120 290 C 200 170, 760 170, 840 290 C 760 410, 200 410, 120 290"
    fill="none"
    stroke="url(#luxuryGoldGrad)"
    stroke-width="1.6"
    stroke-dasharray="6 4"
    opacity="0.45"
  />

  <!-- ───────────────────────────────────────────────────────────── -->
  <!-- C. GRAND CELESTIAL HEART RIBBON (Encloses the words)          -->
  <!-- ───────────────────────────────────────────────────────────── -->
  <!-- Outer Soft Halo -->
  <path
    d="M 480 435 C 415 375, 185 275, 185 155 C 185 75, 290 55, 400 98 C 450 118, 475 148, 480 168 C 485 148, 510 118, 560 98 C 670 55, 775 75, 775 155 C 775 275, 545 375, 480 435 Z"
    fill="none"
    stroke="url(#heartRibbonGrad)"
    stroke-width="5"
    opacity="0.35"
    filter="url(#goldGlow)"
  />
  <!-- Sharp Golden Core -->
  <path
    d="M 480 435 C 415 375, 185 275, 185 155 C 185 75, 290 55, 400 98 C 450 118, 475 148, 480 168 C 485 148, 510 118, 560 98 C 670 55, 775 75, 775 155 C 775 275, 545 375, 480 435 Z"
    fill="none"
    stroke="url(#luxuryGoldGrad)"
    stroke-width="2.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    filter="url(#goldGlow)"
  />

  <!-- ───────────────────────────────────────────────────────────── -->
  <!-- D. MASTER CALLIGRAPHIC TYPOGRAPHY: I LOVE YOU, UCI            -->
  <!-- ───────────────────────────────────────────────────────────── -->
  <g filter="url(#textShadow)">
    <!-- Line 1: 'I Love You,' -->
    <text
      x="480"
      y="215"
      text-anchor="middle"
      font-family="'Great Vibes', cursive"
      font-size="108"
      fill="url(#luxuryGoldGrad)"
      filter="url(#goldGlow)"
      letter-spacing="0.02em"
    >
      I Love You,
    </text>

    <!-- Line 2: 'Uci' Personal Signature with Star on 'i' -->
    <text
      x="490"
      y="325"
      text-anchor="middle"
      font-family="'Great Vibes', cursive"
      font-size="124"
      fill="url(#luxuryGoldGrad)"
      filter="url(#goldGlow)"
      letter-spacing="0.04em"
    >
      Uci
    </text>

    <!-- Luminous Star Accent ✦ on the 'i' of 'Uci' -->
    <g transform="translate(562, 260)">
      <circle cx="0" cy="0" r="12" fill="#FDE68A" opacity="0.4" filter="url(#goldGlow)" />
      <path
        d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
        fill="#FFFFFF"
        stroke="#FDE68A"
        stroke-width="0.8"
      />
    </g>
  </g>

  <!-- ───────────────────────────────────────────────────────────── -->
  <!-- E. LUMINOUS FACETED CRYSTAL HEART JEWEL AT BOTTOM VERTEX      -->
  <!-- ───────────────────────────────────────────────────────────── -->
  <g transform="translate(480, 435)">
    <!-- Golden Flare Glow -->
    <circle cx="0" cy="0" r="24" fill="#FDE047" opacity="0.3" filter="url(#goldGlow)" />
    <!-- 4-point golden light rays -->
    <line x1="-32" y1="0" x2="32" y2="0" stroke="#FFF" stroke-width="0.9" opacity="0.85" />
    <line x1="0" y1="-32" x2="0" y2="32" stroke="#FFF" stroke-width="0.9" opacity="0.85" />
    <line x1="-16" y1="-16" x2="16" y2="16" stroke="#FDE68A" stroke-width="0.6" opacity="0.6" />
    <line x1="-16" y1="16" x2="16" y2="-16" stroke="#FDE68A" stroke-width="0.6" opacity="0.6" />
    <!-- Heart Facet Body -->
    <path
      d="M 0 16 C -12 6, -20 -4, -20 -12 C -20 -20, -10 -24, 0 -18 C 10 -24, 20 -20, 20 -12 C 20 -4, 12 6, 0 16 Z"
      fill="url(#crystalGemGrad)"
      stroke="#FFFDF7"
      stroke-width="1.5"
      filter="url(#goldGlow)"
    />
    <!-- Diamond Facet Cut Lines -->
    <path
      d="M 0 -18 L 0 8 M -10 -8 L 0 0 L 10 -8 M -16 -12 L 0 -18 L 16 -12 M -10 -8 L 0 16 L 10 -8"
      stroke="#FFFFFF"
      stroke-width="0.9"
      opacity="0.9"
      fill="none"
    />
  </g>

  <!-- ───────────────────────────────────────────────────────────── -->
  <!-- F. SUPPORTING SUBTITLE: TODAY. TOMORROW. ALWAYS.              -->
  <!-- ───────────────────────────────────────────────────────────── -->
  <g transform="translate(480, 485)" text-anchor="middle">
    <text font-family="'Cinzel', serif" font-size="12" font-weight="600" letter-spacing="0.32em" fill="#F8E6A0" opacity="0.9">
      TODAY. TOMORROW. ALWAYS.
    </text>
    <!-- Delicate Golden Flourish ── ʚ♡ɞ ── -->
    <path
      d="M -60 14 L -20 14 M 20 14 L 60 14"
      stroke="#D9B77B"
      stroke-width="0.8"
      opacity="0.6"
    />
    <!-- Small Winged Heart -->
    <path
      d="M 0 18 C -3 15, -6 13, -6 10 C -6 7, -3 6, 0 8 C 3 6, 6 7, 6 10 C 6 13, 3 15, 0 18 Z"
      fill="#F43F5E"
      stroke="#FDE68A"
      stroke-width="0.6"
    />
    <path
      d="M -6 10 C -10 8, -14 10, -16 12 M 6 10 C 10 8, 14 10, 16 12"
      stroke="#D9B77B"
      stroke-width="0.8"
      fill="none"
      opacity="0.8"
    />
  </g>
</svg>
</body>
</html>"""

with open('scratch/test_full_declaration.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("Wrote scratch/test_full_declaration.html")
