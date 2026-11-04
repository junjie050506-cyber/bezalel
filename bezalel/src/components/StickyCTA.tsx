import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../config';

/** Mobile: bottom bar after a little scroll. Desktop: small floating WhatsApp button. */
export const StickyCTA: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const wa = whatsappLink();

  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  if (pathname === '/inquire' || pathname === '/contact' || pathname === '/loading') return null;

  return (
    <>
      <div
        className={`sm:hidden fixed inset-x-0 bottom-0 z-[120] px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/95 to-transparent transition-transform duration-300 ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="flex-1 h-12 rounded-full bg-[#E6B94D] text-[#141812] font-semibold text-sm shadow-lg"
          >
            Book a free consultation
          </button>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-12 h-12 rounded-full bg-[#141812] border border-[#E6B94D]/45 text-[#E6B94D] flex items-center justify-center shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="hidden sm:flex fixed bottom-6 right-6 z-[120] h-12 px-4 rounded-full bg-[#141812]/95 backdrop-blur-xl border border-[#E6B94D]/45 hover:border-[#F5CE68] text-[#FAF9F6] items-center gap-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] text-xs font-semibold tracking-wide hover:-translate-y-0.5 transition-all group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3B86C] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3B86C]" />
          </span>
          <MessageCircle className="w-4 h-4 text-[#E6B94D] group-hover:scale-110 transition-transform" />
          <span>Direct WhatsApp</span>
        </a>
      )}
    </>
  );
};
