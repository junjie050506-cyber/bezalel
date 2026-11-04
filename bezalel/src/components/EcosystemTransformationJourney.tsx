import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Building2,
  UserCheck,
  Compass,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';

export interface EcosystemTransformationJourneyProps {
  onOpenInquiry?: (bId?: string) => void;
  className?: string;
}

interface JourneyStageSpec {
  index: string;
  phaseLabel: string;
  stageName: string;
  headline: string;
  description: string;
  transformationShift: {
    from: string;
    to: string;
  };
  keyDeliverables: string[];
  venture: {
    name: string;
    domain: string;
    logo: string;
    website?: string;
    id: string;
  };
  photo: string;
}

interface JourneyTrackSpec {
  id: 'enterprise' | 'human';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  stages: JourneyStageSpec[];
}

const JOURNEY_TRACKS: JourneyTrackSpec[] = [
  {
    id: 'enterprise',
    title: 'The Enterprise Lifecycle Journey',
    subtitle: 'From nascent venture to enduring multi-generational institution',
    icon: <Building2 className="w-4 h-4" />,
    stages: [
      {
        index: '01',
        phaseLabel: 'PHASE 01 · INCEPTION & FOUNDATIONS',
        stageName: 'Statutory Incorporation & Wise Structure',
        headline: 'A business built to endure requires principled legal foundations.',
        description:
          'When an entrepreneurial founder or board begins, Phroneo BoardSuite establishes the corporate secretarial architecture, SSM statutory compliance, and governance frameworks that safeguard enterprise continuity from day one.',
        transformationShift: {
          from: 'Fragmented founder risk & informal administration',
          to: 'Legally fortified corporate entity with statutory rigor',
        },
        keyDeliverables: [
          'Full corporate secretarial & SSM statutory compliance',
          'Company incorporation, licensing & board constitution',
          'Fiduciary risk audits and governance charters',
        ],
        venture: {
          name: 'Phroneo BoardSuite',
          domain: 'Foundations & Governance',
          logo: '/assets/ventures/phroneo-logo.png',
          website: 'https://phroneoboardsuite.com',
          id: 'phroneo',
        },
        photo: '/assets/photos/pillar-services.jpg',
      },
      {
        index: '02',
        phaseLabel: 'PHASE 02 · LEADERSHIP CAPABILITY',
        stageName: 'Executive Alignment & High-Flow Teams',
        headline: 'Learning must change behaviour, relationships and performance.',
        description:
          'HUR-ON steps in to align C-suite leaders and departmental teams. Through HRD Corp-accredited corporate masterclasses and experiential leadership laboratories, corporate culture shifts from compliance to genuine collaboration.',
        transformationShift: {
          from: 'Siloed departments & executive friction',
          to: 'Unified leadership rhythm with collaborative fluency',
        },
        keyDeliverables: [
          'HRD Corp-accredited executive leadership masterclasses',
          'Strategic team alignment & relational intelligence labs',
          'Systemic organizational development (OD) and change management',
        ],
        venture: {
          name: 'HUR-ON Training & Consultancy',
          domain: 'Corporate Training & Leadership',
          logo: '/assets/ventures/hur-on-logo.png',
          website: 'https://hur-on.com',
          id: 'hur-on',
        },
        photo: '/assets/photos/flow-people.jpg',
      },
      {
        index: '03',
        phaseLabel: 'PHASE 03 · RELATIONAL RESILIENCE',
        stageName: 'Executive Mental Health & Family Care',
        headline: 'Inner wellbeing shapes how executives live, decide and lead.',
        description:
          'High-growth enterprise puts intense pressure on founders and their families. Olive & Vine provides clinical psychological counseling, marriage restoration, and executive burnout mitigation, ensuring leadership health from the inside out.',
        transformationShift: {
          from: 'Executive burnout & high-pressure relational strain',
          to: 'Grounded psychological resilience and restored home harmony',
        },
        keyDeliverables: [
          'Clinical therapeutic support for high-stakes founders',
          'Preventative executive burnout and mental health programs',
          'Confidential marriage and family restoration therapy',
        ],
        venture: {
          name: 'Olive & Vine Psychological Solutions',
          domain: 'Mental Health & Relational Care',
          logo: '/assets/ventures/olive-vine-logo.png',
          website: 'https://olivevine.solutions',
          id: 'olive-vine',
        },
        photo: '/assets/photos/legacy-04.jpg',
      },
      {
        index: '04',
        phaseLabel: 'PHASE 04 · MARKET MULTIPLICATION',
        stageName: 'Strategic Positioning & Revenue Velocity',
        headline: 'Clarify the position. Communicate value. Pursue growth.',
        description:
          'With people and governance anchored, Mustard Seed & Co ignites the enterprise multiplication engine. Creative branding, digital advertising, and high-conversion market strategies accelerate commercial scale and industry dominance.',
        transformationShift: {
          from: 'Undifferentiated market obscurity',
          to: 'Commanding brand clarity and compounding revenue scale',
        },
        keyDeliverables: [
          'Comprehensive brand identity & positioning strategy',
          'Full-funnel digital advertising and creative campaigns',
          'High-conversion web platforms & market communication',
        ],
        venture: {
          name: 'Mustard Seed & Co',
          domain: 'Creative Commerce & Media',
          logo: '/assets/ventures/mustard-seed-logo.png',
          website: 'https://theseed.agency/index.html',
          id: 'mustard-seed',
        },
        photo: '/assets/photos/pillar-commerce.jpg',
      },
      {
        index: '05',
        phaseLabel: 'PHASE 05 · STEWARDSHIP & LEGACY',
        stageName: 'Multi-Generational Continuity & Social Return',
        headline: 'Success continues through what others go on to build.',
        description:
          'Under the overarching stewardship of Bezalel Inc, mature enterprises participate in multi-generational family office governance, ethical alliance building, and funding community initiatives like dedicated schools for displaced children.',
        transformationShift: {
          from: 'Single-generation commercial profit extraction',
          to: 'Self-sustaining legacy that anchors households and communities',
        },
        keyDeliverables: [
          'Multi-generational family office & continuity charters',
          'Ethical capital reinvestment into community impact and schools',
          'Participation in the Bezalel Group operating ecosystem',
        ],
        venture: {
          name: 'Bezalel Inc',
          domain: 'Parent Holding & Stewardship',
          logo: '/assets/ventures/bezalel-insignia-logo.png',
          website: 'https://bezalelinc.com',
          id: 'bezalel',
        },
        photo: '/assets/photos/flow-opportunity.jpg',
      },
    ],
  },
  {
    id: 'human',
    title: 'The Human Flourishing Journey',
    subtitle: 'From discovering latent potential to becoming a generational opportunity creator',
    icon: <UserCheck className="w-4 h-4" />,
    stages: [
      {
        index: '01',
        phaseLabel: 'PHASE 01 · YOUTH CAPABILITY',
        stageName: 'Character Formation & Purpose Discovery',
        headline: 'Every generational outcome begins with one young person.',
        description:
          'Through experiential outdoor leadership camps and youth simulations pioneered since 2004, young learners uncover identity, moral courage, and teamwork rooted in purposeful craftsmanship.',
        transformationShift: {
          from: 'Uncertain identity & untaped potential',
          to: 'Awakened purpose, self-efficacy and resilience',
        },
        keyDeliverables: [
          'Longstanding youth development and experiential leadership programmes',
          'Character development and ethical decision-making labs',
          'Early mentorship bridging education with real-world contribution',
        ],
        venture: {
          name: 'HUR-ON Youth Labs & Bezalel',
          domain: 'Experiential Youth Enrichment',
          logo: '/assets/ventures/hur-on-logo.png',
          website: 'https://hur-on.com',
          id: 'hur-on',
        },
        photo: '/assets/photos/milestone-01.jpg',
      },
      {
        index: '02',
        phaseLabel: 'PHASE 02 · INNER WHOLENESS',
        stageName: 'Emotional Healing & Family Foundations',
        headline: 'Inner peace forms the bedrock for external contribution.',
        description:
          'Olive & Vine provides therapeutic care, resolving emotional wounds and strengthening parent-child and marriage dynamics so individuals operate from a place of deep emotional stability.',
        transformationShift: {
          from: 'Anxiety, unresolved distress and relational breakdown',
          to: 'Emotional wholeness, restored trust and family strength',
        },
        keyDeliverables: [
          'Clinical psychological assessments & therapeutic support',
          'Parenting and family restoration counseling',
          'Lifelong emotional health and personal identity formation',
        ],
        venture: {
          name: 'Olive & Vine Psychological Solutions',
          domain: 'Inner Person & Relational Wellbeing',
          logo: '/assets/ventures/olive-vine-logo.png',
          website: 'https://olivevine.solutions',
          id: 'olive-vine',
        },
        photo: '/assets/photos/milestone-04.jpg',
      },
      {
        index: '03',
        phaseLabel: 'PHASE 03 · PROFESSIONAL MASTERY',
        stageName: 'Workplace Leadership & Strategic Craft',
        headline: 'Capability converts into meaningful livelihood and enterprise contribution.',
        description:
          'Entering the corporate and commercial sphere, individuals receive executive coaching and corporate training through HUR-ON, mastering communication, emotional intelligence, and organizational leadership.',
        transformationShift: {
          from: 'Standard individual contributor',
          to: 'High-trust leader and culture multiplier in enterprise',
        },
        keyDeliverables: [
          'HRD Corp-accredited corporate executive masterclasses',
          'Leadership communication and high-performance collaboration',
          'Practical management tools for complex enterprise challenges',
        ],
        venture: {
          name: 'HUR-ON Training & Consultancy',
          domain: 'Executive Leadership & Capability',
          logo: '/assets/ventures/hur-on-logo.png',
          website: 'https://hur-on.com',
          id: 'hur-on',
        },
        photo: '/assets/photos/pillar-learning.jpg',
      },
      {
        index: '04',
        phaseLabel: 'PHASE 04 · ENTERPRISE MULTIPLICATION',
        stageName: 'Commercial Creation & Sustainable Value',
        headline: 'Turn personal skills into enduring commercial enterprises.',
        description:
          'Supported by Mustard Seed & Co and Phroneo, emergent leaders launch sustainable businesses and creative commercial ventures that generate real-world employment and market value.',
        transformationShift: {
          from: 'Dependent wage-earner',
          to: 'Enterprise creator generating sustainable livelihoods for others',
        },
        keyDeliverables: [
          'Full-service branding, positioning and launch strategy',
          'Commercial market multiplication and sustainable revenue models',
          'Corporate secretarial and governance scaffolding',
        ],
        venture: {
          name: 'Mustard Seed & Co · Phroneo',
          domain: 'Creative Enterprise & Governance',
          logo: '/assets/ventures/mustard-seed-logo.png',
          website: 'https://theseed.agency/index.html',
          id: 'mustard-seed',
        },
        photo: '/assets/photos/pillar-employment.jpg',
      },
      {
        index: '05',
        phaseLabel: 'PHASE 05 · GENERATIONAL STEWARDSHIP',
        stageName: 'The Opportunity Creator',
        headline: 'A recipient becomes a catalyst for future generations.',
        description:
          'The ultimate outcome of the Bezalel flywheel: the person who was once assisted becomes an investor, board leader, mentor, and institutional builder, paying forward opportunity across households and communities.',
        transformationShift: {
          from: 'Self-focused commercial achievement',
          to: 'Generational stewardship and philanthropic multiplication',
        },
        keyDeliverables: [
          'Mentorship of next-generation youth cohorts and founders',
          'Enduring legacy reinvestment into education and community care',
          'Active alliance within the Bezalel Group ecosystem',
        ],
        venture: {
          name: 'Bezalel Inc Ecosystem',
          domain: 'Generational Stewardship',
          logo: '/assets/ventures/bezalel-insignia-logo.png',
          website: 'https://bezalelinc.com',
          id: 'bezalel',
        },
        photo: '/assets/photos/impact-05.jpg',
      },
    ],
  },
];

export const EcosystemTransformationJourney: React.FC<EcosystemTransformationJourneyProps> = ({
  onOpenInquiry,
  className = '',
}) => {
  const [activeTrackId, setActiveTrackId] = useState<'enterprise' | 'human'>('enterprise');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const currentTrack =
    JOURNEY_TRACKS.find((track) => track.id === activeTrackId) || JOURNEY_TRACKS[0];
  const currentStage = currentTrack.stages[activeStageIndex] || currentTrack.stages[0];

  const handleNextStage = () => {
    setActiveStageIndex((prev) => (prev + 1) % currentTrack.stages.length);
  };

  const handlePrevStage = () => {
    setActiveStageIndex((prev) => (prev - 1 + currentTrack.stages.length) % currentTrack.stages.length);
  };

  return (
    <section className={`relative w-full py-16 sm:py-24 bg-[#FAF9F6] text-[#141812] border-b border-[#2D3A1E]/10 overflow-hidden ${className}`}>
      {/* Background Archival Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,58,30,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,58,30,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#2D3A1E]/12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#405329] mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#405329] animate-pulse" />
              <span>03 · THE TRANSFORMATION JOURNEY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#141812] leading-tight">
              How people & enterprises journey through Bezalel.
            </h2>
            <p className="text-sm sm:text-base text-[#52584E] mt-3 leading-relaxed">
              Capability is never static. Follow the sequential stages through which individual potential transforms into institutional longevity and generational stewardship.
            </p>
          </div>

          {/* Track Switcher (Enterprise vs Human) */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[#E8E4DA] border border-[#2D3A1E]/15 self-start md:self-auto shrink-0 shadow-sm">
            {JOURNEY_TRACKS.map((track) => {
              const isSelected = track.id === activeTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => {
                    setActiveTrackId(track.id);
                    setActiveStageIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D3A1E] text-white shadow-sm border border-[#405329]/40'
                      : 'text-[#4A4F44] hover:text-[#141812]'
                  }`}
                >
                  {track.icon}
                  <span>{track.id === 'enterprise' ? 'Enterprise Lifecycle' : 'Human Flourishing'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            INTERACTIVE PROGRESS TIMELINE SPINE (5 NUMBERED NODES)
        ====================================================================== */}
        <div className="mb-10 p-2 sm:p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-[#2D3A1E]/12 shadow-sm">
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {currentTrack.stages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isPassed = idx < activeStageIndex;
              return (
                <button
                  key={stage.index}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`relative p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                    isActive
                      ? 'bg-[#2D3A1E] text-white border-[#405329] shadow-md ring-1 ring-[#405329]'
                      : isPassed
                      ? 'bg-[#FAF8F4] text-[#141812] border-[#2D3A1E]/20 hover:border-[#405329]'
                      : 'bg-transparent text-[#7A7569] border-transparent hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`font-mono text-[9px] sm:text-[10px] font-bold ${isActive ? 'text-[#A3B86C]' : 'text-[#405329]'}`}>
                      STAGE {stage.index}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A3B86C] animate-ping" />
                    )}
                  </div>
                  <div className={`font-display text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1 ${isActive ? 'text-white' : 'text-[#141812]'}`}>
                    {stage.stageName}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            STAGE HERO SHOWCASE CARD (SPLIT PHOTO + EDITORIAL NARRATIVE)
        ====================================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentTrack.id}-${currentStage.index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-3xl bg-white border border-[#2D3A1E]/12 shadow-[0_24px_50px_-20px_rgba(20,24,18,0.08)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* LEFT: AUTHENTIC PHOTOGRAPHY PLATE (5 COLS) */}
              <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] lg:min-h-full bg-black/10 overflow-hidden">
                <img
                  src={currentStage.photo}
                  alt={currentStage.stageName}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge: Stage Index Stamp */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#A3B86C]/40 text-[#A3B86C] font-mono text-xs font-bold tracking-wider shadow-sm">
                    STAGE {currentStage.index} OF 05
                  </span>
                </div>

                {/* Bottom Overlay: Involved Venture Pill */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#A3B86C] font-semibold">
                      Operating Catalyst:
                    </span>
                    <span className="text-xs font-display font-bold text-white">
                      {currentStage.venture.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: EDITORIAL TYPOGRAPHY & TRANSFORMATION DELIVERABLES (7 COLS) */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  {/* Top Meta Kicker */}
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#405329] font-bold mb-1.5">
                    {currentStage.phaseLabel}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#141812] tracking-tight leading-snug">
                    {currentStage.stageName}
                  </h3>

                  <p className="font-display text-base sm:text-lg text-[#405329] italic mt-1 font-medium">
                    "{currentStage.headline}"
                  </p>

                  <p className="text-sm sm:text-base text-[#52584E] mt-3 leading-relaxed">
                    {currentStage.description}
                  </p>

                  {/* The Transformation Shift Pill */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-[#F4F1EA] border border-[#2D3A1E]/10 space-y-1.5">
                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#405329] font-bold block">
                      The Transformation Shift:
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-[#141812]">
                      <div className="flex items-center gap-1.5 line-through text-[#7A7569]">
                        <span>From:</span>
                        <span>{currentStage.transformationShift.from}</span>
                      </div>
                      <span className="hidden sm:inline font-bold text-[#405329]">→</span>
                      <div className="flex items-center gap-1.5 font-semibold text-[#2D3A1E]">
                        <span>To:</span>
                        <span>{currentStage.transformationShift.to}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Concrete Milestones / Deliverables */}
                  <div className="mt-5 pt-4 border-t border-[#2D3A1E]/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A7569] font-semibold block">
                      Concrete Practice Deliverables:
                    </span>
                    <div className="space-y-1.5">
                      {currentStage.keyDeliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#141812]">
                          <CheckCircle2 className="w-4 h-4 text-[#405329] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Step Navigation Bar */}
                <div className="pt-4 border-t border-[#2D3A1E]/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStage}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#2D3A1E]/15 hover:border-[#405329] text-xs font-mono font-medium text-[#141812] cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Stage</span>
                  </button>

                  <span className="font-mono text-xs text-[#7A7569]">
                    {currentStage.index} / 05
                  </span>

                  <button
                    type="button"
                    onClick={handleNextStage}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D3A1E] text-white hover:bg-[#405329] text-xs font-mono font-semibold cursor-pointer transition-colors shadow-sm"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};