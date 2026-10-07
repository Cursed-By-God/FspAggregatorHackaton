import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Briefcase, 
  Gift, 
  RefreshCw, 
  Eye, 
  ThumbsUp, 
  ThumbsDown,
  Zap,
  Check,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../store/useAppStore';

export const CandidateDashboard: React.FC = () => {
  const { 
    candidates, 
    offers, 
    acceptOffer, 
    declineOffer, 
    setSelectedCandidate,
    openTestModal 
  } = useAppStore();

  const athlete = candidates[0] || null;
  const myOffers = athlete ? offers.filter(o => o.candidateId === athlete.id) : [];
  const pendingCount = myOffers.filter(o => o.status === 'pending').length;
  const acceptedCount = myOffers.filter(o => o.status === 'accepted').length;

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  if (!athlete) {
    return (
      <div className="panel-dossier rounded-2xl p-12 text-center max-w-xl mx-auto my-12 font-mono">
        <Sparkles className="w-10 h-10 text-chalk-dim mx-auto mb-3 animate-pulse" />
        <h3 className="text-base font-bold text-chalk mb-1">Профиль атлета загружается...</h3>
        <p className="text-xs text-chalk-muted">
          Синхронизация с реестром ФСП или ожидание данных кандидатов.
        </p>
      </div>
    );
  }

  const handleFspSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 4000);
    }, 1200);
  };

  const handleAccept = (offerId: string) => {
    acceptOffer(offerId);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#9D00FF', '#FFB800', '#00FF85']
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      
      {/* ВЕРХНИЙ БЛОК: Спортивный паспорт */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyber-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative">
              <img 
                src={athlete.avatarUrl} 
                alt={athlete.fullName} 
                className="w-20 h-20 rounded-2xl object-cover border-2 border-neon-purple shadow-glow-purple"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-fsp-emerald border-2 border-cyber-card flex items-center justify-center">
                <Check className="w-3 h-3 text-black stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {athlete.fullName}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-fsp-gold/20 text-fsp-gold border border-fsp-gold/40 inline-flex items-center gap-1 shadow-glow-gold">
                  <Trophy className="w-3.5 h-3.5" /> {athlete.fspProfile.sportRank} ФСП
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-neon-cyan mb-2">
                {athlete.handle} • {athlete.city} • ID: {athlete.fspProfile.fspId}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-300 px-2.5 py-1 rounded-lg bg-cyber-subcard border border-cyber-border">
                  Рейтинг: <span className="text-neon-cyan font-bold">{athlete.fspProfile.ratingScore} ELO</span>
                </span>
                <span className="text-xs font-mono text-slate-300 px-2.5 py-1 rounded-lg bg-cyber-subcard border border-cyber-border">
                  Ожидания: <span className="text-white font-bold">{athlete.salaryMin.toLocaleString('ru-RU')} – {athlete.salaryMax.toLocaleString('ru-RU')} ₽</span>
                </span>
                <button
                  onClick={() => setSelectedCandidate(athlete)}
                  className="text-xs font-mono text-neon-purple hover:text-white flex items-center gap-1 underline ml-2 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Мой Радар и Паспорт
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleFspSync}
              disabled={isSyncing}
              className={`px-5 py-3 rounded-2xl border text-xs font-mono font-bold flex items-center justify-center gap-2.5 transition-all shadow-sm ${
                isSyncing 
                  ? 'bg-cyber-card border-neon-cyan text-neon-cyan animate-pulse' 
                  : 'bg-cyber-subcard hover:bg-cyber-card border-cyber-border hover:border-neon-cyan text-slate-200 hover:text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-neon-cyan' : 'text-slate-400'}`} />
              <span>{isSyncing ? 'Запрос к реестру ФСП...' : 'Синхронизировать с ФСП'}</span>
            </button>

            {syncSuccess && (
              <div className="px-3 py-2 rounded-xl bg-fsp-emerald/10 border border-fsp-emerald/40 text-fsp-emerald text-xs font-mono flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Разряд МС подтвержден!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* НОВЫЙ БЛОК ТЗ: Виджет квалификационного тестирования и смены грейда */}
      <div className="p-6 rounded-3xl glass-panel border border-neon-cyan/40 bg-gradient-to-r from-cyber-card via-cyber-card to-neon-cyan/5 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="text-base font-extrabold text-white">
              Квалификационный статус: {athlete.category.specialization} • {athlete.grade}
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Подтвержден вступительным срезом ({athlete.testSummary.score}/100). По ТЗ пересдача на повышение грейда ограничена во времени для предотвращения спама.
          </p>
          <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-slate-400">
            <span>Дата сдачи: <strong className="text-slate-200">{athlete.testSummary.passedAt}</strong></span>
            <span>•</span>
            <span>Кулдаун пересдачи: <strong className="text-neon-cyan">{athlete.testSummary.cooldownUntil}</strong></span>
          </div>
        </div>

        <button
          onClick={openTestModal}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-neon-cyan to-blue-500 hover:shadow-glow-cyan text-black font-extrabold text-xs font-mono flex items-center justify-center gap-2 whitespace-nowrap transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>ПРОЙТИ ТЕСТ НА ГРЕЙД</span>
        </button>
      </div>

      {/* СТАТИСТИКА ОФФЕРОВ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl glass-panel border border-cyber-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-400">Входящие офферы</span>
            <span className="p-2 rounded-xl bg-neon-cyan/10 text-neon-cyan">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-mono font-extrabold text-white block mb-1">
            {myOffers.length}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {pendingCount > 0 ? (
              <span className="text-fsp-gold font-bold">{pendingCount} ждут вашего решения</span>
            ) : (
              'Все офферы рассмотрены'
            )}
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-cyber-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-400">Принятые контракты</span>
            <span className="p-2 rounded-xl bg-fsp-emerald/10 text-fsp-emerald">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-mono font-extrabold text-fsp-emerald block mb-1">
            {acceptedCount}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Успешный матчинг квалификации
          </span>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-cyber-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-400">Средняя вилка офферов</span>
            <span className="p-2 rounded-xl bg-fsp-gold/10 text-fsp-gold">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <span className="text-xl font-mono font-extrabold text-fsp-gold block mb-1">
            480к – 550к ₽
          </span>
          <span className="text-[11px] font-mono text-fsp-emerald font-semibold">
            +12% выше ваших ожиданий
          </span>
        </div>
      </div>

      {/* ИНБОКС ОФФЕРОВ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-neon-cyan" />
            <h2 className="text-lg font-extrabold text-white">
              Входящие офферы от компаний ({myOffers.length})
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Механика прямого приглашения
          </span>
        </div>

        {myOffers.length > 0 ? (
          <div className="space-y-4">
            {myOffers.map((offer) => {
              const isPending = offer.status === 'pending';
              const isAccepted = offer.status === 'accepted';
              const isDeclined = offer.status === 'declined';

              return (
                <div 
                  key={offer.id}
                  className={`p-6 rounded-2xl glass-panel border transition-all ${
                    isAccepted 
                      ? 'border-fsp-emerald/60 bg-fsp-emerald/5 shadow-glow-emerald' 
                      : isDeclined
                      ? 'border-red-500/30 opacity-60'
                      : 'border-cyber-border hover:border-neon-cyan/50'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={offer.companyLogoUrl} 
                        alt={offer.companyName} 
                        className="w-12 h-12 rounded-xl object-contain bg-black/40 border border-cyber-border p-1"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">
                            {offer.companyName}
                          </h3>
                          <span className="text-xs font-mono text-slate-400">
                            • {offer.sentAt}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-neon-cyan mt-0.5">
                          {offer.positionTitle}
                        </p>
                        <span className="inline-block text-[11px] font-mono text-slate-300 mt-1 px-2.5 py-0.5 rounded bg-cyber-subcard border border-cyber-border">
                          {offer.employmentType}
                        </span>
                      </div>
                    </div>

                    <div className="text-left lg:text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Предлагаемая вилка
                      </span>
                      <span className="text-xl font-mono font-extrabold text-white block">
                        {offer.salaryMin.toLocaleString('ru-RU')} – {offer.salaryMax.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full mt-1.5 ${
                        isAccepted 
                          ? 'bg-fsp-emerald/20 text-fsp-emerald border border-fsp-emerald/40' 
                          : isDeclined
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-fsp-gold/20 text-fsp-gold border border-fsp-gold/40'
                      }`}>
                        {isAccepted && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isDeclined && <XCircle className="w-3.5 h-3.5" />}
                        {isAccepted ? 'Оффер принят вами!' : isDeclined ? 'Оффер отклонен' : 'Ожидает решения'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-cyber-subcard/80 border border-cyber-border/70 text-xs text-slate-300 leading-relaxed mb-4">
                    <p className="italic">«{offer.message}»</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {offer.perks.map((perk) => (
                      <span 
                        key={perk}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyber-card text-fsp-gold border border-fsp-gold/30 flex items-center gap-1"
                      >
                        <Gift className="w-3 h-3" /> {perk}
                      </span>
                    ))}
                  </div>

                  {isPending && (
                    <div className="pt-4 border-t border-cyber-border/70 flex flex-wrap items-center justify-end gap-3">
                      <button
                        onClick={() => declineOffer(offer.id)}
                        className="px-4 py-2 rounded-xl bg-cyber-subcard hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs font-mono font-semibold border border-cyber-border transition-all flex items-center gap-1.5"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" /> Отклонить
                      </button>

                      <button
                        onClick={() => handleAccept(offer.id)}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fsp-emerald via-teal-400 to-neon-cyan text-black font-extrabold text-xs font-mono flex items-center gap-2 shadow-glow-emerald hover:scale-105 transition-all"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> ПРИНЯТЬ ОФФЕР
                      </button>
                    </div>
                  )}

                  {isAccepted && (
                    <div className="pt-3 border-t border-fsp-emerald/30 text-xs font-mono text-fsp-emerald flex items-center justify-between">
                      <span>✓ Контракт согласован. Работодателю открыты ваши прямые контакты.</span>
                      <span className="text-slate-400">Telegram: {athlete.contacts.telegram}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl glass-panel p-8 text-center text-slate-400 text-xs font-mono">
            Новых входящих офферов пока нет.
          </div>
        )}
      </div>

    </div>
  );
};