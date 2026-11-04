import React from 'react';
import { Check, X, ShieldCheck, ArrowRight } from 'lucide-react';

export interface FragmentationMatrixTableProps {
  onOpenInquiry?: (tier?: string) => void;
  onExploreEcosystem?: () => void;
}

interface ComparisonRow {
  title: string;
  subtitle: string;
  col1: boolean;
  col2: boolean;
  col3: boolean;
}

export const FragmentationMatrixTable: React.FC<FragmentationMatrixTableProps> = ({
  onOpenInquiry,
  onExploreEcosystem,
}) => {
  const comparisonRows: ComparisonRow[] = [
    {
      title: '01 · Statutory Fiduciary Rigor (Phroneo BoardSuite)',
      subtitle: 'Corporate secretarial, statutory compliance & governance foundations',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: '02 · Executive Team Alignment (HUR-ON Corporate Labs)',
      subtitle: 'HRD Corp-accredited corporate masterclasses & executive development',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: '03 · Inner Person Wholeness (Olive & Vine)',
      subtitle: 'Psychotherapy, relational wellbeing & executive mental resilience',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: '04 · Commercial Brand Acceleration (Mustard Seed & Co)',
      subtitle: 'Branding, advertising, digital marketing & commercial strategy',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: 'Fiduciary Blind Spots Safeguard (Phroneo BoardSuite)',
      subtitle: 'Statutory filings handled with strategic board alignment',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: 'Human Capital Burnout Protection (Olive & Vine & HUR-ON)',
      subtitle: 'Teams trained for performance while personal emotional health is secured',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: 'Market Dissonance Safeguard (Mustard Seed & Co)',
      subtitle: 'Commercial marketing that internal operations can actually sustain',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: 'Cross-Practice Diagnostic & Coordination (Bezalel Inc Ecosystem)',
      subtitle: 'Integrated quarterly alignment ensuring external growth never outpaces internal integrity',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: 'Single Point of Fiduciary Accountability (Bezalel Inc Group)',
      subtitle: 'Established 2008 · Direct entity alignment',
      col1: false,
      col2: false,
      col3: true,
    },
  ];

  const renderStatus = (val: boolean) => {
    if (val) {
      return (
        <div className="flex items-center justify-center">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F4F6F0] text-[#15803D] shadow-low border border-[#15803D]/25"
            title="Included in Bezalel Standard"
            aria-label="Supported"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F4F1EA] text-[#5A6255] border border-[#141812]/12"
          title="Not supported / fragmented"
          aria-label="Not supported"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* =====================================================================
          FLOATING WHITE MASTER COMPARISON CARD (16px Container Radius)
      ====================================================================== */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-high border border-[#141812]/12 text-[#141812] overflow-hidden">
        
        {/* =====================================================================
            CATEGORY TITLE & SUBTITLE (8px heading-to-body rhythm)
        ====================================================================== */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#405329]" />
            <span className="type-kicker text-[#405329]">
              THE BEZALEL ECOSYSTEM STANDARD
            </span>
          </div>
          <h3 className="text-h2 font-semibold text-[#141812] mb-2">
            One integrated ecosystem. Four specialized disciplines.
          </h3>
          <p className="text-body text-[#42493E] max-w-3xl">
            Bezalel Inc connects statutory governance, executive leadership labs, inner person wholeness, and brand scale under one enduring biblical standard—ensuring external growth never outpaces internal integrity.
          </p>
        </div>

        {/* =====================================================================
            COMPARISON MATRIX TABLE
        ====================================================================== */}
        <div className="overflow-x-auto -mx-6 sm:-mx-8 lg:-mx-12 mt-6">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-[#141812]/12 bg-[#FAF9F6] text-caption font-mono text-[#42493E] uppercase tracking-wider">
                <th className="py-4 px-6 sm:px-8 lg:px-12 w-[42%] font-semibold text-[#141812] align-middle">
                  Operating Discipline & Diagnostic
                </th>
                <th className="py-4 px-4 text-center w-[19.33%] align-middle">
                  <span className="font-mono text-caption uppercase tracking-wider text-[#42493E]">
                    Individual Agencies & Firms
                  </span>
                </th>
                <th className="py-4 px-4 text-center w-[19.33%] align-middle">
                  <div className="flex items-center justify-center">
                    <div className="h-14 sm:h-16 w-full max-w-[136px] px-3 py-2 bg-white rounded-xl border border-[#141812]/12 flex items-center justify-center shadow-low hover:border-[#2D3A1E]/24 transition-colors">
                      <img
                        src="/assets/logos/big-four.png"
                        alt="Big-4 Consulting Firms (KPMG, PwC, EY, Deloitte)"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </th>
                <th className="py-4 px-4 text-center w-[19.33%] bg-[#F4F6F0] align-middle">
                  <div className="flex items-center justify-center">
                    <div className="h-14 sm:h-16 w-full max-w-[136px] px-3 py-2 bg-white rounded-xl border border-[#405329]/24 flex items-center justify-center shadow-low hover:border-[#405329]/40 transition-colors">
                      <img
                        src="/assets/bezalel-logo.png"
                        alt="Bezalel Inc Ecosystem"
                        className="h-full w-auto max-w-full object-contain"
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="group border-b border-[#141812]/12 hover:bg-[#FAF9F6] transition-all duration-200 cursor-default"
                >
                  {/* Feature Title and Subtitle */}
                  <td className="py-4 px-6 sm:px-8 lg:px-12 w-[42%] transition-transform duration-200 group-hover:translate-x-1">
                    <div className="font-sans font-semibold text-body text-[#141812] group-hover:text-[#2D3A1E] transition-colors flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#405329] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      <span>{row.title}</span>
                    </div>
                    <div className="font-sans text-caption text-[#42493E] pt-1 pl-4">
                      {row.subtitle}
                    </div>
                  </td>

                  {/* Column 1: Disconnected Providers */}
                  <td className="py-4 px-4 text-center w-[19.33%]">
                    {renderStatus(row.col1)}
                  </td>

                  {/* Column 2: Consulting Big-4 */}
                  <td className="py-4 px-4 text-center w-[19.33%]">
                    {renderStatus(row.col2)}
                  </td>

                  {/* Column 3: The Bezalel Standard */}
                  <td className="py-4 px-4 text-center w-[19.33%] bg-[#F4F6F0]/60 group-hover:bg-[#E4E9DC]/60 transition-colors">
                    <div className="group-hover:scale-105 transition-transform duration-200">
                      {renderStatus(row.col3)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* =====================================================================
            BOTTOM SUMMARY FOOTER (8pt spacing & 8px interactive button radii)
        ====================================================================== */}
        <div className="pt-6 mt-6 border-t border-[#141812]/12 flex flex-col sm:flex-row items-center justify-end gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExploreEcosystem}
              className="px-4 py-2 rounded-lg border border-[#2D3A1E]/24 text-caption font-medium uppercase tracking-wider text-[#2D3A1E] hover:bg-[#F4F6F0] transition-colors cursor-pointer"
            >
              Explore 4 Disciplines
            </button>
            <button
              type="button"
              onClick={() => onOpenInquiry?.('Full Ecosystem')}
              className="px-6 py-2 rounded-lg bg-[#2D3A1E] hover:bg-[#405329] text-white text-caption font-medium uppercase tracking-wider transition-colors cursor-pointer shadow-low flex items-center gap-2"
            >
              <span>Book a free consultation</span>
              <ArrowRight className="w-4 h-4 text-[#E4E9DC]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
