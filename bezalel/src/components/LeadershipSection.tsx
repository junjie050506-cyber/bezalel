import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/ecosystemData';
import { TeamMember } from '../types';
import { ZInsignia } from './ZInsignia';
import { Users, Mail, ArrowUpRight, X, Sparkles, Award } from 'lucide-react';

interface LeadershipSectionProps {
  onOpenInquiry: (role?: string) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onOpenInquiry }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const cso = TEAM_MEMBERS[0]; // Lalitha Manoharan
  const leadershipTeam = TEAM_MEMBERS.slice(1);

  return (
    <section id="leadership" className="py-20 lg:py-28 bg-[#EFEBE0]/60 border-b border-[#3D4A26]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#3D4A26] mb-3">
            <span>Section 10</span>
            <span aria-hidden="true">·</span>
            <span>Governance & Stewardship</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2D3A1E] font-normal leading-tight">
            Purpose becomes real through people.
          </h2>
          <p className="text-base sm:text-lg text-[#2B2B2B]/85 mt-4 leading-relaxed font-normal">
            A multidisciplinary leadership team grounded in servant leadership, clinical depth,
            commercial strategy, and operational excellence.
          </p>
        </div>

        {/* CSO Marquee Spotlight Card */}
        <div className="mb-14 bg-[#2D3A1E] text-[#F4F1EA] p-8 sm:p-12 lg:p-14 border border-[#3D4A26] relative overflow-hidden">
          <div className="absolute inset-2 border border-[#8C9E5E]/20 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* CSO Avatar & Portrait Badge */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative mb-6">
                <div className="w-36 h-36 sm:w-44 sm:h-44 bg-[#3D4A26] border-2 border-[#8C9E5E]/40 flex items-center justify-center text-center font-display text-5xl font-bold text-[#8C9E5E] shadow-xl">
                  LM
                </div>
                <div className="absolute -bottom-2 -right-2 p-1.5 bg-[#8C9E5E] text-[#1A1A1A]">
                  <ZInsignia size={18} variant="olive" />
                </div>
              </div>

              <span className="text-xs font-semibold tracking-[0.25em] text-[#8C9E5E] uppercase block">
                Executive Leadership
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F1EA] mt-1">
                {cso.name}
              </h3>
              <p className="text-xs font-mono tracking-wider text-[#A3B86C] uppercase mt-1">
                {cso.role}
              </p>
            </div>

            {/* CSO Philosophy & Credentials */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-5 bg-[#3D4A26]/50 border border-[#8C9E5E]/25 text-[#F4F1EA]">
                <blockquote className="font-display text-xl sm:text-2xl italic leading-relaxed text-[#F4F1EA]/95">
                  “Entrepreneurship is how I think. People are at the heart of what I build.
                  Purpose is why I build it.”
                </blockquote>
              </div>

              <p className="text-base sm:text-lg text-[#EFEBE0]/90 font-light leading-relaxed">
                Her work connects entrepreneurship, people development, education, advertising,
                psychology, business development, and social impact. Raised in a family where success
                and service went hand in hand, Lalitha developed a lifelong belief that enterprise,
                knowledge, and influence should create value far beyond oneself.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                {[
                  'Entrepreneur',
                  'Psychotherapist',
                  'Trainer',
                  'Coach',
                  'Facilitator',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#1F2714] border border-[#8C9E5E]/30 text-[#EFEBE0] font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[#8C9E5E]/20 flex items-center justify-between">
                <button
                  onClick={() => setSelectedMember(cso)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#8C9E5E] hover:text-[#A3B86C] transition-colors cursor-pointer"
                >
                  <span>Read Full Executive Dossier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#EFEBE0]/60">BEZALEL INC / 03 & 22</span>
              </div>
            </div>
          </div>
        </div>

        {/* Group & Business Leadership Grid */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3D4A26]/15">
            <h3 className="font-display text-2xl text-[#2D3A1E] font-medium">
              Group & Business Leadership
            </h3>
            <span className="text-xs font-mono text-[#3D4A26] uppercase">
              10 Operating Executives & Specialists
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leadershipTeam.map((member) => (
              <div
                key={member.name}
                onClick={() => setSelectedMember(member)}
                className="p-6 bg-[#F4F1EA] border border-[#3D4A26]/15 hover:border-[#3D4A26]/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-[#EFEBE0] border border-[#3D4A26]/20 flex items-center justify-center font-display text-lg font-bold text-[#3D4A26] group-hover:bg-[#3D4A26] group-hover:text-white transition-colors">
                      {member.initials}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#8C9E5E] uppercase bg-[#3D4A26]/5 px-2 py-0.5 border border-[#3D4A26]/10">
                      {member.department}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-semibold text-[#1A1A1A] group-hover:text-[#3D4A26] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-medium text-[#3D4A26] tracking-wide mt-1">
                    {member.role}
                  </p>

                  <p className="text-xs text-[#2B2B2B]/75 mt-3 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#3D4A26]/10 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-[#3D4A26]">
                  <span>View Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer team recognition from PDF */}
          <div className="mt-8 p-4 bg-[#EFEBE0] border border-[#3D4A26]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#3D4A26] gap-2">
            <span>
              Extended Operational & Programme Specialists: Sylvia, Alina, Jas, Cheng.
            </span>
            <span className="font-mono text-[11px] text-[#2B2B2B]/70">BEZALEL INC / 22</span>
          </div>
        </div>

        {/* Member Profile Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#F4F1EA] border border-[#3D4A26]/20 max-w-lg w-full p-8 shadow-2xl relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 text-[#2D3A1E] hover:bg-[#EFEBE0] transition-colors cursor-pointer"
                aria-label="Close profile modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#3D4A26] text-white flex items-center justify-center font-display text-2xl font-bold">
                  {selectedMember.initials}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C9E5E] block">
                    {selectedMember.department}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#2D3A1E]">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-[#3D4A26] font-medium mt-0.5">
                    {selectedMember.role}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#EFEBE0] border border-[#3D4A26]/15 text-sm text-[#1A1A1A] leading-relaxed mb-6">
                {selectedMember.bio}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#3D4A26]/15">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#2D3A1E] border border-[#3D4A26]/20 hover:bg-[#EFEBE0] cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const memberName = selectedMember.name;
                    setSelectedMember(null);
                    onOpenInquiry(`Inquiry for ${memberName}`);
                  }}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#3D4A26] hover:bg-[#2D3A1E] cursor-pointer"
                >
                  Contact Leadership
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
