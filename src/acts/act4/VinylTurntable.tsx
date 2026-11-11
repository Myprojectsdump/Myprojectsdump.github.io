// src/acts/act4/VinylTurntable.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Disc } from 'lucide-react';

interface VinylTurntableProps {
  vinylSide: 'daylight' | 'afterHours';
  isPlaying: boolean;
  kissCount: number;
  photoPath?: string;
  daylightPhotoPath?: string;
  afterHoursPhotoPath?: string;
  onToggleSide: (side?: 'daylight' | 'afterHours') => void;
  onTogglePlay: () => void;
  onSendKiss: () => void;
  onScratch?: (deltaSeconds: number) => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export const VinylTurntable: React.FC<VinylTurntableProps> = ({
  vinylSide,
  isPlaying,
  kissCount,
  photoPath,
  daylightPhotoPath = '/photos/uci-12.jpg',
  afterHoursPhotoPath = '/photos/uci-13.jpg',
  onToggleSide,
  onTogglePlay,
  onSendKiss,
  onScratch,
}) => {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [photoError, setPhotoError] = useState(false);
  const [scratchAngleOffset, setScratchAngleOffset] = useState(0);
  const [isScratchingDisc, setIsScratchingDisc] = useState(false);

  const lastPointerAngleRef = useRef<number | null>(null);
  const isDaylight = vinylSide === 'daylight';

  const activePhoto = photoPath || (isDaylight ? daylightPhotoPath : afterHoursPhotoPath);

  useEffect(() => {
    setPhotoError(false);
  }, [activePhoto, vinylSide]);

  const handleKissClick = () => {
    onSendKiss();

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 20,
    };
    setFloatingHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  const computePointerAngle = (clientX: number, clientY: number, el: HTMLDivElement): number => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  };

  const handleDiscPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPointerAngleRef.current = computePointerAngle(e.clientX, e.clientY, e.currentTarget);
    setIsScratchingDisc(true);
  };

  const handleDiscPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScratchingDisc || lastPointerAngleRef.current === null) {
      return;
    }

    const currentAngle = computePointerAngle(e.clientX, e.clientY, e.currentTarget);
    let deltaDeg = currentAngle - lastPointerAngleRef.current;
    if (deltaDeg > 180) deltaDeg -= 360;
    if (deltaDeg < -180) deltaDeg += 360;

    lastPointerAngleRef.current = currentAngle;
    setScratchAngleOffset((prev) => prev + deltaDeg);

    if (Math.abs(deltaDeg) > 1.2 && onScratch) {
      onScratch(deltaDeg * 0.015);
    }
  };

  const handleDiscPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScratchingDisc) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore release errors
      }
      setIsScratchingDisc(false);
      lastPointerAngleRef.current = null;
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Centered Vinyl Record Platter Visual Object */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
        {/* Subtle Turntable Base Plinth Glow */}
        <div
          className={`absolute inset-4 rounded-full filter blur-xl transition-opacity duration-700 pointer-events-none ${
            isDaylight ? 'bg-[#F8E6A0]/25' : 'bg-[#E11D48]/35'
          }`}
        />

        {/* Outer Heavy Vinyl Disc */}
        <div
          data-testid={`vinyl-disc-${vinylSide}`}
          onPointerDown={handleDiscPointerDown}
          onPointerMove={handleDiscPointerMove}
          onPointerUp={handleDiscPointerUp}
          onPointerCancel={handleDiscPointerUp}
          style={{
            animation: isPlaying && !isScratchingDisc ? 'spin 3.2s linear infinite' : 'none',
            transform: scratchAngleOffset !== 0 ? `rotate(${scratchAngleOffset}deg)` : undefined,
            background: isDaylight
              ? 'radial-gradient(circle at 50% 50%, #1C1613 0%, #120E0C 52%, #0D0B0A 100%)'
              : 'radial-gradient(circle at 50% 50%, #4C0519 0%, #2D0411 45%, #160309 82%, #0D0B0A 100%)',
          }}
          className={`relative w-full h-full rounded-full border-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-none transition-colors duration-500 ${
            isDaylight ? 'border-[#2A2420]' : 'border-[#881337]/80'
          }`}
        >
          {/* Microgroove Rings (Concentric Subtle Gradients) */}
          <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-16 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-20 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute inset-24 rounded-full border border-white/10 pointer-events-none" />

          {/* Realistic High-Gloss Specular Sheen Reflections */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_25%,rgba(255,255,255,0.18)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_75%,rgba(255,255,255,0.12)_0%,transparent_60%)] pointer-events-none" />

          {/* Center Record Label */}
          <div
            className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center border-2 shadow-inner overflow-hidden transition-colors duration-500 ${
              isDaylight
                ? 'bg-gradient-to-br from-[#F8E6A0] via-[#E9B85B] to-[#D9AE50] border-[#FFF9EA] text-[#4A3004]'
                : 'bg-gradient-to-br from-[#9F1239] via-[#BE123C] to-[#881337] border-[#FECDD3] text-[#FFFDF5]'
            }`}
          >
            {activePhoto && !photoError && (
              <img
                src={activePhoto}
                alt={isDaylight ? 'Side A Daylight Label' : 'Side B After-Hours Label'}
                loading="lazy"
                onError={() => setPhotoError(true)}
                style={{ objectPosition: 'center 25%' }}
                className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
              />
            )}

            {/* Center Spindle Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#0D0B0A] border-2 border-white/60 shadow-inner z-10" />

            {/* Label Branding */}
            {isDaylight ? (
              <div className="absolute inset-0 flex flex-col items-center justify-between py-2 text-center pointer-events-none z-10">
                <span className="text-[7px] font-mono tracking-widest uppercase font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                  SIDE A
                </span>
                <span className="text-[8px] font-serif italic font-bold">SUNLIGHT</span>
                <span className="text-[6px] font-mono tracking-wider font-semibold">
                  DAYLIGHT
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-between py-2 text-center pointer-events-none z-10">
                <span className="text-[7px] font-mono tracking-widest uppercase font-bold text-[#FECDD3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  SIDE B
                </span>
                <span className="text-sm font-serif italic text-white drop-shadow">♡</span>
                <span className="text-[6px] font-mono tracking-wider text-[#FECDD3] font-semibold">
                  AFTER-HOURS
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tonearm Assembly */}
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '-4%',
            transformOrigin: '20px 20px',
            transform: isPlaying ? 'rotate(18deg)' : 'rotate(-15deg)',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="w-24 sm:w-32 md:w-36 h-4 pointer-events-none z-20"
        >
          {/* Tonearm Pivot Gimbal */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E9C46A] to-[#8B5E0A] border border-[#FFF9EA] shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#1A0C06]" />
          </div>

          {/* Metallic Tonearm Shaft */}
          <div className="w-full h-1 bg-gradient-to-r from-[#FFF9EA] via-[#D9AE50] to-[#8B5E0A] shadow-md -mt-3.5 ml-3" />

          {/* Cartridge & Stylus Head */}
          <div className="absolute right-0 top-[-6px] w-5 h-3 rounded-sm bg-gradient-to-r from-[#D9AE50] to-[#991B1B] shadow" />
        </div>
      </div>

      {/* Turntable Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 z-20">
        {/* Quick Side Flip Button */}
        <button
          onClick={() => onToggleSide()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D9AE50]/50 bg-[#1A0C06]/75 hover:bg-[#1A0C06]/90 text-[11px] font-mono text-[#F8E6A0] transition-all cursor-pointer backdrop-blur-md shadow-md"
        >
          <span>{isDaylight ? 'Flip to After-Hours 🔥' : 'Flip to Daylight ☀️'}</span>
        </button>

        {/* Drop / Lift Needle Toggle Button */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg ${
            isPlaying
              ? 'border-[#E9C46A] bg-gradient-to-r from-[#F8E6A0] via-[#FFF9EA] to-[#F8E6A0] text-[#5A3B05] font-bold shadow-[0_0_18px_rgba(233,196,106,0.65)]'
              : 'border-[#D9AE50]/60 bg-[#1A0C06]/75 hover:bg-[#1A0C06]/90 text-[#FFFDF5]'
          } text-[11px] font-mono tracking-wider`}
        >
          <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>{isPlaying ? 'Lift the Needle' : 'Drop the Needle'}</span>
        </button>

        {/* Send a Kiss Button with Counter & Particle Pop */}
        <div className="relative">
          <button
            onClick={handleKissClick}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E11D48]/60 bg-[#1A0C06]/75 hover:bg-[#1A0C06]/90 text-[11px] font-mono text-[#FECDD3] transition-all cursor-pointer backdrop-blur-md shadow-md group"
          >
            <span>Send a Kiss 💋</span>
            <span className="font-bold text-white">({kissCount})</span>
          </button>

          {/* Floating Kiss Heart Particles */}
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              style={{
                position: 'absolute',
                left: `calc(50% + ${heart.x}px)`,
                top: `-20px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="pointer-events-none animate-floatUp text-base"
            >
              ❤️
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
