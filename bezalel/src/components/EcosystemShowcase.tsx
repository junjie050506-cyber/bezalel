import React, { useState } from 'react';
import {
  BUSINESS_ENTITIES,
  ECOSYSTEM_MATRIX,
  DIFFERENTIATORS,
} from '../data/ecosystemData';
import { ZInsignia } from './ZInsignia';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowUpRight,
  Compass,
  Building,
  Heart,
  Users,
  Briefcase,
  FileBadge,
} from 'lucide-react';

interface EcosystemShowcaseProps {
  onSelectBusinessInquiry: (businessId: string) => void;
}

export const EcosystemShowcase: React.FC<EcosystemShowcaseProps> = ({
  onSelectBusinessInquiry,
}) => {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>(
    BUSINESS_ENTITIES[0].id
  );
  const [activeSubTab, setActiveSubTab] = useState<'businesses' | 'matrix' | 'differentiators'>(
    'businesses'
  );

  const currentBusiness =
    BUSINESS_ENTITIES.find((b) => b.id === selectedBusinessId) || BUSINESS_ENTITIES[0];

  const getEntityIcon = (id: string) => {
    switch (id) {
      case 'olive-vine':
        return Heart;
      case 'hur-on':
        return Compass;
      case 'mustard-seed':
        return Sparkles;
      case 'phroneo':
        return Briefcase;
      default:
        return Building;
    }
  };

  return (
    <section id="ecosystem" className="py-20 lg:py-28 bg-[#EFEBE0]/50 border-b border-[#3D4A26]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#3D4A26]/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#3D4A26] mb-3">
              <span>Section 05</span>
              <span aria-hidden="true">·</span>
              <span>The Specialised Ecosystem</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2D3A1E] font-normal leading-tight">
              Specialised without fragmentation
            </h2>
            <p className="text-base sm:text-lg text-[#2B2B2B]/85 mt-3 font-normal">
              Four specialised operating businesses. One unified entrepreneurial story.
            </p>
          </div>

          {/* Sub Navigation Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4F1EA] border border-[#3D4A26]/15 self-start lg:self-auto">
            <button
              onClick={() => setActiveSubTab('businesses')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeSubTab === 'businesses'
                  ? 'bg-[#3D4A26] text-white'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              4 Operating Entities
            </button>
            <button
              onClick={() => setActiveSubTab('matrix')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeSubTab === 'matrix'
                  ? 'bg-[#3D4A26] text-white'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              How It Works Matrix
            </button>
            <button
              onClick={() => setActiveSubTab('differentiators')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeSubTab === 'differentiators'
                  ? 'bg-[#3D4A26] text-white'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              Why Bezalel Differs
            </button>
          </div>
        </div>

        {/* View 1: 4 Operating Entities Interactive Showcase */}
        {activeSubTab === 'businesses' && (
          <div className="mt-12 space-y-10">
            {/* Entity Selector Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {BUSINESS_ENTITIES.map((entity) => {
                const isSelected = entity.id === selectedBusinessId;
                const IconComponent = getEntityIcon(entity.id);
                return (
                  <button
                    key={entity.id}
                    onClick={() => setSelectedBusinessId(entity.id)}
                    className={`text-left p-5 border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#2D3A1E] text-[#F4F1EA] border-[#2D3A1E] shadow-md'
                        : 'bg-[#F4F1EA] text-[#1A1A1A] border-[#3D4A26]/15 hover:border-[#3D4A26]/40 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isSelected ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                          }`}
                        >
                          {entity.number}
                        </span>
                        <IconComponent
                          className={`w-4 h-4 ${
                            isSelected ? 'text-[#8C9E5E]' : 'text-[#3D4A26]/60'
                          }`}
                        />
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-snug line-clamp-2">
                        {entity.name}
                      </h3>
                      <p
                        className={`text-xs mt-1.5 line-clamp-1 ${
                          isSelected ? 'text-[#EFEBE0]/70' : 'text-[#2B2B2B]/70'
                        }`}
                      >
                        {entity.category}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between">
                      <span className="text-[10px] tracking-wider uppercase font-semibold">
                        {isSelected ? 'Active Profile' : 'Inspect'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Entity Detailed Dossier */}
            <div
              className={`border p-8 sm:p-12 relative overflow-hidden transition-all ${
                currentBusiness.bgDark
                  ? 'bg-[#2D3A1E] text-[#F4F1EA] border-[#3D4A26]'
                  : 'bg-[#F4F1EA] text-[#1A1A1A] border-[#3D4A26]/20'
              }`}
            >
              {/* Classical hairline border frame */}
              <div
                className={`absolute inset-2 border pointer-events-none ${
                  currentBusiness.bgDark ? 'border-[#8C9E5E]/20' : 'border-[#3D4A26]/10'
                }`}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Entity Header */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-2xl font-bold px-3 py-1 border ${
                        currentBusiness.bgDark
                          ? 'border-[#8C9E5E]/40 text-[#8C9E5E] bg-[#3D4A26]/60'
                          : 'border-[#3D4A26]/30 text-[#3D4A26] bg-[#EFEBE0]'
                      }`}
                    >
                      {currentBusiness.number}
                    </span>
                    <span
                      className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                        currentBusiness.bgDark ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                      }`}
                    >
                      {currentBusiness.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl font-normal leading-tight">
                      {currentBusiness.name}
                    </h3>
                    {currentBusiness.motto && (
                      <p className="text-xs font-mono tracking-widest uppercase mt-2 text-[#8C9E5E]">
                        {currentBusiness.motto}
                      </p>
                    )}
                  </div>

                  <blockquote
                    className={`font-display text-xl sm:text-2xl italic leading-relaxed pl-4 border-l-2 ${
                      currentBusiness.bgDark
                        ? 'border-[#8C9E5E] text-[#F4F1EA]/95'
                        : 'border-[#3D4A26] text-[#2D3A1E]'
                    }`}
                  >
                    “{currentBusiness.tagline}”
                  </blockquote>

                  <div className="pt-2">
                    <span
                      className={`text-[11px] font-semibold tracking-wider uppercase block ${
                        currentBusiness.bgDark ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                      }`}
                    >
                      Primary Audience
                    </span>
                    <p
                      className={`text-sm mt-1 ${
                        currentBusiness.bgDark ? 'text-[#EFEBE0]/80' : 'text-[#2B2B2B]/80'
                      }`}
                    >
                      {currentBusiness.audience}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => onSelectBusinessInquiry(currentBusiness.id)}
                      className={`inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                        currentBusiness.bgDark
                          ? 'bg-[#8C9E5E] text-[#1A1A1A] hover:bg-[#A3B86C]'
                          : 'bg-[#3D4A26] text-white hover:bg-[#2D3A1E]'
                      }`}
                    >
                      <span>Inquire With {currentBusiness.name}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Offerings & Core Mandate */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span
                      className={`text-xs font-semibold tracking-[0.2em] uppercase block mb-4 ${
                        currentBusiness.bgDark ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                      }`}
                    >
                      Core Focus Areas & Programmes
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentBusiness.focusAreas.map((area, idx) => (
                        <div
                          key={idx}
                          className={`p-5 border flex items-start gap-3.5 ${
                            currentBusiness.bgDark
                              ? 'bg-[#3D4A26]/50 border-[#8C9E5E]/20 text-[#F4F1EA]'
                              : 'bg-white border-[#3D4A26]/15 text-[#1A1A1A]'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-5 h-5 shrink-0 mt-0.5 ${
                              currentBusiness.bgDark ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                            }`}
                          />
                          <span className="text-sm font-medium leading-snug">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Banner Callout as in the PDF */}
                  <div
                    className={`p-6 border text-center ${
                      currentBusiness.bgDark
                        ? 'bg-[#1A2210] border-[#8C9E5E]/40 text-[#A3B86C]'
                        : 'bg-[#3D4A26] border-[#2D3A1E] text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase font-mono block">
                      Core Ecosystem Mandate
                    </span>
                    <p className="font-display text-xl sm:text-2xl tracking-wide font-normal mt-1.5">
                      {currentBusiness.coreMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: How The Ecosystem Works Matrix (Page 15) */}
        {activeSubTab === 'matrix' && (
          <div className="mt-12 bg-[#2D3A1E] text-[#F4F1EA] p-8 sm:p-12 border border-[#3D4A26] relative">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#8C9E5E] uppercase block mb-2">
                How The Ecosystem Works
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA] font-normal">
                Each business strengthens a different part of the whole
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#8C9E5E]/30 text-xs tracking-wider uppercase text-[#8C9E5E]">
                    <th className="py-4 pr-6 font-semibold">Entity</th>
                    <th className="py-4 px-6 font-semibold">Focus Domain</th>
                    <th className="py-4 pl-6 font-semibold">Outcome & Transformation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8C9E5E]/15 text-sm">
                  {ECOSYSTEM_MATRIX.map((row) => (
                    <tr
                      key={row.business}
                      className="hover:bg-[#3D4A26]/40 transition-colors"
                    >
                      <td className="py-4 pr-6 font-display text-base text-[#F4F1EA] font-semibold whitespace-nowrap">
                        {row.business}
                      </td>
                      <td className="py-4 px-6 text-[#8C9E5E] font-medium tracking-wide uppercase text-xs whitespace-nowrap">
                        {row.focusDomain}
                      </td>
                      <td className="py-4 pl-6 text-[#EFEBE0]/90 font-light">
                        {row.outcome}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-[#8C9E5E]/20 flex items-center justify-between text-xs text-[#8C9E5E]">
              <span>Mutual reinforcement: Young minds to enduring institutions</span>
              <span className="font-mono">BEZALEL INC / 15</span>
            </div>
          </div>
        )}

        {/* View 3: What Makes Bezalel Different (Page 16) */}
        {activeSubTab === 'differentiators' && (
          <div className="mt-12 bg-[#F4F1EA] p-8 sm:p-12 border border-[#3D4A26]/15">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#3D4A26] uppercase block mb-2">
                What Makes Bezalel Different
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#2D3A1E] font-normal leading-tight">
                Commercially grounded. Human at the core.
              </h3>
              <p className="text-sm text-[#2B2B2B]/80 mt-3 font-normal leading-relaxed">
                Six governing design choices that distinguish the Bezalel Group from conventional
                holding companies and charity bodies alike.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DIFFERENTIATORS.map((diff) => (
                <div
                  key={diff.number}
                  className="p-6 bg-[#EFEBE0] border border-[#3D4A26]/15 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-[#8C9E5E] block mb-2">
                      {diff.number}
                    </span>
                    <h4 className="font-display text-xl font-semibold text-[#2D3A1E] mb-2 tracking-wide">
                      {diff.title}
                    </h4>
                    <p className="text-sm text-[#2B2B2B]/85 font-normal leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#3D4A26]/15 flex items-center justify-between text-xs text-[#3D4A26]">
              <span className="font-medium">
                Enduring multiplication: Success continues through what others go on to build.
              </span>
              <span className="font-mono">BEZALEL INC / 16</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
