import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Compass,
  Sparkles,
} from 'lucide-react';

export interface MilestoneItem {
  step: string;
  year: string;
  category: string;
  title: string;
  summary?: string;
  bullets: string[];
  primaryPhoto: string;
  detailPhoto: string;
  detailCaption?: string;
  ventureId?: string;
  linkText?: string;
}

// Canonical Timeline from Bezalel Inc Group Profile (Page 05 & Page 18) - Streamlined
const HISTORICAL_MILESTONES: MilestoneItem[] = [
  {
    step: '01',
    year: '2004',
    category: 'VISION',
    title: 'The name and wider purpose became clear.',
    bullets: [
      'Rooted in Exodus 31:1–6 stewardship calling',
      'Uniting human care with enterprise capability',
    ],
    primaryPhoto: '/assets/photos/pillar-learning.jpg',
    detailPhoto: '/assets/photos/milestone-01.jpg',
    detailCaption: 'Early Values & Mentorship Laboratories · Kuala Lumpur',
    linkText: 'Explore Vision',
  },
  {
    step: '02',
    year: '2008',
    category: 'FORMATION',
    title: 'Bezalel Resources formally established.',
    bullets: [
      'Statutory governance and operational groundwork',
      'Early youth education and community initiatives',
    ],
    primaryPhoto: '/assets/photos/venture-phroneo.jpg',
    detailPhoto: '/assets/photos/philosophy-01.jpg',
    detailCaption: 'Formal Incorporation & Governance Foundations',
    ventureId: 'phroneo',
    linkText: 'Explore Formation',
  },
  {
    step: '03',
    year: 'BUILD',
    category: 'EXPLORATION',
    title: 'High-impact institutional expansion.',
    bullets: [
      'Organised conference for ~RM1.7M project',
      'Established a dedicated refugee school in Malaysia',
    ],
    primaryPhoto: '/assets/photos/venture-general.jpg',
    detailPhoto: '/assets/photos/milestone-02.jpg',
    detailCaption: 'Large-Scale Institutional Logistics & Community School',
    linkText: 'Explore Exploration',
  },
  {
    step: '04',
    year: 'TODAY',
    category: 'ECOSYSTEM',
    title: 'Connected human and enterprise growth.',
    bullets: [
      'Five specialized businesses across people, care, and governance',
      'Turning human capability into sustainable opportunity',
    ],
    primaryPhoto: '/assets/photos/venture-general.jpg',
    detailPhoto: '/assets/photos/milestone-04.jpg',
    detailCaption: 'Bezalel Inc Purpose-Led Group Ecosystem',
    linkText: 'Explore Ecosystem',
  },
];

export interface InteractiveTimelineScrollerProps {
  onOpenInquiry?: (id?: string) => void;
  onNavigateEcosystem?: () => void;
}

export const InteractiveTimelineScroller: React.FC<InteractiveTimelineScrollerProps> = ({
  onOpenInquiry,
  onNavigateEcosystem,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const current = HISTORICAL_MILESTONES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : HISTORICAL_MILESTONES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < HISTORICAL_MILESTONES.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-3 sm:space-y-4 lg:space-y-4">
      
      {/* 1. TOP SECTION HEADER (FROM PDF PAGE 05) */}
      <div className="flex items-center justify-between gap-4 pb-2.5 sm:pb-3 border-b border-white/10 shrink-0">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#A3B86C] tracking-[0.2em] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3B86C]" />
            <span>OUR STORY · BEZALEL INC / 05</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-white tracking-tight leading-snug mt-0.5">
            One purpose. A journey of possibility.
          </h2>
          <p className="font-sans text-[11px] sm:text-xs text-[#EAE4D7]/80 font-light leading-normal hidden sm:block mt-0.5">
            Bezalel evolved by turning needs into ideas, ideas into capability, and capability into sustainable opportunity.
          </p>
        </div>

        {/* Previous / Next Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous milestone"
            className="w-8 h-8 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next milestone"
            className="w-8 h-8 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. HORIZONTAL TIMELINE AXIS (PDF 4-PHASE MILESTONES) */}
      <div className="relative py-1 sm:py-2 shrink-0">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
          {/* Continuous Hairline Track positioned through the center of the nodes */}
          <div className="absolute bottom-[13px] left-4 right-4 h-px bg-white/15 pointer-events-none" />

          {HISTORICAL_MILESTONES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="group relative flex flex-col items-center cursor-pointer focus:outline-hidden py-1 px-1 z-10"
              >
                {/* Step / Category Tag */}
                <span
                  className={`text-[9px] sm:text-[11px] font-mono uppercase tracking-widest transition-all duration-200 mb-0.5 ${
                    isActive ? 'text-[#F5B841] font-bold' : 'text-white/45 group-hover:text-white/70'
                  }`}
                >
                  {item.step} · {item.category}
                </span>

                {/* Main Year / Phase Label */}
                <span
                  className={`text-xs sm:text-base font-display tracking-tight transition-all duration-200 mb-1.5 select-none ${
                    isActive ? 'text-white font-medium scale-105' : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {item.year}
                </span>

                {/* Node Tick on the Line */}
                <div className="relative flex items-center justify-center w-5 h-5">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#F5B841] scale-125 shadow-[0_0_12px_rgba(245,184,65,0.9)]'
                        : 'bg-white/30 group-hover:bg-white/60'
                    }`}
                  />

                  {isActive && (
                    <motion.div
                      layoutId="activeTimelineTickPdf"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-full border-2 border-[#F5B841] pointer-events-none"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. THREE-COLUMN MILESTONE STAGE (DRIBBLE VIDEO PATTERN) */}
      <div className="relative flex-1 flex flex-col justify-center min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
          >
            {/* COLUMN 1: MASTER PRIMARY PHOTOGRAPH (5 COLS) */}
            <div className="lg:col-span-5">
              <div className="relative h-[180px] sm:h-[220px] lg:h-[250px] xl:h-[270px] w-full overflow-hidden rounded-2xl bg-black/40 border border-white/12 shadow-xl group">
                <img
                  src={current.primaryPhoto}
                  alt={current.title}
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* COLUMN 2: YEAR & NARRATIVE HIGHLIGHTS (4 COLS) */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-3.5">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-none">
                  {current.year}
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-[#F5B841] uppercase tracking-wider font-semibold">
                  {current.category}
                </span>
              </div>

              <h3 className="font-display text-base sm:text-lg lg:text-xl text-white font-medium leading-snug">
                {current.title}
              </h3>

              {current.summary && (
                <p className="font-sans text-[11px] sm:text-xs text-[#EAE4D7]/85 font-light leading-relaxed">
                  {current.summary}
                </p>
              )}

              {/* High-Impact Concise Bullets */}
              <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs sm:text-[13px] font-sans text-white/90">
                {current.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3B86C] mt-1.5 shrink-0" />
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateEcosystem) {
                      onNavigateEcosystem();
                    } else if (onOpenInquiry) {
                      onOpenInquiry(current.ventureId);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#F5B841] hover:text-white uppercase tracking-wider font-semibold transition-colors cursor-pointer group"
                >
                  <span>{current.linkText || 'Discover More'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* COLUMN 3: SECONDARY DETAIL PHOTOGRAPH (3 COLS) */}
            <div className="lg:col-span-3">
              <div className="relative h-[180px] sm:h-[220px] lg:h-[250px] xl:h-[270px] w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-md group">
                <img
                  src={current.detailPhoto}
                  alt={current.title}
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. PDF PAGE 05 FOOTER SIGNATURE MANTRA */}
      <div className="pt-2 sm:pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono shrink-0">
        <div className="flex items-center gap-2 text-[#A3B86C] tracking-[0.2em] uppercase font-bold text-[10px] sm:text-[11px]">
          <span>DEVELOP PEOPLE</span>
          <span className="text-[#F5B841]">→</span>
          <span>CREATE OPPORTUNITY</span>
          <span className="text-[#F5B841]">→</span>
          <span>BUILD ENTERPRISE</span>
        </div>

        <span className="text-white/40 text-[10px] uppercase tracking-wider">
          BEZALEL INC · HERITAGE COVENANT
        </span>
      </div>

    </div>
  );
};

export default InteractiveTimelineScroller;
