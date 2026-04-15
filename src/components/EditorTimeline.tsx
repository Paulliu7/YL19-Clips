import React from 'react';
import { Scissors, Type, Music, Layers, Play, SkipBack, SkipForward, Volume2, Video, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export function EditorTimeline() {
  return (
    <div className="bg-panel-bg border border-border-dim rounded-2xl overflow-hidden flex flex-col h-[400px]">
      <div className="h-12 border-b border-border-dim px-6 flex items-center justify-between bg-bg-deep/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-text-dim">Timeline Editor</span>
          </div>
          <div className="flex items-center gap-4 text-text-dim">
            <button className="hover:text-accent transition-colors"><Type className="w-4 h-4" /></button>
            <button className="hover:text-accent transition-colors"><Music className="w-4 h-4" /></button>
            <button className="hover:text-accent transition-colors"><Layers className="w-4 h-4" /></button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-accent-soft px-2 py-1 rounded border border-accent/20">
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="text-[9px] font-bold text-accent uppercase">AI Sync Active</span>
          </div>
          <span className="font-mono text-xs text-accent">00:12:45 / 00:30:00</span>
          <div className="h-4 w-px bg-border-dim" />
          <div className="flex items-center gap-2">
            <button className="p-1 hover:text-accent transition-colors"><SkipBack className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>
            <button className="p-1 hover:text-accent transition-colors"><SkipForward className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-bg-deep/30 relative overflow-hidden p-4 space-y-2">
        {/* Timeline Tracks */}
        {[
          { icon: Video, label: 'Video', color: 'bg-accent/20 border-accent/50', isImageToVideo: true },
          { icon: Type, label: 'Captions', color: 'bg-white/10 border-white/20' },
          { icon: Music, label: 'Audio', color: 'bg-accent/40 border-accent', isSynced: true }
        ].map((track, i) => (
          <div key={i} className="flex gap-4 h-16">
            <div className="w-24 flex flex-col items-center justify-center gap-1 border-r border-border-dim">
              <span className="text-[10px] font-bold uppercase text-text-dim">{track.label}</span>
              {track.isSynced && <span className="text-[8px] text-accent font-bold uppercase">Beat-Sync</span>}
              {track.isImageToVideo && <span className="text-[8px] text-accent font-bold uppercase">Img-to-Vid</span>}
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-1/4 right-1/3 rounded-lg border border-dashed border-border-dim bg-white/[0.02]" />
              <div className={cn("absolute inset-y-2 left-[10%] w-[40%] rounded-md border", track.color)}>
                {track.isSynced && (
                  <div className="absolute inset-0 flex items-center justify-around px-2 opacity-30">
                    {[...Array(12)].map((_, j) => (
                      <div key={j} className="w-0.5 h-full bg-accent" />
                    ))}
                  </div>
                )}
              </div>
              <div className={cn("absolute inset-y-2 left-[55%] w-[20%] rounded-md border", track.color)} />
            </div>
          </div>
        ))}

        {/* Playhead */}
        <div className="absolute top-0 bottom-0 left-[35%] w-px bg-accent shadow-[0_0_10px_rgba(45,212,191,0.5)] z-20">
          <div className="absolute top-0 -translate-x-1/2 w-3 h-3 bg-accent rotate-45" />
        </div>
        
        {/* Time Markers */}
        <div className="absolute bottom-0 left-24 right-0 h-6 border-t border-border-dim flex justify-between px-4 items-center">
          {[0, 5, 10, 15, 20, 25, 30].map(s => (
            <span key={s} className="text-[9px] font-mono text-text-dim">{s}s</span>
          ))}
        </div>
      </div>

      <div className="h-10 bg-bg-deep border-t border-border-dim px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-3 h-3 text-text-dim" />
            <div className="w-24 h-1 bg-border-dim rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-accent" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-dim uppercase font-bold">Music Sync:</span>
            <span className="text-[10px] text-accent font-bold uppercase italic">Sports/Cinematic Mode</span>
          </div>
          <div className="h-4 w-px bg-border-dim" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-dim uppercase font-bold">AI Detection:</span>
            <span className="text-[10px] text-accent font-bold uppercase">Bypassed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
