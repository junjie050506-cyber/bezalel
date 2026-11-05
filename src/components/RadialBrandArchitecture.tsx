import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react';
import {
  HeartHandshake,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  X,
  Heart,
  Compass,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_ENTITIES, PARENT_COMPANY } from '../data/ecosystemData';
import type { BusinessEntity } from '../types';

export interface RadialBrandArchitectureProps {
  onOpenInquiry?: (businessId?: string) => void;
  className?: string;
}

interface SatelliteVenture {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  logo: string;
  bgImage: string;
  accentColor: string;
  badgeBg: string;
  Icon: React.FC<{ className?: string }>;
  // Desktop radial coordinates (from center 0,0)
  targetX: number;
  targetY: number;
  // Leaf tag position relative to the circle
  leafPlacement: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  // Scroll threshold window [start, end]
  scrollRange: [number, number];
}

const VENTURES: SatelliteVenture[] = [
  {
    id: 'olive-vine',
    number: '01',
    name: 'Olive & Vine',
    category: 'Psychological & Relational Care',
    tagline: 'Inner wellbeing shapes how people live and lead.',
    logo: '/assets/ventures/olive-vine-logo.png',
    bgImage: '/assets/ventures/olive-vine.jpg',
    accentColor: '#405329',
    badgeBg: '#405329',
    Icon: HeartHandshake,
    targetX: -215,
    targetY: -100,
    leafPlacement: 'top-left',
    scrollRange: [0.08, 0.28],
  },
  {
    id: 'hur-on',
    number: '02',
    name: 'HUR-ON',
    category: 'Corporate Training & Consultancy',
    tagline: 'Learning should change behaviour and performance.',
    logo: '/assets/ventures/hur-on-logo.png',
    bgImage: '/assets/ventures/hur-on.jpg',
    accentColor: '#2D3A1E',
    badgeBg: '#2D3A1E',
    Icon: Users,
    targetX: 215,
    targetY: -100,
    leafPlacement: 'top-right',
    scrollRange: [0.28, 0.48],
  },
  {
    id: 'mustard-seed',
    number: '03',
    name: 'Mustard Seed & Co',
    category: 'Creative Strategy & Brand Growth',
    tagline: 'Clarify the position. Communicate value.',
    logo: '/assets/ventures/mustard-seed-logo.png',
    bgImage: '/assets/ventures/mustard-seed.jpg',
    accentColor: '#C28D3E',
    badgeBg: '#C28D3E',
    Icon: TrendingUp,
    targetX: 215,
    targetY: 100,
    leafPlacement: 'bottom-right',
    scrollRange: [0.48, 0.68],
  },
  {
    id: 'phroneo',
    number: '04',
    name: 'Phroneo BoardSuite',
    category: 'Corporate Governance & Secretarial',
    tagline: 'Wise structure helps enterprise endure.',
    logo: '/assets/ventures/phroneo-logo.png',
    bgImage: '/assets/ventures/Phroneo.jpg',
    accentColor: '#1D2B3A',
    badgeBg: '#1D2B3A',
    Icon: ShieldCheck,
    targetX: -215,
    targetY: 100,
    leafPlacement: 'bottom-left',
    scrollRange: [0.68, 0.88],
  },
];

/** Layout scale so nodes never collide or overflow on any screen width */
const computeScale = (w: number) =>
  w < 640 ? Math.min(0.58, Math.max(0.36, (w / 2 - 56) / 215)) : w < 1024 ? 0.78 : 1;

/** Stage scale bounded by BOTH viewport width and height so mobile/tablet never overflow horizontally */
const computeStageScale = (w: number, h: number) => {
  if (w < 640) {
    return Math.min(1.0, Math.max(0.82, h / 640));
  }
  if (w < 1024) {
    return Math.min(1.12, Math.max(0.88, Math.min(w / 740, h / 580)));
  }
  return Math.min(1.42, Math.max(0.95, Math.min((w - 120) / 680, (h - 100) / 500)));
};

export const RadialBrandArchitecture: React.FC<RadialBrandArchitectureProps> = ({
  onOpenInquiry,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedModalEntity, setSelectedModalEntity] = useState<BusinessEntity | null>(null);

  // Close detail panel on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedModalEntity(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Stop page scrolling & scrollytelling effect while the left detail window is open
  useEffect(() => {
    if (!selectedModalEntity) return;

    const lockedScrollY = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      const scrollEl = detailScrollRef.current;
      if (scrollEl && scrollEl.contains(e.target as Node)) {
        const canScrollUp = e.deltaY < 0 && scrollEl.scrollTop > 0;
        const canScrollDown =
          e.deltaY > 0 &&
          scrollEl.scrollTop + scrollEl.clientHeight < scrollEl.scrollHeight - 1;
        if (canScrollUp || canScrollDown) {
          return; // Allow scrolling inside the left detail box
        }
      }
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollEl = detailScrollRef.current;
      if (scrollEl && scrollEl.contains(e.target as Node)) {
        return; // Allow touch scrolling inside the left detail box
      }
      e.preventDefault();
    };

    const handleKeyScroll = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' ', 'Home', 'End'];
      if (scrollKeys.includes(e.key)) {
        const scrollEl = detailScrollRef.current;
        if (scrollEl && scrollEl.contains(e.target as Node)) {
          return;
        }
        e.preventDefault();
      }
    };

    const handleWindowScroll = () => {
      if (Math.abs(window.scrollY - lockedScrollY) > 1) {
        window.scrollTo(0, lockedScrollY);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyScroll, { passive: false });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyScroll);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [selectedModalEntity]);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'olive-vine':
        return <Heart className="w-3.5 h-3.5 text-[#A3B86C]" />;
      case 'hur-on':
        return <Compass className="w-3.5 h-3.5 text-[#A3B86C]" />;
      case 'mustard-seed':
        return <Sparkles className="w-3.5 h-3.5 text-[#F5B841]" />;
      case 'phroneo':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#F5B841]" />;
      case 'bezalel':
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-[#405329]" />;
    }
  };

  // Responsive scale factor so nodes never overflow on mobile/tablet
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth
  );
  const [scaleFactor, setScaleFactor] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    return computeScale(window.innerWidth);
  });

  // Scale the radial stage harmoniously within both viewport width and height
  const [stageScale, setStageScale] = useState<number>(() =>
    typeof window === 'undefined' ? 1.25 : computeStageScale(window.innerWidth, window.innerHeight)
  );

  // Track window resizing
  React.useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowWidth(w);
      setStageScale(computeStageScale(w, h));
      setScaleFactor(computeScale(w));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // When a logo is clicked, shift the entire radial diagram to the right side
  // and scale it harmoniously so the left detail box and right radial diagram sit side-by-side
  const isDetailOpen = Boolean(selectedModalEntity);
  const radialShiftX = isDetailOpen
    ? windowWidth >= 1024
      ? Math.min(390, Math.round(windowWidth * 0.235))
      : windowWidth >= 768
      ? Math.round(windowWidth * 0.23)
      : 0
    : 0;
  const activeStageScale = isDetailOpen
    ? windowWidth >= 1024
      ? Math.min(stageScale * 0.78, Math.max(0.85, (windowWidth * 0.45) / 620))
      : windowWidth >= 768
      ? Math.max(0.62, (windowWidth * 0.44) / 620)
      : stageScale * 0.85
    : stageScale;

  // Measure scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Gated progress so scrollytelling is completely frozen while the left detail box is open
  const gatedProgress = useMotionValue(0);

  useEffect(() => {
    if (selectedModalEntity) {
      gatedProgress.set(1);
    } else {
      gatedProgress.set(scrollYProgress.get());
    }
  }, [selectedModalEntity, scrollYProgress, gatedProgress]);

  // Smooth spring physics for silky transitions
  const smoothProgress = useSpring(gatedProgress, {
    stiffness: 240,
    damping: 32,
    mass: 0.35,
  });

  // Central Hub transformations
  const centerScale = useTransform(smoothProgress, [0, 0.12], [0.88, 1]);
  const centerOpacity = useTransform(smoothProgress, [0, 0.08], [0.6, 1]);

  // Update step indicator state & gated scrollytelling progress (paused when left window is open)
  useMotionValueEvent(scrollYProgress, 'change', (val) => {
    if (!selectedModalEntity) {
      gatedProgress.set(val);
    }
    if (val < 0.08) setActiveStep(0);
    else if (val < 0.28) setActiveStep(1);
    else if (val < 0.48) setActiveStep(2);
    else if (val < 0.68) setActiveStep(3);
    else setActiveStep(4);
  });

  // Programmatic jump to a step
  const handleJumpToStep = (stepIdx: number) => {
    if (!containerRef.current) return;
    const targets = [0.03, 0.18, 0.38, 0.58, 0.78];
    const targetProgress = targets[stepIdx] ?? 0.03;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: scrollTop + totalScrollable * targetProgress,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320vh] bg-[#FAF9F6] ${className}`}
    >
      {/* Sticky Viewport Stage (Pinned while user scrolls) */}
      <div className="sticky top-0 h-[100svh] w-full select-none overflow-hidden relative">
        {/* Full True-Color Cream Geometric Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-cream-geometric-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />
        {/* Soft Background Accents: Concentric Orbital Rings (Shifts right with diagram when detail box is open) */}
        <motion.div
          animate={{
            x: radialShiftX,
            scale: isDetailOpen && windowWidth >= 768 ? 0.8 : 1,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          {/* Outer dashed orbit circle (very slow drift) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 180, ease: 'linear', repeat: Infinity }}
            className="w-[600px] h-[600px] sm:w-[720px] sm:h-[720px] md:w-[860px] md:h-[860px] rounded-full border border-[#C28D3E]/25 border-dashed"
          />
          {/* Inner dashed orbit circle (counter-rotation) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 140, ease: 'linear', repeat: Infinity }}
            className="absolute w-[400px] h-[400px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full border border-[#2D3A1E]/15 border-dashed"
          />
          {/* Warm centre glow */}
          <div className="absolute w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle,rgba(194,141,62,0.14)_0%,rgba(163,184,108,0.10)_38%,transparent_70%)]" />
        </motion.div>

        {/* Clickable backdrop area when detail box is open so clicking empty space returns diagram to center */}
        {isDetailOpen && (
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => setSelectedModalEntity(null)}
            aria-hidden="true"
          />
        )}

        {/* LEFT SIDE: INLINE DETAIL BOX (Appears on the left when any logo is clicked) */}
        <div className="absolute inset-0 z-30 flex items-center justify-start pt-14 sm:pt-16 px-4 sm:px-8 lg:px-12 xl:px-20 pointer-events-none">
          <div className="w-full max-w-[1440px] mx-auto flex items-center">
            <AnimatePresence mode="wait">
              {selectedModalEntity && (
                <motion.div
                  key={selectedModalEntity.id}
                  initial={{ opacity: 0, x: -44, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -44, scale: 0.96 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  onWheel={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className="pointer-events-auto relative bg-white rounded-3xl border border-[#2D3A1E]/15 shadow-[0_28px_70px_-16px_rgba(20,24,18,0.22)] w-full md:w-[46vw] lg:w-[44vw] max-w-[540px] p-5 sm:p-7 space-y-4 max-h-[78svh] flex flex-col overflow-hidden"
                >
                  {/* Close Button (Always on top & visible) */}
                  <button
                    type="button"
                    onClick={() => setSelectedModalEntity(null)}
                    aria-label="Close details"
                    className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/95 hover:bg-[#2D3A1E] hover:text-white border border-[#2D3A1E]/15 flex items-center justify-center text-[#2D3A1E] transition-all cursor-pointer shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Scrollable Content Container */}
                  <div
                    ref={detailScrollRef}
                    className="flex-1 overflow-y-auto overscroll-contain space-y-4 pr-1 sm:pr-2 scrollbar-thin select-text"
                  >
                    {/* 1. Header: Logo Stage */}
                    <div className="w-full h-32 sm:h-36 bg-[#FAF9F6] rounded-2xl flex items-center justify-center p-4 border border-[#2D3A1E]/8 relative overflow-hidden shadow-[inset_0_1px_3px_rgba(20,24,18,0.03)] shrink-0">
                      <img
                        src={selectedModalEntity.logo}
                        alt={`${selectedModalEntity.name} Logo`}
                        className={`w-auto max-w-[72%] object-contain filter drop-shadow-xs ${
                          selectedModalEntity.id === 'hur-on' ? 'max-h-18 sm:max-h-22' : 'max-h-20 sm:max-h-24'
                        }`}
                      />
                      {/* Top-Right Number */}
                      <span className="absolute top-3 right-3 text-xs font-mono font-bold text-[#405329]">
                        {selectedModalEntity.number}
                      </span>
                    </div>

                    {/* 2. Identity & Mission (Kicker, Title, Tagline, Summary) */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase text-[#4A5D32] block">
                        {selectedModalEntity.ecosystemDomain}
                      </span>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-[#141812] tracking-tight leading-snug">
                        {selectedModalEntity.name}
                      </h2>
                      <p className="font-display text-xs sm:text-sm text-[#3D4F28] italic font-medium">
                        "{selectedModalEntity.tagline}"
                      </p>
                      <p className="font-sans text-xs sm:text-sm text-[#52584E] font-light leading-relaxed pt-0.5">
                        {selectedModalEntity.summary}
                      </p>
                    </div>

                    {/* 3. Core Practice Offerings */}
                    <div className="pt-3 border-t border-[#2D3A1E]/10 space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#52584E] font-semibold">
                        Core Practice Offerings
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#141812]">
                        {selectedModalEntity.focusAreas.map((offering, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-[#FAF9F6] border border-[#2D3A1E]/6">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4A5D32] shrink-0 mt-0.5" />
                            <span className="leading-snug text-[11px] sm:text-xs">{offering}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Primary Audience */}
                    {selectedModalEntity.audience && (
                      <div className="pt-2.5 border-t border-[#2D3A1E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs font-sans text-[#52584E]">
                        <span className="font-mono text-[9.5px] uppercase tracking-wider font-semibold text-[#4A5D32]">
                          Primary Audience:
                        </span>
                        <span className="text-left sm:text-right text-[#141812] font-medium">
                          {selectedModalEntity.audience}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 5. Footer Actions inside Detail Box */}
                  <div className="pt-3 border-t border-[#2D3A1E]/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
                    {selectedModalEntity.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(selectedModalEntity.id) ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] text-[#52584E]/70 border border-[#2D3A1E]/10 text-[11px] font-mono font-semibold tracking-wider cursor-not-allowed select-none">
                        <span>Website Coming Soon</span>
                      </span>
                    ) : selectedModalEntity.website ? (
                      <a
                        href={selectedModalEntity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] hover:bg-[#2D3A1E] text-[#141812] hover:text-white border border-[#2D3A1E]/15 text-[11px] font-mono font-semibold tracking-wider transition-all cursor-pointer group/link"
                      >
                        <span>Visit {selectedModalEntity.shortName}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const bId = selectedModalEntity.id === 'bezalel' ? undefined : selectedModalEntity.id;
                        setSelectedModalEntity(null);
                        onOpenInquiry?.(bId);
                      }}
                      className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#141812] hover:bg-[#2D3A1E] text-[#FAF8F4] text-[11px] sm:text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer shadow-xs ml-auto"
                    >
                      <span>Book a free consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 2. RADIAL DIAGRAM STAGE: Centered by default, smoothly moves to the RIGHT side when a logo is clicked */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pt-10 sm:pt-14 pointer-events-none">
          <motion.div
            animate={{
              x: radialShiftX,
              scale: activeStageScale,
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[340px] sm:h-[380px] md:h-[400px] flex items-center justify-center pointer-events-none"
          >
            {/* SVG Connecting Branch Lines (Drawn from Center Hub to Satellites) */}
            <svg
              className="absolute left-1/2 top-1/2 w-0 h-0 overflow-visible pointer-events-none z-0"
              aria-hidden="true"
            >
              {VENTURES.map((v) => {
                return (
                  <SatelliteConnectorLine
                    key={`line-${v.id}`}
                    venture={v}
                    smoothProgress={smoothProgress}
                    scaleFactor={scaleFactor}
                  />
                );
              })}
            </svg>

            {/* A. SATELLITE NODES (Pop out, travel radially, and spin in one by one!) */}
            {VENTURES.map((v) => (
              <SatelliteNode
                key={v.id}
                venture={v}
                smoothProgress={smoothProgress}
                scaleFactor={scaleFactor}
                isSelected={selectedModalEntity?.id === v.id}
                onOpenInquiry={onOpenInquiry}
                onSelectEntity={(vId) => {
                  const found = BUSINESS_ENTITIES.find((b) => b.id === vId);
                  if (found) {
                    setSelectedModalEntity((prev) => (prev?.id === found.id ? null : found));
                  }
                }}
              />
            ))}

            {/* B. CENTRAL HOLDING HUB — clean logo circle */}
            <motion.div
              style={{
                scale: centerScale,
                opacity: centerOpacity,
                boxShadow:
                  selectedModalEntity?.id === PARENT_COMPANY.id
                    ? '0 0 0 6px #FAF9F6, 0 0 0 9px #C28D3E, 0 28px 60px -14px rgba(30,39,19,0.45)'
                    : '0 0 0 6px #FAF9F6, 0 0 0 7.5px rgba(194,141,62,0.65), 0 28px 60px -14px rgba(30,39,19,0.35)',
              }}
              onClick={() =>
                setSelectedModalEntity((prev) =>
                  prev?.id === PARENT_COMPANY.id ? null : PARENT_COMPANY
                )
              }
              className="pointer-events-auto relative z-20 w-28 h-28 sm:w-40 sm:h-40 md:w-[196px] md:h-[196px] rounded-full bg-white flex flex-col items-center justify-center p-2 text-center cursor-pointer group hover:scale-105 transition-transform"
            >
              {/* Slow gold pulse */}
              <motion.span
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-[#C28D3E]/50 pointer-events-none"
                animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
              />
              {/* Concentric inner ring */}
              <div className="relative overflow-hidden w-full h-full rounded-full bg-white border border-[#C28D3E]/35 flex items-center justify-center">
                <img
                  src="/assets/bezalel-logo.png"
                  alt="Bezalel Inc Logo"
                  className="w-[82%] h-[82%] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   SATELLITE NODE COMPONENT (Pop Out + Spin Effect + Leaf Badge 1:1 with Ref)
============================================================================ */

interface SatelliteNodeProps {
  venture: SatelliteVenture;
  smoothProgress: ReturnType<typeof useSpring>;
  scaleFactor: number;
  isSelected?: boolean;
  onOpenInquiry?: (businessId?: string) => void;
  onSelectEntity?: (businessId: string) => void;
}

const SatelliteNode: React.FC<SatelliteNodeProps> = ({
  venture,
  smoothProgress,
  scaleFactor,
  isSelected = false,
  onOpenInquiry,
  onSelectEntity,
}) => {
  const [start, end] = venture.scrollRange;

  const targetX = venture.targetX * scaleFactor;
  const targetY = venture.targetY * scaleFactor;

  // 1. Radial travel: flies from (0,0) center out to target (X, Y)
  const x = useTransform(smoothProgress, [start, end], [0, targetX]);
  const y = useTransform(smoothProgress, [start, end], [0, targetY]);

  // 2. Pop-out Scale: 0 -> 1.08 -> 1.0
  const mid = start + (end - start) * 0.78;
  const scale = useTransform(smoothProgress, [start, mid, end], [0, 1.08, 1]);
  const opacity = useTransform(smoothProgress, [start, start + 0.05], [0, 1]);

  // Dynamic Leaf Badge CSS Positioning & Shape matching Image 1
  const getLeafStyle = (placement: SatelliteVenture['leafPlacement']) => {
    switch (placement) {
      case 'top-left':
        return {
          wrapperClass: '-top-2 -left-2 sm:-top-2.5 sm:-left-2.5',
          leafClass: 'rounded-tl-[20px] sm:rounded-tl-[24px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[4px]',
        };
      case 'top-right':
        return {
          wrapperClass: '-top-2 -right-2 sm:-top-2.5 sm:-right-2.5',
          leafClass: 'rounded-tr-[20px] sm:rounded-tr-[24px] rounded-tl-[10px] rounded-br-[10px] rounded-bl-[4px]',
        };
      case 'bottom-right':
        return {
          wrapperClass: '-bottom-2 -right-2 sm:-bottom-2.5 sm:-right-2.5',
          leafClass: 'rounded-br-[20px] sm:rounded-br-[24px] rounded-tr-[10px] rounded-bl-[10px] rounded-tl-[4px]',
        };
      case 'bottom-left':
        return {
          wrapperClass: '-bottom-2 -left-2 sm:-bottom-2.5 sm:-left-2.5',
          leafClass: 'rounded-bl-[20px] sm:rounded-bl-[24px] rounded-tl-[10px] rounded-br-[10px] rounded-tr-[4px]',
        };
    }
  };

  const leafStyle = getLeafStyle(venture.leafPlacement);
  const Icon = venture.Icon;

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        boxShadow: isSelected
          ? `0 0 0 5px #FFFFFF, 0 0 0 8px ${venture.accentColor}, 0 26px 52px -10px ${venture.accentColor}80`
          : `0 0 0 5px #FFFFFF, 0 0 0 6.5px ${venture.accentColor}66, 0 22px 44px -12px ${venture.accentColor}59`,
      }}
      className="pointer-events-auto absolute z-10 w-24 h-24 sm:w-36 sm:h-36 md:w-[168px] md:h-[168px] rounded-full bg-white flex flex-col items-center justify-center p-1.5 sm:p-2 text-center cursor-pointer group hover:scale-105 transition-transform"
      onClick={() => onSelectEntity?.(venture.id)}
    >
      {/* 1:1 ORGANIC LEAF BADGE WITH NUMBER (Exact Image 1 detail) */}
      <div className={`absolute z-30 ${leafStyle.wrapperClass} pointer-events-none`}>
        <div
          style={{ backgroundColor: venture.badgeBg }}
          className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 ${leafStyle.leafClass} text-white flex items-center justify-center shadow-md border-2 border-white`}
        >
          <span className="font-mono text-[9.5px] sm:text-[10.5px] md:text-xs font-bold tracking-tight">
            {venture.number}
          </span>
        </div>
      </div>

      {/* Subtle Inner Circular Well — Logo Only */}
      <div className="w-full h-full rounded-full bg-white border border-[#C28D3E]/25 flex items-center justify-center relative overflow-hidden">
        {/* Venture Logo Centered */}
        <div className="relative z-10 w-[86%] h-[78%] flex items-center justify-center">
          <img
            src={venture.logo}
            alt={venture.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================================
   CONNECTING SVG LINE COMPONENT
============================================================================ */

const SatelliteConnectorLine: React.FC<{
  venture: SatelliteVenture;
  smoothProgress: ReturnType<typeof useSpring>;
  scaleFactor: number;
}> = ({ venture, smoothProgress, scaleFactor }) => {
  const [start, end] = venture.scrollRange;
  const targetX = venture.targetX * scaleFactor;
  const targetY = venture.targetY * scaleFactor;

  const pathLength = useTransform(smoothProgress, [start, end], [0, 1]);
  const opacity = useTransform(smoothProgress, [start, start + 0.04], [0, 0.85]);

  const dotOpacity = useTransform(smoothProgress, [end - 0.02, end], [0, 1]);
  const gradId = `grad-${venture.id}`;

  return (
    <g>
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={targetX}
          y2={targetY}
        >
          <stop offset="0%" stopColor="#C28D3E" />
          <stop offset="100%" stopColor={venture.accentColor} />
        </linearGradient>
      </defs>
      <motion.line
        x1="0"
        y1="0"
        x2={targetX}
        y2={targetY}
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength, opacity }}
      />
      {/* Travelling light from hub to venture */}
      <motion.circle
        r="3.5"
        fill="#C28D3E"
        style={{ opacity: dotOpacity }}
        animate={{ cx: [0, targetX], cy: [0, targetY] }}
        transition={{
          duration: 2.8,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.8,
          delay: parseInt(venture.number, 10) * 0.35,
        }}
      />
    </g>
  );
};
