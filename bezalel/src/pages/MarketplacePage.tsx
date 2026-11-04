import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  KINGDOM_MARKETPLACE_PILLARS,
  BUSINESS_ENTITIES,
} from '../data/ecosystemData';
import {
  BusinessGraphicArt,
  StartHeroTrilogyBanner,
} from '../components/EcosystemGraphics';
import { ScrollReveal } from '../components/MotionContainer';
import { VideoBackground } from '../components/VideoBackground';

export interface MarketplacePageProps {
  onOpenInquiry: (topic?: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onOpenInquiry,
}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<string>('all');

  const filteredVentures =
    selectedBusiness === 'all'
      ? BUSINESS_ENTITIES
      : BUSINESS_ENTITIES.filter((b) => b.id === selectedBusiness);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A1A1A]">
      {/* =====================================================================
          SECTION 1: THE NEXT CHAPTER — KINGDOM MARKETPLACE (PDF PAGE 19)
      ====================================================================== */}
      <section className="relative section-rhythm bg-[#141B0C] text-[#FAF8F4] border-b border-white/10 overflow-hidden">
        {/* Full-Bleed Ambient Cinema Video Layer */}
        <VideoBackground
          sources={[
            '/assets/videos/Background Video 2.mp4',
          ]}
          opacity="opacity-25"
          overlayGradient="bg-gradient-to-b from-[#141B0C] via-[#141B0C]/80 to-[#141B0C]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 section-header-rhythm border-b border-white/15">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-kicker text-[#A3B86C] mb-2 uppercase">
                  <span>THE NEXT CHAPTER</span>
                  <span aria-hidden="true">·</span>
                  <span>BEZALEL INC / 19</span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-medium text-[#FAF8F4] tracking-display uppercase">
                  KINGDOM MARKETPLACE
                </h1>
                <p className="font-display text-xl sm:text-2xl text-[#FAF8F4] font-normal mt-4 leading-snug">
                  A wider faith-driven ecosystem—not another internal operating company.
                </p>
                <p className="text-sm sm:text-base text-[#EAE4D7]/85 mt-3 leading-relaxed measure-prose">
                  A space where independent entrepreneurs, professionals, businesses and purpose-led organisations can connect, trade, collaborate, learn, find opportunity and multiply impact.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry('Kingdom Marketplace')}
                className="inline-flex items-center gap-2 bg-[#F5B841] text-[#141B0C] px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#FAF8F4] transition-all cursor-pointer self-start md:self-auto shrink-0 shadow-lg"
              >
                <span>Join the Network</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ScrollReveal>

          {/* 6 Visual Marketplace Pillar Cards with Verbatim Summaries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {KINGDOM_MARKETPLACE_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => onOpenInquiry(pillar.name)}
                className="group bg-[#1A2312]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#A3B86C]/40 transition-all cursor-pointer flex flex-col shadow-xl"
              >
                <div className="h-40 w-full relative overflow-hidden">
                  <BusinessGraphicArt businessId={pillar.name} />
                  <div className="absolute bottom-3 left-3 text-xs font-semibold text-white tabular-nums">
                    0{idx + 1}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-[#FAF8F4] group-hover:text-[#A3B86C] transition-colors uppercase">
                    {pillar.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EAE4D7]/80 mt-1.5 leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-white/15 text-center text-xs font-semibold tracking-[0.14em] uppercase text-[#A3B86C]">
            COMMERCE • SERVICES • EMPLOYMENT • PARTNERSHIPS • LEARNING • IMPACT
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: VISUAL VENTURE PROGRAMMES SHOWCASE
      ====================================================================== */}
      <section className="relative section-rhythm bg-[#EFEBE0] overflow-hidden">
        <div className="absolute inset-0 bg-mini-z-pattern pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[1.5px] bg-[#EFEBE0]/35 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-stack-rhythm">
          {/* Venture Filter Strip */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setSelectedBusiness('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBusiness === 'all'
                  ? 'bg-[#2D3A1E] text-[#F4F1EA]'
                  : 'bg-white/85 text-[#4A4A4A] border border-[#2D3A1E]/15'
              }`}
            >
              All 4 Ventures
            </button>
            {BUSINESS_ENTITIES.map((biz) => (
              <button
                key={biz.id}
                onClick={() => setSelectedBusiness(biz.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedBusiness === biz.id
                    ? 'bg-[#2D3A1E] text-[#F4F1EA]'
                    : 'bg-white/85 text-[#4A4A4A] border border-[#2D3A1E]/15'
                }`}
              >
                {biz.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Large Visual Venture Programme Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredVentures.map((biz) => (
              <motion.div
                key={biz.id}
                whileHover={{ y: -5 }}
                onClick={() => onOpenInquiry(biz.name)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#2D3A1E]/12 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
              >
                <div className="h-52 w-full relative overflow-hidden">
                  <BusinessGraphicArt businessId={biz.id} />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white">
                    {biz.number} · {biz.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="font-display text-xl font-semibold text-[#1A1A1A] group-hover:text-[#2D3A1E]">
                      {biz.name}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-[#F4F1EA] group-hover:bg-[#2D3A1E] text-[#2D3A1E] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {biz.focusAreas.map((area, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#F4F1EA] text-[#2D3A1E] px-2.5 py-1 rounded-full font-medium border border-[#2D3A1E]/10"
                      >
                        {area.split(' ').slice(0, 3).join(' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <StartHeroTrilogyBanner />
        </div>
      </section>
    </div>
  );
};
