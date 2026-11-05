import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react';

interface FooterProps {
  onOpenInquiry: (businessId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="w-full text-[#FAF9F6] transition-colors duration-500 relative overflow-hidden border-t border-[#405329]"
    >
      {/* Full True-Color Embossed Z Monogram Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/bezalel-monogram-pattern.jpg')`,
          backgroundSize: '560px auto',
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Brand Header: Logo & Quick Inquiry Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Return to BEZALEL INC Homepage Top"
          >
            <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-low group-hover:scale-105 transition-transform">
              <img
                src="/assets/bezalel-logo.png"
                alt="BEZALEL INC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-sans text-h3 font-semibold tracking-[0.12em] uppercase text-white block">
                BEZALEL INC.
              </span>
              <span className="font-mono text-caption text-[#E4E9DC] tracking-wider uppercase block mt-1">
                Equip People · Strengthen Enterprise · Multiply Opportunity
              </span>
            </div>
          </Link>

          {/* Quick Partnership Inquiry Button (8px radius) */}
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-[#405329] text-[#141812] hover:text-white text-caption font-medium tracking-wider uppercase transition-all shadow-low cursor-pointer"
          >
            <span>Book a free consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Body: 3 Navigation Columns on Left + Conversion Trigger on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: 3 Clean Vertical Columns of Directory Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Column 1: Website Directory */}
            <div className="space-y-2">
              <span className="font-mono text-caption font-medium uppercase tracking-[0.12em] text-[#E4E9DC] block">
                Directory
              </span>
              <ul className="space-y-2 text-[#FAF9F6]/90 text-caption">
                <li>
                  <Link to="/" className="hover:text-[#E6B94D] transition-colors block">
                    Home & Overview
                  </Link>
                </li>
                <li>
                  <Link to="/ecosystem" className="hover:text-[#E6B94D] transition-colors block">
                    Specialised Ecosystem
                  </Link>
                </li>
                <li>
                  <Link to="/story" className="hover:text-[#E6B94D] transition-colors block">
                    Our Story & Ethos
                  </Link>
                </li>
                <li>
                  <Link to="/impact" className="hover:text-[#E6B94D] transition-colors block">
                    Social & Economic Impact
                  </Link>
                </li>
                <li>
                  <Link to="/leadership" className="hover:text-[#E6B94D] transition-colors block">
                    Leadership & Governance
                  </Link>
                </li>
                <li>
                  <Link to="/clients" className="hover:text-[#E6B94D] transition-colors block">
                    Selected Clients
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: 4 Operating Businesses */}
            <div className="space-y-2">
              <span className="font-mono text-caption font-medium uppercase tracking-[0.12em] text-[#E4E9DC] block">
                Operating Ventures
              </span>
              <ul className="space-y-2 text-[#FAF9F6]/90 text-caption">
                <li>
                  <Link to="/ecosystem?venture=olive-vine" className="hover:text-[#E6B94D] transition-colors inline-flex items-center gap-1 text-left group">
                    <span>Olive & Vine</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/ecosystem?venture=hur-on" className="hover:text-[#E6B94D] transition-colors inline-flex items-center gap-1 text-left group">
                    <span>HUR-ON Training</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/ecosystem?venture=mustard-seed" className="hover:text-[#E6B94D] transition-colors inline-flex items-center gap-1 text-left group">
                    <span>Mustard Seed & Co</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/ecosystem?venture=phroneo" className="hover:text-[#E6B94D] transition-colors inline-flex items-center gap-1 text-left group">
                    <span>Phroneo BoardSuite</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Connect & Secretariat */}
            <div className="space-y-2">
              <span className="font-mono text-caption font-medium uppercase tracking-[0.12em] text-[#E4E9DC] block">
                Secretariat
              </span>
              <ul className="space-y-2 text-[#FAF9F6]/90 text-caption">
                <li>
                  <span className="block text-[#FAF9F6]/80">Kuala Lumpur, Malaysia</span>
                </li>
                <li>
                  <a
                    href="mailto:contact@bezalelinc.com"
                    className="hover:text-[#E6B94D] transition-colors block"
                  >
                    contact@bezalelinc.com
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry()}
                    className="hover:text-[#E6B94D] transition-colors block text-left cursor-pointer"
                  >
                    Partner Inquiries
                  </button>
                </li>
                <li>
                  <span className="block text-[#FAF9F6]/75">Companies Act 2016</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right 5 Columns: Conversion Trigger */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end text-left lg:text-right space-y-3 pt-4 lg:pt-0">
            <span
              style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.35rem)' }}
              className="font-mono font-semibold tracking-[0.14em] uppercase text-[#E4E9DC] block"
            >
              GOT A PROJECT IN MIND?
            </span>
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              style={{ fontSize: 'clamp(3.25rem, 5.5vw, 5.25rem)', lineHeight: 1 }}
              className="group inline-flex items-center gap-3 sm:gap-4 font-sans font-bold text-white hover:text-[#E6B94D] tracking-tight text-left lg:text-right cursor-pointer transition-colors duration-300 relative pb-2"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="my-8 sm:my-12 border-b border-white/15" />

        {/* Bottom Area: Legal Links on Left, Social Icons on Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-caption text-[#FAF9F6]/80">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-6">
              <span className="hover:text-white transition-colors cursor-default">
                Cookies Policy
              </span>
              <span className="hover:text-white transition-colors cursor-default">
                Legal Terms
              </span>
              <span className="hover:text-white transition-colors cursor-default">
                Privacy Policy
              </span>
              <span className="font-mono text-caption text-[#FAF9F6]/70">
                © 2026 BEZALEL INC All Rights Reserved.
              </span>
            </div>

            {/* Back to top */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Return to top"
                className="w-10 h-10 rounded-lg bg-white hover:bg-[#405329] text-[#141812] hover:text-white flex items-center justify-center shadow-low transition-all cursor-pointer shrink-0"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
