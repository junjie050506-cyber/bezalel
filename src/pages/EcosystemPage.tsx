import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  DIFFERENTIATORS,
} from '../data/ecosystemData';
import { ScrollReveal } from '../components/MotionContainer';
import { CircularEcosystemDiagram } from '../components/CircularEcosystemDiagram';
import { InteractiveVenturesSection } from '../components/InteractiveVenturesSection';

export interface EcosystemPageProps {
  onOpenInquiry?: (bId?: string) => void;
}

export const EcosystemPage: React.FC<EcosystemPageProps> = ({
  onOpenInquiry,
}) => {
  const location = useLocation();
  const [selectedVentureFromHouse, setSelectedVentureFromHouse] = useState<{
    id: string;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ventureParam = params.get('venture');
    if (ventureParam) {
      setSelectedVentureFromHouse({ id: ventureParam, timestamp: Date.now() });
      const timer = setTimeout(() => {
        const navSection = document.getElementById('interactive-ventures');
        if (navSection) {
          navSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  const handleSelectVentureBelow = (companyId: string) => {
    setSelectedVentureFromHouse({ id: companyId, timestamp: Date.now() });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141812]">
      
      {/* =====================================================================
          SECTION 1: HYBRID BRAND ARCHITECTURE TREE (PDF PAGE 15)
      ====================================================================== */}
      <CircularEcosystemDiagram
        onOpenInquiry={onOpenInquiry}
        onSelectVentureBelow={handleSelectVentureBelow}
        externalSelectedVenture={selectedVentureFromHouse}
      />

      {/* =====================================================================
          OPERATING ECOSYSTEM & SERVICE NAVIGATOR (MOVED FROM HOME PAGE)
          [Design Option B: Interactive Capabilities & Dedicated Venture Stage]
      ====================================================================== */}
      <InteractiveVenturesSection
        onOpenInquiry={onOpenInquiry}
        externalSelectedVenture={selectedVentureFromHouse}
      />

      {/* =====================================================================
          SECTION 4: WHAT MAKES BEZALEL DIFFERENT (PDF PAGE 16)
      ====================================================================== */}
      <section className="relative py-16 sm:py-20 bg-[#1A2216] text-[#FAF9F6] border-b border-[#405329]/40 overflow-hidden">
        {/* Full True-Color Embossed Z Monogram Wallpaper Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-monogram-pattern.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: '560px auto',
            backgroundRepeat: 'repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <ScrollReveal direction="up">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 type-kicker text-[#E6B94D] mb-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#E6B94D]" />
                <span>WHAT MAKES BEZALEL DIFFERENT</span>
              </div>
              <h2 className="text-h1 font-bold text-[#FAF9F6] drop-shadow-sm">
                Commercially grounded.{' '}
                <span className="text-[#E6B94D]">Human at the core.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-white/15 border-t border-b border-white/15">
            {DIFFERENTIATORS.map((diff, idx) => (
              <motion.div
                key={diff.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline group hover:bg-white/5 px-4 rounded-xl transition-colors"
              >
                <div className="sm:col-span-1 text-caption font-mono font-bold text-[#E6B94D] tabular-nums">
                  {diff.number}
                </div>
                <div className="sm:col-span-4 text-h3 font-semibold text-white uppercase tracking-wide group-hover:text-[#E6B94D] transition-colors">
                  {diff.title}
                </div>
                <div className="sm:col-span-7 text-body text-[#FAF9F6]/85">
                  {diff.description}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


    </div>
  );
};

export default EcosystemPage;
