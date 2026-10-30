import React, { useState } from 'react';
import { ViewTab } from '../types';
import { ShieldCheck, Lock, Mail, HelpCircle, X } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: ViewTab) => void;
  onOpenJoinModal: () => void;
  onOpenLoginModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onTabChange,
  onOpenJoinModal,
  onOpenLoginModal
}) => {
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setSupportModalOpen(false);
      setSupportMessage('');
    }, 1500);
  };

  return (
    <>
      <footer className="bg-[#08080b] border-t border-white/[0.08] text-neutral-400 text-xs py-12 pb-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          {/* Top Row: Brand & Quick Navigation Mirror */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="font-display text-xl font-bold tracking-tight text-white">
                AURA<span className="text-rose-500">·</span>CINEMA
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Premier independent production studio dedicated to 4K Ultra HD adult cinema, uncompressed audio mastering, and immersive stereoscopic VR.
              </p>
              <div className="text-[11px] text-neutral-500 font-mono">
                DISCREET BILLING · 100% PRIVATE
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white mb-3 font-mono">
                Studio Tour
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onTabChange('tour')} className="hover:text-white transition-colors cursor-pointer">
                    Featured Trailer Showcase
                  </button>
                </li>
                <li>
                  <button onClick={() => onTabChange('scenes')} className="hover:text-white transition-colors cursor-pointer">
                    4K Video Galleries
                  </button>
                </li>
                <li>
                  <button onClick={() => onTabChange('models')} className="hover:text-white transition-colors cursor-pointer">
                    Exclusive Performers Roster
                  </button>
                </li>
                <li>
                  <button onClick={() => onTabChange('photos')} className="hover:text-white transition-colors cursor-pointer">
                    Hasselblad Photo Sets
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white mb-3 font-mono">
                Member Services
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={onOpenJoinModal} className="text-rose-400 hover:text-rose-300 font-medium transition-colors cursor-pointer">
                    Join VIP Pass (Instant Access)
                  </button>
                </li>
                <li>
                  <button onClick={onOpenLoginModal} className="hover:text-white transition-colors cursor-pointer">
                    Member Portal Sign In
                  </button>
                </li>
                <li>
                  <button onClick={() => onTabChange('pricing')} className="hover:text-white transition-colors cursor-pointer">
                    Discreet Statement Descriptors
                  </button>
                </li>
                <li>
                  <button onClick={() => setSupportModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                    24/7 Member Help Desk
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white mb-3 font-mono">
                Trust &amp; Legal
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setComplianceModalOpen(true)} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>18 U.S.C. 2257 Statement</span>
                  </button>
                </li>
                <li>
                  <span className="text-neutral-500">RTA Labeling Compliant</span>
                </li>
                <li>
                  <span className="text-neutral-500">PCI-DSS Level 1 Merchant Gateway</span>
                </li>
                <li>
                  <span className="text-neutral-500">1-Click Online Self-Cancellation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Compliance & Discreet Billing Banner */}
          <div className="pt-6 border-t border-white/[0.06] text-[11px] text-neutral-500 leading-relaxed space-y-2">
            <p>
              <strong className="text-neutral-400">18+ RESTRICTED ACCESS NOTICE:</strong> This website contains sexually explicit content for consenting adults aged 18 years or older (or the age of legal majority in your jurisdiction). By entering this tour portal, you certify that you are of legal age and consent to viewing adult materials.
            </p>
            <p>
              <strong className="text-neutral-400">DISCREET CARD STATEMENT GUARANTEE:</strong> All subscription charges will be billed discreetly under the merchant name <span className="text-neutral-300 font-mono">&quot;V-MEDIA SERVICES LLC&quot;</span> or <span className="text-neutral-300 font-mono">&quot;N-TECH DIGITAL SOLUTIONS&quot;</span>. No adult references will appear on any bank documentation.
            </p>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              &copy; {new Date().getFullYear()} Aura Cinema Group. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Service</span>
              <span>·</span>
              <span>Refund Guarantee</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 2257 Compliance Modal */}
      {complianceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#111116] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setComplianceModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              18 U.S.C. § 2257 Record-Keeping Compliance Notice
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed space-y-2">
              All visual depictions of actual or simulated sexually explicit conduct featured on this website are produced in full compliance with Title 18 U.S.C. Section 2257 and its implementing regulations.
              <br /><br />
              All performers appearing in productions were 18 years of age or older at the time of filming. Records required by law are maintained by the designated custodian of records at Aura Cinema Productions Ltd.
            </p>
            <button
              onClick={() => setComplianceModalOpen(false)}
              className="mt-6 w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Close Compliance Statement
            </button>
          </div>
        </div>
      )}

      {/* Support / Help Desk Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#111116] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setSupportModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-rose-500" />
              VIP Support &amp; Billing Assistance
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Need assistance with your pass, discrete billing questions, or download links? Our concierge replies within 1 hour.
            </p>

            {supportSent ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300">
                Ticket submitted! A support specialist will email you shortly.
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Your contact email"
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                />
                <textarea
                  rows={3}
                  required
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Describe your inquiry (billing, login, technical)..."
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Send Support Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
