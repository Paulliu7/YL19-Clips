import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 border-b border-border-dim bg-bg-deep px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 text-sm font-semibold">
        Video_Campaign_Q4.mp4 
        <span className="bg-[#1E1E22] px-2 py-1 rounded border border-accent-soft text-[10px] uppercase tracking-wider text-accent">
          Human-Like Active
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="bg-[#1E1E22] px-2 py-1 rounded border border-accent-soft text-[10px] uppercase tracking-wider text-text-dim">
          Token: 1,420
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center font-bold text-xs text-text-dim">
            YL
          </div>
        </div>
      </div>
    </header>
  );
}
