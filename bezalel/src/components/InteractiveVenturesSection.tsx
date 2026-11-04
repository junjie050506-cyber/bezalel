import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_ENTITIES } from '../data/ecosystemData';
import { BusinessGraphicArt } from './EcosystemGraphics';
import { ScrollReveal } from './MotionContainer';

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  companyId: string;
  category: string;
  tag: string;
}

export const SERVICE_CATEGORIES = [
  {
    id: 'all',
    label: 'All Capabilities',
    companyLabel: 'All 4 Ventures',
    logo: null,
  },
  {
    id: 'olive-vine',
    label: 'Psychological Care',
    companyLabel: 'Olive & Vine',
    logo: '/assets/ventures/olive-vine-logo.png',
  },
  {
    id: 'hur-on',
    label: 'Corporate Training',
    companyLabel: 'HUR-ON',
    logo: '/assets/ventures/hur-on-logo.png',
  },
  {
    id: 'mustard-seed',
    label: 'Brand & Growth',
    companyLabel: 'Mustard Seed & Co',
    logo: '/assets/ventures/mustard-seed-logo.png',
  },
  {
    id: 'phroneo',
    label: 'Corporate Governance',
    companyLabel: 'Phroneo BoardSuite',
    logo: '/assets/ventures/phroneo-logo.png',
  },
];

export const SERVICE_CATALOG: ServiceItem[] = [
  // 01 · Olive & Vine
  {
    id: 'srv-therapy',
    title: 'Clinical Psychotherapy & Individual Support',
    desc: 'Confidential therapy for children, youth, and adults facing emotional transitions, anxiety, and grief.',
    companyId: 'olive-vine',
    category: 'Psychological Care',
    tag: 'Clinical Psychotherapy',
  },
  {
    id: 'srv-marriage',
    title: 'Marriage & Relational Dynamics Counseling',
    desc: 'Restorative couples therapy, pre-marital alignment, and relational coaching to rebuild lasting interpersonal trust.',
    companyId: 'olive-vine',
    category: 'Psychological Care',
    tag: 'Couples & Marriage',
  },
  {
    id: 'srv-family',
    title: 'Parenting Coaching & Family Restorations',
    desc: 'Holistic family systems guidance, adolescent understanding, and evidence-based parenting communication.',
    companyId: 'olive-vine',
    category: 'Psychological Care',
    tag: 'Family & Parenting',
  },
  {
    id: 'srv-wellness',
    title: 'Corporate Emotional Wellbeing & Trauma Care',
    desc: 'Workplace mental health workshops, emotional resilience training, and executive crisis support.',
    companyId: 'olive-vine',
    category: 'Psychological Care',
    tag: 'Workplace Wellness',
  },

  // 02 · Hur-On (SPARK, PULSE, BLOOM, VERVE Divisions)
  {
    id: 'srv-spark',
    title: 'SPARK — Children & Youth Development',
    desc: 'Creativity, communication, leadership and enrichment programmes developing young people from an early stage.',
    companyId: 'hur-on',
    category: 'People & Development',
    tag: 'SPARK · Youth',
  },
  {
    id: 'srv-pulse',
    title: 'PULSE — Corporate Training & Consultancy',
    desc: 'HRD Corp-accredited corporate training, leadership alignment, teamwork and relational intelligence for enterprises.',
    companyId: 'hur-on',
    category: 'People & Development',
    tag: 'PULSE · Corporate',
  },
  {
    id: 'srv-bloom',
    title: 'BLOOM — Seniors, Parents & Adults',
    desc: 'Purposeful activities, continuous learning, and relational enrichment programmes for seniors, parents and adults.',
    companyId: 'hur-on',
    category: 'People & Development',
    tag: 'BLOOM · Adults & Seniors',
  },
  {
    id: 'srv-verve',
    title: 'VERVE — Events, Camps & Competitions',
    desc: 'High-energy school camps, inter-school competitions, conferences and experiential development programmes.',
    companyId: 'hur-on',
    category: 'People & Development',
    tag: 'VERVE · Experiential',
  },

  // 03 · Mustard Seed & Co
  {
    id: 'srv-branding',
    title: 'Brand Strategy, Positioning & Identity',
    desc: 'Strategic brand architecture, visual identity redesigns, tone of voice, and market clarity for ambitious ventures.',
    companyId: 'mustard-seed',
    category: 'Brand & Growth',
    tag: 'Brand Architecture',
  },
  {
    id: 'srv-campaigns',
    title: 'Digital Marketing, Advertising & Campaigns',
    desc: 'High-impact creative direction, commercial advertising, narrative campaigns, and new product launch acceleration.',
    companyId: 'mustard-seed',
    category: 'Brand & Growth',
    tag: 'Campaign Direction',
  },
  {
    id: 'srv-digital',
    title: 'Social Media, Content & Websites',
    desc: 'Modern digital storytelling, multi-channel narrative presence, and commercial digital touchpoints.',
    companyId: 'mustard-seed',
    category: 'Brand & Growth',
    tag: 'Digital Systems',
  },
  {
    id: 'srv-growth-consult',
    title: 'Campaigns & Business Growth Consultancy',
    desc: 'Helping emerging and growing organisations clarify their position, communicate value and pursue sustainable growth.',
    companyId: 'mustard-seed',
    category: 'Brand & Growth',
    tag: 'Business Growth',
  },

  // 04 · Phroneo BoardSuite
  {
    id: 'srv-secretarial',
    title: 'Business Registration & Incorporation',
    desc: 'Full corporate secretarial statutory compliance, SSM filings, company formation, and regulatory maintenance.',
    companyId: 'phroneo',
    category: 'Corporate Governance',
    tag: 'Statutory Secretarial',
  },
  {
    id: 'srv-esop',
    title: 'Corporate Secretarial & Board Governance',
    desc: 'Companies Act 2016 alignment, director fiduciary obligations, board charters, and statutory administration.',
    companyId: 'phroneo',
    category: 'Corporate Governance',
    tag: 'Board Governance',
  },
  {
    id: 'srv-governance',
    title: 'Financial Administration & Compliance',
    desc: 'Structured administrative foundations, licensing, statutory audits, and operational continuity for growing enterprises.',
    companyId: 'phroneo',
    category: 'Corporate Governance',
    tag: 'Financial Admin',
  },
  {
    id: 'srv-trademark',
    title: 'Business Support, IP & Advisory',
    desc: 'MyIPO trademark filings, corporate restructuring advisory, and long-term governance stewardship.',
    companyId: 'phroneo',
    category: 'Corporate Governance',
    tag: 'Business Advisory',
  },
];

export interface InteractiveVenturesSectionProps {
  onOpenInquiry?: (companyId?: string, serviceTitle?: string) => void;
  externalSelectedVenture?: { id: string; timestamp: number } | null;
  className?: string;
}

export const InteractiveVenturesSection: React.FC<InteractiveVenturesSectionProps> = ({
  onOpenInquiry,
  externalSelectedVenture,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-pulse');

  useEffect(() => {
    if (!externalSelectedVenture) return;
    const ventureId = externalSelectedVenture.id;
    setSelectedCategory(ventureId);
    if (ventureId !== 'all') {
      const firstInCat = SERVICE_CATALOG.find((s) => s.companyId === ventureId);
      if (firstInCat) {
        setSelectedServiceId(firstInCat.id);
      }
    }
  }, [externalSelectedVenture]);

  const activeService =
    SERVICE_CATALOG.find((s) => s.id === selectedServiceId) ||
    SERVICE_CATALOG[0];
  const matchingCompany =
    BUSINESS_ENTITIES.find((b) => b.id === activeService.companyId) ||
    BUSINESS_ENTITIES[0];
  const filteredServices =
    selectedCategory === 'all'
      ? SERVICE_CATALOG
      : SERVICE_CATALOG.filter((s) => s.companyId === selectedCategory);

  const filterTabListRef = useRef<HTMLDivElement>(null);

  const handleFilterKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const total = SERVICE_CATEGORIES.length;
    let targetIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      targetIndex = (currentIndex + 1) % total;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (currentIndex - 1 + total) % total;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = total - 1;
    } else {
      return;
    }
    e.preventDefault();
    const newCat = SERVICE_CATEGORIES[targetIndex];
    setSelectedCategory(newCat.id);
    if (newCat.id !== 'all') {
      const firstInCat = SERVICE_CATALOG.find((s) => s.companyId === newCat.id);
      if (firstInCat) setSelectedServiceId(firstInCat.id);
    }
    const buttons = filterTabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[targetIndex]?.focus();
  };

  return (
    <section
      id="interactive-ventures"
      className={`relative z-10 py-12 sm:py-16 bg-[#1A2216] overflow-hidden border-b border-[#141812]/12 ${className}`}
    >
      {/* Full True-Color Split Olive & Cream Architectural Artwork Background (Fixed parallax attachment - stays stationary while scrolling) */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-white/15">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 type-kicker text-[#E6B94D] mb-2 font-mono">
                <span>03 · Our Ecosystem &amp; Service Navigator</span>
              </div>
              <h2 className="text-h2 font-semibold text-[#FAF9F6] mb-2 drop-shadow-sm">
                Distinct expertise.{' '}
                <span className="text-[#E6B94D]">
                  One shared purpose.
                </span>
              </h2>
              <p className="text-body text-[#FAF9F6]/85">
                Explore the four specialised businesses that make up the Bezalel Inc ecosystem—operating independently in craft while connected by one group purpose.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => onOpenInquiry?.()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAF9F6] hover:bg-white text-[#141812] border border-[#141812]/15 text-caption font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shadow-low"
              >
                <span>Enquire with the Group</span>
                <ArrowUpRight className="w-4 h-4 text-[#405329]" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Unified Segmented Venture & Capability Switcher */}
        <ScrollReveal direction="up" delay={0.08}>
          <div className="mb-8">
            <div
              ref={filterTabListRef}
              role="tablist"
              aria-label="Ventures and capabilities filter"
              className="w-full flex flex-wrap xl:flex-nowrap items-center justify-between gap-1.5 p-1.5 bg-[#FAF9F6]/95 backdrop-blur-md rounded-xl border border-white/20 shadow-sm"
            >
              {SERVICE_CATEGORIES.map((cat, idx) => {
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      if (cat.id !== 'all') {
                        const firstInCat = SERVICE_CATALOG.find((s) => s.companyId === cat.id);
                        if (firstInCat) setSelectedServiceId(firstInCat.id);
                      }
                    }}
                    onKeyDown={(e) => handleFilterKeyDown(e, idx)}
                    className={`relative flex-1 flex items-center justify-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-[12px] xl:text-[13px] leading-tight font-medium transition-colors duration-200 cursor-pointer select-none whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#405329] ${
                      isActive
                        ? 'text-[#141812] font-semibold'
                        : 'text-[#42493E] hover:text-[#141812]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeServiceTabPill"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        className="absolute inset-0 bg-white rounded-lg shadow-low border border-[#141812]/12"
                      />
                    )}
                    {cat.logo ? (
                      <img
                        src={cat.logo}
                        alt=""
                        className={`relative z-10 object-contain transition-all duration-200 h-4 w-auto max-w-[46px] shrink-0 ${
                          isActive ? 'opacity-100' : 'opacity-70'
                        }`}
                      />
                    ) : null}
                    <span className="relative z-10 font-sans">
                      {cat.id === 'all' ? cat.label : `${cat.companyLabel} · ${cat.label}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Split Interactive Stage: Left Capabilities & Venture Context + Right Flagship Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLUMNS: Interactive Services Selector */}
          <div className="lg:col-span-7 space-y-4">
            {/* Capabilities Grid Header */}
            <div className="flex items-center justify-between pb-1 text-caption text-[#FAF9F6]/85">
              <span className="type-kicker text-[#E6B94D] font-mono">
                Specialised Capabilities &amp; Divisions
              </span>
              <span className="text-caption text-[#FAF9F6]/75">
                Select a capability to inspect deliverables &amp; connect
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredServices.map((service, sIndex) => {
                const isSelected = selectedServiceId === service.id;
                const serviceCompany = BUSINESS_ENTITIES.find(
                  (b) => b.id === service.companyId
                );

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -25px 0px' }}
                    transition={{ duration: 0.35, delay: (sIndex % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`group p-4 sm:p-6 rounded-xl border text-left transition-colors duration-200 cursor-pointer flex flex-col justify-between min-h-[160px] w-full relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#405329] ${
                        isSelected
                          ? 'bg-white border-[#405329] shadow-mid ring-1 ring-[#405329]/25'
                          : 'bg-white hover:bg-[#FAF9F6] border-[#141812]/12 hover:border-[#405329]/40 shadow-low'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-sm bg-[#F4F6F0] text-caption font-mono uppercase font-medium text-[#405329]">
                            {service.tag}
                          </span>
                          <div className="flex items-center gap-1.5 text-caption font-medium text-[#5A6255]">
                            {serviceCompany?.logo && (
                              <img
                                src={serviceCompany.logo}
                                alt=""
                                className="h-4 w-auto max-w-[40px] object-contain opacity-75"
                              />
                            )}
                            <span className="truncate max-w-[104px]">
                              {serviceCompany?.shortName}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-h3 font-semibold text-[#141812] group-hover:text-[#405329] mb-2">
                          {service.title}
                        </h3>

                        <p className="text-caption text-[#42493E] line-clamp-2">
                          {service.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#141812]/12 w-full text-caption">
                        <span
                          className={`font-medium ${
                            isSelected ? 'text-[#405329] font-semibold' : 'text-[#5A6255]'
                          }`}
                        >
                          {isSelected ? `Selected · ${serviceCompany?.shortName}` : 'Click to inspect details'}
                        </span>
                        {isSelected ? (
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenInquiry?.(service.companyId, service.title);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.stopPropagation();
                                onOpenInquiry?.(service.companyId, service.title);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#2D3A1E] hover:bg-[#405329] text-white text-caption font-medium transition-colors"
                          >
                            <span>Inquire</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#E6B94D]" />
                          </span>
                        ) : (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all border border-[#405329]/24 text-[#405329] group-hover:border-[#405329]">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </motion.button>

                    {/* MOBILE INLINE DRAWER */}
                    <div className="lg:hidden">
                      <AnimatePresence>
                        {isSelected && matchingCompany && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 p-6 rounded-xl bg-[#F4F1EA] border border-[#2D3A1E]/24 shadow-low space-y-4">
                              <div className="flex items-center justify-between border-b border-[#141812]/12 pb-3">
                                <span className="type-kicker text-[#405329]">
                                  {matchingCompany.number} · {matchingCompany.ecosystemDomain}
                                </span>
                                <span className="text-caption font-semibold text-[#141812]">
                                  {matchingCompany.shortName}
                                </span>
                              </div>

                              <div>
                                <h4 className="text-h3 font-semibold text-[#141812] mb-2">
                                  {matchingCompany.name}
                                </h4>
                                <p className="text-caption font-medium text-[#405329] mb-2">
                                  {matchingCompany.mantra
                                    ? `${matchingCompany.mantra} · ${matchingCompany.tagline}`
                                    : matchingCompany.tagline}
                                </p>
                                <p className="text-caption text-[#42493E]">
                                  {matchingCompany.summary}
                                </p>
                              </div>

                              <div className="space-y-2 text-caption text-[#141812] pt-2">
                                {matchingCompany.focusAreas.slice(0, 4).map((area) => (
                                  <div key={area} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" />
                                    <span>{area}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                                {matchingCompany.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(matchingCompany.id) ? (
                                  <div
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#141812]/10 text-[#5A6255] text-caption font-medium cursor-not-allowed border border-[#141812]/12 select-none"
                                  >
                                    <span>Website Coming Soon</span>
                                  </div>
                                ) : matchingCompany.website ? (
                                  <a
                                    href={matchingCompany.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#2D3A1E] text-white text-caption font-medium shadow-low hover:bg-[#405329]"
                                  >
                                    <span>Official Website</span>
                                    <ArrowUpRight className="w-4 h-4 text-[#E6B94D]" />
                                  </a>
                                ) : null}
                                <button
                                  type="button"
                                  onClick={() => onOpenInquiry?.(matchingCompany.id, service.title)}
                                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#141812]/12 text-[#141812] text-caption font-medium hover:bg-[#FAF9F6] cursor-pointer"
                                >
                                  <span>Book a free consultation</span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: UNIFIED FLAGSHIP VENTURE & SPECIALIST DOSSIER STAGE */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between pb-1 text-caption text-[#FAF9F6]/85">
              <span className="type-kicker text-[#E6B94D] font-mono">
                Dedicated Operating Venture Stage
              </span>
              <span className="text-caption text-[#FAF9F6]/75 font-mono">
                {matchingCompany.number} / {matchingCompany.ecosystemDomain}
              </span>
            </div>

            <div className="rounded-2xl bg-[#141812] text-[#FAF9F6] border border-[#405329]/40 shadow-high overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={matchingCompany.id}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* 1. Top Visual Logo & Identity Canvas */}
                  <div className="relative h-[224px] w-full overflow-hidden bg-[#FAF9F6] border-b border-[#405329]/24">
                    <BusinessGraphicArt businessId={matchingCompany.id} />

                    {/* Top Overlay Status Ribbon */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-2 py-1 rounded-sm bg-[#141812]/90 backdrop-blur-md border border-[#E4E9DC]/30 font-mono text-caption uppercase text-[#E4E9DC] font-medium shadow-low">
                        {matchingCompany.number} / {matchingCompany.ecosystemDomain}
                      </span>
                    </div>
                  </div>

                  {/* 2. Dark Editorial Dossier Body */}
                  <div className="p-6 space-y-6">
                    <div>
                      <span className="type-kicker text-[#E4E9DC] block mb-2">
                        {matchingCompany.mantra
                          ? `${matchingCompany.category} · ${matchingCompany.mantra}`
                          : matchingCompany.category}
                      </span>
                      <h3 className="text-h2 font-semibold text-[#FAF9F6] mb-2">
                        {matchingCompany.name}
                      </h3>
                      <p className="text-caption font-medium text-[#E6B94D] mb-2">
                        “{matchingCompany.tagline}”
                      </p>
                      <p className="text-caption text-[#FAF9F6]/80">
                        {matchingCompany.summary}
                      </p>
                    </div>

                    {/* Highlight of Currently Selected Capability */}
                    <div className="rounded-xl p-4 bg-[#1C2218] border border-[#E4E9DC]/24">
                      <div className="flex items-center gap-2 text-caption font-mono uppercase text-[#E4E9DC] font-medium mb-2">
                        <CheckCircle2 className="w-4 h-4 text-[#E4E9DC]" />
                        <span>Active Capability Selection</span>
                      </div>
                      <div className="text-h3 font-semibold text-[#FAF9F6] mb-2">
                        {activeService.title}
                      </div>
                      <p className="text-caption text-[#FAF9F6]/80">
                        {activeService.desc}
                      </p>
                    </div>

                    {/* Full Scope of Capabilities from this Venture */}
                    <div className="space-y-2">
                      <div className="type-kicker text-[#E4E9DC]">
                        Key Services &amp; Focus Areas ({matchingCompany.shortName})
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-caption text-[#FAF9F6]/90">
                        {matchingCompany.focusAreas.map((area) => (
                          <div
                            key={area}
                            className="flex items-start gap-2 pt-2 border-t border-white/12"
                          >
                            <span className="text-[#E6B94D] font-mono text-caption leading-none mt-0.5">↗</span>
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direct CTAs */}
                    <div className="pt-4 border-t border-white/12 space-y-2">
                      {matchingCompany.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(matchingCompany.id) ? (
                        <div
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 text-white/60 text-caption font-medium cursor-not-allowed border border-white/15 select-none"
                        >
                          <span>Website Coming Soon</span>
                        </div>
                      ) : (
                        <a
                          href={matchingCompany.website || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FAF9F6] hover:bg-[#E4E9DC] text-[#141812] text-caption font-medium transition-all duration-200 cursor-pointer shadow-low group/btn"
                        >
                          <span>Visit {matchingCompany.shortName} Official Website</span>
                          <ArrowUpRight className="w-4 h-4 text-[#2D3A1E] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => onOpenInquiry?.(matchingCompany.id, activeService.title)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 text-caption font-medium text-[#E4E9DC] hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Enquire with {matchingCompany.shortName}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
