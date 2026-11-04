import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export interface ScrollyChapter {
  id: string;
  number: string;
  title: string;
  kicker: string;
}

const CHAPTERS: ScrollyChapter[] = [
  { id: 'chapter-hero', number: '00', title: 'Genesis', kicker: 'Welcome & Purpose' },
  { id: 'proof', number: '01', title: 'Track Record', kicker: '18-Year Stewardship' },
  { id: 'partners-strip', number: '02', title: 'Partners', kicker: '24 Organisations' },
  { id: 'pathways', number: '03', title: 'Ecosystem', kicker: 'Four Operating Ventures' },
  { id: 'fragmentation', number: '04', title: 'The Standard', kicker: 'Cost of Fragmentation' },
  { id: 'chapter-manifesto', number: '05', title: 'Manifesto', kicker: 'Executive Thesis' },
  { id: 'faq', number: '06', title: 'Inquiry', kicker: 'Common Questions' },
];

export const AdvancedScrollytellingRail: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.42;

      let currentIdx = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentIdx = i;
          }
        }
      }
      setActiveChapter(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* 1. Global Razor-Thin Scroll Progress Bar (Top of Screen) */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left bg-gradient-to-r from-[#4A5D33] via-[#E6B94D] to-[#A3B86C] shadow-[0_0_8px_rgba(230,185,77,0.6)] pointer-events-none"
      />

      {/* 2. Advanced Scrollytelling Chapter Rail (Right Edge) */}
      <nav
        aria-label="Story Chapters Navigation"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto select-none"
      >
        {/* Subtle Vertical Progress Track Line */}
        <div className="absolute right-[5px] top-2 bottom-2 w-[1.5px] bg-[#141812]/15 rounded-full pointer-events-none -z-10">
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="w-full h-full bg-[#2D3A1E] origin-top rounded-full"
          />
        </div>

        {CHAPTERS.map((chapter, idx) => {
          const isActive = activeChapter === idx;
          const isHovered = hoveredChapter === idx;

          return (
            <div
              key={chapter.id}
              className="relative flex items-center gap-2 group cursor-pointer py-1"
              onMouseEnter={() => setHoveredChapter(idx)}
              onMouseLeave={() => setHoveredChapter(null)}
              onClick={() => scrollToChapter(chapter.id)}
            >
              {/* Interactive Label Tooltip (Appears on Hover or when Active) */}
              <div
                className={`transition-all duration-300 transform pointer-events-none ${
                  isActive || isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-3'
                }`}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141812]/90 backdrop-blur-md text-white shadow-lg border border-white/10 text-right whitespace-nowrap">
                  <span className="text-[10px] font-mono text-[#E6B94D] font-bold">
                    {chapter.number}
                  </span>
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {chapter.title}
                  </span>
                  <span className="text-[10px] text-white/60 hidden lg:inline">
                    · {chapter.kicker}
                  </span>
                </div>
              </div>

              {/* The Chapter Dot Marker */}
              <button
                type="button"
                aria-label={`Scroll to ${chapter.title}`}
                className="relative w-3.5 h-3.5 flex items-center justify-center cursor-pointer focus:outline-hidden"
              >
                {/* Active Outer Ring */}
                {isActive && (
                  <motion.span
                    layoutId="scrollyActiveRing"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="absolute inset-0 rounded-full border-[2px] border-[#E6B94D] scale-125"
                  />
                )}

                {/* Inner Dot */}
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2D3A1E] scale-110'
                      : isHovered
                        ? 'bg-[#E6B94D] scale-125'
                        : 'bg-[#141812]/35 group-hover:bg-[#141812]/70'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </nav>
    </>
  );
};
