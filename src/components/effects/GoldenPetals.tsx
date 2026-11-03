// src/components/effects/GoldenPetals.tsx

import React, { useMemo } from 'react';

interface PetalConfig {
  id: number;
  left: number; // percentage 0-100
  duration: number; // seconds 14-26
  delay: number; // seconds -20 to 0 (so they are already mid-flight)
  size: number; // pixels 14-24
  opacity: number; // 0.35 - 0.70
  rotationStart: number;
}

export const GoldenPetals: React.FC = () => {
  const petals = useMemo<PetalConfig[]>(() => {
    const list: PetalConfig[] = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        left: (i / count) * 96 + (Math.sin(i * 1.7) * 3 + 2),
        duration: 15 + (i % 5) * 2.5,
        delay: -((i * 3.7) % 20),
        size: 14 + (i % 4) * 3,
        opacity: 0.35 + (i % 3) * 0.12,
        rotationStart: (i * 47) % 360,
      });
    }
    return list;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden select-none"
    >
      <style>{`
        @keyframes floatPetalDown {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(25px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-15px) rotate(360deg);
          }
        }
      `}</style>

      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: 0,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            opacity: p.opacity,
            animation: `floatPetalDown ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotationStart}deg)`,
          }}
        >
          {/* Delicate Yellow Petal SVG */}
          <svg viewBox="0 0 30 42" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id={`petalGrad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9EA" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#F8E6A0" stopOpacity="0.9" />
                <stop offset="85%" stopColor="#E9B85B" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#D9AE50" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 15 2 C 24 10, 29 24, 21 37 C 16 42, 9 41, 5 35 C -2 24, 4 9, 15 2 Z"
              fill={`url(#petalGrad-${p.id})`}
            />
            {/* Subtle Petal Vein */}
            <path
              d="M 15 5 Q 16 20, 13 36"
              stroke="#D9AE50"
              strokeWidth="0.6"
              strokeOpacity="0.45"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
