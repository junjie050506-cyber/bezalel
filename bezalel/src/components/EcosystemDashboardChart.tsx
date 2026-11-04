import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';

export interface EcosystemDashboardChartProps {
  onOpenInquiry?: (ventureId?: string) => void;
  className?: string;
}

export const EcosystemDashboardChart: React.FC<EcosystemDashboardChartProps> = ({
  onOpenInquiry,
  className = '',
}) => {
  // Timeline Era filter: 'all' | 'founding' (2004-2013) | 'institutional' (2014-2026)
  const [timelineEra, setTimelineEra] = useState<'all' | 'founding' | 'institutional'>('all');
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(2); // 2011 Conference Scale default

  // Authentic 18-Year Chronological Milestone Archive with Editorial Imagery
  const historicalMilestones = [
    {
      year: '2004',
      era: 'founding',
      title: 'Foundational Inception',
      category: 'Leadership & Mentorship',
      summary: 'Earliest corporate leadership facilitation, youth mentoring, and community initiatives in Kuala Lumpur.',
      strategicSignificance: 'Established the core philosophy that people are the true engine of sustainable enterprise.',
      statHighlight: 'Seed Chapter',
      ventureTag: 'Bezalel Origins',
      photo: '/assets/photos/pillar-learning.jpg',
    },
    {
      year: '2008',
      era: 'founding',
      title: 'Corporate Secretariat Genesis',
      category: 'Governance & Compliance',
      summary: 'Formal registration and execution of early corporate advisory, company secretarial filings, and statutory compliance retainers.',
      strategicSignificance: 'Introduced rigorous statutory governance as a foundational non-negotiable for enterprise stability.',
      statHighlight: 'Statutory Genesis',
      ventureTag: 'Phroneo Heritage',
      photo: '/assets/photos/venture-phroneo.jpg',
    },
    {
      year: '2011',
      era: 'founding',
      title: 'Large-Scale Institutional Scale',
      category: 'Logistics Deployment',
      summary: 'Stewarded logistics, multi-site transportation, accommodation, and human mobilization for massive national-scale gatherings.',
      strategicSignificance: 'Demonstrated operational capability to handle ~RM 1.7M+ single-deployment operational budgets flawlessly.',
      statHighlight: '~RM 1.7M+ Scale',
      ventureTag: 'Group Operations',
      photo: '/assets/photos/venture-general.jpg',
    },
    {
      year: '2014',
      era: 'institutional',
      title: 'Regional Youth Formation',
      category: 'Human Formation',
      summary: 'Expanded structured character architecture, youth development, and experiential programmes across institutions.',
      strategicSignificance: 'Formed a cross-generational pipeline of values-driven young people entering education and enterprise.',
      statHighlight: 'Youth Capability',
      ventureTag: 'Human Formation',
      photo: '/assets/photos/venture-hur-on.jpg',
    },
    {
      year: '2016',
      era: 'institutional',
      title: 'HUR-ON Corporate Labs',
      category: 'Corporate Training',
      summary: 'Consolidation of executive experiential leadership labs and HRD Corp-accredited corporate training under HUR-ON Training & Consultancy.',
      strategicSignificance: 'Created proprietary training methodology uniting behavioral alignment, rhythm, artistry, and corporate performance.',
      statHighlight: 'HRD Corp Accredited',
      ventureTag: 'HUR-ON',
      photo: '/assets/photos/pillar-employment.jpg',
    },
    {
      year: '2018',
      era: 'institutional',
      title: 'Phroneo BoardSuite Expansion',
      category: 'Statutory Secretarial',
      summary: 'Expanded corporate secretarial advisory and corporate governance foundations under Companies Act requirements.',
      strategicSignificance: 'Cemented the group’s reputation for unyielding fiduciary integrity and statutory precision.',
      statHighlight: 'Governance Bedrock',
      ventureTag: 'Phroneo',
      photo: '/assets/photos/philosophy-01.jpg',
    },
    {
      year: '2021',
      era: 'institutional',
      title: 'Olive & Vine Wholeness Practice',
      category: 'Clinical Psychotherapy',
      summary: 'Deepened the psychological and restorative counseling wing to support executive well-being, marriage restoration, and family care.',
      strategicSignificance: 'Bridged the vital gap between external enterprise success and interior relational wholeness.',
      statHighlight: 'Restorative Care',
      ventureTag: 'Olive & Vine',
      photo: '/assets/photos/venture-olive-vine.jpg',
    },
    {
      year: '2024',
      era: 'institutional',
      title: 'Mustard Seed & Co Market Lift',
      category: 'Brand Acceleration',
      summary: 'Delivering creative advertising, visual identity, and strategic commercial narrative systems for emerging and growing organisations.',
      strategicSignificance: 'Empowered Malaysian and regional ventures to articulate their authentic market value with clarity.',
      statHighlight: 'Creative Engine',
      ventureTag: 'Mustard Seed',
      photo: '/assets/photos/venture-mustard-seed.jpg',
    },
    {
      year: '2026',
      era: 'institutional',
      title: 'Keystone Multi-Generational Continuity',
      category: 'Ecosystem Synergy',
      summary: 'Consolidation of the specialised operating businesses into an integrated holding architecture for multi-generational impact.',
      strategicSignificance: 'Ensuring long-term institutional continuity, capital stewardship, and kingdom impact for decades ahead.',
      statHighlight: 'Established 2008',
      ventureTag: 'Bezalel Inc',
      photo: '/assets/photos/pillar-partnerships.jpg',
    },
  ];

  // Filtered milestones based on the selected era tab
  const displayedMilestones = historicalMilestones.filter((m) => {
    if (timelineEra === 'founding') return m.era === 'founding';
    if (timelineEra === 'institutional') return m.era === 'institutional';
    return true;
  });

  const activeMilestone = historicalMilestones[selectedMilestoneIndex] || historicalMilestones[2];

  return (
    <section className={`relative w-full py-20 sm:py-28 bg-[#F6F3EC] text-[#141812] border-b border-[#2D3A1E]/12 ${className}`}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ===================================================================
            SECTION MASTHEAD: THE 18-YEAR COMPOUNDING TIMELINE (HAUTE ARCHIVAL SPREAD)
        ==================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#2D3A1E]/15">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#405329]">
              <span className="w-8 h-px bg-[#405329]/60" />
              <span>02 · THE 18-YEAR COMPOUNDING TIMELINE (2004 — 2026)</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-[#141812] leading-[1.08]">
              The 18-Year Chronological Milestone Archive.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4A5245] font-light leading-relaxed max-w-2xl">
              From earliest corporate mentorship in 2004 to integrated institutional holding architecture in 2026. An unbroken record of fiduciary discipline across Malaysia and Southeast Asia.
            </p>
          </div>

          {/* Open Era Filter Controls (Zero Pill Boxes, Pure Drafting Lines) */}
          <div className="flex items-center gap-6 text-xs font-mono self-start lg:self-end">
            <button
              type="button"
              onClick={() => setTimelineEra('all')}
              className={`pb-2 transition-all cursor-pointer border-b-2 uppercase tracking-wider ${
                timelineEra === 'all'
                  ? 'border-[#405329] text-[#141812] font-bold'
                  : 'border-transparent text-[#5A6050] hover:text-[#141812]'
              }`}
            >
              All 18 Years
            </button>
            <button
              type="button"
              onClick={() => setTimelineEra('founding')}
              className={`pb-2 transition-all cursor-pointer border-b-2 uppercase tracking-wider ${
                timelineEra === 'founding'
                  ? 'border-[#405329] text-[#141812] font-bold'
                  : 'border-transparent text-[#5A6050] hover:text-[#141812]'
              }`}
            >
              Founding Era (2004–2013)
            </button>
            <button
              type="button"
              onClick={() => setTimelineEra('institutional')}
              className={`pb-2 transition-all cursor-pointer border-b-2 uppercase tracking-wider ${
                timelineEra === 'institutional'
                  ? 'border-[#405329] text-[#141812] font-bold'
                  : 'border-transparent text-[#5A6050] hover:text-[#141812]'
              }`}
            >
              Institutional Era (2014–2026)
            </button>
          </div>
        </div>

        {/* ===================================================================
            TIMELINE MILESTONES ARCHIVAL GALLERY (OPEN SPREAD, NO BOXES)
        ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedMilestones.map((milestone) => {
            const isSelected = activeMilestone.year === milestone.year;
            return (
              <div
                key={milestone.year}
                onClick={() => {
                  const originalIndex = historicalMilestones.findIndex(
                    (m) => m.year === milestone.year
                  );
                  setSelectedMilestoneIndex(originalIndex);
                }}
                className={`group cursor-pointer space-y-3 transition-opacity ${
                  isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {/* Filmic Archival Photography Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#2D3A1E]/10">
                  <img
                    src={milestone.photo}
                    alt={milestone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.92] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <span className="font-display text-2xl font-normal text-white">
                      {milestone.year}
                    </span>
                    <span className="text-[10px] text-white/80 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                      {milestone.statHighlight}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono uppercase tracking-wider text-[#A3B86C] font-semibold">
                    {milestone.category}
                  </div>
                </div>

                {/* Narrative Typography */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display text-xl font-medium text-[#141812] leading-snug group-hover:text-[#405329] transition-colors">
                      {milestone.title}
                    </h4>
                    <span className="font-mono text-[10px] text-[#405329] uppercase font-bold tracking-wider">
                      {isSelected ? '● ACTIVE' : 'INSPECT →'}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#52584E] font-light leading-relaxed line-clamp-3">
                    {milestone.summary}
                  </p>
                </div>

                {/* Active Indicator Line */}
                <div className={`h-[2px] transition-all duration-300 ${
                  isSelected ? 'w-full bg-[#405329]' : 'w-0 bg-transparent group-hover:w-8 group-hover:bg-[#405329]/40'
                }`} />
              </div>
            );
          })}
        </div>

        {/* ===================================================================
            DEEP-DIVE SELECTED MILESTONE ARCHIVAL RECORD (UNBOXED MONOGRAPH SPREAD)
        ==================================================================== */}
        <div className="pt-10 border-t border-[#2D3A1E]/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#405329] font-bold uppercase tracking-widest">
                <span>ARCHIVAL DOSSIER RECORD</span>
                <span>·</span>
                <span>YEAR {activeMilestone.year}</span>
                <span>·</span>
                <span>{activeMilestone.category}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#141812] tracking-tight leading-tight">
                {activeMilestone.title}
              </h3>
              <p className="font-sans text-base text-[#4A5245] font-light leading-relaxed">
                {activeMilestone.summary}
              </p>
              
              <div className="pt-4 border-t border-[#2D3A1E]/10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A6B38] font-bold block">
                  STRATEGIC & INSTITUTIONAL SIGNIFICANCE:
                </span>
                <p className="font-display italic text-sm text-[#2D3228] leading-relaxed">
                  "{activeMilestone.strategicSignificance}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 lg:pl-6 lg:border-l lg:border-[#2D3A1E]/15 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-[#7A7569] uppercase tracking-widest block mb-1">
                  HISTORICAL PILLAR
                </span>
                <span className="font-display text-xl font-medium text-[#2D3A1E] block">
                  {activeMilestone.ventureTag}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#7A7569] uppercase tracking-widest block mb-1">
                  QUANTITATIVE EVIDENCE
                </span>
                <span className="font-display text-xl font-medium text-[#405329] block">
                  {activeMilestone.statHighlight}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenInquiry?.()}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#141812] hover:text-[#405329] transition-colors cursor-pointer group"
                >
                  <span>Request Full Historical Folio</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5A6B38] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EcosystemDashboardChart;
