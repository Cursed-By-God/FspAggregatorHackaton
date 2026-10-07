import React from 'react';
import { 
  Trophy, 
  ShieldCheck, 
  SendHorizontal, 
  Eye, 
  MapPin, 
  Medal,
  Activity,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  ArrowUpRight
} from 'lucide-react';
import type { Candidate } from '../types';
import { useAppStore } from '../store/useAppStore';

interface CandidateCardProps {
  candidate: Candidate & { smartScore?: number };
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const { openOfferModal, setSelectedCandidate, activeSmartNeed } = useAppStore();

  const hasFsp = candidate.fspProfile.hasHistory;
  const isMasterOfSport = candidate.fspProfile.sportRank === 'МС' || candidate.fspProfile.sportRank === 'МСМК';
  const isCandidateMaster = candidate.fspProfile.sportRank === 'КМС';

  return (
    <div className={`panel-dossier rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 text-left ${
      candidate.smartScore ? 'border-crimson shadow-glow-crimson-sm' : ''
    }`}>
      
      {/* Акцентная алая полоса слева при наведении */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Шапка досье: серийный номер и спортивный разряд */}
        <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-obsidian-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={candidate.avatarUrl} 
                alt={candidate.fullName} 
                className="w-12 h-12 rounded-xl object-cover border border-obsidian-border group-hover:border-crimson transition-colors"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-crimson border-2 border-obsidian-card" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-chalk-dim block uppercase tracking-wider">
                ID: {candidate.id.toUpperCase()}
              </span>
              <h3 className="text-base font-extrabold text-chalk group-hover:text-crimson transition-colors leading-tight">
                {candidate.fullName}
              </h3>
              <span className="text-xs font-mono text-chalk-muted">{candidate.handle} • {candidate.city}</span>
            </div>
          </div>

          {/* Разряд ФСП / Статус теста */}
          <div className="text-right">
            {candidate.smartScore && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-extrabold bg-crimson text-chalk mb-1 inline-flex items-center gap-1 shadow-glow-crimson-sm">
                <BrainCircuit className="w-3.5 h-3.5" /> {candidate.smartScore}% МАТЧ
              </span>
            )}

            {hasFsp ? (
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold block mt-1 ${
                isMasterOfSport 
                  ? 'bg-crimson/20 text-crimson border border-crimson/40 font-extrabold' 
                  : isCandidateMaster
                  ? 'bg-fsp-gold/20 text-fsp-gold border border-fsp-gold/40'
                  : 'bg-obsidian-sub text-chalk border border-obsidian-border'
              }`}>
                {candidate.fspProfile.sportRank} ФСП
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-obsidian-sub text-chalk-muted border border-obsidian-border block mt-1">
                Без разряда ФСП
              </span>
            )}
          </div>
        </div>

        {/* Официальная Категория платформы */}
        <div className="mb-3">
          <span className="text-[10px] font-mono uppercase text-chalk-dim block mb-0.5">Категория специализации:</span>
          <span className="text-xs font-bold font-mono text-chalk bg-obsidian-sub border border-obsidian-border px-2.5 py-1 rounded-lg block">
            {candidate.category.specialization} • <strong className="text-crimson">{candidate.grade}</strong>
          </span>
        </div>

        {/* Обоснование подборки (Explainability) */}
        <div className="p-3 rounded-xl bg-crimson-subtle border border-crimson/25 mb-4 text-xs leading-relaxed text-chalk flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
          <span>{candidate.matchExplanation}</span>
        </div>

        {/* Сетка ключевых телеметрических метрик */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-obsidian-sub border border-obsidian-border mb-4 font-mono text-center">
          <div className="border-r border-obsidian-border pr-1">
            <span className="text-[9px] text-chalk-dim block uppercase">Рейтинг ELO</span>
            <span className="text-xs font-bold text-chalk">
              {hasFsp ? candidate.fspProfile.ratingScore : '—'}
            </span>
          </div>
          <div className="border-r border-obsidian-border px-1">
            <span className="text-[9px] text-chalk-dim block uppercase">Награды</span>
            <span className="text-xs font-bold text-crimson">
              {hasFsp ? `${candidate.fspProfile.podiumsCount}` : '0'}
            </span>
          </div>
          <div className="pl-1">
            <span className="text-[9px] text-chalk-dim block uppercase">Тест грейда</span>
            <span className="text-xs font-bold text-fsp-emerald">
              {candidate.testSummary.score}/100
            </span>
          </div>
        </div>

        {/* Стек технологий */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {candidate.primaryStack.map((tech) => {
            const isMatched = activeSmartNeed?.requiredStack.some(t => t.toLowerCase() === tech.toLowerCase());
            return (
              <span 
                key={tech} 
                className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isMatched 
                    ? 'bg-crimson/20 text-chalk border-crimson font-bold shadow-glow-crimson-sm' 
                    : 'bg-obsidian-sub text-chalk-muted border-obsidian-border'
                }`}
              >
                {tech}
              </span>
            );
          })}
        </div>
      </div>

      {/* Нижняя часть: Зарплатная вилка и кнопки действий */}
      <div className="pt-4 border-t border-obsidian-border flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-chalk-dim uppercase font-mono block">Вилка ожиданий</span>
          <span className="text-xs font-mono font-extrabold text-chalk">
            {candidate.salaryMin.toLocaleString('ru-RU')} – {candidate.salaryMax.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedCandidate(candidate)}
            className="p-2.5 rounded-xl bg-obsidian-sub hover:bg-obsidian-card text-chalk-muted hover:text-chalk border border-obsidian-border transition-all"
            title="Открыть полное досье атлета"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Массивная алая кнопка прямого оффера */}
          <button 
            onClick={() => openOfferModal(candidate)}
            className="px-5 py-2.5 rounded-xl bg-crimson hover:bg-crimson-dark text-chalk font-mono font-bold text-xs flex items-center gap-2 shadow-glow-crimson transition-all hover:scale-105"
          >
            <span>ОФФЕР</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};