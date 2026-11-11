// src/acts/AfterCreditsVipVault.tsx

import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCcw,
  Heart,
  Crown,
  Gift,
  Mail,
  Sparkles,
} from 'lucide-react';
import { useExperienceStore } from '../store/useExperienceStore';
import {
  STORY_DATA,
  SUPPLEMENTARY_REDEMPTION_GUIDANCE,
} from '../config/storyContent';
import { VipCouponCard } from './vip/VipCouponCard';

export const AfterCreditsVipVault: React.FC = () => {
  const vipRedemptions = useExperienceStore((state) => state.vipRedemptions);
  const redeemVipPass = useExperienceStore((state) => state.redeemVipPass);
  const unclaimVipPass = useExperienceStore((state) => state.unclaimVipPass);
  const setCurrentChapter = useExperienceStore((state) => state.setCurrentChapter);

  // Card flip state: tracks which cards are showing their back side
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Sync QA Test Probes
  useEffect(() => {
    if (window.__UCI_TEST_PROBES__) {
      const redeemedCount = Object.values(vipRedemptions).filter(
        (r) => r.redeemed
      ).length;
      window.__UCI_TEST_PROBES__.vipRedemptionCount = redeemedCount;
    }
  }, [vipRedemptions]);

  // Dynamic Tier Filtering
  const sweetCoupons = useMemo(() => {
    return STORY_DATA.vipCoupons.filter(
      (c) => c.tier === 'SWEET // PRINCESS TIER'
    );
  }, []);

  const spicyCoupons = useMemo(() => {
    return STORY_DATA.vipCoupons.filter(
      (c) => c.tier === 'AFTER-MIDNIGHT // 18+ SPICY 🔥'
    );
  }, []);

  // Live Claimed Counts
  const sweetClaimedCount = useMemo(() => {
    return sweetCoupons.filter((c) => vipRedemptions[c.id]?.redeemed).length;
  }, [sweetCoupons, vipRedemptions]);

  const spicyClaimedCount = useMemo(() => {
    return spicyCoupons.filter((c) => vipRedemptions[c.id]?.redeemed).length;
  }, [spicyCoupons, vipRedemptions]);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none overflow-y-auto">
      {/* ===================================================================== */}
      {/* 1. THE PRIVATE COLLECTION INTRODUCTION */}
      {/* ===================================================================== */}
      <header className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto pt-14 sm:pt-16 pb-8">
        {/* Eyebrow with Ornamental Dividers */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D9B77B]/60" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#D9B77B] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            U ♥ S // AFTER-CREDITS — PRIVATE VIP VAULT
          </span>
          <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D9B77B]/60" />
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#FFF9EA] tracking-tight mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Your Lifetime VIP Passes
        </h2>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm font-serif italic text-[#F8E6A0]/90 max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Redeemable remotely tonight or any night across our 3,000 miles ♥
        </p>

        {/* Small Wax Seal Accent Divider */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#D9B77B]/40" />
          <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-current animate-pulse" />
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#D9B77B]/40" />
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN PASS CATEGORIES */}
      {/* ===================================================================== */}
      <main className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 sm:gap-16">
        {/* ───────────────────────────────────────────────────────────────── */}
        {/* TIER 1: SWEET // PRINCESS TIER */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="sweet-tier-heading" className="flex flex-col gap-5">
          {/* Tier Header with Live Count Badge */}
          <div className="flex items-center justify-between border-b border-[#D9B77B]/30 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D9B77B]/30 to-[#C99427]/10 border border-[#D9B77B]/50 flex items-center justify-center text-[#F8E6A0]">
                <Crown className="w-4 h-4 text-[#FDE047]" />
              </div>
              <h3
                id="sweet-tier-heading"
                className="text-base sm:text-lg font-mono tracking-widest text-[#F8E6A0] uppercase font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              >
                SWEET // PRINCESS TIER
              </h3>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#180E04]/70 border border-[#D9B77B]/40 text-[10px] sm:text-[11px] font-mono text-[#F8E6A0] shadow-sm">
              <span>{sweetClaimedCount} of {sweetCoupons.length} Claimed</span>
            </div>
          </div>

          {/* Sweet Coupons Grid */}
          {sweetCoupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sweetCoupons.map((coupon) => (
                <VipCouponCard
                  key={coupon.id}
                  coupon={coupon}
                  isFlipped={!!flippedCards[coupon.id]}
                  onToggleFlip={() => toggleFlip(coupon.id)}
                  isClaimed={!!vipRedemptions[coupon.id]?.redeemed}
                  claimedAtIso={vipRedemptions[coupon.id]?.redeemedAtIso}
                  guidance={SUPPLEMENTARY_REDEMPTION_GUIDANCE[coupon.id]}
                  onRedeem={() => redeemVipPass(coupon.id)}
                  onUnclaim={() => unclaimVipPass(coupon.id)}
                  tierType="sweet"
                />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-black/40 border border-[#D9B77B]/20 text-center text-sm font-serif italic text-white/50">
              No Princess Tier passes configured.
            </div>
          )}
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* TIER 2: AFTER-MIDNIGHT // 18+ SPICY 🔥 */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="spicy-tier-heading" className="flex flex-col gap-5">
          {/* Tier Header with Live Count Badge */}
          <div className="flex items-center justify-between border-b border-[#E11D48]/35 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E11D48]/30 to-[#9F1239]/10 border border-[#E11D48]/50 flex items-center justify-center text-[#FDA4AF]">
                <Heart className="w-4 h-4 text-[#E11D48] fill-current" />
              </div>
              <h3
                id="spicy-tier-heading"
                className="text-base sm:text-lg font-mono tracking-widest text-[#FDA4AF] uppercase font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              >
                AFTER-MIDNIGHT // 18+ SPICY 🔥
              </h3>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#20050E]/80 border border-[#E11D48]/40 text-[10px] sm:text-[11px] font-mono text-[#FDA4AF] shadow-sm">
              <span>{spicyClaimedCount} of {spicyCoupons.length} Claimed</span>
            </div>
          </div>

          {/* Spicy Coupons Grid */}
          {spicyCoupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {spicyCoupons.map((coupon) => (
                <VipCouponCard
                  key={coupon.id}
                  coupon={coupon}
                  isFlipped={!!flippedCards[coupon.id]}
                  onToggleFlip={() => toggleFlip(coupon.id)}
                  isClaimed={!!vipRedemptions[coupon.id]?.redeemed}
                  claimedAtIso={vipRedemptions[coupon.id]?.redeemedAtIso}
                  guidance={SUPPLEMENTARY_REDEMPTION_GUIDANCE[coupon.id]}
                  onRedeem={() => redeemVipPass(coupon.id)}
                  onUnclaim={() => unclaimVipPass(coupon.id)}
                  tierType="spicy"
                />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-black/40 border border-[#E11D48]/20 text-center text-sm font-serif italic text-white/50">
              No After-Midnight passes configured.
            </div>
          )}
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 3. CLOSING VOW & PRIMARY CALL ACTION */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section
          aria-label="Closing Vow and Call"
          className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2A0E18]/85 via-[#180810]/90 to-[#2A0E18]/85 border border-[#D9B77B]/40 shadow-[0_16px_48px_rgba(0,0,0,0.7)] backdrop-blur-md my-4"
        >
          {/* Left: Romantic Quotation Box with Glowing Golden Heart */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#D9B77B]/20 to-[#E11D48]/10 border border-[#D9B77B]/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(217,174,80,0.3)]">
              <Heart className="w-6 h-6 text-[#FDE047] fill-current animate-pulse" />
            </div>

            <p className="text-base sm:text-xl font-serif text-[#FFF9EA] italic leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              "Your birthday may happen once a year. But choosing you is something I want to do every day."
            </p>
          </div>

          {/* Right: Connected on Call & Final Destination Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>On Call With You Right Now ❤️</span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentChapter('FINAL_LOVE_LETTER')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D9B77B] via-[#E9B85B] to-[#F8E6A0] text-[#140A00] font-mono font-bold text-xs tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all duration-300 shadow-[0_4px_24px_rgba(217,183,123,0.5)] cursor-pointer"
            >
              <span>Our Final Universe</span>
              <Sparkles className="w-4 h-4 text-[#B45309]" />
            </button>
          </div>
        </section>
      </main>

      {/* ===================================================================== */}
      {/* 4. FOOTER NAVIGATION */}
      {/* ===================================================================== */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between max-w-6xl mx-auto w-full pt-8 pb-4 border-t border-[#D9B77B]/20 text-xs font-mono text-[#FFF9EA]/70 mt-8">
        {/* Left: Replay From Opening */}
        <button
          type="button"
          onClick={() => setCurrentChapter('OPENING')}
          className="flex items-center gap-2 text-[#F8E6A0]/80 hover:text-[#FFF9EA] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D9B77B]" />
          <span>Replay From Opening</span>
        </button>

        {/* Center Heart Ornament */}
        <div className="hidden sm:flex items-center gap-2 text-[#D9B77B]/40">
          <span>──</span>
          <Heart className="w-3 h-3 text-[#E11D48] fill-current" />
          <span>──</span>
        </div>

        {/* Right Navigation Destinations */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCurrentChapter('FINAL_GIFT')}
            className="flex items-center gap-1.5 text-[#F8E6A0]/80 hover:text-[#FFF9EA] transition-colors cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-[#D9B77B]" />
            <span>Back to 3D Gift Box</span>
          </button>

          <span className="text-[#D9B77B]/40">•</span>

          <button
            type="button"
            onClick={() => setCurrentChapter('ACT_7')}
            className="flex items-center gap-1.5 text-[#F8E6A0]/80 hover:text-[#FFF9EA] transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#D9AE50]" />
            <span>Re-read Letter</span>
          </button>

          <span className="text-[#D9B77B]/40">•</span>

          <button
            type="button"
            onClick={() => setCurrentChapter('FINAL_LOVE_LETTER')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9B77B]/20 border border-[#D9B77B]/50 text-[#F8E6A0] hover:text-[#FFF9EA] hover:bg-[#D9B77B]/30 transition-all cursor-pointer font-semibold shadow-xs"
          >
            <span>Our Final Universe ✨</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
