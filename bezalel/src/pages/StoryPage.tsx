import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/ecosystemData';
import { PhilosophyVisualWheel } from '../components/EcosystemGraphics';
import { StickyTimelineScrollytelling } from '../components/ScrollytellingSections';
import { ScrollReveal } from '../components/MotionContainer';
import { SeamlessVideoBackground } from '../components/SeamlessVideoBackground';

export interface StoryPageProps {
  onOpenInquiry?: (businessId?: string) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onOpenInquiry }) => {
  const founder = TEAM_MEMBERS.find((m) => m.name.includes('Lalitha')) || TEAM_MEMBERS[0];
  const prefersReducedMotion = useReducedMotion();
  const [specIndex, setSpecIndex] = useState<number>(0);
  const [heroVideoReady, setHeroVideoReady] = useState<boolean>(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const panoramaSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(
    heroScrollProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '16%']
  );
  const heroBgScale = useTransform(
    heroScrollProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.07]
  );

  const { scrollYProgress: panoramaScrollProgress } = useScroll({
    target: panoramaSectionRef,
    offset: ['start end', 'end start'],
  });
  const panoramaBgY = useTransform(
    panoramaScrollProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-8%', '8%']
  );

  const specCards = [
    {
      num: '01 · 04',
      title: 'Founder: Lalitha Manoharan',
      role: 'Chief Servant Officer',
      location: 'Kuala Lumpur · Malaysia',
      photo: '/assets/photos/spec-founder-desk.jpg',
    },
    {
      num: '02 · 04',
      title: 'Governance Bedrock',
      role: 'Statutory Secretarial Rigor',
      location: 'Companies Act 2016 Compliant',
      photo: '/assets/photos/spec-governance-bedrock.jpg',
    },
    {
      num: '03 · 04',
      title: 'Executive Formation',
      role: 'HRD Corp Accredited Labs',
      location: 'People & Organisational Development',
      photo: '/assets/photos/spec-executive-formation.jpg',
    },
    {
      num: '04 · 04',
      title: 'Enduring Stewardship',
      role: 'Cross-Generation Trust',
      location: 'Multiplied Ecosystem Impact',
      photo: '/assets/photos/spec-enduring-stewardship.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#141812] selection:bg-[#2D3A1E] selection:text-[#FAF9F6] relative">

      {/* =====================================================================
          CHAPTER 01: HERO — THE CORE PHILOSOPHICAL CONVICTION
      ====================================================================== */}
      <section
        ref={heroSectionRef}
        id="conviction"
        className="relative w-full h-screen min-h-[100dvh] -mt-16 sm:-mt-20 pt-16 sm:pt-20 overflow-hidden bg-[#141812] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          style={{ y: heroBgY, scale: heroBgScale }}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-transform z-0"
        >
          <img
            src="/assets/bezalel-geometric-bg.jpg"
            alt="Bezalel Inc Architectural Artwork · Built to Endure"
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.06] transition-opacity duration-700 ${
              heroVideoReady ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <SeamlessVideoBackground
            src="/assets/videos/story-glass-compass-wheel.mp4"
            crossfadeDuration={1.4}
            onLoadedData={() => setHeroVideoReady(true)}
            onError={() => setHeroVideoReady(false)}
            className={`z-[1] transition-opacity duration-700 ${
              heroVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
            videoClassName="object-center brightness-100 contrast-105"
          />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#141812]/80 via-[#141812]/20 to-[#141812]/35 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-display font-bold text-white drop-shadow-xl">
            Most enterprise initiatives scale fast and break quietly.{' '}
            <span className="italic font-semibold text-[#405329]">We build organizations to endure.</span>
          </h1>

          <p className="text-body text-white/85 mt-2 max-w-xl drop-shadow text-balance">
            An integrated studio uniting statutory governance, executive formation, and clinical human resilience. Built on stewardship since 2004.
          </p>
        </div>
      </section>

      {/* =====================================================================
          EDITORIAL SPREAD 1: ASYMMETRIC HERO ARCHIVE (PUMA PICTURE 1 - TOP SPREAD)
          Features: Bold Display Title + Curved Arch Text + Founder Portrait + Inset Spec Card
      ====================================================================== */}
      <section id="heritage" className="relative py-12 sm:py-16 overflow-hidden border-b border-[#2D3A1E]/12 bg-[#F4F1EA]">
        {/* Full True-Color Ivory Cream Geometric Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-cream-geometric-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Subtle Architectural Blueprint Dotted Guidelines */}
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-dashed border-[#2D3A1E]/[0.07] h-full" />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (7 cols): Display Headline, Creed, Inset Photo & Spec Box */}
            <ScrollReveal direction="up" className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-display font-bold uppercase tracking-tight text-[#2D3A1E]">
                  PURPOSE<br />FOR ALL TIME
                </h2>
                
                <p className="text-body text-[#42493E] max-w-xl mt-2">
                  Rooted in the Exodus 31:1–6 calling of purposeful craftsmanship. Lalitha Manoharan conceived the integration of human care and enterprise capability. Turning needs into ideas, ideas into capability, and capability into sustainable opportunity. Decade after decade, our covenant remains unchanged.
                </p>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.()}
                    className="inline-block border border-[#2D3A1E] text-[#2D3A1E] hover:bg-[#2D3A1E] hover:text-white px-6 py-3 rounded-lg text-caption font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-low"
                  >
                    DISCOVER OUR CREED
                  </button>
                </div>
              </div>

              {/* Lower Asymmetric Row: Inset Photo + Minimalist Spec Card with Stepper */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-6 pt-4">
                {/* Inset Photo with Smooth Rounded Corners & Crossfade */}
                <div className="w-full sm:w-48 h-48 overflow-hidden rounded-xl bg-black/10 border border-[#2D3A1E]/15 shadow-mid shrink-0 relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={specCards[specIndex].photo}
                      src={specCards[specIndex].photo}
                      alt={specCards[specIndex].title}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover rounded-xl filter brightness-[0.96] contrast-[1.05]"
                    />
                  </AnimatePresence>
                </div>

                {/* Minimalist Beige Spec Box with Smooth Rounded Corners & Stepper */}
                <div className="flex-1 bg-[#FAF9F6] p-6 border border-[#2D3A1E]/12 rounded-xl flex flex-col justify-between shadow-low relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={specCards[specIndex].num}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="font-mono text-caption font-semibold text-[#405329] uppercase tracking-wider mb-1">
                        {specCards[specIndex].num}
                      </div>
                      <div className="text-h3 font-semibold text-[#141812] uppercase tracking-tight">
                        {specCards[specIndex].title}
                      </div>
                      <p className="text-caption text-[#42493E] mt-2">
                        {specCards[specIndex].role} · {specCards[specIndex].location}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Stepper Controls with 8px Interactive Buttons */}
                  <div className="flex items-center gap-2 pt-4 self-end">
                    <button
                      type="button"
                      onClick={() => setSpecIndex((prev) => (prev > 0 ? prev - 1 : specCards.length - 1))}
                      aria-label="Previous specification"
                      className="w-8 h-8 rounded-lg bg-[#2D3A1E] hover:bg-[#405329] text-white flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpecIndex((prev) => (prev < specCards.length - 1 ? prev + 1 : 0))}
                      aria-label="Next specification"
                      className="w-8 h-8 rounded-lg bg-[#2D3A1E] hover:bg-[#405329] text-white flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column (5 cols): Tall Founder Portrait + Curved Circular Text Arch */}
            <ScrollReveal direction="up" delay={0.12} className="lg:col-span-5 relative flex flex-col items-center lg:items-end">
              {/* Circular Curved SVG Text Arch Floating Above the Portrait */}
              <div className="relative -mb-6 z-20 pointer-events-none self-center lg:self-start lg:ml-8">
                <svg className="w-64 h-24 sm:w-72 sm:h-28 overflow-visible" viewBox="0 0 260 105">
                  <path id="archCurvedText1" d="M 15,100 A 115,115 0 0,1 245,100" fill="none" />
                  <text
                    textAnchor="middle"
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="text-caption font-bold tracking-[0.20em] fill-[#405329] uppercase"
                  >
                    <textPath href="#archCurvedText1" startOffset="50%" textAnchor="middle">
                      · HUMAN &amp; ENTERPRISE ECOSYSTEM ·
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Tall Editorial Portrait with 16px Container Radius */}
              <div className="w-full h-[464px] sm:h-[544px] overflow-hidden rounded-2xl bg-[#2D3A1E]/10 border border-[#2D3A1E]/15 shadow-high relative group">
                <img
                  src="/assets/team/lalitha-manoharan.jpg"
                  alt={founder.name}
                  className="w-full h-full object-cover object-top rounded-2xl filter brightness-[0.98] contrast-[1.02] group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-caption">
                  <span className="font-semibold tracking-wider">{founder.name.toUpperCase()}</span>
                  <span className="font-mono text-[#E4E9DC] tracking-wider uppercase">FOUNDER &amp; CSO</span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* =====================================================================
          EDITORIAL SPREAD 2: CINEMATIC FULL-BLEED PANORAMA BREAK
          (PUMA PICTURE 1 - MIDDLE FULL-WIDTH BANNER)
      ====================================================================== */}
      <section
        ref={panoramaSectionRef}
        className="relative w-full h-[384px] sm:h-[480px] lg:h-[512px] overflow-hidden border-b border-[#2D3A1E]/15"
      >
        <motion.img
          style={{ y: panoramaBgY }}
          src="/assets/photos/bezalel-universal-standard.jpg"
          alt="The Bezalel Standard · Timeless & Universal"
          className="w-full h-[118%] -top-[9%] relative object-cover object-center filter brightness-[0.88] contrast-[1.05] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/25 to-black/85 pointer-events-none" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-end pb-8 sm:pb-12">
          <ScrollReveal direction="up" className="max-w-2xl text-right">
            <h2 className="text-h1 font-bold text-white drop-shadow-xl">
              The Bezalel standard isn't just timeless —{' '}
              <span className="italic text-[#E4E9DC]">it's universal.</span>
            </h2>
            <p className="text-body text-white/90 mt-2 drop-shadow">
              Excellence in craft · Honor in stewardship · Multiplication in enterprise
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          EDITORIAL SPREAD 3: ASYMMETRIC MASONRY & DUAL STANDARDS
          (PUMA PICTURE 1 - LOWER-MIDDLE SPREAD)
      ====================================================================== */}
      <section id="standards" className="relative py-12 sm:py-16 overflow-hidden border-b border-[#2D3A1E]/12 bg-[#F4F1EA]">
        {/* Full True-Color Split Olive & Cream Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-track-record-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Subtle Architectural Blueprint Dotted Guidelines */}
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-dashed border-[#2D3A1E]/[0.07] h-full" />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 6 Cols: Dual Asymmetric Photos + Curved Arch Text */}
            <div className="lg:col-span-6 flex items-end gap-6">
              {/* Photo 1: Vertical Portrait with 16px Container Radius */}
              <div className="w-1/2 h-[336px] sm:h-[400px] overflow-hidden rounded-2xl bg-black/10 border border-[#2D3A1E]/15 shadow-mid">
                <img
                  src="/assets/photos/bezalel-timeless-standard.jpg"
                  alt="The Timeless Standard · Fiduciary Stewardship"
                  className="w-full h-full object-cover object-top rounded-2xl filter brightness-[0.98]"
                />
              </div>

              {/* Photo 2: Offset with Curved Text Arch Above */}
              <div className="w-1/2 space-y-2">
                <div className="flex justify-center -mb-2 pointer-events-none">
                  <svg className="w-40 h-16 overflow-visible" viewBox="0 0 200 80">
                    <path id="archCurvedText2" d="M 20,75 A 80,80 0 0,1 180,75" fill="none" />
                    <text style={{ fontFamily: 'var(--font-display)' }} className="text-caption font-bold tracking-[0.22em] fill-[#E6B94D] uppercase">
                      <textPath href="#archCurvedText2" startOffset="50%" textAnchor="middle">
                        · EXODUS 31:1–6 ·
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Photo 2: 16px Container Radius */}
                <div className="w-full h-[256px] sm:h-[304px] overflow-hidden rounded-2xl bg-black/10 border border-[#2D3A1E]/15 shadow-mid">
                  <img
                    src="/assets/photos/bezalel-human-core.jpg"
                    alt="Commercially Grounded · Human at the Core"
                    className="w-full h-full object-cover object-top rounded-2xl filter brightness-[0.98]"
                  />
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Stacked Editorial Text with Brand Headings */}
            <div className="lg:col-span-6 space-y-8 pl-0 lg:pl-6">
              {/* Block 1 */}
              <div>
                <h3 className="text-h3 font-semibold tracking-wide uppercase text-[#E6B94D] mb-2 font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  THE TIMELESS STANDARD
                </h3>
                <p className="text-body text-[#FAF9F6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] leading-relaxed font-medium">
                  In 2004, consulting was broken by transactional speed. Enterprise solutions were built to win retainers, not to endure. We chose a name that demands absolute accountability for every foundation we lay—turning latent talent into tangible capability and institutionalizing solutions that outlive their founders.
                </p>
              </div>

              {/* Block 2 */}
              <div className="pt-6 border-t border-white/20">
                <h3 className="text-h3 font-semibold tracking-wide uppercase text-[#E6B94D] mb-2 font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  COMMERCIALLY GROUNDED · HUMAN AT THE CORE
                </h3>
                <p className="text-body text-[#FAF9F6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] leading-relaxed font-medium">
                  The Bezalel ecosystem connects 100% statutory rigor under Companies Act 2016, experiential leadership labs that resolve executive friction live, and confidential clinical psychotherapy protecting the person and family behind the title.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          EDITORIAL SPREAD 4: BOLD PULL-QUOTE & MULTI-ANGLE GRID
          (PUMA PICTURE 1 - BOTTOM SPREAD)
      ====================================================================== */}
      <section id="covenant-quote" className="relative py-12 sm:py-16 overflow-hidden border-b border-[#2D3A1E]/12 bg-[#F4F1EA] text-[#141812]">
        {/* Full True-Color Ivory Cream Geometric Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-cream-geometric-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Subtle Architectural Blueprint Dotted Guidelines */}
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-dashed border-[#2D3A1E]/[0.07] h-full" />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (6 cols): Bold Dark Quote + Narrative + 2 Lower Photos */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-h2 font-semibold uppercase tracking-tight text-[#141812] drop-shadow-sm">
                “YOU CANNOT BUILD ENDURING ENTERPRISE ON THE BACK OF HUMAN WRECKAGE”
              </h2>

              <div>
                <h3 className="text-h3 font-semibold tracking-wide uppercase text-[#405329] mb-2 font-mono">
                  A COVENANT WITH ENTERPRISE
                </h3>
                <p className="text-body text-[#42493E]">
                  From 100% SSM compliance retainers to HRD Corp-accredited leadership masterclasses, our four specialized entities form a unified fiduciary safeguard. We do not do tick-box compliance or manufactured hype; we engineer frameworks for clients to own forever.
                </p>
              </div>

              {/* Two Lower Side-by-Side Photos with 16px Container Radius */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="aspect-square overflow-hidden rounded-2xl bg-black/5 border border-[#2D3A1E]/15 shadow-low">
                  <img
                    src="/assets/photos/bezalel-governance-schematics.jpg"
                    alt="Statutory Governance & Fiduciary Schematics"
                    className="w-full h-full object-cover rounded-2xl filter brightness-[0.98]"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-black/5 border border-[#2D3A1E]/15 shadow-low">
                  <img
                    src="/assets/photos/bezalel-human-restoration.jpg"
                    alt="Human Wholeness & Strategic Dialogue"
                    className="w-full h-full object-cover rounded-2xl filter brightness-[0.98]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column (6 cols): Large Action Photo with 16px Container Radius + Bottom Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="w-full h-[384px] sm:h-[448px] overflow-hidden rounded-2xl bg-black/5 border border-[#2D3A1E]/15 shadow-mid">
                <img
                  src="/assets/photos/bezalel-artisan-atelier.jpg"
                  alt="An Artist's Canvas for Infinite Potential · Master Artisan Studio"
                  className="w-full h-full object-cover rounded-2xl filter brightness-[0.98]"
                />
              </div>

              <div>
                <h3 className="text-h3 font-semibold tracking-wide uppercase text-[#405329] mb-2 font-mono">
                  AN ARTIST'S CANVAS FOR INFINITE POTENTIAL
                </h3>
                <p className="text-body text-[#42493E]">
                  Our success is not measured in manufactured hype, but in the enduring stability of the institutions and families we equip. Turning internal capability into sustainable opportunity across generations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 05: 18-YEAR MASTER MILESTONE JOURNEY (MISSION ZERO EDITORIAL TIMELINE)
          (STRICTLY UNCHANGED — ATTACHED PICTURE 2)
      ====================================================================== */}
      <div id="battle-log">
        <StickyTimelineScrollytelling />
      </div>

      {/* =====================================================================
          CHAPTER 07: PHILOSOPHY WHEEL & FINAL PARTNER CTA
      ====================================================================== */}
      <section id="wheel" className="relative py-16 sm:py-20 bg-[#1A2216] text-[#FAF9F6] overflow-hidden border-b border-[#405329]/40">
        {/* Full True-Color Embossed Z Monogram Wallpaper Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-monogram-pattern.jpg')`,
            backgroundSize: '560px auto',
            backgroundRepeat: 'repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-caption font-semibold tracking-widest uppercase text-[#E6B94D] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E6B94D]" />
              <span>THE COVENANT &amp; OPERATING WHEEL</span>
            </div>
            <h2 className="text-display font-bold text-[#FAF9F6] drop-shadow-sm">
              B · E · Z · A · L · E · L
            </h2>
            <p className="text-body text-[#FAF9F6]/85 mt-2">
              Seven disciplines, from developing a person to multiplying a legacy.
            </p>
          </div>

          <div>
            <PhilosophyVisualWheel />
          </div>
        </div>
      </section>

    </div>
  );
};

export default StoryPage;
