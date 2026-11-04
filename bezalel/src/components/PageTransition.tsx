import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

const LABELS: Record<string, string> = {
  '/': 'Home',
  '/start': 'Start Here',
  '/ecosystem': 'Ecosystem',
  '/story': 'Our Story',
  '/impact': 'Impact',
  '/leadership': 'Leadership',
  '/clients': 'Clients',
  '/inquire': 'Partner With Us',
  '/contact': 'Contact',
};

const STRIPS = 5;
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Full-screen curtain: 5 olive panels sweep up, a gold line + page name flash,
 * then the panels lift away to reveal the new page.
 */
export const PageTransition: React.FC = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [runKey, setRunKey] = useState(0);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setLabel(LABELS[pathname] ?? 'BEZALEL INC');
    setRunKey((k) => k + 1);
  }, [pathname]);

  if (runKey === 0) return null;

  return (
    <div
      key={runKey}
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none flex"
    >
      {Array.from({ length: STRIPS }).map((_, i) => (
        <motion.div
          key={i}
          className="relative h-full flex-1 bg-[#1E2713]"
          style={{ boxShadow: 'inset -1px 0 0 rgba(163,184,108,0.18)' }}
          initial={{ y: '100%' }}
          animate={{ y: ['100%', '0%', '0%', '-100%'] }}
          transition={{
            duration: 0.95,
            times: [0, 0.38, 0.62, 1],
            ease: EASE,
            delay: i * 0.055,
          }}
        />
      ))}

      {/* Gold sweep line */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#E6B94D] origin-left"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.95, times: [0.3, 0.5, 0.62, 0.78], ease: 'easeOut' }}
      />

      {/* Page name flash */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, -24], scale: [0.96, 1, 1, 1.03] }}
        transition={{ duration: 0.95, times: [0.32, 0.46, 0.6, 0.76], ease: 'easeOut' }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A3B86C]">
          Bezalel Inc
        </span>
        <span className="font-display text-4xl sm:text-6xl text-[#FAF8F4] italic">
          {label}
        </span>
      </motion.div>
    </div>
  );
};
