// src/acts/act7/cake/CakeStepPanel.tsx

import React from 'react';
import { ChefHat, Check, ChevronRight, Sparkles } from 'lucide-react';
import { useExperienceStore } from '../../../store/useExperienceStore';

export interface CakeStepItem {
  step: number;
  title: string;
  subtitle: string;
  iconSvg: string;
}

export const CAKE_STEPS: CakeStepItem[] = [
  { step: 1, title: 'Choose Cake Base', subtitle: 'Gourmet artisan sponge', iconSvg: '🎂' },
  { step: 2, title: 'Add Cream Layer', subtitle: 'Whipped vanilla & chocolate drip', iconSvg: '🍦' },
  { step: 3, title: 'Decorate with Fruits', subtitle: 'Strawberries & blueberries', iconSvg: '🍓' },
  { step: 4, title: 'Chocolate & Toppings', subtitle: 'Chocolate curls & gold hearts', iconSvg: '🍫' },
  { step: 5, title: 'Final Ribbon & Bow', subtitle: 'Burgundy bow & plaque "Happy Birthday Uci ♡"', iconSvg: '🎀' },
  { step: 6, title: 'Place the Candle', subtitle: 'Candle with starlight heart aura', iconSvg: '🕯️' },
];

export const FLAVOR_OPTIONS = [
  { id: 'vanilla' as const, name: 'Vanilla', color: '#FDF8E1' },
  { id: 'chocolate' as const, name: 'Chocolate', color: '#4E2F1D' },
  { id: 'red-velvet' as const, name: 'Red Velvet', color: '#881337' },
  { id: 'strawberry' as const, name: 'Strawberry', color: '#FDA4AF' },
];

export const CakeStepPanel: React.FC = () => {
  const currentStep = useExperienceStore((state) => state.cakeAssemblyStep);
  const setCakeAssemblyStep = useExperienceStore((state) => state.setCakeAssemblyStep);
  const cakeBaseType = useExperienceStore((state) => state.cakeBaseType);
  const setCakeBaseType = useExperienceStore((state) => state.setCakeBaseType);

  const handleStepClick = (step: number) => {
    setCakeAssemblyStep(step);
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCakeAssemblyStep(currentStep + 1);
    }
  };

  const handleCompleteAll = () => {
    setCakeAssemblyStep(6);
  };

  return (
    <aside
      aria-label="Build Your Cake"
      className="w-full max-w-[270px] sm:max-w-[290px] p-3.5 rounded-2xl bg-[#140E08]/90 backdrop-blur-md border border-[#D9AE50]/40 shadow-[0_12px_32px_rgba(0,0,0,0.7)] flex flex-col gap-2.5 text-[#FFF9EA]"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-[#D9AE50]/20 pb-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D9AE50]/30 to-[#E9B85B]/10 border border-[#D9AE50]/50 flex items-center justify-center text-[#F8E6A0]">
          <ChefHat className="w-4 h-4 text-[#F8E6A0]" />
        </div>
        <div>
          <h3 className="font-serif text-base font-medium text-[#FFF9EA] tracking-wide leading-tight">
            Build Your Cake
          </h3>
          <p className="text-[10px] font-sans text-[#FFF9EA]/60">
            Create your birthday cake step by step
          </p>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-1">
        {CAKE_STEPS.map((stepItem) => {
          const isDone = currentStep > stepItem.step;
          const isCurrent = currentStep === stepItem.step;

          return (
            <button
              key={stepItem.step}
              type="button"
              onClick={() => handleStepClick(stepItem.step)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left transition-all duration-200 ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#D9AE50]/25 to-[#E9B85B]/15 border-[#D9AE50] shadow-[0_0_10px_rgba(217,174,80,0.3)]'
                  : isDone
                  ? 'bg-[#1E160C]/60 border-[#D9AE50]/25 hover:border-[#D9AE50]/50'
                  : 'bg-[#181109]/30 border-white/5 opacity-55 hover:opacity-85'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm select-none">{stepItem.iconSvg}</span>
                <div>
                  <span className="text-xs font-mono font-medium text-[#FFF9EA] block leading-tight">
                    {stepItem.step}. {stepItem.title}
                  </span>
                  <span className="text-[9px] text-[#FFF9EA]/50 block leading-tight">
                    {stepItem.subtitle}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0 ml-1">
                {isDone ? (
                  <div className="w-4 h-4 rounded-full bg-[#D9AE50]/25 border border-[#D9AE50] flex items-center justify-center text-[#F8E6A0]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-[#D9AE50] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D9AE50] animate-pulse" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/20" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Flavor Options when on Step 1 */}
      {currentStep === 1 && (
        <div className="p-2 rounded-xl bg-[#1C140A]/95 border border-[#D9AE50]/35 space-y-1.5 animate-in fade-in duration-200">
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#D9AE50] block">
            Select Sponge Flavor:
          </span>
          <div className="grid grid-cols-2 gap-1">
            {FLAVOR_OPTIONS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCakeBaseType(f.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all text-left flex items-center gap-1.5 border ${
                  cakeBaseType === f.id
                    ? 'bg-[#D9AE50]/30 border-[#D9AE50] text-[#FFF9EA] font-semibold'
                    : 'bg-black/40 border-white/10 text-[#FFF9EA]/70 hover:bg-white/5'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full border border-white/30 flex-shrink-0"
                  style={{ backgroundColor: f.color }}
                />
                <span className="truncate">{f.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="pt-1.5 flex items-center justify-between border-t border-[#D9AE50]/20">
        {currentStep < 6 ? (
          <>
            <button
              type="button"
              onClick={handleCompleteAll}
              className="text-[10px] font-mono text-[#D9AE50]/80 hover:text-[#D9AE50] underline underline-offset-4"
            >
              Finish Cake Quickly ✨
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#D9AE50] to-[#E9B85B] text-[#140A00] font-mono text-xs font-bold hover:brightness-110 transition-all shadow-[0_2px_8px_rgba(217,174,80,0.3)]"
            >
              <span>Next</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </>
        ) : (
          <div className="w-full text-center py-0.5 flex items-center justify-center gap-1 text-[11px] font-mono text-[#F8E6A0]">
            <Sparkles className="w-3 h-3" />
            <span>Cake is ready! Blow the candle on the right →</span>
          </div>
        )}
      </div>
    </aside>
  );
};
