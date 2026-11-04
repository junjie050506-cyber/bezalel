import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PHILOSOPHY_ACRONYM, BUSINESS_ENTITIES } from '../data/ecosystemData';

export const PHOTO_MAP: Record<string, { src: string; alt: string; isLogo?: boolean }> = {
  // 5 Operating Ventures + General & Marketplace
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
  'marketplace': {
    src: '/assets/photos/venture-marketplace.jpg',
    alt: 'Kingdom Marketplace — Purpose-Led Business and Service Network',
  },

  // 6 Kingdom Marketplace Pillars
  'Commerce': {
    src: '/assets/photos/pillar-commerce.jpg',
    alt: 'Commerce — Ethical Marketplace for Goods, Crafts, and Trade',
  },
  'pillar-commerce': {
    src: '/assets/photos/pillar-commerce.jpg',
    alt: 'Commerce — Ethical Marketplace for Goods, Crafts, and Trade',
  },
  'Services': {
    src: '/assets/photos/pillar-services.jpg',
    alt: 'Services — High-Trust Professional, Creative, and Operational Service Networks',
  },
  'pillar-services': {
    src: '/assets/photos/pillar-services.jpg',
    alt: 'Services — High-Trust Professional, Creative, and Operational Service Networks',
  },
  'Employment': {
    src: '/assets/photos/pillar-employment.jpg',
    alt: 'Employment — Dignified Work Placements, Apprenticeships, and Talent Matching',
  },
  'pillar-employment': {
    src: '/assets/photos/pillar-employment.jpg',
    alt: 'Employment — Dignified Work Placements, Apprenticeships, and Talent Matching',
  },
  'Partnerships': {
    src: '/assets/photos/pillar-partnerships.jpg',
    alt: 'Partnerships — Collaborative Consortia Across Communities and Enterprises',
  },
  'pillar-partnerships': {
    src: '/assets/photos/pillar-partnerships.jpg',
    alt: 'Partnerships — Collaborative Consortia Across Communities and Enterprises',
  },
  'Learning': {
    src: '/assets/photos/pillar-learning.jpg',
    alt: 'Learning — Continuous Wisdom Transfer, Masterclasses, and Executive Mentorship',
  },
  'pillar-learning': {
    src: '/assets/photos/pillar-learning.jpg',
    alt: 'Learning — Continuous Wisdom Transfer, Masterclasses, and Executive Mentorship',
  },
  'Impact': {
    src: '/assets/photos/pillar-impact.jpg',
    alt: 'Impact — Social Return, Livelihood Generation, and Generational Stewardship',
  },
  'pillar-impact': {
    src: '/assets/photos/pillar-impact.jpg',
    alt: 'Impact — Social Return, Livelihood Generation, and Generational Stewardship',
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

  // 6 Legacy Statements
  'legacy-01': {
    src: '/assets/photos/legacy-01.jpg',
    alt: 'A young person discovers capability',
  },
  'legacy-02': {
    src: '/assets/photos/legacy-02.jpg',
    alt: 'An individual strengthens their inner life',
  },
  'legacy-03': {
    src: '/assets/photos/legacy-03.jpg',
    alt: 'An employee becomes a leader',
  },
  'legacy-04': {
    src: '/assets/photos/legacy-04.jpg',
    alt: 'An entrepreneur builds a sustainable enterprise',
  },
  'legacy-05': {
    src: '/assets/photos/legacy-05.jpg',
    alt: 'A business creates jobs',
  },
  'legacy-06': {
    src: '/assets/photos/legacy-06.jpg',
    alt: 'A recipient becomes an opportunity creator',
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

  // 4 Timeline Milestones
  'milestone-01': {
    src: '/assets/photos/milestone-01.jpg',
    alt: '2004 Vision — Purposeful Craftsmanship',
  },
  'milestone-02': {
    src: '/assets/photos/milestone-02.jpg',
    alt: '2008 Formation — Bezalel Resources Established',
  },
  'milestone-03': {
    src: '/assets/photos/milestone-03.jpg',
    alt: 'Build Exploration — Conferences & Community Education',
  },
  'milestone-04': {
    src: '/assets/photos/milestone-04.jpg',
    alt: 'Today Ecosystem — Five Connected Ventures',
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

  // 7 Core Values
  'value-01': {
    src: '/assets/photos/value-01.jpg',
    alt: 'Service — Lead by Serving',
  },
  'value-02': {
    src: '/assets/photos/value-02.jpg',
    alt: 'Stewardship — Entrusted Responsibility',
  },
  'value-03': {
    src: '/assets/photos/value-03.jpg',
    alt: 'Integrity — Principled Governance',
  },
  'value-04': {
    src: '/assets/photos/value-04.jpg',
    alt: 'Excellence — Quality & Continual Improvement',
  },
  'value-05': {
    src: '/assets/photos/value-05.jpg',
    alt: 'People — See the Person Before the Transaction',
  },
  'value-06': {
    src: '/assets/photos/value-06.jpg',
    alt: 'Enterprise — Sustainable Solutions',
  },
  'value-07': {
    src: '/assets/photos/value-07.jpg',
    alt: 'Multiplication — Outcomes That Continue Through Others',
  },
};

/* ============================================================================
   1. INTERACTIVE PHOTOGRAPHIC ECOSYSTEM CANOPY (UNIFIED VENTURE VIEWER)
   High-density interactive card with integrated segmented dock & pristine logo stage
============================================================================ */
export interface HeroSculpturalGraphicProps {
  selectedId?: string;
  onHoverVenture?: (id: string | null) => void;
  onSelectVenture?: (id: string) => void;
  className?: string;
}

export const HeroSculpturalGraphic: React.FC<HeroSculpturalGraphicProps> = ({
  selectedId,
  onHoverVenture,
  onSelectVenture,
  className = '',
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string>(
    selectedId || BUSINESS_ENTITIES[0].id
  );

  const activeId = selectedId || internalActiveId;

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    onSelectVenture?.(id);
  };

  const handleHover = (id: string | null) => {
    onHoverVenture?.(id);
  };

  const activeBiz =
    BUSINESS_ENTITIES.find((b) => b.id === activeId) || BUSINESS_ENTITIES[0];

  return (
    <div
      className={`w-full rounded-3xl bg-[#FAF9F6] border border-[#141812]/10 p-5 sm:p-6 shadow-[0_20px_50px_-20px_rgba(20,24,18,0.08)] flex flex-col gap-5 select-none transition-all duration-300 ${className}`}
    >
      {/* 1. Header Bar: Status Metadata & Venture Counter */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#141812]/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4A5D32] animate-pulse" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.16em] uppercase text-[#4A5D32]">
            Ecosystem Directory
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#52584E]">
          <span className="font-semibold text-[#141812]">{activeBiz.number}</span>
          <span className="text-[#141812]/30">/</span>
          <span>04</span>
        </div>
      </div>

      {/* 2. Visual Staging Canvas: Logo cleanly isolated without destructive overlays */}
      <div className="w-full h-48 sm:h-52 rounded-2xl bg-white border border-[#141812]/[0.06] p-5 relative flex items-center justify-center overflow-hidden shadow-[inset_0_1px_3px_rgba(20,24,18,0.03)] group">
        {/* Subtle radial depth illumination */}
        <div className="absolute inset-0 bg-radial from-[#F5F2EB]/80 via-transparent to-transparent pointer-events-none opacity-70" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeBiz.id}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex items-center justify-center relative z-10"
          >
            {activeBiz.logo ? (
              <img
                src={activeBiz.logo}
                alt={activeBiz.name}
                className={`w-auto max-w-[85%] object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105 ${
                  activeBiz.id === 'hur-on'
                    ? 'max-h-16 sm:max-h-20 scale-105'
                    : activeBiz.id === 'phroneo'
                    ? 'max-h-22 sm:max-h-24'
                    : 'max-h-20 sm:max-h-22'
                }`}
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="font-display text-3xl font-bold tracking-tight text-[#141812]">
                  {activeBiz.shortName}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#52584E] uppercase">
                  Venture {activeBiz.number}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Category Pill Tag: Floating upper-left */}
        <div className="absolute top-3 left-3 z-20">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeBiz.category}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#141812]/10 text-[10px] font-mono font-medium tracking-wide text-[#3D4F28] shadow-xs"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#C49B37]" />
              <span className="truncate max-w-[220px]">{activeBiz.category}</span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Typographic Information Bay */}
      <div className="space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBiz.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4A5D32] font-semibold block mb-0.5">
                  {activeBiz.ecosystemDomain}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#141812] tracking-tight leading-snug">
                  {activeBiz.name}
                </h3>
              </div>
              {activeBiz.website && (
                (activeBiz.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(activeBiz.id)) ? (
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#141812]/10 text-[#52584E] text-xs font-semibold cursor-not-allowed shrink-0 select-none"
                    title="Website Coming Soon"
                  >
                    <span>Coming Soon</span>
                  </span>
                ) : (
                  <a
                    href={activeBiz.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#141812] hover:bg-[#2A3520] text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs shrink-0 group/cta"
                    title={`Visit ${activeBiz.shortName} official website`}
                  >
                    <span>Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E6B94D] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                  </a>
                )
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#52584E] leading-relaxed line-clamp-2">
              {activeBiz.tagline}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Integrated Segmented Control Dock: No detached floating row */}
      <div className="pt-1">
        <div
          role="tablist"
          aria-label="Operating ventures selector"
          className="grid grid-cols-4 p-1 bg-[#EFECE6] border border-[#141812]/[0.07] rounded-2xl gap-1 relative"
        >
          {BUSINESS_ENTITIES.map((biz) => {
            const isSelected = biz.id === activeId;
            return (
              <button
                key={biz.id}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                type="button"
                onMouseEnter={() => handleHover(biz.id)}
                onClick={() => handleSelect(biz.id)}
                className={`relative py-2 px-1 rounded-xl text-center transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5 z-10 ${
                  isSelected
                    ? 'text-[#141812] font-semibold'
                    : 'text-[#656C60] hover:text-[#141812]'
                }`}
              >
                {/* Active Spring Backing Pill */}
                {isSelected && (
                  <motion.div
                    layoutId="activeVentureDockPill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-white shadow-xs border border-[#141812]/[0.08]"
                  />
                )}
                <span className="relative z-10 font-mono text-[10px] tracking-wider uppercase opacity-75">
                  {biz.number}
                </span>
                <span className="relative z-10 text-[11px] font-medium truncate max-w-full px-0.5">
                  {biz.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   2. RELATED PHOTOGRAPH / LOGO COMPONENT FOR CARDS & BANNERS
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
   4. B.E.Z.A.L.E.L. PHOTOGRAPHIC PHILOSOPHY SHOWCASE
   Replaces procedural radial SVG wheel with real related photography
============================================================================ */
export const PhilosophyVisualWheel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  return (
    <div className="w-full bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-[#2D3A1E]/12 shadow-sm select-none">
      {/* Top 7-Letter Photographic Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-6 mb-6 border-b border-[#2D3A1E]/10">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6B38] block">
            7-Pillar Ethos
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1A1A1A]">
            The B·E·Z·A·L·E·L Mandate
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#F4F1EA]/80 rounded-2xl border border-[#2D3A1E]/10">
          {PHILOSOPHY_ACRONYM.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={`${item.letter}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseMove={() => {
                  if (activeIndex !== idx) setActiveIndex(idx);
                }}
                onPointerEnter={() => setActiveIndex(idx)}
                onPointerDown={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                aria-label={`Pillar ${idx + 1}: ${item.title}`}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-display text-base sm:text-lg font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#2D3A1E] text-[#F5B841] shadow-md scale-105 ring-2 ring-[#2D3A1E]/20'
                    : 'bg-white/90 text-[#2D3A1E] hover:bg-[#2D3A1E]/15'
                }`}
              >
                <span className="pointer-events-none select-none">{item.letter}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Principle Photographic Card */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.12 }}
        className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
      >
        <div className="sm:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden bg-[#1E2713] relative border border-[#2D3A1E]/12 shadow-xs">
          <img
            src={activePhoto.src}
            alt={activeItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-mono text-[#F5B841] uppercase tracking-widest pointer-events-none">
            0{activeIndex + 1} / 07 · {activeItem.letter}
          </div>
        </div>

        <div className="sm:col-span-6 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D3A1E]/8 text-[#2D3A1E] font-mono text-[11px] uppercase tracking-widest font-semibold">
            <span>Pillar 0{activeIndex + 1}</span>
          </div>
          <h4 className="font-display text-2xl sm:text-3xl font-semibold text-[#1A1A1A] leading-tight">
            {activeItem.title}
          </h4>
          <p className="text-sm text-[#4A4A4A] leading-relaxed">
            {activeItem.description}
          </p>
          <p className="text-xs font-mono text-[#5A6B38] pt-2 border-t border-[#2D3A1E]/10">
            {activeItem.implication}
          </p>
        </div>
      </motion.div>
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
