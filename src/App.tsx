import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { VideoInput } from './components/VideoInput';
import { RulesBox } from './components/RulesBox';
import { ClipCard, Clip } from './components/ClipCard';
import { EditorTimeline } from './components/EditorTimeline';
import { Sparkles, TrendingUp, Clock, Zap, ArrowRight, Video, Play, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [rules, setRules] = useState('');
  const [clips, setClips] = useState<Clip[]>([]);
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');

  const handleProcess = async (url: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/process-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, rules }),
      });
      const data = await response.json();
      if (data.success) {
        setClips(data.clips);
      }
    } catch (error) {
      console.error('Error processing video:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {view === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full grid grid-cols-[280px_1fr_300px] gap-px bg-border-dim"
              >
                {/* Column 1: Source & Intent */}
                <section className="bg-panel-bg flex flex-col">
                  <div className="px-5 py-4 border-b border-border-dim flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-text-dim">
                    <span>Source & Intent</span>
                    <Settings className="w-3 h-3" />
                  </div>
                  <div className="p-5 space-y-6 flex-1 overflow-y-auto">
                    <VideoInput onProcess={handleProcess} isProcessing={isProcessing} />
                    <RulesBox rules={rules} setRules={setRules} />
                  </div>
                </section>

                {/* Column 2: Human-Like Preview */}
                <section className="bg-panel-bg flex flex-col">
                  <div className="px-5 py-4 border-b border-border-dim flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-text-dim">
                    <span>Human-Like Preview</span>
                    <span>9:16</span>
                  </div>
                  <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
                    <div className="w-[300px] h-[533px] bg-[#1A1A1C] rounded-xl border-[4px] border-[#27272A] relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#3F3F46]">
                        <Play className="w-12 h-12 mb-3 opacity-20" />
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Previewing Clip #01</span>
                      </div>
                      <div className="absolute bottom-20 left-0 right-0 text-center">
                        <div className="caption-text">Crazy Viral!</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-20 border-t border-border-dim bg-panel-bg px-5 flex items-center gap-1">
                    {[...Array(11)].map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "h-8 flex-1 rounded-[2px] transition-colors",
                          i >= 2 && i <= 5 ? "bg-accent/60" : "bg-[#27272A]"
                        )} 
                      />
                    ))}
                  </div>
                </section>

                {/* Column 3: Clip Scoring */}
                <section className="bg-panel-bg flex flex-col">
                  <div className="px-5 py-4 border-b border-border-dim flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-text-dim">
                    <span>Clip Scoring</span>
                    <span>Auto-Rank</span>
                  </div>
                  <div className="flex-1 p-5 overflow-y-auto space-y-3">
                    {clips.length > 0 ? (
                      clips.map((clip, index) => (
                        <ClipCard key={clip.id} clip={clip} index={index} />
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-text-dim opacity-30">
                        <Sparkles className="w-12 h-12 mb-4" />
                        <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                          Enter URL & Rules<br />to Start Scoring
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-border-dim space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981]" />
                      <div className="flex-1 text-[10px] text-text-dim leading-tight">
                        AI Ready to Export<br />
                        <b className="text-text-main">Human-Feel Optimized</b>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-accent text-black text-xs font-bold rounded uppercase hover:opacity-90 transition-opacity">
                      Export Now
                    </button>
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div 
                key="editor"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setView('dashboard')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <h1 className="text-3xl font-display font-bold">Advanced Editor</h1>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-all">
                      Save Draft
                    </button>
                    <button className="px-6 py-2 rounded-xl bg-brand-orange text-black font-bold hover:bg-brand-orange/90 transition-all">
                      Export Final
                    </button>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-video glass-panel rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/editor/1280/720" 
                        className="w-full h-full object-cover opacity-40"
                        alt="Editor Preview"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-20 h-20 rounded-full bg-brand-orange text-black flex items-center justify-center shadow-2xl">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </button>
                      </div>
                    </div>
                    <EditorTimeline />
                  </div>

                  <div className="space-y-6">
                    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
                      <h3 className="font-display font-bold text-lg mb-4">AI Editing Assistant</h3>
                      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                        <div className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20">
                          <p className="text-xs font-bold text-brand-orange uppercase mb-1">Suggestion</p>
                          <p className="text-sm text-white/80">Add a 1.2x zoom at 00:05 to emphasize the product reveal.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-xs font-bold text-white/40 uppercase mb-1">Human-Like Adjustment</p>
                          <p className="text-sm text-white/80">Added a 150ms delay to the caption entry for a more natural feel.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-xs font-bold text-white/40 uppercase mb-1">Scene Detection</p>
                          <p className="text-sm text-white/80">Detected 12 jump cut opportunities to maintain high retention.</p>
                        </div>
                      </div>
                      <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all">
                        Apply All AI Suggestions
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
