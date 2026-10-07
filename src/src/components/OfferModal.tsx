import React, { useState } from 'react';
import { 
  X, 
  SendHorizontal, 
  Sparkles, 
  Trophy, 
  Briefcase, 
  Gift, 
  CheckCircle2, 
  Check
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const PRESET_COMPANIES = [
  {
    name: 'Яндекс',
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="%23FC3F1D"/><text x="30" y="42" font-family="sans-serif" font-size="34" font-weight="900" fill="white" text-anchor="middle">Я</text></svg>`
  },
  {
    name: 'Т-Банк',
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="14" fill="%23FED83D"/><text x="30" y="44" font-family="sans-serif" font-size="38" font-weight="900" fill="black" text-anchor="middle">Т</text></svg>`
  },
  {
    name: 'СберТех',
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="%2321A038"/><text x="30" y="42" font-family="sans-serif" font-size="34" font-weight="900" fill="white" text-anchor="middle">С</text></svg>`
  },
  {
    name: 'VK Tech',
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" rx="14" fill="%230077FF"/><text x="30" y="42" font-family="sans-serif" font-size="32" font-weight="900" fill="white" text-anchor="middle">VK</text></svg>`
  }
];

const AVAILABLE_PERKS = [
  'Компенсация участия в турнирах ФСП',
  'ДМС со стоматологией с 1 дня',
  'Новейший MacBook Pro M3 Max',
  'Полная удаленка из любой точки',
  'Годовой бонус до 4 окладов',
  'Бюджет на спорт и образование 200к'
];

export const OfferModal: React.FC = () => {
  const { isOfferModalOpen, offerTargetCandidate, closeOfferModal, sendDirectOffer } = useAppStore();

  if (!isOfferModalOpen || !offerTargetCandidate) return null;

  const [selectedCompany, setSelectedCompany] = useState(PRESET_COMPANIES[0]);
  const [positionTitle, setPositionTitle] = useState(
    `Senior ${offerTargetCandidate.primaryStack[0]} / Highload Engineer`
  );
  
  // Вилка зарплаты оффера
  const [salaryMin, setSalaryMin] = useState(offerTargetCandidate.salaryMin + 20000);
  const [salaryMax, setSalaryMax] = useState(offerTargetCandidate.salaryMax + 40000);
  
  const [employmentType, setEmploymentType] = useState<'Полная удаленка' | 'Гибрид (Москва)' | 'Офис (СПб)' | 'Релокация'>('Гибрид (Москва)');
  const [selectedPerks, setSelectedPerks] = useState<string[]>([
    'Компенсация участия в турнирах ФСП',
    'ДМС со стоматологией с 1 дня'
  ]);
  const [message, setMessage] = useState(
    `Здравствуйте, ${offerTargetCandidate.fullName.split(' ')[0]}! Обратили внимание на ваш профиль и подтвержденные навыки. Готовы предложить позицию сразу с прямым оффером без стандартных многоэтапных скринингов.`
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const togglePerk = (perk: string) => {
    setSelectedPerks(prev => 
      prev.includes(perk) ? prev.filter(p => p !== perk) : [...prev, perk]
    );
  };

  const applyOlympicTemplate = () => {
    const isFsp = offerTargetCandidate.fspProfile.hasHistory;
    if (isFsp) {
      setMessage(
        `${offerTargetCandidate.fullName.split(' ')[0]}, приветствую! Мы впечатлены вашим разрядом «${offerTargetCandidate.fspProfile.sportRank}» и рейтингом ${offerTargetCandidate.fspProfile.ratingScore} ELO в реестре ФСП. Нашей команде критически важны такие навыки работы со структурами данных и скоростью написания кода. Предлагаем прямой оффер выше ваших зарплатных ожиданий!`
      );
    } else {
      setMessage(
        `${offerTargetCandidate.fullName.split(' ')[0]}, здравствуйте! Высоко оценили ваш результат входного тестирования платформы (${offerTargetCandidate.testSummary.score}/100) и практический опыт в ${offerTargetCandidate.primaryStack.slice(0, 3).join(', ')}. Приглашаем в команду с прямым оффером!`
      );
    }
    setSalaryMin(offerTargetCandidate.salaryMin + 30000);
    setSalaryMax(offerTargetCandidate.salaryMax + 50000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    setTimeout(() => {
      sendDirectOffer({
        candidateId: offerTargetCandidate.id,
        companyName: selectedCompany.name,
        companyLogoUrl: selectedCompany.logo,
        positionTitle,
        salaryMin,
        salaryMax,
        employmentType,
        message,
        perks: selectedPerks
      });
      setIsSuccess(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-cyber-border shadow-2xl p-6 sm:p-8 text-left">
        
        <button
          onClick={closeOfferModal}
          disabled={isSuccess}
          className="absolute top-5 right-5 p-2 rounded-xl bg-cyber-subcard hover:bg-cyber-card text-slate-400 hover:text-white border border-cyber-border transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-16 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-fsp-emerald/20 text-fsp-emerald border-2 border-fsp-emerald flex items-center justify-center mx-auto shadow-glow-emerald">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Оффер успешно доставлен!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Предложение отправлено атлету <span className="text-neon-cyan font-bold">{offerTargetCandidate.fullName}</span>. В кабинете соискателя появилось уведомление.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" /> ОБРАТНЫЙ НАЙМ: ПРЯМОЕ ПРЕДЛОЖЕНИЕ
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Сделать оффер кандидату
              </h2>
            </div>

            {/* Карточка кандидата */}
            <div className="p-4 rounded-2xl bg-cyber-subcard/90 border border-cyber-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={offerTargetCandidate.avatarUrl} 
                  alt={offerTargetCandidate.fullName} 
                  className="w-12 h-12 rounded-xl object-cover border border-cyber-border"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{offerTargetCandidate.fullName}</h4>
                  <p className="text-xs font-mono text-neon-cyan">{offerTargetCandidate.handle} • {offerTargetCandidate.grade}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-fsp-gold/20 text-fsp-gold border border-fsp-gold/40 inline-flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {offerTargetCandidate.fspProfile.sportRank}
                </span>
                <span className="block text-[10px] font-mono text-slate-400 mt-1">
                  Ожидания: {offerTargetCandidate.salaryMin.toLocaleString('ru-RU')} – {offerTargetCandidate.salaryMax.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* Выбор компании */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Компания-работодатель
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_COMPANIES.map((company) => {
                  const isSelected = selectedCompany.name === company.name;
                  return (
                    <button
                      type="button"
                      key={company.name}
                      onClick={() => setSelectedCompany(company)}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all text-xs font-bold ${
                        isSelected 
                          ? 'bg-cyber-card border-neon-cyan text-white shadow-glow-cyan' 
                          : 'bg-cyber-subcard border-cyber-border text-slate-400 hover:text-white'
                      }`}
                    >
                      <img src={company.logo} alt={company.name} className="w-6 h-6 rounded-lg" />
                      <span>{company.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Позиция */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Позиция / Должность
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                  className="w-full bg-cyber-subcard border border-cyber-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </div>

            {/* Зарплатная вилка «от–до» (по ТЗ стр. 5) */}
            <div className="p-4 rounded-2xl bg-cyber-subcard border border-cyber-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-300">
                  Вилка предложения (от–до в рублях):
                </span>
                <span className="text-sm font-mono font-extrabold text-neon-cyan">
                  {salaryMin.toLocaleString('ru-RU')} – {salaryMax.toLocaleString('ru-RU')} ₽ / мес
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Нижняя планка (от):</label>
                  <input
                    type="number"
                    step={10000}
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Верхняя планка (до):</label>
                  <input
                    type="number"
                    step={10000}
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                    className="w-full bg-cyber-card border border-cyber-border rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>

              <div className="text-[11px] font-mono text-fsp-emerald pt-1 flex items-center justify-between">
                <span>Ожидания кандидата: {offerTargetCandidate.salaryMin.toLocaleString('ru-RU')} – {offerTargetCandidate.salaryMax.toLocaleString('ru-RU')} ₽</span>
                <span className="px-2 py-0.5 rounded bg-fsp-emerald/10 border border-fsp-emerald/30 font-bold">
                  Соответствует рынку
                </span>
              </div>
            </div>

            {/* Формат работы */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Формат занятости
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Полная удаленка', 'Гибрид (Москва)', 'Офис (СПб)', 'Релокация'] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setEmploymentType(type)}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-mono transition-all truncate ${
                      employmentType === type
                        ? 'bg-neon-cyan text-black font-bold shadow-glow-cyan'
                        : 'bg-cyber-subcard border-cyber-border text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Бонусы */}
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-fsp-gold" /> Специальные бенефиты оффера
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_PERKS.map((perk) => {
                  const isChecked = selectedPerks.includes(perk);
                  return (
                    <button
                      type="button"
                      key={perk}
                      onClick={() => togglePerk(perk)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-fsp-gold/20 text-fsp-gold border border-fsp-gold/50 font-bold'
                          : 'bg-cyber-subcard text-slate-400 border border-cyber-border hover:border-slate-500'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-fsp-gold" />}
                      <span>{perk}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Сообщение */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase text-slate-400">
                  Сообщение кандидату
                </label>
                <button
                  type="button"
                  onClick={applyOlympicTemplate}
                  className="text-[11px] font-mono text-neon-cyan hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Заполнить персональным шаблоном
                </button>
              </div>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-cyber-subcard border border-cyber-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-neon-cyan resize-none leading-relaxed"
              />
            </div>

            {/* Кнопка отправки */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-glow-cyan hover:opacity-95 transition-all"
              >
                <SendHorizontal className="w-4 h-4" />
                <span>ОТПРАВИТЬ ПРЯМОЙ ОФФЕР ({salaryMin.toLocaleString('ru-RU')} – {salaryMax.toLocaleString('ru-RU')} ₽)</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};