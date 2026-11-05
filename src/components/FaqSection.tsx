import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is BEZALEL INC?',
    a: 'A group of four specialised businesses, established in 2008 in Malaysia and Singapore, that develop people and strengthen enterprises so opportunity can be created and multiplied.',
  },
  {
    q: 'What are the four ventures?',
    a: 'Olive & Vine (psychological and relational care), HUR-ON (corporate training and consultancy), Mustard Seed & Co (creative and brand growth) and Phroneo BoardSuite (corporate governance and secretarial advisory).',
  },
  {
    q: 'Can we work with just one venture?',
    a: 'Yes. You can engage a single venture for a focused need, such as Olive & Vine for school wellbeing or Phroneo for governance, or work with the whole group on a joined-up programme.',
  },
  {
    q: 'Who do you work with?',
    a: 'We have worked with 24 selected organisations: 14 international school campuses and 10 corporate and public-listed organisations across Malaysia and the region.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free consultation using any button on this page. Tell us what you need and our team will reply within 1 business day with a clear next step.',
  },
];

export const FaqSection: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      data-dot-label="Questions"
      className="relative z-10 text-white py-14 sm:py-20 border-t border-[#405329]/30 overflow-hidden"
    >
      {/* Full True-Color Embossed Z Monogram Background (No Darkening Overlays) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/bezalel-monogram-pattern.jpg')`,
          backgroundSize: '560px auto',
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="type-kicker text-[#E4E9DC] block mb-2">Good to know</span>
          <h2 className="text-h2 font-semibold text-white">Common questions</h2>
        </div>

        <div className="divide-y divide-[#141812]/12 border-y border-[#141812]/12 bg-white/95 backdrop-blur-md rounded-2xl px-6 sm:px-8 shadow-high border border-white/20">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
                className="transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
                >
                  <span className="text-h3 font-semibold text-[#141812] group-hover:text-[#405329] transition-colors">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-10 h-10 rounded-full border border-[#2D3A1E]/24 flex items-center justify-center text-[#2D3A1E] group-hover:bg-[#2D3A1E] group-hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-body text-[#42493E]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-[#405329] hover:bg-[#2D3A1E] text-white text-body font-medium shadow-mid hover:shadow-high transition-all cursor-pointer border border-[#8C9E5E]/30"
          >
            Still have a question? Ask us
          </button>
        </div>
      </div>
    </section>
  );
};
