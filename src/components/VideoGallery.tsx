import React, { useState, useMemo } from 'react';
import { Scene } from '../types';
import { VideoCard } from './VideoCard';
import { Filter, SlidersHorizontal, LayoutGrid, Rows, Search, Film } from 'lucide-react';

interface VideoGalleryProps {
  scenes: Scene[];
  onSelectScene: (scene: Scene) => void;
  onOpenJoinModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedModelFilter: string | null;
  onClearModelFilter: () => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  scenes,
  onSelectScene,
  onOpenJoinModal,
  searchQuery,
  onSearchChange,
  selectedModelFilter,
  onClearModelFilter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'rating' | 'views' | 'duration'>('latest');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'wide'>('grid');

  const categories = [
    'All',
    '4K Ultra HD',
    'VR Experience',
    'Solo Sensations',
    'Duos & Featurettes',
    'Behind The Scenes'
  ];

  const filteredScenes = useMemo(() => {
    return scenes
      .filter((scene) => {
        // Category filter
        if (selectedCategory !== 'All' && !scene.categories.includes(selectedCategory)) {
          return false;
        }

        // Performer filter
        if (selectedModelFilter && !scene.models.some((m) => m.name.toLowerCase() === selectedModelFilter.toLowerCase())) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim().length > 0) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = scene.title.toLowerCase().includes(q);
          const matchesDesc = scene.description.toLowerCase().includes(q);
          const matchesModel = scene.models.some((m) => m.name.toLowerCase().includes(q));
          const matchesCategory = scene.categories.some((c) => c.toLowerCase().includes(q));
          return matchesTitle || matchesDesc || matchesModel || matchesCategory;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'duration') return b.durationSeconds - a.durationSeconds;
        if (sortBy === 'views') {
          const numA = parseFloat(a.viewsCount.replace('K', '')) * 1000;
          const numB = parseFloat(b.viewsCount.replace('K', '')) * 1000;
          return numB - numA;
        }
        // Default: latest (already in mock order or by release date)
        return 0;
      });
  }, [scenes, selectedCategory, selectedModelFilter, searchQuery, sortBy]);

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest font-mono text-rose-500 font-semibold mb-1">
            ORIGINAL PRODUCTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            High-Definition Video Galleries
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Stream master 4K UHD video releases with 60FPS high frame rates, spatial stereoscopic VR, and uncensored audio tracks.
          </p>
        </div>

        {/* Total counts & active filters */}
        <div className="text-xs text-neutral-400 font-mono">
          Showing <span className="text-white font-semibold">{filteredScenes.length}</span> of {scenes.length} Full Scenes
        </div>
      </div>

      {/* Filter Bar & Controls Container */}
      <div className="space-y-4 mb-8 bg-[#111116] border border-white/[0.08] p-4 rounded-2xl">
        {/* Active performer banner if filtered */}
        {selectedModelFilter && (
          <div className="flex items-center justify-between bg-rose-950/40 border border-rose-500/30 px-3.5 py-2 rounded-xl text-xs">
            <span className="text-neutral-200">
              Filtering exclusive scenes for performer: <strong className="text-rose-400 font-semibold">{selectedModelFilter}</strong>
            </span>
            <button
              onClick={onClearModelFilter}
              className="text-neutral-400 hover:text-white underline cursor-pointer"
            >
              Clear Performer Filter
            </button>
          </div>
        )}

        {/* Interactive Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm font-semibold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary controls row: Sorting + Search indicator + Grid mode switch */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
          {/* Sorting buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 hidden sm:inline">Sort by:</span>
            <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-lg border border-white/[0.06]">
              {(
                [
                  { key: 'latest', label: 'Latest' },
                  { key: 'rating', label: 'Top Rated' },
                  { key: 'views', label: 'Most Viewed' },
                  { key: 'duration', label: 'Duration' }
                ] as const
              ).map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key)}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                    sortBy === s.key
                      ? 'bg-neutral-800 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right layout toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-lg border border-white/[0.06]">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  layoutMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
                }`}
                title="3-Column Grid"
                aria-label="3-Column Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('wide')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  layoutMode === 'wide' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'
                }`}
                title="Wide Cards"
                aria-label="Wide Cards"
              >
                <Rows className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      {filteredScenes.length > 0 ? (
        <div
          className={
            layoutMode === 'wide'
              ? 'grid grid-cols-1 gap-6'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          }
        >
          {filteredScenes.map((scene) => (
            <VideoCard
              key={scene.id}
              scene={scene}
              onSelect={onSelectScene}
              onOpenJoinModal={onOpenJoinModal}
              layout={layoutMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#111116] rounded-2xl border border-white/[0.06] p-8">
          <Film className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No scenes match your criteria</h3>
          <p className="text-xs text-neutral-400 mb-4 max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different category from the filter bar above.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              onClearModelFilter();
              onSearchChange('');
            }}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Bottom Tour VIP Banner Callout */}
      <div className="mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-rose-950/60 via-neutral-900 to-neutral-900 border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-rose-400 font-semibold tracking-wider">
            MEMBER EXCLUSIVE PRIVILEGE
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Unlock Full-Length 4K Masters &amp; DRM-Free Files
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
            Tour visitors get short previews. Verified VIP members get unlimited instant streaming, multi-angle POV switching, and permanent download archives.
          </p>
        </div>
        <button
          onClick={onOpenJoinModal}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold tracking-wide uppercase shadow-lg shadow-rose-950/60 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
        >
          Join VIP Pass Today
        </button>
      </div>
    </section>
  );
};
