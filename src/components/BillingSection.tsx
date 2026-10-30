import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS, DISCRETE_BILLING_DESCRIPTORS } from '../data/mockData';
import { SubscriptionPlan } from '../types';
import { ShieldCheck, Lock, CheckCircle2, CreditCard, RefreshCw, KeyRound, ArrowRight, HelpCircle } from 'lucide-react';

interface BillingSectionProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export const BillingSection: React.FC<BillingSectionProps> = ({ onSelectPlan }) => {
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'quarterly' | 'monthly' | 'annual'>('quarterly');

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
      {/* Editorial Kicker & Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-widest font-mono text-rose-500 font-semibold mb-2">
          SECURE &amp; DISCREET MEMBERSHIP
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
          Instant VIP Access. <span className="text-neutral-400 font-normal">Zero billing trace.</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
          Stream our complete uncompressed 4K library, download DRM-free archives, and experience stereoscopic VR. Backed by bank-grade encryption and 100% discrete statement descriptors.
        </p>
      </div>

      {/* Discreet Statement Simulation Card */}
      <div className="mb-12 max-w-3xl mx-auto bg-gradient-to-r from-neutral-900 via-[#13131a] to-neutral-900 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Discreet Statement Guarantee</div>
              <div className="text-xs text-neutral-400">Zero adult mentions on bank or credit card records</div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
            100% CONFIDENTIAL
          </div>
        </div>

        {/* Bank Statement Line Preview */}
        <div className="mt-4 bg-black/60 rounded-xl p-4 border border-white/[0.04] text-xs font-mono">
          <div className="text-neutral-500 text-[11px] mb-1">How it appears on your card statement:</div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-neutral-200 bg-neutral-900/90 px-3 py-2.5 rounded-lg border border-white/[0.04]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-neutral-400" />
              <span className="text-emerald-400 font-semibold">V-MEDIA SERVICES LLC 800-555-0199</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
              <span>CARD: •••• 4242</span>
              <span className="text-white font-semibold tabular-nums">$19.95</span>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-neutral-500">
            * Transactions process via secure international merchant accounts with standard digital service descriptors.
          </div>
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isHighlight = plan.isPopular;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                isHighlight
                  ? 'bg-gradient-to-b from-[#181822] via-[#121218] to-[#0c0c10] border-2 border-rose-500 shadow-2xl shadow-rose-950/40 p-6 sm:p-8 -translate-y-2'
                  : 'bg-[#111116] border border-white/[0.08] hover:border-white/20 p-6 sm:p-7 shadow-lg'
              }`}
            >
              {/* Highlight ribbon */}
              {isHighlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-rose-700 text-white text-[11px] font-bold font-mono uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                  MOST POPULAR · SAVE 33%
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-display font-bold text-white">
                    {plan.name}
                  </h3>
                  {plan.savingsPercent && !isHighlight && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      SAVE {plan.savingsPercent}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 mb-6">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/[0.06]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-display font-extrabold text-white tabular-nums">
                      ${plan.pricePerMonth.toFixed(2)}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      / month
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-1">
                    {plan.billingFrequency}
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    What&apos;s Included:
                  </div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isHighlight
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/80 hover:scale-[1.02]'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Select {plan.period}</span>
                </button>
                <div className="text-center text-[10px] text-neutral-500 font-mono mt-2">
                  Instant activation · 1-click cancellation
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="mt-14 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-1">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-rose-400">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">256-Bit SSL Encryption</div>
          <div className="text-[11px] text-neutral-400">Bank-level transport security</div>
        </div>

        <div className="space-y-1">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">PCI-DSS Level 1 Gateway</div>
          <div className="text-[11px] text-neutral-400">Certified secure card processing</div>
        </div>

        <div className="space-y-1">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-amber-400">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">1-Click Self-Cancel</div>
          <div className="text-[11px] text-neutral-400">Manage online anytime with zero calls</div>
        </div>

        <div className="space-y-1">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-rose-400">
            <KeyRound className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-white">Crypto Accepted</div>
          <div className="text-[11px] text-neutral-400">Bitcoin, USDT, Monero with 10% off</div>
        </div>
      </div>
    </section>
  );
};
