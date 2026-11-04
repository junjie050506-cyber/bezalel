import React, { useState } from 'react';
import { CLIENT_PARTNERS } from '../data/ecosystemData';
import { PARTNER_PHOTO_MAP } from '../pages/ClientsPage';
import { GraduationCap, Building2, Search } from 'lucide-react';

export const ClientsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'school' | 'corporate'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = CLIENT_PARTNERS.filter((partner) => {
    const matchesFilter = filter === 'all' || partner.type === filter;
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const schoolCount = CLIENT_PARTNERS.filter((p) => p.type === 'school').length;
  const corporateCount = CLIENT_PARTNERS.filter((p) => p.type === 'corporate').length;

  return (
    <section id="clients" className="py-20 lg:py-28 bg-[#F4F1EA] border-b border-[#3D4A26]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#3D4A26]/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-[#3D4A26] mb-3">
              <span>Section 11</span>
              <span aria-hidden="true">·</span>
              <span>Selected Experience</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2D3A1E] font-normal leading-tight">
              Organisations we have worked with
            </h2>
            <p className="text-base sm:text-lg text-[#2B2B2B]/85 mt-3 font-normal">
              Selected experience across education, international schools, multinational brands, and
              consumer sectors.
            </p>
          </div>

          {/* Interactive Filter Tabs conforming to design guidelines (functional buttons with click handlers) */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <div className="flex items-center gap-1 p-1 bg-[#EFEBE0] border border-[#3D4A26]/15">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#3D4A26] text-white shadow-xs'
                    : 'text-[#2B2B2B] hover:text-[#3D4A26]'
                }`}
              >
                All ({CLIENT_PARTNERS.length})
              </button>
              <button
                onClick={() => setFilter('school')}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                  filter === 'school'
                    ? 'bg-[#3D4A26] text-white shadow-xs'
                    : 'text-[#2B2B2B] hover:text-[#3D4A26]'
                }`}
              >
                Schools ({schoolCount})
              </button>
              <button
                onClick={() => setFilter('corporate')}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                  filter === 'corporate'
                    ? 'bg-[#3D4A26] text-white shadow-xs'
                    : 'text-[#2B2B2B] hover:text-[#3D4A26]'
                }`}
              >
                Corporate ({corporateCount})
              </button>
            </div>
          </div>
        </div>

        {/* Search bar & count summary */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#3D4A26]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by name or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#EFEBE0] border border-[#3D4A26]/20 placeholder-[#2B2B2B]/50 text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26]"
            />
          </div>

          <div className="text-xs text-[#3D4A26] font-medium self-start sm:self-auto">
            Showing {filteredPartners.length} vetted client engagements
          </div>
        </div>

        {/* Partner Logos / Institutional Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredPartners.map((partner) => {
            const logoSrc = PARTNER_PHOTO_MAP[partner.name] || '/assets/logos/sunway.png';
            return (
              <div
                key={partner.name}
                className="p-4 bg-white border border-[#3D4A26]/15 hover:border-[#3D4A26]/40 transition-all flex flex-col justify-between min-h-[150px]"
              >
                <div className="h-20 w-full flex items-center justify-center mb-3 p-1 bg-white">
                  <img
                    src={logoSrc}
                    alt={partner.name}
                    className="max-h-16 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="border-t border-[#3D4A26]/10 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    {partner.type === 'school' ? (
                      <GraduationCap className="w-3.5 h-3.5 text-[#8C9E5E]" />
                    ) : (
                      <Building2 className="w-3.5 h-3.5 text-[#3D4A26]" />
                    )}
                    <span className="text-[10px] font-mono tracking-wider text-[#8C9E5E] uppercase">
                      {partner.type === 'school' ? 'Edu' : 'Corp'}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-1">
                    {partner.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPartners.length === 0 && (
          <div className="p-12 text-center bg-[#EFEBE0] border border-[#3D4A26]/15 text-sm text-[#2B2B2B]">
            No organisations matching &ldquo;{searchQuery}&rdquo;. Try another term.
          </div>
        )}

        {/* Selected Experience Footnote from PDF */}
        <div className="mt-10 p-4 bg-[#EFEBE0] border border-[#3D4A26]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#3D4A26] gap-2">
          <span>
            Client and organisation logos are shown as selected experience across the Bezalel ecosystem.
          </span>
          <span className="font-mono text-[11px] text-[#2B2B2B]/70">BEZALEL INC / 23</span>
        </div>
      </div>
    </section>
  );
};
