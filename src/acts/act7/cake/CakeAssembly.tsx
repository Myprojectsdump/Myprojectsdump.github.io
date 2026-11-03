// src/acts/act7/cake/CakeAssembly.tsx

import React, { useMemo } from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';

export const CakeAssembly: React.FC = () => {
  const currentStep = useExperienceStore((state) => state.cakeAssemblyStep);
  const cakeBaseType = useExperienceStore((state) => state.cakeBaseType);
  const isExtinguished = useExperienceStore((state) => state.isCandleExtinguished);

  // Sponge colors based on flavor
  const spongeColors = useMemo(() => {
    switch (cakeBaseType) {
      case 'chocolate':
        return {
          base: '#381A0B',
          side: '#482412',
          top: '#2D1407',
          highlight: '#5D331D',
        };
      case 'red-velvet':
        return {
          base: '#751022',
          side: '#8C152B',
          top: '#5E0B19',
          highlight: '#A8223B',
        };
      case 'strawberry':
        return {
          base: '#D65868',
          side: '#E86D7D',
          top: '#C24757',
          highlight: '#F58F9D',
        };
      case 'vanilla':
      default:
        return {
          base: '#E8D29A',
          side: '#F5E2B0',
          top: '#DFCA90',
          highlight: '#FCF1D2',
        };
    }
  }, [cakeBaseType]);

  return (
    <div
      aria-label="Artisan Multi-Layered Birthday Cake"
      className="relative flex flex-col items-center justify-end select-none pointer-events-none transition-all duration-500 ease-out"
      style={{
        width: 'min(520px, 44vw)',
        height: 'clamp(360px, 46vh, 460px)',
      }}
    >
      {/* 1. Realistic Deep Contact Shadow onto Golden Platter */}
      <div
        className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          width: '92%',
          height: '32px',
          background: 'radial-gradient(ellipse at center, rgba(14, 6, 2, 0.95) 0%, rgba(42, 18, 5, 0.65) 45%, rgba(0, 0, 0, 0) 80%)',
          filter: 'blur(7px)',
          zIndex: 1,
        }}
      />

      {/* SVG Master Artwork Container for Multi-Tier Cake */}
      <svg
        viewBox="0 0 540 500"
        className="w-full h-full overflow-visible"
        style={{ zIndex: 2 }}
      >
        <defs>
          {/* Frosting Cylindrical Shading Gradient */}
          <linearGradient id="frostingBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFD1BB" />
            <stop offset="25%" stopColor="#FFFDF7" />
            <stop offset="65%" stopColor="#FFF9EE" />
            <stop offset="88%" stopColor="#EADDC7" />
            <stop offset="100%" stopColor="#D5C5AC" />
          </linearGradient>

          {/* Frosting Top Ellipse Shading */}
          <radialGradient id="frostingTopGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFF9EE" />
            <stop offset="100%" stopColor="#EADDC7" />
          </radialGradient>

          {/* Dark Chocolate Ganache Body */}
          <linearGradient id="ganacheBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1B0A03" />
            <stop offset="30%" stopColor="#2F1407" />
            <stop offset="60%" stopColor="#3E1A0A" />
            <stop offset="85%" stopColor="#281005" />
            <stop offset="100%" stopColor="#180802" />
          </linearGradient>

          {/* Chocolate Glaze Top Ellipse */}
          <radialGradient id="ganacheTopGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#4A220E" />
            <stop offset="50%" stopColor="#2E1307" />
            <stop offset="85%" stopColor="#200B04" />
            <stop offset="100%" stopColor="#150602" />
          </radialGradient>

          {/* Glossy Strawberry Gradient */}
          <radialGradient id="berryGlint" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FF4D6D" />
            <stop offset="35%" stopColor="#E11D48" />
            <stop offset="75%" stopColor="#9F1239" />
            <stop offset="100%" stopColor="#5E0B19" />
          </radialGradient>

          {/* Sliced Strawberry Meat */}
          <radialGradient id="slicedBerryMeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF5F5" />
            <stop offset="30%" stopColor="#FDA4AF" />
            <stop offset="75%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </radialGradient>

          {/* Blueberry Velvet Gradient */}
          <radialGradient id="blueberryGrad" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#4B5EAA" />
            <stop offset="45%" stopColor="#232F5C" />
            <stop offset="85%" stopColor="#121835" />
            <stop offset="100%" stopColor="#0B0F22" />
          </radialGradient>

          {/* Blackberry Drupelet Gradient */}
          <radialGradient id="blackberryGrad" cx="35%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#4A2859" />
            <stop offset="55%" stopColor="#25122F" />
            <stop offset="100%" stopColor="#120617" />
          </radialGradient>

          {/* Burgundy Velvet Satin Ribbon */}
          <linearGradient id="burgundyRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#480711" />
            <stop offset="20%" stopColor="#781122" />
            <stop offset="50%" stopColor="#A82038" />
            <stop offset="80%" stopColor="#781122" />
            <stop offset="100%" stopColor="#3E050E" />
          </linearGradient>

          {/* Gold Filigree & Plaque Border */}
          <linearGradient id="goldFiligreeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#F5D061" />
            <stop offset="70%" stopColor="#C99427" />
            <stop offset="100%" stopColor="#7E540C" />
          </linearGradient>

          {/* Candle Spiral Body */}
          <linearGradient id="candleBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A745" />
            <stop offset="30%" stopColor="#FFF8E0" />
            <stop offset="60%" stopColor="#F3D375" />
            <stop offset="100%" stopColor="#AA7C1E" />
          </linearGradient>

          {/* Candle Flame Glow */}
          <radialGradient id="candleFlameCore" cx="50%" cy="65%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="88%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="rgba(220, 38, 38, 0)" />
          </radialGradient>

          {/* Ambient Candle Halo */}
          <radialGradient id="candleAmbientHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 235, 150, 0.75)" />
            <stop offset="45%" stopColor="rgba(245, 160, 30, 0.3)" />
            <stop offset="75%" stopColor="rgba(217, 119, 6, 0.1)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>

        {/* ================================================================= */}
        {/* STEP 1: MULTI-TIER CAKE SPONGE BASES (BOTTOM & TOP TIERS) */}
        {/* ================================================================= */}
        {currentStep >= 1 && (
          <g id="step1-cake-base" className="transition-all duration-500 ease-out">
            {/* --- BOTTOM TIER SPONGE (Wide Majestic Base) --- */}
            <path
              d="M 52 335 C 52 445, 488 445, 488 335 L 488 440 C 488 510, 52 510, 52 440 Z"
              fill={spongeColors.side}
            />
            <path
              d="M 55 400 C 150 445, 390 445, 485 400 L 485 415 C 390 460, 150 460, 55 415 Z"
              fill={spongeColors.base}
              opacity="0.85"
            />
            <ellipse cx="270" cy="335" rx="218" ry="54" fill={spongeColors.top} />
            <ellipse cx="270" cy="333" rx="210" ry="50" fill={spongeColors.highlight} opacity="0.3" />

            {/* --- TOP TIER SPONGE (Upper Elegant Layer) --- */}
            <path
              d="M 125 210 C 125 295, 415 295, 415 210 L 415 325 C 415 385, 125 385, 125 325 Z"
              fill={spongeColors.side}
            />
            <ellipse cx="270" cy="210" rx="145" ry="38" fill={spongeColors.top} />
            <ellipse cx="270" cy="208" rx="138" ry="34" fill={spongeColors.highlight} opacity="0.35" />
          </g>
        )}

        {/* ================================================================= */}
        {/* STEP 2: RICH VANILLA CREAM & CASCADING CHOCOLATE GANACHE DRIPS */}
        {/* ================================================================= */}
        {currentStep >= 2 && (
          <g id="step2-cream-and-drip" className="animate-in fade-in duration-500">
            {/* --- BOTTOM TIER FROSTING --- */}
            <path
              d="M 52 335 C 52 445, 488 445, 488 335 L 488 440 C 488 510, 52 510, 52 440 Z"
              fill="url(#frostingBodyGrad)"
            />
            <ellipse cx="270" cy="335" rx="218" ry="54" fill="url(#frostingTopGrad)" />

            {/* Bottom Tier Chocolate Ganache Drips */}
            <ellipse cx="270" cy="333" rx="218" ry="53" fill="url(#ganacheTopGrad)" />
            <path
              d="M 54 336
                 C 68 355, 74 395, 78 415 C 82 426, 89 426, 92 414 C 98 380, 106 350, 116 337
                 C 124 350, 130 385, 135 408 C 139 422, 147 422, 151 405 C 158 370, 168 345, 178 338
                 C 188 358, 196 410, 201 435 C 206 448, 215 448, 219 432 C 227 388, 237 348, 248 340
                 C 258 358, 264 405, 270 425 C 274 436, 282 436, 286 422 C 294 378, 304 348, 314 340
                 C 324 362, 332 415, 338 438 C 343 450, 352 450, 356 432 C 364 388, 374 348, 384 338
                 C 394 355, 401 400, 406 420 C 411 432, 419 432, 423 416 C 431 375, 440 348, 450 338
                 C 458 352, 465 385, 470 405 C 475 416, 482 416, 485 400 C 487 370, 488 348, 488 335
                 C 488 445, 52 445, 52 335 Z"
              fill="url(#ganacheBodyGrad)"
            />

            {/* Specular Highlights on Bottom Drips */}
            <path
              d="M 77 405 C 79 418, 87 418, 89 406
                 M 134 398 C 136 414, 145 414, 147 398
                 M 200 424 C 202 440, 213 440, 215 424
                 M 269 414 C 271 428, 280 428, 282 414
                 M 337 426 C 339 442, 350 442, 352 426
                 M 405 408 C 407 422, 417 422, 419 408"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* --- TOP TIER FROSTING --- */}
            <path
              d="M 125 210 C 125 295, 415 295, 415 210 L 415 325 C 415 385, 125 385, 125 325 Z"
              fill="url(#frostingBodyGrad)"
            />
            <ellipse cx="270" cy="210" rx="145" ry="38" fill="url(#frostingTopGrad)" />

            {/* Top Tier Chocolate Ganache Drips */}
            <ellipse cx="270" cy="208" rx="145" ry="37" fill="url(#ganacheTopGrad)" />
            <path
              d="M 126 211
                 C 134 225, 138 255, 142 272 C 145 282, 151 282, 154 270 C 158 240, 164 220, 172 212
                 C 178 222, 183 250, 187 268 C 190 278, 196 278, 200 265 C 206 235, 214 216, 222 212
                 C 230 228, 236 265, 240 284 C 243 294, 250 294, 254 280 C 260 248, 268 220, 276 214
                 C 284 230, 290 268, 294 286 C 298 296, 305 296, 309 282 C 316 248, 324 220, 332 213
                 C 338 225, 344 255, 348 270 C 352 280, 358 280, 362 266 C 368 238, 376 218, 384 212
                 C 392 224, 398 250, 402 266 C 406 275, 412 275, 414 260 C 415 235, 415 220, 415 210
                 C 415 295, 125 295, 125 210 Z"
              fill="url(#ganacheBodyGrad)"
            />

            {/* Specular Highlights on Top Drips */}
            <path
              d="M 141 264 C 143 276, 150 276, 152 264
                 M 186 260 C 188 272, 195 272, 197 260
                 M 239 275 C 241 288, 248 288, 250 275
                 M 293 276 C 295 289, 303 289, 305 276
                 M 347 262 C 349 274, 356 274, 358 262"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Whipped Buttercream Rosettes circling perimeter of Top Tier */}
            {[135, 168, 202, 236, 270, 304, 338, 372, 405].map((rx, idx) => {
              const ry = 210 - Math.sin(((rx - 125) / 290) * Math.PI) * 34;
              return (
                <g key={`rosette-top-${idx}`} transform={`translate(${rx}, ${ry})`}>
                  <ellipse cx="0" cy="0" rx="12" ry="8.5" fill="#EFE5D0" />
                  <ellipse cx="-1" cy="-2" rx="10" ry="7" fill="#FFFDF8" />
                  <ellipse cx="-2" cy="-3" rx="7" ry="4.5" fill="#FFFFFF" />
                  <path d="M -3 1 Q 0 -3, 3 1" stroke="#DFD1BB" strokeWidth="1.2" fill="none" />
                </g>
              );
            })}
          </g>
        )}

        {/* ================================================================= */}
        {/* STEP 3: LUSH FRESH STRAWBERRIES, BLUEBERRIES & BLACKBERRIES */}
        {/* ================================================================= */}
        {currentStep >= 3 && (
          <g id="step3-fresh-fruits" className="animate-in fade-in zoom-in-95 duration-500">
            {/* Sliced Strawberry Halves lining the bottom rim of Bottom Tier */}
            {[75, 122, 175, 235, 298, 360, 418, 465].map((bx, idx) => {
              const by = 450 + Math.sin(((bx - 52) / 436) * Math.PI) * 18;
              return (
                <g key={`bottom-slice-${idx}`} transform={`translate(${bx}, ${by})`}>
                  <path
                    d="M -16 -12 C -24 6, -14 26, 0 30 C 14 26, 24 6, 16 -12 C 9 -18, -9 -18, -16 -12 Z"
                    fill="#9F1239"
                  />
                  <path
                    d="M -13 -9 C -19 6, -11 22, 0 25 C 11 22, 19 6, 13 -9 Z"
                    fill="url(#slicedBerryMeat)"
                  />
                  <path
                    d="M 0 -2 L -3 8 M 0 -2 L 3 8 M 0 -2 L 0 14"
                    stroke="#FFF5F5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            {/* Fresh Strawberries on Intermediate Tier Ledge */}
            {[140, 395].map((lx, idx) => (
              <g key={`ledge-berry-${idx}`} transform={`translate(${lx}, 338)`}>
                <path d="M -12 -6 C -18 6, -10 20, 0 24 C 10 20, 18 6, 12 -6 Z" fill="url(#berryGlint)" />
                <path d="M 0 -8 L -4 -3 L -10 -6 L -5 1 L 0 -1 L 5 1 L 10 -6 L 4 -3 Z" fill="#2E7D32" />
              </g>
            ))}

            {/* Plump Whole Strawberry (Top Tier Centerpiece) */}
            <g transform="translate(235, 175) rotate(-8)">
              <path
                d="M -18 -8 C -28 10, -18 36, 0 44 C 18 36, 28 10, 18 -8 C 10 -16, -10 -16, -18 -8 Z"
                fill="url(#berryGlint)"
              />
              {[-8, 0, 8].map((sx, i) => (
                <g key={`seed-top-1-${i}`}>
                  <circle cx={sx} cy="6" r="1.2" fill="#FDE047" opacity="0.9" />
                  <circle cx={sx * 0.7} cy="18" r="1.1" fill="#FDE047" opacity="0.9" />
                  <circle cx="0" cy="28" r="1" fill="#FDE047" opacity="0.9" />
                </g>
              ))}
              <path
                d="M -12 2 C -15 12, -10 24, -2 30"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 0 -10 L -6 -3 L -15 -8 L -9 3 L 0 -1 L 9 3 L 15 -8 L 6 -3 Z" fill="#2E7D32" />
              <path d="M 0 -10 L -3 -5 L -8 -7 L -4 1 L 0 -1 L 4 1 L 8 -7 L 3 -5 Z" fill="#4ADE80" />
            </g>

            {/* Sliced Strawberry Heart (Top Tier Right) */}
            <g transform="translate(305, 178) rotate(14)">
              <path
                d="M -17 -8 C -26 8, -15 32, 0 38 C 15 32, 26 8, 17 -8 C 9 -14, -9 -14, -17 -8 Z"
                fill="#9F1239"
              />
              <path
                d="M -13 -6 C -20 8, -12 26, 0 31 C 12 26, 20 8, 13 -6 Z"
                fill="url(#slicedBerryMeat)"
              />
              <path d="M 0 0 L -4 10 M 0 0 L 4 10 M 0 0 L 0 16" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 0 -10 L -5 -4 L -12 -8 L -6 2 L 0 -1 L 6 2 L 12 -8 L 5 -4 Z" fill="#2E7D32" />
            </g>

            {/* Velvety Blueberries */}
            <g transform="translate(190, 192)">
              <circle cx="0" cy="0" r="10" fill="url(#blueberryGrad)" />
              <ellipse cx="-2.5" cy="-3" rx="4" ry="2.5" fill="rgba(255,255,255,0.45)" />
              <circle cx="1" cy="2" r="3" fill="#121835" />
            </g>
            <g transform="translate(348, 194)">
              <circle cx="0" cy="0" r="10" fill="url(#blueberryGrad)" />
              <ellipse cx="-2" cy="-2.5" rx="3.5" ry="2" fill="rgba(255,255,255,0.4)" />
              <circle cx="1" cy="2" r="2.8" fill="#121835" />
            </g>

            {/* Plump Blackberry Cluster */}
            <g transform="translate(270, 196)">
              {[
                { dx: -5, dy: -4, r: 4.5 },
                { dx: 4, dy: -4, r: 4.5 },
                { dx: -7, dy: 3, r: 4.5 },
                { dx: 0, dy: 2, r: 4.8 },
                { dx: 7, dy: 3, r: 4.5 },
                { dx: -3, dy: 9, r: 4.2 },
                { dx: 4, dy: 9, r: 4.2 },
              ].map((dr, idx) => (
                <circle key={`top-drupelet-${idx}`} cx={dr.dx} cy={dr.dy} r={dr.r} fill="url(#blackberryGrad)" />
              ))}
            </g>
          </g>
        )}

        {/* ================================================================= */}
        {/* STEP 4: CHOCOLATE PIROUETTE ROLLS & SIGNATURE YELLOW FLOWERS */}
        {/* ================================================================= */}
        {currentStep >= 4 && (
          <g id="step4-chocolate-toppings" className="animate-in fade-in zoom-in-95 duration-500">
            {/* Striped Chocolate Pirouette Wafer Rolls */}
            <g transform="translate(320, 155) rotate(32)">
              <rect x="-6" y="-32" width="12" height="64" rx="4" fill="#3D1D0E" stroke="#1D0C05" strokeWidth="1" />
              {[-20, -10, 0, 10, 20].map((ly, i) => (
                <line key={`wafer-stripe-${i}`} x1="-6" y1={ly} x2="6" y2={ly + 8} stroke="#EED9A6" strokeWidth="2.2" />
              ))}
              <ellipse cx="0" cy="-32" rx="6" ry="2.5" fill="#1A0A03" />
            </g>

            <g transform="translate(220, 160) rotate(-28)">
              <rect x="-5" y="-28" width="10" height="56" rx="3.5" fill="#4A2312" stroke="#1D0C05" strokeWidth="1" />
              {[-16, -6, 4, 14].map((ly, i) => (
                <line key={`wafer2-stripe-${i}`} x1="-5" y1={ly} x2="5" y2={ly + 7} stroke="#EED9A6" strokeWidth="2" />
              ))}
            </g>

            {/* Elegant Chocolate Curls */}
            <path
              d="M 242 168 C 258 150, 284 156, 272 176 C 262 190, 250 182, 258 172"
              stroke="#240F05"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Signature Yellow Buttercup Blossoms (Uci's Favorite Theme) */}
            <g transform="translate(205, 198)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={`petal1-${i}`}
                  cx="0"
                  cy="-8"
                  rx="4.8"
                  ry="7.5"
                  fill="#FDE047"
                  stroke="#EAB308"
                  strokeWidth="0.8"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="3.6" fill="#D97706" />
              <circle cx="0" cy="0" r="2.2" fill="#78350F" />
            </g>

            <g transform="translate(335, 202) scale(0.9)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={`petal2-${i}`}
                  cx="0"
                  cy="-7"
                  rx="4.2"
                  ry="6.8"
                  fill="#FACC15"
                  stroke="#CA8A04"
                  strokeWidth="0.8"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="3.2" fill="#B45309" />
            </g>

            {/* Edible Gold Leaf Flakes */}
            {[
              { x: 175, y: 205 },
              { x: 245, y: 195 },
              { x: 295, y: 205 },
              { x: 360, y: 200 },
            ].map((gold, i) => (
              <polygon
                key={`gold-leaf-${i}`}
                points={`${gold.x},${gold.y} ${gold.x + 4},${gold.y - 3} ${gold.x + 7},${gold.y + 1} ${gold.x + 2},${gold.y + 5}`}
                fill="#FDE047"
                opacity="0.9"
              />
            ))}
          </g>
        )}

        {/* ================================================================= */}
        {/* STEP 5: BURGUNDY SATIN RIBBON, TIED BOW & "Happy Birthday Uci ♡" PLAQUE */}
        {/* ================================================================= */}
        {currentStep >= 5 && (
          <g id="step5-ribbon-and-plaque" className="animate-in fade-in zoom-in-95 duration-500">
            {/* Burgundy Satin Ribbon around the lower base */}
            <path
              d="M 52 425 C 150 490, 390 490, 488 425 L 488 456 C 390 520, 150 520, 52 456 Z"
              fill="url(#burgundyRibbonGrad)"
            />
            {/* Satin Sheen Reflection Stripe */}
            <path
              d="M 54 434 C 150 498, 390 498, 486 434"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2.8"
              fill="none"
            />

            {/* Front Chocolate Plaque "Happy Birthday Uci ♡" */}
            <g id="birthday-plaque" transform="translate(270, 390)">
              {/* Drop Shadow under Plaque */}
              <ellipse cx="0" cy="4" rx="95" ry="42" fill="rgba(10, 4, 1, 0.8)" filter="blur(4px)" />
              {/* Outer Filigree Beaded Border */}
              <ellipse
                cx="0"
                cy="0"
                rx="94"
                ry="40"
                fill="#1C0A04"
                stroke="url(#goldFiligreeGrad)"
                strokeWidth="3.2"
              />
              {/* Inner Decorative Golden Dashed Ring */}
              <ellipse
                cx="0"
                cy="0"
                rx="86"
                ry="33"
                fill="none"
                stroke="#E9B85B"
                strokeWidth="1.2"
                strokeDasharray="3,3"
                opacity="0.85"
              />
              {/* Elegant Text */}
              <text
                x="0"
                y="-3"
                textAnchor="middle"
                fill="#FFF9EA"
                fontFamily="'Playfair Display', Georgia, serif"
                fontStyle="italic"
                fontSize="20"
                fontWeight="bold"
                letterSpacing="0.5"
              >
                Happy Birthday
              </text>
              <text
                x="0"
                y="20"
                textAnchor="middle"
                fill="#F8E6A0"
                fontFamily="'Playfair Display', Georgia, serif"
                fontSize="18"
                fontWeight="bold"
                letterSpacing="1"
              >
                Uci ♡
              </text>
            </g>

            {/* Luxurious Tied Burgundy Satin Bow right below plaque */}
            <g id="satin-bow" transform="translate(270, 448)">
              {/* Left Wing Loop */}
              <path
                d="M -5 -2 C -46 -35, -84 -14, -65 16 C -46 36, -14 14, -5 -2 Z"
                fill="url(#burgundyRibbonGrad)"
                stroke="#3E050E"
                strokeWidth="1.2"
              />
              {/* Right Wing Loop */}
              <path
                d="M 5 -2 C 46 -35, 84 -14, 65 16 C 46 36, 14 14, 5 -2 Z"
                fill="url(#burgundyRibbonGrad)"
                stroke="#3E050E"
                strokeWidth="1.2"
              />
              {/* Highlights */}
              <path d="M -18 0 C -40 -20, -62 -8, -52 12" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="2" fill="none" />
              <path d="M 18 0 C 40 -20, 62 -8, 52 12" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="2" fill="none" />
              {/* Flowing Ribbon Tails Draping Onto Platter */}
              <path d="M -8 4 C -28 32, -50 54, -62 74 L -46 70 C -34 50, -16 30, -4 9 Z" fill="#6B0F1E" />
              <path d="M 8 4 C 28 32, 50 54, 62 74 L 46 70 C 34 50, 16 30, 4 9 Z" fill="#821425" />
              {/* Center Bow Knot */}
              <ellipse cx="0" cy="0" rx="14" ry="11" fill="#9B1D36" stroke="#3E050E" strokeWidth="1.5" />
              <ellipse cx="-1" cy="-1" rx="9" ry="6" fill="rgba(255, 255, 255, 0.25)" />
            </g>
          </g>
        )}

        {/* ================================================================= */}
        {/* STEP 6: ARTISAN BIRTHDAY CANDLE & SPARKLING STARLIGHT HEART */}
        {/* ================================================================= */}
        {currentStep >= 6 && (
          <g id="step6-candle-and-flame" className="animate-in fade-in duration-500">
            <g transform="translate(270, 130)">
              {/* Candle Body Shaft */}
              <rect
                x="-7"
                y="-32"
                width="14"
                height="76"
                rx="4.5"
                fill="url(#candleBodyGrad)"
                stroke="#9E7321"
                strokeWidth="1.2"
              />
              {/* Gold & Cream Spiral Stripes */}
              <path
                d="M -7 -20 Q 0 -15, 7 -10
                   M -7 4 Q 0 9, 7 14
                   M -7 26 Q 0 31, 7 36"
                stroke="#FFFDF5"
                strokeWidth="2.8"
                fill="none"
                opacity="0.9"
              />
              {/* Melted Wax Rim Top */}
              <ellipse cx="0" cy="-32" rx="7" ry="3" fill="#FFF9E0" />
              {/* Wick */}
              <line x1="0" y1="-32" x2="0" y2="-44" stroke="#1A0D00" strokeWidth="3" strokeLinecap="round" />

              {/* LIT CANDLE FLAME (ACTIVE ON LOAD!) */}
              {!isExtinguished ? (
                <g id="active-candle-flame">
                  {/* Ambient Radiant Glow Halo */}
                  <circle cx="0" cy="-62" r="62" fill="url(#candleAmbientHalo)" className="animate-pulse" />

                  {/* Dynamic Candle Flame Droplet */}
                  <path
                    d="M 0 -44 C -14 -58, -9 -78, 0 -94 C 9 -78, 14 -58, 0 -44 Z"
                    fill="url(#candleFlameCore)"
                    className="origin-bottom animate-[flameFlicker_1.4s_ease-in-out_infinite]"
                  />

                  {/* Bright White Flame Core */}
                  <ellipse cx="0" cy="-51" rx="4" ry="7.5" fill="#FFFFFF" opacity="0.95" />

                  {/* Starlight Heart Sparkle Halo */}
                  <g id="starlight-heart-contour" transform="translate(0, -104) scale(1.22)">
                    <path
                      d="M 0 -12 C -24 -36, -50 -8, 0 32 C 50 -8, 24 -36, 0 -12 Z"
                      fill="none"
                      stroke="#FDE047"
                      strokeWidth="2.2"
                      strokeDasharray="4,6"
                      className="animate-pulse"
                      opacity="0.9"
                      filter="drop-shadow(0 0 6px #FDE047)"
                    />
                    <circle cx="-28" cy="-14" r="2.5" fill="#FFF" className="animate-ping" />
                    <circle cx="28" cy="-14" r="2.5" fill="#FFF" className="animate-ping" />
                    <circle cx="0" cy="30" r="3" fill="#FFF" className="animate-pulse" />
                    <circle cx="-16" cy="12" r="1.8" fill="#FDE047" />
                    <circle cx="16" cy="12" r="1.8" fill="#FDE047" />
                  </g>
                </g>
              ) : (
                /* EXTINGUISHED WISPY SMOKE PUFF */
                <g id="extinguished-smoke" className="animate-in fade-in duration-500">
                  <path
                    d="M 0 -44 C -9 -60, 7 -76, -5 -94 C -14 -108, 9 -124, 0 -140"
                    stroke="rgba(245, 245, 245, 0.55)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="6,6"
                  />
                  <circle cx="-5" cy="-94" r="4.5" fill="rgba(240, 240, 240, 0.35)" />
                  <circle cx="3" cy="-125" r="5.5" fill="rgba(240, 240, 240, 0.25)" />
                  <circle cx="0" cy="-42" r="1.8" fill="#F97316" className="animate-ping" />
                </g>
              )}
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
