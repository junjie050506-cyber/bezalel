import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ScrollReveal } from './MotionContainer';
import { RadialBrandArchitecture } from './RadialBrandArchitecture';
import { SeamlessVideoBackground } from './SeamlessVideoBackground';

export interface CircularEcosystemDiagramProps {
  onOpenInquiry?: (businessId?: string) => void;
  onSelectVentureBelow?: (companyId: string) => void;
  externalSelectedVenture?: { id: string; timestamp: number } | null;
  className?: string;
}

export const CircularEcosystemDiagram: React.FC<CircularEcosystemDiagramProps> = ({
  onOpenInquiry,
  onSelectVentureBelow,
  externalSelectedVenture,
  className = '',
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.07]);
  const copyY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -32]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <div className={`relative bg-[#FAF9F6] ${className}`}>
      
      {/* =====================================================================
          GE AEROSPACE STYLE ARCHIVAL HERO BANNER (WITH MULTI-PLANE PARALLAX)
      ====================================================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[100dvh] -mt-16 sm:-mt-20 pt-16 sm:pt-20 overflow-hidden flex flex-col justify-end bg-[#141812] border-b border-[#2D3A1E]/20"
      >
        {/* Full-Bleed Video Layer with Parallax & Static Fallback Poster */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-transform z-0"
        >
          <img
            src="/assets/bezalel-geometric-bg.jpg"
            alt="Bezalel Ecosystem Architectural Artwork"
            className={`absolute inset-0 w-full h-full object-cover object-center brightness-100 contrast-105 select-none transition-opacity duration-700 ${
              videoReady ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <SeamlessVideoBackground
            src="/assets/videos/ecosystem-glass-architecture.mp4"
            crossfadeDuration={1.4}
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
            className={`z-[1] transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            videoClassName="object-center brightness-100 contrast-105"
          />
        </motion.div>

        {/* Balanced Architectural Vignette & Bottom/Top Gradient Overlays */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#141812]/85 via-[#141812]/15 to-[#141812]/25 pointer-events-none" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[#141812]/65 via-[#141812]/15 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 z-[3] h-24 bg-gradient-to-b from-[#141812]/50 to-transparent pointer-events-none" />

        {/* Content Container (Positioned in Lower-Left with 8pt Rhythm & Counter-Parallax) */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full"
        >
          <ScrollReveal direction="up">
            <div className="text-caption font-mono uppercase tracking-[0.2em] text-[#E4E9DC] mb-2">
              BEZALEL INC · GROUP HOLDING ARCHITECTURE
            </div>
            <h1 className="text-display font-bold text-[#FAF9F6] drop-shadow-xl">
              <span className="block">One holding parent.</span>
              <span className="block italic font-semibold text-[#405329] mt-2">
                An integrated portfolio.
              </span>
            </h1>

            <p className="text-body text-[#FAF9F6]/90 max-w-xl mt-2 drop-shadow">
              A multi-tiered brand architecture uniting group stewardship and four specialized operating ventures under one classical sanctuary.
            </p>
          </ScrollReveal>
        </motion.div>
      </section>

      {/* =====================================================================
          HYBRID BRAND ARCHITECTURE (SCROLL-AND-REVEAL RADIAL SYSTEM)
          Central Bezalel Inc hub with 4 satellite ventures revealed on scroll
      ====================================================================== */}
      <section id="brand-architecture" className="relative border-b border-[#2D3A1E]/10">
        <RadialBrandArchitecture
          onOpenInquiry={onOpenInquiry}
        />
      </section>

    </div>
  );
};

export default CircularEcosystemDiagram;

