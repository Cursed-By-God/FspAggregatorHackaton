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
import { CandidateModal } from './components/CandidateModal';
import { OfferModal } from './components/OfferModal';
import { CandidateDashboard } from './components/CandidateDashboard';
import { SkillTestModal } from './components/SkillTestModal';
import { SmartMatchModal } from './components/SmartMatchModal';
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
            {/* Командный пульт скаута */}
            <div className="panel-dossier rounded-2xl p-6 sm:p-8 mb-8 border border-obsidian-border text-left relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-crimson/15 text-crimson text-xs font-mono font-bold uppercase mb-3 border border-crimson/30">
                    <Flame className="w-3.5 h-3.5 fill-crimson" /> РЕЖИМ СКАУТА: ОБРАТНЫЙ НАЙМ ФСП
                  </div>
                  
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-chalk tracking-tight font-sans">
                    Платформа верифицированного найма <br />
                    <span className="text-crimson">спортивных программистов</span>
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-chalk-muted mt-2 leading-relaxed">
                    Квалификация подтверждена независимым тестированием и протоколами соревнований Федерации. Выбирайте кандидатов по объективному профилю и делайте прямой оффер.
                  </p>
                </div>

                {/* Акцентная кнопка Смарт-подбора */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={openSmartMatchModal}
                    className="px-6 py-4 rounded-xl bg-crimson hover:bg-crimson-dark text-chalk font-mono font-bold text-xs flex items-center justify-center gap-3 shadow-glow-crimson hover:scale-105 transition-all"
                  >
                    <BrainCircuit className="w-5 h-5 text-chalk" />
                    <span className="tracking-wide">ОПИСАТЬ ПОТРЕБНОСТЬ (СМАРТ-МАТЧИНГ)</span>
                    <ArrowRight className="w-4 h-4" />
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

            {filteredCandidates.length > 0 ? (
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

      <DemoToolbar />

      <footer className="border-t border-obsidian-border py-6 text-center text-xs text-chalk-dim font-mono">
        FSP.SCOUT • ФЕДЕРАЦИЯ СПОРТИВНОГО ПРОГРАММИРОВАНИЯ РОССИИ • 2026
      </footer>
    </div>
  );
}