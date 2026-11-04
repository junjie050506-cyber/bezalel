import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CLIENT_PARTNERS,
} from '../data/ecosystemData';
import {
  ScrollManifestoReveal,
} from '../components/ScrollytellingSections';
import { FragmentationMatrixTable } from '../components/FragmentationMatrixTable';
import { BusinessGraphicArt } from '../components/EcosystemGraphics';
import { ScrollReveal } from '../components/MotionContainer';
import { FaqSection } from '../components/FaqSection';
import { SeamlessVideoBackground } from '../components/SeamlessVideoBackground';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

interface HomePageProps {
  onOpenInquiry: (businessId?: string, audience?: string) => void;
}

const parseMetricValue = (val: string) => {
  const match = val.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: val, padZero: false, minDigits: 0, isDecimal: false };
  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const isDecimal = numStr.includes('.');
  const padZero = !isDecimal && numStr.length > 1 && numStr.startsWith('0');
  const number = parseFloat(numStr);
  return { prefix, number, suffix, padZero, minDigits: numStr.length, isDecimal };
};

const AnimatedMetricNumber: React.FC<{ value: string; inView: boolean; delay?: number }> = ({
  value,
  inView,
  delay = 0,
}) => {
  const { prefix, number: target, suffix, padZero, minDigits, isDecimal } = useMemo(
    () => parseMetricValue(value),
    [value]
  );
  const [displayNum, setDisplayNum] = useState<number>(0);

  useEffect(() => {
    if (!inView) {
      setDisplayNum(0);
      return;
    }

    let startTime: number | null = null;
    let animId: number;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    const duration = 2000;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const current = isDecimal
        ? parseFloat((eased * target).toFixed(1))
        : Math.round(eased * target);
      setDisplayNum(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    if (delay > 0) {
      delayTimer = setTimeout(() => {
        animId = requestAnimationFrame(step);
      }, delay);
    } else {
      animId = requestAnimationFrame(step);
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      cancelAnimationFrame(animId);
    };
  }, [inView, target, isDecimal, delay]);

  const formattedNum = isDecimal
    ? displayNum.toFixed(1)
    : padZero
      ? String(displayNum).padStart(minDigits, '0')
      : String(displayNum);

  return (
    <span className="inline-flex items-baseline">
      {prefix && (
        <span className="text-[#405329] font-serif font-light text-xl sm:text-2xl mr-1 tracking-normal select-none">
          {prefix}
        </span>
      )}
      <span className="bg-gradient-to-br from-[#161F0E] via-[#2A361C] to-[#485B2F] bg-clip-text text-transparent">
        {formattedNum}
      </span>
      {suffix && (
        <span className="text-[#405329] font-serif font-light text-xl sm:text-2xl ml-0.5 tracking-normal select-none">
          {suffix}
        </span>
      )}
    </span>
  );
};

const HERO_METRICS = [
  {
    value: '2008',
    label: 'Year Established',
    detail: '18 Years of Stewardship',
    badge: '18 Yrs Active',
    hasPulse: true,
  },
  {
    value: '04',
    label: 'Specialised Businesses',
    detail: 'Four Ventures, One Purpose',
    badge: 'Ecosystem',
  },
  {
    value: 'RM1.7M',
    label: 'Early Project Scale',
    detail: 'Conference Operations',
    badge: 'Landmark',
  },
  {
    value: '24',
    label: 'Selected Organisations',
    detail: '14 Schools & 10 Corporates',
    badge: 'Partnerships',
  },
];

const PATHWAY_CARDS = [
  {
    id: 'hur-on',
    indexLabel: '01 · PEOPLE',
    accreditation: 'Learn. Relate. Grow.',
    shortName: 'HUR-ON',
    title: 'Powered by Relational Intelligence',
    description:
      'Developing people at every stage of life through SPARK (Youth), PULSE (Corporate), BLOOM (Seniors & Adults) and VERVE (Events & Camps).',
    impact: '4 Specialised Divisions: SPARK · PULSE · BLOOM · VERVE',
    ctaLabel: 'Explore HUR-ON',
  },
  {
    id: 'olive-vine',
    indexLabel: '02 · WELLBEING',
    accreditation: 'Care. Connect. Flourish.',
    shortName: 'Olive & Vine',
    title: 'Renew Hearts. Strengthen Relationships.',
    description:
      'Supporting children, young people, adults, parents and families through psychological and therapeutic care, emotional health and identity.',
    impact: 'Embedded psychological care adopted across 14 international school campuses.',
    ctaLabel: 'Explore Olive & Vine',
  },
  {
    id: 'mustard-seed',
    indexLabel: '03 · CREATIVE',
    accreditation: 'Plant. Nurture. Grow.',
    shortName: 'Mustard Seed & Co',
    title: 'Seed the Idea. Forest the Vision.',
    description:
      'Helping emerging and growing organisations clarify their position, communicate value and pursue sustainable business growth.',
    impact: 'Branding, digital marketing, content systems & growth consultancy.',
    ctaLabel: 'Explore Mustard Seed',
  },
  {
    id: 'phroneo',
    indexLabel: '04 · ENTERPRISE',
    accreditation: 'Think. Govern. Build.',
    shortName: 'Phroneo BoardSuite',
    title: 'Wise Structure for Businesses Built to Endure.',
    description:
      'Supporting entrepreneurs and enterprises with business registration, corporate secretarial, financial administration and governance advisory.',
    impact: '18 continuous years of zero-default Companies Act statutory compliance.',
    ctaLabel: 'Explore Phroneo',
  },
];

const HERO_BG_VIDEO_SRC = '/assets/videos/glass-slabs-forming-z-logo.mp4?v=3';

const SpotlightCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: number;
}> = ({ children, onClick, className = '', delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group rounded-2xl bg-white border border-[#2D3A1E]/12 shadow-low hover:shadow-mid hover:border-[#405329]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Interactive cursor border spotlight layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{
          background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(230, 185, 77, 0.22), transparent 75%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry }) => {
  const navigate = useNavigate();
  const [heroVideoReady, setHeroVideoReady] = useState<boolean>(false);

  const [heroMouse, setHeroMouse] = useState<{ x: number; y: number; active: boolean }>({
    x: 480,
    y: 360,
    active: true,
  });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setHeroMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroMouse((prev) => ({ ...prev, active: false }));
  };

  const heroRef = useRef<HTMLElement>(null);
  const metricsSectionRef = useRef<HTMLElement>(null);
  const isMetricsInView = useInView(metricsSectionRef, { once: false, amount: 0.25 });

  const { scrollY } = useScroll();
  const heroVideoY = useTransform(scrollY, [0, 600], [0, 85]);
  const heroVideoScale = useTransform(scrollY, [0, 600], [1, 1.06]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -24]);

  const renderPartnerLogo = (name: string, categoryLabel?: string) => {
    const logoMap: Record<string, string> = {
      'Sunway International Schools': '/assets/logos/sunway.png?v=6',
      'Tenby Schools': '/assets/logos/tenby.png?v=5',
      'Nexus International School Malaysia': '/assets/logos/nexus.png?v=4',
      'Garden International School': '/assets/logos/garden.png?v=6',
      'The International School of Kuala Lumpur (ISKL)': '/assets/logos/iskl.png?v=5',
      'Taylor’s International School': '/assets/logos/taylors.png?v=6',
      'Nobel International School': '/assets/logos/nobel.png?v=3',
      'Tanarata International Schools': '/assets/logos/tanarata.png?v=4',
      'Melaka International School': '/assets/logos/melaka.png?v=7',
      'LFKL (Lycée Français de Kuala Lumpur)': '/assets/logos/lfkl.png?v=5',
      'HEVEA': '/assets/logos/hevea.png?v=3',
      'RGS': '/assets/logos/rgs.png?v=5',
      'LSL': '/assets/logos/lsl.png?v=5',
      'DSKL (Deutsche Schule Kuala Lumpur)': '/assets/logos/dokl.png?v=4',
      'DOKL': '/assets/logos/dokl.png?v=4',
      'Uniqlo': '/assets/logos/uniqlo.png',
      'Nando’s': '/assets/logos/nandos.png?v=3',
      'Johnson & Johnson': '/assets/logos/jnj.png?v=3',
      'Unilever': '/assets/logos/unilever.png?v=3',
      'UCSI University': '/assets/logos/ucsi.png?v=3',
      'REDtone': '/assets/logos/redtone.png?v=3',
      'Syngenta': '/assets/logos/syngenta.png?v=4',
      'Padini Holdings Bhd': '/assets/logos/padini.png?v=3',
      'DKSH': '/assets/logos/dksh.png?v=3',
      'Namaste India 1947': '/assets/logos/namaste.png?v=3',
    };
    const src = logoMap[name] || '/assets/logos/sunway.png';

    return (
      <div className="group/logo flex items-center justify-center w-full h-full px-5 py-3 rounded-2xl bg-white/90 hover:bg-white border border-[#141812]/12 shadow-low transition-all duration-300 overflow-hidden">
        <img
          src={src}
          alt={name}
          title={categoryLabel ? `${name} — ${categoryLabel}` : name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain opacity-90 group-hover/logo:opacity-100 group-hover/logo:scale-105 transition-all duration-300 max-w-[88%] max-h-[85%]"
        />
      </div>
    );
  };

  return (
    <div className="w-full bg-[#FAF9F6] relative">
      {/* =====================================================================
          CHAPTER 00: FULL-BLEED HERO SECTION WITH MULTI-PLANE SCROLL PARALLAX
      ====================================================================== */}
      <div className="relative w-full max-w-full bg-[#FAF9F6] -mt-16 sm:-mt-20 pointer-events-auto">
        <div className="w-full flex flex-col items-center relative z-10">
          <motion.section
            id="chapter-hero"
            data-dot-label="Welcome"
            ref={heroRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-screen min-h-[100dvh] pt-16 sm:pt-20 overflow-hidden border-b border-[#141812]/12 bg-[#141812] text-white shadow-high flex flex-col justify-end"
          >
            {/* Full-Bleed Video Layer with Scroll Parallax & Seamless Dissolve Looping */}
            <motion.div
              style={{ y: heroVideoY, scale: heroVideoScale }}
              className={`absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform transition-opacity duration-700 ${
                heroVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <SeamlessVideoBackground
                src={HERO_BG_VIDEO_SRC}
                crossfadeDuration={0.5}
                onLoadedData={() => setHeroVideoReady(true)}
                onError={() => setHeroVideoReady(false)}
              />
            </motion.div>

            {/* Cinematic Contrast Protective Overlay */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-black/85 via-black/40 to-black/50" />

            {/* Volumetric Green Specular Light Following Cursor */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-[2]"
              style={{
                opacity: heroMouse.active ? 1 : 0.65,
                background: `radial-gradient(850px circle at ${heroMouse.x}px ${heroMouse.y}px, rgba(64, 83, 41, 0.25), rgba(45, 58, 30, 0.1) 45%, transparent 75%)`,
              }}
              aria-hidden="true"
            />

            {/* Main Hero Content (Editorial Typography + Counter-Parallax) */}
            <motion.div
              style={{ y: heroContentY }}
              className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 flex flex-col justify-end will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
                {/* LEFT 7 COLUMNS: Clean Editorial Overline & Headline */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-caption font-mono tracking-[0.12em] uppercase text-white">
                    <span>Est. 2008 · Kuala Lumpur &amp; SEA</span>
                    <span aria-hidden="true" className="text-white/40">·</span>
                    <span className="text-white">4 Operating Ventures</span>
                  </div>

                  <h1 className="text-display font-bold text-white drop-shadow-md select-none">
                    <span className="block text-white">
                      Equip people.
                    </span>

                    <span className="block text-[#405329] mt-1">
                      Strengthen enterprise.
                    </span>

                    <span className="block mt-1 text-white">
                      Multiply opportunity.
                    </span>
                  </h1>
                </div>

                {/* RIGHT 5 COLUMNS: Supporting Overview + Primary & Secondary Hero CTAs */}
                <div className="lg:col-span-5 flex flex-col justify-end space-y-6">
                  <p className="text-body text-white/90 font-normal">
                    A purpose-led Malaysian holding ecosystem of four specialised ventures across human wellbeing, leadership training, brand growth and institutional governance.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/ecosystem')}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#405329] hover:bg-[#2D3A1E] text-white text-caption font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-low whitespace-nowrap shrink-0"
                    >
                      <span>Explore Ecosystem</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry()}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/24 text-caption font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-md whitespace-nowrap shrink-0"
                    >
                      <span>Book Consultation</span>
                      <ArrowUpRight className="w-4 h-4 text-[#405329]" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* =====================================================================
          QUANTITATIVE PROOF & ECOSYSTEM SCALE
      ====================================================================== */}
      <section
        id="proof"
        ref={metricsSectionRef}
        className="relative z-10 py-8 sm:py-12 bg-[#FAF9F6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-white border border-[#141812]/12 shadow-low">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-[#141812]/12">
              {HERO_METRICS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0.5, y: 10 }}
                  animate={isMetricsInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 10 }}
                  transition={{
                    duration: 0.5,
                    delay: isMetricsInView ? idx * 0.08 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative p-6 transition-all duration-300 hover:bg-[#F4F6F0] cursor-default flex flex-col justify-between ${
                    idx < HERO_METRICS.length - 1 ? 'lg:border-r lg:border-[#141812]/12' : ''
                  }`}
                >
                  <div className="relative z-10 text-display font-bold tracking-tight tabular-nums transition-transform duration-300 group-hover:-translate-y-0.5">
                    <AnimatedMetricNumber
                      value={item.value}
                      inView={isMetricsInView}
                      delay={idx * 80}
                    />
                  </div>

                  <div className="relative z-10 mt-2 space-y-1">
                    <div className="text-body font-semibold text-[#141812] group-hover:text-[#2D3A1E] transition-colors">
                      {item.label}
                    </div>
                    <div className="text-caption text-[#42493E]">
                      {item.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TRUSTED ORGANISATIONS & PARTNERS RIBBON (SINGLE CANONICAL MARQUEE)
      ====================================================================== */}
      <div id="partners-strip" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 sm:pb-8 text-center border-b border-[#141812]/12">
        <p
          style={{ fontSize: '0.95rem', lineHeight: '1.35rem' }}
          className="font-mono font-semibold uppercase tracking-[0.16em] text-[#5A6255] mb-5"
        >
          Selected Organisations &amp; Enterprise Partners
        </p>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-2">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 32 }}
            className="flex items-center gap-5 w-max hover:[animation-play-state:paused]"
          >
            {[...CLIENT_PARTNERS, ...CLIENT_PARTNERS].map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                onClick={() => navigate('/clients')}
                className="h-24 sm:h-28 w-48 sm:w-56 shrink-0 cursor-pointer"
              >
                {renderPartnerLogo(p.name, p.type)}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* =====================================================================
          03 / OUR ECOSYSTEM: DISTINCT EXPERTISE. ONE SHARED PURPOSE.
      ====================================================================== */}
      <section
        id="pathways"
        data-dot-label="Services"
        className="relative z-10 py-12 sm:py-16 bg-[#F4F1EA] border-b border-[#141812]/12 overflow-hidden"
      >
        {/* Ivory Cream Geometric Architectural Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-cream-geometric-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#141812]/12">
            <div>
              <div className="flex items-center gap-2 type-kicker text-[#405329] mb-2">
                <span>01 / OUR ECOSYSTEM · 4 SPECIALISED BUSINESSES</span>
              </div>
              <h2 className="text-h2 font-semibold text-[#141812]">
                Distinct expertise.{' '}
                <span className="text-[#405329]">
                  One shared purpose.
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/ecosystem')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-[#2D3A1E] text-[#141812] hover:text-white border border-[#141812]/12 text-caption font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer self-start sm:self-end shrink-0 shadow-low"
            >
              <span>Inspect Ecosystem House</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PATHWAY_CARDS.map((card, idx) => (
              <SpotlightCard
                key={card.id}
                onClick={() => navigate(`/ecosystem?venture=${card.id}#interactive-ventures`)}
                delay={idx * 0.07}
              >
                <div>
                  {/* Bespoke Architectural Brand Header using BusinessGraphicArt */}
                  <div className="relative w-full h-44 overflow-hidden bg-[#FAF9F6] border-b border-[#141812]/12">
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                      <BusinessGraphicArt businessId={card.id} />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 mb-2.5 whitespace-nowrap">
                      <span
                        style={{ fontSize: '9.5px', lineHeight: '14px' }}
                        className="px-2 py-0.5 rounded-full bg-[#F4F6F0] font-sans font-bold uppercase tracking-normal text-[#405329] shrink-0 whitespace-nowrap"
                      >
                        {card.indexLabel}
                      </span>
                      <span
                        style={{ fontSize: '9.5px', lineHeight: '14px' }}
                        className="font-sans font-medium uppercase tracking-tight text-[#5A6255] whitespace-nowrap"
                      >
                        {card.accreditation}
                      </span>
                    </div>
                    <h3 className="text-h3 font-semibold text-[#141812] group-hover:text-[#405329] transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-caption text-[#42493E]">
                      {card.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#141812]/12 text-caption text-[#42493E]">
                      <span className="font-semibold text-[#141812]">Scope: </span>
                      <span>{card.impact}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="pt-4 border-t border-[#141812]/12 flex items-center justify-between gap-2 text-caption font-semibold text-[#2D3A1E] group-hover:text-[#405329] transition-colors">
                    <span>{card.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#405329] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          EDITORIAL FEATURE: THE COST OF FRAGMENTATION VS. THE BEZALEL STANDARD
      ====================================================================== */}
      <section
        id="fragmentation"
        data-dot-label="Why Bezalel"
        className="relative z-10 py-12 sm:py-16 text-white border-b border-[#141812]/12 overflow-hidden"
      >
        {/* Full True-Color Split Olive & Cream Architectural Artwork Background (Fixed attachment - stays static while scrolling) */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FragmentationMatrixTable
            onOpenInquiry={() => onOpenInquiry()}
            onExploreEcosystem={() => navigate('/ecosystem')}
          />
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 01: SCROLL-LINKED EXECUTIVE THESIS
      ====================================================================== */}
      <div id="chapter-manifesto" data-dot-label="Philosophy">
        <ScrollManifestoReveal onExploreStory={() => navigate('/story')} />
      </div>

      {/* =====================================================================
          CHAPTER 04: INSTITUTIONAL OUTCOMES & SECTOR FOOTPRINT BENTO GRID
      ====================================================================== */}
      <section
        id="chapter-experience"
        data-dot-label="Clients"
        className="relative z-10 py-12 sm:py-16 bg-[#1B2217] border-b border-[#141812]/12 overflow-hidden"
      >
        {/* Full True-Color Hybrid Olive & Cream Geometric Architectural Background (Fixed attachment - stays static while scrolling) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/bezalel-track-record-bg.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up">
            <div className="pb-6 border-b border-white/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 type-kicker text-[#E6B94D] mb-2 font-mono">
                  <span>02 — Verified Institutional Track Record</span>
                </div>
                <h2 className="text-h2 font-semibold text-[#FAF9F6] mb-2 drop-shadow-sm">
                  Trusted by leading schools and enterprises
                </h2>
                <p className="text-body text-[#FAF9F6]/85 max-w-2xl">
                  Across 18 years of continuous operation, Bezalel’s four ventures have partnered with 14 international school campuses and 10 multinational and public-listed organisations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/clients')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2D3A1E] hover:bg-[#405329] text-[#FAF9F6] border border-white/20 text-caption font-medium uppercase tracking-wider transition-all cursor-pointer self-start sm:self-auto whitespace-nowrap shrink-0 shadow-low"
              >
                <span>View All 24 Partner Organisations</span>
                <ArrowRight className="w-4 h-4 text-[#E6B94D]" />
              </button>
            </div>
          </ScrollReveal>

          {/* 3-Column Executive Institutional Proof Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Pillar 1: 14 International Schools */}
            <ScrollReveal direction="up" delay={0.05} className="h-full flex flex-col">
              <div
                onClick={() => navigate('/clients')}
                className="group h-full flex-1 rounded-2xl bg-white border border-[#141812]/12 hover:border-[#405329]/45 p-6 shadow-low hover:shadow-mid transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="px-2 py-0.5 rounded-sm bg-[#F4F6F0] font-mono text-caption uppercase text-[#405329] font-medium">
                      01 · Education Sector
                    </span>
                    <span className="text-h2 font-semibold text-[#141812] tabular-nums">
                      14 Campuses
                    </span>
                  </div>

                  <div>
                    <h3 className="text-h3 font-semibold text-[#141812] group-hover:text-[#405329] transition-colors mb-2">
                      International Schools &amp; Academic Institutions
                    </h3>
                    <p className="text-caption text-[#42493E]">
                      Embedded student counselling, educator resilience workshops, safeguarding frameworks, and parent-adolescent restoration programmes.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-[#141812]/12 text-caption text-[#2D3A1E]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>ISKL, Garden International, Sunway &amp; Taylor’s</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>Nexus, Tenby, LFKL &amp; DSKL German School</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#141812]/12 flex items-center justify-between text-caption font-semibold text-[#405329]">
                  <span>Inspect Education Portfolio</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </ScrollReveal>

            {/* Pillar 2: 10 Corporate & Listed Enterprises */}
            <ScrollReveal direction="up" delay={0.12} className="h-full flex flex-col">
              <div
                onClick={() => navigate('/clients')}
                className="group h-full flex-1 rounded-2xl bg-white border border-[#141812]/12 hover:border-[#405329]/45 p-6 shadow-low hover:shadow-mid transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="px-2 py-0.5 rounded-sm bg-[#F4F6F0] font-mono text-caption uppercase text-[#405329] font-medium">
                      02 · Enterprise Sector
                    </span>
                    <span className="text-h2 font-semibold text-[#141812] tabular-nums">
                      10 Corporates
                    </span>
                  </div>

                  <div>
                    <h3 className="text-h3 font-semibold text-[#141812] group-hover:text-[#405329] transition-colors mb-2">
                      Multinationals &amp; Public-Listed Groups
                    </h3>
                    <p className="text-caption text-[#42493E]">
                      Executive leadership alignment, HRD Corp-claimable masterclasses, brand positioning, and Companies Act 2016 board governance.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-[#141812]/12 text-caption text-[#2D3A1E]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>Unilever, Johnson &amp; Johnson, Uniqlo &amp; Syngenta</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>Padini Holdings, DKSH, REDtone &amp; Nando’s</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#141812]/12 flex items-center justify-between text-caption font-semibold text-[#405329]">
                  <span>Inspect Enterprise Roster</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </ScrollReveal>

            {/* Pillar 3: Turnkey Stewardship & Cross-Venture Impact */}
            <ScrollReveal direction="up" delay={0.19} className="h-full flex flex-col">
              <div
                onClick={() => navigate('/impact')}
                className="group relative overflow-hidden h-full flex-1 rounded-2xl bg-[#182317] text-white border border-[#405329]/40 p-6 shadow-mid hover:shadow-high transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6"
              >
                {/* Full True-Color Embossed Z Monogram Background */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#182317] pointer-events-none group-hover:scale-105 transition-all duration-500 ease-out"
                  style={{
                    backgroundImage: `url('/assets/bezalel-monogram-pattern.jpg')`,
                    backgroundSize: '560px auto',
                    backgroundRepeat: 'repeat',
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="px-2 py-0.5 rounded-sm bg-white/10 font-mono text-caption uppercase text-[#E6B94D] font-medium">
                      03 · Group Impact
                    </span>
                    <span className="text-h2 font-semibold text-[#E6B94D] tabular-nums">
                      RM1.7M+
                    </span>
                  </div>

                  <div>
                    <h3 className="text-h3 font-semibold text-white group-hover:text-[#E6B94D] transition-colors mb-2">
                      Integrated Multi-Venture Execution
                    </h3>
                    <p className="text-caption text-white/80">
                      From landmark regional conferences to long-term corporate retainers, Bezalel unites human capability with statutory and commercial rigor.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-white/15 text-caption text-white/90">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E4E9DC] shrink-0" />
                      <span>Single-point group accountability across 4 practices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E4E9DC] shrink-0" />
                      <span>18 years of continuous Malaysian stewardship</span>
                    </li>
                  </ul>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-caption font-mono font-semibold text-[#E6B94D]">
                  <span>Explore Impact &amp; Case Studies</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FaqSection onOpen={() => onOpenInquiry()} />
    </div>
  );
};
