import React, { useState } from 'react';
import { KINGDOM_MARKETPLACE_PILLARS } from '../data/ecosystemData';
import { ZInsignia } from './ZInsignia';
import {
  ShoppingBag,
  Briefcase,
  Users,
  Handshake,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface KingdomMarketplaceProps {
  onRegisterInterest: () => void;
}

export const KingdomMarketplace: React.FC<KingdomMarketplaceProps> = ({
  onRegisterInterest,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>(
    KINGDOM_MARKETPLACE_PILLARS[0].name
  );

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Commerce':
        return ShoppingBag;
      case 'Services':
        return Briefcase;
      case 'Employment':
        return Users;
      case 'Partnerships':
        return Handshake;
      case 'Learning':
        return GraduationCap;
      case 'Impact':
        return Sparkles;
      default:
        return Sparkles;
    }
  };

  const currentPillar =
    KINGDOM_MARKETPLACE_PILLARS.find((p) => p.name === selectedPillar) ||
    KINGDOM_MARKETPLACE_PILLARS[0];

  return (
    <section id="marketplace" className="py-20 lg:py-28 bg-[#2D3A1E] text-[#F4F1EA] border-b border-[#3D4A26] relative overflow-hidden">
      {/* Background architectural lattice in gold/sage tones */}
      <div className="absolute inset-0 bg-z-lattice-dark pointer-events-none opacity-30" />

      {/* Large decorative Z emblem in gold */}
      <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-80 h-80 opacity-10 pointer-events-none">
        <ZInsignia size={320} variant="gold" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-semibold text-[#D4A017] mb-3">
            <span>Section 08</span>
            <span aria-hidden="true">·</span>
            <span>The Next Chapter</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] font-normal leading-tight">
            KINGDOM MARKETPLACE
          </h2>

          <p className="text-xl sm:text-2xl font-display italic text-[#D4A017] mt-3 font-normal">
            A wider faith-driven ecosystem—not another internal operating company.
          </p>

          <p className="text-base sm:text-lg text-[#EFEBE0]/90 mt-5 leading-relaxed font-light">
            A space where independent entrepreneurs, professionals, businesses and purpose-led
            organisations can connect, trade, collaborate, learn, find opportunity and multiply
            impact.
          </p>
        </div>

        {/* 6 Pillars Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {KINGDOM_MARKETPLACE_PILLARS.map((pillar) => {
            const isSelected = pillar.name === selectedPillar;
            const IconComponent = getPillarIcon(pillar.name);
            return (
              <button
                key={pillar.name}
                onClick={() => setSelectedPillar(pillar.name)}
                className={`p-5 text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#3D4A26] text-white border-[#D4A017] shadow-lg'
                    : 'bg-[#232D17]/80 text-[#EFEBE0] border-[#8C9E5E]/20 hover:border-[#D4A017]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent
                      className={`w-5 h-5 ${
                        isSelected ? 'text-[#D4A017]' : 'text-[#8C9E5E]'
                      }`}
                    />
                    {isSelected && (
                      <span className="w-1.5 h-1.5 bg-[#D4A017] rounded-full" />
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-wide">
                    {pillar.name}
                  </h3>
                </div>

                <div className="mt-4 pt-2 border-t border-current/15 text-[10px] uppercase font-semibold tracking-wider text-[#D4A017]">
                  {isSelected ? 'Active Pillar' : 'Select'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Card */}
        <div className="bg-[#1F2714] p-8 sm:p-10 border border-[#D4A017]/40 relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4A017] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Core Operational Pillar · {currentPillar.name}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F1EA]">
              Connecting Through {currentPillar.name}
            </h3>
            <p className="text-base text-[#EFEBE0]/90 font-light leading-relaxed">
              {currentPillar.summary}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRegisterInterest}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#1A1A1A] bg-[#D4A017] hover:bg-[#E5B842] transition-colors cursor-pointer shadow-md"
            >
              <span>Join Kingdom Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom 6-Pillar Ribbon */}
        <div className="mt-10 pt-6 border-t border-[#8C9E5E]/20 flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.2em] uppercase font-semibold text-[#8C9E5E]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {KINGDOM_MARKETPLACE_PILLARS.map((p, idx) => (
              <React.Fragment key={p.name}>
                <span className="hover:text-[#D4A017] transition-colors cursor-pointer" onClick={() => setSelectedPillar(p.name)}>
                  {p.name}
                </span>
                {idx < KINGDOM_MARKETPLACE_PILLARS.length - 1 && (
                  <span className="text-[#D4A017]/60">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <span className="font-mono text-[#EFEBE0]/60">BEZALEL INC / 19</span>
        </div>
      </div>
    </section>
  );
};
