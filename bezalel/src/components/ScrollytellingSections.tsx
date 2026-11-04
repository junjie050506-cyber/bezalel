import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Users,
  TrendingUp,
  ShieldCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
  Compass,
} from 'lucide-react';
import {
  BUSINESS_ENTITIES,
  EXECUTIVE_PROFILE,
  TIMELINE_MILESTONES,
} from '../data/ecosystemData';
import { BusinessGraphicArt } from './EcosystemGraphics';
import { VideoBackground } from './VideoBackground';

/* ============================================================================
   1. SCROLL-LINKED WORD-BY-WORD MANIFESTO ILLUMINATION (APPLE PRO STYLE)
============================================================================ */

interface WordRevealProps {
  word: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  highlight?: boolean;
}

const ScrollWord: React.FC<WordRevealProps> = ({
  word,
  progress,
  range,
  highlight = false,
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [6, 0]);
  const scale = useTransform(progress, range, [0.97, 1]);

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className={`inline-block mr-[0.28em] transition-colors duration-150 ${
        highlight ? 'text-[#F5B841] italic font-normal' : 'text-[#FAF8F4]'
      }`}
    >
      {word}
    </motion.span>
  );
};

export interface ScrollManifestoRevealProps {
  onExploreStory?: () => void;
  videoSrc?: string;
}

/**
 * Dedicated background video for The Executive Thesis section.
 * Drop your dedicated video file at:
 *   public/assets/videos/thesis-bg.mp4
 * (or public/assets/videos/thesis.mp4 / manifesto-bg.mp4)
 * It automatically prioritizes your dedicated video while maintaining all design, contrast, and animations.
 */
const THESIS_DEDICATED_VIDEO_SOURCES = [
  '/assets/videos/Background Video 2.mp4',
];

export const ScrollManifestoReveal: React.FC<ScrollManifestoRevealProps> = ({
  onExploreStory,
  videoSrc,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'end 0.45'],
  });

  const statement =
    'Drawn from Exodus 31:1–6, Bezalel was called and equipped with wisdom, understanding, knowledge and skill for purposeful creative work — uniting the person and the enterprise in the same conversation.';
  const words = statement.split(' ');
  const highlightSet = new Set([
    'Bezalel',
    'wisdom,',
    'understanding,',
    'knowledge',
    'purposeful',
    'person',
    'enterprise',
  ]);

  const formulaScale = useTransform(scrollYProgress, [0.32, 0.60], [0.97, 1]);
  const formulaOpacity = useTransform(scrollYProgress, [0.26, 0.56], [0.32, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#141812] text-[#FAF9F6] py-12 sm:py-16 border-y border-[#141812]/12 overflow-hidden"
    >
      {/* Ambient Cinema Dedicated Video Layer */}
      <VideoBackground
        src={videoSrc}
        sources={videoSrc ? [videoSrc] : THESIS_DEDICATED_VIDEO_SOURCES}
        opacity="opacity-65"
        videoClassName="brightness-110 contrast-105"
        overlayGradient="bg-gradient-to-b from-[#141812]/80 via-[#141812]/35 to-[#141812]/85"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[35px] mb-8" aria-hidden="true" />

        {/* Scroll-Illuminated Display Typography (36px/44px Bold) */}
        <h2 className="text-display font-bold drop-shadow-md">
          {words.map((word, i) => {
            const start = (i / words.length) * 0.38;
            const end = start + 0.14;
            return (
              <ScrollWord
                key={`${word}-${i}`}
                word={word}
                progress={scrollYProgress}
                range={[start, Math.min(end, 0.52)]}
                highlight={highlightSet.has(word)}
              />
            );
          })}
        </h2>

        {/* Editorial Continuum Bar (16px container radius) */}
        <motion.div
          style={{ scale: formulaScale, opacity: formulaOpacity }}
          className="mt-12 rounded-2xl bg-[#1C2218]/90 border border-white/15 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-mid"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            <div className="space-y-2">
              <span className="type-kicker text-[#E4E9DC] block">
                01 · Human Foundation
              </span>
              <div className="text-h3 font-semibold text-[#FAF9F6]">
                {EXECUTIVE_PROFILE.formulaLine1}
              </div>
            </div>
            <div className="space-y-2 sm:border-l sm:border-white/15 sm:pl-6">
              <span className="type-kicker text-[#E6B94D] block">
                02 · Institutional Scale
              </span>
              <div className="text-h3 font-semibold text-[#E6B94D]">
                {EXECUTIVE_PROFILE.formulaLine2}
              </div>
            </div>
          </div>

          {onExploreStory && (
            <button
              type="button"
              onClick={onExploreStory}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 text-[#FAF9F6] border border-white/24 font-sans font-medium text-caption uppercase tracking-wider hover:bg-[#FAF9F6] hover:text-[#141812] transition-all cursor-pointer whitespace-nowrap shrink-0 self-start lg:self-center"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================================
   2. STICKY SPLIT-STAGE VENTURE SHOWCASE (5 OPERATING VENTURES)
============================================================================ */

const VENTURE_OUTCOME_META: Record<
  string,
  {
    Icon: React.FC<{ className?: string }>;
    outcomeMetric: string;
    outcomeDetail: string;
    domainTag: string;
  }
> = {
  'bezalel-insignia': {
    Icon: Sparkles,
    outcomeMetric: 'STEM, Capability & Marketplace',
    outcomeDetail: 'Junior Scientists, robotics, debate, ethical trade & marketplace platforms',
    domainTag: 'Youth & Marketplace',
  },
  'bezalel': {
    Icon: Sparkles,
    outcomeMetric: 'STEM, Capability & Marketplace',
    outcomeDetail: 'Junior Scientists, robotics, debate, ethical trade & marketplace platforms',
    domainTag: 'Youth & Marketplace',
  },
  'olive-vine': {
    Icon: HeartHandshake,
    outcomeMetric: 'Clinical & Relational Wellbeing',
    outcomeDetail: 'Psychotherapy, emotional resilience, marriage & family counselling',
    domainTag: 'Inner Wellbeing',
  },
  'hur-on': {
    Icon: Users,
    outcomeMetric: 'Corporate Training & Leadership',
    outcomeDetail: 'Corporate training masterclasses, experiential team simulations & executive development',
    domainTag: 'Corporate Training',
  },
  'mustard-seed': {
    Icon: TrendingUp,
    outcomeMetric: 'Brand Strategy & Commercial Growth',
    outcomeDetail: 'Positioning, creative campaigns, digital presence & market advisory',
    domainTag: 'Brand & Growth',
  },
  'phroneo': {
    Icon: ShieldCheck,
    outcomeMetric: 'Corporate Governance & Continuity',
    outcomeDetail: 'Company secretarial, incorporation, statutory compliance & board support',
    domainTag: 'Foundations',
  },
};

export const StickyVentureScrollytelling: React.FC<{
  onOpenInquiry: (businessId?: string) => void;
  onNavigateEcosystem?: () => void;
}> = ({ onOpenInquiry, onNavigateEcosystem }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = BUSINESS_ENTITIES.length;
    const rawIdx = Math.min(
      total - 1,
      Math.max(0, Math.floor(latest * total))
    );
    if (rawIdx !== activeIndex) {
      setActiveIndex(rawIdx);
    }
  });

  const activeVenture = BUSINESS_ENTITIES[activeIndex] || BUSINESS_ENTITIES[0];
  const activeMeta =
    VENTURE_OUTCOME_META[activeVenture.id] ||
    VENTURE_OUTCOME_META['olive-vine'];

  return (
    <section
      id="interactive-ventures"
      ref={sectionRef}
      className="relative bg-[#FAF9F6] border-b border-[#141812]/[0.08] py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-[#141812]/[0.08]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#4A5D32] mb-3">
              <span>01 — The Operating Ecosystem</span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,3.8vw,3.35rem)] font-medium text-[#141812] leading-[1.06] tracking-[-0.02em]">
              Four specialised ventures.{' '}
              <span className="italic font-normal text-[#4A5D32]">
                One shared standard.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#52584E] mt-3 leading-relaxed">
              Each business addresses a distinct dimension of human and enterprise development—operating independently in craft while connected by one group purpose.
            </p>
          </div>

          {onNavigateEcosystem && (
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={onNavigateEcosystem}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141812] hover:bg-[#24301C] text-[#FAF9F6] text-xs font-semibold transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Explore Operating Ecosystem</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Quick Venture Switcher & Keyboard Accessible Tablist */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div
            role="tablist"
            aria-label="Venture chapters quick switcher"
            className="flex items-center gap-1.5 p-1.5 bg-[#EFECE6] rounded-2xl border border-[#141812]/[0.08] min-w-max"
          >
            {BUSINESS_ENTITIES.map((biz, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={biz.id}
                  role="tab"
                  type="button"
                  aria-selected={isCurrent}
                  onClick={() => {
                    setActiveIndex(idx);
                    chapterRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2C3B1C] ${
                    isCurrent ? 'text-[#141812] font-semibold' : 'text-[#52584E] hover:text-[#141812]'
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activeVentureScrollyTab"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-white rounded-xl shadow-xs border border-[#141812]/[0.08]"
                    />
                  )}
                  <span className={`relative z-10 font-mono text-[10px] ${isCurrent ? 'text-[#4A5D32] font-bold' : 'text-[#52584E]/70'}`}>
                    0{biz.number}
                  </span>
                  <span className="relative z-10">{biz.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Editorial Showcase: Left Sticky Dossier + Right Venture Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT 6 COLUMNS: Sticky Visual Stage on Desktop (Aligned perfectly with right card tops) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl bg-gradient-to-b from-[#1C2514] via-[#161F10] to-[#11170C] text-[#FAF9F6] overflow-hidden shadow-[0_24px_60px_-15px_rgba(30,41,20,0.28)] border border-[#405329]/35 w-full">
              {/* Animated Venture Visual Stage */}
              <div className="relative h-[250px] sm:h-[280px] lg:h-[305px] w-full overflow-hidden bg-gradient-to-b from-[#212C17] to-[#182111]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVenture.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <BusinessGraphicArt businessId={activeVenture.id} />
                  </motion.div>
                </AnimatePresence>

                <div
                  className={
                    activeVenture.logo
                      ? 'absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#161F10] via-[#161F10]/80 to-transparent pointer-events-none'
                      : 'absolute inset-0 bg-gradient-to-t from-[#161F10] via-[#161F10]/30 to-transparent pointer-events-none'
                  }
                />

                {/* Top Overlay Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#161F10]/85 backdrop-blur-md border border-[#A3B86C]/30 font-mono text-[11px] tracking-wider uppercase text-[#A3B86C] shadow-sm">
                    {activeVenture.number} · {activeVenture.ecosystemDomain}
                  </span>
                </div>

                {/* Bottom Overlay Live Summary */}
                <div className="absolute bottom-4 left-5 right-5">
                  {activeVenture.motto && (
                    <div className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#A3B86C] font-semibold mb-0.5">
                      {activeVenture.motto}
                    </div>
                  )}
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-[#FAF9F6] tracking-tight">
                    {activeVenture.name}
                  </h3>
                  <p className="text-xs text-[#FAF9F6]/85 mt-0.5 line-clamp-2">
                    {activeVenture.tagline}
                  </p>
                </div>
              </div>

              {/* Pinned Stage Footer Bar */}
              <div className="px-5 py-4 sm:px-6 sm:py-4.5 bg-[#141C0E] border-t border-[#405329]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#A3B86C]">
                    {activeMeta.outcomeMetric}
                  </div>
                  <div className="text-xs text-[#FAF9F6]/75 mt-0.5 line-clamp-1 sm:line-clamp-2">
                    {activeMeta.outcomeDetail}
                  </div>
                </div>
                {activeVenture.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(activeVenture.id) ? (
                  <span className="inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 text-white/50 text-xs font-semibold cursor-not-allowed whitespace-nowrap shrink-0 self-start sm:self-center border border-white/10 select-none">
                    <span>Website Coming Soon</span>
                  </span>
                ) : (
                  <a
                    href={activeVenture.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#FAF9F6] hover:bg-[#405329] text-[#161F10] hover:text-[#FAF9F6] text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center shadow-sm"
                  >
                    <span>Visit {activeVenture.shortName} Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLUMNS: 5 Clean Editorial Venture Cards */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {BUSINESS_ENTITIES.map((biz, idx) => {
              const isCurrent = idx === activeIndex;
              const meta =
                VENTURE_OUTCOME_META[biz.id] ||
                VENTURE_OUTCOME_META['olive-vine'];
              const IconComp = meta.Icon;

              return (
                <motion.article
                  key={biz.id}
                  ref={(el) => {
                    chapterRefs.current[idx] = el as HTMLDivElement | null;
                  }}
                  onViewportEnter={() => setActiveIndex(idx)}
                  viewport={{ amount: 0.45, margin: '-10% 0px -25% 0px' }}
                  onClick={() => {
                    setActiveIndex(idx);
                    chapterRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  whileHover={{ scale: 1.008 }}
                  whileTap={{ scale: 0.99 }}
                  className={`scroll-mt-24 rounded-3xl p-6 sm:p-8 border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-white border-[#405329] shadow-[0_16px_40px_-12px_rgba(45,58,30,0.14)] ring-1 ring-[#405329]/25'
                      : 'bg-white/70 border-[#2D3A1E]/10 hover:bg-white hover:border-[#405329]/35 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5 text-xs font-medium text-[#405329]">
                      <span className="w-6 h-6 rounded-full bg-[#405329] text-[#FAF9F6] font-mono text-[11px] font-semibold flex items-center justify-center shrink-0 shadow-xs">
                        {biz.number}
                      </span>
                      <span className="tracking-wider uppercase text-[11px] font-semibold text-[#405329]">
                        {biz.category}
                      </span>
                    </div>
                    <IconComp className="w-4 h-4 text-[#405329] shrink-0" />
                  </div>

                  <h3 className="font-display text-2xl sm:text-[28px] font-medium text-[#141812] leading-tight">
                    {biz.name}
                  </h3>

                  <p className="font-display italic text-base sm:text-lg text-[#405329] mt-1">
                    “{biz.tagline}”
                  </p>

                  <p className="mt-3 text-sm text-[#52584E] leading-relaxed">
                    {biz.summary}
                  </p>

                  {/* 4 Capability Focus Areas */}
                  <div className="mt-5 pt-5 border-t border-[#405329]/15 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {biz.focusAreas.map((area) => (
                      <div
                        key={area}
                        className="flex items-start gap-2 text-xs text-[#2C3129]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#405329] shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#405329]/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-[#52584E]">
                      Ecosystem Role: <strong className="font-medium text-[#405329]">{biz.ecosystemRole}</strong>
                    </span>
                    {biz.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(biz.id) ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52584E]/70 cursor-not-allowed select-none">
                        <span>Website Coming Soon</span>
                      </span>
                    ) : (
                      <a
                        href={biz.website || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#405329] hover:text-[#2D3A1E] transition-colors cursor-pointer group/link"
                      >
                        <span>Visit {biz.shortName} Website</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   3. MASTER MILESTONE JOURNEY (1:1 MISSION ZERO EDITORIAL TIMELINE UX)
   Identical to the Mission Zero milestone design:
   - Full-bleed #D5CDC7 warm stone canvas
   - Monumental sculptural watermark "2" and "0" flanking the circular portal
   - Continuous 1px full-width horizontal wire passing through the center circle
   - Concentric ring active node + floating black pill badge (e.g. 2008)
   - Left-aligned headline (e.g. Formation/2008) and concise narrative
   - Minimalist bottom stepper with bare < and > chevrons + segmented dashes
============================================================================ */

const MILESTONE_ERA_METADATA = [
  {
    step: '01',
    yearOrPhase: '2004',
    titleSlashYear: 'Vision/2004',
    photo: '/assets/photos/milestone-01.jpg',
    photoCaption: 'Inception of the Bezalel mandate & calling',
    narrative:
      'Lalitha Manoharan conceived the Bezalel calling—uniting human care with enterprise capability.',
  },
  {
    step: '02',
    yearOrPhase: '2008',
    titleSlashYear: 'Formation/2008',
    photo: '/assets/photos/milestone-02.jpg',
    photoCaption: 'Official registration of Bezalel Resources Sdn Bhd',
    narrative:
      'Bezalel Resources formally incorporated in Malaysia, establishing statutory governance and community initiatives.',
  },
  {
    step: '03',
    yearOrPhase: '2016',
    titleSlashYear: 'Build/Exploration',
    photo: '/assets/photos/milestone-03.jpg',
    photoCaption: 'Major conference deployment & community initiatives',
    narrative:
      'Orchestrated conference operations for ~RM1.7M project and established a dedicated refugee school in Malaysia.',
  },
  {
    step: '04',
    yearOrPhase: 'Today',
    titleSlashYear: 'Today/Ecosystem',
    photo: '/assets/photos/milestone-04.jpg',
    photoCaption: '4 specialised companies connected under Bezalel Inc',
    narrative:
      'Four specialised businesses support connected human and enterprise growth, turning capability into sustainable opportunity.',
  },
];

const NODE_POSITIONS = [16, 16, 84, 84];

export const StickyTimelineScrollytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeIdxRef = useRef(activeMilestoneIdx);
  activeIdxRef.current = activeMilestoneIdx;

  // Track scroll progress through the pinned sticky timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly scrub milestones as user scrolls down or up
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let rawIdx = 0;
    if (latest >= 0.70) {
      rawIdx = 3;
    } else if (latest >= 0.45) {
      rawIdx = 2;
    } else if (latest >= 0.22) {
      rawIdx = 1;
    } else {
      rawIdx = 0;
    }
    if (rawIdx !== activeIdxRef.current) {
      setDirection(rawIdx > activeIdxRef.current ? 1 : -1);
      setActiveMilestoneIdx(rawIdx);
      activeIdxRef.current = rawIdx;
    }
  });

  // Sync on initial mount in case user loads page midway through the section
  React.useEffect(() => {
    const currentProgress = scrollYProgress.get();
    let initialIdx = 0;
    if (currentProgress >= 0.70) {
      initialIdx = 3;
    } else if (currentProgress >= 0.45) {
      initialIdx = 2;
    } else if (currentProgress >= 0.22) {
      initialIdx = 1;
    } else {
      initialIdx = 0;
    }
    if (initialIdx !== activeIdxRef.current) {
      setActiveMilestoneIdx(initialIdx);
      activeIdxRef.current = initialIdx;
    }
  }, [scrollYProgress]);

  const activeMilestone =
    TIMELINE_MILESTONES[activeMilestoneIdx] || TIMELINE_MILESTONES[0];
  const activeMeta =
    MILESTONE_ERA_METADATA[activeMilestoneIdx] || MILESTONE_ERA_METADATA[0];
  const isEnded = activeMilestoneIdx === TIMELINE_MILESTONES.length - 1;

  const isFirst = activeMilestoneIdx === 0;
  const isLast = activeMilestoneIdx === TIMELINE_MILESTONES.length - 1;

  // Panoramic line boundaries based on active picture:
  // - Picture 1 (2004): Starts at 2004 (16%), right side touches screen border (0%)
  // - Picture 2 (2008): Spans full border-to-border (left: 0%, right: 0%)
  // - Picture 3 (2016): Spans full border-to-border (left: 0%, right: 0%)
  // - Picture 4 (2026): Left side extends to border (0%), right side terminates at 2026 (16% margin / 84% pos)
  const lineLeft = isFirst ? `${NODE_POSITIONS[0]}%` : '0%';
  const lineRight = isLast ? `${100 - NODE_POSITIONS[NODE_POSITIONS.length - 1]}%` : '0%';

  const handleSelectMilestone = (idx: number) => {
    const targetIdx = Math.max(0, Math.min(TIMELINE_MILESTONES.length - 1, idx));
    setDirection(targetIdx >= activeIdxRef.current ? 1 : -1);
    setActiveMilestoneIdx(targetIdx);
    activeIdxRef.current = targetIdx;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollableDist > 0) {
        const targets = [0.10, 0.33, 0.58, 0.82];
        const progress = targets[targetIdx] ?? 0.5;
        const targetY = scrollTop + progress * scrollableDist;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = React.useCallback(() => {
    if (activeIdxRef.current > 0) {
      handleSelectMilestone(activeIdxRef.current - 1);
    }
  }, []);

  const handleNext = React.useCallback(() => {
    if (activeIdxRef.current < TIMELINE_MILESTONES.length - 1) {
      handleSelectMilestone(activeIdxRef.current + 1);
    }
  }, []);

  // Keyboard navigation for desktop power users
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#D5CDC7]"
    >
      {/* Sticky Stage: Positioned right below the sticky global header with full viewport centering */}
      <div className="sticky top-[72px] sm:top-[80px] h-[calc(100vh-72px)] sm:h-[calc(100vh-80px)] h-[calc(100dvh-72px)] sm:h-[calc(100dvh-80px)] w-full bg-[#D5CDC7] text-[#212121] overflow-hidden flex flex-col justify-between pt-4 sm:pt-6 pb-4 sm:pb-6 select-none transition-colors">
        {/* =====================================================================
            TOP CONTEXT SUBHEAD (MINIMALIST & EDITORIAL)
        ====================================================================== */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-[0.16em] uppercase text-[#212121]/65">
            <span className="w-1.5 h-1.5 rounded-full bg-[#212121]" />
            <span>Origin & Trajectory</span>
            <span className="opacity-40">·</span>
            <span>Bezalel Inc / 05</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-[#212121]/45">
              Scroll to explore
            </span>
            <span className="text-xs font-mono text-[#212121]/60 tracking-wider font-semibold">
              0{activeMilestoneIdx + 1} / 0{TIMELINE_MILESTONES.length}
            </span>
          </div>
        </div>

        {/* =====================================================================
            MAIN HERO STAGE: WATERMARK "20" + CIRCLE + TIMELINE WIRE + TEXT
            Centered vertically directly in the optical middle of the screen
        ====================================================================== */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]">
          {/* -------------------------------------------------------------------
              1. MONUMENTAL SCULPTURAL WATERMARK NUMERALS "2" AND "0"
              Huge off-white background numerals flanking the circular photo
          -------------------------------------------------------------------- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-full flex items-center justify-between px-2 sm:px-8 lg:px-16">
              {/* Left Numeral "2" */}
              <div className="flex-1 flex justify-end pr-2 sm:pr-8 lg:pr-12">
                <span className="font-display font-bold text-[34vw] sm:text-[28vw] lg:text-[40vh] leading-none text-[#E5E1DC] tracking-tighter inline-block select-none drop-shadow-[0_2px_15px_rgba(33,33,33,0.02)]">
                  2
                </span>
              </div>

              {/* Spacer matching the circular photo's diameter */}
              <div className="w-48 sm:w-60 md:w-72 lg:w-80 shrink-0" />

              {/* Right Numeral "0" */}
              <div className="flex-1 flex justify-start pl-2 sm:pl-8 lg:pl-12">
                <span className="font-display font-bold text-[34vw] sm:text-[28vw] lg:text-[40vh] leading-none text-[#E5E1DC] tracking-tighter inline-block select-none drop-shadow-[0_2px_15px_rgba(33,33,33,0.02)]">
                  0
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              2. HORIZONTAL TIMELINE WIRE & NODES
              - ONE connected line from 2004 (16%) to 2026 (84%)
              - ONLY 2004 (start) and 2026 (end) will have stopped
              - All node dots are mathematically centered directly ON the line
          -------------------------------------------------------------------- */}
          {/* Dynamic Panoramic Timeline Wire:
              - Picture 1: Starts at 2004 (16%), right edge touches screen border (0%)
              - Picture 2: Enters from left border (0%), exits to right border (0%)
              - Picture 3: Enters from left border (0%), exits to right border (0%)
              - Picture 4: Enters from left border (0%), terminates cleanly at 2026 (84%)
          */}
          <motion.div
            initial={false}
            animate={{
              left: lineLeft,
              right: lineRight,
            }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            className="absolute h-[1px] bg-[#212121] z-10 pointer-events-none"
          />

          {/* Interactive Inactive Milestone Dots along the connected line:
              - When active is on Left (2004 / 2008 at 16%): show single inactive dot on Right at 84%
              - When active is on Right (2016 / 2026 at 84%): show single inactive dot on Left at 16%
              Never overlaps or crowds the circular portal in the center.
          */}
          {activeMilestoneIdx < 2 ? (
            <button
              type="button"
              onClick={() => handleSelectMilestone(2)}
              style={{
                left: '84%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 w-8 h-8 p-0 m-0 flex items-center justify-center cursor-pointer group focus:outline-none"
              aria-label="Jump to future milestone (2016)"
            >
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#212121] group-hover:scale-135 transition-transform duration-200" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSelectMilestone(0)}
              style={{
                left: '16%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 w-8 h-8 p-0 m-0 flex items-center justify-center cursor-pointer group focus:outline-none"
              aria-label="Jump to start milestone (2004)"
            >
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#212121] group-hover:scale-135 transition-transform duration-200" />
            </button>
          )}

          {/* Active Node: Glides along the connected line to active milestone position */}
          <motion.div
            animate={{ left: `${NODE_POSITIONS[activeMilestoneIdx]}%` }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            className="absolute z-30 w-8 h-8 pointer-events-none flex items-center justify-center"
          >
            {/* Floating Year Pill Badge (e.g. 2004, 2008, 2016, 2026) */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`pill-${activeMeta.yearOrPhase}`}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -12 : 12 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 sm:-top-11 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#212121] text-white font-display text-xs font-semibold tracking-wide whitespace-nowrap shadow-sm select-none"
              >
                {activeMeta.yearOrPhase}
              </motion.div>
            </AnimatePresence>

            {/* Concentric Circle Active Ring: Vertically bisected by the 1px line */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#212121] bg-[#D5CDC7] flex items-center justify-center">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#212121]" />
            </div>
          </motion.div>

          {/* -------------------------------------------------------------------
              3. CENTER CIRCULAR PHOTOGRAPHIC PORTAL (SLIDES HORIZONTALLY)
          -------------------------------------------------------------------- */}
          <div className="relative z-20 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-[#D5CDC7] shrink-0 select-none shadow-[0_12px_40px_-15px_rgba(33,33,33,0.15)]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={activeMeta.step}
                custom={direction}
                src={activeMeta.photo}
                alt={activeMeta.photoCaption}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 70 : -70,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -70 : 70,
                  scale: 0.95,
                }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* -------------------------------------------------------------------
              4. LEFT NARRATIVE TEXT: Positioned directly below the left wire
              Guaranteed clearance so text NEVER collides with the circular portal
          -------------------------------------------------------------------- */}
          <div className="absolute z-30 left-6 sm:left-10 md:left-12 lg:left-[8%] xl:left-[12%] right-6 sm:right-10 md:right-[calc(50%+10rem)] lg:right-[calc(50%+11.5rem)] xl:right-[calc(50%+12.5rem)] top-[calc(50%+6.5rem)] sm:top-[calc(50%+8rem)] md:top-[calc(50%+2.25rem)] lg:top-[calc(50%+2.5rem)] max-w-[320px] sm:max-w-[380px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] mx-auto md:mx-0 text-center md:text-left">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeMilestone.step}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 40 : -40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -40 : 40,
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-[1.75rem] text-[#141812] tracking-tight">
                  {activeMeta.titleSlashYear}
                </h3>
                <p className="text-xs sm:text-sm text-[#141812] font-sans leading-relaxed mt-1 sm:mt-1.5 font-normal">
                  {activeMeta.narrative}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =====================================================================
            BOTTOM NAVIGATION: BARE CHEVRONS & SEGMENTED PROGRESS DASHES
            Spaced with generous padding at the bottom of the viewport
        ====================================================================== */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between z-10 pt-2 pb-2 shrink-0">
        {/* Bottom Left Minimalist Badge Icon */}
        <div
          className="w-7 h-7 rounded-full bg-[#212121] text-white flex items-center justify-center text-xs opacity-75 hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
          title="Bezalel Inc · Purposeful Stewardship"
        >
          <span className="font-mono text-[10px] leading-none">∞</span>
        </div>

        {/* Center Stepper: < [dashes] > */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Previous Chevron */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous milestone"
            className="text-[#212121] hover:opacity-50 active:scale-95 transition-all cursor-pointer p-2 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 stroke-[1.75]" />
          </button>

          {/* Segmented Dashes */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Milestone scrubber"
          >
            {TIMELINE_MILESTONES.map((m, idx) => {
              const isCurrent = idx === activeMilestoneIdx;
              return (
                <button
                  key={m.step}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Milestone ${idx + 1}: ${m.yearOrPhase}`}
                  onClick={() => handleSelectMilestone(idx)}
                  className="py-3 px-0.5 cursor-pointer focus:outline-none group"
                >
                  <div
                    className={`h-[2.5px] rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-7 sm:w-9 bg-[#212121]'
                        : 'w-7 sm:w-9 bg-[#212121]/25 group-hover:bg-[#212121]/50'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Next Chevron */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next milestone"
            className="text-[#212121] hover:opacity-50 active:scale-95 transition-all cursor-pointer p-2 focus:outline-none"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.75]" />
          </button>
        </div>

        {/* Empty matching spacer to keep the center scrubber mathematically centered */}
        <div className="w-7" />
      </div>
      </div>
    </section>
  );
};
