import React, { useMemo, useEffect } from 'react';
import { 
  Users, 
  SearchX, 
  RotateCcw, 
  BrainCircuit, 
  XCircle,
  Flame,
  ArrowRight,
  WifiOff
} from 'lucide-react';
import { Header } from './components/Header';
import { CatalogFilters } from './components/CatalogFilters';
import { CandidateCard } from './components/CandidateCard';
import { CandidateCardSkeleton } from './components/CandidateCardSkeleton';
import { CandidateModal } from './components/CandidateModal';
import { OfferModal } from './components/OfferModal';
import { CandidateDashboard } from './components/CandidateDashboard';
import { SkillTestModal } from './components/SkillTestModal';
import { SmartMatchModal } from './components/SmartMatchModal';
import { CreateCandidateModal } from './components/CreateCandidateModal';
import { DemoToolbar } from './components/DemoToolbar';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const { 
    roleMode, 
    candidates, 
    offers, 
    filters, 
    resetFilters, 
    selectedCandidate, 
    isOfferModalOpen,
    isTestModalOpen,
    isCreateCandidateOpen,
    isSmartMatchOpen,
    openSmartMatchModal,
    activeSmartNeed,
    clearSmartMatch,
    fetchCandidates,
    isLoadingCandidates,
    candidatesError
  } = useAppStore();

  useEffect(() => {
    fetchCandidates();
  }, [filters, fetchCandidates]);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((candidate) => {
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          const matchesName = candidate.fullName.toLowerCase().includes(query);
          const matchesHandle = candidate.handle.toLowerCase().includes(query);
          const matchesHeadline = candidate.headline.toLowerCase().includes(query);
          const matchesBio = candidate.bio.toLowerCase().includes(query);
          const matchesStack = candidate.primaryStack.some(tech => tech.toLowerCase().includes(query));
          if (!matchesName && !matchesHandle && !matchesHeadline && !matchesBio && !matchesStack) return false;
        }

        if (filters.stack && filters.stack.length > 0) {
          const matchesSelectedStack = filters.stack.some(selectedTech =>
            candidate.primaryStack.some(tech => tech.toLowerCase().includes(selectedTech.toLowerCase()))
          );
          if (!matchesSelectedStack) return false;
        }

        if (filters.disciplines.length > 0) {
          const hasDiscipline = candidate.fspProfile.disciplines.some(d => 
            filters.disciplines.includes(d)
          );
          if (!hasDiscipline) return false;
        }

        if (filters.sportRanks.length > 0) {
          if (!filters.sportRanks.includes(candidate.fspProfile.sportRank)) {
            return false;
          }
        }

        if (filters.grades.length > 0) {
          if (!filters.grades.includes(candidate.grade)) {
            return false;
          }
        }

        if (candidate.salaryMin > filters.maxSalary) {
          return false;
        }

        return true;
      })
      .sort((a: any, b: any) => {
        if (activeSmartNeed && b.smartScore !== undefined && a.smartScore !== undefined) {
          return b.smartScore - a.smartScore;
        }
        if (filters.sortBy === 'rating') {
          return b.fspProfile.ratingScore - a.fspProfile.ratingScore;
        }
        if (filters.sortBy === 'podiums') {
          return b.fspProfile.podiumsCount - a.fspProfile.podiumsCount;
        }
        if (filters.sortBy === 'salary_asc') {
          return a.salaryMin - b.salaryMin;
        }
        if (filters.sortBy === 'salary_desc') {
          return b.salaryMin - a.salaryMin;
        }
        return 0;
      });
  }, [candidates, filters, activeSmartNeed]);

  return (
    <div className="min-h-screen bg-obsidian-base text-chalk flex flex-col justify-between selection:bg-crimson selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        
        {roleMode === 'recruiter' ? (
          <>
            {/* Командный пульт скаута FSP.SCOUT PRO */}
            <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-8 border border-white/10 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-crimson/20 via-fsp-purple/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:from-crimson/25 transition-all duration-700" />
              <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-cyan/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/15 text-crimson text-xs font-mono font-extrabold uppercase border border-crimson/30 shadow-glow-crimson-sm">
                    <Flame className="w-4 h-4 fill-crimson animate-pulse" />
                    <span>СКАУТ-ЦЕНТР: ОБРАТНЫЙ НАЙМ ЧЕРЕЗ РЕЕСТР ФСП</span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Платформа верифицированного найма <br />
                    <span className="bg-gradient-to-r from-crimson via-red-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,23,68,0.4)]">
                      спортивных программистов
                    </span>
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-chalk-muted leading-relaxed font-sans max-w-xl">
                    Объективная квалификация подтверждена независимым квалификационным срезом и протоколами соревнований Федерации. Выбирайте атлетов без предварительных скринингов.
                  </p>

                  {/* Обойма телеметрических показателей */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-fsp-emerald animate-pulse" />
                      <span className="text-chalk-muted">Реестр ФСП:</span>
                      <strong className="text-white">Верифицирован</strong>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-chalk-muted">Топовый ELO:</span>
                      <strong className="text-fsp-gold">2,840 ELO</strong>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-chalk-muted">Механика:</span>
                      <strong className="text-cyan">Прямой оффер</strong>
                    </div>
                  </div>
                </div>

                {/* Главная кнопка Смарт-подбора */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                  <button
                    onClick={openSmartMatchModal}
                    className="px-8 py-5 rounded-2xl bg-gradient-to-r from-crimson via-red-600 to-crimson-dark hover:from-red-500 hover:to-crimson text-white font-mono font-black text-xs sm:text-sm flex items-center justify-center gap-3.5 shadow-glow-crimson hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border border-crimson/50"
                  >
                    <BrainCircuit className="w-6 h-6 text-white animate-pulse" />
                    <div className="text-left">
                      <span className="block font-black tracking-wide">СМАРТ-МАТЧИНГ ПО ПОТРЕБНОСТИ</span>
                      <span className="block text-[10px] text-white/80 font-normal">35% критериев оценки ТЗ • Ранжирование</span>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Активная плашка смарт-подбора */}
            {activeSmartNeed && (
              <div className="p-4 rounded-xl bg-crimson-subtle border border-crimson/40 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3 font-mono">
                  <div className="p-2 rounded-lg bg-crimson text-chalk font-bold">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-crimson block uppercase">
                      АКТИВЕН СМАРТ-МАТЧИНГ: {activeSmartNeed.teamName}
                    </span>
                    <span className="text-[11px] text-chalk-muted">
                      Стек: {activeSmartNeed.requiredStack.join(', ')} • Бюджет: {activeSmartNeed.salaryMin.toLocaleString('ru-RU')} – {activeSmartNeed.salaryMax.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <button
                  onClick={clearSmartMatch}
                  className="px-3 py-1.5 rounded-lg bg-obsidian-sub hover:bg-crimson/20 text-chalk-muted hover:text-crimson text-xs font-mono border border-obsidian-border transition-all flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Сбросить подборку
                </button>
              </div>
            )}

            {/* Плашка фолбэка API если бэкенд недоступен */}
            {candidatesError && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-6 flex items-center justify-between text-xs font-mono text-amber-300">
                <div className="flex items-center gap-2.5">
                  <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{candidatesError}</span>
                </div>
                <button
                  onClick={() => fetchCandidates()}
                  className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[11px] font-bold"
                >
                  Повторить запрос
                </button>
              </div>
            )}

            <CatalogFilters />

            <div className="flex items-center justify-between mb-4 font-mono">
              <span className="text-xs font-bold uppercase text-chalk-dim flex items-center gap-2">
                <Users className="w-4 h-4 text-crimson" /> База кибератлетов ({filteredCandidates.length} из {candidates.length})
                {isLoadingCandidates && <span className="text-crimson animate-pulse ml-2">(Загрузка из API...)</span>}
              </span>
            </div>

            {isLoadingCandidates ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CandidateCardSkeleton key={idx} />
                ))}
              </div>
            ) : filteredCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            ) : (
              <div className="panel-dossier rounded-2xl p-12 text-center max-w-xl mx-auto my-12 font-mono">
                <SearchX className="w-10 h-10 text-chalk-dim mx-auto mb-3" />
                <h3 className="text-base font-bold text-chalk mb-1">Кандидатов не найдено</h3>
                <p className="text-xs text-chalk-muted mb-4">
                  Смягчите критерии фильтрации по зарплате или разрядам.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-crimson text-chalk font-bold text-xs inline-flex items-center gap-2 shadow-glow-crimson"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Сбросить фильтры
                </button>
              </div>
            )}
          </>
        ) : (
          <CandidateDashboard />
        )}

      </main>

      {/* Модалки */}
      {selectedCandidate && <CandidateModal />}
      {isOfferModalOpen && <OfferModal />}
      {isTestModalOpen && <SkillTestModal />}
      {isSmartMatchOpen && <SmartMatchModal />}
      {isCreateCandidateOpen && <CreateCandidateModal />}

      <DemoToolbar />

      <footer className="border-t border-obsidian-border py-6 text-center text-xs text-chalk-dim font-mono">
        FSP.SCOUT • ФЕДЕРАЦИЯ СПОРТИВНОГО ПРОГРАММИРОВАНИЯ РОССИИ • 2026
      </footer>
    </div>
  );
}