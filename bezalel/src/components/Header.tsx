import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: (businessId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isDarkHero =
    (location.pathname === '/' ||
      location.pathname === '/ecosystem' ||
      location.pathname === '/start' ||
      location.pathname === '/story' ||
      location.pathname === '/contact' ||
      location.pathname === '/inquire') &&
    !isScrolled;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Ecosystem', path: '/ecosystem' },
    { label: 'Our Story', path: '/story' },
    { label: 'Impact', path: '/impact' },
    { label: 'Leadership', path: '/leadership' },
    { label: 'Clients', path: '/clients' },
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: location.pathname === '/' ? 'smooth' : 'instant' });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 20);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 w-full max-w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-xl backdrop-saturate-150 border-[#141812]/12 shadow-mid'
            : 'bg-transparent border-transparent shadow-none'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 relative flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 shrink-0 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2D3A1E] rounded-lg py-1 cursor-pointer"
            aria-label="Return to BEZALEL INC Homepage Top"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-[#141812]/12 p-1 flex items-center justify-center shadow-low group-hover:border-[#2D3A1E]/25 transition-colors">
              <img
                src="/assets/aistudio/BEZALEL_INC_LOGO_2_6ad1ecfe.png"
                alt="BEZALEL INC Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className={`font-sans text-h3 tracking-[0.12em] font-semibold uppercase whitespace-nowrap shrink-0 transition-colors ${
                isDarkHero ? 'text-white' : 'text-[#141812]'
              }`}
            >
              BEZALEL INC.
            </span>
          </Link>

          {/* Zone 2: Adaptive Navigation Bar */}
          <div className="hidden lg:flex items-center justify-center z-30">
            <nav
              aria-label="Main Navigation"
              className={`relative flex items-center gap-1 p-1 rounded-full backdrop-blur-xl transition-all duration-300 whitespace-nowrap ${
                isDarkHero
                  ? 'bg-white/10 border border-white/15'
                  : isScrolled
                    ? 'bg-[#FAF9F6]/90 border border-[#141812]/12'
                    : 'bg-white/95 border border-[#141812]/12 shadow-low'
              }`}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 text-caption font-medium transition-all duration-200 rounded-full whitespace-nowrap shrink-0 ${
                      isActive
                        ? isDarkHero
                          ? 'text-[#141812] bg-white font-semibold shadow-low'
                          : 'text-white bg-[#2D3A1E] font-semibold shadow-low'
                        : isDarkHero
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-[#42493E] hover:text-[#141812] hover:bg-[#141812]/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Zone 3: Always-Visible Primary Action on Right */}
          <div className="flex items-center gap-2 shrink-0 z-30">
            <div className="hidden sm:flex items-center shrink-0">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="bg-[#2D3A1E] hover:bg-[#405329] text-white pl-4 pr-2 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-low hover:shadow-mid group cursor-pointer whitespace-nowrap border border-[#405329]/40"
                aria-label="Free Consultation Inquiry"
              >
                <span className="text-caption font-medium whitespace-nowrap text-[#FAF9F6]">
                  Free Consultation
                </span>
                <div className="w-6 h-6 rounded-full bg-[#E6B94D] text-[#141812] flex items-center justify-center font-bold shadow-low shrink-0 transition-transform group-hover:scale-105">
                  <ArrowUpRight className="w-4 h-4 text-[#141812]" />
                </div>
              </button>
            </div>

            {/* Mobile Menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkHero
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#141812] hover:bg-[#141812]/5'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden w-full max-w-full overflow-hidden bg-[#F4F1EA] border-b border-[#141812]/12 shadow-mid"
            >
              <nav className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-body py-2 px-4 rounded-lg transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#2D3A1E] text-white font-semibold'
                          : 'text-[#141812] hover:text-[#2D3A1E] hover:bg-[#E4E9DC]'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                  </NavLink>
                ))}

                <div className="pt-3 mt-2 border-t border-[#141812]/12 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInquiry();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-caption font-medium uppercase text-white bg-[#2D3A1E] hover:bg-[#405329] rounded-lg cursor-pointer transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Book a free consultation</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
