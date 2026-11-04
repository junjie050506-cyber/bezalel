import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_ENTITIES } from '../data/ecosystemData';
import { X, CheckCircle, Send } from 'lucide-react';
import { ZInsignia } from './ZInsignia';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedBusinessId?: string;
  preselectedAudience?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedBusinessId,
  preselectedAudience,
}) => {
  const [selectedEntity, setSelectedEntity] = useState<string>(
    preselectedBusinessId || 'general'
  );
  const [stakeholderType, setStakeholderType] = useState<string>(
    preselectedAudience || 'Corporate Leader / HR / L&D'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync preselected venture/audience whenever modal opens with new context
  useEffect(() => {
    if (preselectedBusinessId) {
      const validIds = BUSINESS_ENTITIES.map((e) => e.id);
      if (validIds.includes(preselectedBusinessId)) {
        setSelectedEntity(preselectedBusinessId);
      } else {
        setSelectedEntity('general');
      }
    } else {
      setSelectedEntity('general');
    }

    if (preselectedAudience) {
      setStakeholderType(preselectedAudience);
    }
  }, [preselectedBusinessId, preselectedAudience, isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please provide your name and valid email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email format.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setOrganisation('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#1A1A1A]/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, y: 12, filter: 'blur(6px)' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F4F1EA]/95 backdrop-blur-xl border border-[#3D4A26]/25 max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative my-8 rounded-3xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#2D3A1E] hover:bg-[#EFEBE0] transition-colors cursor-pointer rounded-full"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 bg-[#3D4A26] text-white flex items-center justify-center mx-auto shadow-md rounded-2xl">
                  <CheckCircle className="w-8 h-8 text-[#8C9E5E]" />
                </div>
                <h3 className="font-display text-3xl font-normal text-[#2D3A1E]">
                  Thank You for Connecting
                </h3>
                <p className="text-base text-[#2B2B2B]/85 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been received by the BEZALEL INC Executive Secretariat. Our
                  dedicated engagement team will review your requirements and reach out within 1
                  business day.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#3D4A26] hover:bg-[#2D3A1E] transition-colors cursor-pointer rounded-full"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ZInsignia size={28} variant="olive" />
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C9E5E] block">
                      Ecosystem Engagement
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#2D3A1E]">
                      Inquire or Explore Partnership
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#2B2B2B]/80 mb-6 leading-relaxed">
                  Connect with our specialized entities for youth enrichment, psychological
                  wellbeing, executive training, brand growth, governance, or the Kingdom
                  Marketplace.
                </p>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs mb-4 rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Entity Picker */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#3D4A26] mb-1.5">
                      Target Operating Entity or Initiative
                    </label>
                    <select
                      value={selectedEntity}
                      onChange={(e) => setSelectedEntity(e.target.value)}
                      className="w-full p-3 bg-[#EFEBE0] border border-[#3D4A26]/20 text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26] rounded-xl"
                    >
                      <option value="general">BEZALEL INC Group (General Inquiry)</option>
                      {BUSINESS_ENTITIES.map((ent) => (
                        <option key={ent.id} value={ent.id}>
                          {ent.number}. {ent.name} ({ent.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stakeholder Category */}
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#3D4A26] mb-1.5">
                      I represent
                    </label>
                    <select
                      value={stakeholderType}
                      onChange={(e) => setStakeholderType(e.target.value)}
                      className="w-full p-3 bg-[#EFEBE0] border border-[#3D4A26]/20 text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26] rounded-xl"
                    >
                      <option value="Schools & STEM">Schools & STEM</option>
                      <option value="Parents & Youth">Parents & Youth</option>
                      <option value="Counseling & Care">Counseling & Care</option>
                      <option value="Executive & Board">Executive & Board</option>
                      <option value="Brand & Growth">Brand & Growth</option>
                      <option value="Kingdom Network">Kingdom Network</option>
                      <option value="School / International Education Leader">
                        School / International Education Leader
                      </option>
                      <option value="Parent / Family Member">Parent / Family Member</option>
                      <option value="Corporate Leader / HR / L&D">
                        Corporate Leader / HR / L&D
                      </option>
                      <option value="Entrepreneur / SME Founder">
                        Entrepreneur / SME Founder
                      </option>
                      <option value="Board Director / Governance Professional">
                        Board Director / Governance Professional
                      </option>
                      <option value="Purpose-Led Organisation / NGO">
                        Purpose-Led Organisation / NGO
                      </option>
                    </select>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#3D4A26] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Sarah Jenkins"
                        className="w-full p-3 bg-[#EFEBE0] border border-[#3D4A26]/20 text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#3D4A26] mb-1">
                        Work or Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full p-3 bg-[#EFEBE0] border border-[#3D4A26]/20 text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26] rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#3D4A26] mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+60 12-345 6789"
                        className="w-full p-3 bg-[#EFEBE0] border border-[#3D4A26]/20 text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wider uppercase text-[#3D4A26] mb-1">
                        Organisation / School / Business
                      </label>
                      <input
                        type="text"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        placeholder="Organisation name"
                        className="w-full p-3 bg-[#EFEBE0] border border-[#3D4A26]/20 text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26] rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#3D4A26] mb-1">
                      How can we serve or collaborate?
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your team, school, venture, or inquiry requirements..."
                      className="w-full p-3 bg-[#EFEBE0] border border-[#3D4A26]/20 text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#3D4A26] rounded-xl"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#3D4A26]/15 flex items-center justify-between">
                    <span className="text-[11px] text-[#2B2B2B]/60">
                      Strictly confidential. No spam.
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#3D4A26] hover:bg-[#2D3A1E] transition-colors cursor-pointer rounded-full shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
