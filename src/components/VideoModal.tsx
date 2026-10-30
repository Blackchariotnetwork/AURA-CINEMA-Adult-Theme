import React, { useState } from 'react';
import { Scene } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Download, Lock, CheckCircle, Star, Sparkles, Layers } from 'lucide-react';
import { CinematicArtwork } from './CinematicArtwork';

interface VideoModalProps {
  scene: Scene | null;
  onClose: () => void;
  onOpenJoinModal: () => void;
  onSelectModel: (modelName: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  scene,
  onClose,
  onOpenJoinModal,
  onSelectModel
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraAngle, setCameraAngle] = useState<'main' | 'pov' | 'closeup'>('main');
  const [selectedQuality, setSelectedQuality] = useState<'4K' | '1080p' | '720p'>('4K');
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'specs' | 'photos'>('overview');

  if (!scene) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
          aria-label="Close Scene Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black w-full overflow-hidden">
          <CinematicArtwork
            theme={getThemeBySlug(scene.slug)}
            title={scene.title}
            aspect="aspect-video"
            className="w-full h-full"
            isPlaying={isPlaying}
          />

          {/* Top badges and angle switcher */}
          <div className="absolute top-4 left-4 right-14 flex items-center justify-between z-20 pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-bold text-rose-400 border border-rose-500/30">
                {selectedQuality} · {scene.fps}FPS
              </span>
              <span className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-neutral-300 hidden sm:inline">
                PREVIEW CUT (02:45)
              </span>
            </div>

            {/* Interactive Multi-Angle Camera Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10 pointer-events-auto text-xs">
              <span className="text-[10px] font-mono text-neutral-400 px-1.5 flex items-center gap-1">
                <Layers className="w-3 h-3 text-rose-500" />
                Angle:
              </span>
              {(
                [
                  { key: 'main', label: "Director's" },
                  { key: 'pov', label: 'POV' },
                  { key: 'closeup', label: 'Close-up' }
                ] as const
              ).map((ang) => (
                <button
                  key={ang.key}
                  onClick={() => setCameraAngle(ang.key)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    cameraAngle === ang.key
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {ang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Player Overlay Bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 z-20">
            {/* Timeline progress line */}
            <div className="w-full h-1.5 bg-white/20 rounded-full mb-3 overflow-hidden cursor-pointer">
              <div className="h-full bg-rose-600 w-1/3" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
                </button>
                <span className="font-mono tabular-nums text-neutral-300 text-[11px]">
                  01:14 / {scene.duration}
                </span>
              </div>

              {/* Resolution options */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                {(['4K', '1080p', '720p'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      selectedQuality === q ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Member Upgrade Callout Banner */}
        <div className="bg-gradient-to-r from-rose-950/80 via-neutral-900 to-neutral-900 border-y border-rose-500/30 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs">
            <Lock className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-neutral-200">
              You are watching the <strong className="text-white">free tour preview</strong>. Unlock the full uncensored <strong className="text-white">{scene.duration}</strong> 4K master.
            </span>
          </div>
          <button
            onClick={() => {
              onOpenJoinModal();
              onClose();
            }}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            Unlock Full 4K Scene
          </button>
        </div>

        {/* Scene Info & Tabs */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5 flex-wrap">
            <span className="text-rose-400 font-semibold cursor-pointer hover:underline" onClick={() => onSelectModel(scene.models[0].name)}>
              {scene.models.map(m => m.name).join(' & ')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{scene.duration} Full Runtime</span>
            <span aria-hidden="true">·</span>
            <span>Released {scene.releaseDate}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 flex items-center gap-1 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              {scene.rating} ({scene.votesCount.toLocaleString()} votes)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
            {scene.title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
            {scene.description}
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-xl border border-white/[0.06] mb-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview &amp; Cast
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'chapters' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Scene Chapters ({scene.chapters.length})
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'specs' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Technical Specs &amp; Downloads
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'photos' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Photo Set ({scene.photoCount} HD)
            </button>
          </div>

          {/* Tab Content Panes */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px] mb-1">Featured Performers:</div>
                  <div className="space-y-1">
                    {scene.models.map(m => (
                      <div key={m.id} className="flex items-center justify-between">
                        <span className="text-white font-medium">{m.name}</span>
                        <button
                          onClick={() => {
                            onSelectModel(m.name);
                            onClose();
                          }}
                          className="text-rose-400 hover:underline text-[11px] cursor-pointer"
                        >
                          View Bio &amp; Filmography
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-900/80 p-3 rounded-xl border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px] mb-1">Categories &amp; Themes:</div>
                  <div className="text-neutral-300 leading-relaxed">
                    {scene.categories.join(' · ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="space-y-2">
              {scene.chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-neutral-900/80 rounded-xl border border-white/[0.04] text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-rose-400 font-semibold">{ch.time}</span>
                    <span className="text-neutral-200 font-medium">{ch.title}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Member Chapter
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px]">4K UHD Master</div>
                  <div className="font-mono text-neutral-200 mt-1 font-semibold">{scene.downloadSizes.uhd4k}</div>
                  <div className="text-neutral-500 text-[10px] mt-0.5">3840x2160 · 60fps · ProRes / H.265</div>
                </div>
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px]">1080p High Profile</div>
                  <div className="font-mono text-neutral-200 mt-1 font-semibold">{scene.downloadSizes.hd1080}</div>
                  <div className="text-neutral-500 text-[10px] mt-0.5">1920x1080 · 60fps · AVC / MP4</div>
                </div>
                <div className="bg-neutral-900/80 p-3 rounded-xl border border-white/[0.04]">
                  <div className="text-neutral-500 text-[11px]">Mobile Optimized</div>
                  <div className="font-mono text-neutral-200 mt-1 font-semibold">{scene.downloadSizes.sd720}</div>
                  <div className="text-neutral-500 text-[10px] mt-0.5">1280x720 · Universal Format</div>
                </div>
              </div>

              <div className="p-3 bg-neutral-900/60 rounded-xl border border-white/[0.04] text-[11px] text-neutral-400 flex items-center justify-between">
                <span>Direct DRM-Free Downloads are enabled on all VIP plans with no bandwidth throttling.</span>
                <button
                  onClick={() => {
                    onOpenJoinModal();
                    onClose();
                  }}
                  className="text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
                >
                  Get Download Pass &rarr;
                </button>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-3">
              <div className="text-xs text-neutral-400">
                Preview thumbnails from the high-resolution set ({scene.photoCount} total shots in full member gallery):
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/[0.08] flex items-center justify-center relative overflow-hidden group cursor-pointer"
                    onClick={() => {
                      onOpenJoinModal();
                      onClose();
                    }}
                  >
                    <span className="text-[10px] font-mono text-neutral-500">#{idx}</span>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
