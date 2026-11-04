import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Compass,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { HOUSE_ROOMS, HouseRoom } from '../data/houseRoomsData';

export interface EcosystemHouseProps {
  onOpenInquiry?: (companyId?: string) => void;
  onSelectVentureBelow?: (companyId: string) => void;
  externalSelectedVenture?: { id: string; timestamp: number } | null;
  className?: string;
}

interface CursorPct {
  x: number;
  y: number;
}

interface MagneticNodeProps {
  room: HouseRoom;
  isSelected: boolean;
  isHovered: boolean;
  isHubFocused: boolean;
  hoveredRoomId: string | null;
  cursorPct: CursorPct | null;
  prefersReducedMotion: boolean | null;
  onSelect: (roomId: string, enableZoom: boolean) => void;
  onHoverChange: (roomId: string | null) => void;
}

const ORDERED_ROOM_IDS = ['bezalel', 'olive-vine', 'hur-on', 'mustard-seed', 'phroneo'];

const getConduitStreamLabel = (id: string): string => {
  switch (id) {
    case 'olive-vine':
      return '00 ⇄ 01 · INNER RESILIENCE';
    case 'hur-on':
      return '00 ⇄ 02 · LEADERSHIP CRAFT';
    case 'mustard-seed':
      return '00 ⇄ 03 · BRAND & GROWTH';
    case 'phroneo':
      return '00 ⇄ 04 · BOARD GOVERNANCE';
    default:
      return '00 · CENTRAL HUB';
  }
};

const getConduitMidpoint = (id: string): { x: number; y: number } => {
  switch (id) {
    case 'olive-vine':
      return { x: 520, y: 545 };
    case 'hur-on':
      return { x: 590, y: 422 };
    case 'mustard-seed':
      return { x: 845, y: 546 };
    case 'phroneo':
      return { x: 778, y: 422 };
    default:
      return { x: 688, y: 546 };
  }
};

const MagneticHouseNode: React.FC<MagneticNodeProps> = ({
  room,
  isSelected,
  isHovered,
  isHubFocused,
  hoveredRoomId,
  cursorPct,
  prefersReducedMotion,
  onSelect,
  onHoverChange,
}) => {
  const isRoomHub = room.id === 'bezalel';
  const isTargeted = isSelected || isHovered;
  const isConnectedActive = isTargeted || isHubFocused;

  // Determine whether compact hover tooltip opens above or below the node
  const openPopoverBelow = room.hotspot.y < 42;

  // Sympathetic resonance: when a spoke is hovered, the central hub resonates;
  // when the central hub is hovered, all 4 spokes resonate.
  const isSympatheticResonance =
    !isHovered &&
    hoveredRoomId !== null &&
    ((isRoomHub && hoveredRoomId !== 'bezalel') ||
      (!isRoomHub && hoveredRoomId === 'bezalel'));

  const springConfig = { stiffness: 290, damping: 18, mass: 0.55 };
  const magX = useSpring(0, springConfig);
  const magY = useSpring(0, springConfig);
  const magScale = useSpring(1, { stiffness: 320, damping: 16, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) {
      magX.set(0);
      magY.set(0);
      magScale.set(isHovered ? 1.1 : isSelected ? 1.05 : 1);
      return;
    }

    if (isHovered) {
      magScale.set(isRoomHub ? 1.18 : 1.22);

      if (cursorPct) {
        const dxPct = cursorPct.x - room.hotspot.x;
        const dyPct = cursorPct.y - room.hotspot.y;
        const maxPullX = 14;
        const maxPullY = 11;
        const pullX = Math.max(-maxPullX, Math.min(maxPullX, dxPct * 1.05));
        const pullY = Math.max(-maxPullY, Math.min(maxPullY, dyPct * 1.05));
        magX.set(pullX);
        magY.set(pullY);
      } else {
        magX.set(0);
        magY.set(-3);
      }
    } else if (isSympatheticResonance) {
      magScale.set(1.1);
      if (isRoomHub && hoveredRoomId) {
        const targetSpoke = HOUSE_ROOMS.find((r) => r.id === hoveredRoomId);
        if (targetSpoke) {
          const dx = (targetSpoke.hotspot.x - room.hotspot.x) * 0.14;
          const dy = (targetSpoke.hotspot.y - room.hotspot.y) * 0.14;
          magX.set(dx);
          magY.set(dy);
        }
      } else if (!isRoomHub && hoveredRoomId === 'bezalel') {
        const hubRoom = HOUSE_ROOMS.find((r) => r.id === 'bezalel');
        if (hubRoom) {
          const dx = (hubRoom.hotspot.x - room.hotspot.x) * 0.12;
          const dy = (hubRoom.hotspot.y - room.hotspot.y) * 0.12;
          magX.set(dx);
          magY.set(dy);
        }
      }
    } else if (isSelected) {
      magScale.set(1.08);
      magX.set(0);
      magY.set(0);
    } else {
      magScale.set(1);
      magX.set(0);
      magY.set(0);
    }
  }, [
    isHovered,
    isSelected,
    isSympatheticResonance,
    hoveredRoomId,
    cursorPct,
    prefersReducedMotion,
    isRoomHub,
    room.hotspot.x,
    room.hotspot.y,
    magX,
    magY,
    magScale,
  ]);

  if (isRoomHub) {
    // CENTRAL BEZALEL INC ANCHOR HUB MEDALLION
    return (
      <div
        style={{
          left: `${room.hotspot.x}%`,
          top: `${room.hotspot.y}%`,
        }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${
          isHovered || isSelected ? 'z-50' : 'z-30'
        }`}
        onClick={() => onSelect('bezalel', false)}
        onMouseEnter={() => onHoverChange('bezalel')}
        onMouseLeave={() => onHoverChange(null)}
      >
        <motion.div
          style={{ x: magX, y: magY, scale: magScale }}
          className="relative group cursor-pointer flex flex-col items-center will-change-transform"
        >
          {/* Magnetic field pulse halo */}
          <motion.span
            animate={
              isHovered && !prefersReducedMotion
                ? { scale: [1, 1.38, 1.15], opacity: [0.75, 0.2, 0.6] }
                : isSympatheticResonance && !prefersReducedMotion
                ? { scale: [1, 1.22, 1.08], opacity: [0.5, 0.18, 0.4] }
                : { scale: 1, opacity: isTargeted ? 0.85 : 0.45 }
            }
            transition={
              isHovered || isSympatheticResonance
                ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            className={`absolute -inset-3 rounded-full border pointer-events-none ${
              isHovered
                ? 'border-2 border-[#F5CE68] bg-[#E6B94D]/30 shadow-[0_0_40px_rgba(245,206,104,0.75)]'
                : isTargeted || isSympatheticResonance
                ? 'border-[#F5CE68] bg-[#E6B94D]/20 shadow-[0_0_28px_rgba(230,185,77,0.5)]'
                : 'border-[#E6B94D]/60 bg-[#E6B94D]/10'
            }`}
          />

          {/* Central Hub Crest */}
          <div
            className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shadow-[0_12px_34px_rgba(0,0,0,0.88)] transition-colors duration-300 border-2 ${
              isTargeted || isSympatheticResonance
                ? 'bg-gradient-to-b from-[#FAF8F4] to-[#EAE2CE] border-[#F5CE68] ring-2 ring-[#F5CE68]/50'
                : 'bg-[#141812]/95 border-[#E6B94D]'
            }`}
          >
            <img
              src="/assets/bezalel-logo.png"
              alt="BEZALEL INC Central Hub"
              referrerPolicy="no-referrer"
              className={`w-6 h-6 sm:w-7 sm:h-7 object-contain transition-all ${
                isTargeted || isSympatheticResonance ? '' : 'brightness-125'
              }`}
            />
          </div>

          {/* Central Hub Architectural Plaque */}
          <div
            className={`mt-2 px-3 py-1 rounded-xl backdrop-blur-xl border transition-all duration-300 flex flex-col items-center shadow-[0_10px_28px_rgba(0,0,0,0.85)] ${
              isHovered
                ? 'bg-gradient-to-b from-[#25331D] to-[#0D120B] border-[#F5CE68] shadow-[0_12px_32px_rgba(245,206,104,0.35)]'
                : isTargeted
                ? 'bg-gradient-to-b from-[#1E2918]/95 to-[#0D120B]/95 border-[#F5CE68]'
                : 'bg-[#0D120B]/90 border-[#E6B94D]/50'
            }`}
          >
            <span className="font-display text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase">
              BEZALEL INC
            </span>
            <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.16em] text-[#E6B94D] font-semibold">
              00 · Central Holding Hub
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // 4 OPERATING VENTURE SPOKE NODES
  return (
    <div
      style={{
        left: `${room.hotspot.x}%`,
        top: `${room.hotspot.y}%`,
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${
        isHovered || isSelected ? 'z-50' : 'z-30'
      }`}
      onClick={() => onSelect(room.id, true)}
      onMouseEnter={() => onHoverChange(room.id)}
      onMouseLeave={() => onHoverChange(null)}
    >
      <motion.div
        style={{ x: magX, y: magY, scale: magScale }}
        className="relative group cursor-pointer flex flex-col items-center will-change-transform"
      >
        {/* Expanding magnetic field ring when venture section is hovered */}
        <motion.span
          animate={
            isHovered && !prefersReducedMotion
              ? { scale: [1, 1.45, 1.2], opacity: [0.85, 0.2, 0.65] }
              : isSympatheticResonance && !prefersReducedMotion
              ? { scale: [1, 1.2, 1.05], opacity: [0.55, 0.2, 0.4] }
              : { scale: 1, opacity: isTargeted ? 0.85 : 0.45 }
          }
          transition={
            isHovered || isSympatheticResonance
              ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.25 }
          }
          className={`absolute -inset-2 rounded-full pointer-events-none ${
            isHovered
              ? 'border-2 border-[#F5CE68] bg-[#E6B94D]/30 shadow-[0_0_32px_rgba(245,206,104,0.8)]'
              : isTargeted
              ? 'border-2 border-[#F5CE68] bg-[#E6B94D]/25'
              : isConnectedActive
              ? 'border border-[#E6B94D]/75 bg-[#E6B94D]/10'
              : 'border border-white/25 bg-black/20'
          }`}
        />

        {/* Architectural badge node with room number */}
        <div
          className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono font-bold text-[10px] sm:text-[11px] shadow-[0_6px_20px_rgba(0,0,0,0.85)] transition-colors duration-200 ${
            isHovered
              ? 'bg-gradient-to-b from-[#FFF3B0] via-[#F5CE68] to-[#D4A017] text-[#141812] ring-2 ring-white font-extrabold shadow-[0_0_25px_rgba(245,206,104,0.75)]'
              : isTargeted
              ? 'bg-gradient-to-b from-[#F5CE68] to-[#D4A017] text-[#141812] ring-2 ring-[#FAF9F6] font-extrabold'
              : isConnectedActive
              ? 'bg-[#182212]/95 text-[#F5CE68] border border-[#E6B94D]'
              : 'bg-[#0D120B]/90 backdrop-blur-md text-white/95 border border-white/35'
          }`}
        >
          {room.roomNumber}
        </div>

        {/* Floating glass room plaque with miniature brand mark & role subtitle */}
        <div
          className={`mt-1.5 px-2.5 py-1 rounded-xl backdrop-blur-xl border transition-all duration-200 flex flex-col items-center ${
            isHovered
              ? 'bg-[#141812] text-[#FAF9F6] border-[#F5CE68] shadow-[0_12px_28px_rgba(245,206,104,0.35)] -translate-y-0.5'
              : isTargeted
              ? 'bg-[#141812]/95 text-[#FAF9F6] border-[#F5CE68] shadow-[0_8px_24px_rgba(0,0,0,0.85)] -translate-y-0.5'
              : isConnectedActive
              ? 'bg-[#0D120B]/90 text-white border-[#E6B94D]/60 shadow-[0_4px_16px_rgba(0,0,0,0.7)]'
              : 'bg-[#0D120B]/85 text-white/85 border-white/20'
          }`}
        >
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            {room.entity.logo && (
              <span className="w-3.5 h-3.5 rounded-full bg-white/95 flex items-center justify-center p-0.5 shrink-0">
                <img
                  src={room.entity.logo}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </span>
            )}
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-tight">
              {room.entity.shortName}
            </span>
          </div>
          <span className="hidden sm:block font-mono text-[8px] uppercase tracking-wider text-[#A3B86C]">
            {room.id === 'olive-vine'
              ? 'Wellbeing Wing'
              : room.id === 'hur-on'
              ? 'Leadership Loft'
              : room.id === 'phroneo'
              ? 'Governance Suite'
              : 'Creative Studio'}
          </span>
        </div>
      </motion.div>

      {/* Sleek Non-Obstructive Micro-Preview Badge on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: openPopoverBelow ? -6 : 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openPopoverBelow ? -4 : 4, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`hidden sm:flex items-center gap-2.5 absolute ${
              openPopoverBelow ? 'top-full mt-2' : 'bottom-full mb-2'
            } left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-[#0D120B]/95 backdrop-blur-xl border border-[#F5CE68]/60 shadow-[0_14px_34px_rgba(0,0,0,0.9)] whitespace-nowrap pointer-events-none`}
          >
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#F5CE68] font-bold">
              {room.roomName}
            </span>
            {room.keyStats[0] && (
              <>
                <span className="text-white/30">·</span>
                <span className="font-mono text-[9.5px] text-white font-semibold tabular-nums">
                  {room.keyStats[0].value} {room.keyStats[0].label}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const EcosystemHouse: React.FC<EcosystemHouseProps> = ({
  onOpenInquiry,
  onSelectVentureBelow,
  externalSelectedVenture,
  className = '',
}) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [activeRoomId, setActiveRoomId] = useState<string>('bezalel');
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [isRoomZoomed, setIsRoomZoomed] = useState<boolean>(false);
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);
  const [cursorPct, setCursorPct] = useState<CursorPct | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const houseCanvasRef = useRef<HTMLDivElement>(null);

  // Sync with external venture selection (e.g. URL query param ?venture=...)
  useEffect(() => {
    if (externalSelectedVenture?.id) {
      const targetId =
        externalSelectedVenture.id === 'all' ? 'bezalel' : externalSelectedVenture.id;
      if (ORDERED_ROOM_IDS.includes(targetId)) {
        setActiveRoomId(targetId);
      }
    }
  }, [externalSelectedVenture]);

  // Ordered rooms matching logical value chain sequence (00 -> 01 -> 02 -> 03 -> 04)
  const orderedRooms = ORDERED_ROOM_IDS.map(
    (id) => HOUSE_ROOMS.find((r) => r.id === id)!
  ).filter(Boolean);

  // Smooth 2.5D perspective tilt springs driven by cursor position
  const tiltRotateX = useSpring(0, { stiffness: 150, damping: 24, mass: 0.8 });
  const tiltRotateY = useSpring(0, { stiffness: 150, damping: 24, mass: 0.8 });
  const overlayParallaxX = useSpring(0, { stiffness: 160, damping: 22, mass: 0.7 });
  const overlayParallaxY = useSpring(0, { stiffness: 160, damping: 22, mass: 0.7 });

  const activeRoom =
    HOUSE_ROOMS.find((r) => r.id === (hoveredRoomId || activeRoomId)) ||
    HOUSE_ROOMS.find((r) => r.id === 'bezalel') ||
    HOUSE_ROOMS[0];

  const isHubFocused = activeRoom.id === 'bezalel';

  // Auto-Tour timer cycling through rooms when enabled and not hovered
  useEffect(() => {
    if (!isAutoTouring || hoveredRoomId) return;
    const timer = setInterval(() => {
      setActiveRoomId((prev) => {
        const idx = ORDERED_ROOM_IDS.indexOf(prev);
        const nextIdx = (idx + 1) % ORDERED_ROOM_IDS.length;
        const nextId = ORDERED_ROOM_IDS[nextIdx];
        setIsRoomZoomed(nextId !== 'bezalel');
        return nextId;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, [isAutoTouring, hoveredRoomId]);

  const handleSelectRoom = (roomId: string, enableZoom = true) => {
    setIsAutoTouring(false);
    setActiveRoomId(roomId);
    if (roomId === 'bezalel') {
      setIsRoomZoomed(false);
    } else if (enableZoom) {
      setIsRoomZoomed(true);
    }
    onSelectVentureBelow?.(roomId === 'bezalel' ? 'all' : roomId);
  };

  const handleStepRoom = (delta: number) => {
    setIsAutoTouring(false);
    const currentIdx = ORDERED_ROOM_IDS.indexOf(activeRoom.id);
    const nextIdx = (currentIdx + delta + ORDERED_ROOM_IDS.length) % ORDERED_ROOM_IDS.length;
    const nextId = ORDERED_ROOM_IDS[nextIdx];
    setActiveRoomId(nextId);
    setIsRoomZoomed(nextId !== 'bezalel');
    onSelectVentureBelow?.(nextId === 'bezalel' ? 'all' : nextId);
  };

  const handleInspectBelow = (roomId: string) => {
    onSelectVentureBelow?.(roomId);
    const navSection = document.getElementById('interactive-ventures');
    if (navSection) {
      navSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDossier = (roomId: string) => {
    if (roomId === 'bezalel') {
      navigate('/story');
    } else if (onOpenInquiry) {
      onOpenInquiry(roomId);
    } else {
      handleInspectBelow(roomId);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!houseCanvasRef.current) return;
    const rect = houseCanvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPct({ x, y });

    if (!prefersReducedMotion) {
      const normX = (x - 50) / 50;
      const normY = (y - 50) / 50;
      tiltRotateY.set(normX * 1.8);
      tiltRotateX.set(-normY * 1.5);
      overlayParallaxX.set(normX * -4.5);
      overlayParallaxY.set(normY * -3.5);
    }
  };

  const handleCanvasMouseLeave = () => {
    setCursorPct(null);
    setHoveredRoomId(null);
    tiltRotateX.set(0);
    tiltRotateY.set(0);
    overlayParallaxX.set(0);
    overlayParallaxY.set(0);
  };

  // Compute smooth camera pan & zoom offset when focusing an individual wing
  const getCameraTransform = () => {
    if (prefersReducedMotion || !isRoomZoomed || isHubFocused) {
      return { scale: 1, x: '0%', y: '0%' };
    }
    const targetRoom = HOUSE_ROOMS.find((r) => r.id === activeRoom.id) || activeRoom;
    if (targetRoom.id === 'bezalel') {
      return { scale: 1, x: '0%', y: '0%' };
    }
    const offsetX = Math.max(-6.5, Math.min(6.5, (50 - targetRoom.hotspot.x) * 0.16));
    const offsetY = Math.max(-4.5, Math.min(4.5, (58 - targetRoom.hotspot.y) * 0.14));
    return {
      scale: 1.09,
      x: `${offsetX.toFixed(2)}%`,
      y: `${offsetY.toFixed(2)}%`,
    };
  };

  const cameraTransform = getCameraTransform();
  const activeStepIndex = ORDERED_ROOM_IDS.indexOf(activeRoom.id);

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-[#0D120B] text-white pt-14 sm:pt-20 pb-16 sm:pb-24 overflow-hidden select-none ${className}`}
    >
      {/* Cinematic ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(1200px circle at 50% 42%, rgba(230, 185, 77, 0.14) 0%, rgba(20, 30, 15, 0.38) 45%, #0D120B 85%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* =====================================================================
            TOP EDITORIAL ARCHITECTURAL HEADER + SPRING-ANIMATED VENTURE SWITCHER
        ====================================================================== */}
        <div className="space-y-5 pb-5 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E6B94D] uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5 text-[#E6B94D]" />
                <span>THE BEZALEL ECOSYSTEM HOUSE · HUB &amp; SPOKE ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-medium text-white tracking-tight">
                One Central Hearth. Four Connected Ventures.
              </h2>
              <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                Select any architectural wing below—or hover directly over the house—to illuminate its interior space, inspect its live dossier, and trace its ecosystem synergy.
              </p>
            </div>

            {/* Guided Tour & Camera Reset Controls */}
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end">
              <button
                type="button"
                onClick={() => {
                  const nextState = !isAutoTouring;
                  setIsAutoTouring(nextState);
                  if (nextState && activeRoomId === 'bezalel') {
                    setActiveRoomId('olive-vine');
                    setIsRoomZoomed(true);
                  }
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  isAutoTouring
                    ? 'bg-[#E6B94D] text-[#141812] border-[#F5CE68] font-bold shadow-[0_0_24px_rgba(230,185,77,0.4)]'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/85 border-white/15'
                }`}
              >
                {isAutoTouring ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Wing Tour</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#F5CE68]" />
                    <span>Auto-Tour Wings</span>
                  </>
                )}
              </button>

              {(isRoomZoomed || activeRoom.id !== 'bezalel') && (
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoTouring(false);
                    setActiveRoomId('bezalel');
                    setIsRoomZoomed(false);
                    onSelectVentureBelow?.('all');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E6B94D]/15 hover:bg-[#E6B94D]/25 border border-[#F5CE68]/40 text-xs font-mono text-[#F5CE68] transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Full House View</span>
                </button>
              )}
            </div>
          </div>

          {/* Shared-Layout Spring Segmented Control Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit">
            {orderedRooms.map((room) => {
              const isCurrent = activeRoom.id === room.id;
              const friendlyRole =
                room.id === 'bezalel'
                  ? '00 · All Ventures (Hub)'
                  : room.id === 'olive-vine'
                  ? '01 · Olive & Vine'
                  : room.id === 'hur-on'
                  ? '02 · HUR-ON Labs'
                  : room.id === 'mustard-seed'
                  ? '03 · Mustard Seed'
                  : '04 · Phroneo Suite';
              return (
                <button
                  key={`quick-btn-${room.id}`}
                  type="button"
                  onMouseEnter={() => setHoveredRoomId(room.id)}
                  onMouseLeave={() => setHoveredRoomId(null)}
                  onClick={() => {
                    handleSelectRoom(room.id, true);
                    onSelectVentureBelow?.(room.id === 'bezalel' ? 'all' : room.id);
                  }}
                  className={`relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isCurrent
                      ? 'text-[#141812] font-semibold'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {isCurrent && (
                    <motion.span
                      layoutId="ecosystemHouseActiveTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F5CE68] to-[#E6B94D] shadow-[0_4px_20px_rgba(230,185,77,0.35)]"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {room.entity.logo && (
                      <span className="w-4 h-4 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                        <img src={room.entity.logo} alt="" className="w-full h-full object-contain" />
                      </span>
                    )}
                    <span>{friendlyRole}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            HUB-AND-SPOKE ARCHITECTURAL HOUSE STAGE + SYNCHRONIZED DOSSIER DOCK
        ====================================================================== */}
        <div className="space-y-4">
          <div style={{ perspective: '1600px' }} className="w-full">
            <motion.div
              ref={houseCanvasRef}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
              style={{
                rotateX: tiltRotateX,
                rotateY: tiltRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative rounded-3xl overflow-hidden border border-[#E6B94D]/35 bg-[#090D07] shadow-[0_36px_110px_rgba(0,0,0,0.92)] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[1376/720] w-full group/house ring-1 ring-white/10 will-change-transform"
            >
              {/* Top-Left Live Wing Status HUD Overlay */}
              <div className="hidden sm:flex items-center justify-between inset-x-5 top-5 absolute z-40 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`hud-${activeRoom.id}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D120B]/85 backdrop-blur-xl border border-white/15 text-[11px] font-mono text-white/90 shadow-lg"
                  >
                    <span className="text-[#F5CE68] font-bold">
                      ROOM {activeRoom.roomNumber}
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="uppercase tracking-wider">{activeRoom.wing}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-[#A3B86C]">{activeRoom.valueChainStep}</span>
                  </motion.div>
                </AnimatePresence>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D120B]/80 backdrop-blur-xl border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70">
                  <span>Click any wing to focus</span>
                </div>
              </div>

              {/* Animated Camera Plane (House Image + SVG Conduits + Interactive Magnetic Nodes) */}
              <motion.div
                animate={{
                  scale: cameraTransform.scale,
                  x: cameraTransform.x,
                  y: cameraTransform.y,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.9 }}
                className="relative w-full h-full origin-center"
              >
                {/* Base House Photography */}
                <img
                  src="/assets/house/modern-ecosystem-house.jpg"
                  alt="The Bezalel Architectural Ecosystem House"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    !isHubFocused
                      ? 'brightness-[0.88] contrast-[1.08] saturate-[1.05]'
                      : 'brightness-[1.03] contrast-[1.04] saturate-[1.05]'
                  }`}
                />

                {/* Cinematic atmospheric depth & edge vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#090D07]/90 via-transparent to-[#090D07]/40" />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_95px_rgba(0,0,0,0.7)]" />

                {/* =================================================================
                    SVG LAYER: ROOM ILLUMINATION + CENTRAL HUB-AND-SPOKE CONDUIT NETWORK
                ================================================================== */}
                <svg
                  viewBox="0 0 1376 768"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 w-full h-full z-20 pointer-events-auto"
                >
                  <defs>
                    <filter id="naturalInteriorGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="12" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="goldConduitGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="activeRoomFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F5CE68" stopOpacity="0.34" />
                      <stop offset="100%" stopColor="#E6B94D" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="hubRoomFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F5CE68" stopOpacity="0.34" />
                      <stop offset="100%" stopColor="#D4A017" stopOpacity="0.12" />
                    </linearGradient>
                    <radialGradient id="centralHearthAura" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F5CE68" stopOpacity="0.45" />
                      <stop offset="55%" stopColor="#E6B94D" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="#E6B94D" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 1. ROOM WINDOW POLYGONS */}
                  {HOUSE_ROOMS.map((room) => {
                    const isRoomHub = room.id === 'bezalel';
                    const isDirectlyTargeted = activeRoom.id === room.id;
                    const isIlluminated = isDirectlyTargeted || isHubFocused;

                    return (
                      <g
                        key={`poly-${room.id}`}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => {
                          handleSelectRoom(room.id, true);
                          onSelectVentureBelow?.(room.id === 'bezalel' ? 'all' : room.id);
                        }}
                        onMouseEnter={() => setHoveredRoomId(room.id)}
                        onMouseLeave={() => setHoveredRoomId(null)}
                      >
                        <polygon
                          points={room.svgPolygon}
                          fill={
                            isDirectlyTargeted
                              ? isRoomHub
                                ? 'url(#hubRoomFill)'
                                : 'url(#activeRoomFill)'
                              : isHubFocused
                              ? 'rgba(245, 206, 104, 0.12)'
                              : 'rgba(10, 14, 8, 0.35)'
                          }
                          filter={isIlluminated ? 'url(#naturalInteriorGlow)' : undefined}
                          className="transition-all duration-500"
                        />

                        {/* Outer architectural glow frame */}
                        {isDirectlyTargeted && (
                          <polygon
                            points={room.svgPolygon}
                            fill="none"
                            stroke="rgba(245, 206, 104, 0.48)"
                            strokeWidth="6"
                            strokeLinejoin="round"
                            className="pointer-events-none transition-all duration-300"
                          />
                        )}

                        {/* Crisp window frame outline */}
                        <polygon
                          points={room.svgPolygon}
                          fill="transparent"
                          stroke={
                            isDirectlyTargeted
                              ? '#F5CE68'
                              : isHubFocused
                              ? 'rgba(230, 185, 77, 0.55)'
                              : 'rgba(255, 255, 255, 0.22)'
                          }
                          strokeWidth={isDirectlyTargeted ? '2.5' : isHubFocused ? '1.75' : '1'}
                          strokeDasharray={isDirectlyTargeted || isHubFocused ? 'none' : '5 5'}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}

                  {/* 2. CENTRAL HEARTH CONVERGENCE AURA AT BEZALEL INC (688, 546) */}
                  <g className="pointer-events-none">
                    <circle
                      cx="688"
                      cy="546"
                      r={hoveredRoomId === 'bezalel' ? '130' : isHubFocused ? '115' : '85'}
                      fill="url(#centralHearthAura)"
                      className="transition-all duration-500"
                    />
                    <circle
                      cx="688"
                      cy="546"
                      r="46"
                      fill="none"
                      stroke="#E6B94D"
                      strokeOpacity={isHubFocused ? '0.55' : '0.3'}
                      strokeWidth="1"
                      strokeDasharray="3 4"
                    />
                    <circle
                      cx="688"
                      cy="546"
                      r="66"
                      fill="none"
                      stroke="#E6B94D"
                      strokeOpacity={isHubFocused ? '0.35' : '0.18'}
                      strokeWidth="1"
                    />
                  </g>

                  {/* 3. HUB-AND-SPOKE ARTERIAL CONDUITS + ARCHITECTURAL DATA STREAM LABELS */}
                  {HOUSE_ROOMS.filter((r) => r.id !== 'bezalel').map((room) => {
                    const isSpokeHovered = hoveredRoomId === room.id;
                    const isSpokeSelected = activeRoom.id === room.id;
                    const isSpokeHighlighted = isHubFocused || isSpokeSelected;
                    const targetX = (room.hotspot.x / 100) * 1376;
                    const targetY = (room.hotspot.y / 100) * 768;
                    const mid = getConduitMidpoint(room.id);

                    return (
                      <g key={`spoke-${room.id}`} className="pointer-events-none">
                        {/* Soft ambient glow track */}
                        <path
                          d={room.conduitPath}
                          fill="none"
                          stroke="#F5CE68"
                          strokeWidth={isSpokeHovered || isSpokeSelected ? '8' : isSpokeHighlighted ? '6' : '2'}
                          strokeOpacity={isSpokeHovered || isSpokeSelected ? 0.36 : isSpokeHighlighted ? 0.22 : 0.06}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />

                        {/* Main architectural gold conduit line */}
                        <path
                          d={room.conduitPath}
                          fill="none"
                          stroke={isSpokeHighlighted ? '#F5CE68' : 'rgba(230, 185, 77, 0.35)'}
                          strokeWidth={isSpokeHovered || isSpokeSelected ? '2.75' : isSpokeHighlighted ? '2.25' : '1.25'}
                          strokeDasharray={isSpokeHighlighted ? 'none' : '6 6'}
                          filter={isSpokeHighlighted ? 'url(#goldConduitGlow)' : undefined}
                          className="transition-all duration-500"
                        />

                        {/* Conduit Stream Callout Pill on Active / Hovered Spoke */}
                        {(isSpokeHovered || (isSpokeSelected && !isHubFocused)) && (
                          <g transform={`translate(${mid.x}, ${mid.y})`}>
                            <rect
                              x="-92"
                              y="-12"
                              width="184"
                              height="24"
                              rx="12"
                              fill="#0D120B"
                              fillOpacity="0.92"
                              stroke="#F5CE68"
                              strokeWidth="1"
                            />
                            <text
                              x="0"
                              y="3.5"
                              textAnchor="middle"
                              fill="#F5CE68"
                              fontSize="9.5"
                              fontFamily="monospace"
                              fontWeight="bold"
                              letterSpacing="1.2"
                            >
                              {getConduitStreamLabel(room.id)}
                            </text>
                          </g>
                        )}

                        {/* Terminal magnetic capture ring at the venture end */}
                        <circle
                          cx={targetX}
                          cy={targetY}
                          r={isSpokeHovered || isSpokeSelected ? '26' : isSpokeHighlighted ? '18' : '12'}
                          fill={isSpokeHovered || isSpokeSelected ? 'rgba(245, 206, 104, 0.14)' : 'none'}
                          stroke="#F5CE68"
                          strokeOpacity={isSpokeHovered || isSpokeSelected ? 0.85 : isSpokeHighlighted ? 0.5 : 0.2}
                          strokeWidth={isSpokeHovered || isSpokeSelected ? '1.75' : '1.25'}
                          className="transition-all duration-300"
                        />

                        {/* Animated pulse particle flowing OUT from Bezalel Hub -> Venture */}
                        {isSpokeHighlighted && !prefersReducedMotion && (
                          <>
                            <circle r={isSpokeHovered || isSpokeSelected ? '5' : '4'} fill="#FFF8DC" filter="url(#goldConduitGlow)">
                              <animateMotion
                                dur={isSpokeHovered || isSpokeSelected ? '2.0s' : '2.8s'}
                                repeatCount="indefinite"
                                path={room.conduitPath}
                                keyPoints="0;1"
                                keyTimes="0;1"
                                calcMode="spline"
                                keySplines="0.4 0 0.2 1"
                              />
                            </circle>
                            {/* Return pulse flowing BACK from Venture -> Bezalel Hub */}
                            <circle r={isSpokeHovered || isSpokeSelected ? '4' : '3'} fill="#E6B94D" opacity="0.85">
                              <animateMotion
                                dur={isSpokeHovered || isSpokeSelected ? '2.0s' : '2.8s'}
                                begin={isSpokeHovered || isSpokeSelected ? '1.0s' : '1.4s'}
                                repeatCount="indefinite"
                                path={room.conduitPath}
                                keyPoints="1;0"
                                keyTimes="0;1"
                                calcMode="spline"
                                keySplines="0.4 0 0.2 1"
                              />
                            </circle>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* =================================================================
                    INTERACTIVE MAGNETIC ARCHITECTURAL NODES (WITH COUNTER-PARALLAX DEPTH)
                ================================================================== */}
                <motion.div
                  style={{ x: overlayParallaxX, y: overlayParallaxY }}
                  className="absolute inset-0 pointer-events-none z-30"
                >
                  {HOUSE_ROOMS.map((room) => (
                    <MagneticHouseNode
                      key={`pin-${room.id}`}
                      room={room}
                      isSelected={activeRoom.id === room.id}
                      isHovered={hoveredRoomId === room.id}
                      isHubFocused={isHubFocused}
                      hoveredRoomId={hoveredRoomId}
                      cursorPct={cursorPct}
                      prefersReducedMotion={prefersReducedMotion}
                      onSelect={(id, zoom) => {
                        handleSelectRoom(id, zoom);
                        onSelectVentureBelow?.(id === 'bezalel' ? 'all' : id);
                      }}
                      onHoverChange={setHoveredRoomId}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* =====================================================================
              SYNCHRONIZED ARCHITECTURAL DOSSIER & SYNERGY DECK (DESKTOP + MOBILE)
              Completes the interaction loop with live animated room specs & metrics
          ====================================================================== */}
          <div className="rounded-3xl bg-gradient-to-b from-[#151E11] to-[#0F160C] border border-[#E6B94D]/30 shadow-[0_24px_60px_rgba(0,0,0,0.65)] p-5 sm:p-7 lg:p-8 relative overflow-hidden">
            {/* Subtle top gold hairline accent */}
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5CE68]/60 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`dossier-${activeRoom.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
              >
                {/* LEFT 5 COLS: Architectural Identity, Metaphor & Stepper */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#F5CE68]">
                      <span>ROOM {activeRoom.roomNumber} · {activeRoom.roomName}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-[#A3B86C]">{activeRoom.dimensions.split('·')[0].trim()}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {activeRoom.entity.logo && (
                        <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-md">
                          <img
                            src={activeRoom.entity.logo}
                            alt={activeRoom.entity.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-medium text-white tracking-tight">
                          {activeRoom.entity.name}
                        </h3>
                        <p className="font-mono text-[11px] text-[#A3B86C] uppercase tracking-wider">
                          {activeRoom.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed pt-1">
                      {activeRoom.architecturalMetaphor}
                    </p>
                  </div>

                  {/* Synergy Flow Callout Line */}
                  <div className="pt-3 border-t border-white/10 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#E6B94D] font-semibold">
                      Ecosystem Value-Chain Role · {activeRoom.valueChainStep}
                    </div>
                    <p className="text-xs text-white/75 leading-relaxed">
                      {activeRoom.synergyConnection}
                    </p>
                  </div>
                </div>

                {/* MIDDLE 4 COLS: 3 Tabular Key Metrics + Interior Highlights */}
                <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-r border-white/10 lg:px-6">
                  <div className="grid grid-cols-3 gap-3">
                    {activeRoom.keyStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
                      >
                        <span className="font-display text-lg sm:text-xl font-semibold text-[#F5CE68] tabular-nums leading-tight">
                          {stat.value}
                        </span>
                        <span className="font-sans text-[11px] font-medium text-white/90 mt-1 leading-tight">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/55">
                      Architectural Wing Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {activeRoom.interiorHighlights.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-white/80 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B86C] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* RIGHT 3 COLS: Wing Navigation Stepper + Direct Action CTAs */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4">
                  {/* Wing Sequence Stepper */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <button
                      type="button"
                      onClick={() => handleStepRoom(-1)}
                      aria-label="Previous architectural wing"
                      className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#E6B94D] text-white hover:text-[#141812] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="text-center">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[#F5CE68] font-bold tabular-nums">
                        WING 0{activeStepIndex} OF 04
                      </div>
                      <div className="text-[11px] text-white/70">
                        {activeRoom.wing}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleStepRoom(1)}
                      aria-label="Next architectural wing"
                      className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#E6B94D] text-white hover:text-[#141812] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Primary & Secondary Wing CTAs */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleOpenDossier(activeRoom.id)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#E6B94D] hover:bg-[#F5CE68] text-[#141812] text-xs font-semibold transition-all cursor-pointer shadow-md"
                    >
                      <span>
                        {activeRoom.id === 'bezalel'
                          ? 'Explore Group Story'
                          : `Inquire With ${activeRoom.entity.shortName}`}
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleInspectBelow(activeRoom.id === 'bezalel' ? 'all' : activeRoom.id)
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/90 border border-white/15 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <span>Inspect Capabilities Below</span>
                      <ArrowDownRight className="w-3.5 h-3.5 text-[#A3B86C]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemHouse;
