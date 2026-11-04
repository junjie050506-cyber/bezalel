import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { REPLY_PROMISE, whatsappLink } from '../config';
import { submitInquiry } from '../lib/submitInquiry';

interface Props {
  open: boolean;
  onClose: () => void;
  businessId?: string;
  audience?: string;
}

const ROLES: { id: string; label: string; promise: string }[] = [
  { id: 'School / Education', label: 'School or education', promise: 'We will recommend the right wellbeing programme for your campus.' },
  { id: 'Company / Corporate', label: 'Company', promise: 'We will outline training or governance support for your team.' },
  { id: 'Individual / Family', label: 'Individual, couple or family', promise: 'A confidential first conversation with our care team.' },
  { id: 'Brand / Business owner', label: 'Brand or business owner', promise: 'We will share ideas on positioning and growth.' },
  { id: 'Other', label: 'Something else', promise: 'Tell us what you need and we will point you to the right team.' },
];

const VENTURE_NAMES: Record<string, string> = {
  'olive-vine': 'Olive & Vine',
  'hur-on': 'HUR-ON',
  'mustard-seed': 'Mustard Seed & Co',
  phroneo: 'Phroneo BoardSuite',
};

const CONFETTI = Array.from({ length: 28 }).map((_, i) => ({
  x: (Math.random() - 0.5) * 420,
  y: -(120 + Math.random() * 220),
  r: Math.random() * 540 - 270,
  c: ['#E6B94D', '#A3B86C', '#405329', '#F0C65E'][i % 4],
  d: Math.random() * 0.15,
}));

export const InquiryDialog: React.FC<Props> = ({ open, onClose, businessId, audience }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLES[0].id);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | 'sent' | 'mailto'>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setDone(null);
    setError('');
    const match = ROLES.find((r) => r.id === audience);
    if (match) setRole(match.id);
    document.documentElement.dataset.modalOpen = '1';
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => nameRef.current?.focus(), 250);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => {
      delete document.documentElement.dataset.modalOpen;
      document.body.style.overflow = '';
      window.clearTimeout(t);
      window.removeEventListener('keydown', esc);
    };
  }, [open, audience, onClose]);

  const promise = ROLES.find((r) => r.id === role)?.promise;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please tell us your name.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Please enter a valid email address.');
    setError('');
    setBusy(true);
    try {
      const result = await submitInquiry({
        name: name.trim(),
        email: email.trim(),
        audience: role,
        venture: businessId ? VENTURE_NAMES[businessId] || businessId : undefined,
        message: message.trim(),
        source: 'quick-dialog',
      });
      setDone(result);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setBusy(false);
    }
  };

  const wa = whatsappLink();
  const inputCls =
    'w-full h-12 px-4 rounded-xl bg-white border border-[#2D3A1E]/20 text-[15px] text-[#141812] placeholder:text-[#141812]/40 focus:outline-none focus:border-[#405329] focus:ring-4 focus:ring-[#A3B86C]/30 transition';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#0F150A]/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="Book a free consultation"
        >
          <motion.div
            className="relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-[#FAF9F6] rounded-t-3xl sm:rounded-3xl shadow-2xl"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2D3A1E]/8 hover:bg-[#2D3A1E]/15 flex items-center justify-center text-[#2D3A1E]"
            >
              <X className="w-4 h-4" />
            </button>

            {done ? (
              <div className="relative p-8 sm:p-10 text-center space-y-5 overflow-hidden">
                <div className="absolute left-1/2 top-24 pointer-events-none" aria-hidden="true">
                  {CONFETTI.map((c, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-2 h-3 rounded-[2px]"
                      style={{ background: c.c }}
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{ x: c.x, y: [0, c.y, c.y + 260], opacity: [1, 1, 0], rotate: c.r }}
                      transition={{ duration: 1.6, delay: c.d, ease: 'easeOut' }}
                    />
                  ))}
                </div>
                <CheckCircle2 className="w-12 h-12 text-[#405329] mx-auto" />
                <h2 className="font-display text-3xl text-[#141812]">
                  {done === 'sent' ? 'Thank you. We have your message.' : 'One last step'}
                </h2>
                <p className="text-sm text-[#42493E]">
                  {done === 'sent'
                    ? 'Our team will reply to ' + email + ' within 1 business day.'
                    : 'Your email app should now be open with your message ready. Press send and we will reply within 1 business day.'}
                </p>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-[#0B2E17] text-sm font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp now
                  </a>
                )}
                <div>
                  <button type="button" onClick={onClose} className="text-sm font-semibold text-[#405329] underline underline-offset-4">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 sm:p-9 space-y-5" noValidate>
                <div className="space-y-2 pr-10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#405329]">
                    Free consultation
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-[#141812] leading-tight">
                    Tell us what you need.
                  </h2>
                  <p className="text-sm text-[#42493E]">{promise}</p>
                </div>

                <div>
                  <label htmlFor="q-role" className="block text-[13px] font-semibold text-[#18181B] mb-1.5">I am a…</label>
                  <select id="q-role" value={role} onChange={(e) => setRole(e.target.value)} className={inputCls}>
                    {ROLES.map((r) => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="q-name" className="block text-[13px] font-semibold text-[#18181B] mb-1.5">Your name</label>
                    <input id="q-name" ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="q-email" className="block text-[13px] font-semibold text-[#18181B] mb-1.5">Email</label>
                    <input id="q-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="q-msg" className="block text-[13px] font-semibold text-[#18181B] mb-1.5">
                    What would you like help with? <span className="font-normal text-[#141812]/50">(optional)</span>
                  </label>
                  <textarea
                    id="q-msg"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2D3A1E]/20 text-[15px] focus:outline-none focus:border-[#405329] focus:ring-4 focus:ring-[#A3B86C]/30 transition resize-none"
                  />
                </div>

                {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full h-14 rounded-full bg-[#E6B94D] hover:bg-[#F0C65E] text-[#141812] font-semibold text-[15px] inline-flex items-center justify-center gap-2 transition disabled:opacity-60 shadow-lg shadow-[#E6B94D]/30"
                >
                  {busy ? 'Sending…' : 'Book my free consultation'}
                  {!busy && <ArrowRight className="w-4 h-4" />}
                </button>

                <p className="text-center text-xs text-[#141812]/60">{REPLY_PROMISE}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 border-t border-[#2D3A1E]/10 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#405329]">
                  <span>Since 2008</span>
                  <span>24 organisations</span>
                  <span>Malaysia &amp; Singapore</span>
                </div>
                {wa && (
                  <a href={wa} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm font-semibold text-[#1a7a3f]">
                    <MessageCircle className="w-4 h-4" /> Prefer WhatsApp? Chat with us
                  </a>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
