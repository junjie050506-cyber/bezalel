import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  TEAM_MEMBERS,
  CORE_VALUES,
  FOUNDER_PERSPECTIVES,
} from '../data/ecosystemData';
import {
  StartHeroTrilogyBanner,
} from '../components/EcosystemGraphics';
import { ScrollReveal } from '../components/MotionContainer';

export interface LeadershipPageProps {
  onOpenInquiry: (role?: string) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({
  onOpenInquiry,
}) => {
  const cso = TEAM_MEMBERS[0];
  const groupLeadership = TEAM_MEMBERS.slice(1);
  const prefersReducedMotion = useReducedMotion();
  const csoSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: csoScrollProgress } = useScroll({
    target: csoSectionRef,
    offset: ['start start', 'end start'],
  });
  const portraitY = useTransform(
    csoScrollProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '8%']
  );

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#141812]">
      {/* =====================================================================
          SECTION 1: FOUNDER & CHIEF SERVANT OFFICER (PDF PAGE 03)
      ====================================================================== */}
      <section
        ref={csoSectionRef}
        className="relative py-12 sm:py-16 bg-[#F4F1EA] border-b border-[#2D3A1E]/12 overflow-hidden"
      >
        {/* Ivory Cream Geometric Architectural Background (Fixed attachment - stays static while scrolling) */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* THE MASTER QUOTE BOX */}
          <div className="rounded-2xl text-[#FAF9F6] p-6 sm:p-8 lg:p-12 shadow-high border border-[#405329]/40 relative overflow-hidden">
            {/* Full True-Color Split Olive & Cream Architectural Artwork Background (Fixed attachment - stays 100% still while scrolling) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url('/assets/bezalel-track-record-bg.jpg')`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              aria-hidden="true"
            />
            {/* Subtle Dark Vignette for Quote Typography Readability */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/35 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Giant Quote + Statement + Attribution */}
              <ScrollReveal direction="up" className="lg:col-span-7 flex flex-col justify-between space-y-6 py-2">
                
                {/* Giant Quote Icon */}
                <div className="text-[#E6B94D]">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-[#E6B94D]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>

                {/* High-Impact Quote Headline */}
                <h1 className="text-display font-bold text-white drop-shadow-sm">
                  “Entrepreneurship is how I think.{' '}
                  <span className="text-[#E6B94D]">People</span> are at the heart of what I build.{' '}
                  <span className="text-[#E6B94D]">Purpose</span> is why I build it.”
                </h1>

                {/* Speaker Attribution Line */}
                <div className="pt-2">
                  <div className="text-body text-white/95">
                    — <strong className="font-semibold text-white">Lalitha Manoharan</strong>,{' '}
                    <span className="text-white/80">
                      Founder &amp; Chief Servant Officer · Entrepreneur · Psychotherapist · Trainer · Coach · Facilitator
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry('Executive Leadership')}
                    className="inline-flex items-center gap-2 bg-[#405329] hover:bg-[#2D3A1E] text-white px-6 py-3 rounded-lg text-caption font-semibold transition-colors cursor-pointer shadow-low border border-white/20"
                  >
                    <span>Connect With Leadership</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>

              {/* RIGHT COLUMN: The Rounded Photo with Scroll Parallax */}
              <div className="lg:col-span-5 h-full flex items-center justify-center">
                <div className="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[480px] rounded-xl overflow-hidden bg-[#1C2218] shadow-mid relative border border-white/10">
                  <motion.img
                    style={{ y: portraitY }}
                    src={cso.image}
                    alt={cso.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-[108%] -top-[4%] relative object-cover object-top will-change-transform"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: FOUNDER PERSPECTIVE 01–07 (PDF PAGE 04)
      ====================================================================== */}
      <section className="relative py-12 sm:py-16 bg-[#1A2216] border-b border-[#141812]/12 overflow-hidden">
        {/* Full True-Color Split Olive & Cream Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-track-record-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <div className="flex items-center gap-2 text-caption font-mono font-semibold tracking-kicker text-[#E6B94D] mb-2 uppercase">
                <span>FOUNDER PERSPECTIVE · 01 — 07</span>
              </div>
              <h2 className="text-h1 font-bold text-[#FAF9F6] drop-shadow-sm">
                The person and the enterprise belong in the same conversation
              </h2>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-white/15 border-t border-b border-white/15 mb-8">
            {FOUNDER_PERSPECTIVES.map((item, idx) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group py-4 px-4 -mx-4 rounded-xl hover:bg-white/5 transition-colors grid grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-2 sm:col-span-1 text-caption font-mono font-semibold text-[#E6B94D] tabular-nums">
                  {item.index}
                </div>
                <div className="col-span-10 sm:col-span-11 text-h3 font-semibold text-[#FAF9F6] group-hover:text-white group-hover:translate-x-1 transition-all drop-shadow-sm">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-h3 font-semibold text-[#FAF9F6] drop-shadow-sm">
              This breadth shapes a Group that considers human potential and commercial sustainability together.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: LEADERSHIP & TEAM — GROUP & BUSINESS LEADERSHIP (PDF PAGE 22)
      ====================================================================== */}
      <section className="relative py-12 sm:py-16 bg-[#F4F1EA] border-b border-[#2D3A1E]/12 overflow-hidden">
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
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <div className="flex items-center gap-2 text-caption font-mono font-semibold uppercase tracking-widest text-[#405329] mb-2">
                <span>LEADERSHIP &amp; TEAM · GROUP STEWARDSHIP</span>
              </div>
              <h2 className="text-h1 font-bold text-[#141812]">
                Purpose becomes real through people.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {groupLeadership.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -30px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-xl overflow-hidden border border-[#2D3A1E]/12 hover:border-[#405329]/45 shadow-low hover:shadow-mid transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#1C2218]">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center flex-1 flex flex-col justify-center">
                  <h3 className="text-h3 font-semibold text-[#141812] group-hover:text-[#2D3A1E] transition-colors uppercase">
                    {member.name}
                  </h3>
                  <span className="text-caption text-[#405329] mt-1 block">
                    {member.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: CORE VALUES — THE STANDARDS BEHIND HOW WE BUILD (PDF PAGE 20)
      ====================================================================== */}
      <section className="relative py-12 sm:py-16 bg-[#1A2216] border-b border-[#141812]/12 overflow-hidden">
        {/* Full True-Color Split Olive & Cream Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-track-record-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <ScrollReveal direction="up">
              <div className="max-w-3xl mb-8 sm:mb-12">
                <div className="flex items-center gap-2 text-caption font-mono font-semibold uppercase tracking-widest text-[#E6B94D] mb-2">
                  <span>CORE VALUES · INSTITUTIONAL STANDARDS</span>
                </div>
                <h2 className="text-h1 font-bold text-[#FAF9F6] drop-shadow-sm">
                  The standards behind how we build
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2D3A1E]/12 divide-y divide-[#2D3A1E]/12 shadow-low">
                {CORE_VALUES.map((val, idx) => (
                  <motion.div
                    key={val.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="group py-4 px-4 -mx-4 rounded-xl hover:bg-[#FAF9F6] transition-colors grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-4 flex items-baseline gap-3">
                      <span className="font-mono text-caption font-semibold text-[#405329] tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="text-h3 font-semibold text-[#2D3A1E] uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                        {val.name}
                      </span>
                    </div>
                    <div className="sm:col-span-8 text-body text-[#42493E]">
                      {val.definition}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.12}>
            <StartHeroTrilogyBanner />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
