import React, { useState, useRef, useEffect } from 'react';
import { 
  Trophy, 
  Bell, 
  Briefcase, 
  Sparkles,
  Zap,
  Terminal,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const Header: React.FC = () => {
  const { roleMode, setRoleMode, offers, candidates } = useAppStore();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const activeCandidate = candidates[0] || null;
  const pendingOffers = offers.filter(o => o.status === 'pending');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b border-white/10 bg-obsidian-base/80 backdrop-blur-2xl sticky top-0 z-50 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Логотип и Федеральный статус */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3.5 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson via-red-600 to-crimson-dark flex items-center justify-center shadow-glow-crimson border border-crimson/60 group-hover:scale-105 transition-all">
              <Flame className="w-5.5 h-5.5 text-white fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-wider text-chalk font-mono uppercase">
                  ФСП.<span className="text-crimson drop-shadow-[0_0_12px_rgba(255,23,68,0.8)]">SCOUT</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-crimson/15 text-crimson border border-crimson/40 font-extrabold shadow-glow-crimson-sm">
                  PRO PROD
                </span>
              </div>
              <p className="text-[10px] text-chalk-muted tracking-wide hidden sm:block uppercase font-mono font-medium">
                Федерация спортивного программирования России
              </p>
            </div>
          </div>
        </div>

        {/* Центральный B2B-переключатель ролей */}
        <div className="flex items-center p-1 bg-obsidian-sub/90 border border-white/10 rounded-2xl shadow-inner">
          <button
            onClick={() => setRoleMode('recruiter')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs font-mono font-extrabold transition-all duration-300 ${
              roleMode === 'recruiter'
                ? 'bg-gradient-to-r from-crimson to-red-600 text-white shadow-glow-crimson'
                : 'text-chalk-muted hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>СКАУТ-ЦЕНТР</span>
          </button>
          
          <button
            onClick={() => setRoleMode('candidate')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs font-mono font-extrabold transition-all duration-300 ${
              roleMode === 'candidate'
                ? 'bg-white text-black shadow-lg'
                : 'text-chalk-muted hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>АТЛЕТ ФСП</span>
            {pendingOffers.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-crimson text-white font-extrabold shadow-glow-crimson-sm">
                {pendingOffers.length}
              </span>
            )}
          </button>
        </div>

        {/* Правый блок: Уведомления и профиль */}
        <div className="flex items-center gap-3">
          
          {/* Колокольчик */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2.5 rounded-xl border transition-all relative ${
                isNotifOpen 
                  ? 'bg-crimson/20 border-crimson text-crimson shadow-glow-crimson' 
                  : 'bg-obsidian-card border-white/10 text-chalk-muted hover:text-chalk hover:border-white/25'
              }`}
            >
              <Bell className="w-4 h-4" />
              {pendingOffers.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-crimson text-white font-black text-[9px] rounded-full flex items-center justify-center font-mono shadow-glow-crimson-sm">
                  {pendingOffers.length}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel border border-white/15 shadow-2xl p-4 z-50 border-t-crimson animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 font-mono">
                  <span className="text-xs font-bold text-chalk uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-crimson" /> Лента уведомлений
                  </span>
                  <span className="text-[10px] text-fsp-emerald font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-fsp-emerald animate-pulse" /> LIVE
                  </span>
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {offers.map((offer) => (
                    <div 
                      key={offer.id}
                      className="p-3.5 rounded-xl bg-obsidian-sub/80 border border-white/10 hover:border-crimson/50 transition-all text-left font-sans"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-chalk flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-crimson" />
                          {offer.companyName}
                        </span>
                        <span className="text-[10px] font-mono text-chalk-dim">{offer.sentAt}</span>
                      </div>
                      <p className="text-xs text-chalk-muted line-clamp-1 mb-2">
                        {offer.positionTitle}
                      </p>
                      <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-white/10 font-mono">
                        <span className="text-chalk font-bold">
                          {offer.salaryMin.toLocaleString('ru-RU')} – {offer.salaryMax.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          offer.status === 'accepted' 
                            ? 'bg-fsp-emerald/20 text-fsp-emerald border border-fsp-emerald/40' 
                            : 'bg-crimson/20 text-crimson border border-crimson/40 font-bold'
                        }`}>
                          {offer.status === 'accepted' ? 'Принят' : 'Ожидает решения'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Плашка профиля */}
          <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-white/10">
            <img 
              src={roleMode === 'recruiter' || !activeCandidate
                ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="14" fill="%23FF1744"/><text x="30" y="38" font-family="monospace" font-size="22" font-weight="900" fill="white" text-anchor="middle">HR</text></svg>'
                : activeCandidate.avatarUrl
              } 
              alt="Avatar" 
              className="w-9 h-9 rounded-xl object-cover border border-white/20 shadow-sm"
            />
            <div className="text-left text-xs font-mono">
              <span className="block font-bold text-chalk leading-tight">
                {roleMode === 'recruiter' || !activeCandidate ? 'Старший Скаут' : activeCandidate.fullName}
              </span>
              <span className="text-[10px] text-chalk-dim block">
                {roleMode === 'recruiter' || !activeCandidate 
                  ? 'Head of Tech Talent' 
                  : `${activeCandidate.fspProfile?.sportRank || 'Без разряда'} • ${activeCandidate.handle}`}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};