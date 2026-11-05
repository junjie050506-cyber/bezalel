import React, { useState } from 'react';
import { CLIENT_PARTNERS } from '../data/ecosystemData';
import { GraduationCap, Building2, Search, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { StaggerContainer, StaggerItem } from '../components/MotionContainer';

export const PARTNER_PHOTO_MAP: Record<string, string> = {
  'Sunway International Schools': '/assets/logos/sunway.png?v=6',
  'Tenby Schools': '/assets/logos/tenby.png?v=5',
  'Nexus International School Malaysia': '/assets/logos/nexus.png?v=4',
  'Garden International School': '/assets/logos/garden.png?v=6',
  'The International School of Kuala Lumpur (ISKL)': '/assets/logos/iskl.png?v=5',
  'Taylor’s International School': '/assets/logos/taylors.png?v=6',
  'Nobel International School': '/assets/logos/nobel.png?v=3',
  'Tanarata International Schools': '/assets/logos/tanarata.png?v=4',
  'Melaka International School': '/assets/logos/melaka.png?v=7',
  'LFKL (Lycée Français de Kuala Lumpur)': '/assets/logos/lfkl.png?v=5',
  'HEVEA': '/assets/logos/hevea.png?v=3',
  'RGS': '/assets/logos/rgs.png?v=5',
  'LSL': '/assets/logos/lsl.png?v=5',
  'DSKL (Deutsche Schule Kuala Lumpur)': '/assets/logos/dokl.png?v=4',
  'DOKL': '/assets/logos/dokl.png?v=4',
  'Uniqlo': '/assets/logos/uniqlo.png',
  'Nando’s': '/assets/logos/nandos.png?v=3',
  'Johnson & Johnson': '/assets/logos/jnj.png?v=3',
  'Unilever': '/assets/logos/unilever.png?v=3',
  'UCSI University': '/assets/logos/ucsi.png?v=3',
  'REDtone': '/assets/logos/redtone.png?v=3',
  'Syngenta': '/assets/logos/syngenta.png?v=4',
  'Padini Holdings Bhd': '/assets/logos/padini.png?v=3',
  'DKSH': '/assets/logos/dksh.png?v=3',
  'Namaste India 1947': '/assets/logos/namaste.png?v=3',
};

export const renderPartnerLogo = (partnerOrName: string | { name: string }) => {
  const name =
    typeof partnerOrName === 'string' ? partnerOrName : partnerOrName.name;
  const src = PARTNER_PHOTO_MAP[name] || '/assets/logos/sunway.png';

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg bg-white flex items-center justify-center p-2 group">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 max-w-[88%]"
      />
    </div>
  );
};

export const ClientsPage: React.FC<{ onNavigate?: (page: any) => void }> = ({
  onNavigate,
}) => {
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
  const corporateCount = CLIENT_PARTNERS.filter(
    (p) => p.type === 'corporate'
  ).length;

  const filterTabs: { id: 'all' | 'school' | 'corporate'; label: string }[] = [
    { id: 'all', label: `All (${CLIENT_PARTNERS.length})` },
    { id: 'school', label: `Schools (${schoolCount})` },
    { id: 'corporate', label: `Corporate (${corporateCount})` },
  ];

  return (
    <StaggerContainer className="relative py-12 sm:py-16 select-none overflow-hidden min-h-screen text-[#141812] bg-[#FAF9F6]">
      {/* Full True-Color Ivory Cream Geometric Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/bezalel-cream-geometric-bg.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. COMPACT VISUAL HEADER + FILTER BAR */}
        <StaggerItem className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 sm:mb-12 border-b border-[#2D3A1E]/12">
          <div>
            <span className="type-kicker text-[#405329] block mb-2 font-mono">
              {CLIENT_PARTNERS.length} Institutional Deployments · Schools &amp; Enterprises
            </span>
            <h1 className="text-display font-bold text-[#141812]">
              Partners &amp; Clients
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md border border-[#2D3A1E]/15 rounded-lg shadow-low">
              {filterTabs.map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id)}
                    className={`relative px-4 py-2 text-caption font-medium transition-colors cursor-pointer rounded-lg whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-[#42493E] hover:text-[#141812]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="clientsFilterPill"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute inset-0 bg-[#405329] rounded-lg shadow-low"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-56">
              <Search className="w-4 h-4 text-[#405329] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search partner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 py-2 text-caption bg-white/90 backdrop-blur-md border border-[#2D3A1E]/20 placeholder-[#42493E]/60 text-[#141812] focus:outline-hidden focus:border-[#405329] rounded-lg transition-colors shadow-low"
              />
            </div>
          </div>
        </StaggerItem>

        {/* 2. AUTHENTIC BRAND LOGO GALLERY GRID */}
        {filteredPartners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center bg-white rounded-2xl border border-[#2D3A1E]/12 my-6 space-y-4 shadow-low"
          >
            <p className="text-h3 font-semibold text-[#2D3A1E]">
              No institutional partners match &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2D3A1E] text-white text-caption font-semibold hover:bg-[#405329] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Search &amp; Filters</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPartners.map((partner) => {
                const logoSrc =
                  PARTNER_PHOTO_MAP[partner.name] || '/assets/logos/sunway.png';
                return (
                  <motion.div
                    layout
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className="group bg-white border border-[#2D3A1E]/12 hover:border-[#405329]/45 shadow-low hover:shadow-mid transition-all flex flex-col justify-between rounded-xl overflow-hidden h-full"
                  >
                    <div className="h-36 w-full relative overflow-hidden bg-white p-6 flex items-center justify-center border-b border-[#2D3A1E]/10">
                      <img
                        src={logoSrc}
                        alt={partner.name}
                        className="max-h-24 w-auto max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-sm bg-[#F4F6F0] text-[#405329] flex items-center justify-center">
                        {partner.type === 'school' ? (
                          <GraduationCap className="w-3.5 h-3.5" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF9F6]">
                      <span className="text-caption font-mono uppercase tracking-wider text-[#405329] block mb-1">
                        {partner.categoryLabel}
                      </span>
                      <h3 className="text-h3 font-semibold text-[#141812] group-hover:text-[#2D3A1E] transition-colors line-clamp-1">
                        {partner.name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 3. COMPACT CTA BANNER */}
        <StaggerItem direction="up" delay={0.1} className="mt-12">
          <div className="relative overflow-hidden bg-[#141B0C] text-[#FAF9F6] p-6 sm:p-8 border border-[#2D3A1E] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-mid">
            <div>
              <span className="text-caption font-mono uppercase tracking-widest text-[#E4E9DC] block mb-1">
                Schools, Universities &amp; Enterprises
              </span>
              <h2 className="text-h2 font-semibold text-white">
                Partner With Bezalel
              </h2>
            </div>
            {onNavigate ? (
              <button
                onClick={() => onNavigate('start')}
                className="inline-flex items-center gap-2 px-6 py-3 text-caption font-semibold uppercase tracking-wider text-white bg-[#405329] hover:bg-[#2D3A1E] transition-colors rounded-lg cursor-pointer shrink-0 whitespace-nowrap shadow-low"
              >
                <span>Book a free consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-caption font-semibold uppercase tracking-wider text-white bg-[#405329] hover:bg-[#2D3A1E] transition-colors rounded-lg shrink-0 whitespace-nowrap shadow-low"
              >
                <span>Book a free consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
};
