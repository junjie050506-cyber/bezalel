import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  IMPACT_CHAIN,
  LEGACY_STATEMENTS,
} from '../data/ecosystemData';
import {
  BusinessGraphicArt,
  ImpactFlowGraphic,
} from '../components/EcosystemGraphics';
import { ScrollReveal } from '../components/MotionContainer';
import { VideoBackground } from '../components/VideoBackground';
import { BezalelMilestoneConstellation } from '../components/BezalelMilestoneConstellation';

export interface ImpactPageProps {
  onOpenInquiry: (role?: string) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onOpenInquiry }) => {
  const navigate = useNavigate();
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#141812]">
      {/* =====================================================================
          SECTION 1: SOCIAL & ECONOMIC IMPACT (PDF PAGE 17) + INTERACTIVE FLYWHEEL
      ====================================================================== */}
      <section className="relative py-12 sm:py-16 bg-[#F4F1EA] border-b border-[#2D3A1E]/12 overflow-hidden">
        {/* Full True-Color Ivory Cream Geometric Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-cream-geometric-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 sm:mb-12 border-b border-[#2D3A1E]/12 gap-4">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 type-kicker text-[#405329] mb-2 font-mono">
                  <span>SOCIAL &amp; ECONOMIC IMPACT</span>
                </div>
                <h1 className="text-display font-bold text-[#141812]">
                  Opportunity is the bridge from{' '}
                  <span className="italic font-semibold text-[#405329]">
                    assistance to lasting change
                  </span>
                </h1>
                <p className="text-body text-[#42493E] mt-2 measure-prose">
                  A learner can develop capability. Capability can become work or enterprise. Enterprise can create employment. Employment can strengthen households and communities.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center gap-2 bg-[#141B0C] hover:bg-[#2D3A1E] text-[#FAF9F6] px-6 py-3 rounded-lg text-caption font-semibold uppercase tracking-wider transition-all cursor-pointer self-start md:self-auto shrink-0 shadow-low"
              >
                <span>Book a free consultation</span>
                <ArrowRight className="w-4 h-4 text-[#E6B94D]" />
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.12}>
            <ImpactFlowGraphic />
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: FIVE-STAGE IMPACT MULTIPLIER (STAGE 01 — 05)
      ====================================================================== */}
      <section className="relative py-14 sm:py-20 bg-[#1A2216] text-[#FAF9F6] border-b border-[#141812]/12 overflow-hidden">
        {/* Full True-Color Split Olive Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-track-record-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <div className="flex items-center gap-2 text-caption font-mono font-semibold tracking-widest text-[#E6B94D] mb-2 uppercase">
                <span>IMPACT MULTIPLIER · STAGE 01 — 05</span>
              </div>
              <h2 className="text-h1 font-bold text-[#FAF9F6] drop-shadow-sm">
                How individual potential translates into enduring enterprise
              </h2>
            </div>
          </ScrollReveal>

          {/* 5 Impact Chain Stage Cards — Horizontal Expanding Accordion (PDF Page 17) */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:h-[460px] w-full">
            {IMPACT_CHAIN.map((stage, idx) => {
              const isActive = activeStageIdx === idx;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStageIdx(idx)}
                  onMouseEnter={() => setActiveStageIdx(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStageIdx(idx);
                    }
                  }}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-high ${
                    isActive
                      ? 'lg:flex-[4.8] min-h-[340px] sm:min-h-[380px] lg:min-h-0 border-white/30'
                      : 'lg:flex-[0.85] min-h-[96px] sm:min-h-[110px] lg:min-h-0 border-white/15 hover:border-white/30'
                  }`}
                >
                  {/* Full-Bleed Stage Photograph */}
                  <div
                    className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out ${
                      isActive ? 'scale-100' : 'scale-105 group-hover:scale-100'
                    }`}
                  >
                    <BusinessGraphicArt businessId={`impact-0${idx + 1}`} />
                  </div>

                  {/* Cinematic Dark Gradient Overlay */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      isActive
                        ? 'bg-gradient-to-t from-black/90 via-black/40 to-black/10'
                        : 'bg-gradient-to-t from-black/85 via-black/30 to-black/15 group-hover:via-black/20'
                    }`}
                  />

                  {/* Expanded Active Card Content (Bottom-Left Quote Narrative + Bottom-Right Stage Attribution) */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 transition-all duration-500 ${
                      isActive
                        ? 'opacity-100 translate-y-0 delay-75 pointer-events-auto'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    {/* Bottom-Left: Quote Mark + Narrative Description */}
                    <div className="max-w-md">
                      <span
                        aria-hidden="true"
                        className="block font-serif text-5xl sm:text-6xl leading-[0.75] text-white font-bold mb-2 select-none"
                      >
                        &ldquo;
                      </span>
                      <p className="text-base sm:text-lg lg:text-[21px] font-medium text-white leading-snug tracking-tight drop-shadow-sm">
                        {stage.description}
                      </p>
                    </div>

                    {/* Bottom-Right: Stage Title, Actor Subtitle & Stage Emblem */}
                    <div className="shrink-0 lg:text-left">
                      <div className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                        {stage.name}
                      </div>
                      <div className="text-xs sm:text-sm text-white/80 font-normal mt-0.5">
                        {stage.actor}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                        <span className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md border border-white/20 text-[#E6B94D]">
                          STAGE {stage.step}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed Strip Content (Bottom-Center Compact Stage Label) */}
                  <div
                    className={`absolute inset-x-0 bottom-5 sm:bottom-7 px-3 flex flex-col items-center justify-end text-center transition-all duration-300 ${
                      isActive
                        ? 'opacity-0 pointer-events-none translate-y-2'
                        : 'opacity-100 pointer-events-auto translate-y-0'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#E6B94D] uppercase mb-1">
                      STAGE {stage.step}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-white tracking-wide uppercase leading-tight drop-shadow">
                      {stage.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: TRACK RECORD 01–09 (SCROLL-DRIVEN 3D EXPLODED CONSTELLATION)
      ====================================================================== */}
      <BezalelMilestoneConstellation
        onExploreEcosystem={() => navigate('/ecosystem')}
      />

      {/* =====================================================================
          SECTION 4: THE LEGACY WE SEEK (PDF PAGE 24)
      ====================================================================== */}
      <section className="relative py-16 sm:py-20 bg-[#1A2216] text-[#FAF9F6] border-b border-[#405329]/40 overflow-hidden">
        {/* Full True-Color Embossed Z Monogram Wallpaper Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-monogram-pattern.jpg')`,
            backgroundSize: '560px auto',
            backgroundRepeat: 'repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <div className="flex items-center gap-2 text-caption font-mono font-semibold uppercase tracking-widest text-[#E6B94D] mb-2">
                <span>THE LEGACY WE SEEK · INSTITUTIONAL CONTINUITY</span>
              </div>
              <h2 className="text-h1 font-bold text-[#FAF9F6] drop-shadow-sm">
                Measured by what continues through people
              </h2>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-white/15 border-t border-b border-white/15 mb-8">
            {LEGACY_STATEMENTS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group py-6 px-4 -mx-4 rounded-xl hover:bg-white/5 transition-colors grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center"
              >
                <div className="sm:col-span-5 flex items-center gap-3">
                  <span className="font-mono text-caption font-bold text-[#E6B94D] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="text-h3 font-semibold text-white group-hover:text-[#E6B94D] transition-colors">
                    {item.entity}
                  </span>
                </div>
                <div className="sm:col-span-7 flex items-center justify-between gap-4 text-h3 font-semibold text-[#FAF9F6]/90">
                  <span>{item.outcome}</span>
                  <ArrowRight className="w-4 h-4 text-[#E6B94D] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 hidden sm:block" />
                </div>
              </motion.div>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="relative group overflow-hidden rounded-xl bg-white/10 text-[#FAF9F6] px-6 py-5 text-center text-caption font-semibold tracking-widest uppercase shadow-low border border-white/20">
              <span className="relative z-10 text-[#E6B94D]">A LEGACY THAT CONTINUES THROUGH PEOPLE.</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
