import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  Settings, 
  History, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Video, label: 'My Projects', active: false },
  { icon: History, label: 'History', active: false },
  { icon: Zap, label: 'AI Models', active: false },
];

const bottomItems = [
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Support' },
];

export function Sidebar() {
  return (
    <aside className="w-[72px] h-screen border-r border-border-dim bg-bg-deep flex flex-col items-center py-6">
      <div className="w-9 h-9 bg-gradient-to-br from-accent to-[#14B8A6] rounded-lg mb-10 flex items-center justify-center font-black text-sm text-black">
        YL
      </div>

      <nav className="flex-1 flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group",
              item.active 
                ? "bg-accent-soft text-accent" 
                : "text-text-dim hover:text-text-main hover:bg-white/5"
            )}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-4 pb-6 border-t border-border-dim pt-6">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="w-10 h-10 flex items-center justify-center text-text-dim hover:text-text-main transition-all"
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </aside>
  );
}
