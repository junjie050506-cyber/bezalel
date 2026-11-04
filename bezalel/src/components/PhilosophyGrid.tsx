import React, { useState } from 'react';
import { PHILOSOPHY_ACRONYM } from '../data/ecosystemData';
import { ZInsignia } from './ZInsignia';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export const PhilosophyGrid: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('B');

  const activePhilosophy =
    PHILOSOPHY_ACRONYM.find((item) => item.letter === selectedLetter) || PHILOSOPHY_ACRONYM[0];

  return (
    <section id="philosophy" className="py-20 lg:py-28 bg-[#F4F1EA] border-b border-[#3D4A26]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#3D4A26] mb-3">
            <span>Section 04</span>
            <span aria-hidden="true">·</span>
            <span>Secondary Brand Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2D3A1E] font-normal leading-tight">
            The BEZALEL Philosophy
          </h2>
          <p className="text-base sm:text-lg text-[#2B2B2B]/85 mt-4 leading-relaxed font-normal">
            The biblical meaning of Bezalel remains primary. As a secondary brand philosophy, the
            letters of BEZALEL express the Group’s journey from developing a person to creating a
            multiplying legacy.
          </p>
        </div>

        {/* 7-Card Horizontal/Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {PHILOSOPHY_ACRONYM.map((item, idx) => {
            const isSelected = item.letter === selectedLetter && idx === PHILOSOPHY_ACRONYM.findIndex(p => p === item);
            return (
              <button
                key={`${item.letter}-${idx}`}
                onClick={() => setSelectedLetter(item.letter)}
                className={`text-left p-4 sm:p-5 border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#3D4A26] text-white border-[#2D3A1E] shadow-md translate-y-[-2px]'
                    : 'bg-[#EFEBE0] text-[#1A1A1A] border-[#3D4A26]/15 hover:border-[#3D4A26]/40 hover:bg-[#EFEBE0]/90'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#8C9E5E]" />
                )}

                <span
                  className={`font-display text-3xl sm:text-4xl font-bold block mb-1 ${
                    isSelected ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                  }`}
                >
                  {item.letter}
                </span>

                <span className="text-xs font-semibold tracking-wider uppercase line-clamp-1">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Card */}
        <div className="bg-[#2D3A1E] text-[#F4F1EA] p-8 sm:p-12 border border-[#3D4A26] relative overflow-hidden">
          {/* Subtle inner frame */}
          <div className="absolute inset-2 border border-[#8C9E5E]/20 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3 flex items-center justify-center lg:justify-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#3D4A26] border-2 border-[#8C9E5E]/40 flex items-center justify-center font-display text-6xl sm:text-7xl font-bold text-[#8C9E5E]">
                {activePhilosophy.letter}
              </div>
            </div>

            <div className="lg:col-span-9 space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#8C9E5E]">
                <span>Brand Principle</span>
                <span aria-hidden="true">·</span>
                <span>Active Expression</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA] font-normal tracking-wide">
                {activePhilosophy.letter} — {activePhilosophy.title}
              </h3>

              <p className="text-lg text-[#EFEBE0]/95 font-light leading-relaxed">
                {activePhilosophy.description}
              </p>

              <div className="pt-4 border-t border-[#8C9E5E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-[#8C9E5E]">
                  <Sparkles className="w-4 h-4 text-[#8C9E5E] shrink-0" />
                  <span className="italic">{activePhilosophy.implication}</span>
                </div>
                <span className="text-xs font-mono text-[#EFEBE0]/60 shrink-0">
                  Step {PHILOSOPHY_ACRONYM.findIndex((p) => p.letter === activePhilosophy.letter) + 1} of 7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Axiom Footer */}
        <div className="mt-8 p-4 bg-[#EFEBE0] border border-[#3D4A26]/15 flex flex-col sm:flex-row items-center justify-between text-xs tracking-wider uppercase font-semibold text-[#3D4A26] gap-2">
          <span>BUILD PEOPLE → EQUIP POTENTIAL → MULTIPLY LEGACY</span>
          <span className="font-mono text-[11px] text-[#2B2B2B]/70">BEZALEL INC / 08</span>
        </div>
      </div>
    </section>
  );
};
