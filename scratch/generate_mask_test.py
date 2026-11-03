import os

html_content = """<!DOCTYPE html>
<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Cinzel:wght@600&display=swap" rel="stylesheet">
<style>
body {
  background: #07040C;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
</head>
<body>
<svg width="960" height="480" viewBox="0 0 960 480">
  <defs>
    <!-- Warm Golden Gradient exactly matching Image 1 -->
    <linearGradient id="luxuryGoldGrad" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="15%" stop-color="#FFF5C2" />
      <stop offset="45%" stop-color="#FCD34D" />
      <stop offset="75%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>

    <!-- Multi-stage cinematic bloom filter -->
    <filter id="goldBloom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="glow1" />
      <feGaussianBlur stdDeviation="8" result="glow2" />
      <feGaussianBlur stdDeviation="20" result="glow3" />
      <feMerge>
        <feMergeNode in="glow3" />
        <feMergeNode in="glow2" />
        <feMergeNode in="glow1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- The handwriting reveal mask -->
    <mask id="writeMask">
      <rect width="100%" height="100%" fill="black" />
      <!-- Stroke for line 1: 'I Love You,' -->
      <path id="maskLine1"
        d="M 230 190 Q 255 130 280 190 Q 320 220 370 170 Q 430 150 490 190 Q 550 210 610 160 Q 670 140 730 190"
        stroke="white" stroke-width="65" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <!-- Stroke for line 2: 'Uci' -->
      <path id="maskLine2"
        d="M 380 300 Q 430 240 480 300 Q 530 330 580 270 Q 610 240 640 290"
        stroke="white" stroke-width="70" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </mask>
  </defs>

  <!-- Masked Calligraphy Text -->
  <g mask="url(#writeMask)" filter="url(#goldBloom)">
    <text x="480" y="195" text-anchor="middle" font-family="'Great Vibes', 'Alex Brush', cursive" font-size="96" fill="url(#luxuryGoldGrad)">I Love You,</text>
    <text x="500" y="305" text-anchor="middle" font-family="'Great Vibes', 'Alex Brush', cursive" font-size="112" fill="url(#luxuryGoldGrad)">Uci</text>
  </g>
</svg>
</body>
</html>"""

with open('scratch/test_mask.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("Wrote scratch/test_mask.html")
