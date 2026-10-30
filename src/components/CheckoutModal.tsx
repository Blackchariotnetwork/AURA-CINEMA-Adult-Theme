import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS, DISCRETE_BILLING_DESCRIPTORS } from '../data/mockData';
import { SubscriptionPlan } from '../types';
import { X, Lock, ShieldCheck, CreditCard, Check, AlertCircle, Sparkles, QrCode, ArrowRight, UserCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: SubscriptionPlan;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialPlan
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    initialPlan ? initialPlan.id : 'plan-quarterly'
  );
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'sepa'>('card');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('923');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  if (!isOpen) return null;

  const currentPlan =
    SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'TOUR20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else if (code === 'VIP10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid coupon. Try code "TOUR20" for 20% off.');
    }
  };

  const cryptoBonusDiscount = paymentMethod === 'crypto' ? 10 : 0;
  const totalDiscountRate = Math.min(50, discountPercent + cryptoBonusDiscount);

  const basePrice = currentPlan.totalBilled;
  const finalPrice = totalDiscountRate > 0
    ? (basePrice * (1 - totalDiscountRate / 100)).toFixed(2)
    : basePrice.toFixed(2);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address for your membership pass.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setReceiptNumber(`AURA-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-950/60 via-neutral-900 to-neutral-900 p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            256-Bit SSL Encrypted Checkout
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            {isSuccess ? 'VIP Membership Activated' : 'Unlock Studio VIP Access'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {isSuccess
              ? 'Your account has been provisioned with instant 4K Ultra HD streaming privileges.'
              : 'Discreet billing guaranteed. No adult keywords will appear on your bank statement.'}
          </p>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                PAYMENT CONFIRMED · PASS GENERATED
              </span>
              <h3 className="text-xl font-display font-bold text-white mt-1">
                Welcome to Aura Cinema VIP
              </h3>
              <p className="text-xs text-neutral-300 mt-1 max-w-md mx-auto">
                Your credentials have been sent to <strong className="text-white">{email}</strong>. You now have unlimited unthrottled access to all 4K scenes, photo sets, and VR downloads.
              </p>
            </div>

            {/* Simulated Digital VIP Pass */}
            <div className="bg-gradient-to-br from-neutral-900 via-[#181824] to-neutral-900 border border-rose-500/40 rounded-xl p-5 text-left shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="font-display font-bold text-white text-base">AURA VIP PASS</div>
                <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  ACTIVE
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mt-3">
                <div>
                  <div className="text-neutral-500 text-[10px]">MEMBER EMAIL</div>
                  <div className="text-neutral-200 font-medium truncate">{email}</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">MEMBERSHIP TIER</div>
                  <div className="text-rose-400 font-medium">{currentPlan.name}</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">RECEIPT REF</div>
                  <div className="font-mono text-neutral-300">{receiptNumber}</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">DISCREET DESCRIPTOR</div>
                  <div className="text-neutral-300 font-mono text-[10px]">V-MEDIA SERVICES LLC</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Start Streaming Full 4K Library &rarr;
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            {/* Step 1: Select Plan */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                1. Select Membership Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SUBSCRIPTION_PLANS.map((plan) => {
                  const isSelected = plan.id === selectedPlanId;
                  return (
                    <button
                      type="button"
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-950/30 border-rose-500 ring-1 ring-rose-500/40 text-white'
                          : 'bg-neutral-900 border-white/[0.08] hover:border-white/20 text-neutral-400'
                      }`}
                    >
                      <div className="text-[11px] font-semibold truncate text-white">{plan.period}</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5 tabular-nums">
                        ${plan.pricePerMonth.toFixed(2)}<span className="text-[10px] text-neutral-400 font-normal">/mo</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1">
                        ${plan.totalBilled} total
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Payment Rail Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                2. Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-neutral-800 border-rose-500 text-white font-medium'
                      : 'bg-neutral-900 border-white/[0.08] text-neutral-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-rose-500" />
                  <span className="text-xs">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer relative ${
                    paymentMethod === 'crypto'
                      ? 'bg-neutral-800 border-rose-500 text-white font-medium'
                      : 'bg-neutral-900 border-white/[0.08] text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                    -10% OFF
                  </span>
                  <QrCode className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                  <span className="text-xs">Crypto (BTC/USDT)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('sepa')}
                  className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                    paymentMethod === 'sepa'
                      ? 'bg-neutral-800 border-rose-500 text-white font-medium'
                      : 'bg-neutral-900 border-white/[0.08] text-neutral-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <span className="text-xs">SEPA / Wire</span>
                </button>
              </div>
            </div>

            {/* Step 3: Account Email & Payment Credentials */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                  Email Address (for instant pass delivery)
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-2.5 bg-neutral-900/60 p-3.5 rounded-xl border border-white/[0.06]">
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-0.5">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-0.5">Expires (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 mb-0.5">CVV Code</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-emerald-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span>Direct Anonymous Wallet Transfer</span>
                    <span className="font-mono text-[10px]">10% DISCOUNT APPLIED</span>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-lg border border-white/10 font-mono text-[11px] text-neutral-300 break-all select-all">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Supports BTC, ETH, USDT (TRC-20 &amp; ERC-20). Instant automatic confirmation.
                  </div>
                </div>
              )}

              {paymentMethod === 'sepa' && (
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/10 space-y-1.5 text-xs">
                  <div className="text-white font-medium">European Direct Debit / IBAN</div>
                  <div className="text-[11px] text-neutral-400">
                    Instant SEPA transfer processed via licensed Luxembourg clearing house.
                  </div>
                </div>
              )}
            </div>

            {/* Promo Code Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Promo Code (try TOUR20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 uppercase font-mono"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Coupon code applied! {discountPercent}% discount deducted.
              </div>
            )}
            {promoError && (
              <div className="text-[11px] text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {promoError}
              </div>
            )}

            {/* Discreet Statement Reminder */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-white/[0.04] text-[11px] text-neutral-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Billed anonymously as: <strong className="text-neutral-200">V-MEDIA SERVICES LLC</strong></span>
              </span>
              <span className="font-mono text-white font-bold tabular-nums text-sm">
                ${finalPrice}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-950/80 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Securing Pass...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Activate VIP Access Now · ${finalPrice}</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-neutral-500 font-mono">
              30-Day Money Back Guarantee · Cancel with 1 click online anytime
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
