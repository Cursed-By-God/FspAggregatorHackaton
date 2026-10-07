import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  ShieldCheck, 
  Calendar, 
  SendHorizontal, 
  Copy, 
  Check, 
  Activity, 
  Award,
  Hash,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { useAppStore } from '../store/useAppStore';

export const CandidateModal: React.FC = () => {
  const { selectedCandidate, setSelectedCandidate, openOfferModal } = useAppStore();
  const [copiedHash, setCopiedHash] = useState(false);

  if (!selectedCandidate) return null;

  const { fspProfile, radarSkills, testSummary } = selectedCandidate;
  const hasFsp = fspProfile.hasHistory;

  const handleCopyHash = async (hash: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(hash);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = hash;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } catch (err) {
      console.warn('Не удалось скопировать хэш:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300 font-sans text-left">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-white/15 shadow-luxury p-6 sm:p-8 text-left">
        
        {/* Кнопка закрытия */}
        <button
          onClick={() => setSelectedCandidate(null)}
          className="absolute top-5 right-5 p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-chalk-muted hover:text-white border border-white/10 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ШАПКА ДОСЬЕ */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img 
                src={selectedCandidate.avatarUrl} 
                alt={selectedCandidate.fullName} 
                className="w-20 h-20 rounded-2xl object-cover border-2 border-crimson shadow-glow-crimson"
              />
              <span className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full bg-crimson border-2 border-obsidian-sub flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedCandidate.fullName}
                </h2>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-white/5 text-chalk-muted border border-white/10">
                  {selectedCandidate.grade}
                </span>
              </div>
              <p className="text-sm font-mono text-crimson font-bold mb-1">
                {selectedCandidate.handle} • {selectedCandidate.city}
              </p>
              <p className="text-xs text-chalk-dim max-w-md line-clamp-1 font-mono">
                Категория: {selectedCandidate.category.specialization}
              </p>
            </div>
          </div>

          {/* Официальный штамп реестра ФСП */}
          <div className="p-4 rounded-2xl bg-obsidian-sub/90 border border-crimson/40 flex items-center gap-3.5 shadow-glow-crimson-sm">
            <div className="w-11 h-11 rounded-xl bg-crimson/20 flex items-center justify-center text-crimson border border-crimson/30">
              <Trophy className="w-6 h-6 animate-pulse" />
            </div>
            <div className="font-mono">
              <span className="text-[10px] uppercase text-chalk-dim block tracking-wider font-semibold">
                {hasFsp ? 'Разряд в реестре ФСП' : 'Статус квалификации'}
              </span>
              <span className="text-lg font-black text-white">
                {hasFsp ? fspProfile.sportRank : 'Подтвержден тестом'}
              </span>
              <span className="block text-[10px] text-fsp-emerald font-bold">
                {hasFsp ? `Реестр: ${fspProfile.fspId}` : `Балл теста: ${testSummary.score}/100`}
              </span>
            </div>
          </div>
        </div>

        {/* СРЕДНИЙ БЛОК: 2 КОЛОНКИ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 relative z-10">
          
          {/* Левая колонка: Радар навыков */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-obsidian-sub/80 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 font-mono">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-crimson" />
                <h3 className="text-xs font-black uppercase tracking-wider text-chalk">
                  Матрица Hard Skills
                </h3>
              </div>
              <span className="text-[10px] text-crimson px-2.5 py-0.5 rounded-full bg-crimson/15 border border-crimson/40 font-bold">
                {hasFsp ? `${fspProfile.ratingScore} ELO` : `Тест ${testSummary.score} баллов`}
              </span>
            </div>

            <p className="text-[11px] text-chalk-dim mb-2 font-mono">
              Сформировано на основе входного тестирования и соревнований:
            </p>

            {/* Красно-белый радар Recharts */}
            <div className="w-full h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarSkills}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    stroke="#94A3B8" 
                    tick={{ fill: '#F8FAFC', fontSize: 10, fontFamily: 'monospace' }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    stroke="rgba(255, 255, 255, 0.1)" 
                    tick={false} 
                  />
                  <Radar
                    name="Компетенции"
                    dataKey="score"
                    stroke="#FF1744"
                    fill="#FF1744"
                    fillOpacity={0.45}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Числовой срез */}
            <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-white/10 font-mono">
              {radarSkills.slice(0, 3).map((item) => (
                <div key={item.subject} className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[9px] text-chalk-dim block truncate">{item.subject}</span>
                  <span className="text-xs font-bold text-chalk">{item.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка: Обоснование, Био и Турниры */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            <div className="p-5 rounded-2xl bg-obsidian-sub/80 border border-white/10">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-chalk mb-2">
                Спортивный профайл и стек
              </h3>
              <p className="text-xs text-chalk-muted leading-relaxed mb-4">
                {selectedCandidate.bio}
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.primaryStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 rounded-lg text-xs bg-white/5 text-chalk border border-white/10 font-mono font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Верифицированные турниры ФСП */}
            <div className="p-5 rounded-2xl bg-obsidian-sub/80 border border-white/10">
              <div className="flex items-center justify-between mb-3 font-mono">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-crimson" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-chalk">
                    Верифицированные соревнования ФСП
                  </h3>
                </div>
                <span className="text-[10px] text-fsp-emerald font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 
                  {hasFsp ? 'Защищено хэшем' : 'Тест валидирован'}
                </span>
              </div>

              {hasFsp && fspProfile.achievements.length > 0 ? (
                <div className="space-y-2.5">
                  {fspProfile.achievements.map((ach) => (
                    <div 
                      key={ach.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-crimson/50 transition-all text-left"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-chalk">
                          {ach.tournamentName}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-crimson/20 text-crimson border border-crimson/40">
                          {ach.placeResult}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-chalk-dim mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {ach.year} г.
                        </span>
                        <span>•</span>
                        <span className="text-chalk-muted">Этап: {ach.stage}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono">
                        <span className="text-chalk-dim flex items-center gap-1">
                          <Hash className="w-3 h-3 text-crimson" /> Хэш: <span className="text-chalk-muted">{ach.verificationHash}</span>
                        </span>
                        <button
                          onClick={() => handleCopyHash(ach.verificationHash)}
                          className="text-crimson hover:text-white transition-colors font-bold"
                        >
                          {copiedHash ? '✓ Скопирован' : 'Копировать'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-chalk-dim font-mono">
                  <CheckCircle2 className="w-6 h-6 text-chalk-muted mx-auto mb-2" />
                  <p className="font-bold text-chalk mb-1">Кандидат без истории участия в турнирах ФСП</p>
                  <p className="text-[11px]">Квалификация подтверждена независимым тестированием (балл: {testSummary.score}/100, грейд {testSummary.testedGrade}).</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* НИЖНИЙ БАР */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10 font-mono">
          <div>
            <span className="text-xs text-chalk-dim uppercase block">
              Зарплатные ожидания атлета (вилка)
            </span>
            <span className="text-2xl font-black text-white">
              {selectedCandidate.salaryMin.toLocaleString('ru-RU')} – {selectedCandidate.salaryMax.toLocaleString('ru-RU')} ₽ <span className="text-xs text-chalk-dim font-normal">/ месяц</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-chalk-muted hover:text-white text-xs font-bold border border-white/10 transition-all"
            >
              Закрыть досье
            </button>

            <button
              onClick={() => {
                const target = selectedCandidate;
                setSelectedCandidate(null);
                openOfferModal(target);
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-crimson to-red-600 hover:from-red-500 hover:to-crimson text-white font-black text-xs flex items-center justify-center gap-2 shadow-glow-crimson border border-crimson/50 transition-all hover:scale-105"
            >
              <span>СДЕЛАТЬ ПРЯМОЙ ОФФЕР</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};