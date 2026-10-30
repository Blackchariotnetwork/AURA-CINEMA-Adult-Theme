import React from 'react';
import { TOUR_PERKS } from '../data/mockData';
import { Check, X, ShieldCheck, Sparkles, Film, Download, Tv, Headphones, Lock } from 'lucide-react';

interface PerksComparisonProps {
  onOpenJoinModal: () => void;
}

export const PerksComparison: React.FC<PerksComparisonProps> = ({ onOpenJoinModal }) => {
  const comparisonItems = [
    { feature: '4K Ultra HD & 60 FPS Streams', tour: 'Short 2-3 Min Previews', vip: 'Full 45-60 Min Master Cuts' },
    { feature: 'Audio Clarity', tour: 'Compressed 128kbps Stereo', vip: 'Lossless 24-bit PCM & Binaural' },
    { feature: 'Offline Video Downloads', tour: 'No Downloads', vip: 'Unlimited DRM-Free ProRes & MP4' },
    { feature: '8K / 4K Stereoscopic VR', tour: 'Disabled', vip: 'Full VR 180° Headset Compatible' },
    { feature: 'Multi-Angle Camera Switcher', tour: 'Single Fixed Angle', vip: 'Director, POV & Close-up Switcher' },
    { feature: 'High-Res Photo Sets', tour: 'Watermarked Samples', vip: '50MP RAW Uncompressed ZIPs' },
    { feature: 'Backstage & Rehearsals', tour: 'Trailers Only', vip: 'Full Uncensored Bonus Footage' },
    { feature: 'Streaming CDN Priority', tour: 'Standard Shared Route', vip: 'Dedicated 40Gbps Edge CDN' }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
      {/* Editorial Section Kicker & Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-widest font-mono text-rose-500 font-semibold mb-2">
          THE AURA ADVANTAGE
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          Free Studio Tour vs. VIP Membership
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          See exactly how our paid membership elevates your viewing experience with true cinema-grade technical benchmarks.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-[#111116] border border-white/10 rounded-2xl overflow-hidden shadow-xl mb-16">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] bg-neutral-900/80">
                <th className="py-4 px-6 text-neutral-400 font-semibold uppercase tracking-wider">
                  Feature / Capability
                </th>
                <th className="py-4 px-6 text-neutral-400 font-semibold uppercase tracking-wider w-1/3">
                  Free Tour Visitor
                </th>
                <th className="py-4 px-6 text-rose-400 font-semibold uppercase tracking-wider w-1/3 bg-rose-950/20">
                  Aura VIP Member
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-6 font-medium text-white">
                    {item.feature}
                  </td>
                  <td className="py-3.5 px-6 text-neutral-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-neutral-600 shrink-0" />
                    <span>{item.tour}</span>
                  </td>
                  <td className="py-3.5 px-6 text-neutral-200 bg-rose-950/10 font-medium">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{item.vip}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-neutral-900/60 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            All memberships include discrete billing and immediate DRM-free download permissions.
          </div>
          <button
            onClick={onOpenJoinModal}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors cursor-pointer whitespace-nowrap"
          >
            Upgrade to Full VIP Pass
          </button>
        </div>
      </div>

      {/* 6 Key Studio Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOUR_PERKS.map((perk, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#111116] border border-white/[0.06] hover:border-white/15 transition-all"
          >
            <div className="text-[10px] font-mono text-rose-500 uppercase tracking-widest font-semibold mb-2">
              {perk.category}
            </div>
            <h3 className="text-base font-display font-bold text-white mb-2">
              {perk.title}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {perk.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
