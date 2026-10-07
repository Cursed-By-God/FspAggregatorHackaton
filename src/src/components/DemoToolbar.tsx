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
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-obsidian-card border border-obsidian-border shadow-2xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-sub hover:bg-obsidian-border text-xs text-chalk transition-all border border-obsidian-border"
        >
          <Sliders className="w-3.5 h-3.5 text-crimson" />
          <span className="font-bold uppercase tracking-wider text-[11px]">КОНСОЛЬ ЖЮРИ</span>
          {isOpen ? <ChevronDown className="w-3 h-3 text-chalk-dim" /> : <ChevronUp className="w-3 h-3 text-chalk-dim" />}
        </button>

        <button
          onClick={resetDemoState}
          title="Сбросить стенд к исходному состоянию (Клавиша R)"
          className="p-1.5 rounded-lg bg-obsidian-sub hover:bg-crimson/20 text-chalk-dim hover:text-crimson border border-obsidian-border transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 w-72 rounded-xl bg-obsidian-card border border-obsidian-border p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-obsidian-border text-[11px] text-chalk-dim">
            <span className="flex items-center gap-1.5 text-chalk font-bold">
              <Keyboard className="w-3.5 h-3.5 text-crimson" /> Горячие клавиши
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-obsidian-sub text-crimson font-bold">
              ACTIVE
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-chalk-muted">
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Режим Скаут-центра:</span>
              <kbd className="px-2 py-0.5 rounded bg-obsidian-sub border border-obsidian-border text-crimson font-bold">1</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Режим Атлета ФСП:</span>
              <kbd className="px-2 py-0.5 rounded bg-obsidian-sub border border-obsidian-border text-chalk font-bold">2</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Сброс стенда (Reset):</span>
              <kbd className="px-2 py-0.5 rounded bg-obsidian-sub border border-obsidian-border text-fsp-gold font-bold">R</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px]">Закрыть любое окно:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-obsidian-sub border border-obsidian-border text-chalk-dim text-[10px]">Esc</kbd>
            </div>
          </div>

          <div className="pt-2 border-t border-obsidian-border">
            <button
              onClick={triggerTestConfetti}
              className="w-full py-1.5 rounded-lg bg-obsidian-sub hover:bg-crimson/20 text-chalk-muted hover:text-crimson border border-obsidian-border text-[11px] flex items-center justify-center gap-1.5 transition-all"
            >
              <PartyPopper className="w-3.5 h-3.5 text-crimson" />
              <span>Тест анимации оффера</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};