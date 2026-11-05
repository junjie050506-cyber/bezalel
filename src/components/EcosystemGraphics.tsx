import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PHILOSOPHY_ACRONYM } from '../data/ecosystemData';

export const PHOTO_MAP: Record<string, { src: string; alt: string; isLogo?: boolean }> = {
  // Operating Ventures & Group
  'bezalel': {
    src: '/assets/ventures/bezalel-insignia-logo.png',
    alt: 'BEZALEL — Youth STEM Enrichment, Capability & Marketplace Ecosystem',
    isLogo: true,
  },
  'bezalel-insignia': {
    src: '/assets/ventures/bezalel-insignia-logo.png',
    alt: 'BEZALEL — Youth STEM Enrichment, Capability & Marketplace Ecosystem',
    isLogo: true,
  },
  'olive-vine': {
    src: '/assets/ventures/olive-vine-logo.png',
    alt: 'Olive & Vine Psychological Solutions — Counseling and Relational Wellbeing',
    isLogo: true,
  },
  'hur-on': {
    src: '/assets/ventures/hur-on-logo.png',
    alt: 'HUR-ON Training & Consultancy — Corporate Training, Executive Masterclasses and Team Development',
    isLogo: true,
  },
  'mustard-seed': {
    src: '/assets/ventures/mustard-seed-logo.png',
    alt: 'Mustard Seed & Co — Creative Branding, Design Studio and Digital Strategy',
    isLogo: true,
  },
  'phroneo': {
    src: '/assets/ventures/phroneo-logo.png',
    alt: 'Phroneo BoardSuite — Corporate Governance, Compliance and Board Advisory',
    isLogo: true,
  },
  'general': {
    src: '/assets/ventures/bezalel-insignia-logo.png',
    alt: 'BEZALEL INC Group — Integrated Ecosystem Architecture',
    isLogo: true,
  },

  // 5 Impact Chain Stages
  'impact-01': {
    src: '/assets/photos/impact-develop-capability.jpg',
    alt: '01 Develop Capability — The Learner & The Individual',
  },
  'impact-02': {
    src: '/assets/photos/impact-create-opportunity.jpg',
    alt: '02 Create Opportunity — The Professional & Family',
  },
  'impact-03': {
    src: '/assets/photos/impact-build-enterprise.jpg',
    alt: '03 Build Enterprise — The Founder & Organisation',
  },
  'impact-04': {
    src: '/assets/photos/impact-multiply-livelihoods.jpg',
    alt: '04 Multiply Livelihoods — The Workplace & Community',
  },
  'impact-05': {
    src: '/assets/photos/impact-extend-impact.jpg',
    alt: '05 Extend Impact — Future Generations',
  },

  // 8 Stakeholder / Audience Groups
  'audience-01': {
    src: '/assets/photos/audience-01.jpg',
    alt: 'Children & young people',
  },
  'audience-02': {
    src: '/assets/photos/audience-02.jpg',
    alt: 'Parents & families',
  },
  'audience-03': {
    src: '/assets/photos/audience-03.jpg',
    alt: 'Professionals & employees',
  },
  'audience-04': {
    src: '/assets/photos/audience-04.jpg',
    alt: 'Leaders & teams',
  },
  'audience-05': {
    src: '/assets/photos/audience-05.jpg',
    alt: 'Entrepreneurs & SMEs',
  },
  'audience-06': {
    src: '/assets/photos/audience-06.jpg',
    alt: 'Established organisations',
  },
  'audience-07': {
    src: '/assets/photos/audience-07.jpg',
    alt: 'Schools & education communities',
  },
  'audience-08': {
    src: '/assets/photos/audience-08.jpg',
    alt: 'Purpose-led organisations',
  },

  // 7 B.E.Z.A.L.E.L. Philosophy Principles
  'philosophy-01': {
    src: '/assets/photos/mandate-01-build-people.jpg',
    alt: 'B — Build People',
  },
  'philosophy-02': {
    src: '/assets/photos/mandate-02-equip-potential.jpg',
    alt: 'E — Equip Potential',
  },
  'philosophy-03': {
    src: '/assets/photos/mandate-03-zeal-purpose.jpg',
    alt: 'Z — Zeal With Purpose',
  },
  'philosophy-04': {
    src: '/assets/photos/mandate-04-advance-opportunity.jpg',
    alt: 'A — Advance Opportunity',
  },
  'philosophy-05': {
    src: '/assets/photos/mandate-05-lead-service.jpg',
    alt: 'L — Lead Through Service',
  },
  'philosophy-06': {
    src: '/assets/photos/mandate-06-establish-enterprise.jpg',
    alt: 'E — Establish Enterprise',
  },
  'philosophy-07': {
    src: '/assets/photos/mandate-07-leave-legacy.jpg',
    alt: 'L — Leave A Legacy',
  },
};

/* ============================================================================
   1. RELATED PHOTOGRAPH / LOGO COMPONENT FOR CARDS & BANNERS
============================================================================ */
export const BusinessGraphicArt: React.FC<{
  businessId: string;
  imageSrc?: string;
  altText?: string;
}> = ({ businessId, imageSrc, altText }) => {
  const mapped = PHOTO_MAP[businessId] || PHOTO_MAP['bezalel-insignia'];
  const src = imageSrc || mapped.src;
  const alt = altText || mapped.alt;
  const isLogo = !imageSrc && Boolean(mapped.isLogo);

  if (isLogo) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#FAF9F6] flex items-center justify-center p-6 sm:p-10 select-none group">
        <img
          src={src}
          alt={alt}
          className="max-w-[85%] max-h-[72%] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#1E2713] select-none group">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
    </div>
  );
};

/* ============================================================================
   3. THE MULTIPLIER EFFECT — CAROUSEL SLIDER WITH PREVIEW (1:1 with Reference)
   Ultra-clean, direct, and summarized cards with side-by-side next-card preview,
   dark/light alternating contrast, nested photo frame, and bottom-right arrows.
============================================================================ */
export const ImpactFlowGraphic: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const activeStageRef = useRef<number>(0);
  activeStageRef.current = activeStage;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isPointerDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftStartRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  const stages = [
    {
      index: '01',
      kicker: 'Human Foundation',
      tabLabel: '01 · People',
      statNumber: '08',
      statLabel: 'Life Stages',
      headline: 'Equip the person. Inner wellbeing shapes how people live and lead.',
      subtitle: 'Psychological care and executive training serving 8 distinct life stages.',
      actionText: 'Explore capabilities',
      actionHref: '/ecosystem',
      photo: '/assets/photos/multiplier-01-individual.jpg',
      badgeText: 'HUR-ON · OLIVE & VINE',
      theme: 'dark' as const,
    },
    {
      index: '02',
      kicker: 'Enterprise Catalyst',
      tabLabel: '02 · Enterprise',
      statNumber: '05',
      statLabel: 'Businesses',
      headline: 'Strengthen enterprise. Wise structure helps business endure and scale.',
      subtitle: '5 specialised ventures uniting corporate governance, branding, and training.',
      actionText: 'Explore operating ventures',
      actionHref: '/ecosystem',
      photo: '/assets/photos/multiplier-02-enterprise.jpg',
      badgeText: 'MUSTARD SEED · PHRONEO',
      theme: 'light' as const,
    },
    {
      index: '03',
      kicker: 'Compounding Impact',
      tabLabel: '03 · Opportunity',
      statNumber: '24',
      statLabel: 'Organisations',
      headline: 'Multiply opportunity. Turning capability into lasting community impact.',
      subtitle: 'Compounding value across 24 selected education and corporate partners.',
      actionText: 'View selected partners',
      actionHref: '/clients',
      photo: '/assets/photos/multiplier-03-ripple.jpg',
      badgeText: 'BEZALEL ECOSYSTEM',
      theme: 'dark' as const,
    },
    {
      index: '04',
      kicker: 'Enduring Legacy',
      tabLabel: '04 · Legacy',
      statNumber: '2008',
      statLabel: 'Est. 2008',
      headline: 'A legacy measured by what continues through people.',
      subtitle: 'Purpose-led stewardship and enduring standards established since 2008.',
      actionText: 'Read our story & ethos',
      actionHref: '/story',
      photo: '/assets/photos/legacy-04.jpg',
      badgeText: 'EXODUS 31:1–6',
      theme: 'light' as const,
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollLeft, clientWidth, scrollWidth } = container;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-card="true"]')
    );
    const lastCard = cards[cards.length - 1];

    // Hard boundary guarantee for the last card (04 · Legacy)
    if (
      (lastCard && scrollLeft >= lastCard.offsetLeft - 30) ||
      scrollLeft + clientWidth >= scrollWidth - 35
    ) {
      setActiveStage(stages.length - 1);
      activeStageRef.current = stages.length - 1;
      return;
    }

    // Hard boundary guarantee for the first card
    if (scrollLeft <= 15) {
      setActiveStage(0);
      activeStageRef.current = 0;
      return;
    }

    if (cards.length > 0) {
      let closestIndex = 0;
      let minDistance = Infinity;
      cards.forEach((card, idx) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });
      setActiveStage(closestIndex);
      activeStageRef.current = closestIndex;
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-card="true"]')
    );
    if (cards[index]) {
      container.scrollTo({
        left: cards[index].offsetLeft,
        behavior: 'smooth',
      });
      setActiveStage(index);
      activeStageRef.current = index;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !scrollRef.current) return;
    const delta = e.pageX - startXRef.current;
    if (Math.abs(delta) > 6) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }
    scrollRef.current.scrollLeft = scrollLeftStartRef.current - delta * 1.25;
  };

  const handleMouseUpOrLeave = () => {
    isPointerDownRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
      setIsDragging(false);
    }, 60);
  };

  const [nearLeft, setNearLeft] = useState<boolean>(false);
  const [nearRight, setNearRight] = useState<boolean>(false);

  const handleTrackMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const threshold = 140;
    setNearLeft(x <= threshold);
    setNearRight(width - x <= threshold);
  };

  const handleTrackMouseLeave = () => {
    setNearLeft(false);
    setNearRight(false);
  };

  const handlePrev = () => {
    const prev = activeStage === 0 ? stages.length - 1 : activeStage - 1;
    scrollToIndex(prev);
  };

  const handleNext = () => {
    const next = activeStage === stages.length - 1 ? 0 : activeStage + 1;
    scrollToIndex(next);
  };

  return (
    <div ref={rootRef} className="w-full select-none">
      {/* Top Segmented Pills (Clean, minimal progress tabs) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div
          role="tablist"
          aria-label="Multiplier Effect Stages"
          className="inline-flex p-1.5 rounded-full bg-[#EAE4D7] border border-[#2D3A1E]/10 self-start overflow-x-auto max-w-full scrollbar-none"
        >
          {stages.map((st, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={st.index}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'text-[#FAF8F4]'
                    : 'text-[#161814]/70 hover:text-[#161814]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="multiplierActivePill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#141B0C] shadow-sm"
                  />
                )}
                <span className="relative z-10">{st.tabLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-[#4A4F44]">
          <span className="tabular-nums font-medium text-[#161814]">
            Stage 0{activeStage + 1} of 0{stages.length}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-[#405329] font-medium">Scroll, swipe, or use arrows</span>
        </div>
      </div>

      {/* CAROUSEL TRACK: Clean, direct cards with next-card preview on the right */}
      <div
        className="relative"
        onMouseMove={handleTrackMouseMove}
        onMouseLeave={handleTrackMouseLeave}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 px-1 select-none ${
            isDragging ? 'scroll-auto cursor-grabbing' : 'scroll-smooth cursor-grab'
          }`}
        >
        {stages.map((st, idx) => {
          const isDark = st.theme === 'dark';

          return (
            <div
              key={st.index}
              data-card="true"
              onClick={() => {
                if (hasDraggedRef.current) return;
                if (activeStage !== idx) {
                  scrollToIndex(idx);
                }
              }}
              className={`snap-start shrink-0 w-[86vw] sm:w-[80vw] md:w-[75vw] lg:w-[720px] xl:w-[780px] rounded-3xl sm:rounded-[32px] p-6 sm:p-8 lg:p-9 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-lg ${
                isDark
                  ? 'bg-[#141B0C] text-[#FAF8F4] border border-white/10'
                  : 'bg-[#F0ECE1] text-[#141812] border border-[#2D3A1E]/15'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch h-full">
                {/* Left 7 Columns: Minimal, direct editorial content */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6 py-1">
                  <div>
                    {/* Top Tag & Big Stat */}
                    <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                          isDark
                            ? 'bg-white/10 text-[#A3B86C] border border-white/15'
                            : 'bg-white text-[#405329] border border-[#2D3A1E]/12 shadow-2xs'
                        }`}
                      >
                        {st.kicker}
                      </span>

                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`font-display text-4xl sm:text-5xl font-semibold tabular-nums leading-none tracking-tight ${
                            isDark ? 'text-[#F5B841]' : 'text-[#2D3A1E]'
                          }`}
                        >
                          {st.statNumber}
                        </span>
                        <span
                          className={`text-[11px] font-mono uppercase tracking-wider ${
                            isDark ? 'text-white/60' : 'text-[#52584E]'
                          }`}
                        >
                          {st.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3
                      className={`font-display text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-tight leading-[1.14] ${
                        isDark ? 'text-[#FAF8F4]' : 'text-[#141812]'
                      }`}
                    >
                      {st.headline}
                    </h3>

                    {/* Short direct subtitle */}
                    <p
                      className={`mt-3 text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-[#EAE4D7]/75' : 'text-[#52584E]'
                      }`}
                    >
                      {st.subtitle}
                    </p>
                  </div>

                  {/* Clean 1-line Action CTA */}
                  <div className="pt-4 sm:pt-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (hasDraggedRef.current) return;
                        navigate(st.actionHref);
                      }}
                      className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all group/link cursor-pointer ${
                        isDark
                          ? 'text-[#F5B841] hover:text-white'
                          : 'text-[#2D3A1E] hover:text-[#405329]'
                      }`}
                    >
                      <span>{st.actionText}</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right 5 Columns: Image carrier with rounded frame and frosted glass badge (1:1 with reference) */}
                <div className="md:col-span-5 relative flex items-center">
                  <div className="relative w-full h-[220px] sm:h-[260px] md:h-full min-h-[220px] md:min-h-[300px] rounded-2xl sm:rounded-[22px] overflow-hidden bg-black/20 group">
                    <img
                      src={st.photo}
                      alt={st.headline}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

                    {/* Inset Frosted Glass Logo Badge (1:1 with reference Image 1) */}
                    <div className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/25 text-white font-mono text-[11px] font-semibold tracking-wider shadow-md">
                      {st.badgeText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Trailing clearance: allows the last card (04 · Legacy) to scroll all the way to start alignment */}
        <div
          className="shrink-0 w-[14vw] sm:w-[20vw] md:w-[25vw] lg:w-[calc(100%-700px)] xl:w-[calc(100%-760px)] min-w-[32px] pointer-events-none"
          aria-hidden="true"
        />
        </div>

        {/* Left Circular Arrow Button on Left Side (Only visible when cursor is nearby and not on first slide) */}
        {activeStage > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/35 bg-white/25 backdrop-blur-md hover:bg-[#141B0C]/80 hover:text-white hover:border-white/40 text-[#141812] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md active:scale-95 ${
              nearLeft
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Circular Arrow Button on Right Side (Only visible when cursor is nearby and not on last slide) */}
        {activeStage < stages.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/35 bg-white/25 backdrop-blur-md hover:bg-[#141B0C]/80 hover:text-white hover:border-white/40 text-[#141812] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md active:scale-95 ${
              nearRight
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* BOTTOM CONTROLS: Left progress indicator dots */}
      <div className="flex items-center justify-between pt-4 sm:pt-6">
        <div className="flex items-center gap-2">
          {stages.map((st, idx) => (
            <button
              key={st.index}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeStage === idx
                  ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#2D3A1E]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#2D3A1E]/25 hover:bg-[#2D3A1E]/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <span className="ml-2 font-mono text-[11px] sm:text-xs font-semibold text-[#52584E]">
            0{activeStage + 1} / 0{stages.length}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   4. B.E.Z.A.L.E.L. TACTILE ROTARY KNOB SELECTOR & PHILOSOPHY SHOWCASE
============================================================================ */
const ROTARY_SHORT_LABELS = [
  'Build',
  'Equip',
  'Zeal',
  'Advance',
  'Lead',
  'Establish',
  'Legacy',
];

const ROTARY_ACCENT_HUES = [42, 145, 28, 198, 268, 86, 335];

export const PhilosophyVisualWheel: React.FC = () => {
  const totalItems = PHILOSOPHY_ACRONYM.length; // 7 pillars (B·E·Z·A·L·E·L)
  const stepDeg = 360 / totalItems;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDialOpen, setIsDialOpen] = useState<boolean>(true);
  const [knobAngle, setKnobAngle] = useState<number>(-90);

  const activeItem = PHILOSOPHY_ACRONYM[activeIndex] || PHILOSOPHY_ACRONYM[0];
  const photoKey = `philosophy-0${activeIndex + 1}`;
  const activePhoto = PHOTO_MAP[photoKey] || PHOTO_MAP['philosophy-01'];

  // Preload all 7 pillar images so switching is instant and lag-free
  useEffect(() => {
    PHILOSOPHY_ACRONYM.forEach((_, idx) => {
      const key = `philosophy-0${idx + 1}`;
      const photo = PHOTO_MAP[key];
      if (photo?.src) {
        const img = new Image();
        img.src = photo.src;
      }
    });
  }, []);

  const handleSelectIndex = (nextIdx: number) => {
    setActiveIndex(nextIdx);
    if (!isDialOpen) {
      setIsDialOpen(true);
    }
    setKnobAngle((prevAngle) => {
      const targetBase = -90 + nextIdx * stepDeg;
      const currentMod = ((prevAngle % 360) + 360) % 360;
      const targetMod = ((targetBase % 360) + 360) % 360;
      let delta = targetMod - currentMod;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      return prevAngle + delta;
    });
  };

  const accentHue = ROTARY_ACCENT_HUES[activeIndex % ROTARY_ACCENT_HUES.length];

  return (
    <div
      data-theme="light"
      style={
        {
          '--angle': `${knobAngle}deg`,
          '--accent-hue': `${accentHue}deg`,
        } as React.CSSProperties
      }
      className="bezalel-rotary-scene relative w-full rounded-3xl p-6 sm:p-10 border border-[#2D3A1E]/15 shadow-xl overflow-hidden bg-[#F4F1EA]"
    >
      {/* Full True-Color Ivory Cream Geometric Architectural Artwork Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/assets/bezalel-cream-geometric-bg.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Subtle Architectural Blueprint Dotted Guidelines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 px-4 sm:px-6 lg:px-8 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 h-full"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-dashed border-[#2D3A1E]/[0.07] h-full" />
        ))}
      </div>

      {/* Main Split Grid: Tactile Rotary Selector + Synchronized Pillar Card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Tactile Rotary Selector */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center py-4 sm:py-6">
          <div className={`selector ${isDialOpen ? 'active' : ''}`}>
            <div
              className="knob"
              role="button"
              tabIndex={0}
              aria-label={isDialOpen ? 'Collapse rotary selector' : 'Expand rotary selector'}
              aria-expanded={isDialOpen}
              onClick={() => setIsDialOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDialOpen((prev) => !prev);
                }
              }}
            >
              <div className="knob-rotor" />
              <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="font-display text-2xl sm:text-3xl font-bold leading-none text-[#181a1b]">
                  {activeItem.letter}
                </span>
              </div>
            </div>

            <ul>
              {PHILOSOPHY_ACRONYM.map((item, idx) => {
                const isSelected = idx === activeIndex;
                const itemRotation = idx * stepDeg;

                return (
                  <li
                    key={`${item.letter}-${idx}`}
                    style={
                      {
                        '--item-angle': `${itemRotation}deg`,
                        '--is-selected': isSelected ? 1 : 0,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className={`font-display text-lg sm:text-xl transition-all duration-300 pointer-events-none leading-none ${
                        isSelected
                          ? 'scale-125 opacity-100 font-bold'
                          : 'opacity-55 font-semibold hover:opacity-85'
                      }`}
                    >
                      {item.letter}
                    </span>
                    <input
                      type="radio"
                      name="bezalel-philosophy-choice"
                      checked={isSelected}
                      onChange={() => handleSelectIndex(idx)}
                      aria-label={`${item.letter} — ${item.title}`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right Column: Active Principle Detail Card */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0.65, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-6 space-y-5 text-left rounded-2xl p-5 sm:p-6 bg-[#2D3A1E] text-[#FAF9F6] border border-[#405329] shadow-md"
        >
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#1E2713] relative border border-white/10 shadow-sm">
            <img
              src={activePhoto.src}
              alt={activeItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6B94D]/15 text-[#E6B94D] font-mono text-[11px] uppercase tracking-widest font-semibold">
              <span>
                {activeItem.letter} — {ROTARY_SHORT_LABELS[activeIndex]}
              </span>
            </div>
            <h4 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-[#FAF9F6]">
              {activeItem.title}
            </h4>
            <p className="text-sm text-[#FAF9F6]/85 leading-relaxed">
              {activeItem.description}
            </p>
            <p className="text-xs font-mono text-[#E6B94D]/90 pt-3 border-t border-white/15">
              {activeItem.implication}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


/* ============================================================================
   5. START HERO TRILOGY PHOTOGRAPHIC BANNER
   Replaces SVG banner with a 3-panel real photographic showcase
============================================================================ */
export const StartHeroTrilogyBanner: React.FC = () => {
  const panels = [
    {
      code: '01 · PEOPLE',
      title: 'Cultivate Capability & Wellbeing',
      src: '/assets/photos/flow-people.jpg',
    },
    {
      code: '02 · ENTERPRISE',
      title: 'Build Resilient Brands & Governance',
      src: '/assets/photos/flow-enterprise.jpg',
    },
    {
      code: '03 · LEGACY',
      title: 'Multiply Opportunity & Livelihoods',
      src: '/assets/photos/flow-opportunity.jpg',
    },
  ];

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-[#2D3A1E]/15 shadow-lg bg-[#1E2713] p-3 sm:p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {panels.map((panel) => (
          <div
            key={panel.code}
            className="relative h-44 sm:h-52 rounded-2xl overflow-hidden group border border-white/10"
          >
            <img
              src={panel.src}
              alt={panel.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161D0E]/90 via-[#161D0E]/30 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <span className="self-start px-3 py-1 rounded-full bg-black/50 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5B841] border border-white/15">
                {panel.code}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-white leading-snug">
                {panel.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
