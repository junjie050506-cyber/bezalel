import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  photo: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'elizabeth-lee',
    quote:
      'Partnering across the Bezalel ecosystem brought relational wellbeing and experiential leadership formation together with rare depth. Their practitioners equip educators, executives, and young people with the character and capability needed for enduring institutional excellence.',
    author: "Professor Dato' Elizabeth Lee",
    role: 'CEO, Sunway Education Group',
    photo: '/assets/photos/elizabeth-lee.jpg',
  },
  {
    id: 'yong-pang-chaun',
    quote:
      "Bezalel didn't just manage our board filings and leadership transitions; they rebuilt how our executive committee thinks about fiduciary honor and human stewardship. When crisis hit, their cross-practice coverage was the difference between vulnerability and stability.",
    author: 'Yong Pang Chaun',
    role: 'CEO & Founder, Padini Holdings Berhad',
    photo: '/assets/photos/yong-pang-chaun.jpg',
  },
];

export const ExecutiveTestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <div
      className="w-full bg-white border border-black/[0.06] py-16 sm:py-24 px-6 sm:px-12 lg:px-20"
      aria-roledescription="carousel"
      aria-label="Executive Testimonials"
    >
      <div className="max-w-[885px] mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-12 md:gap-16 lg:gap-[88px]">
        {/* Left Column: 1:1 Portrait + Overlapping Top-Left Quote + Bottom-Right Gold Triangle */}
        <div className="relative w-[275px] sm:w-[330px] aspect-square shrink-0 select-none mt-3 md:mt-0">
          {/* Geometric Opening Double Quote (“) overlapping top-left edge */}
          <svg
            viewBox="0 0 43 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="absolute left-[8.8%] -top-[7.6%] w-[12.8%] h-auto z-20 pointer-events-none"
          >
            <path
              d="M0 18.5C0 9.6 4.2 3.3 12.6 0L15.6 4.8C10.2 7.4 7.6 11.8 7.6 18.5H15.5V34H0V18.5ZM27 18.5C27 9.6 31.2 3.3 39.6 0L42.6 4.8C37.2 7.4 34.6 11.8 34.6 18.5H42.5V34H27V18.5Z"
              fill="#232320"
            />
          </svg>

          {/* Square Editorial Portrait */}
          <div className="relative z-10 w-full h-full overflow-hidden bg-[#EAE6DF]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.photo}
                alt={`${current.author} — ${current.role}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full h-full object-cover object-top block"
              />
            </AnimatePresence>
          </div>

          {/* Brand Olive Green Right-Angled Triangle behind bottom-right corner */}
          <div
            aria-hidden="true"
            className="absolute -right-[11px] -bottom-[11px] w-[56.5%] h-[56.5%] z-0 pointer-events-none"
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full block"
            >
              <polygon points="100,0 100,100 0,100" fill="#3D4A26" />
            </svg>
          </div>
        </div>

        {/* Right Column: Quote Body, Inline Attribution, and < | > Navigation */}
        <div className="flex-1 flex flex-col justify-between md:pt-[56px] md:pb-[2px] max-w-[465px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <blockquote className="font-sans text-[15.5px] sm:text-[16px] leading-[1.68] text-[#484848] font-normal">
                {current.quote}
              </blockquote>

              <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-sans text-[15.5px] sm:text-[16px] font-bold text-[#181818] tracking-[-0.01em]">
                  {current.author}
                </span>
                <span className="font-sans text-[13.5px] sm:text-[14px] font-normal text-[#949494]">
                  {current.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls: <  |  > aligned flush-left with text */}
          <div className="mt-12 md:mt-14 flex items-center">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="-ml-2 p-2 text-[#1D1D1B] hover:text-[#3D4A26] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4A26]"
            >
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6.5 1.75L1.75 6.5L6.5 11.25"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span
              aria-hidden="true"
              className="mx-[14px] w-[1.5px] h-[26px] bg-[#3D4A26] block shrink-0"
            />

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-2 text-[#1D1D1B] hover:text-[#3D4A26] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4A26]"
            >
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1.5 1.75L6.25 6.5L1.5 11.25"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
