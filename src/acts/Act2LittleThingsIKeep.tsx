// src/acts/Act2LittleThingsIKeep.tsx

import React, { useEffect, useRef } from 'react';
import { X, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import { CONFIGURED_MEMORIES } from '../config/storyContent';
import { SmartImage } from '../components/media/SmartImage';
import { VoicePlayerPill } from '../components/media/VoicePlayerPill';
import { InteractionHint } from '../components/hud/InteractionHint';

export const Act2LittleThingsIKeep: React.FC = () => {
  const discoveredMemoryIds = useExperienceStore((state) => state.discoveredMemoryIds);
  const activeMemoryModalId = useExperienceStore((state) => state.activeMemoryModalId);
  const setActiveMemoryModal = useExperienceStore((state) => state.setActiveMemoryModal);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);
  const discoverMemory = useExperienceStore((state) => state.discoverMemory);

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync native <dialog> with activeMemoryModalId
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeMemoryModalId) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          // fallback
        }
      }
    } else {
      if (dialog.open) {
        try {
          dialog.close();
        } catch {
          // fallback
        }
      }
    }

    return () => {
      if (dialog && dialog.open) {
        try {
          dialog.close();
        } catch {
          // fallback
        }
      }
    };
  }, [activeMemoryModalId]);

  const activeMemory = CONFIGURED_MEMORIES.find(
    (m) => m.id === activeMemoryModalId
  );

  const handleCloseModal = () => {
    setActiveMemoryModal(null);
  };

  const handleKeepsakeClick = (id: string) => {
    discoverMemory(id);
    setActiveMemoryModal(id);
  };

  const handleProceedToAct3 = () => {
    setActiveMemoryModal(null);
    setCurrentChapter('ACT_3');
  };

  // Close dialog when clicking directly on backdrop
  const handleDialogBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleCloseModal();
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-6 select-none overflow-x-hidden">
      {/* ─── TOP NARRATIVE HEADER ─── */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto pt-3 sm:pt-5 animate-in fade-in duration-700">
        {/* Chapter Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D9AE50]/70 bg-[#FFF9EA]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(217,174,80,0.25)] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E9B85B] shadow-[0_0_8px_#F8E6A0]" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#8B5E0A] font-bold">
            ACT II · THE LITTLE THINGS I KEEP
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif italic text-[#4A3004] font-normal tracking-tight leading-tight mb-2 drop-shadow-[0_2px_16px_rgba(255,253,245,0.95)]">
          A Few Things I Adore About You.
        </h2>

        {/* Supporting Message */}
        <p className="text-xs sm:text-sm md:text-base text-[#5A3B05]/90 font-serif italic max-w-xl mx-auto leading-relaxed mb-1 drop-shadow-sm">
          Little pieces of our story, saved across the distance.
        </p>

        {/* Interaction Instruction */}
        <p className="text-[11px] sm:text-xs font-mono tracking-wider text-[#6B4706]/75 mb-3">
          Tap any keepsake to open a memory.
        </p>

        {/* Discovery Counter Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D9AE50]/60 bg-[#FFFDF5]/85 backdrop-blur-md shadow-[0_2px_10px_rgba(217,174,80,0.2)] text-xs font-mono text-[#7A5208] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#C49226]" />
          <span>
            Keepsakes opened: {discoveredMemoryIds.length} / {CONFIGURED_MEMORIES.length}
          </span>
        </div>
      </div>

      {/* ─── KEEPSAKE CARDS GALLERY ─── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto my-auto py-4 px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {CONFIGURED_MEMORIES.map((mem) => {
            const isFound = discoveredMemoryIds.includes(mem.id);
            const isCollage = mem.id === 'mem-02' || mem.photoPath.includes('four-moments');
            return (
              <button
                key={mem.id}
                onClick={() => handleKeepsakeClick(mem.id)}
                className={`relative group p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF5]/92 border backdrop-blur-md transition-all duration-300 text-left cursor-pointer flex flex-col justify-between ${
                  isFound
                    ? 'border-[#D9AE50]/75 shadow-[0_4px_22px_rgba(217,174,80,0.28)] hover:shadow-[0_8px_32px_rgba(217,174,80,0.45)] hover:-translate-y-1'
                    : 'border-[#D9AE50]/40 shadow-[0_4px_16px_rgba(217,174,80,0.15)] hover:border-[#D9AE50]/70 hover:shadow-[0_8px_28px_rgba(217,174,80,0.3)] hover:-translate-y-1'
                }`}
                aria-label={`Open keepsake: ${mem.title}`}
              >
                {/* Decorative Washi Tape Strip at top */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#F8E6A0]/85 border border-[#D9AE50]/40 shadow-xs transform -rotate-1 rounded-xs pointer-events-none z-10" />

                {/* Photograph Frame Area */}
                <div className={`w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-[#D9AE50]/25 shadow-inner mb-3 ${isCollage ? 'bg-[#1F140E]' : 'bg-[#FFF9EA]'}`}>
                  <SmartImage
                    assetKey={mem.imageAssetKey}
                    src={mem.photoPath}
                    alt={mem.imageAltText || mem.title}
                    aspectRatio="aspect-[4/5]"
                    className={`w-full h-full ${isCollage ? 'object-contain' : 'object-cover'}`}
                    theme="warm"
                  />
                </div>

                {/* Card Text & Metadata */}
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    {/* Category Badge */}
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B5E0A]/75 font-semibold block mb-1">
                      {mem.categoryBadge}
                    </span>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-serif italic text-[#4A3004] font-medium leading-snug mb-1 group-hover:text-[#8B5E0A] transition-colors">
                      {mem.title}
                    </h3>

                    {/* Era / Date Label */}
                    {mem.eraOrDateLabel && (
                      <span className="text-[11px] font-sans text-[#6B4706]/70 block leading-tight">
                        {mem.eraOrDateLabel}
                      </span>
                    )}
                  </div>

                  {/* Subtle Interaction Indication & Discovered Detail */}
                  <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#D9AE50]/20 text-[11px]">
                    <span className="font-mono text-[#8B5E0A]/70 group-hover:text-[#5A3B05] transition-colors">
                      Tap to open
                    </span>

                    {isFound ? (
                      <span className="inline-flex items-center gap-1 font-serif italic text-[#D9AE50] font-medium">
                        <Heart className="w-3 h-3 fill-[#E11D48] text-[#E11D48]" />
                        <span>Opened</span>
                      </span>
                    ) : (
                      <span className="text-[#C49226] group-hover:translate-x-0.5 transition-transform">
                        ♡
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── BOTTOM CONTROLS & CONTINUATION ─── */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full pt-4 pb-2">
        {/* Bottom Hint */}
        <InteractionHint hint="Choose a little keepsake to open it" icon="click" />

        {/* Continue Button to Act III */}
        <button
          onClick={handleProceedToAct3}
          className="flex items-center justify-center gap-3 px-8 py-3 rounded-full border border-[#D9AE50] bg-gradient-to-r from-[#F8E6A0]/85 via-[#FFF9EA]/95 to-[#F8E6A0]/85 hover:from-[#F8E6A0] hover:to-[#F8E6A0] shadow-[0_0_20px_rgba(217,174,80,0.35)] hover:shadow-[0_0_30px_rgba(217,174,80,0.6)] text-[#5A3B05] font-mono font-bold text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer backdrop-blur-md group"
        >
          <span>THERE&apos;S MORE I WANT TO SHOW YOU</span>
          <ArrowRight className="w-4 h-4 text-[#8B5E0A] group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* ─── NATIVE ACCESSIBLE TOP-LAYER <dialog> MEMORY MODAL ─── */}
      <dialog
        ref={dialogRef}
        onClose={handleCloseModal}
        onClick={handleDialogBackdropClick}
        aria-labelledby="memory-dialog-title"
        className="backdrop:bg-[#4A3004]/45 backdrop:backdrop-blur-sm p-4 bg-transparent outline-none max-w-lg w-full m-auto"
      >
        {activeMemory && (
          <div
            className="relative w-full max-h-[88vh] overflow-y-auto rounded-3xl bg-[#FFFDF5] border-2 border-[#D9AE50]/65 p-6 sm:p-7 shadow-[0_20px_60px_rgba(74,48,4,0.32)] flex flex-col gap-4 text-left select-none animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#D9AE50]/25 pb-3">
              <div>
                <span className="inline-block px-3 py-1 rounded-full border border-[#D9AE50]/50 bg-[#F8E6A0]/40 text-[10px] font-mono uppercase tracking-[0.25em] text-[#8B5E0A] font-bold mb-1.5">
                  {activeMemory.categoryBadge || 'KEEPSAKE'}
                </span>
                <h3
                  id="memory-dialog-title"
                  className="text-2xl sm:text-3xl font-serif italic text-[#4A3004] font-medium leading-tight"
                >
                  {activeMemory.title}
                </h3>
                {activeMemory.eraOrDateLabel && (
                  <span className="text-xs font-mono text-[#8B5E0A]/70 mt-0.5 block">
                    {activeMemory.eraOrDateLabel}
                  </span>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-full hover:bg-[#F8E6A0]/50 text-[#8B5E0A] transition-colors cursor-pointer"
                aria-label="Close keepsake"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Polaroid Photograph Frame with Top Tape */}
            {(() => {
              const isCollageModal =
                activeMemory.id === 'mem-02' ||
                activeMemory.photoPath.includes('four-moments');
              return (
                <div
                  className={`relative p-2.5 rounded-2xl border border-[#D9AE50]/35 shadow-sm ${
                    isCollageModal ? 'bg-[#1F140E]' : 'bg-[#FFF9EA]'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#F8E6A0]/90 border border-[#D9AE50]/40 shadow-xs transform -rotate-1 rounded-xs pointer-events-none z-10" />
                  <div
                    className={`w-full rounded-xl overflow-hidden ${
                      isCollageModal ? 'h-72 sm:h-84' : 'h-56 sm:h-64'
                    }`}
                  >
                    <SmartImage
                      assetKey={activeMemory.imageAssetKey}
                      src={activeMemory.photoPath}
                      alt={activeMemory.imageAltText || activeMemory.title}
                      aspectRatio={isCollageModal ? 'aspect-[3/4]' : 'aspect-[16/10]'}
                      className={`w-full h-full rounded-xl ${
                        isCollageModal ? 'object-contain' : 'object-cover'
                      }`}
                      theme="warm"
                    />
                  </div>
                </div>
              );
            })()}

            {/* Story Text Body */}
            <p className="text-sm sm:text-base text-[#4A3004]/90 font-serif leading-relaxed">
              {activeMemory.storyBody}
            </p>

            {/* Optional Bullet Items (e.g. Keepsake 03 Midnight Rituals) */}
            {activeMemory.bulletItems && activeMemory.bulletItems.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-3 py-2.5 rounded-xl bg-[#FFF9EA]/90 border border-[#D9AE50]/35 text-xs sm:text-sm font-serif text-[#5A3B05]">
                {activeMemory.bulletItems.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#D9AE50]">✦</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Optional Secondary Handwritten Whisper */}
            {activeMemory.secondaryWhisper && (
              <div className="p-3.5 rounded-xl bg-[#FFF9EA] border-l-4 border-[#D9AE50] text-xs sm:text-sm font-serif italic text-[#6B4706] leading-relaxed shadow-xs">
                &ldquo;{activeMemory.secondaryWhisper}&rdquo; <span className="text-[#E11D48] not-italic">♡</span>
              </div>
            )}

            {/* Optional Voice Recording Player (/audio/my-voice-note.mp3) */}
            {(activeMemory.voiceNoteSrc || activeMemory.audioAssetKey) && (
              <div className="w-full pt-1">
                <VoicePlayerPill
                  audioPath={
                    activeMemory.voiceNoteSrc ||
                    `/media/audio/voice/${activeMemory.audioAssetKey}.mp3`
                  }
                  transcript={activeMemory.storyBody}
                  title="Listen to My Voice Note 🎙️"
                  autoPlay={false}
                />
              </div>
            )}

            {/* Modal Action Close Button */}
            <div className="flex justify-center pt-2 border-t border-[#D9AE50]/20">
              <button
                onClick={handleCloseModal}
                className="px-8 py-2.5 rounded-full border border-[#D9AE50] bg-gradient-to-r from-[#F8E6A0]/85 via-[#FFF9EA] to-[#F8E6A0]/85 hover:from-[#F8E6A0] hover:to-[#F8E6A0] text-xs sm:text-sm font-serif italic font-medium text-[#5A3B05] shadow-[0_2px_12px_rgba(217,174,80,0.25)] hover:shadow-[0_4px_18px_rgba(217,174,80,0.4)] transition-all duration-300 cursor-pointer"
              >
                Keep this close ♡
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};
