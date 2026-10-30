import React, { useState } from 'react';
import { X, Lock, UserCheck, ShieldCheck, Check } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoinModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onOpenJoinModal
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#111116] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
          aria-label="Close Login Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-rose-600/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            VIP Member Portal Sign In
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Access your unthrottled 4K streams and active download passes.
          </p>
        </div>

        {loginSuccess ? (
          <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center space-y-2">
            <Check className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-semibold text-white">Member Authenticated</div>
            <div className="text-xs text-neutral-400">Loading your private VIP feed...</div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">
                Member Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-neutral-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions sent to your email.')}
                  className="text-[11px] text-neutral-500 hover:text-neutral-300 underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isLoggingIn ? 'Verifying Member...' : 'Sign In to VIP Area'}
            </button>

            <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-neutral-400">
              Not a VIP member yet?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenJoinModal();
                }}
                className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer underline ml-1"
              >
                Join with Discreet Billing &rarr;
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
