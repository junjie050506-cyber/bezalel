import React from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollReveal } from './MotionContainer';

export const ClosingCTA: React.FC<{ onOpen: (businessId?: string) => void }> = ({ onOpen }) => {
  const { pathname } = useLocation();
  if (pathname === '/inquire' || pathname === '/contact' || pathname === '/loading') return null;

  return (
    <section className="relative z-10 bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl text-white px-6 py-12 sm:px-12 sm:py-16 text-center border border-[#405329]/40 shadow-mid">
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
          {/* Subtle Contrast Veil to keep text crisp */}
          <div
            className="absolute inset-0 bg-black/45 pointer-events-none"
            aria-hidden="true"
          />

          <ScrollReveal direction="up" className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-h1 font-bold text-white mb-2 drop-shadow-sm">
              Ready to strengthen your enterprise?
            </h2>

            <p className="text-body text-[#FAF9F6]/90 max-w-md mx-auto drop-shadow-sm">
              Partner with our four specialist ventures in counselling, leadership, brand, and governance.
            </p>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpen()}
                className="inline-flex items-center justify-center px-6 h-12 rounded-lg bg-white hover:bg-[#F4F6F0] text-[#141812] font-semibold text-body shadow-low hover:shadow-mid transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Book a consultation
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

