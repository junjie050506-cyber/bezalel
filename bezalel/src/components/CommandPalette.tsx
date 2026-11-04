import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Building2,
  Sparkles,
  Compass,
  ArrowUpRight,
  MessageSquare,
  CornerDownLeft,
  X,
} from 'lucide-react';
import { HOUSE_ROOMS } from '../data/houseRoomsData';
import { SERVICE_CATALOG } from './InteractiveVenturesSection';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (businessId?: string, serviceTitle?: string) => void;
}

interface CommandItem {
  id: string;
  group: 'Operating Ventures' | 'Specialised Capabilities' | 'Pages & Actions';
  title: string;
  subtitle: string;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Cmd+K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const allItems = useMemo<CommandItem[]>(() => {
    const ventureItems: CommandItem[] = HOUSE_ROOMS.map((room) => ({
      id: `venture-${room.id}`,
      group: 'Operating Ventures',
      title: `${room.roomNumber} · ${room.entity.name}`,
      subtitle: `${room.roomName} — ${room.entity.tagline}`,
      badge: room.id === 'bezalel' ? 'Central Hub' : `Room ${room.roomNumber}`,
      action: () => {
        onClose();
        if (room.id === 'bezalel') {
          navigate('/ecosystem');
        } else {
          navigate(`/ecosystem?venture=${room.id}#interactive-ventures`);
        }
      },
    }));

    const capabilityItems: CommandItem[] = SERVICE_CATALOG.map((srv) => ({
      id: `srv-${srv.id}`,
      group: 'Specialised Capabilities',
      title: srv.title,
      subtitle: srv.desc,
      badge: srv.tag,
      action: () => {
        onClose();
        navigate(`/ecosystem?venture=${srv.companyId}#interactive-ventures`);
      },
    }));

    const pageItems: CommandItem[] = [
      {
        id: 'act-consult',
        group: 'Pages & Actions',
        title: 'Book a Free Executive Consultation',
        subtitle: 'Connect directly with the Bezalel Secretariat or any specialist venture',
        badge: 'Concierge',
        action: () => {
          onClose();
          onOpenInquiry();
        },
      },
      {
        id: 'page-ecosystem',
        group: 'Pages & Actions',
        title: 'The Bezalel Ecosystem House',
        subtitle: 'Interactive hub-and-spoke architectural visualization & service navigator',
        badge: 'Architecture',
        action: () => {
          onClose();
          navigate('/ecosystem');
        },
      },
      {
        id: 'page-story',
        group: 'Pages & Actions',
        title: 'Our Story & Biblical Stewardship Ethos',
        subtitle: '18 years of building people, strengthening enterprise, and multiplying opportunity',
        badge: 'Heritage',
        action: () => {
          onClose();
          navigate('/story');
        },
      },
      {
        id: 'page-impact',
        group: 'Pages & Actions',
        title: 'Social & Economic Impact',
        subtitle: 'RM1.7M+ project execution and regional transformation metrics',
        badge: 'Impact',
        action: () => {
          onClose();
          navigate('/impact');
        },
      },
      {
        id: 'page-leadership',
        group: 'Pages & Actions',
        title: 'Leadership & Group Governance',
        subtitle: 'Meet the founders, principals, and practice leads across Bezalel Inc',
        badge: 'Team',
        action: () => {
          onClose();
          navigate('/leadership');
        },
      },
      {
        id: 'page-clients',
        group: 'Pages & Actions',
        title: '24 Selected Organisations & Client Roster',
        subtitle: '14 international school campuses and 10 multinational / public-listed corporates',
        badge: 'Clients',
        action: () => {
          onClose();
          navigate('/clients');
        },
      },
    ];

    return [...ventureItems, ...pageItems, ...capabilityItems];
  }, [navigate, onClose, onOpenInquiry]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 11);
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [allItems, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filteredItems[activeIndex]?.action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[140] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0D120B]/75 backdrop-blur-md"
          />

          {/* Command Palette Modal */}
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleListKeyDown}
            className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#141A11] text-[#FAF9F6] border border-[#E6B94D]/35 shadow-[0_32px_90px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#0D120B]/60">
              <Search className="w-4 h-4 text-[#E6B94D] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to any venture, capability (e.g. ESOP, HRD Corp, Therapy), or page..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-hidden font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs text-white/50 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg bg-white/8 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[62vh] overflow-y-auto p-2.5 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-3">
                  <p className="text-sm text-white/65">
                    No matching ventures or capabilities found for &ldquo;{query}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenInquiry();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6B94D] text-[#141812] text-xs font-semibold cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask our Secretariat directly</span>
                  </button>
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  const showGroupHeader =
                    idx === 0 || filteredItems[idx - 1].group !== item.group;

                  return (
                    <React.Fragment key={item.id}>
                      {showGroupHeader && (
                        <div className="px-3 pt-2.5 pb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#A3B86C] font-bold">
                          {item.group}
                        </div>
                      )}
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={item.action}
                        className={`w-full text-left px-3.5 py-2.5 rounded-2xl transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                          isActive
                            ? 'bg-[#25311C] border border-[#E6B94D]/40 text-white'
                            : 'border border-transparent text-white/80 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                              isActive
                                ? 'bg-[#E6B94D] text-[#141812]'
                                : 'bg-white/8 text-[#E6B94D]'
                            }`}
                          >
                            {item.group === 'Operating Ventures' ? (
                              <Building2 className="w-4 h-4" />
                            ) : item.group === 'Specialised Capabilities' ? (
                              <Sparkles className="w-4 h-4" />
                            ) : (
                              <Compass className="w-4 h-4" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-display text-sm font-medium text-white truncate">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[#F5CE68] font-mono text-[9px] uppercase tracking-wider shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/60 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono text-[#E6B94D]">
                          {isActive ? (
                            <CornerDownLeft className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                          )}
                        </div>
                      </button>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* Footer Keyboard Hints */}
            <div className="px-5 py-2.5 bg-[#0D120B] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
              </div>
              <span className="text-[#A3B86C]">BEZALEL INC · Quick Navigator</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
