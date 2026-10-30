import React, { useState } from 'react';
import { PhotoSet } from '../types';
import { Camera, Lock, Eye, Download, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface PhotoGalleryProps {
  photoSets: PhotoSet[];
  onOpenJoinModal: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photoSets,
  onOpenJoinModal
}) => {
  const [activePhotoSet, setActivePhotoSet] = useState<PhotoSet | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (set: PhotoSet, index = 0) => {
    setActivePhotoSet(set);
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoSet(null);
  };

  const nextImage = () => {
    if (!activePhotoSet) return;
    setActiveImageIndex((prev) => (prev + 1) % activePhotoSet.images.length);
  };

  const prevImage = () => {
    if (!activePhotoSet) return;
    setActiveImageIndex((prev) => (prev - 1 + activePhotoSet.images.length) % activePhotoSet.images.length);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest font-mono text-rose-500 font-semibold mb-1">
            ULTRA HIGH DEFINITION STILLS
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Studio Photo Set Galleries
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Captured on medium-format Hasselblad and Leica systems. Download high-resolution uncompressed JPEG &amp; RAW archives.
          </p>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          <span>50+ Megapixels</span> · <span>Zero Compression</span>
        </div>
      </div>

      {/* Grid of Photo Sets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photoSets.map((set) => (
          <div
            key={set.id}
            className="group rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden shadow-lg shadow-black/40 flex flex-col"
          >
            {/* Gallery Cover with Mosaic Layout */}
            <div
              onClick={() => openLightbox(set, 0)}
              className={`relative aspect-[4/3] bg-gradient-to-br ${set.coverGradient} cursor-pointer overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

              {/* SVG Artistic camera frame */}
              <svg
                className="absolute inset-0 w-full h-full opacity-35 group-hover:scale-105 transition-transform duration-700"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="200" cy="150" r="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <circle cx="200" cy="150" r="85" stroke="rgba(244,63,94,0.4)" strokeWidth="1.5" strokeDasharray="6 6" />
                <line x1="200" y1="50" x2="200" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="200" y1="230" x2="200" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="100" y1="150" x2="120" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <line x1="280" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              </svg>

              {/* Resolution pill */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-rose-400 border border-rose-500/30">
                {set.resolution}
              </div>

              {/* Photo count */}
              <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-xs font-mono tabular-nums text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-rose-400" />
                <span>{set.photoCount} Photos</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold shadow-lg">
                  Preview Gallery Stills
                </span>
              </div>
            </div>

            {/* Set details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                  <span className="text-rose-400 font-semibold">{set.modelName}</span>
                  <span>·</span>
                  <span>{set.releaseDate}</span>
                </div>

                <h3 className="text-base font-display font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-1 mb-3">
                  {set.title}
                </h3>

                {/* Micro Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  {set.images.slice(0, 4).map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => openLightbox(set, idx)}
                      className="aspect-square rounded-md bg-neutral-900 border border-white/5 hover:border-rose-500 transition-colors overflow-hidden cursor-pointer relative"
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${img.gradient} opacity-80 hover:opacity-100`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => openLightbox(set, 0)}
                  className="text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  View Preview Strip
                </button>
                <button
                  onClick={onOpenJoinModal}
                  className="flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Download ZIP</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoSet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev/Next */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer z-40"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer z-40"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Photo Display */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${activePhotoSet.images[activeImageIndex]?.gradient || activePhotoSet.coverGradient} border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl`}>
              {/* Studio watermark pattern */}
              <div className="text-center p-6">
                <Camera className="w-12 h-12 text-white/30 mx-auto mb-2" />
                <h4 className="text-lg font-display font-bold text-white">
                  {activePhotoSet.images[activeImageIndex]?.title || 'Studio Stills Preview'}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  {activePhotoSet.resolution} · Image {activeImageIndex + 1} of {activePhotoSet.images.length}
                </p>
                <div className="mt-4">
                  <span className="text-[10px] font-mono text-rose-400 bg-black/70 px-2.5 py-1 rounded border border-rose-500/30 uppercase tracking-widest">
                    Aura Cinema · High Res Watermarked Preview
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Strip */}
            <div className="w-full mt-4 flex items-center justify-between text-xs text-neutral-300">
              <div>
                <span className="font-semibold text-white">{activePhotoSet.title}</span>
                <span className="mx-2 text-neutral-600">·</span>
                <span>{activePhotoSet.modelName}</span>
              </div>
              <button
                onClick={() => {
                  closeLightbox();
                  onOpenJoinModal();
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res Set ({activePhotoSet.photoCount} RAW)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
