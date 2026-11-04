import React, { useState } from 'react';
import { CORE_VALUES, AUDIENCE_GROUPS } from '../data/ecosystemData';
import { ZInsignia } from './ZInsignia';
import { ShieldCheck, Users, ArrowUpRight, Check } from 'lucide-react';

interface ValuesAndAudiencesProps {
  onSelectAudienceInquiry: (groupName: string) => void;
}

export const ValuesAndAudiences: React.FC<ValuesAndAudiencesProps> = ({
  onSelectAudienceInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'audiences' | 'values'>('audiences');
  const [selectedAudience, setSelectedAudience] = useState<string>(
    AUDIENCE_GROUPS[0].number
  );

  const activeAudienceData =
    AUDIENCE_GROUPS.find((g) => g.number === selectedAudience) || AUDIENCE_GROUPS[0];

  return (
    <section id="values-audiences" className="py-20 lg:py-28 bg-[#F4F1EA] border-b border-[#3D4A26]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#3D4A26]/15">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#3D4A26] mb-3">
              <span>Section 09</span>
              <span aria-hidden="true">·</span>
              <span>Values & Target Beneficiaries</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2D3A1E] font-normal leading-tight">
              Development and growth across every life stage
            </h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFEBE0] border border-[#3D4A26]/15 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('audiences')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'audiences'
                  ? 'bg-[#3D4A26] text-white'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              Who We Serve (8 Groups)
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'values'
                  ? 'bg-[#3D4A26] text-white'
                  : 'text-[#2B2B2B] hover:text-[#3D4A26]'
              }`}
            >
              The 7 Core Values
            </button>
          </div>
        </div>

        {/* Tab 1: Who We Serve */}
        {activeTab === 'audiences' && (
          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AUDIENCE_GROUPS.map((grp) => {
                const isSelected = grp.number === selectedAudience;
                return (
                  <button
                    key={grp.number}
                    onClick={() => setSelectedAudience(grp.number)}
                    className={`p-6 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#3D4A26] text-white border-[#2D3A1E] shadow-md translate-y-[-2px]'
                        : 'bg-[#EFEBE0] text-[#1A1A1A] border-[#3D4A26]/15 hover:border-[#3D4A26]/30 hover:bg-white'
                    }`}
                  >
                    <div>
                      <span
                        className={`font-mono text-xs font-bold block mb-3 ${
                          isSelected ? 'text-[#8C9E5E]' : 'text-[#3D4A26]'
                        }`}
                      >
                        {grp.number}
                      </span>
                      <h3 className="font-display text-xl font-semibold leading-snug">
                        {grp.name}
                      </h3>
                      <p
                        className={`text-xs mt-2 leading-relaxed line-clamp-2 ${
                          isSelected ? 'text-[#EFEBE0]/80' : 'text-[#2B2B2B]/75'
                        }`}
                      >
                        {grp.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-current/15 text-[10px] uppercase font-semibold tracking-wider">
                      {isSelected ? 'Selected Group' : 'View Group'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Audience Focus Dossier */}
            <div className="bg-[#2D3A1E] text-[#F4F1EA] p-8 sm:p-10 border border-[#3D4A26] relative">
              <div className="absolute inset-2 border border-[#8C9E5E]/20 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-xs font-mono font-bold text-[#8C9E5E] tracking-widest uppercase">
                    Group {activeAudienceData.number} · Tailored Capability Path
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#F4F1EA]">
                    {activeAudienceData.name}
                  </h3>
                  <p className="text-base text-[#EFEBE0]/90 font-light leading-relaxed">
                    {activeAudienceData.description}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[#8C9E5E] font-medium">Recommended entities:</span>
                    {activeAudienceData.recommendedEntities.map((ent, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#3D4A26] border border-[#8C9E5E]/30 text-[#EFEBE0] font-mono text-[11px]"
                      >
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectAudienceInquiry(activeAudienceData.name)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#1A1A1A] bg-[#8C9E5E] hover:bg-[#A3B86C] transition-colors cursor-pointer shrink-0"
                >
                  <span>Connect With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audience Footer Statement */}
            <div className="p-4 bg-[#EFEBE0] border border-[#3D4A26]/15 flex items-center justify-between text-xs text-[#3D4A26]">
              <span className="font-medium">
                One ecosystem, serving people and enterprises wherever capability and opportunity need to grow.
              </span>
              <span className="font-mono text-[11px] text-[#2B2B2B]/70">BEZALEL INC / 21</span>
            </div>
          </div>
        )}

        {/* Tab 2: The 7 Core Values */}
        {activeTab === 'values' && (
          <div className="mt-12 space-y-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#3D4A26] uppercase block mb-2">
                The Standards Behind How We Build
              </span>
              <p className="text-sm text-[#2B2B2B]/85 leading-relaxed">
                Seven foundational convictions that dictate our relational ethic, commercial stewardship, and operational discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CORE_VALUES.map((val, idx) => (
                <div
                  key={val.name}
                  className="p-6 bg-[#EFEBE0] border border-[#3D4A26]/15 hover:border-[#3D4A26]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#8C9E5E]">
                        0{idx + 1}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#3D4A26]/60" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#2D3A1E] tracking-wide mb-2">
                      {val.name}
                    </h3>
                    <p className="text-sm text-[#1A1A1A]/90 font-normal leading-relaxed">
                      {val.definition}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#EFEBE0] border border-[#3D4A26]/15 flex items-center justify-between text-xs text-[#3D4A26]">
              <span className="font-medium">
                Governing standards for our board, leadership, coaches, and staff.
              </span>
              <span className="font-mono text-[11px] text-[#2B2B2B]/70">BEZALEL INC / 20</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
