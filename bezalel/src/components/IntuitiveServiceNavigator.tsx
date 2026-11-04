/**
 * @file IntuitiveServiceNavigator.tsx
 * Production-ready, tactile master-detail service navigator for Bezalel Inc
 * Built strictly according to Norman's design principles, Apple HIG, Linear tactile interaction,
 * and W3C WAI-ARIA Authoring Practices 1.2.
 */

import React, { useState, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Heart,
  Compass,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_ENTITIES } from '../data/ecosystemData';

export interface ServiceItem {
  id: string;
  companyId: string;
  title: string;
  desc: string;
  tag: string;
}

export const SERVICE_CATALOG: ServiceItem[] = [
  // 01 · Olive & Vine
  {
    id: 'srv-therapy',
    companyId: 'olive-vine',
    title: 'Clinical Psychotherapy & Individual Support',
    desc: 'Confidential therapy for children, youth, and adults facing emotional transitions, anxiety, and grief.',
    tag: 'Clinical Psychotherapy',
  },
  {
    id: 'srv-marriage',
    companyId: 'olive-vine',
    title: 'Marriage & Relational Dynamics Counseling',
    desc: 'Restorative couples therapy, pre-marital alignment, and relational coaching to rebuild lasting interpersonal trust.',
    tag: 'Couples & Marriage',
  },
  {
    id: 'srv-family',
    companyId: 'olive-vine',
    title: 'Parenting Coaching & Family Restorations',
    desc: 'Holistic family systems guidance, adolescent understanding, and evidence-based parenting communication.',
    tag: 'Family & Parenting',
  },
  {
    id: 'srv-wellness',
    companyId: 'olive-vine',
    title: 'Corporate Emotional Wellbeing & Trauma Care',
    desc: 'Workplace mental health workshops, emotional resilience training, and executive crisis support.',
    tag: 'Workplace Wellness',
  },

  // 02 · HUR-ON
  {
    id: 'srv-leadership',
    companyId: 'hur-on',
    title: 'Executive Coaching & Leadership Alignment',
    desc: 'High-touch one-on-one coaching and senior team alignment to transform executive behaviour and strategic performance.',
    tag: 'Executive Coaching',
  },
  {
    id: 'srv-teams',
    companyId: 'hur-on',
    title: 'Experiential Team Simulations & Culture',
    desc: 'Immersive corporate simulations and relational intelligence exercises that build unbreakable trust and organizational rhythm.',
    tag: 'Team Dynamics',
  },
  {
    id: 'srv-hrd',
    companyId: 'hur-on',
    title: 'HRD Corp-Accredited Corporate Masterclasses',
    desc: 'Certified professional development modules for mid-to-senior corporate and multinational teams across Southeast Asia.',
    tag: 'Corporate Masterclass',
  },
  {
    id: 'srv-consultancy',
    companyId: 'hur-on',
    title: 'Corporate Capability & Organisational Consultancy',
    desc: 'Bespoke corporate learning frameworks, workforce upskilling, and behavioral change architecture for enterprises.',
    tag: 'Corporate Training & Advisory',
  },

  // 03 · Mustard Seed & Co
  {
    id: 'srv-branding',
    companyId: 'mustard-seed',
    title: 'Brand Strategy, Positioning & Identity',
    desc: 'Strategic brand architecture, visual identity redesigns, tone of voice, and market clarity for ambitious ventures.',
    tag: 'Brand Architecture',
  },
  {
    id: 'srv-campaigns',
    companyId: 'mustard-seed',
    title: 'Creative Advertising & Go-To-Market Campaigns',
    desc: 'High-impact creative direction, commercial advertising, narrative campaigns, and new product launch acceleration.',
    tag: 'Campaign Direction',
  },
  {
    id: 'srv-digital',
    companyId: 'mustard-seed',
    title: 'Digital Systems, Content & Web Presence',
    desc: 'Modern digital storytelling, multi-channel narrative presence, and commercial digital touchpoints.',
    tag: 'Digital Systems',
  },

  // 04 · Phroneo BoardSuite
  {
    id: 'srv-secretarial',
    companyId: 'phroneo',
    title: 'Company Secretarial & Incorporation',
    desc: 'Full corporate secretarial statutory compliance, SSM filings, company formation, and regulatory maintenance.',
    tag: 'Company Secretarial',
  },
  {
    id: 'srv-board',
    companyId: 'phroneo',
    title: 'Board Governance & Resolution Structuring',
    desc: 'Advisory for board meetings, minutes, shareholder resolutions, statutory audits, and long-term corporate governance.',
    tag: 'Board Governance',
  },
  {
    id: 'srv-continuity',
    companyId: 'phroneo',
    title: 'Statutory Administration & Advisory Support',
    desc: 'Enduring legal architecture, enterprise restructuring, licensing compliance, and continuity protection.',
    tag: 'Continuity & Advisory',
  },
];

export const SERVICE_CATEGORIES = [
  {
    id: 'all',
    label: 'All Capabilities',
    companyShort: 'All Ventures',
    logo: null,
    icon: Building2,
  },
  {
    id: 'olive-vine',
    label: 'Psychological Care',
    companyShort: 'Olive & Vine',
    logo: '/assets/ventures/olive-vine-logo.png',
    icon: Heart,
  },
  {
    id: 'hur-on',
    label: 'Corporate Training',
    companyShort: 'HUR-ON',
    logo: '/assets/ventures/hur-on-logo.png',
    icon: Compass,
  },
  {
    id: 'mustard-seed',
    label: 'Brand & Growth',
    companyShort: 'Mustard Seed',
    logo: '/assets/ventures/mustard-seed-logo.png',
    icon: Sparkles,
  },
  {
    id: 'phroneo',
    label: 'Corporate Governance',
    companyShort: 'Phroneo',
    logo: '/assets/ventures/phroneo-logo.png',
    icon: ShieldCheck,
  },
];

export interface IntuitiveServiceNavigatorProps {
  onOpenInquiry?: (companyId?: string, serviceTitle?: string) => void;
  className?: string;
}

export const IntuitiveServiceNavigator: React.FC<IntuitiveServiceNavigatorProps> = ({
  onOpenInquiry,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-therapy');
  const tabListRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const filteredServices =
    selectedCategory === 'all'
      ? SERVICE_CATALOG
      : SERVICE_CATALOG.filter((s) => s.companyId === selectedCategory);

  const activeService =
    SERVICE_CATALOG.find((s) => s.id === selectedServiceId) ||
    filteredServices[0] ||
    SERVICE_CATALOG[0];

  const matchingCompany =
    BUSINESS_ENTITIES.find((b) => b.id === activeService.companyId) ||
    BUSINESS_ENTITIES[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = index;
    const total = SERVICE_CATEGORIES.length;
    if (e.key === 'ArrowRight') {
      targetIndex = (index + 1) % total;
    } else if (e.key === 'ArrowLeft') {
      targetIndex = (index - 1 + total) % total;
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
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[targetIndex]?.focus();
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 1. UNIFIED ACCESSIBLE SEGMENTED CONTROL */}
      <div className="overflow-x-auto pb-4 mb-8 scrollbar-none">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Capabilities category filter"
          className="flex items-center gap-2 min-w-max p-1.5 bg-[#EFECE6] rounded-2xl border border-[#141812]/[0.08]"
        >
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`${baseId}-tab-${cat.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-tabpanel`}
                tabIndex={isActive ? 0 : -1}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id !== 'all') {
                    const firstInCat = SERVICE_CATALOG.find((s) => s.companyId === cat.id);
                    if (firstInCat) setSelectedServiceId(firstInCat.id);
                  }
                }}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`relative flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2C3B1C] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'text-[#141812] font-semibold'
                    : 'text-[#52584E] hover:text-[#141812]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="standaloneActiveServicePill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-[#141812]/[0.08]"
                  />
                )}
                {cat.logo ? (
                  <img
                    src={cat.logo}
                    alt=""
                    className={`relative z-10 object-contain transition-all duration-200 ${
                      cat.id === 'hur-on'
                        ? 'h-3.5 w-auto max-w-[70px]'
                        : cat.id === 'phroneo'
                        ? 'h-5 w-auto max-w-[40px]'
                        : 'h-4 w-auto max-w-[65px]'
                    } ${isActive ? 'opacity-100' : 'opacity-70'}`}
                  />
                ) : (
                  <span className="relative z-10 w-2 h-2 rounded-full bg-[#4A5D32]" />
                )}
                <span className="relative z-10 font-sans tracking-tight">
                  {cat.label}
                </span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-[#141812]/10 text-[#141812] font-bold'
                      : 'bg-black/5 text-[#52584E]'
                  }`}
                >
                  {cat.id === 'all'
                    ? SERVICE_CATALOG.length
                    : SERVICE_CATALOG.filter((s) => s.companyId === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SPLIT INTERACTIVE STAGE */}
      <div
        id={`${baseId}-tabpanel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${selectedCategory}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
      >
        {/* LEFT 7 COLUMNS: Service Card Grid */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-1 text-xs text-[#52584E]">
            <span className="font-mono uppercase tracking-wider text-[11px] text-[#4A5D32] font-semibold">
              Specialised Capabilities ({filteredServices.length})
            </span>
            <span className="text-[11px] text-[#52584E]/75">
              Select a capability to connect with the specialist
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredServices.map((service, sIndex) => {
              const isSelected = selectedServiceId === service.id;
              const serviceCompany = BUSINESS_ENTITIES.find(
                (b) => b.id === service.companyId
              );

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (sIndex % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`group p-4 sm:p-5 rounded-2xl border text-left transition-colors duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] w-full relative focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A5D32] ${
                      isSelected
                        ? 'bg-white border-[#141812] shadow-[0_12px_28px_-8px_rgba(20,24,18,0.12)] ring-1 ring-[#141812]/15'
                        : 'bg-white/75 hover:bg-white border-[#141812]/[0.08] hover:border-[#141812]/20 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold border-0 ${
                            isSelected
                              ? 'bg-[#141812] text-[#FAF9F6]'
                              : 'bg-[#F2EFE9] text-[#3D4F28]'
                          }`}
                        >
                          {service.tag}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#52584E]">
                          {serviceCompany?.logo && (
                            <img
                              src={serviceCompany.logo}
                              alt=""
                              className="h-3.5 w-auto max-w-[42px] object-contain opacity-75"
                            />
                          )}
                          <span className="truncate max-w-[100px]">
                            {serviceCompany?.shortName}
                          </span>
                        </div>
                      </div>

                      <h3
                        className={`font-display text-base sm:text-[17px] font-medium leading-snug tracking-tight ${
                          isSelected
                            ? 'text-[#141812]'
                            : 'text-[#141812] group-hover:text-[#2E3C1F]'
                        }`}
                      >
                        {service.title}
                      </h3>

                      <p className="text-xs text-[#52584E] mt-1.5 leading-relaxed line-clamp-2">
                        {service.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#141812]/[0.06] w-full text-[11px]">
                      <span
                        className={`font-medium ${
                          isSelected ? 'text-[#3D4F28] font-semibold' : 'text-[#52584E]'
                        }`}
                      >
                        {isSelected ? 'Operating Venture Connected' : 'View Matching Venture'}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#141812] text-[#FAF9F6] rotate-90 lg:rotate-0'
                            : 'border border-[#141812]/15 text-[#141812] group-hover:border-[#141812]'
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.button>

                  {/* MOBILE INLINE DRAWER (Solves the Mobile Viewport Blind Spot) */}
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
                          <div className="mt-3 p-5 rounded-2xl bg-[#F4F1EA] border border-[#3B4C25]/25 shadow-inner space-y-4">
                            <div className="flex items-center justify-between border-b border-[#141812]/10 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#4A5D32] animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A5D32] font-bold">
                                  Venture 0{matchingCompany.number}
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-[#141812]">
                                {matchingCompany.shortName}
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] font-mono tracking-wider uppercase text-[#4A5D32] block mb-0.5">
                                {matchingCompany.ecosystemDomain}
                              </span>
                              <h4 className="font-display text-lg font-medium text-[#141812]">
                                {matchingCompany.name}
                              </h4>
                              <p className="text-xs text-[#52584E] mt-1 leading-relaxed">
                                {matchingCompany.tagline}
                              </p>
                            </div>

                            <div className="space-y-1.5 text-xs text-[#2A3125] pt-1">
                              {matchingCompany.focusAreas.slice(0, 3).map((area) => (
                                <div key={area} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D32] mt-1.5 shrink-0" />
                                  <span className="leading-snug text-[#3A4135]">{area}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                              {matchingCompany.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(matchingCompany.id) ? (
                                <div
                                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141812]/10 text-[#52584E] text-xs font-semibold cursor-not-allowed border border-[#141812]/10 select-none"
                                >
                                  <span>Website Coming Soon</span>
                                </div>
                              ) : matchingCompany.website ? (
                                <a
                                  href={matchingCompany.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141812] text-white text-xs font-semibold shadow-xs hover:bg-[#24301C]"
                                >
                                  <span>Official Website</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E6B94D]" />
                                </a>
                              ) : null}
                              {onOpenInquiry && (
                                <button
                                  type="button"
                                  onClick={() => onOpenInquiry(matchingCompany.id, service.title)}
                                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#141812]/15 text-[#141812] text-xs font-semibold hover:bg-[#FAF9F6]"
                                >
                                  <span>Inquire with Secretariat</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              )}
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

        {/* RIGHT 5 COLUMNS: DESKTOP MATCHING COMPANY DOSSIER (Auto-fitted, zero scroll trap) */}
        <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-white border border-[#141812]/12 shadow-[0_20px_45px_-12px_rgba(20,24,18,0.10)] p-6 sm:p-7 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={matchingCompany.id}
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {/* Eyebrow Status Ribbon */}
                <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#141812]/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4A5D32] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#4A5D32] font-semibold">
                      Dedicated Operating Venture
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F2EFE9] text-[#141812] text-[10px] font-mono font-semibold">
                    Venture 0{matchingCompany.number}
                  </span>
                </div>

                {/* Dedicated Operating Company Logo Showcase Stage */}
                {matchingCompany.logo && (
                  <div className="w-full h-24 px-6 py-3 bg-[#FAF9F6] border border-[#141812]/10 rounded-2xl flex items-center justify-center relative group overflow-hidden shadow-[inset_0_1px_3px_rgba(20,24,18,0.04)]">
                    <div className="absolute inset-0 bg-radial from-white/90 via-transparent to-transparent opacity-80 pointer-events-none" />
                    <img
                      src={matchingCompany.logo}
                      alt={`${matchingCompany.shortName} Logo`}
                      className={`h-full w-auto max-w-[92%] object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105 ${
                        matchingCompany.id === 'hur-on'
                          ? 'max-h-16 scale-110'
                          : matchingCompany.id === 'phroneo'
                          ? 'max-h-20'
                          : 'max-h-18'
                      }`}
                    />
                  </div>
                )}

                {/* Company Identity Header */}
                <div>
                  <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#4A5D32] block mb-1">
                    {matchingCompany.ecosystemDomain}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-[#141812] tracking-tight leading-snug">
                    {matchingCompany.name}
                  </h3>
                  <p className="text-xs text-[#52584E] mt-1.5 leading-relaxed">
                    {matchingCompany.tagline}
                  </p>
                </div>

                {/* Highlight of Currently Selected Service */}
                <div className="rounded-2xl p-4 bg-[#F5F2EB] border border-[#141812]/10">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#3D4F28] font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A5D32]" />
                    <span>Active Capability Selection</span>
                  </div>
                  <div className="font-display text-base font-medium text-[#141812]">
                    {activeService.title}
                  </div>
                  <p className="text-xs text-[#52584E] mt-0.5 leading-relaxed">
                    {activeService.desc}
                  </p>
                </div>

                {/* Full Scope of Services from this Company */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#52584E] font-semibold">
                    Full Capabilities Delivered by {matchingCompany.shortName}
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#2A3125]">
                    {matchingCompany.focusAreas.map((area) => {
                      const isMatch = area.toLowerCase().includes(activeService.tag.toLowerCase());
                      return (
                        <li key={area} className="flex items-start gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                              isMatch ? 'bg-[#4A5D32] scale-125' : 'bg-[#4A5D32]/60'
                            }`}
                          />
                          <span className="leading-snug text-[#3A4135]">{area}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Direct CTAs (Always visible above the fold!) */}
                <div className="pt-4 border-t border-[#141812]/[0.08] space-y-2">
                  {matchingCompany.websiteComingSoon || ['hur-on', 'phroneo', 'olive-vine'].includes(matchingCompany.id) ? (
                    <div
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#141812]/10 text-[#52584E] text-xs font-semibold cursor-not-allowed border border-[#141812]/10 select-none"
                    >
                      <span>Website Coming Soon</span>
                    </div>
                  ) : (
                    <a
                      href={matchingCompany.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#141812] hover:bg-[#24301C] text-[#FAF9F6] text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md group/btn"
                    >
                      <span>Visit {matchingCompany.shortName} Official Website</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E6B94D] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {onOpenInquiry && (
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(matchingCompany.id, activeService.title)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#3D4F28] hover:text-[#141812] transition-colors cursor-pointer"
                    >
                      <span>Inquire with Secretariat for this Practice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
