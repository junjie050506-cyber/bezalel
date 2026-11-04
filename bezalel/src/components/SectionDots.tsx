import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Dot {
  id: string;
  label: string;
}

/** Right-edge progress dots for any section with data-dot-label (desktop only). */
export const SectionDots: React.FC = () => {
  const { pathname } = useLocation();
  const [dots, setDots] = useState<Dot[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    let tries = 0;
    const scan = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-dot-label]'));
      els.forEach((el, i) => {
        if (!el.id) el.id = `dot-section-${i}`;
      });
      setDots(els.map((el) => ({ id: el.id, label: el.dataset.dotLabel || '' })));
      if (!els.length && tries++ < 8) timer = window.setTimeout(scan, 300);
    };
    let timer = window.setTimeout(scan, 700); // wait for page transition
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!dots.length) return;
    const onScroll = () => {
      let cur = dots[0].id;
      for (const d of dots) {
        const el = document.getElementById(d.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = d.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dots]);

  if (dots.length < 2) return null;

  return (
    <nav
      aria-label="Page sections"
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-[110] flex-col items-end gap-3"
    >
      {dots.map((d) => {
        const on = d.id === active;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={`Go to ${d.label}`}
          >
            <span
              className={`px-2.5 py-1 rounded-full bg-[#12180D] text-[#FAF8F4] text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                on ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {d.label}
            </span>
            <span
              className={`block rounded-full border transition-all duration-300 ${
                on
                  ? 'w-3 h-3 bg-[#E6B94D] border-[#E6B94D] shadow-[0_0_0_4px_rgba(230,185,77,0.25)]'
                  : 'w-2.5 h-2.5 bg-white/80 border-[#2D3A1E]/50 group-hover:bg-[#A3B86C]'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};
