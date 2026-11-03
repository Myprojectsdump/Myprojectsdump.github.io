// src/components/hud/SoundControlPill.tsx

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sliders, MessageSquare } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { audioEngine } from '../../engine/audio/AudioEngine';

export const SoundControlPill: React.FC = () => {
  const isMuted = useExperienceStore((state) => state.isMuted);
  const musicVolume = useExperienceStore((state) => state.musicVolume);
  const sfxVolume = useExperienceStore((state) => state.sfxVolume);
  const captionsEnabled = useExperienceStore((state) => state.captionsEnabled);

  const toggleMute = useExperienceStore((state) => state.toggleMute);
  const setMusicVolume = useExperienceStore((state) => state.setMusicVolume);
  const setSfxVolume = useExperienceStore((state) => state.setSfxVolume);
  const toggleCaptions = useExperienceStore((state) => state.toggleCaptions);

  const [isOpen, setIsOpen] = useState(false);

  // Global M keyboard shortcut for mute (when not typing in an input/textarea)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm' && !['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        toggleMute();
        audioEngine.syncGainsFromStore();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMute]);

  const handleMuteClick = () => {
    toggleMute();
    audioEngine.syncGainsFromStore();
  };

  const handleMusicChange = (val: number) => {
    setMusicVolume(val);
    audioEngine.syncGainsFromStore();
  };

  const handleSfxChange = (val: number) => {
    setSfxVolume(val);
    audioEngine.syncGainsFromStore();
  };

  return (
    <div className="fixed top-3 right-6 z-40 select-none">
      <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-champagne-gold/30 shadow-glow">
        <button
          onClick={handleMuteClick}
          className="p-1.5 rounded-full text-champagne-gold hover:bg-champagne-gold/20 transition-colors"
          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-crimson-lust" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1.5 rounded-full transition-colors ${
            isOpen ? 'bg-champagne-gold/25 text-champagne-gold' : 'text-champagne-gold/70 hover:text-champagne-gold hover:bg-champagne-gold/15'
          }`}
          title="Sound & Audio Settings"
          aria-label="Sound Settings"
          aria-expanded={isOpen}
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Audio Mixer Popover */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 p-4 rounded-xl glass-panel-dense border border-champagne-gold/25 shadow-glow flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-mono tracking-widest text-champagne-gold uppercase border-b border-champagne-gold/20 pb-2">
            Audio Mixer
          </div>

          {/* Music Volume */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-sans text-parchment-warm/80">
              <span>Background Music</span>
              <span className="font-mono text-champagne-gold">{Math.round(musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={musicVolume}
              onChange={(e) => handleMusicChange(parseFloat(e.target.value))}
              className="accent-champagne-gold w-full h-1 bg-obsidian-void rounded cursor-pointer"
            />
          </div>

          {/* SFX Volume */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-sans text-parchment-warm/80">
              <span>Interactions & Sound Effects</span>
              <span className="font-mono text-champagne-gold">{Math.round(sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sfxVolume}
              onChange={(e) => handleSfxChange(parseFloat(e.target.value))}
              className="accent-champagne-gold w-full h-1 bg-obsidian-void rounded cursor-pointer"
            />
          </div>

          {/* Captions Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-champagne-gold/15 text-xs text-parchment-warm/80">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-champagne-gold/70" />
              Voice Captions
            </span>
            <button
              onClick={toggleCaptions}
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider transition-colors ${
                captionsEnabled
                  ? 'bg-champagne-gold text-obsidian-void font-bold'
                  : 'bg-obsidian-void/60 text-parchment-warm/50 border border-champagne-gold/20'
              }`}
            >
              {captionsEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
