import React, { useState } from 'react';
import { ZInsignia } from './ZInsignia';
import { BookOpen, Compass, Target, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { FOUNDER_PERSPECTIVES } from '../data/ecosystemData';

export const BiblicalFoundation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'foundation' | 'perspectives'>('pillars');

  const pillars = [
    {
      label: 'PURPOSE',
      tag: 'Why We Exist',
      icon: Target,
      content:
        'Equip people and strengthen enterprises so opportunity can be created, sustained and multiplied.',
      impact: 'Focuses energy on multiplication rather than passive maintenance.',
    },
    {
      label: 'VISION',
      tag: 'Where We Are Going',
      icon: Compass,
      content:
        'See people and enterprises become catalysts of sustainable opportunity for families, organisations, communities and future generations.',
      impact: 'Creating self-sustaining nodes of community economic strength.',
    },
    {
      label: 'MISSION',
      tag: 'How We Do It',
      icon: Sparkles,
      content:
        'Develop human potential and enterprise capability through education, psychological and relational wellbeing, training, creativity, entrepreneurship, governance and business support.',
      impact: 'Integrating the full spectrum of psychological, technical, and structural disciplines.',
    },
    {
      label: 'PROMISE',
      tag: 'Our Commitment',
      icon: HeartHandshake,
      content:
        'Turn capability into sustainable opportunity—for people, organisations and the communities they influence.',
      impact: 'Grounded accountability from individual learning to collective livelihood.',
    },
  ];

  return (
    <section id="foundation" className="py-20 lg:py-28 bg-[#EFEBE0]/60 border-b border-[#3D4A26]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#3D4A26]/15">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#3D4A26] mb-3">
              <span>Section 03</span>
              <span aria-hidden="true">·</span>
              <span>Foundation & Mandate</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2D3A1E] font-normal leading-tight">
              We build capability that creates opportunity
            </h2>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4F1EA] border border-[#3D4A26]/15 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'pillars'
                  ? 'bg-[#3D4A26] text-white shadow-xs'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              Core Pillars
            </button>
            <button
              onClick={() => setActiveTab('foundation')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'foundation'
                  ? 'bg-[#3D4A26] text-white shadow-xs'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              The Name (Exodus 31)
            </button>
            <button
              onClick={() => setActiveTab('perspectives')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'perspectives'
                  ? 'bg-[#3D4A26] text-white shadow-xs'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              Founder Perspectives
            </button>
          </div>
        </div>

        {/* Tab 1: Core Pillars */}
        {activeTab === 'pillars' && (
          <div className="mt-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.label}
                    className="relative bg-[#F4F1EA] p-8 border border-[#3D4A26]/15 hover:border-[#3D4A26]/30 transition-all flex flex-col justify-between"
                  >
                    {/* Corner accent */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#3D4A26]/10 text-[#3D4A26]">
                          <IconComponent className="w-5 h-5 text-[#3D4A26]" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold tracking-[0.2em] text-[#8C9E5E] uppercase block">
                            {pillar.tag}
                          </span>
                          <h3 className="font-display text-2xl text-[#2D3A1E] font-medium tracking-wide">
                            {pillar.label}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-base text-[#1A1A1A] leading-relaxed font-normal mb-6">
                      {pillar.content}
                    </p>

                    <div className="pt-4 border-t border-[#3D4A26]/10 text-xs text-[#2B2B2B]/75 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8C9E5E] shrink-0" />
                      <span>{pillar.impact}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Group Brand Line Callout */}
            <div className="bg-[#2D3A1E] text-[#F4F1EA] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#3D4A26]">
              <div className="flex items-center gap-4">
                <ZInsignia size={36} variant="sage" />
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C9E5E] uppercase block">
                    Group Brand Line
                  </span>
                  <p className="font-display text-xl sm:text-2xl text-[#F4F1EA] tracking-wide mt-0.5">
                    EQUIP PEOPLE. STRENGTHEN ENTERPRISE. MULTIPLY OPPORTUNITY.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono tracking-wider text-[#A3B86C] border-l md:border-l-0 md:pl-0 pl-3">
                BEZALEL INC / 07
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: The Name Behind The Work (Exodus 31:1-6) */}
        {activeTab === 'foundation' && (
          <div className="mt-12 bg-[#2D3A1E] text-[#F4F1EA] p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-[#3D4A26]">
            {/* Background Z motif */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
              <ZInsignia size={480} variant="sage" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-8">
              <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#8C9E5E] uppercase font-semibold">
                <BookOpen className="w-4 h-4 text-[#8C9E5E]" />
                <span>EXODUS 31:1–6 · SCRIPTURAL & BRAND ROOTS</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#F4F1EA]">
                The Name Behind The Work
              </h3>

              <div className="p-6 bg-[#3D4A26]/40 border border-[#8C9E5E]/20 text-lg sm:text-xl font-display italic text-[#F4F1EA]/95 leading-relaxed">
                “Bezalel was called and equipped with wisdom, understanding, knowledge and skill for
                purposeful creative work.”
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#EFEBE0]/90 leading-relaxed font-light">
                <p>
                  In the biblical narrative, Bezalel was the master craftsman entrusted to build the
                  Tabernacle—endowed with the Spirit of God in wisdom, intelligence, craftsmanship,
                  and the ability to teach others.
                </p>
                <p>
                  For the Group, the name represents <strong className="text-[#A3B86C] font-semibold">stewardship</strong>: using gifts, ideas, expertise, relationships, and
                  resources purposefully and responsibly. It is a commitment that enterprise is not
                  merely for self-aggrandizement, but an instrument to create lasting opportunity.
                </p>
              </div>

              <div className="pt-6 border-t border-[#8C9E5E]/25 flex items-center justify-between text-xs tracking-wider text-[#8C9E5E] uppercase">
                <span>Stewardship · Craftsmanship · Wisdom · Legacy</span>
                <span>Exodus 31:1–6 / Bezalel Inc 06</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Founder Perspectives */}
        {activeTab === 'perspectives' && (
          <div className="mt-12 bg-[#F4F1EA] p-8 sm:p-12 border border-[#3D4A26]/15">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#3D4A26] uppercase block mb-2">
                Founder Perspective
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#2D3A1E] font-medium leading-tight">
                The person and the enterprise belong in the same conversation
              </h3>
              <p className="text-sm text-[#2B2B2B]/80 mt-3 leading-relaxed">
                Lalitha Manoharan’s journey bridges seven distinct disciplines. This breadth shapes a
                Group that considers human potential and commercial sustainability together:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FOUNDER_PERSPECTIVES.map((item) => (
                <div
                  key={item.index}
                  className="flex items-center gap-4 p-4 bg-[#EFEBE0] border border-[#3D4A26]/10"
                >
                  <span className="font-mono text-sm font-semibold text-[#8C9E5E] shrink-0">
                    {item.index}
                  </span>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#3D4A26]/15 flex items-center justify-between text-xs text-[#3D4A26]">
              <span className="font-medium">
                Integrated breadth: from psychological depth to corporate governance.
              </span>
              <span className="font-mono">BEZALEL INC / 04</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
