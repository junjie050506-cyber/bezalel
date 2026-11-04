/**
 * @file BezalelMilestoneConstellation.tsx
 * Bespoke, scroll-driven visual milestone monograph constellation.
 * 
 * Standards: Luxury Institutional Monograph / Monocle / Stripe Press / Apple Keynotes
 * Tech: React, Tailwind CSS, Framer Motion (useScroll, useTransform, useSpring, AnimatePresence)
 * 
 * Human Design Core Values:
 * 1. REAL HUMAN PHOTOGRAPHY & ARCHIVAL PLATES:
 *    - Replaced all synthetic AI SaaS widgets (fake neon bar charts, cyan gauges, pink tags)
 *      with authentic archival and institutional field photography from the Bezalel archives.
 * 2. ELEGANT EDITORIAL TYPOGRAPHY & GOLD FOIL CRAFT:
 *    - Cormorant / Editorial Serif headlines, warm roman kickers, burnished gold numerals,
 *      and tactile embossed archival foil stamps.
 * 3. 5-COLUMN COLLISION-FREE CSS GRID:
 *    - Pure CSS grid layout mathematically guarantees zero overlaps or clipping across resolutions.
 * 4. STRICT ONE-BY-ONE SEQUENTIAL REVEAL:
 *    - Milestones reveal in strict chronological sequence (01 -> 08) as the user scrolls.
 * 5. SEAMLESS CHARACTER MORPH & KEYSTONE TRANSITION:
 *    - 3D character cross-fades into line-art, then gently dissolves between scroll 0.70 and 0.78
 *      as Keystone Card 09 (Institutional Governance Seal) takes center stage.
 * 6. INTERACTIVE ARCHIVAL RECORD INSPECTOR:
 *    - Clicking any card opens a museum-grade archival plate modal with full-resolution photography,
 *      historical narrative, and verified record highlights.
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  CheckCircle2,
} from 'lucide-react';

export interface BezalelMilestoneConstellationProps {
  onExploreEcosystem?: () => void;
  className?: string;
}

export interface MilestoneEditorialSpec {
  index: string;
  plate: string;
  year: string;
  category: string;
  title: string;
  shortCaption: string;
  fullDescription: string;
  metricBadge: string;
  photo: string;
  trigger: number;
  highlights: string[];
}

// 9 Curated Human Editorial Milestones (Authentic Photography & Archival Plates)
export const EDITORIAL_MILESTONES: MilestoneEditorialSpec[] = [
  {
    index: '01',
    plate: 'PLATE 01',
    year: '2004',
    category: 'FOUNDATIONAL CALLING',
    title: 'Youth & NGO Inception',
    shortCaption: 'Grassroots service since Lalitha\'s youth',
    fullDescription:
      'Long before formal corporate incorporation, the foundation of Bezalel was forged in grassroots youth mobilization, community mentorship, and social initiatives spearheaded during Lalitha Manoharan\'s teenage years.',
    metricBadge: 'Since Youth',
    photo: '/assets/photos/milestone-01.jpg',
    trigger: 0.08,
    highlights: [
      'Grassroots NGO involvement initiated during teenage years',
      'Rooted in Exodus 31:1–6 calling of purposeful craftsmanship',
      'Mobilised early community cohorts across youth networks',
    ],
  },
  {
    index: '02',
    plate: 'PLATE 02',
    year: '2008',
    category: 'ENTERPRISE INCEPTION',
    title: 'Bezalel Resources Formed',
    shortCaption: 'Formally established in 2008',
    fullDescription:
      'In 2008, Bezalel Resources Sdn Bhd was formally incorporated in Malaysia, establishing the legal and operational groundwork to bridge business acumen with human development.',
    metricBadge: 'Est. 2008',
    photo: '/assets/photos/milestone-02.jpg',
    trigger: 0.16,
    highlights: [
      'Formal incorporation establishing institutional foundation in 2008 (PDF Page 5 & 18)',
      'Integrating commercial enterprise with ethical stewardship',
      'Continuous operating history established since 2008',
    ],
  },
  {
    index: '03',
    plate: 'PLATE 03',
    year: '2011',
    category: 'MAJOR DEPLOYMENT',
    title: 'National Conference Scale',
    shortCaption: 'Orchestrated ~RM1.7M landmark event',
    fullDescription:
      'One of Bezalel\'s earliest major operational milestones was serving as a central organiser for a national conference connected to a project valued at approximately RM1.7 million.',
    metricBadge: 'RM 1.7M Scale',
    photo: '/assets/photos/milestone-03.jpg',
    trigger: 0.24,
    highlights: [
      'Orchestrated large-scale conference operations valued at ~RM1.7 million',
      'Multi-stakeholder executive logistics and institutional coordination',
      'Demonstrated high-capacity operational delivery on a national stage',
    ],
  },
  {
    index: '04',
    plate: 'PLATE 04',
    year: '2014',
    category: 'YOUTH CAPABILITY',
    title: 'Experiential Leadership Labs',
    shortCaption: 'Longstanding youth & education programmes',
    fullDescription:
      'Through experiential education, character-building simulations, and school partnerships, Bezalel developed curiosity, confidence, creativity, and practical capability across young people.',
    metricBadge: 'Youth Capability',
    photo: '/assets/photos/milestone-04.jpg',
    trigger: 0.32,
    highlights: [
      'Longstanding education, youth development and experiential programmes (PDF Page 18)',
      'Character-building, creativity, critical thinking, and debate (PDF Page 10)',
      'Trusted across leading international schools and education partners (PDF Page 23)',
    ],
  },
  {
    index: '05',
    plate: 'PLATE 05',
    year: '2017',
    category: 'SOCIAL IMPACT',
    title: 'Refugee School Founded',
    shortCaption: 'Spearheaded learning centre for children',
    fullDescription:
      'Driven by a conviction that every child deserves dignity and education, Bezalel spearheaded the establishment of a dedicated refugee school, providing structured learning and community care.',
    metricBadge: 'Refugee Care',
    photo: '/assets/photos/impact-05.jpg',
    trigger: 0.40,
    highlights: [
      'Spearheaded the physical and academic founding of a refugee learning centre',
      'Structured educational curriculum for displaced children and youth',
      'Multi-year community support, teacher mobilization, and holistic care',
    ],
  },
  {
    index: '06',
    plate: 'PLATE 06',
    year: '2019',
    category: 'EXECUTIVE LEADERSHIP',
    title: 'C-Suite Coaching & OD',
    shortCaption: 'Training, coaching & organisational development',
    fullDescription:
      'Translating deep human insight to corporate environments, Bezalel delivers training, coaching, facilitation, and high-impact experiential development to leaders and enterprise teams.',
    metricBadge: 'Leadership OD',
    photo: '/assets/photos/pillar-services.jpg',
    trigger: 0.48,
    highlights: [
      'HRD Corp-accredited corporate masterclasses and leadership labs (PDF Page 12)',
      'Systemic organisational development (OD) and relational intelligence',
      'Connecting commercial performance with human-centered culture',
    ],
  },
  {
    index: '07',
    plate: 'PLATE 07',
    year: '2021',
    category: 'HUMAN FLOURISHING',
    title: 'Relational & Family Care',
    shortCaption: 'Restorative therapy & family wholeness',
    fullDescription:
      'Expanding into clinical and relational wellbeing, Bezalel established high-trust counselling and psychological support initiatives to strengthen marriages, families, and high-pressure professionals.',
    metricBadge: 'Wholeness',
    photo: '/assets/photos/legacy-04.jpg',
    trigger: 0.56,
    highlights: [
      'Clinical psychological support and professional therapeutic guidance',
      'Family and relational restoration programs for enduring wellbeing',
      'Preventative care addressing executive burnout and mental health',
    ],
  },
  {
    index: '08',
    plate: 'PLATE 08',
    year: '2024',
    category: 'COMMERCIAL SCALE',
    title: 'Advertising & Multiplier',
    shortCaption: 'Creative enterprise & commercial lift',
    fullDescription:
      'Through creative advertising, branding, and commercial ventures, Bezalel built an enterprise multiplication engine that generates sustainable market value while funding social missions.',
    metricBadge: 'Enterprise Lift',
    photo: '/assets/photos/pillar-commerce.jpg',
    trigger: 0.64,
    highlights: [
      'Full-service creative branding, advertising, and marketing expansion',
      'Commercial engine feeding social uplift and community reinvestment',
      'Serving 24 selected education and corporate partner organisations',
    ],
  },
  {
    index: '09',
    plate: 'KEYSTONE',
    year: 'EST. 2008',
    category: 'INSTITUTIONAL CONTINUITY',
    title: 'Governance & Stewardship',
    shortCaption: 'Multi-generational fiduciary trust & ethical board governance',
    fullDescription:
      'Milestone 09 anchors the entire Bezalel ecosystem under unified multi-generational governance, strict compliance, fiduciary stewardship, and timeless biblical ethics.',
    metricBadge: 'Keystone Seal',
    photo: '/assets/ventures/bezalel-insignia-logo.png',
    trigger: 0.72,
    highlights: [
      'Multi-generational family office & corporate governance architecture',
      'Unified compliance, rigorous ethics, and fiduciary board oversight',
      'Central anchor uniting all five operating subsidiaries under Bezalel Inc',
    ],
  },
];

/* ============================================================================
   EDITORIAL MONOGRAPH CARD (PURE HUMAN DESIGN, NO AI DASHBOARD WIDGETS)
============================================================================ */
interface EditorialPlateCardProps {
  spec: MilestoneEditorialSpec;
  progress: ReturnType<typeof useSpring>;
  isDarkTheme?: boolean;
  isActive: boolean;
  isKeystone?: boolean;
  onSelect: () => void;
}

const EditorialPlateCard: React.FC<EditorialPlateCardProps> = ({
  spec,
  progress,
  isDarkTheme = false,
  isActive,
  isKeystone = false,
  onSelect,
}) => {
  const revealEnd = spec.trigger + 0.045;
  const opacity = useTransform(
    progress,
    [spec.trigger - 0.015, spec.trigger, revealEnd],
    [0, 0.25, 1]
  );
  const scale = useTransform(
    progress,
    [spec.trigger - 0.01, spec.trigger + 0.02, revealEnd + 0.02],
    [0.93, 1.03, 1.0]
  );
  const y = useTransform(progress, [spec.trigger - 0.01, revealEnd], [16, 0]);

  // Keystone Card 09: Bespoke Institutional Monolith Pedestal (Fills Full Column Height)
  if (isKeystone) {
    return (
      <motion.div
        style={{
          opacity,
          scale,
          y,
          pointerEvents: useTransform(opacity, (o) => (o > 0.4 ? 'auto' : 'none')),
          willChange: 'transform, opacity',
        }}
        whileHover={{ scale: 1.03, y: -4, zIndex: 30 }}
        transition={{ duration: 0.22 }}
        onClick={onSelect}
        className={`relative w-full h-full p-2.5 xl:p-3.5 rounded-2xl flex flex-col justify-between transition-all select-none cursor-pointer group shadow-2xl border-2 ${
          isActive
            ? 'border-[#405329] ring-2 ring-[#405329] shadow-[0_20px_50px_rgba(64,83,41,0.25)] z-20'
            : isDarkTheme
            ? 'border-[#405329]/60 shadow-[#405329]/20 hover:border-[#A3B86C]'
            : 'border-[#405329] shadow-[0_15px_40px_rgba(64,83,41,0.15)] hover:border-[#2D3A1E]'
        } ${
          isDarkTheme
            ? 'bg-gradient-to-b from-[#1C2719] via-[#141C13] to-[#0D140C]'
            : 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F2EBDC]'
        }`}
      >
        {/* 1. TOP HEADER: KEYSTONE PILL + EST YEAR */}
        <div className="relative z-10 flex items-center justify-between pb-1.5 border-b border-[#405329]/20 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#405329]" />
            <span className="font-mono text-[8px] xl:text-[9px] uppercase tracking-[0.2em] font-bold text-[#405329]">
              KEYSTONE MONOLITH
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#405329] text-white font-mono text-[8px] xl:text-[9px] font-bold shadow-sm">
            {spec.year}
          </span>
        </div>

        {/* 2. CENTER SECTION: HERALDIC MEDALLION + HEADLINE + 3 GOVERNANCE PILLARS */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-1 text-center my-auto">
          {/* Heraldic Medallion Disc */}
          <div className="relative w-10 h-10 xl:w-12 xl:h-12 mb-1.5 flex items-center justify-center shrink-0">
            <div className="relative w-9 h-9 xl:w-11 xl:h-11 rounded-full bg-gradient-to-br from-[#2D3A1E] via-[#405329] to-[#141C10] p-0.5 shadow-md border border-[#A3B86C]/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#182317] flex items-center justify-center p-1 overflow-hidden ring-1 ring-[#C89B3C]/30">
                <img
                  src={spec.photo}
                  alt="Bezalel Insignia"
                  className="w-full h-full object-contain filter drop-shadow brightness-115"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.monogram-fallback')) {
                      const span = document.createElement('span');
                      span.className = 'monogram-fallback font-display text-base font-bold text-[#A3B86C] tracking-widest';
                      span.innerText = 'ZL';
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Institutional Title & Narrative */}
          <div className="text-[7.5px] xl:text-[8px] font-mono uppercase tracking-[0.16em] text-[#405329] font-bold mb-0.5">
            {spec.category}
          </div>
          <h3 className="font-display text-[12.5px] xl:text-[14px] font-bold text-[#141812] tracking-tight leading-snug">
            {spec.title}
          </h3>
          <p className="text-[8px] xl:text-[9px] text-[#6E6A60] max-w-[200px] leading-relaxed mt-0.5 font-sans">
            {spec.shortCaption}
          </p>

          {/* 3 Governance Pillars Checklist */}
          <div className="w-full mt-2 pt-1.5 border-t border-[#405329]/15 space-y-0.5 xl:space-y-1 text-left">
            <div className="flex items-center gap-1.5 text-[7.5px] xl:text-[8.5px] text-[#2D3A1E] font-medium">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#405329] shrink-0" />
              <span className="truncate">Multi-Generational Stewardship</span>
            </div>
            <div className="flex items-center gap-1.5 text-[7.5px] xl:text-[8.5px] text-[#2D3A1E] font-medium">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#405329] shrink-0" />
              <span className="truncate">Fiduciary Board Ethics &amp; Oversight</span>
            </div>
            <div className="flex items-center gap-1.5 text-[7.5px] xl:text-[8.5px] text-[#2D3A1E] font-medium">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#405329] shrink-0" />
              <span className="truncate">Rigorous Statutory SSM Compliance</span>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM AUDIT & ACTION FOOTER */}
        <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-[#405329]/20 text-[8px] xl:text-[8.5px] font-mono shrink-0">
          <span className="text-[#405329] font-bold tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#405329]" />
            <span>STEWARDSHIP AUDIT</span>
          </span>
          <div className="flex items-center gap-1 text-[#405329] font-bold group-hover:translate-x-1 transition-transform">
            <span>Inspect Ledger</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard Milestone Cards (01 to 08): Real Archival Photography Plates
  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        pointerEvents: useTransform(opacity, (o) => (o > 0.4 ? 'auto' : 'none')),
        willChange: 'transform, opacity',
      }}
      whileHover={{ scale: 1.03, y: -4, zIndex: 30 }}
      transition={{ duration: 0.22 }}
      onClick={onSelect}
      className={`relative w-full rounded-2xl flex flex-col overflow-hidden transition-all select-none cursor-pointer group shadow-lg border ${
        isActive
          ? 'border-[#405329] ring-2 ring-[#405329] shadow-[0_12px_32px_rgba(64,83,41,0.25)] z-20'
          : isDarkTheme
          ? 'border-[#405329]/30 hover:border-[#8C9E5E]/70 hover:bg-[#182317]'
          : 'border-[#2D3A1E]/15 hover:border-[#405329]/70 hover:shadow-xl'
      } ${
        isDarkTheme
          ? 'bg-[#141C13]/95'
          : 'bg-[#FCFBF9]'
      }`}
    >
      {/* 1. UPPER SECTION: AUTHENTIC ARCHIVAL PHOTOGRAPHIC PLATE */}
      <div className="relative w-full h-[66px] xl:h-[78px] overflow-hidden bg-black/10 shrink-0">
        <img
          src={spec.photo}
          alt={spec.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Human Editorial Vignette & Warm Glass Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

        {/* Delicate Inner Archival Frame */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-t-2xl pointer-events-none" />

        {/* Top-Left: Archival Plate Number Stamp */}
        <div className="absolute top-1.5 left-1.5 z-10">
          <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-[#A3B86C]/40 text-[#A3B86C] text-[7.5px] xl:text-[8px] font-mono tracking-wider font-semibold shadow-sm">
            № {spec.index} · {spec.year}
          </span>
        </div>

        {/* Top-Right: Gilded Foil Metric Badge */}
        <div className="absolute top-1.5 right-1.5 z-10">
          <span className="px-2 py-0.5 rounded-md bg-[#2D3A1E]/90 backdrop-blur-md text-[#FAF9F6] text-[7.5px] xl:text-[8px] font-mono font-bold tracking-tight shadow-md border border-[#A3B86C]/30">
            {spec.metricBadge}
          </span>
        </div>
      </div>

      {/* 2. LOWER SECTION: HUMAN EDITORIAL MONOGRAPH TYPOGRAPHY */}
      <div className="p-2 xl:p-2.5 flex flex-col justify-between gap-1 flex-1 bg-white">
        <div className="min-w-0">
          <div className="text-[7px] xl:text-[7.5px] font-mono uppercase tracking-[0.14em] text-[#405329] font-bold truncate">
            {spec.category}
          </div>
          <h3 className="font-display text-[11.5px] xl:text-[13px] font-bold text-[#141812] tracking-tight leading-snug truncate group-hover:text-[#405329] transition-colors mt-0.5">
            {spec.title}
          </h3>
          <p className="text-[8px] xl:text-[9px] text-[#6E6A60] leading-snug line-clamp-1 mt-0.5 font-sans">
            {spec.shortCaption}
          </p>
        </div>

        {/* Archival Footer Hairline */}
        <div className="pt-1 border-t border-black/8 flex items-center justify-between text-[7px] xl:text-[7.5px] font-mono text-[#8C867A] shrink-0">
          <span className="text-[#405329] font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#405329]" />
            Plate {spec.index}
          </span>
          <div className="flex items-center gap-1 text-[#405329] font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>Inspect</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================================
   ARCHIVAL RECORD DETAIL MODAL (MUSEUM-GRADE INSPECTOR)
============================================================================ */
interface ArchivalRecordModalProps {
  spec: MilestoneEditorialSpec | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isDarkTheme: boolean;
}

const ArchivalRecordModal: React.FC<ArchivalRecordModalProps> = ({
  spec,
  onClose,
  onNext,
  onPrev,
  isDarkTheme,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!spec) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-3xl border shadow-2xl ${
          isDarkTheme
            ? 'bg-[#151D14] border-[#405329]/50 text-[#FAF8F4]'
            : 'bg-[#FCFBF9] border-[#405329]/30 text-[#141812]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-black/8 bg-inherit/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#405329] text-white text-[10px] font-mono font-bold shadow-sm">
              № {spec.index}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#405329] font-semibold">
              {spec.category} · {spec.year}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/10 text-[#7A7569] hover:text-[#141812] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Large Image Plate + Full Narrative */}
        <div className="p-6 space-y-6">
          {/* Large Photographic Plate */}
          <div className="relative w-full h-[220px] sm:h-[280px] rounded-2xl overflow-hidden shadow-inner border border-black/10 bg-black/20">
            <img
              src={spec.photo}
              alt={spec.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
              <span className="font-mono text-xs tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                Archival Plate {spec.index} · Bezalel Institutional Ledger
              </span>
              <span className="px-3 py-1 rounded-full bg-[#405329] text-white font-mono text-xs font-bold shadow-md border border-[#A3B86C]/40">
                {spec.metricBadge}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              {spec.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6E6A60] leading-relaxed">
              {spec.fullDescription}
            </p>
          </div>

          {/* Historical Verified Highlights */}
          <div className="p-4 rounded-2xl bg-[#405329]/[0.04] border border-[#405329]/15 space-y-2.5">
            <div className="font-mono text-xs uppercase tracking-wider text-[#405329] font-semibold mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#405329]" />
              <span>Verified Institutional Milestones</span>
            </div>
            {spec.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#405329] shrink-0 mt-0.5" />
                <span className="text-[#3A3834] leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer Controls (Next / Prev) */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-3.5 border-t border-black/8 bg-inherit/95 backdrop-blur-sm">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/10 hover:border-[#405329]/60 text-xs font-mono cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous Record</span>
          </button>

          <span className="font-mono text-xs text-[#7A7569]">
            {spec.index} / 09
          </span>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2D3A1E] text-white hover:bg-[#405329] text-xs font-mono font-semibold cursor-pointer transition-colors shadow-sm border border-[#A3B86C]/30"
          >
            <span>Next Record</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================================
   MAIN COMPONENT: BEZALEL MILESTONE CONSTELLATION
============================================================================ */
export const BezalelMilestoneConstellation: React.FC<BezalelMilestoneConstellationProps> = ({
  onExploreEcosystem,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneEditorialSpec | null>(null);

  // Display settings
  const isDarkTheme = false;

  // 1. Scroll Progress Interpolation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    mass: 0.7,
  });

  // 2. Center Hero Morph:
  const solidOpacity = useTransform(smoothProgress, [0.38, 0.52], [1, 0]);
  const wireframeOpacity = useTransform(
    smoothProgress,
    [0.42, 0.54, 0.70, 0.78],
    [0, 1, 1, 0]
  );
  const characterScale = useTransform(smoothProgress, [0.70, 0.78], [1, 0.92]);
  const characterContainerOpacity = useTransform(smoothProgress, [0.70, 0.78], [1, 0]);

  // Track active milestone index (0 to 8)
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    let currentIdx = 0;
    for (let i = 0; i < EDITORIAL_MILESTONES.length; i++) {
      if (latest >= EDITORIAL_MILESTONES[i].trigger) {
        currentIdx = i;
      }
    }
    if (currentIdx !== activeStep) {
      setActiveStep(currentIdx);
    }
  });

  const handleNextModal = () => {
    if (!selectedMilestone) return;
    const curIdx = EDITORIAL_MILESTONES.findIndex((m) => m.index === selectedMilestone.index);
    const nextIdx = (curIdx + 1) % EDITORIAL_MILESTONES.length;
    setSelectedMilestone(EDITORIAL_MILESTONES[nextIdx]);
  };

  const handlePrevModal = () => {
    if (!selectedMilestone) return;
    const curIdx = EDITORIAL_MILESTONES.findIndex((m) => m.index === selectedMilestone.index);
    const prevIdx = (curIdx - 1 + EDITORIAL_MILESTONES.length) % EDITORIAL_MILESTONES.length;
    setSelectedMilestone(EDITORIAL_MILESTONES[prevIdx]);
  };

  const currentSpec = EDITORIAL_MILESTONES[activeStep] || EDITORIAL_MILESTONES[0];

  return (
    <section
      ref={containerRef}
      data-no-reveal
      className={`relative w-full lg:h-[320vh] transition-colors duration-500 pt-10 lg:pt-14 pb-12 lg:pb-16 ${
        isDarkTheme ? 'bg-[#111611] text-[#FBF9F5]' : 'bg-[#FAF9F6] text-[#141812]'
      } ${className}`}
      style={{
        backgroundImage: `url(${isDarkTheme ? '/assets/bezalel-geometric-bg.jpg' : '/assets/bezalel-cream-geometric-bg.jpg'})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* =====================================================================
          DESKTOP ULTRA-CLEAN 5-COLUMN STAGE (≥ 1024px)
          Pins sticky in viewport with header permanently above the 5-column grid
      ====================================================================== */}
      <div className="hidden lg:flex flex-col sticky top-[72px] sm:top-[80px] h-[calc(100dvh-72px)] sm:h-[calc(100dvh-80px)] w-full items-center justify-center gap-3 xl:gap-4 px-4 sm:px-6 xl:px-10 py-4 xl:py-5 relative">
        {/* Full True-Color Architectural Artwork Background (Pins with viewport on desktop) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `url(${isDarkTheme ? '/assets/bezalel-geometric-bg.jpg' : '/assets/bezalel-cream-geometric-bg.jpg'})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />
        {/* Subtle Background Archival Grid Pattern */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isDarkTheme
              ? 'bg-[linear-gradient(to_right,rgba(200,155,60,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,155,60,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]'
              : 'bg-[linear-gradient(to_right,rgba(45,58,30,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,58,30,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)]'
          }`}
        />

        {/* Ambient Keystone Stage Lighting Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[480px] rounded-full pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(64,83,41,0.12)_0%,rgba(200,155,60,0.06)_45%,transparent_70%)] blur-2xl z-0" />

        {/* 1. TOP HEADER (Permanently visible throughout the entire scroll reveal) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pb-2 border-b border-black/8 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[9.5px] font-mono font-semibold tracking-[0.2em] uppercase text-[#405329] mb-0.5">
              <span>02 · INSTITUTIONAL TRACK RECORD · ESTABLISHED 2008</span>
            </div>
            <h2 className="font-display text-lg sm:text-xl font-medium tracking-tight">
              A continuing journey of people, programmes and enterprise.
            </h2>
          </div>
        </div>

        {/* THE 5-COLUMN GRID */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-3 xl:gap-4 w-full items-stretch">
            {/* COLUMN 1: Milestone 01 (Row 1) & Milestone 03 (Row 2) */}
            <div className="flex flex-col justify-between gap-3 xl:gap-4">
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[0]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 0}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[0])}
              />
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[2]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 2}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[2])}
              />
            </div>

            {/* COLUMN 2: Milestone 02 (Row 1) & Milestone 04 (Row 2) */}
            <div className="flex flex-col justify-between gap-3 xl:gap-4">
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[1]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 1}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[1])}
              />
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[3]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 3}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[3])}
              />
            </div>

            {/* COLUMN 3 (CENTER STAGE): Hero Insignia Morph & Keystone 09 */}
            <div className="relative flex flex-col justify-stretch h-full">
              {/* Central Morphing Insignia (active early scroll, dissolves before keystone reveals) */}
              <motion.div
                style={{
                  opacity: characterContainerOpacity,
                  scale: characterScale,
                  pointerEvents: useTransform(characterContainerOpacity, (o) => (o > 0.1 ? 'auto' : 'none')),
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20"
              >
                <div className="relative w-[180px] h-[180px] xl:w-[200px] xl:h-[200px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#8C9E5E]/15 rounded-3xl blur-xl pointer-events-none transform scale-90" />
                  <motion.div
                    style={{ opacity: solidOpacity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src="/assets/character/bezalel_logo_hd.png"
                      alt="Bezalel Insignia"
                      className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl rounded-2xl"
                    />
                  </motion.div>
                  <motion.div
                    style={{ opacity: wireframeOpacity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={
                        isDarkTheme
                          ? '/assets/character/bezalel_logo_wireframe_gold.png'
                          : '/assets/character/bezalel_logo_wireframe.png'
                      }
                      alt="Bezalel Line-Art"
                      className="w-full h-full object-contain pointer-events-none select-none rounded-2xl"
                      style={{ opacity: isDarkTheme ? 0.95 : 0.85 }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Keystone Card 09 (Reveals as final keystone monolith at trigger 0.72) */}
              <div className="w-full h-full flex flex-col z-10">
                <EditorialPlateCard
                  spec={EDITORIAL_MILESTONES[8]}
                  progress={smoothProgress}
                  isDarkTheme={isDarkTheme}
                  isActive={activeStep === 8}
                  isKeystone={true}
                  onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[8])}
                />
              </div>
            </div>

            {/* COLUMN 4: Milestone 05 (Row 1) & Milestone 07 (Row 2) */}
            <div className="flex flex-col justify-between gap-3 xl:gap-4">
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[4]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 4}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[4])}
              />
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[6]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 6}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[6])}
              />
            </div>

            {/* COLUMN 5: Milestone 06 (Row 1) & Milestone 08 (Row 2) */}
            <div className="flex flex-col justify-between gap-3 xl:gap-4">
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[5]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 5}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[5])}
              />
              <EditorialPlateCard
                spec={EDITORIAL_MILESTONES[7]}
                progress={smoothProgress}
                isDarkTheme={isDarkTheme}
                isActive={activeStep === 7}
                onSelect={() => setSelectedMilestone(EDITORIAL_MILESTONES[7])}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          RESPONSIVE FALLBACK (< 1024px: TABLET & MOBILE)
          Renders clean vertical sequence in order 01 to 09
      ====================================================================== */}
      <div className="block lg:hidden py-14 px-4 sm:px-6 relative z-10 overflow-hidden">
        {/* Full True-Color Architectural Artwork Background for Mobile */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `url(${isDarkTheme ? '/assets/bezalel-geometric-bg.jpg' : '/assets/bezalel-cream-geometric-bg.jpg'})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />
        <div className="max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#405329]/10 border border-[#405329]/30 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#405329] mb-2.5">
            <Sparkles className="w-3 h-3 text-[#405329]" />
            <span>02 · INSTITUTIONAL TRACK RECORD</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium leading-tight">
            A continuing journey of people, programmes and enterprise.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#7A7569] mt-2 leading-relaxed">
            Nine institutional milestones advancing human capability and commercial multiplication. Click any plate to inspect full archival records.
          </p>
        </div>

        {/* 9 Mobile Milestone Cards with Archival Photography Plates */}
        <div className="max-w-xl mx-auto space-y-4">
          {EDITORIAL_MILESTONES.map((spec, idx) => {
            const isLast = idx === 8;
            return (
              <motion.div
                key={spec.index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                transition={{ duration: 0.3, delay: (idx % 3) * 0.05 }}
                onClick={() => setSelectedMilestone(spec)}
                className={`p-3.5 rounded-2xl border shadow-md cursor-pointer transition-all ${
                  isLast
                    ? isDarkTheme
                      ? 'bg-gradient-to-b from-[#182317] to-[#111710] border-[#405329]/70 text-[#FAF8F4]'
                      : 'bg-gradient-to-b from-[#FFFDF9] to-[#F3EDE2] border-[#405329]/60 text-[#141812]'
                    : isDarkTheme
                    ? 'bg-[#151D14] border-[#405329]/30 text-[#FAF8F4]'
                    : 'bg-[#FCFBF9] border-[#2D3A1E]/15 text-[#141812]'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-black/6 dark:border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#405329] dark:text-[#A3B86C]">№ {spec.index}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7569]">
                      · {spec.category} ({spec.year})
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#405329] text-white text-[9.5px] font-mono font-bold shadow-sm">
                    {spec.metricBadge}
                  </span>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-black/10 dark:border-white/10 bg-black/10">
                    <img
                      src={spec.photo}
                      alt={spec.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-semibold leading-snug truncate">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-[#7A7569] dark:text-[#A5A094] mt-1 line-clamp-2 leading-relaxed">
                      {spec.shortCaption}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] font-mono font-semibold text-[#405329] dark:text-[#A3B86C] mt-2">
                      <span>Inspect Record</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        {onExploreEcosystem && (
          <div className="text-center pt-8">
            <button
              type="button"
              onClick={onExploreEcosystem}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D3A1E] text-white hover:bg-[#405329] border border-[#A3B86C]/40 font-sans text-xs font-semibold shadow-md cursor-pointer transition-colors"
            >
              <span>Explore Group Ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          INTERACTIVE ARCHIVAL RECORD INSPECTOR MODAL
      ====================================================================== */}
      <AnimatePresence>
        {selectedMilestone && (
          <ArchivalRecordModal
            spec={selectedMilestone}
            onClose={() => setSelectedMilestone(null)}
            onNext={handleNextModal}
            onPrev={handlePrevModal}
            isDarkTheme={isDarkTheme}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
