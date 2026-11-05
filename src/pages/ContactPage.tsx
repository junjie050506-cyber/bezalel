import { submitInquiry } from '../lib/submitInquiry';
import { VENTURE_PHONES } from '../config';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { BUSINESS_ENTITIES } from '../data/ecosystemData';
import { BusinessGraphicArt } from '../components/EcosystemGraphics';
import { StaggerContainer, StaggerItem } from '../components/MotionContainer';
import { SeamlessVideoBackground } from '../components/SeamlessVideoBackground';
import { CheckCircle2, ChevronDown, RotateCcw } from 'lucide-react';

interface ContactPageProps {
  preselectedBusinessId?: string;
  preselectedAudience?: string;
}

interface VentureOption {
  id: string;
  code: string;
  shortName: string;
  fullName: string;
  inquiryLabel: string;
  category: string;
  tagline: string;
  logo?: string;
  coreMessage: string;
  pillars: string[];
  accent: string;
}

const VENTURE_OPTIONS: VentureOption[] = BUSINESS_ENTITIES.map((ent) => ({
  id: ent.id,
  code: ent.number,
  shortName:
    ent.id === 'olive-vine'
      ? 'Olive & Vine'
      : ent.id === 'hur-on'
      ? 'HUR-ON'
      : ent.id === 'mustard-seed'
      ? 'Mustard Seed & Co'
      : 'Phroneo BoardSuite',
  fullName: ent.name,
  inquiryLabel:
    ent.id === 'olive-vine'
      ? 'Olive & Vine — Psychological & Relational Care'
      : ent.id === 'hur-on'
      ? 'HUR-ON — Corporate Training & Consultancy'
      : ent.id === 'mustard-seed'
      ? 'Mustard Seed & Co — Creative & Brand Growth'
      : 'Phroneo BoardSuite — Corporate Governance',
  category: ent.category,
  tagline: ent.tagline,
  logo: ent.logo,
  coreMessage: ent.coreMessage,
  pillars: ent.focusAreas,
  accent: ent.accentColor,
}));

const COUNTRY_CODES = [
  { code: 'MY', dial: '+60', placeholder: '+60 12-345 6789' },
  { code: 'SG', dial: '+65', placeholder: '+65 9123 4567' },
  { code: 'US', dial: '+1', placeholder: '+1 (555) 000-0000' },
  { code: 'UK', dial: '+44', placeholder: '+44 7700 900000' },
  { code: 'AU', dial: '+61', placeholder: '+61 400 000 000' },
];

export const ContactPage: React.FC<ContactPageProps> = ({
  preselectedBusinessId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const heroSectionRef = useRef<HTMLElement>(null);
  const inquirySectionRef = useRef<HTMLDivElement>(null);
  const urlVenture = searchParams.get('venture');

  const initialVenture = urlVenture || preselectedBusinessId || 'olive-vine';

  const [selectedEntity, setSelectedEntity] = useState<string>(initialVenture);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('MY');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [comment, setComment] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(
    heroScrollProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '16%']
  );
  const heroBgScale = useTransform(
    heroScrollProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.07]
  );

  // Sync URL params or props when navigated from other pages, and smooth-scroll to form when a venture is specified
  useEffect(() => {
    const targetVenture = urlVenture || preselectedBusinessId;
    if (targetVenture) {
      const exists = VENTURE_OPTIONS.some((v) => v.id === targetVenture);
      setSelectedEntity(exists ? targetVenture : 'olive-vine');
      const timer = setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [urlVenture, preselectedBusinessId]);

  const activeVenture =
    VENTURE_OPTIONS.find((v) => v.id === selectedEntity) || VENTURE_OPTIONS[0];

  const activeCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const handleSelectVenture = (id: string) => {
    setSelectedEntity(id);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('venture', id);
    setSearchParams(nextParams, { replace: true, preventScrollReset: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    setErrorMsg('');
    try {
      await submitInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() ? `${activeCountry.dial ?? ''} ${phone.trim()}`.trim() : undefined,
        organisation: organisation.trim() || undefined,
        venture: activeVenture.shortName,
        ventureId: activeVenture.id,
        message: [teamSize && `Team size: ${teamSize}`, comment.trim()].filter(Boolean).join('\n'),
        source: 'contact-page',
        botcheck,
      });
      setSubmitted(true);
    } catch {
      setErrorMsg('Something went wrong. Please try again or email connect@bezalelinc.com.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setOrganisation('');
    setTeamSize('');
    setComment('');
    setBotcheck('');
  };

  return (
    <div className="relative w-full select-none -mt-16 sm:-mt-20">
      {/* 1. COMPACT ARCHITECTURAL HERO BANNER AT TOP OF PAGE */}
      <section
        ref={heroSectionRef}
        className="relative w-full h-screen min-h-[100dvh] py-16 sm:py-24 overflow-hidden bg-[#141B0C] border-b border-[#2D3A1E]/25 flex items-center justify-center"
      >
        {/* Full-Bleed Video Background with Scroll Parallax & Seamless Infinite Crossfade Looping */}
        <motion.div
          style={{ y: heroBgY, scale: heroBgScale }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform"
        >
          <SeamlessVideoBackground
            src="/assets/videos/contact-hero-columns.mp4"
            crossfadeDuration={1.4}
            videoClassName="brightness-[0.92] contrast-[1.06]"
          />
        </motion.div>
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/35 to-black/65 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-caption font-mono uppercase tracking-[0.2em] text-[#E4E9DC] mb-2">
              Direct Executive Secretariat &middot; 1-Business-Day Reply
            </div>
            <h1 className="text-display font-bold text-[#FAF9F6] drop-shadow-md">
              <span className="block">Let&apos;s work together</span>
              <span className="block font-semibold italic text-[#E6B94D] mt-1">
                on your next venture.
              </span>
            </h1>
            <p className="text-body text-[#FAF9F6]/85 max-w-xl mx-auto mt-2">
              Choose a specialist venture below—we will connect you directly with the right lead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. INQUIRY SECTION */}
      <div ref={inquirySectionRef} id="inquiry-workspace" className="scroll-mt-20">
        <StaggerContainer className="relative overflow-hidden min-h-[calc(100dvh-5rem)]">
          {/* Full Cream Geometric Brand Background (Fixed attachment - stays static while scrolling) */}
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

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
            {/* STEP 01: VISUAL VENTURE SELECTOR STRIP */}
            <StaggerItem className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-caption font-mono uppercase tracking-widest text-[#2D3A1E] font-bold">
                  1. Choose who you would like to speak with
                </span>
                <span className="text-caption text-[#42493E] font-medium hidden sm:inline">
                  Click any card to select
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {VENTURE_OPTIONS.map((v) => {
                  const isSelected = selectedEntity === v.id;
                  return (
                    <motion.button
                      key={v.id}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectVenture(v.id)}
                      className={`group relative text-left rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col justify-between p-4 h-28 sm:h-32 ${
                        isSelected
                          ? 'bg-[#141B0C] text-[#FAF9F6] border-[#405329] ring-2 ring-[#405329]/40 shadow-mid'
                          : 'bg-white/95 backdrop-blur-md text-[#2D3A1E] border-[#2D3A1E]/15 hover:border-[#405329]/45 hover:bg-white shadow-low'
                      }`}
                    >
                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                          isSelected
                            ? 'opacity-40'
                            : 'opacity-20 group-hover:opacity-35'
                        }`}
                      >
                        <BusinessGraphicArt businessId={v.id} />
                      </div>

                      <div className="relative z-10 flex items-center justify-between w-full">
                        <span
                          className={`font-mono text-caption tracking-widest uppercase font-semibold ${
                            isSelected ? 'text-[#E4E9DC]' : 'text-[#405329]'
                          }`}
                        >
                          {v.code}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                            isSelected
                              ? 'bg-[#E4E9DC] scale-125'
                              : 'bg-[#2D3A1E]/20 group-hover:bg-[#405329]'
                          }`}
                        />
                      </div>

                      <div className="relative z-10 mt-auto">
                        <p
                          className={`text-body font-semibold line-clamp-2 ${
                            isSelected ? 'text-white' : 'text-[#141812]'
                          }`}
                        >
                          {v.shortName}
                        </p>
                        <p
                          className={`text-caption truncate mt-1 ${
                            isSelected
                              ? 'text-[#E4E9DC]/80'
                              : 'text-[#42493E]'
                          }`}
                        >
                          {v.category}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </StaggerItem>

            {/* UNIFIED WHITE SPLIT INQUIRY CARD (EXACT BENTO DESIGN) */}
            <StaggerItem>
              <div className="bg-white rounded-2xl shadow-high border border-[#2D3A1E]/12 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* LEFT HALF: CLEAN MODERN INQUIRY FORM */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="submitted-state"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 w-full max-w-md mx-auto"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#15803D] text-white flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-h3 font-semibold text-[#141812]">
                              Inquiry received
                            </h2>
                            <p className="text-caption text-[#42493E]">
                              Our Executive Secretariat responds within 1 business
                              day.
                            </p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#2D3A1E]/12 bg-[#FAF9F6] p-4 space-y-3 text-caption">
                          <div>
                            <span className="font-medium text-[#5A6255] block">
                              Inquiry type
                            </span>
                            <span className="font-semibold text-[#141812]">
                              {activeVenture.inquiryLabel}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#2D3A1E]/10">
                            <div>
                              <span className="font-medium text-[#5A6255] block">
                                Full name
                              </span>
                              <span className="font-semibold text-[#141812]">
                                {name}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-[#5A6255] block">
                                Email
                              </span>
                              <span className="font-semibold text-[#141812] break-all">
                                {email}
                              </span>
                            </div>
                          </div>

                          {(phone || organisation || teamSize) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#2D3A1E]/10">
                              {phone && (
                                <div>
                                  <span className="font-medium text-[#5A6255] block">
                                    Phone
                                  </span>
                                  <span className="font-medium text-[#141812]">
                                    {countryCode} · {phone}
                                  </span>
                                </div>
                              )}
                              {(organisation || teamSize) && (
                                <div>
                                  <span className="font-medium text-[#5A6255] block">
                                    Organisation &amp; scale
                                  </span>
                                  <span className="font-medium text-[#141812]">
                                    {[organisation, teamSize]
                                      .filter(Boolean)
                                      .join(' · ')}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {comment.trim() && (
                            <div className="pt-2 border-t border-[#2D3A1E]/10">
                              <span className="font-medium text-[#5A6255] block">
                                Comment
                              </span>
                              <p className="font-normal text-[#141812] whitespace-pre-line mt-1">
                                {comment}
                              </p>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="w-full h-12 bg-[#141B0C] hover:bg-[#2D3A1E] text-white font-semibold text-caption rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-low"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Submit another inquiry</span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleSubmit}
                        className="w-full max-w-md mx-auto"
                      >
                        <div className="mb-6">
                          <h2 className="text-h3 font-semibold text-[#141812]">
                            Partnership &amp; consultation inquiry
                          </h2>
                        </div>

                        {errorMsg && (
                          <div className="mb-4 p-3 bg-[#FEF2F2] border border-[#B91C1C]/20 text-[#B91C1C] text-caption rounded-lg">
                            {errorMsg}
                          </div>
                        )}

                        <div className="space-y-4">
                          {/* 1. Inquiry type dropdown */}
                          <div>
                            <label
                              htmlFor="inquiry-type"
                              className="block text-caption font-semibold text-[#141812] mb-2"
                            >
                              Inquiry type
                            </label>
                            <div className="relative">
                              <select
                                id="inquiry-type"
                                value={selectedEntity}
                                onChange={(e) =>
                                  handleSelectVenture(e.target.value)
                                }
                                className="w-full h-10 pl-3 pr-9 bg-white border border-[#2D3A1E]/20 hover:border-[#2D3A1E]/40 focus:border-[#405329] rounded-lg text-caption text-[#141812] appearance-none focus:outline-none transition-colors cursor-pointer"
                              >
                                {VENTURE_OPTIONS.map((v) => (
                                  <option key={v.id} value={v.id}>
                                    {v.shortName}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-4 h-4 text-[#42493E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            {VENTURE_PHONES[activeVenture.id] && (
                              <p className="mt-2 text-caption text-[#42493E]">
                                Prefer to call {activeVenture.shortName}?{' '}
                                <a
                                  href={`tel:${VENTURE_PHONES[activeVenture.id].tel}`}
                                  className="font-semibold text-[#141812] underline underline-offset-2 hover:text-[#405329]"
                                >
                                  {VENTURE_PHONES[activeVenture.id].display}
                                </a>
                              </p>
                            )}
                          </div>

                          {/* 2. Your full name */}
                          <div>
                            <label
                              htmlFor="inquiry-name"
                              className="block text-caption font-semibold text-[#141812] mb-2"
                            >
                              Your full name
                            </label>
                            <input
                              id="inquiry-name"
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full h-10 px-3 bg-white border border-[#2D3A1E]/20 hover:border-[#2D3A1E]/40 focus:border-[#405329] rounded-lg text-caption text-[#141812] placeholder:text-[#5A6255] focus:outline-none transition-colors"
                            />
                          </div>

                          {/* 3. Email */}
                          <div>
                            <label
                              htmlFor="inquiry-email"
                              className="block text-caption font-semibold text-[#141812] mb-2"
                            >
                              Email
                            </label>
                            <input
                              id="inquiry-email"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                              className="w-full h-10 px-3 bg-white border border-[#2D3A1E]/20 hover:border-[#2D3A1E]/40 focus:border-[#405329] rounded-lg text-caption text-[#141812] placeholder:text-[#5A6255] focus:outline-none transition-colors"
                            />
                          </div>

                          {/* 4. Phone number with inline country code selector */}
                          <div>
                            <label
                              htmlFor="inquiry-phone"
                              className="block text-caption font-semibold text-[#141812] mb-2"
                            >
                              Phone number
                            </label>
                            <div className="w-full h-10 bg-white border border-[#2D3A1E]/20 hover:border-[#2D3A1E]/40 focus-within:border-[#405329] rounded-lg flex items-center transition-colors">
                              <div className="relative flex items-center h-full shrink-0">
                                <select
                                  aria-label="Country code"
                                  value={countryCode}
                                  onChange={(e) => setCountryCode(e.target.value)}
                                  className="h-full pl-3 pr-6 bg-transparent text-caption font-medium text-[#141812] appearance-none focus:outline-none cursor-pointer"
                                >
                                  {COUNTRY_CODES.map((c) => (
                                    <option key={c.code} value={c.code}>
                                      {c.code}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-[#42493E] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>

                              <input
                                id="inquiry-phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder={activeCountry.placeholder}
                                className="flex-1 h-full px-3 bg-transparent text-caption text-[#141812] placeholder:text-[#5A6255] focus:outline-none min-w-0"
                              />
                            </div>
                          </div>

                          {/* 5. Two side-by-side split fields */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="inquiry-org"
                                className="block text-caption font-semibold text-[#141812] mb-2"
                              >
                                Organisation
                              </label>
                              <input
                                id="inquiry-org"
                                type="text"
                                value={organisation}
                                onChange={(e) => setOrganisation(e.target.value)}
                                placeholder="e.g Sunway"
                                className="w-full h-10 px-3 bg-white border border-[#2D3A1E]/20 hover:border-[#2D3A1E]/40 focus:border-[#405329] rounded-lg text-caption text-[#141812] placeholder:text-[#5A6255] focus:outline-none transition-colors"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="inquiry-size"
                                className="block text-caption font-semibold text-[#141812] mb-2"
                              >
                                Cohort / team size
                              </label>
                              <input
                                id="inquiry-size"
                                type="text"
                                value={teamSize}
                                onChange={(e) => setTeamSize(e.target.value)}
                                placeholder="e.g 40 pax"
                                className="w-full h-10 px-3 bg-white border border-[#2D3A1E]/20 hover:border-[#2D3A1E]/40 focus:border-[#405329] rounded-lg text-caption text-[#141812] placeholder:text-[#5A6255] focus:outline-none transition-colors"
                              />
                            </div>
                          </div>

                          {/* 6. Comment textarea */}
                          <div>
                            <label
                              htmlFor="inquiry-comment"
                              className="block text-caption font-semibold text-[#141812] mb-2"
                            >
                              Comment
                            </label>
                            <textarea
                              id="inquiry-comment"
                              rows={3}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Write your comment or inquiry details..."
                              className="w-full h-20 px-3 py-2 bg-white border border-[#2D3A1E]/20 hover:border-[#2D3A1E]/40 focus:border-[#405329] rounded-lg text-caption text-[#141812] placeholder:text-[#5A6255] focus:outline-none transition-colors resize-none"
                            />
                          </div>
                        </div>

                        {/* Hidden spam trap: people never see or fill this */}
                        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                          <label htmlFor="inquiry-website">Website</label>
                          <input
                            type="text"
                            id="inquiry-website"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={botcheck}
                            onChange={(e) => setBotcheck(e.target.value)}
                          />
                        </div>

                        {/* 7. Full-width solid Request Consultation button */}
                        <button
                          type="submit"
                          className="mt-6 w-full h-12 bg-[#405329] hover:bg-[#2D3A1E] active:scale-[0.995] text-white font-semibold text-caption rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-low"
                        >
                          <span>
                            Request Consultation · {activeVenture.shortName}
                          </span>
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* RIGHT HALF: 3-TILE INTERLOCKING BENTO ARCHITECTURAL RENDER + AVATAR STAT BADGE */}
                <div className="lg:col-span-6 p-2 flex items-center justify-center">
                  <div className="relative w-full aspect-[560/680] max-h-[688px]">
                    <svg
                      viewBox="0 0 560 680"
                      className="w-full h-full block"
                      preserveAspectRatio="xMidYMid meet"
                      role="img"
                      aria-label="Bezalel Architectural Atelier"
                    >
                      <defs>
                        <clipPath id="inquiryBentoClip">
                          {/* Top-Left Rounded Tile */}
                          <rect
                            x="0"
                            y="0"
                            width="292"
                            height="380"
                            rx="16"
                            ry="16"
                          />
                          {/* Top-Right Rounded Tile */}
                          <rect
                            x="300"
                            y="0"
                            width="260"
                            height="210"
                            rx="16"
                            ry="16"
                          />
                          {/* Bottom Interlocking L-Shape with Concentric Rounded Inner & Outer Corners */}
                          <path d="M 0 404 A 16 16 0 0 1 16 388 L 276 388 A 24 24 0 0 0 300 364 L 300 234 A 16 16 0 0 1 316 218 L 544 218 A 16 16 0 0 1 560 234 L 560 664 A 16 16 0 0 1 544 680 L 16 680 A 16 16 0 0 1 0 664 Z" />
                        </clipPath>
                      </defs>

                      <image
                        href="/assets/photos/inquiry-bento-z-monogram.jpg"
                        x="0"
                        y="0"
                        width="560"
                        height="680"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#inquiryBentoClip)"
                      />
                    </svg>

                    {/* Overlapping 3-Partner Logo + Stat Badge anchored inside Bottom-Left of Top-Right Tile */}
                    <div
                      style={{
                        left: '53.57%',
                        top: 0,
                        width: '46.43%',
                        height: '30.88%',
                      }}
                      className="absolute flex items-end p-3 sm:p-4 pointer-events-none"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-white border border-[#2D3A1E]/12 shadow-low flex items-center justify-center overflow-hidden p-1">
                            <img
                              src="/assets/logos/unilever.png?v=3"
                              alt="Unilever"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white border border-[#2D3A1E]/12 shadow-low flex items-center justify-center overflow-hidden p-0.5">
                            <img
                              src="/assets/logos/iskl.png?v=5"
                              alt="ISKL"
                              className="w-full h-full object-contain rounded-full"
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white border border-[#2D3A1E]/12 shadow-low flex items-center justify-center overflow-hidden p-1">
                            <img
                              src="/assets/logos/nandos.png?v=3"
                              alt="Nando's"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        <div>
                          <span className="text-body font-bold text-[#141812] block">
                            24+
                          </span>
                          <span className="text-caption font-medium text-[#42493E] whitespace-nowrap block">
                            Trusted partners
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
};
