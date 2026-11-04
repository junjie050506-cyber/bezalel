import React from 'react';
import { ZInsignia } from './ZInsignia';
import { ArrowDown, ArrowRight, FileText, Sparkles, Building2, Users2, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreBusinesses: () => void;
  onExploreStory: () => void;
  onOpenPdf: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreBusinesses,
  onExploreStory,
  onOpenPdf,
  onOpenInquiry,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#F4F1EA] border-b border-[#3D4A26]/15 py-16 sm:py-24 lg:py-28">
      {/* Background architectural lattice texture */}
      <div className="absolute inset-0 bg-z-lattice pointer-events-none opacity-40" />

      {/* Decorative top-right architectural emblem accent */}
      <div className="absolute -top-12 -right-12 w-96 h-96 opacity-10 pointer-events-none hidden md:block">
        <ZInsignia size={384} variant="olive" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Eyebrow without pills */}
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#3D4A26] font-semibold mb-6">
          <span className="w-8 h-[1px] bg-[#3D4A26]/40" />
          <span>Group Company Profile · 2026</span>
          <span aria-hidden="true">·</span>
          <span>Bezalel Inc</span>
        </div>

        {/* 2-Column Desktop Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Headline & Value Proposition Column */}
          <div className="lg:col-span-7 flex flex-col space-y-7">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#2D3A1E] text-balance">
              EQUIP PEOPLE.{' '}
              <span className="block text-[#3D4A26] font-medium">STRENGTHEN ENTERPRISE.</span>{' '}
              <span className="block text-[#8C9E5E] italic">MULTIPLY OPPORTUNITY.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#2B2B2B]/90 font-normal leading-relaxed max-w-2xl text-balance">
              A purpose-led ecosystem built around people and enterprise. We develop human
              potential and enterprise capability to build sustainable opportunity.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreBusinesses}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#3D4A26] hover:bg-[#2D3A1E] transition-all shadow-xs group cursor-pointer"
              >
                <span>Discover Our Businesses</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onExploreStory}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#2D3A1E] border border-[#3D4A26]/30 bg-transparent hover:bg-[#EFEBE0] transition-colors cursor-pointer"
              >
                <span>Our Story</span>
              </button>

              <button
                type="button"
                onClick={onOpenPdf}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-medium tracking-wide text-[#3D4A26] hover:text-[#2D3A1E] transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#8C9E5E]" />
                <span className="underline underline-offset-4 decoration-[#8C9E5E]/60">Read 2026 Profile (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Founder Quote & Classical Framing Box */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="relative bg-[#2D3A1E] text-[#F4F1EA] p-8 sm:p-10 shadow-lg border border-[#3D4A26]">
              {/* Inner classical hairline frame */}
              <div className="absolute inset-2 border border-[#8C9E5E]/20 pointer-events-none" />

              <div className="relative z-10 flex flex-col space-y-5">
                <div className="flex items-center justify-between border-b border-[#8C9E5E]/30 pb-4">
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C9E5E] uppercase">
                    Founder Perspective
                  </span>
                  <ZInsignia size={24} variant="sage" />
                </div>

                <blockquote className="font-display text-xl sm:text-2xl italic leading-relaxed text-[#F4F1EA]/95">
                  “Entrepreneurship is how I think. People are at the heart of what I build.
                  Purpose is why I build it.”
                </blockquote>

                <div className="pt-2 border-t border-[#8C9E5E]/20 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8C9E5E]/20 border border-[#8C9E5E]/40 flex items-center justify-center font-display text-lg font-bold text-[#A3B86C] shrink-0">
                    LM
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#F4F1EA] tracking-wide">
                      Lalitha Manoharan
                    </h2>
                    <p className="text-xs text-[#8C9E5E] tracking-wider uppercase mt-0.5">
                      Founder & Chief Servant Officer (CSO)
                    </p>
                    <p className="text-xs text-[#EFEBE0]/70 mt-1">
                      Entrepreneur · Psychotherapist · Trainer · Coach · Facilitator
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Trigger */}
            <div className="bg-[#EFEBE0] border border-[#3D4A26]/15 p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#3D4A26]">
                  Looking to Partner or Engage?
                </p>
                <p className="text-xs text-[#2B2B2B]/80 mt-0.5">
                  Schools, enterprise leaders, parents, or entrepreneurs.
                </p>
              </div>
              <button
                onClick={onOpenInquiry}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#3D4A26] hover:bg-[#2D3A1E] transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Framework & Multiplier Strip below Hero Split */}
        <div className="mt-14 pt-8 border-t border-[#3D4A26]/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 bg-[#EFEBE0]/80 border border-[#3D4A26]/15 p-6 lg:p-7">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-[#3D4A26] text-[#F4F1EA] shrink-0">
                <Users2 className="w-5 h-5 text-[#8C9E5E]" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-[#3D4A26] uppercase block">
                  Human Dimension
                </span>
                <p className="text-sm font-semibold text-[#1A1A1A] mt-1">
                  PEOPLE → CAPABILITY → OPPORTUNITY
                </p>
                <p className="text-xs text-[#2B2B2B]/75 mt-0.5">
                  Developing character, knowledge, and inner resilience across life stages.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t md:border-t-0 md:border-l border-[#3D4A26]/15 pt-4 md:pt-0 md:pl-6 lg:pl-8">
              <div className="p-2.5 bg-[#3D4A26] text-[#F4F1EA] shrink-0">
                <Building2 className="w-5 h-5 text-[#8C9E5E]" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-[#3D4A26] uppercase block">
                  Enterprise Dimension
                </span>
                <p className="text-sm font-semibold text-[#1A1A1A] mt-1">
                  ENTERPRISE → MULTIPLICATION
                </p>
                <p className="text-xs text-[#2B2B2B]/75 mt-0.5">
                  Establishing viable institutions, wise governance, and sustainable livelihoods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t md:border-t-0 md:border-l border-[#3D4A26]/15 pt-4 md:pt-0 md:pl-6 lg:pl-8">
              <div className="p-2.5 bg-[#3D4A26] text-[#F4F1EA] shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#8C9E5E]" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-[#3D4A26] uppercase block">
                  Core Axiom
                </span>
                <p className="text-sm font-semibold text-[#1A1A1A] mt-1">
                  Commercial Sustainability & Human Growth Move Together
                </p>
                <p className="text-xs text-[#2B2B2B]/75 mt-0.5">
                  Economic health fuels social contribution without dependency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
