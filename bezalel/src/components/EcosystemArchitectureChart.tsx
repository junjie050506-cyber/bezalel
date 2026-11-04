import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Heart,
  Compass,
  Layers,
  Network,
  CheckCircle2,
  Share2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_ENTITIES, PARENT_COMPANY, ECOSYSTEM_MATRIX } from '../data/ecosystemData';

export interface EcosystemArchitectureChartProps {
  onOpenInquiry?: (bId?: string) => void;
  className?: string;
}

interface NodeSynergySpec {
  id: string;
  name: string;
  shortName: string;
  number: string;
  domain: string;
  category: string;
  tagline: string;
  logo: string;
  website?: string;
  color: string;
  roleInGroup: string;
  inputsFromGroup: string[];
  outputsToGroup: string[];
  crossSynergies: {
    partnerName: string;
    partnerId: string;
    relationship: string;
  }[];
}

const ECOSYSTEM_NODES: NodeSynergySpec[] = [
  {
    id: 'bezalel',
    name: 'BEZALEL INC',
    shortName: 'Bezalel Inc',
    number: '00',
    domain: 'GROUP STEWARDSHIP & GOVERNANCE',
    category: 'PARENT HOLDINGS & INSTITUTIONAL ANCHOR',
    tagline: 'Equip people. Strengthen enterprise. Multiply opportunity.',
    logo: '/assets/ventures/bezalel-insignia-logo.png',
    website: 'https://bezalelinc.com',
    color: '#405329',
    roleInGroup:
      'The central holding anchor providing capital allocation, multi-generational fiduciary governance, and unified biblically grounded ethics across all subsidiaries.',
    inputsFromGroup: [
      'Commercial dividends and enterprise growth from Mustard Seed & Co',
      'Organizational leadership development and executive pipelines from HUR-ON',
      'Statutory compliance records and board filings managed by Phroneo',
      'Holistic wellbeing support for group families and executives from Olive & Vine',
    ],
    outputsToGroup: [
      'Strategic group vision, brand standards, and capital reserves',
      'Unified Exodus 31:1-6 stewardship ethos and corporate ethics',
      'Shared administrative backing, marketing resources, and executive guidance',
      'Dedicated funding for refugee schools and community impact programs',
    ],
    crossSynergies: [
      {
        partnerName: 'Phroneo BoardSuite',
        partnerId: 'phroneo',
        relationship: 'Direct group compliance oversight, secretarial governance & SSM rigor.',
      },
      {
        partnerName: 'Mustard Seed & Co',
        partnerId: 'mustard-seed',
        relationship: 'Commercial multiplication engine feeding social impact initiatives.',
      },
      {
        partnerName: 'HUR-ON Training',
        partnerId: 'hur-on',
        relationship: 'Group capability development and executive leadership formation.',
      },
      {
        partnerName: 'Olive & Vine',
        partnerId: 'olive-vine',
        relationship: 'Relational health & emotional wholeness across group leadership.',
      },
    ],
  },
  {
    id: 'phroneo',
    name: 'PHRONEO BOARDSUITE',
    shortName: 'Phroneo BoardSuite',
    number: '04',
    domain: 'INSTITUTIONAL FOUNDATIONS',
    category: 'CORPORATE GOVERNANCE & STATUTORY RIGOR',
    tagline: 'Wise structure helps enterprise endure.',
    logo: '/assets/ventures/phroneo-logo.png',
    website: 'https://phroneoboardsuite.com',
    color: '#405329',
    roleInGroup:
      'Constructs the unshakeable legal, statutory, and corporate secretarial bedrock for all subsidiaries and external client boards.',
    inputsFromGroup: [
      'Group governance directives and fiduciary standards from Bezalel Inc',
      'Enterprises graduating from Mustard Seed marketing scaling into corporate governance',
      'Executive boards seeking governance training facilitated by HUR-ON',
    ],
    outputsToGroup: [
      'Seamless statutory filing, secretarial audit, and SSM compliance rigor',
      'Board constitution drafting and corporate advisory support',
      'Institutional longevity frameworks preventing legal vulnerabilities',
    ],
    crossSynergies: [
      {
        partnerName: 'Mustard Seed & Co',
        partnerId: 'mustard-seed',
        relationship: 'Provides legal incorporation & compliance for newly launched brands.',
      },
      {
        partnerName: 'HUR-ON Training',
        partnerId: 'hur-on',
        relationship: 'Pairs corporate training with statutory board governance advisory.',
      },
    ],
  },
  {
    id: 'mustard-seed',
    name: 'MUSTARD SEED & CO',
    shortName: 'Mustard Seed & Co',
    number: '03',
    domain: 'COMMERCIAL MULTIPLICATION',
    category: 'CREATIVE BRANDING, MARKETING & MEDIA',
    tagline: 'Clarify the position. Communicate value. Pursue growth.',
    logo: '/assets/ventures/mustard-seed-logo.png',
    website: 'https://theseed.agency/index.html',
    color: '#C89B3C',
    roleInGroup:
      'The creative commerce and marketing engine accelerating market positioning, digital reach, and revenue multiplication for the Group and client ventures.',
    inputsFromGroup: [
      'Ethical guardrails and group brand equity anchored by Bezalel Inc',
      'Corporate secretarial and licensing structure provided by Phroneo',
      'Team creative flow and communication masterclasses from HUR-ON',
    ],
    outputsToGroup: [
      'Brand positioning, digital presence, and high-impact design across subsidiaries',
      'Commercial revenues generating economic sustainability for social missions',
      'Creative storytelling celebrating human transformation across the ecosystem',
    ],
    crossSynergies: [
      {
        partnerName: 'Olive & Vine',
        partnerId: 'olive-vine',
        relationship: 'Translates clinical psychology research into accessible public communication.',
      },
      {
        partnerName: 'Phroneo BoardSuite',
        partnerId: 'phroneo',
        relationship: 'Grows client businesses to the scale where formal board suites are required.',
      },
    ],
  },
  {
    id: 'olive-vine',
    name: 'OLIVE & VINE PSYCHOLOGICAL SOLUTIONS',
    shortName: 'Olive & Vine',
    number: '01',
    domain: 'THE INNER PERSON',
    category: 'PSYCHOLOGICAL & RELATIONAL WELLBEING',
    tagline: 'Inner wellbeing shapes how people live and lead.',
    logo: '/assets/ventures/olive-vine-logo.png',
    website: 'https://olivevine.solutions',
    color: '#A3B86C',
    roleInGroup:
      'Protects and restores the psychological and relational health of individuals, children, families, and high-stress corporate leaders.',
    inputsFromGroup: [
      'Institutional support and stable operational infrastructure from Bezalel Inc',
      'Executive referrals experiencing burnout or high-pressure corporate strain from HUR-ON',
      'Public mental health campaign amplification through Mustard Seed & Co',
    ],
    outputsToGroup: [
      'Clinical psychological therapy and family wholeness initiatives',
      'Preventative mental health care and burnout mitigation for group executives',
      'Trauma-informed perspectives applied to youth education and community care',
    ],
    crossSynergies: [
      {
        partnerName: 'HUR-ON Training',
        partnerId: 'hur-on',
        relationship: 'Embeds emotional intelligence and psychological safety into corporate OD.',
      },
      {
        partnerName: 'Mustard Seed & Co',
        partnerId: 'mustard-seed',
        relationship: 'Develops compassionate public awareness around mental health and family healing.',
      },
    ],
  },
  {
    id: 'hur-on',
    name: 'HUR-ON TRAINING & CONSULTANCY',
    shortName: 'HUR-ON',
    number: '02',
    domain: 'LEADERS, TEAMS & CAPABILITY',
    category: 'CORPORATE TRAINING & EXPERIENTIAL LABS',
    tagline: 'Learning should change behaviour, relationships and performance.',
    logo: '/assets/ventures/hur-on-logo.png',
    website: 'https://hur-on.com',
    color: '#8C9E5E',
    roleInGroup:
      'Transforms human capability through HRD Corp-accredited corporate training, executive coaching, youth character outdoor camps, and organizational development.',
    inputsFromGroup: [
      'Exodus 31 stewardship philosophy and multi-generational backing from Bezalel Inc',
      'Psychological assessment frameworks and resilience insights from Olive & Vine',
      'Dynamic curriculum branding and visual presentation assets from Mustard Seed & Co',
    ],
    outputsToGroup: [
      'High-performance team alignment and leadership culture transformation',
      'Longstanding youth development and experiential leadership programmes (PDF Page 18)',
      'C-suite executive coaching that connects commercial performance with servant leadership',
    ],
    crossSynergies: [
      {
        partnerName: 'Olive & Vine',
        partnerId: 'olive-vine',
        relationship: 'Connects corporate organizational behavior with deep psychological wellbeing.',
      },
      {
        partnerName: 'Phroneo BoardSuite',
        partnerId: 'phroneo',
        relationship: 'Equips board directors and corporate executives with governance leadership capability.',
      },
    ],
  },
];

export const EcosystemArchitectureChart: React.FC<EcosystemArchitectureChartProps> = ({
  onOpenInquiry,
  className = '',
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('bezalel');
  const [chartMode, setChartMode] = useState<'orbital' | 'matrix'>('orbital');

  const selectedNode =
    ECOSYSTEM_NODES.find((node) => node.id === selectedNodeId) || ECOSYSTEM_NODES[0];

  return (
    <section className={`relative w-full py-16 sm:py-24 bg-[#141C10] text-[#FAF8F4] overflow-hidden ${className}`}>
      {/* Background Architectural Laser Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(163,184,108,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(163,184,108,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Dramatic Radiant Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(64,83,41,0.35)_0%,rgba(200,155,60,0.12)_45%,transparent_70%)] blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#A3B86C] mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#A3B86C] animate-pulse" />
              <span>02 · INTERACTIVE OPERATING ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FBF9F5] leading-tight">
              An interlocking nexus of capital, capability & care.
            </h2>
            <p className="text-sm sm:text-base text-[#D0CECA] mt-3 leading-relaxed">
              Bezalel Inc does not operate as fragmented standalone businesses. Explore how our four operating subsidiaries form a synchronized economic and human development flywheel.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md self-start md:self-auto shrink-0 shadow-lg">
            <button
              type="button"
              onClick={() => setChartMode('orbital')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                chartMode === 'orbital'
                  ? 'bg-[#2D3A1E] text-[#FAF8F4] border border-[#A3B86C]/40 shadow-sm'
                  : 'text-[#A5A094] hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#A3B86C]" />
              <span>Orbital Nexus Map</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode('matrix')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                chartMode === 'matrix'
                  ? 'bg-[#2D3A1E] text-[#FAF8F4] border border-[#A3B86C]/40 shadow-sm'
                  : 'text-[#A5A094] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#A3B86C]" />
              <span>Synergy Matrix</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            VIEW 1: ORBITAL NEXUS ARCHITECTURE MAP
        ====================================================================== */}
        {chartMode === 'orbital' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT / CENTER: INTERACTIVE ORBITAL STAGE (7 COLS) */}
            <div className="lg:col-span-7 relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center p-4">
              {/* Dynamic SVG Artery Connections */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 500 500"
              >
                <defs>
                  <linearGradient id="orbitalBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#405329" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#A3B86C" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C89B3C" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="glowFilter">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Concentric Orbital Rings */}
                <circle cx="250" cy="250" r="190" fill="none" stroke="rgba(163,184,108,0.15)" strokeWidth="1" strokeDasharray="3 6" />
                <circle cx="250" cy="250" r="130" fill="none" stroke="rgba(200,155,60,0.18)" strokeWidth="1.2" strokeDasharray="4 8" className="animate-[spin_60s_linear_infinite]" />

                {/* Artery Lines to 4 Pillars */}
                {/* North: Phroneo (250, 60) */}
                <path d="M 250 250 L 250 65" fill="none" stroke={selectedNodeId === 'phroneo' || selectedNodeId === 'bezalel' ? 'url(#orbitalBeam)' : 'rgba(255,255,255,0.15)'} strokeWidth={selectedNodeId === 'phroneo' ? '2.5' : '1.5'} strokeDasharray="4 4" />
                {/* East: Mustard Seed (435, 250) */}
                <path d="M 250 250 L 435 250" fill="none" stroke={selectedNodeId === 'mustard-seed' || selectedNodeId === 'bezalel' ? 'url(#orbitalBeam)' : 'rgba(255,255,255,0.15)'} strokeWidth={selectedNodeId === 'mustard-seed' ? '2.5' : '1.5'} strokeDasharray="4 4" />
                {/* South: Olive & Vine (250, 435) */}
                <path d="M 250 250 L 250 435" fill="none" stroke={selectedNodeId === 'olive-vine' || selectedNodeId === 'bezalel' ? 'url(#orbitalBeam)' : 'rgba(255,255,255,0.15)'} strokeWidth={selectedNodeId === 'olive-vine' ? '2.5' : '1.5'} strokeDasharray="4 4" />
                {/* West: HUR-ON (65, 250) */}
                <path d="M 250 250 L 65 250" fill="none" stroke={selectedNodeId === 'hur-on' || selectedNodeId === 'bezalel' ? 'url(#orbitalBeam)' : 'rgba(255,255,255,0.15)'} strokeWidth={selectedNodeId === 'hur-on' ? '2.5' : '1.5'} strokeDasharray="4 4" />

                {/* Outer Cross-Pillar Perimeter Synergy Loop */}
                <polygon
                  points="250,65 435,250 250,435 65,250"
                  fill="none"
                  stroke="rgba(163,184,108,0.22)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
              </svg>

              {/* 1. CENTRAL KEYSTONE MONOLITH: BEZALEL INC */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedNodeId('bezalel')}
                className={`relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 transition-all cursor-pointer flex flex-col items-center justify-center text-center shadow-2xl ${
                  selectedNodeId === 'bezalel'
                    ? 'ring-4 ring-[#A3B86C] bg-gradient-to-br from-[#2D3A1E] via-[#405329] to-[#141C10] shadow-[0_0_40px_rgba(163,184,108,0.4)]'
                    : 'ring-2 ring-white/20 bg-[#182317] hover:ring-[#A3B86C]/60 hover:bg-[#22301B]'
                }`}
              >
                <div className="w-full h-full rounded-full bg-[#121A10] border border-[#A3B86C]/40 flex flex-col items-center justify-center p-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 mb-1 flex items-center justify-center">
                    <img
                      src="/assets/ventures/bezalel-insignia-logo.png"
                      alt="Bezalel Insignia"
                      className="w-full h-full object-contain filter drop-shadow brightness-115"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.monogram-fallback')) {
                          const span = document.createElement('span');
                          span.className = 'monogram-fallback font-display text-lg font-bold text-[#A3B86C] tracking-widest';
                          span.innerText = 'ZL';
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-[#FAF8F4]">
                    BEZALEL INC
                  </span>
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.18em] text-[#A3B86C] font-semibold mt-0.5">
                    HOLDINGS CORE
                  </span>
                </div>
              </motion.button>

              {/* 2. NORTH PILLAR: PHRONEO BOARDSUITE (04) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedNodeId('phroneo')}
                className={`absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-20 w-24 sm:w-28 p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shadow-xl ${
                  selectedNodeId === 'phroneo'
                    ? 'bg-[#1F2C18] border-[#A3B86C] ring-2 ring-[#A3B86C]/50 shadow-[0_0_25px_rgba(163,184,108,0.35)]'
                    : 'bg-[#141C13]/90 border-white/15 hover:border-[#A3B86C]/60 hover:bg-[#1A2516]'
                }`}
              >
                <span className="text-[8px] font-mono text-[#A3B86C] font-bold">PILLAR 04</span>
                <span className="font-display text-xs font-bold text-[#FAF8F4] mt-0.5">PHRONEO</span>
                <span className="text-[7.5px] font-mono uppercase text-[#A5A094] tracking-wider mt-0.5">
                  Governance
                </span>
              </motion.button>

              {/* 3. EAST PILLAR: MUSTARD SEED & CO (03) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedNodeId('mustard-seed')}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-24 sm:w-28 p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shadow-xl ${
                  selectedNodeId === 'mustard-seed'
                    ? 'bg-[#2A2414] border-[#C89B3C] ring-2 ring-[#C89B3C]/50 shadow-[0_0_25px_rgba(200,155,60,0.35)]'
                    : 'bg-[#141C13]/90 border-white/15 hover:border-[#C89B3C]/60 hover:bg-[#1A2516]'
                }`}
              >
                <span className="text-[8px] font-mono text-[#C89B3C] font-bold">PILLAR 03</span>
                <span className="font-display text-xs font-bold text-[#FAF8F4] mt-0.5">MUSTARD SEED</span>
                <span className="text-[7.5px] font-mono uppercase text-[#A5A094] tracking-wider mt-0.5">
                  Multiplication
                </span>
              </motion.button>

              {/* 4. SOUTH PILLAR: OLIVE & VINE (01) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedNodeId('olive-vine')}
                className={`absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 w-24 sm:w-28 p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shadow-xl ${
                  selectedNodeId === 'olive-vine'
                    ? 'bg-[#1F2C18] border-[#A3B86C] ring-2 ring-[#A3B86C]/50 shadow-[0_0_25px_rgba(163,184,108,0.35)]'
                    : 'bg-[#141C13]/90 border-white/15 hover:border-[#A3B86C]/60 hover:bg-[#1A2516]'
                }`}
              >
                <span className="text-[8px] font-mono text-[#A3B86C] font-bold">PILLAR 01</span>
                <span className="font-display text-xs font-bold text-[#FAF8F4] mt-0.5">OLIVE & VINE</span>
                <span className="text-[7.5px] font-mono uppercase text-[#A5A094] tracking-wider mt-0.5">
                  Inner Person
                </span>
              </motion.button>

              {/* 5. WEST PILLAR: HUR-ON (02) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedNodeId('hur-on')}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-24 sm:w-28 p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shadow-xl ${
                  selectedNodeId === 'hur-on'
                    ? 'bg-[#1F2C18] border-[#8C9E5E] ring-2 ring-[#8C9E5E]/50 shadow-[0_0_25px_rgba(140,158,94,0.35)]'
                    : 'bg-[#141C13]/90 border-white/15 hover:border-[#8C9E5E]/60 hover:bg-[#1A2516]'
                }`}
              >
                <span className="text-[8px] font-mono text-[#8C9E5E] font-bold">PILLAR 02</span>
                <span className="font-display text-xs font-bold text-[#FAF8F4] mt-0.5">HUR-ON</span>
                <span className="text-[7.5px] font-mono uppercase text-[#A5A094] tracking-wider mt-0.5">
                  Capability Labs
                </span>
              </motion.button>
            </div>

            {/* RIGHT: DEEP SYNERGY INSPECTOR DRAWER (5 COLS) */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="rounded-3xl bg-[#172213] border border-[#A3B86C]/30 p-6 sm:p-7 shadow-2xl space-y-5"
                >
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#405329] text-white font-mono text-[9.5px] font-bold border border-[#A3B86C]/30">
                        № {selectedNode.number}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#A3B86C] font-semibold">
                        {selectedNode.domain}
                      </span>
                    </div>

                    {selectedNode.website && (
                      ['hur-on', 'phroneo', 'olive-vine'].includes(selectedNode.id) ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FAF8F4]/50 cursor-not-allowed select-none">
                          <span>Coming Soon</span>
                        </span>
                      ) : (
                        <a
                          href={selectedNode.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FAF8F4] hover:text-[#A3B86C] transition-colors"
                        >
                          <span>Official Portal</span>
                          <ArrowUpRight className="w-3 h-3 text-[#A3B86C]" />
                        </a>
                      )
                    )}
                  </div>

                  {/* Entity Header */}
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FBF9F5] tracking-tight">
                      {selectedNode.name}
                    </h3>
                    <p className="font-display text-sm sm:text-base text-[#A3B86C] italic mt-1">
                      "{selectedNode.tagline}"
                    </p>
                    <p className="text-xs sm:text-sm text-[#D5D0C6] mt-2.5 leading-relaxed">
                      {selectedNode.roleInGroup}
                    </p>
                  </div>

                  {/* Flow Exchange: Inputs & Outputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* What it Contributes */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8 space-y-1.5">
                      <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#A3B86C] font-bold flex items-center gap-1.5">
                        <Share2 className="w-3 h-3 text-[#A3B86C]" />
                        <span>Outputs to Ecosystem</span>
                      </div>
                      <ul className="space-y-1 text-[10.5px] text-[#D5D0C6] leading-snug">
                        {selectedNode.outputsToGroup.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#A3B86C] font-bold">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What it Receives */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8 space-y-1.5">
                      <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#C89B3C] font-bold flex items-center gap-1.5">
                        <RefreshCw className="w-3 h-3 text-[#C89B3C]" />
                        <span>Inputs from Ecosystem</span>
                      </div>
                      <ul className="space-y-1 text-[10.5px] text-[#D5D0C6] leading-snug">
                        {selectedNode.inputsFromGroup.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#C89B3C] font-bold">←</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Cross-Venture Synergy Highlights */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A5A094] font-semibold block">
                      Active Operating Synergies:
                    </span>
                    <div className="space-y-2">
                      {selectedNode.crossSynergies.map((syn, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedNodeId(syn.partnerId)}
                          className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/8 flex items-start gap-2.5 cursor-pointer transition-colors group/syn"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B86C] shrink-0 mt-0.5" />
                          <div className="text-xs flex-1">
                            <span className="font-semibold text-white group-hover/syn:text-[#A3B86C] transition-colors">
                              {syn.partnerName}:
                            </span>{' '}
                            <span className="text-[#D5D0C6]">{syn.relationship}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inquiry CTA */}
                  {onOpenInquiry && (
                    <button
                      type="button"
                      onClick={() => onOpenInquiry(selectedNode.id !== 'bezalel' ? selectedNode.id : undefined)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2D3A1E] hover:bg-[#405329] text-white text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#A3B86C]/40 shadow-sm"
                    >
                      <span>Inquire Regarding {selectedNode.shortName} Integration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* =====================================================================
            VIEW 2: SYNERGY CROSS-FLOW MATRIX VIEW
        ====================================================================== */}
        {chartMode === 'matrix' && (
          <div className="space-y-4">
            <div className="rounded-3xl bg-[#172213] border border-[#A3B86C]/30 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-black/30 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#A3B86C]">
                    <tr>
                      <th className="py-4 px-6 font-semibold">Venture & Domain</th>
                      <th className="py-4 px-6 font-semibold">Primary Core Specialization</th>
                      <th className="py-4 px-6 font-semibold">What It Contributes to Ecosystem</th>
                      <th className="py-4 px-6 font-semibold">What It Receives from Ecosystem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8 text-[#D5D0C6]">
                    {ECOSYSTEM_NODES.map((node) => (
                      <tr
                        key={node.id}
                        onClick={() => {
                          setSelectedNodeId(node.id);
                          setChartMode('orbital');
                        }}
                        className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                      >
                        <td className="py-4 px-6">
                          <div className="font-display font-bold text-white group-hover:text-[#A3B86C] transition-colors text-base">
                            {node.shortName}
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#A5A094]">
                            № {node.number} · {node.domain}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-[#E5E0D6] max-w-[200px] leading-relaxed">
                          {node.tagline}
                        </td>
                        <td className="py-4 px-6 text-xs leading-relaxed max-w-[260px]">
                          <span className="text-[#A3B86C] font-semibold">→ </span>
                          {node.outputsToGroup[0]}
                        </td>
                        <td className="py-4 px-6 text-xs leading-relaxed max-w-[260px]">
                          <span className="text-[#C89B3C] font-semibold">← </span>
                          {node.inputsFromGroup[0]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-[#A5A094]">
              <span>Click any row to open full interactive orbital synergy drawer.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};