import React, { useState } from 'react';
import { Scene } from '../types';
import { Play, Sparkles, Star, Download, Eye, Lock } from 'lucide-react';
import { CinematicArtwork } from './CinematicArtwork';

interface VideoCardProps {
  scene: Scene;
  onSelect: (scene: Scene) => void;
  onOpenJoinModal: () => void;
  layout?: 'grid' | 'wide';
}

export const VideoCard: React.FC<VideoCardProps> = ({
  scene,
  onSelect,
  onOpenJoinModal,
  layout = 'grid'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrubPercent, setScrubPercent] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
    setScrubPercent(pct);
  };

  const getThemeBySlug = (slug: string): 'penthouse' | 'villa' | 'vr' | 'london' | 'neon' | 'backstage' | 'chateau' | 'capri' => {
    if (slug.includes('penthouse')) return 'penthouse';
    if (slug.includes('villa')) return 'villa';
    if (slug.includes('vr')) return 'vr';
    if (slug.includes('london') || slug.includes('mayfair')) return 'london';
    if (slug.includes('tokyo') || slug.includes('neon')) return 'neon';
    if (slug.includes('backstage')) return 'backstage';
    if (slug.includes('chateau')) return 'chateau';
    return 'capri';
  };

  if (layout === 'wide') {
    return (
      <div className="group rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col md:flex-row shadow-lg shadow-black/40">
        {/* Media Thumbnail Container with Interactive Scrubber */}
        <div
          className="relative md:w-2/5 aspect-video bg-black overflow-hidden cursor-pointer shrink-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setScrubPercent(0);
          }}
          onMouseMove={handleMouseMove}
          onClick={() => onSelect(scene)}
        >
          <CinematicArtwork
            theme={getThemeBySlug(scene.slug)}
            title={scene.title}
            aspect="aspect-video"
            className="w-full h-full"
            isHovered={isHovered}
            scrubPercent={scrubPercent}
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
            <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono font-bold text-rose-400 border border-rose-500/30">
              {scene.resolution}
            </span>
            <span className="bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-300">
              {scene.fps}FPS
            </span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-xs font-mono tabular-nums text-white z-10">
            {scene.duration}
          </div>

          {/* Play Icon overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </div>
          </div>
        </div>

        {/* Content details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5 flex-wrap">
              <span className="text-rose-400 font-semibold">{scene.models.map(m => m.name).join(' & ')}</span>
              <span aria-hidden="true">·</span>
              <span>{scene.releaseDate}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {scene.rating}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{scene.viewsCount} views</span>
            </div>

            <h3
              onClick={() => onSelect(scene)}
              className="text-lg font-display font-bold text-white group-hover:text-rose-400 transition-colors cursor-pointer mb-2"
            >
              {scene.title}
            </h3>

            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
              {scene.description}
            </p>

            <div className="text-[11px] text-neutral-500 flex items-center gap-2">
              <span>Categories:</span>
              <span className="text-neutral-300">{scene.categories.join(' · ')}</span>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-4">
            <div className="text-[11px] font-mono text-neutral-400">
              Downloads: <span className="text-neutral-200">{scene.downloadSizes.uhd4k.split(' ')[0]} 4K</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelect(scene)}
                className="px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Preview Details
              </button>
              <button
                onClick={onOpenJoinModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Full Scene</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard 3-Column Grid Card
  return (
    <div className="group rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col shadow-lg shadow-black/40">
      {/* Media Thumbnail Container with Interactive Scrubber */}
      <div
        className="relative aspect-video bg-black overflow-hidden cursor-pointer shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setScrubPercent(0);
        }}
        onMouseMove={handleMouseMove}
        onClick={() => onSelect(scene)}
      >
        <CinematicArtwork
          theme={getThemeBySlug(scene.slug)}
          title={scene.title}
          aspect="aspect-video"
          className="w-full h-full"
          isHovered={isHovered}
          scrubPercent={scrubPercent}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
          <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono font-bold text-rose-400 border border-rose-500/30">
            {scene.resolution}
          </span>
          <span className="bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-300">
            {scene.fps}FPS
          </span>
        </div>

        <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-xs font-mono tabular-nums text-white z-10">
          {scene.duration}
        </div>

        {/* Hover Scrubbing Prompt indicator */}
        <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-white/70 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 px-1.5 py-0.5 rounded pointer-events-none">
          Scrub to preview
        </div>

        {/* Play Icon overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>
      </div>

      {/* Content details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
            <span className="text-rose-400 font-semibold truncate max-w-[140px]">
              {scene.models.map(m => m.name).join(' & ')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current" />
              {scene.rating}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{scene.viewsCount}</span>
          </div>

          <h3
            onClick={() => onSelect(scene)}
            className="text-base font-display font-bold text-white group-hover:text-rose-400 transition-colors cursor-pointer line-clamp-1 mb-1.5"
          >
            {scene.title}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
            {scene.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
          <div className="text-[11px] text-neutral-500 truncate">
            {scene.categories[0]} · {scene.downloadSizes.uhd4k.split(' ')[0]}
          </div>
          <button
            onClick={() => onSelect(scene)}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer shrink-0"
          >
            Watch Teaser &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
