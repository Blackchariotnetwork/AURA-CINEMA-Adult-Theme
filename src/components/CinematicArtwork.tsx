import React from 'react';

interface CinematicArtworkProps {
  sceneId?: string;
  theme: 'penthouse' | 'villa' | 'vr' | 'london' | 'neon' | 'backstage' | 'chateau' | 'capri' | 'performer' | 'general';
  title?: string;
  aspect?: string;
  className?: string;
  showPlayOverlay?: boolean;
  isPlaying?: boolean;
  isHovered?: boolean;
  scrubPercent?: number; // 0 to 100
}

export const CinematicArtwork: React.FC<CinematicArtworkProps> = ({
  theme,
  title,
  aspect = 'aspect-video',
  className = '',
  showPlayOverlay = false,
  isPlaying = false,
  isHovered = false,
  scrubPercent = 0
}) => {
  // Color palette definitions per scene theme
  const getThemeStyles = () => {
    switch (theme) {
      case 'penthouse':
        return {
          bg: 'from-[#1c0812] via-[#2a0e1c] to-[#0d0408]',
          accent: '#e11d48',
          flare: 'rgba(244, 63, 94, 0.4)',
          ambient: 'radial-gradient(ellipse at 70% 30%, rgba(225, 29, 72, 0.25) 0%, transparent 60%)',
          subtext: 'PENTHOUSE SUITE · 4K 60FPS'
        };
      case 'villa':
        return {
          bg: 'from-[#1f160e] via-[#2d2015] to-[#0e0905]',
          accent: '#d97706',
          flare: 'rgba(245, 158, 11, 0.35)',
          ambient: 'radial-gradient(ellipse at 30% 20%, rgba(245, 158, 11, 0.2) 0%, transparent 60%)',
          subtext: 'PRIVATE BALEARIC VILLA · GOLDEN HOUR'
        };
      case 'vr':
        return {
          bg: 'from-[#140b22] via-[#21123a] to-[#080310]',
          accent: '#a855f7',
          flare: 'rgba(168, 85, 247, 0.4)',
          ambient: 'radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
          subtext: 'SPATIAL 180° VR · 8K STEREO'
        };
      case 'london':
        return {
          bg: 'from-[#1c120c] via-[#281a12] to-[#0a0604]',
          accent: '#f59e0b',
          flare: 'rgba(217, 119, 6, 0.3)',
          ambient: 'radial-gradient(ellipse at 80% 40%, rgba(217, 119, 6, 0.2) 0%, transparent 60%)',
          subtext: 'MAYFAIR CLUB · 10-BIT CINEMA'
        };
      case 'neon':
        return {
          bg: 'from-[#1f0b27] via-[#2b0f38] to-[#0c0410]',
          accent: '#d946ef',
          flare: 'rgba(217, 70, 239, 0.4)',
          ambient: 'radial-gradient(ellipse at 40% 60%, rgba(217, 70, 239, 0.25) 0%, transparent 60%)',
          subtext: 'NEON ATELIER · TOKYO SHADOWS'
        };
      case 'backstage':
        return {
          bg: 'from-[#18181b] via-[#27272a] to-[#09090b]',
          accent: '#71717a',
          flare: 'rgba(161, 161, 170, 0.25)',
          ambient: 'radial-gradient(ellipse at 50% 30%, rgba(161, 161, 170, 0.15) 0%, transparent 60%)',
          subtext: 'AURA STUDIO BACKSTAGE · UNCENSORED'
        };
      case 'chateau':
        return {
          bg: 'from-[#220c13] via-[#33111b] to-[#0c0306]',
          accent: '#f43f5e',
          flare: 'rgba(244, 63, 94, 0.35)',
          ambient: 'radial-gradient(ellipse at 60% 40%, rgba(244, 63, 94, 0.2) 0%, transparent 60%)',
          subtext: 'CHÂTEAU PRIVÉ · BORDEAUX ESTATE'
        };
      case 'capri':
        return {
          bg: 'from-[#19150d] via-[#261f12] to-[#090704]',
          accent: '#eab308',
          flare: 'rgba(234, 179, 8, 0.3)',
          ambient: 'radial-gradient(ellipse at 40% 30%, rgba(234, 179, 8, 0.2) 0%, transparent 60%)',
          subtext: 'CAPRI COASTAL · MEDITERRANEAN'
        };
      default:
        return {
          bg: 'from-[#16161c] via-[#22222c] to-[#0c0c10]',
          accent: '#f43f5e',
          flare: 'rgba(244, 63, 94, 0.3)',
          ambient: 'radial-gradient(ellipse at 50% 50%, rgba(244, 63, 94, 0.2) 0%, transparent 60%)',
          subtext: 'STUDIO EXCLUSIVE 4K'
        };
    }
  };

  const style = getThemeStyles();
  const dynamicShift = isHovered ? (scrubPercent * 0.4 - 20) : 0;

  return (
    <div
      className={`relative overflow-hidden w-full select-none bg-gradient-to-br ${style.bg} ${aspect} ${className}`}
      style={{
        backgroundImage: style.ambient
      }}
    >
      {/* Background Architectural & Film Still Graphics */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 transition-transform duration-700 ease-out"
        style={{
          transform: `scale(${isHovered ? 1.05 : 1.0}) translateX(${dynamicShift}px)`
        }}
        viewBox="0 0 800 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`grad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={style.accent} stopOpacity="0.4" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="100%" stopColor={style.accent} stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id={`glow-${theme}`} cx="65%" cy="35%" r="60%">
            <stop offset="0%" stopColor={style.accent} stopOpacity="0.45" />
            <stop offset="50%" stopColor={style.accent} stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <filter id={`blur-${theme}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="35" />
          </filter>
        </defs>

        {/* Ambient background light orbs */}
        <circle cx="580" cy="180" r="220" fill={`url(#glow-${theme})`} filter={`url(#blur-${theme})`} />
        <circle cx="200" cy="300" r="160" fill={`url(#glow-${theme})`} opacity="0.4" filter={`url(#blur-${theme})`} />

        {/* Architectural backdrop perspective lines */}
        <path d="M0 450 L280 220 L800 220" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        <path d="M0 320 L280 220" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <path d="M800 450 L520 220 L0 220" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        <path d="M280 0 L280 450" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M520 0 L520 450" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {/* Anamorphic horizontal lens flare line */}
        <line x1="50" y1="220" x2="750" y2="220" stroke={style.accent} strokeWidth="1.5" opacity="0.6" strokeDasharray="160 30 90 20" />
        <circle cx="480" cy="220" r="4" fill="#ffffff" opacity="0.9" />

        {/* Cinematic Subject Silhouette / Staging Silhouette */}
        <g opacity="0.35" transform="translate(320, 110)">
          <path
            d="M 60 50 C 45 35, 75 10, 100 15 C 120 20, 130 45, 115 65 C 105 80, 110 95, 125 110 C 145 130, 155 160, 150 190 C 145 220, 130 250, 125 290 L 40 290 C 35 250, 25 210, 35 180 C 45 145, 55 125, 70 100 Z"
            fill="black"
          />
          {/* Subtle rim light accent */}
          <path
            d="M 100 15 C 120 20, 130 45, 115 65 C 105 80, 110 95, 125 110 C 145 130, 155 160, 150 190"
            stroke={style.accent}
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
        </g>

        {/* Film framing corners */}
        <path d="M 25 35 L 25 25 L 35 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M 775 35 L 775 25 L 765 25" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M 25 415 L 25 425 L 35 425" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M 775 415 L 775 425 L 765 425" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </svg>

      {/* Cinematic Vignette & Bottom Contrast Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />

      {/* Film grain texture simulation */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '4px 4px'
        }}
      />

      {/* Interactive live simulated scrub indicator on hover */}
      {isHovered && scrubPercent > 0 && (
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono tabular-nums text-rose-300 border border-white/10 z-10 transition-opacity">
          PREVIEW FRAME {Math.floor((scrubPercent / 100) * 120) + 1} / 120
        </div>
      )}

      {/* Subtext watermark watermark inside artwork container */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/60 pointer-events-none">
        <span className="tracking-widest uppercase font-medium drop-shadow-sm text-neutral-300">
          {style.subtext}
        </span>
      </div>

      {/* Dynamic Animated Scrub Line on Hover */}
      {isHovered && (
        <div
          className="absolute inset-y-0 w-0.5 bg-rose-500/80 shadow-[0_0_12px_#f43f5e] pointer-events-none transition-all duration-75"
          style={{ left: `${scrubPercent}%` }}
        />
      )}
    </div>
  );
};
