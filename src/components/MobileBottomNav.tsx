import React from 'react';
import { ViewTab } from '../types';
import { Compass, Film, Users, Image as ImageIcon, Lock } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  onOpenJoinModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenJoinModal
}) => {
  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0c0c10]/95 backdrop-blur-lg border-t border-white/[0.08] px-2 py-1.5 h-14 flex items-center justify-around select-none"
    >
      {/* Tour Home */}
      <button
        onClick={() => onTabChange('tour')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          currentTab === 'tour' ? 'text-rose-500 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
        }`}
      >
        <Compass className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Tour</span>
      </button>

      {/* 4K Scenes */}
      <button
        onClick={() => onTabChange('scenes')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          currentTab === 'scenes' ? 'text-rose-500 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
        }`}
      >
        <Film className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Scenes</span>
      </button>

      {/* Models / Stars */}
      <button
        onClick={() => onTabChange('models')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          currentTab === 'models' ? 'text-rose-500 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
        }`}
      >
        <Users className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Stars</span>
      </button>

      {/* Photo Sets */}
      <button
        onClick={() => onTabChange('photos')}
        className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
          currentTab === 'photos' ? 'text-rose-500 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
        }`}
      >
        <ImageIcon className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Photos</span>
      </button>

      {/* VIP Access Pass Button */}
      <button
        onClick={onOpenJoinModal}
        className="flex flex-col items-center justify-center min-w-[62px] min-h-[44px] bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg px-2 shadow-sm transition-all cursor-pointer"
      >
        <Lock className="w-4 h-4 mb-0.5 text-rose-200" />
        <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">VIP Pass</span>
      </button>
    </nav>
  );
};
