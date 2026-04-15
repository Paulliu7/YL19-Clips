import React from 'react';
import { Play, Download, Share2, MoreHorizontal, Star, Clock, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export interface Clip {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  score: number;
  reason: string;
  transcript: string;
  editingNotes: string;
}

interface ClipCardProps {
  clip: Clip;
  index: number;
  key?: string | number;
}

export function ClipCard({ clip, index }: ClipCardProps) {
  const isRanked = clip.score >= 90;

  return (
    <div className={cn(
      "bg-[#1E1E22] border border-border-dim rounded-xl p-4 relative transition-all",
      isRanked && "border-accent bg-gradient-to-r from-[#1E1E22] to-[#161D1C]"
    )}>
      <div className={cn(
        "absolute top-3 right-3 text-lg font-extrabold",
        isRanked ? "text-accent" : "text-text-dim"
      )}>
        {clip.score}
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-text-main">{clip.title}</p>
        <div className="flex items-center gap-2 text-[10px] font-bold text-text-dim uppercase tracking-wider">
          <span>{clip.endTime - clip.startTime}s</span>
          <span>•</span>
          <span>{isRanked ? 'Viral Intent' : 'Educational'}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button className="flex-1 py-2 bg-accent text-black text-[10px] font-extrabold rounded uppercase hover:opacity-90 transition-opacity">
          Export Now
        </button>
        <button className="p-2 bg-bg-deep border border-border-dim rounded text-text-dim hover:text-text-main transition-colors">
          <Play className="w-3 h-3 fill-current" />
        </button>
      </div>
    </div>
  );
}
