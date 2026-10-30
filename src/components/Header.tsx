import React, { useState } from 'react';
import { ViewTab } from '../types';
import { ShieldCheck, UserCheck, Search, Menu, X, Lock } from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  onOpenJoinModal: () => void;
  onOpenLoginModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenJoinModal,
  onOpenLoginModal,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (tab: ViewTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Quiet Compliance & Discreet Billing Bar */}
      <div className="bg-[#0e0e13] border-b border-white/[0.06] text-[11px] text-neutral-400 py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              18+ RTA Compliant
            </span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="hidden sm:inline text-neutral-400">
              Discreet billing as <strong className="text-neutral-200 font-normal">&quot;V-MEDIA SERVICES LLC&quot;</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 hidden md:inline">256-bit Encrypted Portal</span>
            <button
              onClick={onOpenLoginModal}
              className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Member Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 text nav links) — Zone 3 (1 primary CTA) */}
      <header className="sticky top-0 z-40 bg-[#0b0b0e]/95 backdrop-blur-md border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 md:px-8 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('tour')}
            className="text-left group flex items-baseline gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
              AURA<span className="text-rose-500">·</span>CINEMA
            </span>
            <span className="text-[10px] tracking-widest font-mono uppercase text-rose-400/90 hidden sm:inline">
              STUDIO TOUR
            </span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <button
              onClick={() => handleNavClick('tour')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'tour' ? 'text-white border-rose-500 font-semibold' : 'border-transparent text-neutral-400'
              }`}
            >
              Featured Tour
            </button>
            <button
              onClick={() => handleNavClick('scenes')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'scenes' ? 'text-white border-rose-500 font-semibold' : 'border-transparent text-neutral-400'
              }`}
            >
              Video Galleries
            </button>
            <button
              onClick={() => handleNavClick('models')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'models' ? 'text-white border-rose-500 font-semibold' : 'border-transparent text-neutral-400'
              }`}
            >
              Performers
            </button>
            <button
              onClick={() => handleNavClick('photos')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'photos' ? 'text-white border-rose-500 font-semibold' : 'border-transparent text-neutral-400'
              }`}
            >
              Photo Sets
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                currentTab === 'pricing' ? 'text-white border-rose-500 font-semibold' : 'border-transparent text-neutral-400'
              }`}
            >
              VIP Membership
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Search trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick search input on desktop */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search scenes or performers..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentTab !== 'scenes' && e.target.value.trim().length > 0) {
                    onTabChange('scenes');
                  }
                }}
                className="w-44 lg:w-56 bg-neutral-900/90 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-rose-500/60 focus:w-64 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenJoinModal}
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-lg shadow-sm shadow-rose-950 transition-all hover:shadow-rose-600/30 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-rose-200" />
              <span>Join VIP Pass</span>
            </button>

            {/* Mobile menu burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar dropdown */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 border-t border-white/[0.04] pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search scenes or performers..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentTab !== 'scenes' && e.target.value.trim().length > 0) {
                    onTabChange('scenes');
                  }
                }}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-rose-500"
                autoFocus
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0e14] border-t border-white/10 px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => handleNavClick('tour')}
                className={`p-2.5 rounded-lg text-left transition-colors ${
                  currentTab === 'tour' ? 'bg-rose-500/15 text-rose-400 font-medium' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                Featured Tour
              </button>
              <button
                onClick={() => handleNavClick('scenes')}
                className={`p-2.5 rounded-lg text-left transition-colors ${
                  currentTab === 'scenes' ? 'bg-rose-500/15 text-rose-400 font-medium' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                Video Galleries (4K)
              </button>
              <button
                onClick={() => handleNavClick('models')}
                className={`p-2.5 rounded-lg text-left transition-colors ${
                  currentTab === 'models' ? 'bg-rose-500/15 text-rose-400 font-medium' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                Performer Directory
              </button>
              <button
                onClick={() => handleNavClick('photos')}
                className={`p-2.5 rounded-lg text-left transition-colors ${
                  currentTab === 'photos' ? 'bg-rose-500/15 text-rose-400 font-medium' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                Photo Set Galleries
              </button>
              <button
                onClick={() => handleNavClick('pricing')}
                className={`p-2.5 rounded-lg text-left transition-colors col-span-2 ${
                  currentTab === 'pricing' ? 'bg-rose-500/15 text-rose-400 font-medium' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                VIP Membership Plans &amp; Discreet Billing
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <button
                onClick={() => {
                  onOpenLoginModal();
                  setMobileMenuOpen(false);
                }}
                className="text-neutral-300 hover:text-white underline cursor-pointer"
              >
                Existing Member Login
              </button>
              <span className="font-mono text-[10px]">100% PRIVATE</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
