import React, { useState } from 'react';
import { Model } from '../types';
import { Star, Heart, Film, Image as ImageIcon, Sparkles, Globe, Award } from 'lucide-react';

interface ModelDirectoryProps {
  models: Model[];
  onSelectModel: (model: Model) => void;
  onFilterByModel: (modelName: string) => void;
  onOpenJoinModal: () => void;
}

export const ModelDirectory: React.FC<ModelDirectoryProps> = ({
  models,
  onSelectModel,
  onFilterByModel,
  onOpenJoinModal
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filterExclusiveOnly, setFilterExclusiveOnly] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const displayedModels = filterExclusiveOnly
    ? models.filter((m) => m.isStudioExclusive)
    : models;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest font-mono text-rose-500 font-semibold mb-1">
            CONTRACT ROSTER &amp; GUEST STARS
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Exclusive Studio Performers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Meet the international headliners and award-winning performers featured in Aura Cinema&apos;s 4K film catalogue.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterExclusiveOnly(!filterExclusiveOnly)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              filterExclusiveOnly
                ? 'bg-rose-600 border-rose-500 text-white font-semibold'
                : 'bg-neutral-900 border-white/10 text-neutral-300 hover:text-white'
            }`}
          >
            {filterExclusiveOnly ? 'Showing Exclusives' : 'Studio Exclusives Only'}
          </button>
        </div>
      </div>

      {/* Grid of Performers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedModels.map((model) => {
          const isFav = favorites.includes(model.id);

          return (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="group rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg shadow-black/40 flex flex-col"
            >
              {/* Top Portrait Graphic Banner */}
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${model.avatarGradient} overflow-hidden`}>
                {/* SVG Silhouette & Ambient Studio Stage */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-40 group-hover:scale-105 transition-transform duration-700"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="200" cy="110" r="80" fill="rgba(244,63,94,0.2)" />
                  <path
                    d="M 200 40 C 175 40 155 60 155 85 C 155 110 175 130 200 130 C 225 130 245 110 245 85 C 245 60 225 40 200 40 Z M 130 230 C 130 180 160 150 200 150 C 240 150 270 180 270 230 L 270 300 L 130 300 Z"
                    fill="rgba(0,0,0,0.7)"
                  />
                  {/* Subtle rim light */}
                  <path
                    d="M 155 85 C 155 60 175 40 200 40 C 225 40 245 60 245 85"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>

                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent pointer-events-none" />

                {/* Exclusivity Tag */}
                {model.isStudioExclusive && (
                  <div className="absolute top-3 left-3 bg-rose-600/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                    Exclusive Star
                  </div>
                )}

                {/* Favorite Bookmark Button */}
                <button
                  onClick={(e) => toggleFavorite(model.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors cursor-pointer"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFav ? 'text-rose-500 fill-rose-500' : 'text-neutral-400 hover:text-white'
                    }`}
                  />
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-neutral-500" />
                      {model.country}
                    </span>
                    <span>·</span>
                    <span className="text-amber-400 font-medium flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-current" />
                      {model.rating}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-rose-300 transition-colors">
                    {model.name}
                  </h3>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {model.bio}
                  </p>

                  {/* Physical Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-900/80 p-2.5 rounded-xl border border-white/[0.04] mb-4">
                    <div>
                      <span className="text-neutral-500">Height:</span>{' '}
                      <span className="text-neutral-300 font-mono">{model.stats.height}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Bust/Waist:</span>{' '}
                      <span className="text-neutral-300 font-mono">{model.stats.measurements}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Hair:</span>{' '}
                      <span className="text-neutral-300">{model.stats.hairColor}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Debut:</span>{' '}
                      <span className="text-neutral-300 font-mono">{model.stats.debutYear}</span>
                    </div>
                  </div>
                </div>

                {/* Scene & Photo Counts + Action Buttons */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-rose-500" />
                      {model.sceneCount} 4K Scenes
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
                      {model.photoSetCount} Sets
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFilterByModel(model.name);
                    }}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer shrink-0"
                  >
                    View All Videos &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
