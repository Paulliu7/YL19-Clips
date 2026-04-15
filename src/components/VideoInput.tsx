import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Upload, 
  Youtube, 
  Music, 
  Image as ImageIcon, 
  Video as VideoIcon,
  HardDrive,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

interface VideoInputProps {
  onProcess: (url: string) => void;
  isProcessing: boolean;
}

type SourceType = 'video' | 'image' | 'music';
type Platform = 'url' | 'local' | 'drive';

export function VideoInput({ onProcess, isProcessing }: VideoInputProps) {
  const [activeType, setActiveType] = useState<SourceType>('video');
  const [activePlatform, setActivePlatform] = useState<Platform>('url');
  const [url, setUrl] = useState('');

  const types = [
    { id: 'video', label: 'Video', icon: VideoIcon },
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'music', label: 'Music', icon: Music },
  ] as const;

  const platforms = [
    { id: 'url', label: 'URL / YouTube', icon: Youtube },
    { id: 'drive', label: 'Google Drive', icon: HardDrive },
    { id: 'local', label: 'Local Upload', icon: Upload },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Source Type Tabs */}
      <div className="flex p-1 bg-bg-deep rounded-lg border border-border-dim">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
              activeType === type.id 
                ? "bg-accent-soft text-accent shadow-sm" 
                : "text-text-dim hover:text-text-main"
            )}
          >
            <type.icon className="w-3.5 h-3.5" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Platform Selection */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest block">Select Platform</label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all",
                activePlatform === platform.id 
                  ? "border-accent bg-accent-soft text-accent" 
                  : "border-border-dim bg-bg-deep text-text-dim hover:border-white/20"
              )}
            >
              <platform.icon className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-tighter">{platform.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        {activePlatform === 'local' ? (
          <div className="group relative border-2 border-dashed border-border-dim rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-accent/50 transition-all cursor-pointer bg-bg-deep">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-text-dim" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-text-main">Upload {activeType}</p>
              <p className="text-[9px] text-text-dim uppercase mt-1">Drag & drop or click</p>
            </div>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest block">
              {activePlatform === 'drive' ? 'Google Drive Link' : 'Source URL'}
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={activePlatform === 'drive' ? "drive.google.com/file/..." : "youtube.com/watch?v=..."} 
                className="w-full bg-bg-deep border border-border-dim rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent/50 transition-colors text-accent placeholder:text-white/5"
              />
              <button 
                onClick={() => onProcess(url)}
                disabled={!url || isProcessing}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all",
                  url && !isProcessing 
                    ? "bg-accent text-black hover:opacity-90" 
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                {isProcessing ? "..." : "Fetch"}
              </button>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-text-dim uppercase font-bold">
              <FileText className="w-3 h-3" />
              <span>Auto-detecting metadata...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
