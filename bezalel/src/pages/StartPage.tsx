import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
} from 'lucide-react';
import { AUDIENCE_GROUPS, BUSINESS_ENTITIES } from '../data/ecosystemData';
import {
  BusinessGraphicArt,
  StartHeroTrilogyBanner,
} from '../components/EcosystemGraphics';

export interface StartPageProps {
  onOpenInquiry: (bId?: string, role?: string) => void;
}

export const StartPage: React.FC<StartPageProps> = ({
  onOpenInquiry,
}) => {
  const [selectedGroupNum, setSelectedGroupNum] = useState<string>(
    AUDIENCE_GROUPS[0].number
  );

  const activeGroup =
    AUDIENCE_GROUPS.find((g) => g.number === selectedGroupNum) ||
    AUDIENCE_GROUPS[0];

  const matchedBusinesses = BUSINESS_ENTITIES.filter((b) =>
    activeGroup.recommendedEntities.some((rec) =>
      b.name.toUpperCase().includes(rec.split(' ')[0].toUpperCase())
    )
  );

  const displayBusinesses =
    matchedBusinesses.length > 0 ? matchedBusinesses : BUSINESS_ENTITIES.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A1A1A]">
      {/* =====================================================================
          SECTION 1: VISUAL TRILOGY & STAKEHOLDER PATHWAY LAUNCHER
      ====================================================================== */}
      <section className="relative section-rhythm border-b border-[#2D3A1E]/10 overflow-hidden">
        {/* Embossed Z Monogram Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `url('/assets/bezalel-monogram-pattern.jpg')`,
            backgroundSize: '560px auto',
            backgroundRepeat: 'repeat',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 backdrop-blur-[1.5px] bg-[#F4F1EA]/30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <StartHeroTrilogyBanner />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between section-header-rhythm border-b border-[#2D3A1E]/12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#5A6B38] block mb-1">
                08 Stakeholder Tracks
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#1A1A1A] tracking-tight">
                Choose Your Pathway
              </h1>
            </div>
          </div>

          {/* 8 Photographic Stakeholder Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {AUDIENCE_GROUPS.map((group, idx) => {
              const isSelected = group.number === selectedGroupNum;
              return (
                <button
                  key={group.number}
                  onClick={() => setSelectedGroupNum(group.number)}
                  className={`group rounded-2xl text-left border overflow-hidden transition-all cursor-pointer flex flex-col ${
                    isSelected
                      ? 'bg-[#2D3A1E] text-[#F4F1EA] border-[#2D3A1E] ring-2 ring-[#8C9E5E] shadow-lg'
                      : 'bg-white text-[#1A1A1A] border-[#2D3A1E]/12 hover:border-[#2D3A1E]/40'
                  }`}
                >
                  <div className="h-28 w-full relative overflow-hidden">
                    <BusinessGraphicArt businessId={`audience-0${idx + 1}`} />
                    <span
                      className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full font-mono text-[10px] backdrop-blur-md ${
                        isSelected
                          ? 'bg-[#F5B841] text-[#1A1A1A] font-bold'
                          : 'bg-black/55 text-white'
                      }`}
                    >
                      {group.number}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <div className="font-display text-sm sm:text-base font-semibold leading-snug">
                      {group.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recommended Visual Venture Cards for Selected Role */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.number}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {displayBusinesses.map((biz) => (
                <div
                  key={biz.id}
                  onClick={() => onOpenInquiry(biz.id, activeGroup.name)}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#2D3A1E]/15 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                >
                  <div className="h-56 w-full relative">
                    <BusinessGraphicArt businessId={biz.id} />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white">
                      {biz.number} · {biz.category}
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#2D3A1E]">
                        {biz.name}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#5A6B38] mt-0.5">
                        {biz.tagline}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#2D3A1E] text-white flex items-center justify-center shrink-0 group-hover:bg-[#8C9E5E] group-hover:text-[#1A1A1A] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
