import React from 'react';
import { ClipboardList, Sparkles, Info } from 'lucide-react';

interface RulesBoxProps {
  rules: string;
  setRules: (rules: string) => void;
}

export function RulesBox({ rules, setRules }: RulesBoxProps) {
  return (
    <div className="bg-[#16161C] border border-accent-soft rounded-xl p-6 space-y-4 relative">
      <div className="absolute -top-2 left-3 bg-accent text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
        Mandatory Brief
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-text-dim">AI Instructions</h3>
        </div>
      </div>

      <div className="relative">
        <textarea 
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          placeholder="- Hook must appear in first 3s\n- Target: Educational Tone\n- Focus on product benefit..."
          className="w-full h-32 bg-bg-deep border border-border-dim rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none placeholder:text-white/10 italic text-[#CBD5E1]"
        />
      </div>

      <div className="bg-[#1E1E22] p-3 rounded-lg border border-border-dim space-y-3">
        <div>
          <div className="text-[10px] font-bold text-text-dim uppercase mb-1">Anti-Detection Mask</div>
          <div className="text-[10px] text-accent font-bold uppercase">Enabled: Variational Pacing 1.2x</div>
        </div>
        <div className="pt-2 border-t border-white/5">
          <div className="text-[10px] font-bold text-text-dim uppercase mb-2">Quick Presets</div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Image to Video', rule: '- Transform static images into dynamic 3D parallax video clips' },
              { label: 'Music Beat-Sync', rule: '- Sync video cuts and action spikes with music beats (Sports/Movie style)' },
              { label: 'Cinematic Flow', rule: '- Use slow transitions and deep color grading' },
            ].map((preset) => (
              <button 
                key={preset.label}
                onClick={() => setRules(rules + (rules ? '\n' : '') + preset.rule)}
                className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-text-dim hover:border-accent/50 hover:text-accent transition-all uppercase font-bold"
              >
                + {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
