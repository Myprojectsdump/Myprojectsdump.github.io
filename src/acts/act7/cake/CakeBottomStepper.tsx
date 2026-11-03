// src/acts/act7/cake/CakeBottomStepper.tsx

import React from 'react';
import { useExperienceStore } from '../../../store/useExperienceStore';

const STEP_LABELS = [
  { step: 1, label: 'Base' },
  { step: 2, label: 'Cream' },
  { step: 3, label: 'Fruits' },
  { step: 4, label: 'Toppings' },
  { step: 5, label: 'Ribbon' },
  { step: 6, label: 'Candle' },
];

export const CakeBottomStepper: React.FC = () => {
  const currentStep = useExperienceStore((state) => state.cakeAssemblyStep);
  const setCakeAssemblyStep = useExperienceStore((state) => state.setCakeAssemblyStep);

  return (
    <div
      aria-label="Cake Assembly Progress"
      className="inline-flex items-center gap-1 sm:gap-3 px-4 py-2 rounded-full bg-[#120B05]/80 backdrop-blur-md border border-[#D9AE50]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none"
    >
      {STEP_LABELS.map((item, index) => {
        const isCompleted = currentStep > item.step;
        const isCurrent = currentStep === item.step;

        return (
          <React.Fragment key={item.step}>
            {/* Step Checkpoint Button */}
            <button
              type="button"
              onClick={() => setCakeAssemblyStep(item.step)}
              className="flex items-center gap-1.5 focus:outline-none group cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#D9AE50] text-[#140A00] font-bold ring-2 ring-[#D9AE50]/60 scale-110 shadow-[0_0_8px_#D9AE50]'
                    : isCompleted
                    ? 'bg-[#D9AE50]/40 text-[#F8E6A0] border border-[#D9AE50]'
                    : 'bg-white/10 text-white/40 border border-white/20'
                }`}
              >
                {item.step}
              </div>
              <span
                className={`text-[11px] font-mono transition-colors hidden sm:inline ${
                  isCurrent
                    ? 'text-[#F8E6A0] font-bold'
                    : isCompleted
                    ? 'text-[#FFF9EA]/80'
                    : 'text-[#FFF9EA]/40'
                }`}
              >
                {item.label}
              </span>
            </button>

            {/* Connecting Line */}
            {index < STEP_LABELS.length - 1 && (
              <div
                className={`w-3 sm:w-6 h-[1.5px] transition-colors duration-300 ${
                  currentStep > item.step ? 'bg-[#D9AE50]' : 'bg-white/15'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
