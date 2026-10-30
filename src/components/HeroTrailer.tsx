import React, { useState, useEffect, useRef } from 'react';
import { Scene } from '../types';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Download, Lock, CheckCircle2 } from 'lucide-react';
import { CinematicArtwork } from './CinematicArtwork';

interface HeroTrailerProps {
  featuredScenes: Scene[];
  onSelectScene: (scene: Scene) => void;
  onOpenJoinModal: () => void;
}

export const HeroTrailer: React.FC<HeroTrailerProps> = ({
  featuredScenes,
  onSelectScene,
  onOpenJoinModal
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const activeScene = featuredScenes[activeSceneIndex] || featuredScenes[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(145); // simulated progress
  const [selectedQuality, setSelectedQuality] = useState<'4K' | '1080p' | 'VR'>('4K');
  const [theaterMode, setTheaterMode] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= activeScene.durationSeconds) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeScene.durationSeconds]);

  // Audio visualizer wave simulation when unmuted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      if (!isMuted && isPlaying) {
        ctx.beginPath();
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.5;

        for (let x = 0; x < width; x += 3) {
          const wave1 = Math.sin((x * 0.04) + phase) * 8;
          const wave2 = Math.cos((x * 0.08) - (phase * 1.5)) * 4;
          const y = height / 2 + wave1 + wave2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        phase += 0.08;
      } else {
        // Flat line when muted
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMuted, isPlaying]);

  // Format seconds to mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = Math.floor(totalSec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, (currentTimeSec / activeScene.durationSeconds) * 100);

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
    <section className={`relative pt-4 pb-12 transition-all ${theaterMode ? 'bg-black py-8' : ''}`}>
      {/* Ambient background glow behind hero player */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-80 bg-rose-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Editorial Section Kicker & Marquee headline */}
        <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest font-mono text-rose-500 font-semibold mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              OFFICIAL STUDIO TOUR · HIGH DEFINITION PREVIEW
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white max-w-3xl leading-[1.15]">
              Mastered in 4K UHD. <span className="text-neutral-400 font-normal">Uncompromised cinema.</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span>Daily 4K Updates</span>
            <span>·</span>
            <span>Uncensored Audio</span>
            <span>·</span>
            <span className="text-neutral-200">100% DRM-Free Downloads</span>
          </div>
        </div>

        {/* Featured Showcase Player Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0d0d12] shadow-2xl shadow-black/80">
          {/* Main Visual Player Canvas Area */}
          <div className="relative aspect-video max-h-[640px] w-full flex items-center justify-center bg-black">
            <CinematicArtwork
              theme={getThemeBySlug(activeScene.slug)}
              title={activeScene.title}
              aspect="aspect-video"
              className="w-full h-full max-h-[640px]"
              isPlaying={isPlaying}
            />

            {/* Big Center Play Trigger (when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white shadow-2xl shadow-rose-900/60 hover:scale-105 transition-all cursor-pointer"
                  aria-label="Play Trailer"
                >
                  <Play className="w-9 h-9 sm:w-10 sm:h-10 ml-1.5 fill-current" />
                  <span className="absolute -bottom-8 whitespace-nowrap text-xs font-mono uppercase tracking-widest text-neutral-300 font-medium">
                    Preview 4K Teaser
                  </span>
                </button>
              </div>
            )}

            {/* Top Overlay Bar: Resolution & Status */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-semibold text-rose-400 border border-rose-500/30">
                  {activeScene.resolution} · {activeScene.fps}FPS
                </span>
                {activeScene.isExclusive && (
                  <span className="bg-black/75 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-neutral-300 border border-white/10 hidden sm:inline">
                    STUDIO EXCLUSIVE
                  </span>
                )}
              </div>

              {/* Quality selector */}
              <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10 pointer-events-auto text-xs">
                {(['4K', '1080p', 'VR'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    className={`px-2.5 py-0.5 rounded font-mono text-xs transition-colors cursor-pointer ${
                      selectedQuality === q
                        ? 'bg-rose-600 text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Scrim & Player Controls */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-12 pb-4 px-4 sm:px-6 z-20">
              {/* Interactive Timeline Scrubber with Chapter Markers */}
              <div className="relative mb-3 group/scrub">
                {/* Chapter Marker Ticks */}
                <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-rose-600 transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Chapter Tooltips / Bookmarks */}
                <div className="flex items-center justify-between mt-1.5 text-[11px] text-neutral-400 font-mono">
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
                    {activeScene.chapters.map((ch, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentTimeSec(ch.seconds);
                          setIsPlaying(true);
                        }}
                        className="hover:text-rose-400 transition-colors whitespace-nowrap cursor-pointer text-left"
                      >
                        <span className="text-neutral-500">{ch.time}</span> {ch.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Player Bottom Control Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>

                  {/* Sound Preview toggle with waveform */}
                  <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded-lg">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Toggle Sound"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
                    </button>
                    <canvas
                      ref={canvasRef}
                      width={60}
                      height={18}
                      className="w-[60px] h-[18px]"
                    />
                    <span className="text-[10px] font-mono uppercase text-neutral-400 hidden sm:inline">
                      {isMuted ? 'Muted' : 'Audio On'}
                    </span>
                  </div>

                  {/* Timestamp Display */}
                  <div className="text-xs font-mono tabular-nums text-neutral-300">
                    <span>{formatTime(currentTimeSec)}</span>
                    <span className="text-neutral-600"> / </span>
                    <span className="text-neutral-400">{activeScene.duration}</span>
                  </div>
                </div>

                {/* Right controls: Fullscreen & VIP Unlock CTA */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setTheaterMode(!theaterMode)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
                    title="Theater Mode"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenJoinModal}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Watch Full 4K Scene ({activeScene.duration})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Scene Details Strip Below Player */}
          <div className="p-4 sm:p-6 bg-[#111117] border-t border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-rose-400 font-semibold">{activeScene.models.map(m => m.name).join(' & ')}</span>
                <span aria-hidden="true">·</span>
                <span>{activeScene.duration}</span>
                <span aria-hidden="true">·</span>
                <span>Released {activeScene.releaseDate}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-medium">{activeScene.rating} ★ ({activeScene.votesCount.toLocaleString()} ratings)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                {activeScene.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeScene.description}
              </p>
            </div>

            {/* Quick Actions & Download Sizes */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <div className="bg-neutral-900/90 border border-white/10 rounded-xl p-3 text-xs space-y-1.5">
                <div className="text-neutral-400 text-[11px] font-medium flex items-center justify-between">
                  <span>DRM-Free Downloads:</span>
                  <span className="text-rose-400 font-mono">Instant VIP</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-300 font-mono text-[11px]">
                  <span>4K: {activeScene.downloadSizes.uhd4k.split(' ')[0]}</span>
                  <span>·</span>
                  <span>1080p: {activeScene.downloadSizes.hd1080.split(' ')[0]}</span>
                  <span>·</span>
                  <span>Photos: {activeScene.photoCount} HD</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectScene(activeScene)}
                  className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors text-center cursor-pointer whitespace-nowrap"
                >
                  Scene Details &amp; Photos
                </button>
                <button
                  onClick={onOpenJoinModal}
                  className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-medium transition-colors text-center cursor-pointer whitespace-nowrap"
                >
                  Unlock 4K Stream
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel of Featured Trailer Pickers */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Featured Flagship Releases
            </span>
            <span className="text-xs text-neutral-500">
              Click any release to preview in player
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featuredScenes.slice(0, 4).map((sc, idx) => {
              const isCurrent = idx === activeSceneIndex;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`relative p-2.5 rounded-xl border text-left transition-all cursor-pointer group ${
                    isCurrent
                      ? 'bg-neutral-900 border-rose-500/80 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/30'
                      : 'bg-neutral-900/60 border-white/[0.06] hover:bg-neutral-850 hover:border-white/20'
                  }`}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-black">
                    <CinematicArtwork
                      theme={getThemeBySlug(sc.slug)}
                      aspect="aspect-video"
                      className="w-full h-full"
                    />
                    <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono tabular-nums text-neutral-200">
                      {sc.duration}
                    </div>
                    {isCurrent && (
                      <div className="absolute inset-0 bg-rose-950/20 flex items-center justify-center">
                        <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          NOW PLAYING
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-white group-hover:text-rose-300 transition-colors truncate">
                    {sc.title}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {sc.models.map(m => m.name).join(', ')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
