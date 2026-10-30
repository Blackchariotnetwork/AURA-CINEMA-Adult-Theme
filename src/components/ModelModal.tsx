import React from 'react';
import { Model, Scene } from '../types';
import { X, Film, Image as ImageIcon, Star, Globe, Heart, ShieldCheck, Lock } from 'lucide-react';

interface ModelModalProps {
  model: Model | null;
  onClose: () => void;
  onFilterByModel: (modelName: string) => void;
  onOpenJoinModal: () => void;
  relatedScenes: Scene[];
}

export const ModelModal: React.FC<ModelModalProps> = ({
  model,
  onClose,
  onFilterByModel,
  onOpenJoinModal,
  relatedScenes
}) => {
  if (!model) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Banner */}
        <div className={`relative aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-r ${model.avatarGradient} p-6 flex flex-col justify-end overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-black/40 to-transparent pointer-events-none" />

          <div className="relative z-10">
            {model.isStudioExclusive && (
              <span className="inline-block bg-rose-600 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-2">
                Aura Contract Exclusive
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {model.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-neutral-300 mt-1">
              <span>{model.country}</span>
              <span>·</span>
              <span className="text-amber-400 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {model.rating} Community Rating
              </span>
              <span>·</span>
              <span>{model.popularCategory}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Bio */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-rose-500 font-semibold mb-1.5">
              Biography &amp; Career
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {model.bio}
            </p>
          </div>

          {/* Physical Stats Table */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold mb-2">
              Performer Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/[0.04]">
                <div className="text-neutral-500 text-[11px]">Height</div>
                <div className="font-mono text-neutral-200 mt-0.5">{model.stats.height}</div>
              </div>
              <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/[0.04]">
                <div className="text-neutral-500 text-[11px]">Measurements</div>
                <div className="font-mono text-neutral-200 mt-0.5">{model.stats.measurements}</div>
              </div>
              <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/[0.04]">
                <div className="text-neutral-500 text-[11px]">Ethnicity</div>
                <div className="text-neutral-200 mt-0.5">{model.stats.ethnicity}</div>
              </div>
              <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/[0.04]">
                <div className="text-neutral-500 text-[11px]">Hair Color</div>
                <div className="text-neutral-200 mt-0.5">{model.stats.hairColor}</div>
              </div>
              <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/[0.04]">
                <div className="text-neutral-500 text-[11px]">Debut Year</div>
                <div className="font-mono text-neutral-200 mt-0.5">{model.stats.debutYear}</div>
              </div>
              <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/[0.04]">
                <div className="text-neutral-500 text-[11px]">Library Total</div>
                <div className="font-mono text-rose-400 mt-0.5">{model.sceneCount} Full 4K Scenes</div>
              </div>
            </div>
          </div>

          {/* Top Filmography Preview */}
          {relatedScenes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold">
                  Featured Releases with {model.name}
                </h4>
                <span className="text-[11px] text-neutral-500">
                  {relatedScenes.length} scenes available
                </span>
              </div>
              <div className="space-y-2">
                {relatedScenes.slice(0, 3).map((sc) => (
                  <div
                    key={sc.id}
                    className="flex items-center justify-between p-2.5 bg-neutral-900/90 rounded-xl border border-white/[0.04] text-xs"
                  >
                    <div className="truncate max-w-[260px] sm:max-w-sm">
                      <div className="text-white font-medium truncate">{sc.title}</div>
                      <div className="text-neutral-500 text-[11px] font-mono mt-0.5">
                        {sc.duration} · {sc.resolution} · {sc.releaseDate}
                      </div>
                    </div>
                    <span className="text-rose-400 font-mono text-[11px] shrink-0">
                      {sc.rating} ★
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onFilterByModel(model.name);
                onClose();
              }}
              className="w-full sm:w-1/2 py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              Browse All {model.name} Scenes
            </button>
            <button
              onClick={() => {
                onOpenJoinModal();
                onClose();
              }}
              className="w-full sm:w-1/2 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-950/60 transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock VIP Access to Roster</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
