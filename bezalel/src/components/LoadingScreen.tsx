import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZInsignia } from './ZInsignia';

interface LoadingScreenProps {
  onComplete?: () => void;
  standalone?: boolean;
}

const VENTURE_NODES = [
  { num: '01', name: 'Bezalel', angle: -90, color: '#A3B86C' },
  { num: '02', name: 'Olive & Vine', angle: -18, color: '#8C9E5E' },
  { num: '03', name: 'Hur-On', angle: 54, color: '#F5B841' },
  { num: '04', name: 'Mustard Seed', angle: 126, color: '#D4A017' },
  { num: '05', name: 'Phroneo', angle: 198, color: '#E5DEC9' },
];

const STAGES = [
  { id: '01', label: 'Equip People', range: [0, 36] },
  { id: '02', label: 'Strengthen Enterprise', range: [37, 74] },
  { id: '03', label: 'Multiply Opportunity', range: [75, 100] },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  standalone = false,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = standalone ? 3200 : 1850;
    const intervalTime = 24;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          if (standalone) {
            return 0; // loop smoothly when viewed as standalone page
          }
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 260);
          }
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, standalone]);

  const roundedProgress = Math.min(100, Math.round(progress));
  const activeStageIndex =
    roundedProgress < 37 ? 0 : roundedProgress < 75 ? 1 : 2;
  const activeStage = STAGES[activeStageIndex];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: 'blur(6px)',
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`${
        standalone ? 'min-h-[calc(100dvh-5rem)] w-full' : 'fixed inset-0 z-[100]'
      } bg-[#1E2713] text-[#F4F1EA] flex flex-col justify-between p-6 sm:p-10 overflow-hidden select-none`}
    >
      {/* Subtle Architectural Lattice & Warm Radial Glow */}
      <div className="absolute inset-0 bg-z-lattice opacity-10 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(245,184,65,0.16) 0%, rgba(140,158,94,0.08) 45%, rgba(30,39,19,0) 72%)',
        }}
      />

      {/* TOP BAR: Brand Coordinates & Optional Skip */}
      <div className="relative z-10 flex items-center justify-between max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#8C9E5E]/25">
          <span className="w-2 h-2 rounded-full bg-[#A3B86C] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#EFEBE0]/80">
            BEZALEL INC · ECOSYSTEM
          </span>
        </div>

        {!standalone && onComplete && (
          <button
            onClick={onComplete}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 font-mono text-[10px] uppercase tracking-[0.2em] text-[#EFEBE0]/70 hover:text-white transition-colors cursor-pointer"
          >
            Enter →
          </button>
        )}
      </div>

      {/* CENTERPIECE: Sculptural Sacred Geometry & 5-Venture Orbital Constellation */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-4">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Animated SVG Sacred Geometry & Progress Ring */}
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="loaderGoldGrad" x1="0" y1="0" x2="320" y2="320" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A3B86C" />
                <stop offset="50%" stopColor="#F5B841" />
                <stop offset="100%" stopColor="#FFFDF8" />
              </linearGradient>
              <radialGradient id="centerSculptureGlow" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#F5B841" stopOpacity="0.35" />
                <stop offset="65%" stopColor="#8C9E5E" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#1E2713" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Core Halo */}
            <circle cx="160" cy="160" r="115" fill="url(#centerSculptureGlow)" />

            {/* Outer Dashed Architectural Orbit */}
            <motion.circle
              cx="160"
              cy="160"
              r="134"
              stroke="#8C9E5E"
              strokeOpacity="0.25"
              strokeWidth="1"
              strokeDasharray="4 6"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '160px 160px' }}
            />

            {/* Background Track Circle */}
            <circle
              cx="160"
              cy="160"
              r="108"
              stroke="#8C9E5E"
              strokeOpacity="0.18"
              strokeWidth="2"
            />

            {/* Animated Golden Progress Ring */}
            <circle
              cx="160"
              cy="160"
              r="108"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 108}
              strokeDashoffset={2 * Math.PI * 108 * (1 - roundedProgress / 100)}
              transform="rotate(-90 160 160)"
              className="transition-all duration-75 ease-out"
            />

            {/* Inner Sculptural Canopy Waves (Matching Hero Aesthetic) */}
            <motion.ellipse
              cx="160"
              cy="160"
              rx="82"
              ry="34"
              stroke="#F5B841"
              strokeOpacity="0.3"
              strokeWidth="1.2"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '160px 160px' }}
            />
            <motion.ellipse
              cx="160"
              cy="160"
              rx="82"
              ry="34"
              stroke="#A3B86C"
              strokeOpacity="0.3"
              strokeWidth="1.2"
              animate={{ rotate: [90, 270, 450] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '160px 160px' }}
            />

            {/* 5 Venture Nodes around the Orbit ( radius = 108 ) */}
            {VENTURE_NODES.map((node, index) => {
              const rad = (node.angle * Math.PI) / 180;
              const cx = 160 + 108 * Math.cos(rad);
              const cy = 160 + 108 * Math.sin(rad);
              const isActivated = roundedProgress >= (index + 1) * 18;

              return (
                <g key={node.num}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActivated ? 7 : 4.5}
                    fill={isActivated ? node.color : '#2D3A1E'}
                    stroke="#F4F1EA"
                    strokeWidth={isActivated ? 2 : 1}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Emblem Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#F4F1EA] border-2 border-[#8C9E5E]/40 shadow-2xl flex flex-col items-center justify-center p-3"
          >
            <img
              src="/assets/bezalel-logo.png"
              alt="BEZALEL INC"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-mono text-[9px] tracking-[0.22em] text-[#2D3A1E] font-semibold mt-1">
              {roundedProgress}%
            </span>
          </motion.div>
        </div>

        {/* Minimalist Title & Dynamic 3-Stage Thesis */}
        <div className="text-center mt-4 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <ZInsignia size={18} variant="sage" />
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-white">
              BEZALEL INC.
            </span>
          </div>

          {/* Animated Stage Indicator */}
          <div className="h-7 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#2D3A1E] border border-[#8C9E5E]/35"
              >
                <span className="font-mono text-[10px] text-[#F5B841]">
                  {activeStage.id}
                </span>
                <span className="font-display italic text-sm sm:text-base text-[#F4F1EA]">
                  {activeStage.label}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: 3-Pillar Visual Progress Dots */}
      <div className="relative z-10 max-w-md w-full mx-auto">
        <div className="grid grid-cols-3 gap-2">
          {STAGES.map((stage, idx) => {
            const isDone = idx <= activeStageIndex;
            return (
              <div key={stage.id} className="flex flex-col items-center gap-1.5">
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#8C9E5E] to-[#F5B841]"
                    initial={{ width: '0%' }}
                    animate={{
                      width:
                        idx < activeStageIndex
                          ? '100%'
                          : idx === activeStageIndex
                          ? `${Math.min(
                              100,
                              Math.max(
                                15,
                                ((roundedProgress - stage.range[0]) /
                                  (stage.range[1] - stage.range[0])) *
                                  100
                              )
                            )}%`
                          : '0%',
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                    isDone ? 'text-[#A3B86C]' : 'text-white/35'
                  }`}
                >
                  {stage.label.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
