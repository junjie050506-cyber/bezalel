import React, { useState } from 'react';
import { IMPACT_CHAIN, LEGACY_STATEMENTS } from '../data/ecosystemData';
import { ZInsignia } from './ZInsignia';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Heart, UserCheck } from 'lucide-react';

export const ImpactModel: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('01');

  const currentStepData = IMPACT_CHAIN.find((s) => s.step === activeStep) || IMPACT_CHAIN[0];

  return (
    <section id="impact" className="py-20 lg:py-28 bg-[#EFEBE0]/60 border-b border-[#3D4A26]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#3D4A26] mb-3">
            <span>Section 07</span>
            <span aria-hidden="true">·</span>
            <span>Social & Economic Impact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2D3A1E] font-normal leading-tight">
            Opportunity is the bridge from{' '}
            <span className="italic font-normal text-[#405329]">
              assistance to lasting change
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#2B2B2B]/85 mt-4 leading-relaxed font-normal">
            A learner can develop capability. Capability can become work or enterprise. Enterprise
            can create employment. Employment can strengthen households and communities.
          </p>
        </div>

        {/* 5-Step Value Chain Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {IMPACT_CHAIN.map((step, idx) => {
            const isSelected = step.step === activeStep;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`text-left p-5 border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3D4A26] text-white border-[#2D3A1E] shadow-md'
                    : 'bg-[#F4F1EA] text-[#1A1A1A] border-[#3D4A26]/15 hover:border-[#3D4A26]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                      }`}
                    >
                      {step.step}
                    </span>
                    {idx < IMPACT_CHAIN.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 opacity-40 hidden lg:block" />
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-wide">
                    {step.name}
                  </h3>
                  <p
                    className={`text-xs mt-1.5 line-clamp-2 ${
                      isSelected ? 'text-[#EFEBE0]/80' : 'text-[#2B2B2B]/75'
                    }`}
                  >
                    {step.actor}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between text-[10px] tracking-wider uppercase font-semibold">
                  <span>{isSelected ? 'Active Step' : 'Explore'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Value Chain Detail Card */}
        <div className="bg-[#2D3A1E] text-[#F4F1EA] p-8 sm:p-12 border border-[#3D4A26] relative mb-16">
          <div className="absolute inset-2 border border-[#8C9E5E]/20 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#8C9E5E] uppercase block">
                Stage {currentStepData.step} of 05
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#F4F1EA]">
                {currentStepData.name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#A3B86C] pt-1">
                Primary Agent: {currentStepData.actor}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <p className="text-base sm:text-lg text-[#EFEBE0]/95 font-light leading-relaxed">
                {currentStepData.description}
              </p>
              <div className="p-4 bg-[#3D4A26]/50 border border-[#8C9E5E]/20 text-xs text-[#8C9E5E] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  Multiplication mechanism: Moving beyond perpetual relief by cultivating generative autonomy.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: The Legacy We Seek (Page 24) */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#3D4A26] uppercase block mb-2">
              The Legacy We Seek
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#2D3A1E] font-medium leading-tight">
              Measured by what continues through people
            </h3>
            <p className="text-sm text-[#2B2B2B]/80 mt-2 font-normal">
              True success is not what remains within our organisation, but what people go on to
              create in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEGACY_STATEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#F4F1EA] border border-[#3D4A26]/15 hover:border-[#3D4A26]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#8C9E5E] block mb-2">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-lg font-semibold text-[#2D3A1E] block">
                    {item.entity}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-[#3D4A26]/10 flex items-center gap-2 text-sm text-[#3D4A26] font-medium">
                  <ArrowRight className="w-4 h-4 text-[#8C9E5E] shrink-0" />
                  <span>{item.outcome}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Legacy Footer Banner */}
          <div className="mt-8 p-6 bg-[#3D4A26] text-white text-center border border-[#2D3A1E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ZInsignia size={28} variant="sage" />
              <span className="font-display text-lg tracking-wider font-semibold">
                A LEGACY THAT CONTINUES THROUGH PEOPLE.
              </span>
            </div>
            <span className="text-xs font-mono text-[#A3B86C]">BEZALEL INC / 24</span>
          </div>
        </div>
      </div>
    </section>
  );
};
