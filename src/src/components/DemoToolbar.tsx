import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  ChevronUp, 
  ChevronDown,
  Keyboard,
  PartyPopper,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../store/useAppStore';

export const DemoToolbar: React.FC = () => {
  const { 
    setRoleMode, 
    resetDemoState, 
    setSelectedCandidate, 
    closeOfferModal 
  } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === '1') setRoleMode('recruiter');
      if (e.key === '2') setRoleMode('candidate');
      if (e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 'к') resetDemoState();
      if (e.key === 'Escape') {
        setSelectedCandidate(null);
        closeOfferModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setRoleMode, resetDemoState, setSelectedCandidate, closeOfferModal]);

  const triggerTestConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#E11D48', '#FFFFFF', '#F59E0B']
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 text-left font-mono">
      <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-crimson-500/40 bg-obsidian-900/90 shadow-2xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-xs text-white transition-all border border-obsidian-700/60 shadow-glow-crimson/10"
        >
          <Sliders className="w-3.5 h-3.5 text-crimson-400 animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-[11px]">КОНСОЛЬ ЖЮРИ</span>
          {isOpen ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronUp className="w-3 h-3 text-slate-400" />}
        </button>

        <button
          onClick={resetDemoState}
          title="Сбросить стенд к исходному состоянию (Клавиша R)"
          className="p-2 rounded-xl bg-obsidian-850 hover:bg-crimson-950/60 text-slate-400 hover:text-crimson-400 border border-obsidian-700/60 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 w-72 rounded-2xl glass-panel border border-crimson-500/40 bg-gradient-to-b from-obsidian-900 via-obsidian-950 to-black p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-obsidian-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Keyboard className="w-3.5 h-3.5 text-crimson-400" /> Горячие клавиши
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-crimson-950/80 text-crimson-400 border border-crimson-500/40 font-bold tracking-wider">
              ACTIVE
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Режим Скаут-центра:</span>
              <kbd className="px-2 py-0.5 rounded-lg bg-obsidian-850 border border-obsidian-700 text-crimson-400 font-bold shadow-glow-crimson/20">1</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Режим Атлета ФСП:</span>
              <kbd className="px-2 py-0.5 rounded-lg bg-obsidian-850 border border-obsidian-700 text-neon-cyan font-bold shadow-glow-cyan/20">2</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Сброс стенда (Reset):</span>
              <kbd className="px-2 py-0.5 rounded-lg bg-obsidian-850 border border-obsidian-700 text-fsp-gold font-bold shadow-glow-gold/20">R</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Закрыть любое окно:</span>
              <kbd className="px-1.5 py-0.5 rounded-lg bg-obsidian-850 border border-obsidian-700 text-slate-400 text-[10px]">Esc</kbd>
            </div>
          </div>

          <div className="pt-2 border-t border-obsidian-800">
            <button
              onClick={triggerTestConfetti}
              className="w-full py-2 rounded-xl bg-obsidian-850 hover:bg-crimson-950/60 text-slate-300 hover:text-crimson-400 border border-obsidian-700/60 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <PartyPopper className="w-3.5 h-3.5 text-crimson-400" />
              <span>Тест анимации оффера</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};