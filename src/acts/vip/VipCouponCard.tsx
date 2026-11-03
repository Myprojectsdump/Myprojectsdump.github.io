// src/acts/vip/VipCouponCard.tsx

import React from 'react';
import { CheckCircle2, RotateCcw, Heart, Crown, Sparkles } from 'lucide-react';
import { VipCouponData, RedemptionGuidanceMeta } from '../../types/story.types';

// =============================================================================
// MINIATURE HEIRLOOM KEEPSAKE TOKENS (Matching Visual Reference)
// =============================================================================

const PerfumeRosesToken: React.FC = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-md overflow-visible">
    <defs>
      <linearGradient id="perfumeGlass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF7EB" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#E9BA76" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="perfumeGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFE899" />
        <stop offset="100%" stopColor="#C99427" />
      </linearGradient>
    </defs>
    {/* Bottle Body */}
    <rect x="13" y="19" width="22" height="23" rx="4.5" fill="url(#perfumeGlass)" stroke="#A06E2B" strokeWidth="1.2" />
    <rect x="16" y="23" width="16" height="15" rx="2" fill="none" stroke="#D9A865" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
    {/* Atomizer Neck & Cap */}
    <rect x="20" y="14" width="8" height="5" rx="1.2" fill="url(#perfumeGold)" stroke="#78500C" strokeWidth="0.8" />
    <rect x="22" y="10" width="4" height="4" rx="1" fill="url(#perfumeGold)" />
    {/* Delicate Rose cluster on bottom corner */}
    <circle cx="11" cy="37" r="5.5" fill="#F472B6" opacity="0.95" />
    <circle cx="15" cy="41" r="4.5" fill="#FB7185" opacity="0.95" />
    <circle cx="11" cy="37" r="2.2" fill="#FDA4AF" />
    <path d="M 8 36 Q 11 33 14 36" stroke="#9F1239" strokeWidth="0.8" fill="none" />
  </svg>
);

const PopcornCinemaToken: React.FC = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-md overflow-visible">
    <defs>
      <linearGradient id="popcornStripes" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8A1327" />
        <stop offset="25%" stopColor="#FAF5EE" />
        <stop offset="50%" stopColor="#8A1327" />
        <stop offset="75%" stopColor="#FAF5EE" />
        <stop offset="100%" stopColor="#8A1327" />
      </linearGradient>
    </defs>
    {/* Popcorn container */}
    <polygon points="10,21 13,43 31,43 34,21" fill="url(#popcornStripes)" stroke="#590C19" strokeWidth="1.2" />
    {/* Fluffy Popcorn kernels on top */}
    <circle cx="15" cy="18" r="4.2" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
    <circle cx="21" cy="14" r="4.8" fill="#FEF08A" stroke="#B45309" strokeWidth="0.8" />
    <circle cx="28" cy="17" r="4.2" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
    <circle cx="22" cy="19" r="3.2" fill="#FBBF24" />
    {/* Film Slate tilted */}
    <polygon points="27,27 43,23 41,38 25,42" fill="#180E04" stroke="#D9B77B" strokeWidth="1" />
    <path d="M 27 27 L 43 23 L 42 27 L 26 31 Z" fill="#D9B77B" />
  </svg>
);

const VintagePhoneToken: React.FC = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-md overflow-visible">
    <defs>
      <linearGradient id="phoneGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="50%" stopColor="#D9A84E" />
        <stop offset="100%" stopColor="#8C6514" />
      </linearGradient>
    </defs>
    {/* Handset arc */}
    <path d="M 7 19 C 9 11, 31 11, 37 19 C 33 23, 29 21, 28 19 C 23 17, 17 17, 14 19 C 13 21, 9 23, 7 19 Z" fill="url(#phoneGold)" stroke="#60400C" strokeWidth="1.2" />
    {/* Phone Base */}
    <polygon points="13,24 31,24 35,40 9,40" fill="url(#phoneGold)" stroke="#60400C" strokeWidth="1.2" />
    <circle cx="22" cy="32" r="4.8" fill="#FFF9EA" stroke="#78500C" strokeWidth="0.8" />
    {/* Coiled Cord forming a heart */}
    <path d="M 31 37 C 37 41, 43 37, 41 31 C 39 27, 35 33, 37 35" fill="none" stroke="#D9A84E" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const MasqueradeMaskToken: React.FC = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-md overflow-visible">
    <defs>
      <linearGradient id="maskFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2F0918" />
        <stop offset="50%" stopColor="#18040E" />
        <stop offset="100%" stopColor="#0A0105" />
      </linearGradient>
    </defs>
    {/* Seductive Mask Wings */}
    <path d="M 6 22 C 12 16, 18 18, 24 23 C 30 18, 36 16, 42 22 C 44 32, 34 38, 24 32 C 14 38, 4 32, 6 22 Z" fill="url(#maskFill)" stroke="#B98278" strokeWidth="1.4" />
    {/* Eye Openings */}
    <ellipse cx="14" cy="24" rx="4" ry="2.5" fill="#FFE8D6" opacity="0.3" />
    <ellipse cx="34" cy="24" rx="4" ry="2.5" fill="#FFE8D6" opacity="0.3" />
    {/* Delicate Gold filigree */}
    <path d="M 10 20 Q 14 16 19 20" stroke="#FDE047" strokeWidth="0.9" fill="none" />
    <path d="M 38 20 Q 34 16 29 20" stroke="#FDE047" strokeWidth="0.9" fill="none" />
  </svg>
);

const RedLipsToken: React.FC = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-md overflow-visible">
    <defs>
      <linearGradient id="kissGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF2E55" />
        <stop offset="50%" stopColor="#D90429" />
        <stop offset="100%" stopColor="#7A0015" />
      </linearGradient>
    </defs>
    {/* Upper Lip */}
    <path d="M 8 23 C 14 16, 18 18, 24 21 C 30 18, 34 16, 40 23 C 34 25, 30 23, 24 25 C 18 23, 14 25, 8 23 Z" fill="url(#kissGrad)" />
    {/* Lower Lip */}
    <path d="M 10 25 C 16 35, 32 35, 38 25 C 30 29, 18 29, 10 25 Z" fill="url(#kissGrad)" />
    {/* Glossy Lip Sheen */}
    <ellipse cx="24" cy="28.5" rx="5" ry="1.2" fill="#FFA5B5" opacity="0.6" />
  </svg>
);

const HandcuffsToken: React.FC = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 drop-shadow-md overflow-visible">
    <defs>
      <linearGradient id="cuffsGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF3B8" />
        <stop offset="50%" stopColor="#D9A84E" />
        <stop offset="100%" stopColor="#7A560E" />
      </linearGradient>
    </defs>
    {/* Left Open Cuff */}
    <circle cx="16" cy="25" r="8.5" fill="none" stroke="url(#cuffsGrad)" strokeWidth="2.8" />
    <rect x="13.5" y="15" width="5" height="3" rx="1" fill="url(#cuffsGrad)" stroke="#60400C" strokeWidth="0.8" />
    {/* Right Open Cuff */}
    <circle cx="32" cy="27" r="8.5" fill="none" stroke="url(#cuffsGrad)" strokeWidth="2.8" />
    <rect x="29.5" y="17" width="5" height="3" rx="1" fill="url(#cuffsGrad)" stroke="#60400C" strokeWidth="0.8" />
    {/* Interlocking Link */}
    <path d="M 23 25.5 L 26 27" stroke="url(#cuffsGrad)" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
);

// Token selector based on coupon code / id
const renderPassToken = (id: string, isSweet: boolean) => {
  switch (id) {
    case 'vip-01':
      return <PerfumeRosesToken />;
    case 'vip-02':
      return <PopcornCinemaToken />;
    case 'vip-03':
      return <VintagePhoneToken />;
    case 'vip-04':
      return <MasqueradeMaskToken />;
    case 'vip-05':
      return <RedLipsToken />;
    case 'vip-06':
      return <HandcuffsToken />;
    default:
      return isSweet ? (
        <Crown className="w-8 h-8 text-[#D9B77B]" />
      ) : (
        <Heart className="w-8 h-8 text-[#E11D48] fill-current" />
      );
  }
};

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface VipCouponCardProps {
  coupon: VipCouponData;
  isFlipped: boolean;
  onToggleFlip: () => void;
  isClaimed: boolean;
  claimedAtIso?: string | null;
  guidance?: RedemptionGuidanceMeta;
  onRedeem: () => void;
  onUnclaim: () => void;
  tierType: 'sweet' | 'spicy';
}

export const VipCouponCard: React.FC<VipCouponCardProps> = ({
  coupon,
  isFlipped,
  onToggleFlip,
  isClaimed,
  claimedAtIso,
  guidance,
  onRedeem,
  onUnclaim,
  tierType,
}) => {
  const isSweet = tierType === 'sweet';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleFlip();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${coupon.title} - ${isClaimed ? 'Claimed' : 'Available'} ${coupon.tier} Pass`}
      aria-expanded={isFlipped}
      onKeyDown={handleKeyDown}
      onClick={onToggleFlip}
      className="relative w-full min-h-[215px] sm:min-h-[225px] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D9B77B] rounded-2xl transition-all duration-300 hover:-translate-y-1 select-none"
    >
      {/* ===================================================================== */}
      {/* 1. FRONT FACE: LUXURIOUS KEEPSAKE VOUCHER TICKET (Reference Matching) */}
      {/* ===================================================================== */}
      <div
        className={`w-full h-full min-h-[215px] sm:min-h-[225px] p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden border-2 transition-all duration-300 ${
          isFlipped ? 'hidden pointer-events-none' : 'relative flex'
        } ${
          isSweet
            ? 'bg-gradient-to-br from-[#FFFDF8] via-[#FAF3E6] to-[#F2E5D0] text-[#241308] border-[#D9B77B] shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-br from-[#2D0B18] via-[#1E0610] to-[#120309] text-[#FFF9EA] border-[#B98278]/80 shadow-[0_8px_30px_rgba(45,11,24,0.6)]'
        }`}
      >
        {/* Inner Filigree Inset Border */}
        <div
          className={`absolute inset-2 sm:inset-2.5 rounded-xl pointer-events-none border ${
            isSweet ? 'border-[#C99A45]/40' : 'border-[#B98278]/35'
          }`}
        >
          {/* Ornate Corner Accents */}
          <div className="absolute top-0.5 left-0.5 w-3 h-3 border-t-2 border-l-2 border-[#D9AE50]" />
          <div className="absolute top-0.5 right-0.5 w-3 h-3 border-t-2 border-r-2 border-[#D9AE50]" />
          <div className="absolute bottom-0.5 left-0.5 w-3 h-3 border-b-2 border-l-2 border-[#D9AE50]" />
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 border-b-2 border-r-2 border-[#D9AE50]" />
        </div>

        {/* Top-Border Draped Velvet Ribbon Banner */}
        <div className="absolute top-0 inset-x-0 h-4 pointer-events-none overflow-hidden z-10 flex items-center justify-center">
          <svg viewBox="0 0 200 16" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={isSweet ? 'sweetTopRibbon' : 'spicyTopRibbon'} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isSweet ? '#7A1326' : '#3A0510'} />
                <stop offset="50%" stopColor={isSweet ? '#A8233C' : '#6A0F1E'} />
                <stop offset="100%" stopColor={isSweet ? '#7A1326' : '#3A0510'} />
              </linearGradient>
            </defs>
            <path d="M 0 0 L 200 0 L 195 10 Q 100 16 5 10 Z" fill={`url(#${isSweet ? 'sweetTopRibbon' : 'spicyTopRibbon'})`} />
          </svg>
        </div>

        {/* Top-Center Crown Brooch Pin (Over the ribbon) */}
        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center">
          <div className="w-7 h-5 rounded-b-md bg-gradient-to-b from-[#FFE899] to-[#C99427] border border-[#8C6514] flex items-center justify-center shadow-md">
            {isSweet ? (
              <Crown className="w-3.5 h-3.5 text-[#4A2D03]" />
            ) : (
              <Heart className="w-3 h-3 text-[#701020] fill-current" />
            )}
          </div>
        </div>

        {/* Right-Edge Embedded Burgundy Wax Seal */}
        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg border-2 ${
              isSweet
                ? 'bg-gradient-to-br from-[#9E1A33] via-[#7A1326] to-[#4A0A16] border-[#D9AE50]/70'
                : 'bg-gradient-to-br from-[#7A1124] via-[#5C0A1A] to-[#30050D] border-[#B98278]/70'
            }`}
          >
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center shadow-inner">
              <Heart className="w-3.5 h-3.5 text-[#FDE047] fill-current drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* Bottom-Left Keepsake Miniature Token */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 pointer-events-none">
          {renderPassToken(coupon.id, isSweet)}
        </div>

        {/* =================================================================== */}
        {/* PROTECTED TEXT CONTENT AREA (Guaranteed Zero Overlap) */}
        {/* =================================================================== */}
        <div className="relative z-10 flex flex-col justify-between h-full pl-13 sm:pl-15 pr-11 sm:pr-13 pt-3">
          {/* Top Line: Golden Monospace Code Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-widest border shadow-xs ${
                isSweet
                  ? 'bg-[#D9B77B]/25 text-[#5C3A0A] border-[#D9B77B]/70'
                  : 'bg-[#B98278]/25 text-[#F8E6A0] border-[#B98278]/60'
              }`}
            >
              {coupon.code}
            </span>
            <span
              className={`text-[9px] font-mono tracking-widest uppercase opacity-75 ${
                isSweet ? 'text-[#8C5D19]' : 'text-[#B98278]'
              }`}
            >
              {isSweet ? 'Princess Tier' : '18+ Spicy'}
            </span>
          </div>

          {/* Center Info: Romantic Title & Description */}
          <div className="my-auto py-1 flex flex-col gap-1">
            <h4
              className={`text-base sm:text-lg font-serif font-bold tracking-tight leading-snug line-clamp-1 ${
                isSweet ? 'text-[#2C1607]' : 'text-[#FFF9EA]'
              }`}
            >
              {coupon.title}
            </h4>

            <p
              className={`text-[11px] sm:text-xs font-serif leading-relaxed line-clamp-2 ${
                isSweet ? 'text-[#4A2E19]' : 'text-[#E5D2C2]'
              }`}
            >
              {coupon.description}
            </p>
          </div>

          {/* Bottom Status / Stamp Bar */}
          <div
            className={`flex items-center justify-between text-[10px] sm:text-[11px] font-mono pt-1.5 border-t ${
              isSweet ? 'border-[#D9B77B]/30' : 'border-[#B98278]/25'
            }`}
          >
            {/* Status / Claim Stamp */}
            {isClaimed ? (
              <span className="font-bold flex items-center gap-1 text-[#C5162D] animate-in zoom-in-95">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5162D]" />
                <span className="tracking-wider uppercase">Redeemed</span>
              </span>
            ) : (
              <span
                className={`flex items-center gap-1 font-semibold ${
                  isSweet ? 'text-[#8C5D19]' : 'text-[#B98278]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#D9AE50]" />
                <span>Unlocked</span>
              </span>
            )}

            {/* Click to Flip Prompt */}
            <span
              className={`underline tracking-wider group-hover:scale-105 transition-transform flex items-center gap-1 text-[10px] ${
                isSweet ? 'text-[#8C5D19]' : 'text-[#F8E6A0]'
              }`}
            >
              <span>View Voucher</span>
              <span className="text-[11px]">↺</span>
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. BACK FACE: OFFICIAL VIP VOUCHER & CLAIM ACTIONS (Zero Overlap) */}
      {/* ===================================================================== */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full h-full min-h-[215px] sm:min-h-[225px] p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden border-2 transition-all duration-300 ${
          isFlipped ? 'relative flex' : 'hidden pointer-events-none'
        } ${
          isSweet
            ? 'bg-[#FFFDF7] text-[#241308] border-[#D9B77B] shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'bg-[#260B16] text-[#FFF9EA] border-[#B98278] shadow-[0_8px_30px_rgba(45,11,24,0.6)]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between pb-2 border-b ${
            isSweet ? 'border-[#241308]/15' : 'border-[#B98278]/25'
          }`}
        >
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
              isSweet ? 'text-[#7A1326]' : 'text-[#E11D48]'
            }`}
          >
            {isSweet ? 'OFFICIAL VIP VOUCHER' : 'AFTER-MIDNIGHT PASS'}
          </span>
          <span
            className={`font-mono text-xs font-bold ${
              isSweet ? 'text-[#A8233C]' : 'text-[#F43F5E]'
            }`}
          >
            {coupon.code}
          </span>
        </div>

        {/* Voucher Core Info */}
        <div className="flex flex-col gap-1 my-auto py-1">
          <h4
            className={`text-sm sm:text-base font-serif font-bold tracking-tight line-clamp-1 ${
              isSweet ? 'text-[#1F1206]' : 'text-[#FFF9EA]'
            }`}
          >
            {coupon.title}
          </h4>

          <div
            className={`text-[11px] font-mono space-y-0.5 ${
              isSweet ? 'text-[#4A2E19]' : 'text-[#E5D2C2]'
            }`}
          >
            <div>
              <span className="opacity-60">Holder:</span> Uci (Pacarku)
            </div>
            <div>
              <span className="opacity-60">Terms:</span>{' '}
              <span className="font-semibold">
                {isSweet
                  ? 'Never Expires'
                  : 'Always mutual. Either of us can say "not now".'}
              </span>
            </div>
            {guidance && (
              <div className="text-[10px] opacity-80 italic font-serif pt-0.5 line-clamp-1">
                {guidance.guidanceNote}
              </div>
            )}
          </div>

          {/* Physical Ink Impression Stamp */}
          {isClaimed ? (
            <div
              className={`my-1 px-2.5 py-1 rounded-lg border-2 border-dashed text-center animate-in zoom-in-95 rotate-[-1.5deg] shadow-xs ${
                isSweet
                  ? 'border-[#9E1A33] bg-[#9E1A33]/10 text-[#9E1A33]'
                  : 'border-[#E11D48] bg-[#E11D48]/15 text-[#FDA4AF]'
              }`}
            >
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase block">
                {isSweet ? 'CLAIMED & REDEEMED' : 'CLAIMED FOR TONIGHT / REUNION'}
              </span>
              <span className="text-[9px] font-mono opacity-80 block">
                {claimedAtIso ? new Date(claimedAtIso).toLocaleDateString() : 'Active'}
              </span>
            </div>
          ) : (
            <div
              className={`my-1 px-2 py-0.5 rounded-lg border border-dashed text-center ${
                isSweet
                  ? 'border-[#241308]/30 text-[#241308]/70'
                  : 'border-white/20 text-white/60'
              }`}
            >
              <span className="text-[10px] font-mono font-semibold tracking-wider uppercase">
                {isSweet ? 'READY TO REDEEM' : 'UNRESTRICTED ACCESS'}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col gap-1.5 pt-2 border-t ${
            isSweet ? 'border-[#241308]/15' : 'border-[#B98278]/25'
          }`}
        >
          {!isClaimed ? (
            <button
              type="button"
              onClick={onRedeem}
              className={`w-full py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-98 ${
                isSweet
                  ? 'bg-[#180E04] text-[#FFF9EA] hover:bg-[#2A1809]'
                  : 'bg-gradient-to-r from-[#A8233C] to-[#E11D48] text-[#FFF9EA] hover:brightness-110 shadow-[0_0_15px_rgba(225,29,72,0.4)]'
              }`}
            >
              {isSweet ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9AE50]" />
              ) : (
                <Heart className="w-3.5 h-3.5 fill-current text-white" />
              )}
              <span>{isSweet ? 'Redeem This Pass' : 'Claim This Pass'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onUnclaim}
              className={`text-[10px] font-mono underline text-center py-0.5 transition-colors cursor-pointer ${
                isSweet
                  ? 'text-[#7A1326] hover:text-[#9E1A33]'
                  : 'text-[#FDA4AF] hover:text-white'
              }`}
            >
              Reset / Unclaim Pass
            </button>
          )}

          <button
            type="button"
            onClick={onToggleFlip}
            className={`w-full py-0.5 text-[10px] font-mono text-center transition-colors cursor-pointer flex items-center justify-center gap-1 opacity-75 hover:opacity-100 ${
              isSweet ? 'text-[#4A2E19]' : 'text-white'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Flip Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
