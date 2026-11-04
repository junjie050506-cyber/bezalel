import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  BUSINESS_ENTITIES,
} from '../data/ecosystemData';
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Heart,
  Compass,
  Award,
  CheckCircle2,
  X,
  ChevronRight,
  Layers,
} from 'lucide-react';

export interface TactileBentoGridProps {
  onOpenInquiry?: (businessId?: string) => void;
  className?: string;
  initialSelectedId?: string;
}

interface BentoTileProps {
  biz: (typeof BUSINESS_ENTITIES)[0];
  index: number;
  className?: string;
  isHero?: boolean;
  onInspect: (biz: (typeof BUSINESS_ENTITIES)[0]) => void;
  onOpenInquiry?: (businessId?: string) => void;
  isDimmed: boolean;
}

const BENTO_ICONS: Record<string, React.FC<{ className?: string }>> = {
  'olive-vine': Heart,
  'hur-on': Compass,
  'mustard-seed': Sparkles,
  phroneo: ShieldCheck,
};

const BENTO_ACCENTS: Record<
  string,
  {
    badge: string;
    kicker: string;
    lightGlow: string;
    tagColor: string;
    iconColor: string;
    sphere: 'human' | 'enterprise';
    domainLabel: string;
  }
> = {
  'olive-vine': {
    badge: '01',
    kicker: 'Psychological & Relational Wellbeing',
    lightGlow: 'rgba(179, 126, 34, 0.09)',
    tagColor: 'text-[#B37E22] bg-[#B37E22]/10 border-[#B37E22]/25',
    iconColor: 'text-[#B37E22]',
    sphere: 'human',
    domainLabel: 'Therapy · Family Care · Resilience',
  },
  'hur-on': {
    badge: '02',
    kicker: 'Corporate Training & Consultancy',
    lightGlow: 'rgba(59, 84, 36, 0.08)',
    tagColor: 'text-[#3B5424] bg-[#3B5424]/10 border-[#3B5424]/25',
    iconColor: 'text-[#3B5424]',
    sphere: 'human',
    domainLabel: 'Corporate Training · Leadership · Teams',
  },
  'mustard-seed': {
    badge: '03',
    kicker: 'Brand Strategy & Commercial Growth',
    lightGlow: 'rgba(184, 115, 20, 0.09)',
    tagColor: 'text-[#B87314] bg-[#B87314]/10 border-[#B87314]/25',
    iconColor: 'text-[#B87314]',
    sphere: 'enterprise',
    domainLabel: 'Branding · Campaigns · Growth',
  },
  phroneo: {
    badge: '04',
    kicker: 'Corporate Governance & Business Support',
    lightGlow: 'rgba(71, 85, 105, 0.08)',
    tagColor: 'text-[#475569] bg-[#475569]/10 border-[#475569]/25',
    iconColor: 'text-[#475569]',
    sphere: 'enterprise',
    domainLabel: 'Company Secretarial · Compliance',
  },
};

const BentoCard: React.FC<BentoTileProps> = ({
  biz,
  index,
  className = '',
  isHero = false,
  onInspect,
  onOpenInquiry,
  isDimmed,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComp = BENTO_ICONS[biz.id] || Heart;
  const accent = BENTO_ACCENTS[biz.id] || BENTO_ACCENTS['olive-vine'];

  // Mouse position state for localized radial spotlight in light mode
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Spring Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    setMousePos({ x: clientX, y: clientY });

    // Normalize coordinates (-0.5 to 0.5)
    x.set((clientX / rect.width) - 0.5);
    y.set((clientY / rect.height) - 0.5);
  }, [x, y]);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group rounded-3xl bg-white border border-[#141812]/10 hover:border-[#141812]/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_12px_32px_-12px_rgba(20,24,18,0.06)] hover:shadow-[0_20px_45px_-15px_rgba(20,24,18,0.12)] ${
        isDimmed ? 'opacity-35 pointer-events-none' : 'opacity-100'
      } ${className}`}
    >
      {/* Light Mode Radial Spotlight (Linear / Apple Pro style) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${accent.lightGlow}, transparent 70%)`,
        }}
      />

      {/* Internal Background Texture & Subtle Hairline Grid */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-[#141812]/[0.015] via-transparent to-transparent opacity-60 z-0" />

      {/* Card Header */}
      <div className="relative z-10 p-6 sm:p-7 space-y-4">
        {/* Meta Row: Entity Number Badge & Category Pill */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#FAF9F6] border border-[#141812]/10 font-mono text-xs font-bold text-[#141812] flex items-center justify-center">
              {biz.number}
            </span>
            <span
              className={`text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${accent.tagColor}`}
            >
              {accent.domainLabel}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#141812]/10 flex items-center justify-center group-hover:border-[#141812]/30 transition-colors">
            <IconComp className={`w-4 h-4 ${accent.iconColor}`} />
          </div>
        </div>

        {/* Brand Logo & Name Showcase */}
        <div className="pt-2">
          {/* Logo Plate (Clean Alabaster Surface) */}
          <div className="h-16 sm:h-20 w-full rounded-2xl bg-[#FAF9F6] border border-[#141812]/[0.08] flex items-center justify-center p-3.5 mb-4 group-hover:border-[#141812]/20 shadow-[inset_0_1px_3px_rgba(20,24,18,0.02)] transition-all">
            {biz.logo ? (
              <img
                src={biz.logo}
                alt={`${biz.name} Logo`}
                className={`max-h-full max-w-[85%] object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105 ${
                  biz.id === 'mustard-seed' ? 'h-12 sm:h-14' : 'h-9 sm:h-11'
                }`}
              />
            ) : (
              <span className="font-display text-2xl font-bold tracking-wider text-[#141812] uppercase">
                {biz.name}
              </span>
            )}
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#141812] tracking-tight leading-snug">
            {biz.name}
          </h3>
          <p className="font-display text-sm sm:text-base text-[#405329] italic mt-1 leading-snug font-normal">
            “{biz.tagline}”
          </p>
        </div>

        {/* Narrative Summary */}
        <p className="text-xs sm:text-sm text-[#42493E] leading-relaxed line-clamp-3 pt-1">
          {biz.summary}
        </p>

        {/* Practice Highlights (Pills) */}
        <div className="pt-3 border-t border-[#141812]/[0.08] space-y-1.5">
          <div className="text-[10px] font-mono tracking-widest text-[#405329] uppercase font-semibold">
            Key Scope of Practice
          </div>
          <div className="flex flex-wrap gap-1.5">
            {biz.focusAreas.slice(0, isHero ? 4 : 2).map((area, i) => (
              <span
                key={i}
                className="text-[11px] bg-[#FAF9F6] hover:bg-[#F3EFE6] border border-[#141812]/[0.07] text-[#2D3A1E] px-2.5 py-1 rounded-lg font-medium transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="relative z-10 px-6 sm:px-7 py-4 bg-[#FAF9F6]/90 border-t border-[#141812]/[0.08] flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onInspect(biz)}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#141812] hover:text-[#405329] transition-colors cursor-pointer group/btn"
        >
          <span>Inspect Full Profile</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#405329] group-hover/btn:translate-x-1 transition-transform" />
        </button>

        {biz.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(biz.id) ? (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#141812]/10 text-[#52584E] text-xs font-semibold cursor-not-allowed select-none">
            Coming Soon
          </span>
        ) : biz.website ? (
          <a
            href={biz.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141812] hover:bg-[#24301C] text-[#FAF9F6] text-xs font-semibold transition-all cursor-pointer shadow-xs group/link"
          >
            <span>Visit Site</span>
            <ArrowUpRight className="w-3 h-3 text-[#E6B94D] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onOpenInquiry && onOpenInquiry(biz.id)}
            className="text-xs text-[#405329] hover:underline font-mono font-semibold cursor-pointer"
          >
            Inquire →
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const TactileBentoGrid: React.FC<TactileBentoGridProps> = ({
  onOpenInquiry,
  className = '',
  initialSelectedId = 'olive-vine',
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'human' | 'enterprise'>('all');
  const [inspectedBiz, setInspectedBiz] = useState<(typeof BUSINESS_ENTITIES)[0] | null>(null);

  const biz1 = BUSINESS_ENTITIES[0]; // 01 Olive & Vine
  const biz2 = BUSINESS_ENTITIES[1]; // 02 HUR-ON
  const biz3 = BUSINESS_ENTITIES[2]; // 03 Mustard Seed & Co
  const biz4 = BUSINESS_ENTITIES[3]; // 04 Phroneo BoardSuite

  return (
    <div className={`relative w-full text-[#141812] select-none ${className}`}>
      {/* Bento Controls Bar (White / Alabaster Surface) */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-[#141812]/10 shadow-[0_4px_20px_-4px_rgba(20,24,18,0.04)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#405329]/10 border border-[#405329]/20 flex items-center justify-center">
            <Layers className="w-4 h-4 text-[#405329]" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-kicker text-[#405329] uppercase">
              <span>Ecosystem Practice Grid</span>
              <span aria-hidden="true" className="text-[#141812]/30">·</span>
              <span>Four Specialized Operating Arms</span>
            </div>
            <h3 className="font-display text-lg font-medium text-[#141812] tracking-tight">
              Select any operating subsidiary to explore capabilities, leadership & scope
            </h3>
          </div>
        </div>

        {/* Live Filter Segmented Controls */}
        <div className="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-2xl border border-[#141812]/[0.08] self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#141812] text-[#FAF9F6] shadow-xs font-semibold'
                : 'text-[#52584E] hover:text-[#141812]'
            }`}
          >
            All 4 Ventures
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('human')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeFilter === 'human'
                ? 'bg-[#141812] text-[#FAF9F6] shadow-xs font-semibold'
                : 'text-[#52584E] hover:text-[#141812]'
            }`}
          >
            Human Core (01–02)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('enterprise')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeFilter === 'enterprise'
                ? 'bg-[#141812] text-[#FAF9F6] shadow-xs font-semibold'
                : 'text-[#52584E] hover:text-[#141812]'
            }`}
          >
            Enterprise (03–04)
          </button>
        </div>
      </div>

      {/* 3D Bento Grid Structure: 4 Balanced Cards (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* ROW 1 LEFT: 01 OLIVE & VINE (6 Columns) */}
        {biz1 && (
          <BentoCard
            biz={biz1}
            index={0}
            isHero={true}
            className="md:col-span-6 min-h-[380px]"
            onInspect={(b) => setInspectedBiz(b)}
            onOpenInquiry={onOpenInquiry}
            isDimmed={activeFilter === 'enterprise'}
          />
        )}

        {/* ROW 1 RIGHT: 02 HUR-ON (6 Columns) */}
        {biz2 && (
          <BentoCard
            biz={biz2}
            index={1}
            className="md:col-span-6 min-h-[380px]"
            onInspect={(b) => setInspectedBiz(b)}
            onOpenInquiry={onOpenInquiry}
            isDimmed={activeFilter === 'enterprise'}
          />
        )}

        {/* ROW 2 LEFT: 03 MUSTARD SEED (6 Columns) */}
        {biz3 && (
          <BentoCard
            biz={biz3}
            index={2}
            className="md:col-span-6 min-h-[360px]"
            onInspect={(b) => setInspectedBiz(b)}
            onOpenInquiry={onOpenInquiry}
            isDimmed={activeFilter === 'human'}
          />
        )}

        {/* ROW 2 RIGHT: 04 PHRONEO (6 Columns) */}
        {biz4 && (
          <BentoCard
            biz={biz4}
            index={3}
            className="md:col-span-6 min-h-[360px]"
            onInspect={(b) => setInspectedBiz(b)}
            onOpenInquiry={onOpenInquiry}
            isDimmed={activeFilter === 'human'}
          />
        )}
      </div>

      {/* In-Place Expandable Inspection Drawer (White Mode Modal Tray) */}
      <AnimatePresence>
        {inspectedBiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90dvh] bg-white border border-[#141812]/15 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-[0_24px_60px_-15px_rgba(20,24,18,0.25)] text-[#141812] flex flex-col justify-between"
            >
              <div>
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#141812]/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#FAF9F6] border border-[#141812]/10 font-mono text-xs font-bold text-[#141812] flex items-center justify-center">
                      {inspectedBiz.number}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#405329] uppercase font-semibold block">
                        Ecosystem Practice Dossier
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-medium text-[#141812]">
                        {inspectedBiz.name}
                      </h4>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setInspectedBiz(null)}
                    aria-label="Close practice dossier"
                    className="p-2 rounded-full bg-[#FAF9F6] hover:bg-[#EAE4D7] text-[#141812] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Logo Showcase Plate */}
                <div className="my-6 p-6 rounded-2xl bg-[#FAF9F6] border border-[#141812]/[0.08] flex items-center justify-center min-h-[110px] relative overflow-hidden group shadow-[inset_0_1px_3px_rgba(20,24,18,0.02)]">
                  {inspectedBiz.logo ? (
                    <img
                      src={inspectedBiz.logo}
                      alt={`${inspectedBiz.name} Logo`}
                      className="max-h-16 max-w-[85%] object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="font-display text-2xl font-bold tracking-wider text-[#141812] uppercase">
                      {inspectedBiz.name}
                    </div>
                  )}
                </div>

                {/* Narrative & Tagline */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#405329] uppercase tracking-wider font-semibold">
                    <span>{inspectedBiz.category}</span>
                  </div>
                  <p className="font-display text-xl text-[#141812] italic font-normal leading-snug">
                    “{inspectedBiz.tagline}”
                  </p>
                  <p className="text-sm text-[#42493E] leading-relaxed pt-1">
                    {inspectedBiz.summary}
                  </p>
                </div>

                {/* Scope of Practice */}
                <div className="pt-5 mt-5 border-t border-[#141812]/10 space-y-3">
                  <div className="text-[11px] font-mono tracking-widest text-[#405329] uppercase font-semibold">
                    Complete Scope of Practice & Capabilities
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {inspectedBiz.focusAreas.map((area, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#141812]/[0.06] text-xs text-[#141812]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#405329] shrink-0 mt-0.5" />
                        <span className="leading-snug">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Brand Message Banner */}
                <div className="mt-5 p-4 rounded-xl bg-[#141812] text-[#FAF9F6] text-center font-mono text-xs uppercase tracking-wider font-semibold shadow-xs">
                  {inspectedBiz.coreMessage}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-[#141812]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                {inspectedBiz.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(inspectedBiz.id) ? (
                  <div
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#141812]/10 text-[#52584E] text-xs font-semibold cursor-not-allowed border border-[#141812]/10 select-none"
                  >
                    <span>Website Coming Soon</span>
                  </div>
                ) : inspectedBiz.website ? (
                  <a
                    href={inspectedBiz.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#141812] hover:bg-[#24301C] text-[#FAF9F6] text-xs font-semibold transition-all cursor-pointer shadow-md group/link"
                  >
                    <span>Visit {inspectedBiz.shortName} Official Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E6B94D] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                ) : null}

                {onOpenInquiry && (
                  <button
                    type="button"
                    onClick={() => {
                      setInspectedBiz(null);
                      onOpenInquiry(inspectedBiz.id);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF9F6] hover:bg-[#EAE4D7] text-[#141812] border border-[#141812]/15 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>Inquire with Secretariat</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
